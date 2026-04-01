import { Product } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-full bg-white transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] border-2 border-transparent hover:border-gray-100 rounded-[2rem] p-4 overflow-hidden">
      
      <Link href={`/maillots/${product.slug}`} className="relative aspect-[4/5] w-full overflow-hidden bg-gray-50/50 rounded-3xl flex items-center justify-center mb-6 transition-colors group-hover:bg-gray-100/50">
        
        {/* Badges - Premium Look */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-[10px] font-black px-3 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-lg">
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[var(--color-brand-volt)] text-black text-[10px] font-black px-3 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-[0_5px_15px_rgba(204,255,0,0.3)] flex items-center gap-1">
              <Star size={10} className="fill-black" /> Top Vente
            </span>
          )}
        </div>

        <Image 
          src={product.image} 
          alt={`Acheter ${product.name} - Maillot pas cher`}
          title={`${product.name} Officiel`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover mix-blend-multiply opacity-95 transition-all duration-700 ease-out group-hover:scale-110"
        />
        
        {/* Hover image if available */}
        {product.hoverImage && (
          <Image 
            src={product.hoverImage} 
            alt={`Vue arrière ${product.name}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover mix-blend-multiply absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
          />
        )}

        {/* Quick Add Overlay Mobile */}
        <div className="absolute bottom-4 left-4 right-4 lg:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="w-full bg-black/90 backdrop-blur-md text-white font-bold py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2">
            <ShoppingCart size={14} /> Ajouter
          </button>
        </div>
      </Link>

      <div className="flex flex-col flex-1 px-2 relative z-20">
        {/* Category / Team hint */}
        <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-2">
          {product.team || product.category || 'Football'}
        </div>
        
        <Link href={`/maillots/${product.slug}`} className="hover:text-[var(--color-brand-volt)] transition-colors group/title mb-4">
          <h3 className="text-gray-900 font-black text-sm md:text-base leading-snug line-clamp-2 transition-colors group-hover/title:text-[var(--color-brand-volt)]">
            {product.name}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-1">À partir de</span>
            <span className="text-gray-900 font-black text-xl tracking-tighter">
              {product.price.toFixed(2).replace('.', ',')} €
            </span>
          </div>
          
          {/* Expanding Cart Button */}
          <button className="h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-600 group-hover:bg-black group-hover:text-white transition-all duration-300 overflow-hidden relative px-3 group/btn">
            <ShoppingCart size={20} strokeWidth={2} className="relative z-10 group-hover/btn:-translate-x-1 transition-transform" />
            <span className="w-0 overflow-hidden text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all duration-300 group-hover/btn:w-auto group-hover/btn:pl-2 group-hover/btn:opacity-100 opacity-0 relative z-10">
              Ajouter
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
