import React, { useEffect, useState } from "react";
import {
  Loader,
  Package,
  AlertTriangle,
  ExternalLink,
  X,
  Boxes,
  Plus,
  Trash,
  Image as ImageIcon,
} from "lucide-react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showImage, setShowImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  // === ENDPOINT
  const API_ORDERS = "http://localhost:3000/api/admin/orders";
  const API_PRODUCTS = "http://localhost:3000/api/admin/products";

  // === FORM TAMBAH PRODUK
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    desc: "",
    imageFile: null,
  });

  const [imagePreview, setImagePreview] = useState(null);

  // ============================
  // FETCH ORDER
  // ============================
  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_ORDERS);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ============================
  // FETCH PRODUCT
  // ============================
  const fetchProducts = async () => {
    try {
      const res = await fetch(API_PRODUCTS);
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (activeTab === "products") fetchProducts();
  }, [activeTab]);

  // ============================
  // PREVIEW GAMBAR
  // ============================
  const handleSelectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setNewProduct({ ...newProduct, imageFile: file });
    setImagePreview(URL.createObjectURL(file));
  };

  // ============================
  // TAMBAH PRODUK
  // ============================
  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("desc", newProduct.desc);
    formData.append("image", newProduct.imageFile);

    try {
      const res = await fetch(API_PRODUCTS, {
        method: "POST",
        body: formData, // TANPA HEADERS
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Produk berhasil ditambahkan!");

      setNewProduct({ name: "", price: "", desc: "", imageFile: null });
      setImagePreview(null);
      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  // ============================
  // HAPUS PRODUK
  // ============================
  const handleDeleteProduct = async (id) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const res = await fetch(`${API_PRODUCTS}/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      fetchProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 container mx-auto">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#5E4A3A] font-serif flex items-center gap-3">
          <Package size={32} /> Panel Admin
        </h1>

        <button
          onClick={() => {
            localStorage.removeItem("admin_token");
            window.location.href = "/login";
          }}
          className="bg-red-500 text-white py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* TAB */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === "orders"
              ? "bg-[#5E4A3A] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          <Package size={18} /> Pesanan
        </button>

        <button
          onClick={() => setActiveTab("products")}
          className={`px-4 py-2 rounded-xl flex items-center gap-2 ${
            activeTab === "products"
              ? "bg-[#5E4A3A] text-white"
              : "bg-gray-200 text-black"
          }`}
        >
          <Boxes size={18} /> Produk
        </button>
      </div>

      {/* ====================== TAB PESANAN ====================== */}
      {activeTab === "orders" && (
        <>
          {isLoading && (
            <div className="text-center py-10">
              <Loader className="animate-spin text-[#B89F86] mx-auto" />
            </div>
          )}

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md flex items-center gap-3">
              <AlertTriangle size={20} />
              <p>{error}</p>
            </div>
          )}

          <div className="hidden sm:block overflow-x-auto bg-white rounded-2xl shadow-xl">
            <table className="min-w-full divide-y divide-[#DECCB7]">
              <thead className="bg-[#F4EFE7] text-sm">
                <tr>
                  <th className="px-6 py-3 text-left font-bold">ID</th>
                  <th className="px-6 py-3 text-left font-bold">Pelanggan</th>
                  <th className="px-6 py-3 text-left font-bold">Alamat</th>
                  <th className="px-6 py-3 text-left font-bold">Catatan</th>
                  <th className="px-6 py-3 text-left font-bold">Waktu</th>
                  <th className="px-6 py-3 text-left font-bold">Bukti</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F4EFE7]">
                {orders.map((o) => (
                  <tr key={o.order_id} className="hover:bg-[#F4EFE7]/50">
                    <td className="px-6 py-4 font-semibold text-[#B89F86]">
                      {o.order_id}
                    </td>
                    <td className="px-6 py-4">{o.customer_name}</td>
                    <td className="px-6 py-4 max-w-xs whitespace-pre-wrap">
                      {o.address}
                    </td>
                    <td className="px-6 py-4 italic text-gray-600">
                      {o.notes || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(o.created_at).toLocaleString("id-ID")}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setCurrentImage(o.payment_proof_url);
                          setShowImage(true);
                        }}
                        className="text-[#5E4A3A] hover:text-[#B89F86] flex items-center gap-1"
                      >
                        Lihat <ExternalLink size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* ====================== TAB PRODUK ====================== */}
      {activeTab === "products" && (
        <>
          <h2 className="text-3xl font-bold text-[#5E4A3A] mb-6 flex items-center gap-2">
            <Boxes size={26} /> Kelola Produk
          </h2>

          {/* Form Tambah Produk */}
          <form
            onSubmit={handleAddProduct}
            className="bg-white p-5 rounded-2xl shadow-md mb-8"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Plus size={20} /> Tambah Produk
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Nama Produk"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="number"
                placeholder="Harga Produk"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                placeholder="Deskripsi Produk"
                value={newProduct.desc}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, desc: e.target.value })
                }
                className="border p-2 rounded"
              />

              {/* Upload Image */}
              <label className="border p-2 rounded flex items-center gap-2 cursor-pointer">
                <ImageIcon size={18} />
                <span>Pilih Gambar</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleSelectImage}
                />
              </label>
            </div>

            {/* Preview */}
            {imagePreview && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Preview Gambar:</p>
                <img
                  src={imagePreview}
                  className="w-32 h-32 object-cover rounded shadow"
                />
              </div>
            )}

            <button className="mt-5 bg-[#5E4A3A] text-white py-2 px-6 rounded-xl">
              Tambah Produk
            </button>
          </form>

          {/* Daftar Produk */}
          <div className="bg-white rounded-2xl shadow-md p-4">
            <table className="min-w-full text-left">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">Gambar</th>
                  <th className="p-3">Nama</th>
                  <th className="p-3">Harga</th>
                  <th className="p-3">Deskripsi</th>
                  <th className="p-3 text-center">Aksi</th>
                </tr>
              </thead>

              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="border-b">
                    <td className="p-3">
                      <img
                        src={p.image_url}
                        className="w-14 h-14 object-cover rounded"
                      />
                    </td>
                    <td className="p-3 font-semibold">{p.name}</td>
                    <td className="p-3">
                      Rp {Number(p.price).toLocaleString("id-ID")}
                    </td>
                    <td className="p-3">{p.desc}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDeleteProduct(p._id)}
                        className="bg-red-500 text-white py-1 px-3 rounded flex items-center gap-1 mx-auto"
                      >
                        <Trash size={16} /> Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Modal Gambar */}
      {showImage && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl p-4 max-w-full sm:max-w-[500px] relative">
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-3 right-3 bg-red-500 text-white p-1 rounded-full"
            >
              <X size={18} />
            </button>

            <img
              src={currentImage}
              className="max-h-[75vh] max-w-full rounded-xl object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
