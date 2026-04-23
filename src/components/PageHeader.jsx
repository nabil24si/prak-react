// components/PageHeader.jsx
export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4 bg-white shadow-sm">
            {/* Sisi Kiri (Title & Breadcrumb) */}
            <div id="pageheader-left" className="flex flex-col">
                <span id="page-title" className="text-3xl font-semibold text-gray-800">
                    {title}
                </span>
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <span className="text-gray-500 cursor-pointer hover:text-green-600">{item}</span>
                                {index < breadcrumb.length - 1 && <span className="text-gray-400">/</span>}
                            </div>
                        ))
                    ) : (
                        <span className="text-gray-500">{breadcrumb}</span>
                    )}
                </div>
            </div>

            {/* Sisi Kanan (Slot untuk tombol Add) */}
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}