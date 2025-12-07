import React, { useState, useEffect } from "react";

// URL Backend Kamu (Diambil dari MenuSection yang sudah jalan)
const API_BASE_URL = "https://3ac66a31-8db6-4d64-9727-4203c6f07c66-00-3f5slvm9dy918.pike.replit.dev";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State untuk Form Input
  const [formData, setFormData] = useState({ name: "", rating: 5, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  // --- 1. AMBIL DATA REVIEW (GET) ---
  const fetchReviews = async () => {
    try {
      // PERBAIKAN: Menggunakan URL lengkap
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.reviews);
      }
    } catch (error) {
      console.error("Gagal ambil review:", error);
    } finally {
      setLoading(false);
    }
  };

  // Jalankan saat pertama kali dibuka atau productId berubah
  useEffect(() => {
    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  // --- 2. KIRIM REVIEW BARU (POST) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg(null);

    try {
      // PERBAIKAN: Menggunakan URL lengkap
      const res = await fetch(`${API_BASE_URL}/api/products/${productId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setMsg({ type: "success", text: "Review berhasil dikirim!" });
        setFormData({ name: "", rating: 5, comment: "" }); // Reset form
        fetchReviews(); // Refresh list review agar yang baru muncul
      } else {
        setMsg({ type: "error", text: "Gagal: " + (data.error || "Terjadi kesalahan") });
      }
    } catch (error) {
      console.error("Error submit review:", error);
      setMsg({ type: "error", text: "Error koneksi server" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper untuk render bintang
  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`text-xl ${i < count ? "text-yellow-400" : "text-gray-300"}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-serif font-bold mb-6 text-[#5E4A3A]">Ulasan Pelanggan</h3>

      {/* --- BAGIAN LIST REVIEW --- */}
      <div className="mb-10 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
        {loading ? (
          <p className="text-gray-500">Memuat ulasan...</p>
        ) : reviews.length === 0 ? (
          <p className="text-gray-400 italic text-center py-4">Belum ada ulasan. Jadilah yang pertama!</p>
        ) : (
          reviews.map((review, idx) => (
            <div key={idx} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <div className="flex mb-1">{renderStars(review.rating)}</div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString("id-ID")}
                </span>
              </div>
              <p className="text-gray-600 mt-1 text-sm">{review.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* --- BAGIAN FORM INPUT --- */}
      <div className="bg-[#F9F5F0] p-5 rounded-lg">
        <h4 className="font-bold text-lg mb-4 text-[#5E4A3A]">Tulis Ulasan Anda</h4>
        
        {msg && (
          <div className={`p-2 mb-3 text-sm rounded ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {msg.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className={`text-2xl focus:outline-none transition ${
                    star <= formData.rating ? "text-yellow-400 scale-110" : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Nama Anda"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#5E4A3A] outline-none"
            />
          </div>

          <div className="mb-3">
            <textarea
              placeholder="Ceritakan pengalamanmu..."
              required
              rows="3"
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-[#5E4A3A] outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#5E4A3A] text-white py-2 rounded font-bold hover:bg-[#4a3b2e] transition disabled:opacity-50"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Ulasan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductReviews;