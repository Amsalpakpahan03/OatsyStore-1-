import React, { useState } from "react";

// Pastikan kamu menerima productId sebagai props dari parent component
const AddReview = ({ productId }) => {
  const [formData, setFormData] = useState({
    name: "",
    rating: 5, // Default rating
    comment: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Sesuaikan URL API dengan struktur routing kamu
      // Asumsi: Backend kamu menggabungkan router di path "/api"
      const response = await fetch(`http://localhost:3000/api/products/${productId}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", message: "Terima kasih! Review berhasil dikirim." });
        setFormData({ name: "", rating: 5, comment: "" }); // Reset form
      } else {
        setStatus({ type: "error", message: data.error || "Gagal mengirim review." });
      }
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Terjadi kesalahan koneksi server." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white mt-4">
      <h3 className="text-lg font-bold mb-3">Berikan Ulasan Anda</h3>
      
      {status.message && (
        <div className={`p-2 mb-3 rounded ${status.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Input Nama */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Nama</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nama Anda"
          />
        </div>

        {/* Input Rating (Star Selector Sederhana) */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Rating</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => handleRatingChange(star)}
                className={`text-2xl ${star <= formData.rating ? "text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        {/* Input Komentar */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Komentar</label>
          <textarea
            name="comment"
            required
            rows="3"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tulis pengalaman Anda..."
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {isSubmitting ? "Mengirim..." : "Kirim Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;