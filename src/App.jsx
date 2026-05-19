import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import Sidebar from './layouts/Sidebar';
// import Header from './layouts/Header';
import Dashboard from './pages/Dashnoard';
import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import ComponentsPage from './pages/Components';



function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="flex min-h-screen bg-gray-50">
    {/* 1. Sidebar ada di sisi kiri */}
    <Sidebar />

    <div className="flex-1 p-4">
    <Header />
    
    <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/error-400" element={<NotFound code="400" description="Bad Request: Permintaan tidak valid." />} />
        <Route path="/error-401" element={<NotFound code="401" description="Unauthorized: Silahkan login terlebih dahulu." />} />
        <Route path="/error-403" element={<NotFound code="403" description="Forbidden: Anda tidak punya akses ke sini." />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
    </Routes>
</div>
  </div>
  )
}

export default App
