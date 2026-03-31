import { SECONDARY_CATEGORIES } from "../../data/mock";
import Image from "next/image";
import Link from "next/link";

export default function SecondaryCategories() {
  const shortNames = ["NBA", "NHL", "GIFTS", "BOX"]; // Matching screenshot
  
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {SECONDARY_CATEGORIES.map((category, index) => {
            const gradients = [
              "from-[#0a0a0a] to-[#1a1a1a]", 
              "from-[#080808] to-[#161616]", 
              "from-[#000000] to-[#0f0f0f]", 
              "from-[#050505] to-[#141414]"  
            ];
            
            return (
              <Link 
                key={category.id} 
                href={`/collections/${category.slug}`}
                className={`relative rounded-[32px] overflow-hidden aspect-[3/4] flex flex-col items-center justify-end pb-8 group bg-gradient-to-b ${gradients[index % 4]} hover:shadow-2xl transition-all border border-gray-100/5`}
              >
                <div className="absolute top-6 left-6 bg-black border border-white/10 rounded-lg p-2 shadow-2xl z-20 flex flex-col items-center justify-center leading-none">
                  <span className="text-[var(--color-brand-volt)] font-heading font-black italic text-[11px] tracking-tight">KIT</span>
                  <span className="text-white font-sans font-black text-[8px] -mt-0.5 uppercase tracking-widest">FOOTBALL</span>
                </div>

                <Image 
                  src={category.image} 
                  alt={category.name} 
                  fill
                  className="object-cover object-center opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700 mix-blend-overlay grayscale group-hover:grayscale-0"
                />
                
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

                <div className="relative z-20 flex flex-col items-center w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-heading font-black text-5xl md:text-6xl text-white italic uppercase tracking-tighter drop-shadow-2xl mb-4 group-hover:text-[var(--color-brand-volt)] transition-colors">
                    {shortNames[index] || category.name}
                  </h3>
                  <div className="btn-shop opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                    SHOP
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
