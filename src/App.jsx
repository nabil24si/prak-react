import React, { Suspense } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";

// Components
import Loading from "./components/Loading";
import ProtectedRoute from "./components/ProtectedRoute";
import FiturXyz from "./pages/FiturXyz";
import Notes from "./pages/Notes";
import RootRedirect from "./components/RootRedirect";

// Lazy Imports - Admin Pages
const Dashboard = React.lazy(() => import("./pages/Dashnoard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Products = React.lazy(() => import("./pages/Products"));
const Customers = React.lazy(() => import("./pages/Customers"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));

// Lazy Imports - Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Lazy Imports - Auth Pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forget"));

// Lazy Imports - Member Pages
const MemberDashboard = React.lazy(() => import("./pages/MemberDashboard"));

// Lazy Imports - Components Page
const ComponentsPage = React.lazy(() => import("./pages/Components"));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {/* ======================= */}
                {/* AUTH ROUTES (Public) */}
                {/* ======================= */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot" element={<Forgot />} />
                </Route>

                {/* ======================= */}
                {/* ADMIN ROUTES (Protected) */}
                {/* ======================= */}
                <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/admin/dashboard" element={<Dashboard />} />
                        <Route path="/admin/orders" element={<Orders />} />
                        <Route path="/admin/products" element={<Products />} />
                        <Route path="/admin/products/:id" element={<ProductDetail />} />
                        <Route path="/admin/customers" element={<Customers />} />
                        <Route path="/admin/components" element={<ComponentsPage />} />
                        <Route path="/admin/fitur-xyz" element={<FiturXyz />} />
                        <Route path="/admin/notes" element={<Notes />} />
                    </Route>
                </Route>

                {/* ======================= */}
                {/* MEMBER ROUTES (Protected) */}
                {/* ======================= */}
                <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
                    <Route element={<MainLayout />}>
                        <Route path="/member/dashboard" element={<MemberDashboard />} />
                        <Route path="/member/products" element={<Products />} />
                        <Route path="/member/orders" element={<Orders />} />
                        <Route path="/member/fitur-xyz" element={<FiturXyz />} />
                        <Route path="/member/notes" element={<Notes />} />
                    </Route>
                </Route>

                {/* ======================= */}
                {/* ROOT REDIRECT (Auto-detect session) */}
                {/* ======================= */}
                <Route path="/" element={<RootRedirect />} />
                <Route path="*" element={<RootRedirect />} />
            </Routes>
        </Suspense>
    );
}

export default App;