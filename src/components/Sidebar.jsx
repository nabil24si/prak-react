import React from 'react';
// 1. Mengubah import icon sesuai gambar dosen
import { FaThLarge, FaListUl, FaHeadset, FaPlus } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';

export default function Sidebar() {
        const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`
    return (
        <div id="sidebar" className="flex min-h-screen w-[320px] flex-col bg-white p-8 shadow-lg z-10">
            
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col mb-4">
                <span id="logo-title" className="font-poppins text-[42px] text-gray-900 font-[1000]">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400 text-sm">
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-8">
                <ul id="menu-list" className="space-y-2">
                    <li>
                        <NavLink id="menu-1" to="/" className={menuClass}>
                            <FaThLarge className="mr-4 text-lg" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-2" to="/orders" className={menuClass}>
                            <FaListUl className="mr-4 text-lg" />
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-3" to="/customers" className={menuClass}>
                            <FaHeadset className="mr-4 text-lg" />
                            Customers
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div id="footer-card" className="bg-hijau p-4 rounded-xl shadow-lg mb-6 flex items-center justify-between">
                    <div id="footer-text" className="text-white text-[11px] leading-relaxed w-[60%]">
                        <p className="mb-2">Please organize your menus through button below!</p>
                        <div id="add-menu-button" className="inline-flex justify-center items-center px-3 py-1.5 bg-white rounded-md cursor-pointer text-gray-800 font-bold hover:bg-gray-100">
                            <FaPlus className="mr-2 text-[10px]" /> Add Menus
                        </div>
                    </div>
                    <div className="w-[35%] flex justify-end">
                        <img id="footer-avatar" src="public/img/profil.jpg" alt="avatar" className="w-20 h-20 rounded-full border-2 border-white/50" />
                    </div>
                </div>
                
                <div className="flex flex-col">
                    <span id="footer-brand" className="font-bold text-gray-400 text-sm">Sedap Restaurant Admin Dashboard</span>
                    <p id="footer-copyright" className="font-light text-gray-400 text-xs mt-1">&copy; 2025 All Right Reserved</p>
                </div>
            </div>

        </div>
    );
}