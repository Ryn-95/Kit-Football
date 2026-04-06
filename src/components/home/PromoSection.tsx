import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PromoSection() {
  return (
    <div className="w-full mt-2 md:mt-4 mb-6 md:mb-10 px-1 md:px-2 relative flex flex-col gap-1 md:gap-2">
      {/* Promo Principale */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] md:aspect-[21/9] bg-gray-100 overflow-hidden">
        <img 
          src="/Images/Generated Image March 27, 2026 - 11_33AM (1).jpg" 
          alt="Soldes Maillots de Foot - Jusqu'à -40% sur la boutique KIT FOOTBALL" 
          className="absolute inset-0 w-full h-full object-cover object-top sm:object-center"
        />
        <div className="absolute inset-0 bg-black/40 sm:bg-black/30" />
        
        <div className="absolute bottom-6 sm:bottom-10 left-4 sm:left-6 lg:left-10 z-10 w-[90%] max-w-md">
          <div className="bg-white text-black inline-block px-3 sm:px-4 py-1.5 sm:py-2 font-black text-2xl sm:text-3xl md:text-4xl mb-2 uppercase tracking-tight" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
            JUSQU'À -40 %
          </div>
          <br/>
          <div className="bg-white text-black inline-block px-3 py-1 font-medium text-sm sm:text-base md:text-lg mb-4 sm:mb-6 shadow-sm">
            L'offre de mi-saison commence maintenant.
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Link href="/maillots" className="bg-white text-black font-bold text-xs sm:text-sm px-4 py-3 sm:py-3.5 flex items-center justify-between w-full sm:w-auto min-w-[200px] hover:bg-gray-100 transition-colors group/btn shadow-md uppercase tracking-wider">
              Maillots de Clubs <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Grille Promo Secondaire */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 md:gap-2">
        <div className="relative aspect-square sm:aspect-[4/5] bg-gray-100 overflow-hidden group">
          <img 
            src="/Images/Generated Image March 27, 2026 - 11_33AM.jpg" 
            alt="Nouveaux maillots de football 2024-2025" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 pr-4">
            <h3 className="text-white font-black text-xl sm:text-2xl uppercase mb-1 sm:mb-2 leading-tight">Nouvelle<br/>Collection</h3>
            <Link href="/maillots" className="text-white font-bold text-xs sm:text-sm underline underline-offset-4 hover:text-gray-200 uppercase tracking-widest">Découvrir</Link>
          </div>
        </div>

        <div className="relative aspect-square sm:aspect-[4/5] bg-gray-100 overflow-hidden group">
          <img 
            src="/Images/Generated Image March 28, 2026 - 9_35PM.jpg" 
            alt="Survêtements et tenues d'entraînement de football" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 pr-4">
            <h3 className="text-white font-black text-xl sm:text-2xl uppercase mb-1 sm:mb-2 leading-tight">Les<br/>Essentiels</h3>
            <Link href="/maillots/type/training" className="text-white font-bold text-xs sm:text-sm underline underline-offset-4 hover:text-gray-200 uppercase tracking-widest">Voir les survêtements</Link>
          </div>
        </div>

        <div className="relative aspect-square sm:aspect-[4/5] bg-gray-100 overflow-hidden group">
          <img 
            src="/Images/Generated Image March 28, 2026 - 10_47PM.jpg" 
            alt="Maillots de foot rétro et classiques" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-500" />
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-10 pr-4">
            <h3 className="text-white font-black text-xl sm:text-2xl uppercase mb-1 sm:mb-2 leading-tight">Nos<br/>Exclusivités</h3>
            <Link href="/maillots/type/retro" className="text-white font-bold text-xs sm:text-sm underline underline-offset-4 hover:text-gray-200 uppercase tracking-widest">Acheter maintenant</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
