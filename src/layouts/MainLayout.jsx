import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
    return(
         <div className="flex min-h-screen bg-gray-50">
    {/* 1. Sidebar ada di sisi kiri */}
    <Sidebar />

    <div className="flex-1 p-4">
    <Header />
    <Outlet/>
</div>
  </div>
    )
}