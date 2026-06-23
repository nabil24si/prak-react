-- ============================================================
-- STEP 1: SQL DDL & RLS untuk Sedap Restaurant Admin Dashboard
-- Eksekusi di Supabase SQL Editor
-- ============================================================

-- 1. ENABLE EXTENSION (jika belum)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 2. CREATE TABLES
-- ============================================================

-- 2a. Tabel profiles (extending auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email text NOT NULL,
    full_name text,
    role text NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
    points integer NOT NULL DEFAULT 0,
    tier text NOT NULL DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 2b. Tabel products
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text,
    price numeric NOT NULL CHECK (price >= 0),
    stock integer NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 2c. Tabel orders
CREATE TABLE IF NOT EXISTS public.orders (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    total_amount numeric NOT NULL,
    discount_percentage numeric NOT NULL DEFAULT 0,
    final_amount numeric NOT NULL,
    status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'cancelled')),
    created_at timestamptz NOT NULL DEFAULT now()
);

-- 2d. Tabel order_items
CREATE TABLE IF NOT EXISTS public.order_items (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id uuid NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES public.products(id),
    quantity integer NOT NULL CHECK (quantity > 0),
    price_per_item numeric NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- 3. TRIGGER: Auto-create profile saat user baru registrasi
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, points, tier)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'role', 'member'),
        0,
        'Bronze'
    );
    RETURN NEW;
END;
$$;

-- Hapus trigger lama jika sudah ada, lalu buat ulang
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- 4. FUNCTION: Update tier berdasarkan points (otomatis)
-- ============================================================
CREATE OR REPLACE FUNCTION public.update_user_tier()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
    IF NEW.points >= 1000 THEN
        NEW.tier := 'Platinum';
    ELSIF NEW.points >= 500 THEN
        NEW.tier := 'Gold';
    ELSIF NEW.points >= 200 THEN
        NEW.tier := 'Silver';
    ELSE
        NEW.tier := 'Bronze';
    END IF;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_profile_points_change ON public.profiles;
CREATE TRIGGER on_profile_points_change
    BEFORE UPDATE OF points ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_user_tier();

-- ============================================================
-- 5. FUNCTION: Helper untuk bypass RLS (cegah infinite recursion)
-- ============================================================
-- Fungsi SECURITY DEFINER ini membaca profiles tanpa terikat RLS
-- sehingga bisa dipanggil dari dalam RLS policy tanpa infinite recursion
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
$$;

CREATE OR REPLACE FUNCTION public.is_authenticated()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
    SELECT auth.role() = 'authenticated';
$$;

-- ============================================================
-- 6. ENABLE ROW LEVEL SECURITY
-- ============================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 7. RLS POLICIES
-- ============================================================

-- 7a. Profiles RLS
-- Select: Admin lihat semua, user lihat dirinya sendiri
CREATE POLICY "profiles_select_policy" ON public.profiles
    FOR SELECT
    USING (
        auth.uid() = id
        OR public.is_admin()
    );

-- Insert: Trigger handle_new_user sudah handle, tapi tetap izinkan admin insert langsung
CREATE POLICY "profiles_insert_policy" ON public.profiles
    FOR INSERT
    WITH CHECK (
        auth.uid() = id
        OR public.is_admin()
    );

-- Update: Admin bisa edit semua. User hanya bisa edit data miliknya sendiri.
CREATE POLICY "profiles_update_policy" ON public.profiles
    FOR UPDATE
    USING (
        auth.uid() = id
        OR public.is_admin()
    )
    WITH CHECK (
        auth.uid() = id
        OR public.is_admin()
    );

-- 7b. Products RLS
-- Select: Semua user (authenticated & anon) bisa lihat
CREATE POLICY "products_select_policy" ON public.products
    FOR SELECT
    USING (TRUE);

-- Insert/Update/Delete: Hanya Admin
CREATE POLICY "products_insert_policy" ON public.products
    FOR INSERT
    WITH CHECK (public.is_admin());

CREATE POLICY "products_update_policy" ON public.products
    FOR UPDATE
    USING (public.is_admin());

CREATE POLICY "products_delete_policy" ON public.products
    FOR DELETE
    USING (public.is_admin());

-- 7c. Orders RLS
-- Select: Admin lihat semua, user lihat miliknya sendiri
CREATE POLICY "orders_select_policy" ON public.orders
    FOR SELECT
    USING (
        auth.uid() = user_id
        OR public.is_admin()
    );

-- Insert: Member & Admin bisa buat pesanan
CREATE POLICY "orders_insert_policy" ON public.orders
    FOR INSERT
    WITH CHECK (
        auth.uid() = user_id
        AND public.is_authenticated()
    );

-- Update: Admin bisa update semua. User hanya bisa update order miliknya sendiri (jika pending).
CREATE POLICY "orders_update_policy" ON public.orders
    FOR UPDATE
    USING (
        public.is_admin()
        OR (auth.uid() = user_id AND status = 'pending')
    )
    WITH CHECK (
        public.is_admin()
        OR (auth.uid() = user_id)
    );

-- 7d. Order Items RLS
-- Select: Admin lihat semua, user lihat item dari order miliknya sendiri
CREATE POLICY "order_items_select_policy" ON public.order_items
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

-- Insert: Member & Admin bisa insert (selama order milik mereka atau admin)
CREATE POLICY "order_items_insert_policy" ON public.order_items
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.orders
            WHERE orders.id = order_items.order_id
            AND (orders.user_id = auth.uid() OR public.is_admin())
        )
    );

-- ============================================================
-- 7. FUNCTION: Hitung diskon berdasarkan tier (untuk dipakai di client)
-- ============================================================
CREATE OR REPLACE FUNCTION public.get_discount_percentage(user_tier text)
RETURNS numeric
LANGUAGE plpgsql
STABLE
AS $$
BEGIN
    RETURN CASE user_tier
        WHEN 'Platinum' THEN 20
        WHEN 'Gold' THEN 15
        WHEN 'Silver' THEN 10
        WHEN 'Bronze' THEN 5
        ELSE 0
    END;
END;
$$;

-- ============================================================
-- 8. FUNCTION: Kurangi stok produk (bypass RLS untuk member yg order)
-- ============================================================
CREATE OR REPLACE FUNCTION public.decrease_product_stock(p_product_id uuid, p_quantity integer)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    UPDATE public.products
    SET stock = GREATEST(stock - p_quantity, 0)
    WHERE id = p_product_id;
END;
$$;

-- ============================================================
-- SELESAI. SQL SIAP DIEXSEKUSI DI SUPABASE SQL EDITOR
-- ============================================================
