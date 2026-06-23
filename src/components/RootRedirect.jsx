import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import LoadingSpinner from "./LoadingSpinner";

async function ensureProfile(user) {
    const { data: existingProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (existingProfile) return existingProfile;

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
        const { data: retryProfile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
        return retryProfile || null;
    }

    return newProfile;
}

export default function RootRedirect() {
    const [redirectTo, setRedirectTo] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                setRedirectTo("/login");
                return;
            }

            // Ada session, buat/ambil profile
            const profile = await ensureProfile(session.user);

            if (profile?.role === "admin") {
                setRedirectTo("/admin/dashboard");
            } else {
                setRedirectTo("/member/dashboard");
            }
        };

        checkSession();
    }, []);

    if (!redirectTo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <LoadingSpinner text="Memuat..." />
            </div>
        );
    }

    return <Navigate to={redirectTo} replace />;
}
