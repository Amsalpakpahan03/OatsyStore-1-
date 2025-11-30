// import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronRight, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center pt-20 overflow-hidden bg-[#F4EFE7]">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#DECCB7]/20 rounded-l-[100px] -z-0"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-[#B89F86]/10 blur-xl"></div>

      <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        {/* Kiri: Teks Promosi */}
        <div className="space-y-6 text-center md:text-left animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#DECCB7]/30 rounded-full text-[#5E4A3A] text-sm font-semibold tracking-wide uppercase">
            <Star size={16} fill="#5E4A3A" />
            Promo Spesial Hari Ini
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#5E4A3A] font-serif leading-tight">
            Rasakan <span className="text-[#B89F86] italic">Lembutnya</span>{" "}
            Kebahagiaan.
          </h1>

          <p className="text-[#5E4A3A]/80 text-lg md:text-xl max-w-lg mx-auto md:mx-0 leading-relaxed">
            Dibuat dengan bahan premium pilihan untuk momen manis tak
            terlupakan. Dapatkan diskon 20% untuk pembelian pertama!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <button className="px-8 py-4 bg-[#5E4A3A] text-[#F4EFE7] rounded-full font-semibold hover:bg-[#B89F86] transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1">
              Pesan Sekarang
              <ChevronRight size={20} />
            </button>
            <button className="px-8 py-4 border-2 border-[#5E4A3A] text-[#5E4A3A] rounded-full font-semibold hover:bg-[#5E4A3A] hover:text-[#F4EFE7] transition-all duration-300">
              Lihat Menu
            </button>
          </div>

          <div className="pt-8 flex items-center gap-8 justify-center md:justify-start opacity-80 pb-4">
            <div>
              <p className="text-3xl font-bold text-[#5E4A3A]">5k+</p>
              <p className="text-sm text-[#5E4A3A]/70">Pelanggan Puas</p>
            </div>
            <div className="w-px h-12 bg-[#5E4A3A]/20"></div>
            <div>
              <p className="text-3xl font-bold text-[#5E4A3A]">100%</p>
              <p className="text-sm text-[#5E4A3A]/70">Bahan Alami</p>
            </div>
          </div>
        </div>

        {/* Kanan: Gambar Visual Utama */}
        <div className="relative flex justify-center items-center">
          {/* Lingkaran Dekoratif di belakang gambar */}
          <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-2 border-[#B89F86] rounded-full animate-spin-slow opacity-30"></div>
          <div className="absolute w-[280px] h-[280px] md:w-[480px] md:h-[480px] border border-[#5E4A3A] rounded-full opacity-20"></div>

          {/* Gambar Kue Utama (Placeholder Menggunakan SVG agar tidak perlu link eksternal) */}
          <div className="relative w-[320px] h-[320px] md:w-[500px] md:h-[500px] drop-shadow-2xl hover:scale-105 transition-transform duration-500 cursor-pointer">
            <svg
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <defs>
                <clipPath id="circleView">
                  <circle cx="250" cy="250" r="220" />
                </clipPath>
              </defs>
              {/* Piring/Alas */}
              <ellipse
                cx="250"
                cy="420"
                rx="200"
                ry="40"
                fill="#DECCB7"
                opacity="0.5"
              />

              {/* Kue Layer 1 */}
              <path
                d="M100 350 Q250 450 400 350 L400 250 Q250 350 100 250 Z"
                fill="#5E4A3A"
              />
              <path
                d="M100 250 Q250 350 400 250 Q250 150 100 250 Z"
                fill="#6F5846"
              />

              {/* Kue Layer 2 (Cream) */}
              <path
                d="M120 240 Q250 320 380 240 L380 180 Q250 260 120 180 Z"
                fill="#F4EFE7"
              />
              <path
                d="M120 180 Q250 260 380 180 Q250 100 120 180 Z"
                fill="#FFF8F0"
              />

              {/* Toping Strawberry */}
              <circle cx="250" cy="150" r="30" fill="#B82E2E" />
              <path d="M250 120 L240 100 L260 100 Z" fill="green" />
              <circle cx="200" cy="170" r="20" fill="#B82E2E" />
              <circle cx="300" cy="170" r="20" fill="#B82E2E" />
            </svg>

            {/* Badge Harga Floating */}
            <div className="absolute bottom-10 -left-4 md:bottom-20 md:-left-10 bg-white p-4 rounded-xl shadow-xl flex items-center gap-3 animate-bounce-slow">
              <div className="bg-[#F4EFE7] p-2 rounded-full">
                <span className="text-xl">🍰</span>
              </div>
              <div>
                <p className="text-xs text-[#5E4A3A] font-bold">Best Seller</p>
                <p className="text-lg font-bold text-[#B89F86]">
                  Choco Delight
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
