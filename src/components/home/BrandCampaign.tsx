import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BrandCampaign() {
  return (
    <section className="w-full relative bg-[#050505] border-t border-gray-100">
      <div className="container mx-auto max-w-[1920px]">
        <div className="relative w-full aspect-[21/9] md:aspect-[4/1] overflow-hidden flex items-center justify-start p-8 md:p-16 lg:p-24 group">
          {/* Background Image featuring players like the screenshot */}
          <Image 
            src="https://images.unsplash.com/photo-1522778119026-d647f0596c20?q=80&w=2400&auto=format&fit=crop" 
            alt="Football Players Campaign" 
            fill
            className="object-cover opacity-40 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
          />
          {/* Subtle dark gradient overlay to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>

          <div className="relative z-10 max-w-2xl flex flex-col items-start translate-x-0 group-hover:translate-x-4 transition-transform duration-500">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[var(--color-brand-volt)] font-heading font-black italic text-sm md:text-xl tracking-tighter">KIT</span>
              <span className="text-white font-sans font-black text-xs md:text-sm uppercase tracking-widest mt-0.5">FOOTBALL</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-black italic uppercase text-white tracking-tighter leading-none mb-6 drop-shadow-2xl">
              SEE ALL <br /><span className="text-[var(--color-brand-volt)] glow">JERSEYS</span>
            </h2>
            
            <Link href="/collections" className="group/btn flex items-center gap-2 border-2 border-[var(--color-brand-volt)] rounded-full px-6 py-2.5 text-[var(--color-brand-volt)] font-heading font-black italic uppercase text-sm md:text-base hover:bg-[var(--color-brand-volt)] hover:text-black transition-colors duration-300">
              <span>ORDER</span>
              <ArrowRight size={18} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
