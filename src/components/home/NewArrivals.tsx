import { NEW_ARRIVALS } from "../../data/mock";
import { ProductCard } from "../ui/ProductCard";
import Link from "next/link";
import { MoveLeft, MoveRight } from "lucide-react";

export default function NewArrivals() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 border-b border-gray-100 pb-4">
          <div className="flex-1 w-full md:w-auto">
            <h2 className="text-2xl md:text-[32px] font-heading font-black italic uppercase tracking-tighter text-gray-700 flex items-center gap-2 whitespace-nowrap">
              LES NOUVEAUTÉS <span className="text-2xl not-italic">🤩</span>
            </h2>
          </div>
          
          <div className="flex-1 hidden md:flex justify-center items-center gap-8 text-black font-sans text-sm tracking-widest font-bold">
            <button className="hover:text-gray-500 transition-colors"><MoveLeft size={32} strokeWidth={1} /></button>
            <span className="tabular-nums">01 – 10</span>
            <button className="hover:text-gray-500 transition-colors"><MoveRight size={32} strokeWidth={1} /></button>
          </div>

          <div className="flex-1 flex md:justify-end w-full md:w-auto">
            <Link href="/collections/nouveautes" className="text-sm font-bold uppercase tracking-widest text-black border-b-2 border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors">
              ACHETEZ MAINTENANT
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-12">
          {NEW_ARRIVALS.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {NEW_ARRIVALS.length > 0 && <ProductCard product={{...NEW_ARRIVALS[1], id: "dup2", name: "Portugal Maillot Extérieur 26/27 - Enfant"}} />}
        </div>
      </div>
    </section>
  );
}
