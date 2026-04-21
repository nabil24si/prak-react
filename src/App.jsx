import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Sidebar from './layouts/Sidebar';
import Header from './layouts/Header';
import Dashboard from './pages/Dashnoard';
import './assets/tailwind.css';
import { Route, Routes } from 'react-router-dom';
import Customers from './pages/Customers';
import Orders from './pages/Orders';

function App() {
  const [count, setCount] = useState(0)

  return (
   <div className="flex min-h-screen bg-gray-50">
    {/* 1. Sidebar ada di sisi kiri */}
    <Sidebar />

    <div className="flex-1 p-4">
    <Header />
    
    <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
    </Routes>
</div>
  </div>
  )
}

export default App
