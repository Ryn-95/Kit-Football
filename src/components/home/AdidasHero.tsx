import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function AdidasHero() {
  return (
    <div className="w-full flex flex-col md:flex-row gap-1 px-1 mt-1">
      {/* Panel 1 */}
      <div className="relative w-full md:w-1/3 aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden group">
        <img 
          src="/Images/Generated Image March 27, 2026 - 11_33AM.jpg" 
          alt="Nouvelle Collection" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Top Text */}
        <h1 className="absolute top-0 left-0 w-full text-center text-white text-6xl md:text-8xl font-black tracking-tighter leading-none pt-4" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
          NOUVELLE
        </h1>
        
        {/* Logo Left */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white">
          <div className="flex flex-col items-center justify-center opacity-70">
            <img 
              src="/logo_kit_football_sans_arriere_plan.png" 
              alt="Kit Football Logo" 
              className="h-12 w-auto object-contain filter brightness-0 invert"
            />
          </div>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-10 left-6 z-10 text-white">
          <div className="bg-white text-black inline-block px-2 py-1 font-bold text-sm mb-1 uppercase">
            SAISON 24/25
          </div>
          <div className="bg-white text-black inline-block px-2 py-1 font-normal text-sm mb-6">
            Les nouveaux maillots sont là.
          </div>
          <div className="flex flex-col gap-3">
            <Link href="/maillots" className="bg-white text-black font-bold text-sm px-4 py-3 flex items-center justify-between w-56 hover:text-gray-600 transition-colors group/btn">
              Tous les Maillots <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
            <Link href="/maillots?type=Extérieur" className="bg-white text-black font-bold text-sm px-4 py-3 flex items-center justify-between w-56 hover:text-gray-600 transition-colors group/btn">
              Maillots Extérieurs <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Panel 2 */}
      <div className="relative w-full md:w-1/3 aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="Saison" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/20" />
        <h2 className="absolute top-12 left-0 w-full text-center text-white text-2xl font-bold tracking-widest uppercase">
          SAISON
        </h2>
      </div>

      {/* Panel 3 */}
      <div className="relative w-full md:w-1/3 aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden group">
        <img 
          src="https://images.unsplash.com/photo-1551280857-2b9bbe52fa4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
          alt="24/25" 
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />
        <h1 className="absolute top-0 left-0 w-full text-center text-white text-6xl md:text-8xl font-black tracking-tighter leading-none pt-4" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
          24/25
        </h1>
        
        {/* Logo Right */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white">
          <div className="flex flex-col items-center justify-center opacity-70">
            <img 
              src="/logo_kit_football_sans_arriere_plan.png" 
              alt="Kit Football Logo" 
              className="h-12 w-auto object-contain filter brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
}