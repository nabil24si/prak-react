import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useOutletContext } from "react-router-dom";
import { FaUser, FaStar, FaGem, FaMedal, FaTrophy, FaCrown } from "react-icons/fa";

const tierIcons = {
    Bronze: FaMedal,
    Silver: FaGem,
    Gold: FaTrophy,
    Platinum: FaCrown,
};

const tierColors = {
    Bronze: "text-orange-600 bg-orange-100",
    Silver: "text-gray-500 bg-gray-100",
    Gold: "text-yellow-600 bg-yellow-100",
    Platinum: "text-purple-600 bg-purple-100",
};

const tierDiscounts = {
    Bronze: "5%",
    Silver: "10%",
    Gold: "15%",
    Platinum: "20%",
};

export default function MemberDashboard() {
    const { profile } = useOutletContext();
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (profile?.id) {
            loadRecentOrders();
        }
    }, [profile?.id]);

    const loadRecentOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("orders")
                .select("*")
                .eq("user_id", profile.id)
                .order("created_at", { ascending: false })
                .limit(5);

            if (error) throw error;
            setRecentOrders(data || []);
        } catch (err) {
            console.error("Gagal memuat pesanan:", err);
        } finally {
            setLoading(false);
        }
    };

    const TierIcon = tierIcons[profile?.tier] || FaStar;
    const tierColorClass = tierColors[profile?.tier] || "text-gray-500 bg-gray-100";

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Page Header */}
            <div className="p-6 pb-0">
                <h1 className="text-3xl font-bold text-gray-800">Member Dashboard</h1>
                <p className="text-gray-500 mt-1">Selamat datang, {profile?.full_name || profile?.email}!</p>
            </div>

            {/* Profile & Tier Card */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Info */}
                <div className="bg-white rounded-xl shadow-sm p-6 col-span-1">
                    <div className="flex items-center space-x-4">
                        <div className="bg-hijau rounded-full p-4">
                            <FaUser className="text-3xl text-white" />
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-800">{profile?.full_name || "Member"}</p>
                            <p className="text-sm text-gray-500">{profile?.email}</p>
                        </div>
                    </div>
                </div>

                {/* Points Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 col-span-1">
                    <div className="flex items-center space-x-4">
                        <div className="bg-yellow-500 rounded-full p-4">
                            <FaStar className="text-3xl text-white" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{profile?.points || 0}</p>
                            <p className="text-sm text-gray-500">Total Points</p>
                        </div>
                    </div>
                </div>

                {/* Tier Card */}
                <div className="bg-white rounded-xl shadow-sm p-6 col-span-1">
                    <div className="flex items-center space-x-4">
                        <div className={`rounded-full p-4 ${tierColorClass}`}>
                            <TierIcon className="text-3xl" />
                        </div>
                        <div>
                            <p className="text-3xl font-bold text-gray-800">{profile?.tier || "Bronze"}</p>
                            <p className="text-sm text-gray-500">
                                Diskon hingga {tierDiscounts[profile?.tier] || "5%"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="p-6 pt-0">
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Pesanan Terbaru
                        </h3>
                    </div>

                    {loading ? (
                        <div className="p-6 text-center text-gray-500">Memuat pesanan...</div>
                    ) : recentOrders.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            Belum ada pesanan. Mulai belanja sekarang!
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-700">ID Pesanan</th>
                                    <th className="p-4 font-semibold text-gray-700">Total</th>
                                    <th className="p-4 font-semibold text-gray-700">Diskon</th>
                                    <th className="p-4 font-semibold text-gray-700">Final</th>
                                    <th className="p-4 font-semibold text-gray-700">Status</th>
                                    <th className="p-4 font-semibold text-gray-700">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-mono text-sm text-gray-600">
                                            {order.id.slice(0, 8)}...
                                        </td>
                                        <td className="p-4 font-mono">{formatCurrency(order.total_amount)}</td>
                                        <td className="p-4">{order.discount_percentage}%</td>
                                        <td className="p-4 font-mono font-semibold">{formatCurrency(order.final_amount)}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                order.status === "completed" ? "bg-green-100 text-green-700" :
                                                order.status === "cancelled" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-700"
                                            }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">{formatDate(order.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}