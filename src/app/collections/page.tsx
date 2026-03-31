import { Metadata } from 'next';
import { ALL_PRODUCTS } from "../../data/mock";
import CollectionContent from "../../components/collections/CollectionContent";
import { Zap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: "Toutes nos collections de Maillots de Football | KIT FOOTBALL",
  description: "Découvrez toutes nos collections de maillots de football : clubs européens, équipes nationales, éditions rétro et plus encore. Qualité premium et flocage officiel.",
};

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gray-50/30">
      
      {/* Classic Premium Hero Banner */}
      <div className="relative bg-[#050505] w-full h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 z-10" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50 mix-blend-luminosity transform scale-105"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518605368461-1ee7c532066d?q=80&w=2000&auto=format&fit=crop')" }}
        />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-10 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-12 h-[2px] bg-[var(--color-brand-volt)]"></span>
            <span className="text-[var(--color-brand-volt)] font-black text-xs tracking-[0.3em] uppercase">Boutique Officielle</span>
            <span className="w-12 h-[2px] bg-[var(--color-brand-volt)]"></span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black italic uppercase text-white tracking-tighter mb-6 leading-none">
            La Collection <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">Premium</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto text-sm md:text-lg font-medium tracking-wide uppercase">
            Équipez-vous comme un pro. Les meilleurs maillots de la saison.
          </p>
        </div>
      </div>

      {/* Modern Breadcrumb */}
      <div id="collection" className="container mx-auto px-4 md:px-6 max-w-[1600px] mt-12 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white w-fit px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
          <Link href="/" className="text-gray-400 hover:text-[var(--color-brand-volt)] hover:scale-105 transition-all">Accueil</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-black">Boutique</span>
        </div>
      </div>

      <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[var(--color-brand-volt)] border-t-transparent rounded-full animate-spin"></div></div>}>
        <CollectionContent initialProducts={ALL_PRODUCTS} sportType="football" />
      </Suspense>
    </div>
  );
}
