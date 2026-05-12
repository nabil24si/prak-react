import React, { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
const Dashboard = React.lazy(() => import("./pages/Dashnoard"))
import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Loading from './components/Loading';
import Products from './pages/Products';
// import Customers from './pages/Customers';
const Customers = React.lazy(() => import("./pages/Customers"))
// import Orders from './pages/Orders';
const Orders = React.lazy(() => import("./pages/Orders"))
// import NotFound from './pages/NotFound';
const NotFound = React.lazy(() => import("./pages/NotFound"))
// import MainLayout from './layouts/MainLayout';
const MainLayout = React.lazy(() => import("./layouts/MainLayout"))
// import AuthLayout from './layouts/AuthLayout';
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"))
// import Login from './pages/auth/Login';
const Login = React.lazy(() => import("./pages/auth/Login"))
// import Register from './pages/auth/Register';
const Register = React.lazy(() => import("./pages/auth/Register"))
// import Forgot from './pages/auth/Forget';
const Forgot = React.lazy(() => import("./pages/auth/Forget"))
const ProductDetail = React.lazy(() => import("./pages/ProductDetail.jsx"))


function App() {
  const [count, setCount] = useState(0)

  return (
    <Suspense fallback={<Loading />}>
    <Routes>
        <Route element={<MainLayout/>}>
        <Route path="*" element={<NotFound />} />
        <Route path="/error-400" element={<NotFound code="400" description="Bad Request: Permintaan tidak valid." />} />
        <Route path="/error-401" element={<NotFound code="401" description="Unauthorized: Silahkan login terlebih dahulu." />} />
        <Route path="/error-403" element={<NotFound code="403" description="Forbidden: Anda tidak punya akses ke sini." />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        </Route>

        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
    </Suspense>
  )
}

export default App
