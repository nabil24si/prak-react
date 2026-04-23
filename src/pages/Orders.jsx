import React, { useState } from "react";
import { FaShoppingCart, FaTruck, FaBan, FaDollarSign } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// 1. Generate 30 Data Orders secara otomatis
const generateOrders = () => {
    const statuses = ["Pending", "Completed", "Cancelled"];
    const names = ["Budi Santoso", "Siti Aminah", "John Doe", "Jane Smith", "Andi Wijaya"];
    
    return Array.from({ length: 30 }, (_, i) => ({
        id: `ORD-${1000 + i}`,
        customerName: names[i % names.length],
        status: statuses[i % statuses.length],
        totalPrice: Math.floor(Math.random() * 500000) + 50000,
        orderDate: `2024-05-${(i % 28) + 1}`,
    }));
};

export default function Orders() {
    const [orders] = useState(generateOrders());

    // Fungsi untuk menampilkan Form (bisa dikembangkan ke Modal)
    const handleAddOrder = () => {
        alert("Form Add Order Ditampilkan!");
    };

    return (
        <div id="orders-page" className="bg-gray-50 min-h-screen">
            {/* 2. Penggunaan PageHeader sesuai ketentuan props */}
            <PageHeader 
                title="Orders" 
                breadcrumb={["Dashboard", "E-commerce", "Order List"]}
            >
                {/* Children: Tombol Add Orders */}
                <button 
                    onClick={handleAddOrder}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition"
                >
                    + Add Orders
                </button>
            </PageHeader>

            <div className="p-6">
                {/* Tabel Data Orders */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700">Order ID</th>
                                <th className="p-4 font-semibold text-gray-700">Customer Name</th>
                                <th className="p-4 font-semibold text-gray-700">Status</th>
                                <th className="p-4 font-semibold text-gray-700">Total Price</th>
                                <th className="p-4 font-semibold text-gray-700">Order Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-blue-600">{order.id}</td>
                                    <td className="p-4 text-gray-800">{order.customerName}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            order.status === "Completed" ? "bg-green-100 text-green-700" :
                                            order.status === "Cancelled" ? "bg-red-100 text-red-700" : 
                                            "bg-yellow-100 text-yellow-700"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-800">
                                        Rp {order.totalPrice.toLocaleString('id-ID')}
                                    </td>
                                    <td className="p-4 text-gray-600">{order.orderDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}