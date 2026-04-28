import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Dashboard from './pages/Dashnoard';
import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Forgot from './pages/auth/Forget';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
        <Route element={<MainLayout/>}>
        <Route path="*" element={<NotFound />} />
        <Route path="/error-400" element={<NotFound code="400" description="Bad Request: Permintaan tidak valid." />} />
        <Route path="/error-401" element={<NotFound code="401" description="Unauthorized: Silahkan login terlebih dahulu." />} />
        <Route path="/error-403" element={<NotFound code="403" description="Forbidden: Anda tidak punya akses ke sini." />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        </Route>

        <Route element={<AuthLayout/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot" element={<Forgot/>} />
        </Route>
    </Routes>
  )
}

export default App
