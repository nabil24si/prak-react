import { useState } from "react"; // Tambahkan useState
import { FiHome, FiShoppingCart, FiUsers, FiPlus } from "react-icons/fi";

export default function Sidebar() {
    // IMPROVISASI: State untuk melacak menu mana yang sedang aktif
    const [activeMenu, setActiveMenu] = useState("Dashboard");

    const menus = [
        { name: "Dashboard", icon: <FiHome className="mr-4 text-xl" /> },
        { name: "Orders", icon: <FiShoppingCart className="mr-4 text-xl" /> },
        { name: "Customers", icon: <FiUsers className="mr-4 text-xl" /> },
    ];

    return (
        <div id="sidebar" className="flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg border-r border-gray-100">
            
            {/* Logo Section */}
            <div id="sidebar-logo" className="flex flex-col mb-10">
                <span id="logo-title" className="font-poppins text-[48px] text-gray-900 leading-none">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400 text-sm mt-1">
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu Section */}
            <div id="sidebar-menu">
                <ul id="menu-list" className="space-y-4">
                    {menus.map((item) => (
                        <li key={item.name}>
                            <div 
                                onClick={() => setActiveMenu(item.name)}
                                className={`
                                    flex items-center rounded-2xl p-4 cursor-pointer transition-all duration-300
                                    ${activeMenu === item.name 
                                        ? "bg-green-100 text-hijau font-extrabold shadow-sm translate-x-2" 
                                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-800 hover:translate-x-1"
                                    }
                                `}
                            >
                                {item.icon}
                                {item.name}
                                {/* Indikator Titik saat Aktif */}
                                {activeMenu === item.name && (
                                    <div className="ml-auto w-2 h-2 bg-hijau rounded-full shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer Section */}
            <div id="sidebar-footer" className="mt-auto pt-10">
                <div id="footer-card" className="bg-hijau p-5 rounded-3xl shadow-lg mb-8 relative overflow-hidden group">
                    {/* Variasi: Dekorasi lingkaran di card */}
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full group-hover:scale-150 transition-transform"></div>
                    
                    <div id="footer-text" className="text-white text-sm relative z-10">
                        <span className="font-medium opacity-90">Please organize your menus through button below!</span>
                        <div id="add-menu-button" className="flex justify-center items-center p-2.5 mt-4 bg-white rounded-xl shadow-md hover:bg-gray-50 transition-colors cursor-pointer active:scale-95">
                            <span className="text-gray-700 font-bold flex items-center">
                                <FiPlus className="mr-2 stroke-[3]" /> Add Menus
                            </span>
                        </div>
                    </div>
                </div>
                
                <div className="px-2">
                    <span id="footer-brand" className="font-bold text-gray-800 text-sm block">
                        Sedap Restaurant
                    </span>
                    <p id="footer-copyright" className="text-xs text-gray-400 mt-1">
                        &copy; 2026 Version 2.0.1
                    </p>
                </div>
            </div>
        </div>
    );
}