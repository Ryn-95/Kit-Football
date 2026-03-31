"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";

interface ProductGalleryProps {
  images: string[];
  altTexts: string[];
  productName: string;
  isNew?: boolean;
}

export function ProductGallery({ images, altTexts, productName, isNew }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages = images.length > 0 ? images : ['/placeholder.jpg'];
  const currentImage = displayImages[activeIndex] || displayImages[0];

  const goNext = () => setActiveIndex((prev) => (prev + 1) % displayImages.length);
  const goPrev = () => setActiveIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);

  return (
    <>
      <div className="flex flex-col space-y-4 lg:sticky lg:top-24 h-fit">
        {/* Main Image */}
        <div className="relative aspect-[4/5] bg-[#f8f8f8] overflow-hidden border border-gray-100 flex items-center justify-center group">
          {isNew && (
            <span className="absolute top-6 left-6 z-10 bg-[var(--color-brand-volt)] text-black text-xs font-heading font-black italic px-3 py-1.5 uppercase tracking-widest shadow-lg">
              NOUVEAU
            </span>
          )}

          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
            aria-label="Zoom sur l'image"
          >
            <ZoomIn size={18} />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                aria-label="Image précédente"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm"
                aria-label="Image suivante"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <Image
            src={currentImage}
            alt={altTexts[activeIndex] || `${productName} - Vue ${activeIndex + 1}`}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105 p-6"
            priority={activeIndex === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Image counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/60 text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-sm">
              {activeIndex + 1} / {displayImages.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-4 gap-2">
            {displayImages.slice(0, 8).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative aspect-square bg-[#f8f8f8] overflow-hidden border-2 transition-all ${
                  activeIndex === i
                    ? 'border-black shadow-sm'
                    : 'border-gray-100 hover:border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt={altTexts[i] || `${productName} - Vue ${i + 1}`}
                  fill
                  className="object-contain mix-blend-multiply p-2"
                  sizes="(max-width: 768px) 25vw, 12vw"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 right-6 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full text-white transition-colors"
            aria-label="Fermer le zoom"
          >
            <X size={24} />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full text-white transition-colors"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center rounded-full text-white transition-colors"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <div className="relative w-[90vw] h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={currentImage}
              alt={altTexts[activeIndex] || productName}
              fill
              className="object-contain"
              sizes="90vw"
              quality={95}
            />
          </div>
        </div>
      )}
    </>
  );
}
