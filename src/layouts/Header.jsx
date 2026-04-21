import { useState } from "react"; // 1. Tambahkan useState
import { FaBell, FaSearch, FaHistory } from "react-icons/fa"; // Tambah ikon FaHistory
import { FcAreaChart } from "react-icons/fc";
import { SlSettings } from "react-icons/sl";

export default function Header() {
    // 2. Buat state untuk mengontrol Modal
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    return (
        <div id="header-container" className="flex justify-between items-center p-4">
            
            {/* Search Bar */}
            <div id="search-bar" className="relative w-full max-w-lg">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-100 p-2 pr-10 bg-white w-full max-w-lg rounded-md outline-none cursor-pointer focus:ring-2 focus:ring-hijau transition-all"
                    onClick={() => setIsSearchOpen(true)} // 3. Trigger Modal saat klik
                    readOnly // Membuat input utama hanya sebagai trigger
                />
                <FaSearch id="search-icon" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-300" />
            </div>

            {/* --- IMPROVISASI B: MODAL SEARCH --- */}
            {isSearchOpen && (
                <div className="fixed inset-0 z-[999] flex items-start justify-center pt-20 px-4">
                    {/* Background Overlay Hitam Transparan */}
                    <div 
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={() => setIsSearchOpen(false)} // Klik luar untuk tutup
                    ></div>

                    {/* Kotak Modal */}
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 border-b flex items-center">
                            <FaSearch className="text-gray-400 mr-3" />
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Type to search orders, customers, or menu..." 
                                className="w-full outline-none text-lg"
                            />
                            <button 
                                onClick={() => setIsSearchOpen(false)}
                                className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 hover:bg-gray-200"
                            >
                                ESC
                            </button>
                        </div>
                        
                        <div className="p-4">
                            <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Recent Searches</h4>
                            <div className="space-y-2">
                                <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer group">
                                    <FaHistory className="text-gray-300 mr-3 group-hover:text-hijau" />
                                    <span className="text-gray-600">Fresh Salmon Sushi</span>
                                </div>
                                <div className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer group">
                                    <FaHistory className="text-gray-300 mr-3 group-hover:text-hijau" />
                                    <span className="text-gray-600">Order #12049</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-gray-50 p-3 text-center">
                            <p className="text-xs text-gray-400">Tip: Use arrows to navigate and enter to select</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Icon & Profile Section (Tetap sama) */}
            <div id="icons-container" className="flex items-center space-x-4">
                <div id="notification-icon" className="relative p-3 bg-blue-100 rounded-2xl text-blue-500 cursor-pointer hover:bg-blue-200 transition-colors">
                    <FaBell />
                    <span id="notification-badge" className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-200 rounded-full px-2 py-1 text-xs">
                        50
                    </span>
                </div>

                <div id="chart-icon" className="p-3 bg-blue-100 rounded-2xl cursor-pointer hover:bg-blue-200 transition-colors">
                    <FcAreaChart />
                </div>

                <div id="settings-icon" className="p-3 bg-red-100 rounded-2xl text-red-500 cursor-pointer hover:bg-red-200 transition-colors">
                    <SlSettings />
                </div>
             
                <div id="profile-container" className="flex items-center space-x-4 border-l pl-4 border-gray-300">
                    <span id="profile-text" className="text-gray-700 hidden md:block">
                        Hello, <b>Nabil Sahendra</b>
                    </span>
                    <img
                        id="profile-avatar"
                        src="https://avatar.iran.liara.run/public/28"
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        alt="Profile Avatar"
                    />
                </div>
            </div>
        </div>
    );
}