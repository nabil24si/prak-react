import React, { useState } from "react";
import { FaUserPlus, FaUsers, FaStar, FaPhone } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// 1. Generate 30 Data Customers sesuai atribut yang diminta
const generateCustomers = () => {
    const loyalties = ["Bronze", "Silver", "Gold"];
    const names = ["Andi Wijaya", "Rina Rose", "Michael Chen", "Sarah Connor", "Budi Tabuti"];
    
    return Array.from({ length: 30 }, (_, i) => ({
        id: `CUST-${2000 + i}`,
        customerName: names[i % names.length],
        email: `customer${i + 1}@example.com`,
        phone: `0812-9876-54${(i + 10)}`,
        loyalty: loyalties[i % loyalties.length],
    }));
};

export default function Customers() {
    const [customers] = useState(generateCustomers());

    // Fungsi untuk menampilkan Form Add Customer
    const handleAddCustomer = () => {
        alert("Form Add Customer Ditampilkan!");
    };

    return (
        <div id="customers-page" className="bg-gray-50 min-h-screen">
            {/* 2. PageHeader dengan props: title, breadcrumb, dan children */}
            <PageHeader 
                title="Customers" 
                breadcrumb={["Dashboard", "User Management", "Customer List"]}
            >
                <button 
                    onClick={handleAddCustomer}
                    className="bg-hijau text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity flex items-center gap-2"
                >
                    <FaUserPlus /> Add Customer
                </button>
            </PageHeader>

            <div className="p-6">
                {/* Tabel Data Customers */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="p-4 font-semibold text-gray-700">Customer ID</th>
                                <th className="p-4 font-semibold text-gray-700">Customer Name</th>
                                <th className="p-4 font-semibold text-gray-700">Email</th>
                                <th className="p-4 font-semibold text-gray-700">Phone</th>
                                <th className="p-4 font-semibold text-gray-700">Loyalty</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((cust) => (
                                <tr key={cust.id} className="border-b hover:bg-gray-50 transition">
                                    <td className="p-4 font-medium text-gray-900">{cust.id}</td>
                                    <td className="p-4 text-gray-800">{cust.customerName}</td>
                                    <td className="p-4 text-gray-600">{cust.email}</td>
                                    <td className="p-4 text-gray-600">{cust.phone}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                            cust.loyalty === "Gold" ? "bg-yellow-100 text-yellow-700" :
                                            cust.loyalty === "Silver" ? "bg-gray-200 text-gray-700" : 
                                            "bg-orange-100 text-orange-700"
                                        }`}>
                                            {cust.loyalty}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}