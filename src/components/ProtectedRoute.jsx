import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { supabase } from "../lib/supabase";
import LoadingSpinner from "./LoadingSpinner";

async function ensureProfile(user) {
    // Coba ambil profile
    const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (existingProfile) return existingProfile;

    // Profile belum ada (karena user dibuat sebelum trigger jalan) → buat manual
    const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "User";
    const role = user.user_metadata?.role || "member";

    const { data: newProfile, error } = await supabase
        .from("profiles")
        .insert({
            id: user.id,
            email: user.email,
            full_name: fullName,
            role: role,
            points: 0,
            tier: "Bronze",
        })
        .select()
        .single();

    if (error) {
        console.error("Gagal membuat profile:", error);
        // Coba ambil sekali lagi (mungkin trigger sudah jalan)
        const { data: retryProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
        return retryProfile || null;
    }

    return newProfile;
}

export default function ProtectedRoute({ allowedRoles }) {
    const [session, setSession] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const fetchProfile = async (user) => {
        const profileData = await ensureProfile(user);
        setProfile(profileData);
    };

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data: { session: currentSession } } = await supabase.auth.getSession();
                setSession(currentSession);

                if (currentSession?.user) {
                    await fetchProfile(currentSession.user);
                }
            } catch (err) {
                console.error("Auth check error:", err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    // Listen for auth state changes
    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
            setSession(newSession);

            if (newSession?.user) {
                await fetchProfile(newSession.user);
            } else {
                setProfile(null);
            }
        });

        return () => subscription?.unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner text="Memeriksa sesi..." />
            </div>
        );
    }

    // Jika tidak ada session, redirect ke login
    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Jika ada session tapi profile gagal dimuat
    if (!profile) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner text="Memuat profil..." />
            </div>
        );
    }

    // Cek role authorization
    if (allowedRoles && !allowedRoles.includes(profile.role)) {
        if (profile.role === "member") {
            return <Navigate to="/member/dashboard" replace />;
        }
        if (profile.role === "admin") {
            return <Navigate to="/admin/dashboard" replace />;
        }
        return <Navigate to="/login" replace />;
    }

    return <Outlet context={{ session, profile }} />;
}