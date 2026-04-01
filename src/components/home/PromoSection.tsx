import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoSection() {
  return (
    <div className="w-full mt-4 mb-10 px-1 relative flex flex-col gap-2">
      {/* Promo Principale */}
      <div className="relative w-full aspect-[4/5] md:aspect-[21/9] bg-gray-100 overflow-hidden">
        <img 
          src="/Images/Generated Image March 27, 2026 - 11_33AM (1).jpg" 
          alt="Soldes Maillots de Foot - Jusqu'à -40% sur la boutique KIT FOOTBALL" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute bottom-10 left-6 lg:left-10 z-10 max-w-md">
          <div className="bg-white text-black inline-block px-3 py-1 font-black text-3xl md:text-4xl mb-1 uppercase tracking-tight" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
            JUSQU'À -40 %
          </div>
          <br/>
          <div className="bg-white text-black inline-block px-3 py-1 font-normal text-base md:text-lg mb-6">
            L'offre de mi-saison commence maintenant.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/maillots" className="bg-white text-black font-bold text-sm px-4 py-3 flex items-center justify-between w-full sm:w-auto min-w-[200px] hover:text-gray-600 transition-colors group/btn border border-transparent hover:border-black">
              Maillots de Clubs <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grille Promo Secondaire */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="relative aspect-square md:aspect-[4/5] bg-gray-100 overflow-hidden group">
          <img 
            src="/Images/Generated Image March 27, 2026 - 11_33AM.jpg" 
            alt="Nouveaux maillots de football 2024-2025" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 z-10">
            <h3 className="text-white font-black text-2xl uppercase mb-2">Nouvelle Collection</h3>
            <Link href="/maillots" className="text-white font-bold text-sm underline underline-offset-4 hover:text-gray-200">Découvrir</Link>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-[4/5] bg-gray-100 overflow-hidden group">
          <img 
            src="/Images/Generated Image March 28, 2026 - 9_35PM.jpg" 
            alt="Survêtements et tenues d'entraînement de football" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 z-10">
            <h3 className="text-white font-black text-2xl uppercase mb-2">Les Essentiels</h3>
            <Link href="/maillots/type/training" className="text-white font-bold text-sm underline underline-offset-4 hover:text-gray-200">Voir les survêtements</Link>
          </div>
        </div>

        <div className="relative aspect-square md:aspect-[4/5] bg-gray-100 overflow-hidden group">
          <img 
            src="/Images/Generated Image March 28, 2026 - 10_47PM.jpg" 
            alt="Maillots de foot rétro et classiques" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
          <div className="absolute bottom-6 left-6 z-10">
            <h3 className="text-white font-black text-2xl uppercase mb-2">Exclusivités</h3>
            <Link href="/maillots/type/retro" className="text-white font-bold text-sm underline underline-offset-4 hover:text-gray-200">Acheter maintenant</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
