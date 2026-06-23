import { useEffect, useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalDelivered: 0,
        totalCancelled: 0,
        totalRevenue: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            setError("");

            // Ambil semua orders
            const { data: orders, error: ordersError } = await supabase
                .from("orders")
                .select("status, final_amount");

            if (ordersError) throw ordersError;

            const totalOrders = orders?.length || 0;
            const totalDelivered = orders?.filter((o) => o.status === "completed").length || 0;
            const totalCancelled = orders?.filter((o) => o.status === "cancelled").length || 0;
            const totalRevenue = orders
                ?.filter((o) => o.status === "completed")
                .reduce((sum, o) => sum + parseFloat(o.final_amount || 0), 0) || 0;

            setStats({
                totalOrders,
                totalDelivered,
                totalCancelled,
                totalRevenue,
            });
        } catch (err) {
            setError(err.message || "Gagal memuat statistik");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    if (loading) {
        return (
            <div id="dashboard-container">
                <PageHeader title="Dashboard" />
                <LoadingSpinner text="Memuat statistik..." />
            </div>
        );
    }

    return (
        <div id="dashboard-container">
            <PageHeader title="Dashboard" />

            {error && (
                <div className="mx-5 mt-4 bg-red-100 text-red-700 p-4 rounded-lg">
                    {error}
                </div>
            )}

            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                {/* 1️⃣ Total Orders */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-hijau rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaShoppingCart className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{stats.totalOrders}</span>
                        <span className="text-gray-400 text-sm">Total Orders</span>
                        <span className="text-xs text-green-500 font-bold flex items-center mt-1">
                            <FaArrowUp className="mr-1"/> Real-time
                        </span>
                    </div>
                </div>

                {/* 2️⃣ Total Delivered */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-blue-500 rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{stats.totalDelivered}</span>
                        <span className="text-gray-400 text-sm">Total Delivered</span>
                        <span className="text-xs text-green-500 font-bold flex items-center mt-1">
                            <FaArrowUp className="mr-1"/> Selesai
                        </span>
                    </div>
                </div>

                {/* 3️⃣ Total Canceled */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-red-500 rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{stats.totalCancelled}</span>
                        <span className="text-gray-400 text-sm">Total Canceled</span>
                        <span className="text-xs text-red-500 font-bold flex items-center mt-1">
                            <FaArrowDown className="mr-1"/> Batal
                        </span>
                    </div>
                </div>

                {/* 4️⃣ Total Revenue */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-yellow-500 rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</span>
                        <span className="text-gray-400 text-sm">Total Revenue</span>
                        <span className="text-xs text-green-500 font-bold flex items-center mt-1">
                            <FaArrowUp className="mr-1"/> Real-time
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}