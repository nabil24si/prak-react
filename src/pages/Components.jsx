import PageHeader from "../components/PageHeader";
import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Container from "../components/Container";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import Footer from "../components/Footer";

export default function ComponentsPage() {
  const headers = ["No", "Nama Produk", "Kategori", "Harga", "Aksi"];

  const products = [
    {
      id: 1,
      name: "Laptop Asus",
      category: "Elektronik",
      price: "Rp 8.000.000"
    },
    {
      id: 2,
      name: "Sepatu Sport",
      category: "Fashion",
      price: "Rp 450.000"
    },
    {
      id: 3,
      name: "Jam Tangan",
      category: "Aksesoris",
      price: "Rp 799.000"
    }
  ];

  return (
    <div className="p-6 space-y-10">
      <PageHeader 
        title="Components Playground" 
        description="Pertemuan 10: Implementasi Reusable Components sesuai modul praktikum." 
      />

      {/* SECTION 1: BASIC COMPONENTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">1. Basic Component</h2>
        <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Button Variants</h3>
            <div className="flex flex-wrap gap-3">
              <Button type="success">Simpan</Button>
              <Button type="primary">Primary Action</Button>
              <Button type="secondary">Edit</Button>
              <Button type="danger">Hapus</Button>
              <Button type="warning">Warning</Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Badge Status</h3>
            <div className="flex flex-wrap gap-3">
              <Badge type="success">Aktif</Badge>
              <Badge type="primary">Baru</Badge>
              <Badge type="warning">Pending</Badge>
              <Badge type="danger">Selesai</Badge>
              <Badge type="secondary">Draft</Badge>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Avatar Initials</h3>
            <div className="flex gap-3">
              <Avatar name="Budi" />
              <Avatar name="Siti" />
              <Avatar name="Faqih" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LAYOUT COMPONENTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">2. Layout Component</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <Container className="bg-gray-50 border-dashed border-2 border-gray-200 m-4 rounded-lg text-center">
            <h1 className="text-2xl font-bold mb-2 text-gray-800">Daftar Produk</h1>
            <p className="text-gray-600">
              Berikut adalah daftar produk terbaru. Elemen ini berada di dalam sebuah Container component.
            </p>
          </Container>
        </div>
      </section>

      {/* SECTION 3: DATA DISPLAY COMPONENTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-800 border-b pb-2">3. Data Display Component</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Product Cards Grid</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ProductCard
                image="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                title="Sepatu Sport"
                category="Fashion"
                price="Rp 450.000"
                description="Sepatu sport modern dengan desain nyaman dan ringan untuk aktivitas sehari-hari."
              />
              <ProductCard
                image="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
                title="Smartphone"
                category="Elektronik"
                price="Rp 4.500.000"
                description="Smartphone dengan performa cepat, kamera jernih, dan baterai tahan lama."
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">Dynamic Data Table</h3>
            <Table headers={headers}>
              {products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 border-b border-gray-200 font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 border-b border-gray-200 font-medium text-gray-900">{product.name}</td>
                  <td className="px-6 py-4 border-b border-gray-200">{product.category}</td>
                  <td className="px-6 py-4 border-b border-gray-200 font-semibold text-blue-600">{product.price}</td>
                  <td className="px-6 py-4 border-b border-gray-200">
                    <Button type="primary">Detail</Button>
                  </td>
                </tr>
              ))}
            </Table>
          </div>
        </div>
      </section>

      {/* FOOTER WRAPPER PREVIEW */}
      <div className="pt-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Footer Preview</h3>
        <Footer />
      </div>
    </div>
  );
}