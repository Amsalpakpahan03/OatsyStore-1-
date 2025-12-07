const ReviewList = ({ reviews }) => {
  if (reviews.length === 0) {
    return <p className="text-gray-500 mt-3">Belum ada review.</p>;
  }

  return (
    <div className="mt-4 space-y-3">
      {reviews.map((r) => (
        <div key={r._id} className="p-3 border rounded bg-gray-50">
          <p className="font-semibold">{r.name}</p>
          <p className="text-yellow-600">⭐ {r.rating}/5</p>
          <p className="text-sm">{r.comment}</p>
          <p className="text-xs text-gray-500">
            {new Date(r.createdAt).toLocaleString("id-ID")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
