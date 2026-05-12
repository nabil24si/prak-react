import React, { useState } from "react";
import { FaPlus, FaBarcode } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

// Import data dari file JSON yang baru dibuat
import productData from "../data/Products.json";
import { Link } from "react-router-dom";

export default function Products() {
  const [products] = useState(productData);

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
        <button className="bg-hijau text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2">
          <FaPlus /> Add Product
        </button>
      </PageHeader>

      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="p-4 font-semibold">ID</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Code</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Brand</th>
                <th className="p-4 font-semibold">Price</th>
                <th className="p-4 font-semibold text-center">Stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium text-blue-600">{item.id}</td>
                  <td className="p-4 font-semibold">
                    <Link
                      to={`/products/${item.id}`}
                      className="text-emerald-400 hover:text-emerald-500"
                    >
                      {item.title}
                    </Link>
                  </td>
                  <td className="p-4 text-gray-500 flex items-center gap-2">
                    <FaBarcode /> {item.code}
                  </td>
                  <td className="p-4">
                    <span className="bg-gray-200 px-2 py-1 rounded text-xs uppercase font-bold">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4">{item.brand}</td>
                  <td className="p-4 font-mono">
                    {formatCurrency(item.price)}
                  </td>
                  <td className="p-4 text-center font-bold">{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
