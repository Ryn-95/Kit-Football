import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MaillotsBanner() {
  return (
    <div className="w-full mt-4 px-1 relative">
      <div className="relative w-full aspect-[4/5] sm:aspect-square md:aspect-[21/9] bg-black overflow-hidden group">
        <img 
          src="/Images/Generated Image March 28, 2026 - 10_13PM.jpg" 
          alt="Collection Maillots" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dégradé pour rendre le texte plus lisible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/30 md:to-transparent" />
        
        <div className="absolute bottom-6 md:bottom-10 left-6 lg:left-10 z-10 max-w-lg flex flex-col items-start justify-end">
          <h2 
            className="text-white font-black text-3xl md:text-4xl lg:text-5xl mb-3 uppercase tracking-tight leading-none" 
            style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}
          >
            NOUVELLE<br/>GÉNÉRATION
          </h2>
          <p className="text-white text-sm md:text-base mb-6 font-medium max-w-sm">
            Découvrez nos maillots au design audacieux. Conçus pour la performance sur le terrain et le style au quotidien.
          </p>
          
          <Link 
            href="/maillots" 
            className="bg-white text-black font-bold text-xs md:text-sm px-6 py-3 md:px-8 md:py-4 inline-flex items-center gap-2 md:gap-3 hover:bg-gray-200 transition-colors uppercase tracking-wider"
          >
            Acheter maintenant <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}