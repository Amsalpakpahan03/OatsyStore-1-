import { useEffect, useState } from "react";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = "https://YOUR_BACKEND_URL/api";

  // Ambil review
  const fetchReviews = async () => {
    setLoading(true);
    const res = await fetch(`${API_BASE}/products/${productId}/reviews`);
    const data = await res.json();
    setReviews(data.reviews || []);
    setLoading(false);
  };

  // Jalankan fetch saat komponen dibuka
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // Submit review
  const handleSubmit = async (reviewData) => {
    await fetch(`${API_BASE}/products/${productId}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reviewData),
    });

    fetchReviews(); // refresh review list
  };

  return (
    <div className="mt-8 border p-4 rounded-lg bg-[#fff]">
      <h2 className="text-xl font-bold">Review Pembeli</h2>

      {loading ? (
        <p>Sedang memuat review...</p>
      ) : (
        <ReviewList reviews={reviews} />
      )}

      <ReviewForm onSubmit={handleSubmit} />
    </div>
  );
};

export default ReviewSection;
