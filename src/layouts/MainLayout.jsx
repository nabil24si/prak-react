import { Outlet, useOutletContext } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    // Ambil context dari ProtectedRoute (parent)
    const context = useOutletContext();

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* 1. Sidebar ada di sisi kiri */}
            <Sidebar />

            <div className="flex-1 p-4">
                <Header />
                {/* Teruskan context ke halaman anak (MemberDashboard, Products, dll) */}
                <Outlet context={context} />
            </div>
        </div>
    );
}