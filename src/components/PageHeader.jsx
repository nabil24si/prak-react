export default function PageHeader() {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            
            {/* 3️⃣ Sisi Kiri (Title & Breadcrumb) */}
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold text-gray-800">
                    Dashboard
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    <span id="breadcrumb-home" className="text-gray-500 cursor-pointer hover:text-hijau">
                        Dashboard
                    </span>
                    <span id="breadcrumb-separator" className="text-gray-500">
                        /
                    </span>
                    <span id="breadcrumb-current" className="text-gray-500">
                        Order List
                    </span>
                </div>
            </div>

            {/* 4️⃣ Sisi Kanan (Action Button) */}
            <div id="action-button">
                <button 
                    id="add-button" 
                    className="bg-hijau text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:opacity-90 transition-opacity"
                >
                    + Add New Order
                </button>
            </div>
        </div>
    );
}