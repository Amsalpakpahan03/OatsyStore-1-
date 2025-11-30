import React, { useState, useEffect } from "react";
import { ShoppingCart, Menu, X, ChevronRight, Star } from "lucide-react";

const Navbar = ({ cartCount, onCartClick, onHomeClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-[#F4EFE7]/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={onHomeClick}
        >
          <div className="w-8 h-8 rounded-full bg-[#5E4A3A] flex items-center justify-center text-[#F4EFE7] font-bold serif">
            K
          </div>
          <span className="text-2xl font-bold text-[#5E4A3A] font-serif tracking-wide">
            KueManis
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={onHomeClick}
            className="text-[#5E4A3A] font-medium hover:text-[#B89F86] transition-colors"
          >
            Beranda
          </button>
          <button
            onClick={onHomeClick}
            className="text-[#5E4A3A] font-medium hover:text-[#B89F86] transition-colors"
          >
            Menu
          </button>
          <a
            href="#"
            className="text-[#5E4A3A] font-medium hover:text-[#B89F86] transition-colors"
          >
            Tentang
          </a>
          <a
            href="#"
            className="text-[#5E4A3A] font-medium hover:text-[#B89F86] transition-colors"
          >
            Kontak
          </a>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onCartClick}
            className="relative p-2 text-[#5E4A3A] hover:bg-[#DECCB7]/30 rounded-full transition-colors group"
          >
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#B89F86] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden text-[#5E4A3A]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#F4EFE7] shadow-lg py-4 px-6 flex flex-col gap-4 border-t border-[#DECCB7]">
          <button
            onClick={() => {
              onHomeClick();
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-[#5E4A3A] text-lg font-medium border-b border-[#DECCB7]/30 pb-2"
          >
            Beranda
          </button>
          <button
            onClick={() => {
              onHomeClick();
              setIsMobileMenuOpen(false);
            }}
            className="text-left text-[#5E4A3A] text-lg font-medium border-b border-[#DECCB7]/30 pb-2"
          >
            Menu
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
