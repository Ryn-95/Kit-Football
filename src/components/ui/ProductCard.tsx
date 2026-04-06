import { Product } from "../../types";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

export interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative flex flex-col h-full bg-white transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 rounded-none md:rounded-lg overflow-hidden pb-4">
      
      <Link href={`/maillots/${product.slug}`} className="relative aspect-[4/5] w-full overflow-hidden bg-[#F6F6F6] mb-4">
        
        {/* Badges - Premium Look (Adidas/Nike style) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-white text-black text-[10px] font-black px-2 py-1 uppercase tracking-[0.1em]">
              Nouveau
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase tracking-[0.1em]">
              Top Vente
            </span>
          )}
        </div>

        <Image 
          src={product.image} 
          alt={`Acheter ${product.name} - Maillot pas cher`}
          title={`${product.name} Officiel`}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          className="object-cover mix-blend-multiply transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
        
        {/* Hover image if available */}
        {product.hoverImage && (
          <Image 
            src={product.hoverImage} 
            alt={`Vue arrière ${product.name}`}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
            className="object-cover mix-blend-multiply absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
          />
        )}
      </Link>

      <div className="flex flex-col flex-1 px-3 md:px-4 relative z-20">
        
        <Link href={`/maillots/${product.slug}`} className="group/title flex-1">
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="text-black font-bold text-sm md:text-base leading-tight line-clamp-2">
              {product.name}
            </h3>
            <span className="text-black font-bold text-sm md:text-base whitespace-nowrap">
              {product.price.toFixed(2).replace('.', ',')} €
            </span>
          </div>
          <div className="text-sm text-gray-500 font-medium mb-4">
            {product.type === 'retro' ? 'Édition Rétro' : 'Maillot de Football'}
          </div>
        </Link>
        
        <div className="mt-auto">
          {/* Expanding Cart Button (Desktop only hover, mobile visible) */}
          <Link href={`/maillots/${product.slug}`} className="w-full h-10 border border-gray-200 flex items-center justify-center gap-2 text-black text-xs font-bold uppercase tracking-widest hover:border-black hover:bg-black hover:text-white transition-all duration-300">
            <ShoppingCart size={16} />
            Acheter
          </Link>
        </div>
      </div>
    </div>
  );
}
