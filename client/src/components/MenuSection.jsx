import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  X,
  ChevronRight,
  ChevronLeft,
  Plus,
  CheckCircle,
  Star, // TAMBAHAN: Icon bintang
} from "lucide-react";

// TAMBAHAN: Import komponen review yang sudah dibuat sebelumnya
import ProductReviews from "./ProductReviews"; 

const MenuSection = ({ onAddToCart }) => {
  const scrollContainerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // STATE BARU: Produk dari database
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // STATE BARU: Untuk popup review
  const [selectedProductForReview, setSelectedProductForReview] = useState(null);

  // AMBIL DATA DARI BACKEND
  useEffect(() => {
    fetch("https://3ac66a31-8db6-4d64-9727-4203c6f07c66-00-3f5slvm9dy918.pike.replit.dev/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.products) {
          setProducts(data.products);
        } else {
          console.error("Format API tidak sesuai", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal memuat produk:", err);
        setLoading(false);
      });
  }, []);

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

  if (loading) {
    return (
      <section id="menu" className="py-32 text-center text-lg">
        Memuat produk...
      </section>
    );
  }

  return (
    <section id="menu" className="py-20 bg-white relative">
      <div className="container mx-auto px-2">

        {/* Header */}
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
        </div>

        {/* LIST PRODUK */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide px-0"
        >
          {products.map((product) => (
            <div
              key={product._id}
              className="min-w-[300px] md:min-w-[350px] bg-[#F4EFE7] rounded-3xl overflow-hidden snap-center shadow-lg hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* GAMBAR */}
              <div className="h-64 w-full relative flex items-center justify-center overflow-hidden">
                <img
                  src={
                    product.image
                      ? `https://3ac66a31-8db6-4d64-9727-4203c6f07c66-00-3f5slvm9dy918.pike.replit.dev${product.image}`
                      : "/no-image.png"
                  }
                  alt={product.name}
                  className="h-64 w-full object-cover"
                />
              </div>

              {/* Konten Card */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-[#5E4A3A] font-serif">
                    {product.name}
                  </h3>
                  <span className="text-[#B89F86] font-bold">
                    Rp {product.price.toLocaleString("id-ID")}
                  </span>
                </div>

                <p className="text-[#5E4A3A]/70 text-sm mb-6 line-clamp-2 flex-grow">
                  {product.desc}
                </p>

                {/* EDIT DI SINI: Tombol dipisah jadi dua (Ulasan & Beli) */}
                <div className="flex gap-2 mt-auto">
                  {/* Tombol Lihat Review */}
                  <button
                    onClick={() => setSelectedProductForReview(product)}
                    className="px-3 py-3 bg-white border border-[#5E4A3A] text-[#5E4A3A] rounded-xl hover:bg-[#F4EFE7] transition-all flex items-center justify-center"
                    title="Lihat Ulasan"
                  >
                    <Star size={18} />
                  </button>

                  {/* Tombol Add to Cart */}
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="flex-1 py-3 bg-[#5E4A3A] text-[#F4EFE7] rounded-xl font-semibold hover:bg-[#4a3b2e] transition-all flex items-center justify-center gap-2"
                  >
                    <Plus size={18} />
                    Beli
                  </button>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tombol scroll */}
      <div className="flex gap-8 items-center justify-center mt-4">
        <button
          onClick={() => scroll("left")}
          className="p-5 rounded-full border border-[#DECCB7] text-[#5E4A3A] hover:bg-[#5E4A3A] hover:text-[#F4EFE7] transition-all"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="p-5 rounded-full border border-[#DECCB7] text-[#5E4A3A] hover:bg-[#5E4A3A] hover:text-[#F4EFE7] transition-all"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* MODAL KONFIRMASI (ADD TO CART) */}
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
                </span>
                .
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
                  <CheckCircle size={18} />
                  Ya, Beli
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAMBAHAN BARU: MODAL KHUSUS REVIEW */}
      {selectedProductForReview && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 backdrop-blur-sm bg-black/50">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-fade-in-up relative">
            
            {/* Header Modal Review */}
            <div className="flex justify-between items-center p-6 border-b bg-[#F4EFE7]">
              <div>
                <h3 className="text-xl font-bold text-[#5E4A3A] font-serif">
                  Ulasan Produk
                </h3>
                <p className="text-sm text-[#5E4A3A]/70">
                  {selectedProductForReview.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedProductForReview(null)}
                className="p-2 bg-white rounded-full hover:bg-red-50 hover:text-red-500 transition shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            {/* Isi Modal: Panggil ProductReviews Component */}
            <div className="overflow-y-auto p-0 bg-white">
              <ProductReviews productId={selectedProductForReview._id} />
            </div>
            
          </div>
        </div>
      )}

    </section>
  );
};

export default MenuSection;