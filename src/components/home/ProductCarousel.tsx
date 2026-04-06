"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Product } from '@/types';

export default function ProductCarousel({ title = "Meilleures ventes", products = [] }: { title?: string, products?: Product[] }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth / 2 : clientWidth / 2;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="w-full py-6 md:py-10 px-4 sm:px-6 lg:px-10 bg-white">
      
      {/* Tabs Header */}
      <div className="flex flex-row items-center justify-between mb-4 md:mb-6 gap-2 md:gap-4">
        <div className="flex flex-wrap gap-2">
          <button className="border border-black bg-black text-white px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-bold tracking-wide">
            {title}
          </button>
        </div>
        <Link href="/maillots" className="text-black font-bold text-xs md:text-sm underline underline-offset-4 hover:text-gray-600 transition-colors">
          Tout voir
        </Link>
      </div>

      {/* Carousel */}
      <div className="relative group">
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <div key={index} className="w-[140px] min-w-[140px] md:w-[200px] md:min-w-[200px] lg:w-[220px] lg:min-w-[220px] flex-shrink-0 snap-start group/item">
              <Link href={`/maillots/${product.slug}`} className="block relative bg-[#eceff1] aspect-[4/5] mb-2 md:mb-3 overflow-hidden border border-transparent hover:border-black transition-colors">
                <img 
                  src={product.image} 
                  alt={`Maillot ${product.name} - Acheter pas cher 29€ sur KIT FOOTBALL`} 
                  className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10 text-black">
                  <Heart size={18} strokeWidth={1.5} className="hover:fill-black cursor-pointer" />
                </div>
              </Link>
              <Link href={`/maillots/${product.slug}`} className="block mt-1 md:mt-2 px-1">
                <p className="text-xs md:text-sm font-bold text-black mb-0.5 md:mb-1">{product.price} €</p>
                <h3 className="text-[11px] md:text-sm text-black mb-0.5 md:mb-1 group-hover/item:text-gray-600 transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-[10px] md:text-sm text-gray-500">{product.type}</p>
              </Link>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Hidden on mobile) */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute top-1/3 -translate-y-1/2 left-4 w-12 h-12 bg-white border border-black items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 shadow-md z-10"
          style={{ visibility: scrollProgress <= 0 ? 'hidden' : 'visible' }}
        >
          <ArrowLeft size={24} strokeWidth={1} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute top-1/3 -translate-y-1/2 right-4 w-12 h-12 bg-white border border-black items-center justify-center text-black opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-0 shadow-md z-10"
          style={{ visibility: scrollProgress >= 1 ? 'hidden' : 'visible' }}
        >
          <ArrowRight size={24} strokeWidth={1} />
        </button>
      </div>

      {/* Custom Scrollbar Indicator */}
      <div className="w-full h-[2px] bg-gray-200 mt-2 md:mt-4 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-black transition-all duration-150 ease-out"
          style={{ 
            width: '30%', 
            transform: `translateX(${scrollProgress * 233}%)` // approx (100-30)/30 * 100
          }}
        />
      </div>
    </div>
  );
}
