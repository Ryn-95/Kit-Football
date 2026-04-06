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
      <div className="flex flex-col-reverse lg:flex-row gap-2 lg:gap-4 lg:sticky lg:top-24 h-fit items-start">
        {/* Thumbnails (Left on desktop, bottom on mobile) */}
        {displayImages.length > 1 && (
          <div className="flex flex-row lg:flex-col gap-2 lg:gap-3 overflow-x-auto lg:overflow-visible w-full lg:w-24 shrink-0 no-scrollbar mt-2 lg:mt-0">
            {displayImages.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative aspect-square w-16 md:w-20 lg:w-24 shrink-0 bg-[#f4f4f4] overflow-hidden border transition-all ${
                  activeIndex === i
                    ? 'border-black'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <Image
                  src={img}
                  alt={altTexts[i] || `${productName} - Vue ${i + 1}`}
                  fill
                  className="object-contain mix-blend-multiply p-1.5 md:p-2"
                  sizes="(max-width: 768px) 20vw, 10vw"
                />
              </button>
            ))}
          </div>
        )}

        {/* Main Image */}
        <div className="relative aspect-[4/5] w-full bg-[#f4f4f4] flex items-center justify-center group overflow-hidden border border-gray-100">
          {isNew && (
            <span className="absolute top-3 left-3 md:top-4 md:left-4 z-10 bg-white text-black text-[10px] font-bold px-2 py-1 uppercase tracking-widest shadow-sm">
              NOUVEAU
            </span>
          )}

          <button
            onClick={() => setIsZoomed(true)}
            className="absolute top-3 right-3 md:top-4 md:right-4 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white text-black shadow-sm"
            aria-label="Zoom sur l'image"
          >
            <ZoomIn size={16} />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                onClick={goPrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white text-black shadow-sm"
                aria-label="Image précédente"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={goNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 bg-white/50 backdrop-blur-sm flex items-center justify-center rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-white text-black shadow-sm"
                aria-label="Image suivante"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          <Image
            src={currentImage}
            alt={altTexts[activeIndex] || `${productName} - Vue ${activeIndex + 1}`}
            fill
            className="object-contain mix-blend-multiply transition-transform duration-700 md:group-hover:scale-105 p-4 md:p-8"
            priority={activeIndex === 0}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
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
