import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import { supabase } from "../lib/supabase";

const tierDiscountMap = {
    Bronze: 5,
    Silver: 10,
    Gold: 15,
    Platinum: 20,
};

export default function Orders() {
    const { profile } = useOutletContext();
    const isAdmin = profile?.role === "admin";

    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Form state untuk Create Order (Member)
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([{ product_id: "", quantity: 1 }]);
    const [submitting, setSubmitting] = useState(false);

    // State untuk admin update status
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    useEffect(() => {
        loadOrders();
        if (!isAdmin) {
            loadProducts();
        }
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setError("");

            let query = supabase
                .from("orders")
                .select("*")
                .order("created_at", { ascending: false });

            // Member hanya lihat pesanan sendiri
            if (!isAdmin) {
                query = query.eq("user_id", profile.id);
            }

            const { data, error: fetchError } = await query;
            if (fetchError) throw fetchError;
            setOrders(data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat pesanan");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const loadProducts = async () => {
        try {
            const { data, error: fetchError } = await supabase
                .from("products")
                .select("*")
                .order("name");

            if (fetchError) throw fetchError;
            setProducts(data || []);
        } catch (err) {
            console.error("Gagal memuat produk:", err);
        }
    };

    // Handle add/remove product row di form
    const handleAddProductRow = () => {
        setSelectedProducts([...selectedProducts, { product_id: "", quantity: 1 }]);
    };

    const handleRemoveProductRow = (index) => {
        if (selectedProducts.length <= 1) return;
        setSelectedProducts(selectedProducts.filter((_, i) => i !== index));
    };

    const handleProductChange = (index, field, value) => {
        const updated = [...selectedProducts];
        updated[index][field] = value;
        setSelectedProducts(updated);
    };

    // Hitung total sementara
    const calculateTotal = () => {
        let total = 0;
        selectedProducts.forEach((item) => {
            const product = products.find((p) => p.id === item.product_id);
            if (product) {
                total += product.price * (parseInt(item.quantity) || 1);
            }
        });
        return total;
    };

    // Submit Order (Create)
    const handleCreateOrder = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            // Validasi: pastikan semua produk terisi
            const validItems = selectedProducts.filter((item) => item.product_id);
            if (validItems.length === 0) {
                setError("Pilih minimal 1 produk.");
                setSubmitting(false);
                return;
            }

            // Validasi stok untuk setiap item
            for (const item of validItems) {
                const product = products.find((p) => p.id === item.product_id);
                const qty = parseInt(item.quantity) || 1;

                if (!product) {
                    setError("Produk tidak ditemukan.");
                    setSubmitting(false);
                    return;
                }

                if (product.stock === 0) {
                    setError(`Stok habis: "${product.name}" tidak tersedia.`);
                    setSubmitting(false);
                    return;
                }

                if (product.stock < qty) {
                    setError(`Stok tidak mencukupi untuk "${product.name}". Tersedia: ${product.stock}, diminta: ${qty}.`);
                    setSubmitting(false);
                    return;
                }
            }

            // Hitung total_amount & siapkan itemsData
            let totalAmount = 0;
            const itemsData = validItems.map((item) => {
                const product = products.find((p) => p.id === item.product_id);
                const pricePerItem = product ? parseFloat(product.price) : 0;
                const qty = parseInt(item.quantity) || 1;
                totalAmount += pricePerItem * qty;
                return {
                    product_id: item.product_id,
                    quantity: qty,
                    price_per_item: pricePerItem,
                };
            });

            // Hitung diskon berdasarkan tier
            const discountPercent = tierDiscountMap[profile?.tier] || 0;
            const finalAmount = totalAmount - (totalAmount * discountPercent) / 100;

            // Insert order
            const { data: orderData, error: orderError } = await supabase
                .from("orders")
                .insert({
                    user_id: profile.id,
                    total_amount: totalAmount,
                    discount_percentage: discountPercent,
                    final_amount: finalAmount,
                    status: "pending",
                })
                .select()
                .single();

            if (orderError) throw orderError;

            // Insert order_items
            const itemsWithOrderId = itemsData.map((item) => ({
                ...item,
                order_id: orderData.id,
            }));

            const { error: itemsError } = await supabase
                .from("order_items")
                .insert(itemsWithOrderId);

            if (itemsError) throw itemsError;

            // Kurangi stok untuk setiap produk yang dipesan (via RPC bypass RLS)
            for (const item of validItems) {
                const qty = parseInt(item.quantity) || 1;

                const { error: stockError } = await supabase
                    .rpc("decrease_product_stock", {
                        p_product_id: item.product_id,
                        p_quantity: qty,
                    });

                if (stockError) console.error("Gagal update stok:", stockError);
            }

            // Refresh products state agar stok terbaru tampil
            loadProducts();

            // Tambah points ke profile (1 poin per 1000 nominal final_amount)
            const pointsToAdd = Math.floor(finalAmount / 1000);
            if (pointsToAdd > 0) {
                // Ambil points saat ini
                const { data: currentProfile } = await supabase
                    .from("profiles")
                    .select("points")
                    .eq("id", profile.id)
                    .single();

                if (currentProfile) {
                    const newPoints = (currentProfile.points || 0) + pointsToAdd;
                    await supabase
                        .from("profiles")
                        .update({ points: newPoints })
                        .eq("id", profile.id);
                }
            }

            setSuccess(`Pesanan berhasil dibuat! Diskon ${discountPercent}% (tier ${profile.tier}).`);
            setShowCreateForm(false);
            setSelectedProducts([{ product_id: "", quantity: 1 }]);
            loadOrders();
        } catch (err) {
            setError(err.message || "Gagal membuat pesanan");
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    // Admin: update status pesanan
    const handleUpdateStatus = async (orderId, newStatus) => {
        setUpdatingOrderId(orderId);
        setError("");

        try {
            const { error: updateError } = await supabase
                .from("orders")
                .update({ status: newStatus })
                .eq("id", orderId);

            if (updateError) throw updateError;

            setSuccess(`Status pesanan berhasil diubah ke ${newStatus}.`);
            loadOrders();
        } catch (err) {
            setError(err.message || "Gagal mengubah status");
        } finally {
            setUpdatingOrderId(null);
        }
    };

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

    const statusColors = {
        pending: "bg-yellow-100 text-yellow-700",
        completed: "bg-green-100 text-green-700",
        cancelled: "bg-red-100 text-red-700",
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader
                title={isAdmin ? "Order Management" : "My Orders"}
                breadcrumb={isAdmin ? ["Admin", "Orders"] : ["Member", "Orders"]}
            >
                {!isAdmin && (
                    <button
                        onClick={() => setShowCreateForm(!showCreateForm)}
                        className="bg-hijau text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        {showCreateForm ? "Batal" : "+ Buat Pesanan"}
                    </button>
                )}
            </PageHeader>

            <div className="p-6">
                {error && <AlertBox type="error">{error}</AlertBox>}
                {success && <AlertBox type="success">{success}</AlertBox>}

                {/* Create Order Form (Member only) */}
                {!isAdmin && showCreateForm && (
                    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Buat Pesanan Baru
                        </h3>

                        {profile?.tier && (
                            <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
                                🎉 Diskon tier <strong>{profile.tier}</strong>: {tierDiscountMap[profile.tier]}% off!
                            </div>
                        )}

                        <form onSubmit={handleCreateOrder}>
                            {selectedProducts.map((item, index) => (
                                <div key={index} className="flex items-end gap-3 mb-3">
                                    <div className="flex-1">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Produk
                                        </label>
                                        <select
                                            value={item.product_id}
                                            onChange={(e) => handleProductChange(index, "product_id", e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                                            required
                                            disabled={submitting}
                                        >
                                            <option value="">-- Pilih Produk --</option>
                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.name} - {formatCurrency(p.price)} (Stok: {p.stock})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="w-24">
                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                            Qty
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-center"
                                            required
                                            disabled={submitting}
                                        />
                                    </div>
                                    {selectedProducts.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProductRow(index)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg mb-0"
                                            disabled={submitting}
                                        >
                                            ✕
                                        </button>
                                    )}
                                </div>
                            ))}

                            <div className="flex items-center justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleAddProductRow}
                                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                                    disabled={submitting}
                                >
                                    + Tambah produk lagi
                                </button>

                                <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                        Subtotal: <span className="font-bold text-gray-800">{formatCurrency(calculateTotal())}</span>
                                    </p>
                                    {profile?.tier && (
                                        <p className="text-sm text-green-600">
                                            Diskon {tierDiscountMap[profile.tier]}%: -{formatCurrency((calculateTotal() * tierDiscountMap[profile.tier]) / 100)}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
                            >
                                {submitting ? "Memproses..." : "Pesan Sekarang"}
                            </button>
                        </form>
                    </div>
                )}

                {/* Orders Table */}
                {loading ? (
                    <LoadingSpinner text="Memuat pesanan..." />
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
                        Belum ada pesanan.
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-4 font-semibold">ID</th>
                                    <th className="p-4 font-semibold">Total</th>
                                    <th className="p-4 font-semibold">Diskon</th>
                                    <th className="p-4 font-semibold">Final</th>
                                    <th className="p-4 font-semibold">Status</th>
                                    <th className="p-4 font-semibold">Tanggal</th>
                                    {isAdmin && <th className="p-4 font-semibold">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="p-4 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                                        <td className="p-4 font-mono">{formatCurrency(order.total_amount)}</td>
                                        <td className="p-4">{order.discount_percentage}%</td>
                                        <td className="p-4 font-mono font-semibold">{formatCurrency(order.final_amount)}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">{formatDate(order.created_at)}</td>
                                        {isAdmin && (
                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    {order.status === "pending" && (
                                                        <>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, "completed")}
                                                                disabled={updatingOrderId === order.id}
                                                                className="px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50"
                                                            >
                                                                Complete
                                                            </button>
                                                            <button
                                                                onClick={() => handleUpdateStatus(order.id, "cancelled")}
                                                                disabled={updatingOrderId === order.id}
                                                                className="px-3 py-1 text-xs font-semibold bg-red-100 text-red-700 rounded-lg hover:bg-red-200 disabled:opacity-50"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    )}
                                                    {order.status === "completed" && (
                                                        <span className="text-xs text-gray-400">Selesai</span>
                                                    )}
                                                    {order.status === "cancelled" && (
                                                        <span className="text-xs text-gray-400">Dibatalkan</span>
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}