import { useState, useEffect } from "react";
import { FaUserPlus, FaTrash, FaEdit } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import { supabase } from "../lib/supabase";

const TIER_OPTIONS = ["Bronze", "Silver", "Gold", "Platinum"];

const tierColors = {
    Bronze: "bg-orange-100 text-orange-700",
    Silver: "bg-gray-200 text-gray-700",
    Gold: "bg-yellow-100 text-yellow-700",
    Platinum: "bg-purple-100 text-purple-700",
};

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // State untuk modal edit
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        points: "",
        tier: "Bronze",
    });

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            setError("");

            const { data, error: fetchError } = await supabase
                .from("profiles")
                .select("*")
                .eq("role", "member")
                .order("created_at", { ascending: false });

            if (fetchError) throw fetchError;
            setCustomers(data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat data customer");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (customer) => {
        setEditingCustomer(customer);
        setFormData({
            full_name: customer.full_name || "",
            points: customer.points?.toString() || "0",
            tier: customer.tier || "Bronze",
        });
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
        setEditingCustomer(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const newPoints = parseInt(formData.points) || 0;

            const { error: updateError } = await supabase
                .from("profiles")
                .update({
                    full_name: formData.full_name,
                    points: newPoints,
                    tier: formData.tier,
                })
                .eq("id", editingCustomer.id);

            if (updateError) throw updateError;

            setSuccess(`Data ${formData.full_name || editingCustomer.email} berhasil diperbarui!`);
            setTimeout(() => setSuccess(""), 3000);
            closeModal();
            loadCustomers();
        } catch (err) {
            setError(err.message || "Gagal mengupdate data customer");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus customer ini? Semua data terkait akan ikut terhapus.");
        if (!konfirmasi) return;

        try {
            setError("");
            setSuccess("");

            const { error: deleteError } = await supabase.auth.admin.deleteUser(id);
            if (deleteError) throw deleteError;

            setSuccess("Customer berhasil dihapus!");
            setTimeout(() => setSuccess(""), 3000);
            loadCustomers();
        } catch (err) {
            setError(err.message || "Gagal menghapus customer. Pastikan Anda login sebagai admin.");
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString("id-ID", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div id="customers-page" className="bg-gray-50 min-h-screen">
            <PageHeader
                title="Customers"
                breadcrumb={["Dashboard", "User Management", "Customer List"]}
            >
                <button className="bg-hijau text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2">
                    <FaUserPlus /> Add Customer
                </button>
            </PageHeader>

            <div className="p-6">
                {error && <AlertBox type="error">{error}</AlertBox>}
                {success && <AlertBox type="success">{success}</AlertBox>}

                {loading ? (
                    <LoadingSpinner text="Memuat data customer..." />
                ) : customers.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
                        Belum ada customer terdaftar.
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-4 font-semibold text-gray-700">ID</th>
                                    <th className="p-4 font-semibold text-gray-700">Nama</th>
                                    <th className="p-4 font-semibold text-gray-700">Email</th>
                                    <th className="p-4 font-semibold text-gray-700">Points</th>
                                    <th className="p-4 font-semibold text-gray-700">Tier</th>
                                    <th className="p-4 font-semibold text-gray-700">Bergabung</th>
                                    <th className="p-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {customers.map((cust) => (
                                    <tr key={cust.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-4 font-mono text-sm text-gray-600">
                                            {cust.id.slice(0, 8)}...
                                        </td>
                                        <td className="p-4 font-semibold text-gray-800">
                                            {cust.full_name || "—"}
                                        </td>
                                        <td className="p-4 text-gray-600">{cust.email}</td>
                                        <td className="p-4 font-bold">{cust.points || 0}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                tierColors[cust.tier] || "bg-gray-100 text-gray-700"
                                            }`}>
                                                {cust.tier || "Bronze"}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">{formatDate(cust.created_at)}</td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openEditModal(cust)}
                                                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit customer"
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(cust.id)}
                                                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Hapus customer"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Modal Edit Customer */}
            {showEditModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={closeModal}
                    ></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md z-10 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">Edit Customer</h3>
                            <button
                                onClick={closeModal}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editingCustomer?.email || ""}
                                    disabled
                                    className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-500 cursor-not-allowed"
                                />
                                <p className="text-xs text-gray-400 mt-1">Email tidak bisa diubah</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Lengkap
                                </label>
                                <input
                                    type="text"
                                    name="full_name"
                                    value={formData.full_name}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Points
                                </label>
                                <input
                                    type="number"
                                    name="points"
                                    value={formData.points}
                                    onChange={handleChange}
                                    min="0"
                                    disabled={submitting}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                />
                                <p className="text-xs text-gray-400 mt-1">
                                    Tier akan otomatis berubah berdasarkan points
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tier
                                </label>
                                <select
                                    name="tier"
                                    value={formData.tier}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                >
                                    {TIER_OPTIONS.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                                <p className="text-xs text-gray-400 mt-1">
                                    Bronze: 0-199 | Silver: 200-499 | Gold: 500-999 | Platinum: 1000+
                                </p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={submitting}
                                    className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition disabled:opacity-50"
                                >
                                    {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}