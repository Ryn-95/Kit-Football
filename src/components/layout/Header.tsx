"use client";

import Link from 'next/link';
import { ShoppingBag, Search, Menu, X, ChevronDown, User, Heart, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';

import Image from 'next/image';

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalItems, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen, isSearchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      {/* Top Black Bar */}
      <div className="bg-black text-white text-[11px] font-bold tracking-wide py-2 px-4 flex justify-center items-center gap-1 cursor-pointer">
        Livraison standard gratuite pour les membres <ChevronDown size={14} />
      </div>

      <div className="w-full bg-white sticky top-0 z-[100] border-b border-gray-200">
        
        {/* Top Right Mini Menu */}
        <div className="hidden lg:flex justify-end gap-5 px-10 py-1 text-[11px] text-gray-600">
          <Link href="#" className="hover:underline">aide</Link>
          <Link href="#" className="hover:underline">suivi de commande</Link>
          <Link href="#" className="hover:underline font-bold text-black">créer un compte</Link>
        </div>

        {/* Main Header */}
        <header className="px-6 lg:px-10 py-0 flex items-center justify-between h-16 lg:h-20">
          
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-black hover:text-gray-600 transition-colors p-2 -ml-2"
            >
              <Menu size={28} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link href="/" className="flex flex-col items-center justify-center group relative z-10 mr-4" title="KIT FOOTBALL - Accueil">
              <img 
                src="/logo_kit_football_sans_arriere_plan.png" 
                alt="KIT FOOTBALL - Boutique n°1 de Maillots de Foot Pas Cher" 
                className="h-10 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-6 h-full font-bold text-[14px] tracking-wide">
            <Link href="/maillots" className="h-full flex items-center border-b-[3px] border-transparent hover:border-black transition-all">MAILLOTS</Link>
            <Link href="/maillots?type=Domicile" className="h-full flex items-center border-b-[3px] border-transparent hover:border-black transition-all">CLUBS</Link>
            <Link href="/maillots/type/retro" className="h-full flex items-center border-b-[3px] border-transparent hover:border-black transition-all">RÉTRO</Link>
            <Link href="/maillots/type/training" className="h-full flex items-center border-b-[3px] border-transparent hover:border-black transition-all">TRAINING</Link>
            <Link href="/maillots?q=enfant" className="h-full flex items-center border-b-[3px] border-transparent hover:border-black transition-all">ENFANTS</Link>
            <Link href="/maillots" className="h-full flex items-center border-b-[3px] border-transparent hover:border-black transition-all text-red-600 hover:text-red-800">PROMO</Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-5">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center bg-[#eceff1] px-3 py-1.5 h-10 w-48 rounded-sm relative">
              <form onSubmit={handleSearch} className="flex-1 flex items-center w-full">
                <input 
                  type="text" 
                  placeholder="Rechercher" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none w-full text-sm text-black placeholder-gray-600 focus:ring-0"
                />
                <button type="submit" className="absolute right-3">
                  <Search size={20} className="text-black" />
                </button>
              </form>
            </div>
            
            <button className="lg:hidden text-black"><Search size={24} /></button>
            <Link href="/compte" className="hidden lg:flex text-black relative">
              <User size={20} strokeWidth={1.5} />
            </Link>
            <button className="hidden lg:flex text-black"><Heart size={20} strokeWidth={1.5} /></button>
            <button onClick={() => setIsCartOpen(true)} className="text-black relative flex">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[10px] w-[18px] h-[18px] flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </header>
      </div>
      
      {/* Promo Banner under header */}
      <div className="bg-[#f5f5e6] text-black text-[13px] font-bold py-2 px-4 flex justify-center items-center gap-2 text-center cursor-pointer border-b border-gray-200">
        Livraison express 48h disponible sur tous nos maillots en stock ! <ArrowRight size={16} />
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-[200] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col items-center justify-center group relative z-10">
              <img 
                src="/logo_kit_football_sans_arriere_plan.png" 
                alt="Kit Football Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-black">
              <X size={32} />
            </button>
          </div>
          <div className="p-6 flex flex-col gap-6 text-xl font-bold text-black">
            <Link href="/maillots" onClick={() => setIsMobileMenuOpen(false)}>MAILLOTS</Link>
            <Link href="/maillots?type=Domicile" onClick={() => setIsMobileMenuOpen(false)}>CLUBS</Link>
            <Link href="/maillots/type/retro" onClick={() => setIsMobileMenuOpen(false)}>RÉTRO</Link>
            <Link href="/maillots/type/training" onClick={() => setIsMobileMenuOpen(false)}>TRAINING</Link>
            <Link href="/maillots?q=enfant" onClick={() => setIsMobileMenuOpen(false)}>ENFANTS</Link>
            <Link href="/maillots" onClick={() => setIsMobileMenuOpen(false)} className="text-red-600">PROMO</Link>
          </div>
        </div>
      )}
    </>
  );
}
