import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";

export default function Dashboard() {
    return (
        <div id="dashboard-container">
            <PageHeader />

            <div id="dashboard-grid" className="p-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* 1️⃣ Total Orders - Improvisasi: Hover & Trend */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-hijau rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaShoppingCart className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">75</span>
                        <span className="text-gray-400 text-sm">Total Orders</span>
                        {/* IMPROVISASI: Badge Trend */}
                        <span className="text-xs text-green-500 font-bold flex items-center mt-1">
                            <FaArrowUp className="mr-1"/> 12%
                        </span>
                    </div>
                </div>

                {/* 2️⃣ Total Delivered - Improvisasi: Hover & Trend */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-blue-500 rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaTruck className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">175</span>
                        <span className="text-gray-400 text-sm">Total Delivered</span>
                        <span className="text-xs text-green-500 font-bold flex items-center mt-1">
                            <FaArrowUp className="mr-1"/> 8%
                        </span>
                    </div>
                </div>

                {/* 3️⃣ Total Canceled - Improvisasi: Hover & Trend */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-red-500 rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaBan className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">40</span>
                        <span className="text-gray-400 text-sm">Total Canceled</span>
                        <span className="text-xs text-red-500 font-bold flex items-center mt-1">
                            <FaArrowDown className="mr-1"/> 2%
                        </span>
                    </div>
                </div>

                {/* 4️⃣ Total Revenue - Improvisasi: Hover & Trend */}
                <div className="group flex items-center space-x-5 bg-white rounded-lg shadow-md p-4 transition-all hover:scale-105 cursor-pointer">
                    <div className="bg-yellow-500 rounded-full p-4 group-hover:rotate-12 transition-transform">
                        <FaDollarSign className="text-3xl text-white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold">Rp.128</span>
                        <span className="text-gray-400 text-sm">Total Revenue</span>
                        <span className="text-xs text-green-500 font-bold flex items-center mt-1">
                            <FaArrowUp className="mr-1"/> 15%
                        </span>
                    </div>
                </div>

            </div>
        </div>
    );
}