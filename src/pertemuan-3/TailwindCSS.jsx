export default function TailwindCSS() {
    return (
        <div className="bg-[#f5f5f5] min-h-screen pb-24 font-sans text-stone-800">
            {/* Header / Navbar Shopee Style */}
            <FlexboxGrid/>
            
            <div className="max-w-6xl mx-auto px-2 md:px-4">
                {/* Banner Promo Vintage */}
                <div className="mt-4 mb-6 overflow-hidden rounded-xl shadow-lg border-4 border-[#d35400]/20 leading-[0]">
                    <div className="bg-[#d35400] p-8 md:p-12 text-[#fefae0] flex flex-col items-center justify-center text-center">
                        <span className="uppercase tracking-[0.3em] text-xs font-bold mb-2">Vintage Sale 2026</span>
                        <h1 className="text-4xl md:text-6xl font-serif font-black italic">GRATIS ONGKIR RP0</h1>
                        <p className="mt-4 font-mono text-sm border border-[#fefae0] px-4 py-1">Klaim Voucher Sekarang</p>
                    </div>
                </div>

                {/* Section Title */}
                <div className="flex justify-between items-end mb-4 px-2">
                    <h2 className="text-xl font-serif font-bold text-[#d35400] uppercase tracking-tight italic border-b-2 border-[#d35400]">Rekomendasi Vintage</h2>
                    <span className="text-sm text-stone-400 font-medium">Lihat Semua {'>'}</span>
                </div>

                {/* Grid Produk */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 px-2">
                    <Spacing title="Kamera Analog Klasik" kontent="Rp 1.250.000"/>
                    <Spacing title="Piringan Hitam Jazz" kontent="Rp 450.000"/>
                    <Spacing title="Jam Tangan Retro" kontent="Rp 890.000"/>
                    <Spacing title="Lampu Meja Antik" kontent="Rp 320.000"/>
                    <Spacing title="Radio Kayu Tua" kontent="Rp 1.100.000"/>
                    <Spacing title="Kacamata Frame Cokelat" kontent="Rp 150.000"/>
                </div>

                <Typography/>
                
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <BackgroundColors />
                    <ShadowEffects />
                </div>
                
                <div className="mt-10 flex justify-center">
                    <BorderRadius/>
                </div>
            </div>

            {/* Floating Mobile Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 py-3 px-8 flex justify-between items-center md:hidden z-50">
                <div className="flex flex-col items-center text-[#d35400]"><span className="text-xs font-bold uppercase">Beranda</span></div>
                <div className="flex flex-col items-center text-stone-400"><span className="text-xs font-bold uppercase">Feed</span></div>
                <div className="flex flex-col items-center text-stone-400"><span className="text-xs font-bold uppercase">Mall</span></div>
                <div className="flex flex-col items-center text-stone-400"><span className="text-xs font-bold uppercase">Saya</span></div>
            </div>
        </div>
    )
}

function Spacing(props){
    return (
        <div className="group bg-white rounded-lg border border-stone-200 overflow-hidden hover:shadow-xl hover:shadow-stone-200/50 hover:border-[#d35400]/30 transition-all duration-300">
            {/* Placeholder Image */}
            <div className="aspect-square bg-[#fdf6e3] flex items-center justify-center relative overflow-hidden">
                <div className="absolute top-2 left-0 bg-[#d35400] text-[#fefae0] text-[10px] px-2 py-0.5 font-bold uppercase italic z-10">Koleksi Tua</div>
                <div className="w-full h-full bg-[#bc6c25]/10 group-hover:scale-110 transition-transform duration-500"></div>
            </div>
            <div className="p-3">
                <h2 className="text-xs md:text-sm font-medium text-stone-800 line-clamp-2 h-10 font-serif leading-tight">
                    {props.title}
                </h2>
                <div className="mt-3 flex flex-col">
                    <span className="text-[#d35400] font-bold text-sm md:text-base font-mono">{props.kontent}</span>
                    <div className="mt-1 flex items-center gap-1">
                        <div className="flex text-amber-500 text-[10px]">★★★★★</div>
                        <span className="text-[10px] text-stone-400">1.2RB Terjual</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Typography(){
    return (
        <div className="my-10 p-6 md:p-10 bg-[#283618] rounded-2xl text-[#fefae0] text-center border-b-8 border-[#bc6c25]">
            <h1 className="text-3xl font-serif font-black italic">Tentang Shopee Vintage</h1>
            <p className="text-stone-300 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
                Kami menghadirkan kembali kenangan lama dengan sistem belanja modern yang sangat menyenangkan dan cepat!
            </p>
        </div>
    )
}

function BorderRadius(){
    return (
        <button className="border-4 border-[#d35400] text-[#d35400] px-12 py-3 rounded-l-full font-black uppercase tracking-widest hover:bg-[#d35400] hover:text-white transition-all shadow-xl shadow-[#d35400]/20 italic"> 
            Muat Lebih Banyak 
        </button>
    )
}

function BackgroundColors(){
    return(
        <div className="bg-[#fefae0] p-6 rounded-xl border border-stone-200 shadow-sm flex items-center gap-4 group">
            <div className="w-16 h-16 bg-[#bc6c25] rounded-full flex-shrink-0 group-hover:rotate-12 transition-transform"></div>
            <div>
                <h3 className="text-lg font-serif font-bold text-[#283618]">Koin Shopee Retro</h3>
                <p className="text-xs text-stone-500 mt-1">Cek poin belanja antikmu di sini dan klaim hadiah!</p>
            </div>
        </div>
    )
}

function FlexboxGrid(){
    return (
        <nav className="sticky top-0 z-50 bg-[#d35400] px-4 md:px-8 py-3 shadow-md">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center gap-4 md:gap-8">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl md:text-3xl font-serif font-black tracking-tighter text-[#fefae0] italic">WOKPEE</h1>
                    </div>
                    
                    {/* Search Bar */}
                    <div className="flex-1 max-w-2xl relative group">
                        <input 
                            type="text" 
                            placeholder="Cari Barang Antik..." 
                            className="w-full bg-[#fefae0] py-2 px-4 rounded-sm text-sm focus:outline-none shadow-inner italic font-serif"
                        />
                        <button className="absolute right-1 top-1 bg-[#d35400] text-white px-4 py-1 rounded-sm text-xs font-bold uppercase">Cari</button>
                    </div>

                    {/* Desktop Icons */}
                    <ul className="hidden md:flex space-x-6 text-[#fefae0] font-bold text-xs uppercase items-center">
                        <li className="cursor-pointer hover:underline">Voucher</li>
                        <li className="cursor-pointer hover:underline">Bantuan</li>
                        <li className="cursor-pointer bg-[#fefae0] text-[#d35400] px-4 py-1.5 rounded-sm">Login</li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

function ShadowEffects(){
    return (
        <div className="bg-white p-6 rounded-xl border border-stone-100 shadow-[0_10px_30px_rgba(211,84,0,0.1)] hover:shadow-[0_10px_30px_rgba(211,84,0,0.2)] transition-all">
            <h3 className="text-xl font-serif font-bold italic text-stone-800 tracking-tight">Cek Bayangan Hover</h3>
            <p className="text-stone-500 mt-2 text-sm font-medium">
                Sistem kartu produk ini menggunakan teknik bayangan Shopee yang telah diperhalus.
            </p>
        </div>
    )
}