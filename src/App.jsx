import React, { Suspense, useState } from "react";
import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";

// Components
import Loading from "./components/Loading";
import FiturXyz from "./pages/FiturXyz";
import Notes from "./pages/Notes";

// Lazy Imports (Pastikan nama file di folder pages sesuai)
const Dashboard = React.lazy(() => import("./pages/Dashnoard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Products = React.lazy(() => import("./pages/Products")); 
const Customers = React.lazy(() => import("./pages/Customers"));

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forget"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
// TAMBAHAN BARU: Import halaman Components
const ComponentsPage = React.lazy(() => import("./pages/Components")); 

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Main App Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} /> 
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/customers" element={<Customers />} />
          {/* TAMBAHAN BARU: Route untuk halaman Components */}
          <Route path="/components" element={<ComponentsPage />} /> 
          <Route path="/fitur-xyz" element={<FiturXyz />} />
          <Route path="/notes" element={<Notes />} />
        </Route>

        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;