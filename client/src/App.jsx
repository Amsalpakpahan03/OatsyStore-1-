import React, { useState } from "react"; // Pastikan React diimpor
import { STORE_DATA } from "./Data/Data.js";
import "./App.css";
import Tes from "./components/Tes";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import CartPage from "./components/CartPage";

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");
  const [submissionMessage, setSubmissionMessage] = useState(null);

  // URL Backend Anda (sesuai BE: http://localhost:3000)
  const API_URL = "http://localhost:3000/api/submit-order";
  const WA_ADMIN_PHONE = STORE_DATA.adminPhone; // Asumsi STORE_DATA punya adminPhone

  // Tambah item
  const handleAddToCart = (product) => {
    setCartItems((prev) => [...prev, product]);
  };

  // Hapus item berdasarkan index
  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Bersihkan keranjang
  const handleClearCart = () => {
    setCartItems([]);
  };

  // --- FUNGSI BARU: KIRIM DATA KE BACKEND (BAGIAN INI DIUBAH) ---
  const handleSubmitOrder = async (formData) => {
    setSubmissionMessage(null); // Bersihkan pesan lama

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        // Jika status code 4xx atau 5xx
        throw new Error(
          data.message || `Gagal submit (Status: ${response.status})`
        );
      }

      // DESTRUCTURING: Mengambil detail data yang dikembalikan BE (customer_name, address, notes, order_id)
      const { order_id, customer_name, address, notes } = data;

      // 1. Sukses: Bersihkan Keranjang
      handleClearCart();

      // 2. Simpan pesan sukses
      setSubmissionMessage({ success: true, order_id: order_id });

      // 3. Pindah ke halaman Home
      setCurrentPage("home");

      // --- LOGIKA PESAN WHATSAPP LENGKAP (SESUAI PERMINTAAN) ---

      let itemString = cartItems.map((item) => `- ${item.name}`).join("\n");
      let totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

      const message = `Halo Admin ${
        STORE_DATA.storeName
      }, saya sudah melakukan pesanan di web.
      
*ID Pesanan:* ${order_id}
*Nama:* ${customer_name}
*Alamat:* ${address}
*Total:* Rp ${totalPrice.toLocaleString("id-ID")}

*Pesanan:*
${itemString}

*Catatan:* ${notes || "Tidak ada catatan"}

Bukti bayar sudah saya upload di form website. Mohon dicek. Terima kasih.`;

      const waUrl = `https://wa.me/${WA_ADMIN_PHONE}?text=${encodeURIComponent(
        message
      )}`;

      window.open(waUrl, "_blank");
      // --------------------------------------------------------
    } catch (error) {
      console.error("Kesalahan saat Checkout:", error);
      setSubmissionMessage({
        success: false,
        message: error.message || "Terjadi kesalahan jaringan.",
      });
      // Meneruskan error agar CartPage bisa menghentikan loading
      throw error;
    }
  };
  // ------------------------------------------

  return (
    <div className="min-h-screen bg-[#F4EFE7] font-sans selection:bg-[#B89F86] selection:text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Lato:wght@300;400;700&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Lato', sans-serif; }
        
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F4EFE7; 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #DECCB7; 
          border-radius: 10px;
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>

      {/* Navbar dioperasikan dengan props navigasi */}
      <Navbar
        cartCount={cartItems.length}
        onCartClick={() => setCurrentPage("cart")}
        onHomeClick={() => setCurrentPage("home")}
      />

      {/* --- TAMBAH: Notifikasi di atas --- */}
      {submissionMessage && (
        <div
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-[100] p-4 rounded-xl shadow-lg animate-fade-in-up"
          style={{
            backgroundColor: submissionMessage.success ? "#d4edda" : "#f8d7da",
            color: submissionMessage.success ? "#155724" : "#721c24",
          }}
        >
          {submissionMessage.success
            ? `Pesanan Anda (${submissionMessage.order_id}) berhasil. Silakan cek WhatsApp!`
            : `Gagal: ${submissionMessage.message}`}
        </div>
      )}

      {/* KONDISIONAL RENDERING HALAMAN */}
      {currentPage === "home" ? (
        <>
          <Hero />
          <MenuSection onAddToCart={handleAddToCart} />
        </>
      ) : (
        <CartPage
          cartItems={cartItems}
          onBack={() => setCurrentPage("home")}
          onRemove={handleRemoveFromCart}
          onClear={handleClearCart}
          // --- TAMBAH: Teruskan fungsi submit ke CartPage ---
          onSubmitOrder={handleSubmitOrder}
          // ----------------------------------------------------
        />
      )}

      {/* Footer */}
      <div
        id="footer"
        className="bg-[#5E4A3A] text-[#F4EFE7] py-10 text-center mt-auto"
      >
        <h2 className="text-2xl font-serif mb-2">{STORE_DATA.storeName}</h2>
        <p className="opacity-70 text-sm">
          © 2024 Tugas Akhir Mahasiswa Kreatif
        </p>
      </div>
    </div>
  );
};

export default App;
