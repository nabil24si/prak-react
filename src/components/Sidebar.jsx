import { CgProductHunt } from "react-icons/cg";
import { FaThLarge, FaListUl, FaHeadset, FaSignOutAlt } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Sidebar() {
    const navigate = useNavigate();
    const basePath = window.location.pathname.startsWith("/member") ? "/member" : "/admin";

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate("/login");
    };

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4 space-x-2
        ${isActive ? 
            "text-hijau bg-green-200 font-extrabold" : 
            "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
        }`;

    return (
        <div id="sidebar" className="flex min-h-screen w-[320px] flex-col bg-white p-8 shadow-lg z-10">
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col mb-4">
                <span id="logo-title" className="font-poppins text-[42px] text-gray-900 font-[1000]">
                    Sedap <b id="logo-dot" className="text-hijau">.</b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400 text-sm">
                    {basePath === "/member" ? "Member Area" : "Modern Admin Dashboard"}
                </span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mt-8">
                <ul id="menu-list" className="space-y-2">
                    <li>
                        <NavLink id="menu-1" to={`${basePath}/dashboard`} className={menuClass}>
                            <FaThLarge className="mr-4 text-lg" />
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-2" to={`${basePath}/orders`} className={menuClass}>
                            <FaListUl className="mr-4 text-lg" />
                            Orders
                        </NavLink>
                    </li>
                    {basePath === "/admin" && (
                        <li>
                            <NavLink id="menu-3" to={`${basePath}/customers`} className={menuClass}>
                                <FaHeadset className="mr-4 text-lg" />
                                Customers
                            </NavLink>
                        </li>
                    )}
                    <li>
                        <NavLink id="menu-4" to={`${basePath}/products`} className={menuClass}>
                            <CgProductHunt className="mr-4 text-lg" />
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-5" to={`${basePath}/fitur-xyz`} className={menuClass}>
                            <CgProductHunt className="mr-4 text-lg" />
                            Fitur Xyz
                        </NavLink>
                    </li>
                    <li>
                        <NavLink id="menu-6" to={`${basePath}/notes`} className={menuClass}>
                            <CgProductHunt className="mr-4 text-lg" />
                            Notes
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Logout Button */}
            <div className="mt-auto mb-6">
                <button
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center rounded-xl p-4 w-full text-gray-600 hover:text-red-600 hover:bg-red-50 hover:font-extrabold transition-colors"
                >
                    <FaSignOutAlt className="mr-4 text-lg" />
                    Logout
                </button>
            </div>

            {/* Footer */}
            <div id="sidebar-footer">
                <div className="flex flex-col">
                    <span id="footer-brand" className="font-bold text-gray-400 text-sm">Sedap Restaurant Admin Dashboard</span>
                    <p id="footer-copyright" className="font-light text-gray-400 text-xs mt-1">&copy; 2025 All Right Reserved</p>
                </div>
            </div>
        </div>
    );
}