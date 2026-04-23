// src/components/ErrorPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaGlobeAmericas } from "react-icons/fa";

export default function ErrorPage({ code = "404", description = "It's Look like you're lost", image }) {
  // Mengambil angka pertama (misal: 4) dan angka terakhir (misal: 0, 1, 3, atau 4)
  const codeStr = code.toString();
  const firstDigit = codeStr.charAt(0);
  const lastDigit = codeStr.charAt(codeStr.length - 1);

  return (
    <div className="min-h-screen bg-[#0D1117] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Efek Lingkaran Background (Radial Rings) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
        <div className="absolute rounded-full border border-gray-700 w-[500px] h-[500px]"></div>
        <div className="absolute rounded-full border border-gray-700 w-[700px] h-[700px]"></div>
        <div className="absolute rounded-full border border-gray-700 w-[900px] h-[900px]"></div>
      </div>

      {/* Efek Bintang-bintang Kecil */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-70"></div>
      <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-60"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
      <div className="absolute top-1/2 left-[10%] w-1 h-1 bg-white rounded-full opacity-50"></div>
      <div className="absolute bottom-1/3 right-[15%] w-1 h-1 bg-white rounded-full opacity-60"></div>

      {/* Konten Utama */}
      <div className="relative z-10 flex flex-col items-center text-white">
        
        {/* Tampilan Besar (Contoh: 4 [Bumi] 1) */}
        <div className="flex items-center space-x-2 md:space-x-6 mb-8">
          <span className="text-[120px] md:text-[180px] font-extrabold leading-none select-none">
            {firstDigit}
          </span>
          
          {/* Ikon Bumi atau Gambar Error dari Props */}
          <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] flex items-center justify-center">
            {image ? (
              <img src={image} alt="Error status" className="w-full h-full object-contain" />
            ) : (
              <FaGlobeAmericas className="text-[#8ACC33] text-8xl md:text-9xl animate-pulse shadow-[0_0_50px_rgba(138,204,51,0.3)] rounded-full" />
            )}
          </div>

          <span className="text-[120px] md:text-[180px] font-extrabold leading-none select-none">
            {lastDigit}
          </span>
        </div>

        {/* Teks Pesan Dinamis */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-3 uppercase tracking-wider">
            Whoops... {code}
          </h2>
          <p className="text-lg md:text-xl text-gray-500 font-medium max-w-md">
            {description}
          </p>
        </div>

        {/* Tombol Back to Home */}
        <Link 
          to="/" 
          className="text-lg font-semibold text-[#8ACC33] hover:text-[#a4e644] transition-all duration-300 border-b-2 border-transparent hover:border-[#a4e644] pb-1"
        >
          Go To Home
        </Link>
      </div>
    </div>
  );
}