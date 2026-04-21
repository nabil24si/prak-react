import { FaSearch, FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { useEffect, useState } from "react";

export default function NotFound() {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
    }, []);

    return (
        <div id="dashboard-container" className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <PageHeader title="Halaman Tidak Ditemukan" />
            
            <div className="flex items-center justify-center px-4 py-12 md:py-20">
                <div className="text-center max-w-2xl mx-auto">
                    {/* Animasi 404 dengan efek floating */}
                    <div className={`transform transition-all duration-1000 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-bounce">
                                404
                            </h1>
                        </div>
                    </div>

                    {/* Icon dengan animasi spin dan pulse */}
                    <div className={`my-6 transform transition-all duration-1000 delay-300 ${animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-lg animate-pulse">
                            <FaExclamationTriangle className="text-4xl text-white animate-spin-slow" />
                        </div>
                    </div>

                    {/* Pesan error dengan animasi slide */}
                    <div className={`space-y-4 transform transition-all duration-1000 delay-500 ${animate ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                            Oops! Halaman Tidak Ditemukan
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Maaf, halaman yang Anda cari tidak tersedia atau telah dipindahkan.
                        </p>
                        <p className="text-gray-500">
                            Silakan periksa kembali URL atau kembali ke halaman utama.
                        </p>
                    </div>

                    {/* Tombol aksi dengan animasi hover */}
                    <div className={`mt-8 space-x-4 transform transition-all duration-1000 delay-700 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <Link 
                            to="/" 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-700 hover:to-blue-800"
                        >
                            <FaHome className="text-lg" />
                            Beranda
                        </Link>
                        <button 
                            onClick={() => window.history.back()} 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-700"
                        >
                            <FaArrowLeft className="text-lg" />
                            Kembali
                        </button>
                    </div>

                    {/* Saran halaman */}
                    <div className={`mt-12 p-6 bg-white rounded-xl shadow-md transform transition-all duration-1000 delay-900 ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <p className="text-gray-700 font-medium mb-3">Atau coba halaman berikut:</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            <Link to="/products" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                                Produk
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link to="/cart" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                                Keranjang
                            </Link>
                            <span className="text-gray-300">|</span>
                            <Link to="/contact" className="text-blue-600 hover:text-blue-700 hover:underline transition-colors">
                                Kontak
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tambahkan custom CSS untuk animasi spin-slow */}
            <style jsx>{`
                @keyframes spin-slow {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .animate-spin-slow {
                    animation: spin-slow 3s linear infinite;
                }
            `}</style>
        </div>
    );
}