import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import LoadingSpinner from "../components/LoadingSpinner";
import AlertBox from "../components/AlertBox";
import { supabase } from "../lib/supabase";

export default function Products() {
    const context = useOutletContext();
    const profile = context?.profile;

    const isAdmin = profile?.role === "admin";
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // State untuk modal form
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
    });

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setError("");
            const { data, error: fetchError } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });

            if (fetchError) throw fetchError;
            setProducts(data || []);
        } catch (err) {
            setError(err.message || "Gagal memuat produk");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: "", description: "", price: "", stock: "" });
        setEditingProduct(null);
    };

    const openCreateModal = () => {
        resetForm();
        setShowModal(true);
    };

    const openEditModal = (product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name || "",
            description: product.description || "",
            price: product.price?.toString() || "",
            stock: product.stock?.toString() || "",
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError("");
        setSuccess("");

        try {
            const productData = {
                name: formData.name,
                description: formData.description || null,
                price: parseFloat(formData.price),
                stock: parseInt(formData.stock) || 0,
            };

            if (editingProduct) {
                // UPDATE
                const { error: updateError } = await supabase
                    .from("products")
                    .update(productData)
                    .eq("id", editingProduct.id);

                if (updateError) throw updateError;
                setSuccess("Produk berhasil diperbarui!");
            } else {
                // CREATE
                const { error: insertError } = await supabase
                    .from("products")
                    .insert(productData);

                if (insertError) throw insertError;
                setSuccess("Produk berhasil ditambahkan!");
            }

            setTimeout(() => setSuccess(""), 3000);
            closeModal();
            loadProducts();
        } catch (err) {
            setError(err.message || "Gagal menyimpan produk");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        const konfirmasi = confirm("Yakin ingin menghapus produk ini?");
        if (!konfirmasi) return;

        try {
            setError("");
            setSuccess("");

            const { error: deleteError } = await supabase
                .from("products")
                .delete()
                .eq("id", id);

            if (deleteError) throw deleteError;

            setSuccess("Produk berhasil dihapus!");
            setTimeout(() => setSuccess(""), 3000);
            loadProducts();
        } catch (err) {
            alert("Gagal menghapus produk: " + err.message);
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <PageHeader title="Product Inventory" breadcrumb={["Admin", "Products"]}>
                {isAdmin && (
                    <button
                        onClick={openCreateModal}
                        className="bg-hijau text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
                    >
                        <FaPlus /> Add Product
                    </button>
                )}
            </PageHeader>

            <div className="p-6">
                {error && <AlertBox type="error">{error}</AlertBox>}
                {success && <AlertBox type="success">{success}</AlertBox>}

                {loading ? (
                    <LoadingSpinner text="Memuat produk..." />
                ) : error && !products.length ? (
                    <div className="bg-red-100 text-red-700 p-4 rounded-lg">{error}</div>
                ) : products.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 text-center text-gray-500">
                        Belum ada produk. {isAdmin ? "Klik 'Add Product' untuk menambah." : ""}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-100 border-b">
                                <tr>
                                    <th className="p-4 font-semibold">ID</th>
                                    <th className="p-4 font-semibold">Name</th>
                                    <th className="p-4 font-semibold">Description</th>
                                    <th className="p-4 font-semibold">Price</th>
                                    <th className="p-4 font-semibold text-center">Stock</th>
                                    {isAdmin && <th className="p-4 font-semibold text-center">Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                                        <td className="p-4 font-medium text-blue-600 font-mono text-sm">
                                            {item.id.slice(0, 8)}
                                        </td>
                                        <td className="p-4 font-semibold">{item.name}</td>
                                        <td className="p-4 text-gray-500 max-w-xs truncate">
                                            {item.description || "-"}
                                        </td>
                                        <td className="p-4 font-mono">{formatCurrency(item.price)}</td>
                                        <td className="p-4 text-center font-bold">{item.stock}</td>
                                        {isAdmin && (
                                            <td className="p-4 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <button
                                                        onClick={() => openEditModal(item)}
                                                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                                                        title="Edit produk"
                                                    >
                                                        <FaEdit />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(item.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Hapus produk"
                                                    >
                                                        <FaTrash />
                                                    </button>
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

            {/* Modal Form Create/Edit Product */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={closeModal}
                    ></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg z-10 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-gray-800">
                                {editingProduct ? "Edit Produk" : "Tambah Produk Baru"}
                            </h3>
                            <button
                                onClick={closeModal}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nama Produk *
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    disabled={submitting}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                    placeholder="Nama produk"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Deskripsi
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    disabled={submitting}
                                    rows="3"
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                                    placeholder="Deskripsi produk (opsional)"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Harga *
                                    </label>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        disabled={submitting}
                                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Stok *
                                    </label>
                                    <input
                                        type="number"
                                        name="stock"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        disabled={submitting}
                                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                        placeholder="0"
                                    />
                                </div>
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
                                    {submitting
                                        ? "Menyimpan..."
                                        : editingProduct
                                        ? "Simpan Perubahan"
                                        : "Tambah Produk"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}