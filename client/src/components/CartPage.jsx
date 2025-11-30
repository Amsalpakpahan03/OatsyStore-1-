import React, { useState, useRef } from "react";
import { STORE_DATA, PRODUCTS_DATA } from "../Data/Data.js";
import {
  ShoppingCart,
  ChevronRight,
  CheckCircle,
  Trash2,
  ArrowLeft,
  Upload,
  QrCode,
  AlertCircle,
  X, // Perlu diimpor untuk Modal
  Plus, // Perlu diimpor untuk MenuSection
  ChevronLeft // Perlu diimpor untuk MenuSection
} from "lucide-react";

// --- KOMPONEN: MENU SECTION (DIPERLUKAN KARENA ADA DI FILE YANG SAMA) ---
const MenuSection = ({ onAddToCart }) => {
  const scrollContainerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -350 : 350;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const confirmAddToCart = () => {
    onAddToCart(selectedProduct);
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <section id="menu" className="py-20 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <span className="text-[#B89F86] font-bold tracking-wider uppercase text-sm">
              Menu Favorit
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5E4A3A] font-serif mt-2">
              Pilihan Manis Untukmu
            </h2>
            <p className="text-[#5E4A3A]/70 mt-4">
              Geser untuk melihat koleksi kue terbaik kami yang dibuat fresh
              setiap hari.
            </p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="p-3 rounded-full border border-[#DECCB7] text-[#5E4A3A] hover:bg-[#5E4A3A] hover:text-[#F4EFE7] transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-3 rounded-full border border-[#DECCB7] text-[#5E4A3A] hover:bg-[#5E4A3A] hover:text-[#F4EFE7] transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-2"
        >
          {PRODUCTS_DATA.map((product) => (
            <div
              key={product.id}
              className="min-w-[300px] md:min-w-[350px] bg-[#F4EFE7] rounded-3xl overflow-hidden snap-center shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              <div
                className="h-64 w-full relative flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: product.imageColor }}
              >
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-all"></div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                  <span className="text-4xl">🍰</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#5E4A3A] font-serif">
                    {product.name}
                  </h3>
                  <span className="text-[#B89F86] font-bold">
                    {(product.price / 1000).toFixed(0)}k
                  </span>
                </div>
                <p className="text-[#5E4A3A]/70 text-sm mb-6 line-clamp-2 flex-grow">
                  {product.desc}
                </p>
                <button
                  onClick={() => handleOpenModal(product)}
                  className="w-full py-3 bg-white border border-[#5E4A3A] text-[#5E4A3A] rounded-xl font-semibold hover:bg-[#5E4A3A] hover:text-[#F4EFE7] transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  <Plus size={18} /> Tambah ke Keranjang
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-[#5E4A3A]/40 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative z-10 shadow-2xl animate-fade-in-up">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-[#5E4A3A]/50 hover:text-[#5E4A3A]"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F4EFE7] rounded-full flex items-center justify-center mx-auto mb-4 text-[#B89F86]">
                <ShoppingCart size={32} />
              </div>
              <h3 className="text-2xl font-bold text-[#5E4A3A] font-serif mb-2">
                Tambah Pesanan?
              </h3>
              <p className="text-[#5E4A3A]/70 mb-6">
                Kamu akan menambahkan{" "}
                <span className="font-bold">{selectedProduct.name}</span>{" "}
                seharga{" "}
                <span className="font-bold">
                  Rp {selectedProduct.price.toLocaleString("id-ID")}
                </span>{" "}
                ke dalam keranjang.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 border border-[#DECCB7] text-[#5E4A3A] rounded-xl font-semibold hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={confirmAddToCart}
                  className="flex-1 py-3 bg-[#5E4A3A] text-[#F4EFE7] rounded-xl font-semibold hover:bg-[#B89F86] transition-colors flex items-center justify-center gap-2"
                >
                  <CheckCircle size={18} /> Ya, Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// --- KOMPONEN: CART & TRANSACTION PAGE ---
// PERUBAHAN UTAMA DI SINI
const CartPage = ({ cartItems, onBack, onRemove, onClear, onSubmitOrder }) => {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    catatan: "",
  });
  const [fileBukti, setFileBukti] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State untuk Modal Peringatan
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFileBukti(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- 1. DETEKSI FIELD YANG KOSONG ---
    const missing = [];
    if (!formData.nama || formData.nama.trim() === "")
      missing.push("Nama Lengkap");
    if (!formData.alamat || formData.alamat.trim() === "")
      missing.push("Alamat Pengiriman");
    if (!fileBukti) missing.push("Upload Bukti Pembayaran");

    // Jika ada yang kosong, tampilkan modal peringatan
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowWarningModal(true);
      return; // Hentikan proses submit
    }

    // --- 2. CEK KONFIGURASI ADMIN ---
    if (!STORE_DATA.adminPhone) {
      alert(
        "Konfigurasi Error: Nomor WhatsApp Admin belum diatur di STORE_DATA."
      );
      return;
    }

    setIsSubmitting(true);

    // --- 3. LOGIKA KIRIM (MENGGANTI SIMULASI DENGAN KONEKSI BE) ---
    // Buat Objek FormData
    const dataToSend = new FormData();
    dataToSend.append("nama", formData.nama);
    dataToSend.append("alamat", formData.alamat);
    dataToSend.append("catatan", formData.catatan); 
    dataToSend.append("bukti_bayar", fileBukti); 

    // Kirim ke fungsi yang terhubung ke Backend (App.jsx)
    onSubmitOrder(dataToSend)
      .catch((error) => {
        // Tangkap error jika fetch gagal
        console.error("Submit gagal:", error);
      })
      .finally(() => {
        // Hentikan state loading
        setIsSubmitting(false); 
      });
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 container mx-auto animate-fade-in-up">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#5E4A3A] hover:text-[#B89F86] font-semibold mb-8 transition-colors"
      >
        <ArrowLeft size={20} /> Kembali Belanja
      </button>

      <h1 className="text-4xl font-bold text-[#5E4A3A] font-serif mb-8">
        Keranjang & Pembayaran
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-[#DECCB7]/30">
          <div className="w-24 h-24 bg-[#F4EFE7] rounded-full flex items-center justify-center mx-auto mb-6 text-[#B89F86]">
            <ShoppingCart size={48} />
          </div>
          <h2 className="text-2xl font-bold text-[#5E4A3A]">
            Keranjang Kosong
          </h2>
          <p className="text-[#5E4A3A]/60 mt-2">
            Belum ada kue manis yang kamu pilih.
          </p>
        </div>
      ) : (
        // PERBAIKAN: Tag <form> ditutup dengan benar di bagian akhir
        <form onSubmit={handleSubmit} className="grid lg:grid-cols-2 gap-12">
          {/* KOLOM KIRI: FORMULIR */}
          <div className="space-y-8">
            {/* Bagian 1: Data Diri */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#DECCB7]/30">
              <h3 className="text-xl font-bold text-[#5E4A3A] font-serif mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#F4EFE7] flex items-center justify-center text-sm">
                  1
                </span>
                Informasi Pengiriman
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-[#5E4A3A] mb-2">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-[#DECCB7] focus:outline-none focus:ring-2 focus:ring-[#B89F86] bg-[#F4EFE7]/30"
                    placeholder="Contoh: Budi Santoso"
                    value={formData.nama}
                    onChange={(e) =>
                      setFormData({ ...formData, nama: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5E4A3A] mb-2">
                    Alamat Lengkap
                  </label>
                  <textarea
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-[#DECCB7] focus:outline-none focus:ring-2 focus:ring-[#B89F86] bg-[#F4EFE7]/30"
                    placeholder="Jalan, Nomor Rumah, Kecamatan..."
                    value={formData.alamat}
                    onChange={(e) =>
                      setFormData({ ...formData, alamat: e.target.value })
                    }
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#5E4A3A] mb-2">
                    Catatan (Opsional)
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-[#DECCB7] focus:outline-none focus:ring-2 focus:ring-[#B89F86] bg-[#F4EFE7]/30"
                    placeholder="Contoh: Jangan terlalu manis, tambah kartu ucapan"
                    value={formData.catatan}
                    onChange={(e) =>
                      setFormData({ ...formData, catatan: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            {/* Bagian 2: Pembayaran */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#DECCB7]/30">
              <h3 className="text-xl font-bold text-[#5E4A3A] font-serif mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#F4EFE7] flex items-center justify-center text-sm">
                  2
                </span>
                Pembayaran
              </h3>

              <div className="bg-[#5E4A3A] text-[#F4EFE7] p-6 rounded-2xl flex flex-col items-center text-center mb-6">
                <p className="text-sm opacity-80 mb-2">
                  Scan QRIS ini untuk membayar
                </p>
                <div className="bg-white p-2 rounded-lg mb-2">
                  <img
                    src={STORE_DATA.qrCodeImage}
                    alt="QRIS Code"
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <p className="font-bold text-lg">{STORE_DATA.storeName}</p>
                <p className="text-sm opacity-80">
                  NMID: {STORE_DATA.merchantNMID}
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#5E4A3A] mb-2">
                  Upload Bukti Transfer
                </label>
                <div className="relative border-2 border-dashed border-[#DECCB7] rounded-xl p-8 text-center hover:bg-[#F4EFE7] transition-colors cursor-pointer group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center gap-2 text-[#5E4A3A]/60 group-hover:text-[#5E4A3A]">
                    {fileBukti ? (
                      <>
                        <CheckCircle size={32} className="text-green-500" />
                        <span className="font-semibold text-[#5E4A3A]">
                          {fileBukti.name}
                        </span>
                        <span className="text-xs text-green-600">
                          File siap diupload
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload size={32} />
                        <span className="font-semibold">
                          Klik untuk upload foto struk
                        </span>
                        <span className="text-xs">
                          Format: JPG, PNG (Max 2MB)
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: RINGKASAN */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-[#DECCB7]/30 sticky top-28">
              <h3 className="text-xl font-bold text-[#5E4A3A] font-serif mb-6">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border-b border-[#F4EFE7] pb-4"
                  >
                    <div
                      className="w-16 h-16 rounded-xl bg-[#F4EFE7] flex-shrink-0"
                      style={{ backgroundColor: item.imageColor }}
                    ></div>
                    <div className="flex-grow">
                      <h4 className="font-bold text-[#5E4A3A] text-sm">
                        {item.name}
                      </h4>
                      <p className="text-[#B89F86] font-semibold text-sm">
                        Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemove(index)}
                      className="text-red-400 hover:text-red-600 p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-[#DECCB7] pt-4 mb-8">
                <div className="flex justify-between text-[#5E4A3A]/70">
                  <span>Subtotal</span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between text-[#5E4A3A]/70">
                  <span>Biaya Layanan</span>
                  <span>Gratis</span>
                </div>
                <div className="flex justify-between text-[#5E4A3A] font-bold text-xl pt-2">
                  <span>Total</span>
                  <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
                </div>
              </div>

              <button
                onClick={handleSubmit}
                // DISINI KITA HAPUS CONSTRAINT DISABLED AGAR TOMBOL SELALU BISA DIKLIK UTK CEK VALIDASI
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
                  isSubmitting
                    ? "bg-[#DECCB7] text-[#5E4A3A] cursor-not-allowed"
                    : "bg-[#5E4A3A] text-[#F4EFE7] hover:bg-[#B89F86] shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                }`}
              >
                {isSubmitting ? "Memproses..." : "Konfirmasi & Kirim ke WA"}
                {!isSubmitting && <ChevronRight size={20} />}
              </button>
              <p className="text-xs text-center text-[#5E4A3A]/50 mt-4">
                Data pesanan akan dikirim ke WhatsApp Admin setelah
                dikonfirmasi.
              </p>
            </div>
          </div>
        </form> 
      )}

      {/* --- POPUP / MODAL PERINGATAN --- */}
      {showWarningModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowWarningModal(false)}
          ></div>
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full relative z-10 shadow-2xl animate-fade-in-up text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-500">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#5E4A3A] mb-2">
              Data Belum Lengkap
            </h3>
            <p className="text-[#5E4A3A]/70 mb-4">
              Mohon lengkapi data berikut sebelum melanjutkan:
            </p>
            <div className="bg-red-50 p-4 rounded-xl mb-6 text-left">
              <ul className="list-disc list-inside text-red-600 text-sm font-medium space-y-1">
                {missingFields.map((field, idx) => (
                  <li key={idx}>{field}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={() => setShowWarningModal(false)}
              className="w-full py-3 bg-[#5E4A3A] text-[#F4EFE7] rounded-xl font-semibold hover:bg-[#B89F86] transition-colors"
            >
              Siap, Saya Lengkapi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default CartPage;