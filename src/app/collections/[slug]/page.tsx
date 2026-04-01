import { Metadata } from 'next';
import Link from 'next/link';
import { ALL_PRODUCTS } from "../../../data/mock";
import CollectionContent from "../../../components/collections/CollectionContent";
import { ChevronRight, Zap } from 'lucide-react';
import { Suspense } from 'react';

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const formattedName = params.slug.replace('-', ' ').toUpperCase();
  
  return {
    title: `Acheter Maillot ${formattedName} Pas Cher 29€ | Collection KIT FOOTBALL`,
    description: `Découvrez notre collection de maillots officiels pour ${formattedName}. Qualité premium, flocage personnalisé et livraison express 48h. Plus de 1000 modèles à 29€.`,
    keywords: `maillot ${formattedName}, acheter maillot ${formattedName}, maillot foot ${formattedName} pas cher, flocage ${formattedName}, kit football`,
    alternates: {
      canonical: `https://www.kitsfootball.fr/collections/${params.slug}`,
    },
    openGraph: {
      url: `https://www.kitsfootball.fr/collections/${params.slug}`,
      title: `Acheter Maillot ${formattedName} Pas Cher 29€ | Collection KIT FOOTBALL`,
      description: `Découvrez notre collection de maillots officiels pour ${formattedName}. Qualité premium, flocage personnalisé et livraison express 48h. Plus de 1000 modèles à 29€.`,
      images: [
        {
          url: 'https://example.com/image.jpg',
          width: 800,
          height: 600,
          alt: `Maillot ${formattedName}`,
        },
      ],
    },
  };
}

export default async function CollectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const collectionName = params.slug.replace('-', ' ').toUpperCase();

  const filteredProducts = ALL_PRODUCTS.filter((p: any) => 
    p.team.toLowerCase().includes(params.slug.replace('-', ' ')) || 
    p.category.toLowerCase().includes(params.slug.replace('-', ' '))
  );
  
  const displayProducts = filteredProducts.length > 0 ? filteredProducts : ALL_PRODUCTS.slice(0, 10);

  // Dynamic Background and Sport Type mapping
  let heroBg = "https://images.unsplash.com/photo-1518605368461-1e1e12dbcb15?q=80&w=2000&auto=format&fit=crop";
  let sportType = "football";
  let accentColor = "var(--color-brand-volt)";

  if (params.slug === 'nba') {
    heroBg = "https://images.unsplash.com/photo-1504450758481-7338eba7524a?q=80&w=2000&auto=format&fit=crop";
    sportType = "nba";
    accentColor = "#f97316"; // orange
  } else if (params.slug === 'nhl') {
    heroBg = "https://images.unsplash.com/photo-1580748141549-71748dbe0bdc?q=80&w=2000&auto=format&fit=crop";
    sportType = "nhl";
    accentColor = "#3b82f6"; // blue
  } else if (params.slug === 'rugby') {
    heroBg = "https://images.unsplash.com/photo-1559280456-4b8c9561cb0a?q=80&w=2000&auto=format&fit=crop";
    sportType = "rugby";
    accentColor = "#22c55e"; // green
  }

  return (
    <div className="min-h-screen bg-gray-50/30">
      
      {/* Classic Premium Hero Banner */}
      <div className="relative bg-[#050505] w-full h-[350px] md:h-[450px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-black/80 z-10" />
        
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity transform scale-105 animate-slow-pan"
          style={{ backgroundImage: `url('${heroBg}')` }}
        />
        
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-10 flex flex-col items-center">
          <div className="bg-white text-black font-black text-[10px] tracking-[0.2em] uppercase px-4 py-1.5 rounded-full mb-6">
            Boutique Officielle
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-white tracking-tighter mb-4 drop-shadow-lg">
            {collectionName}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-sm md:text-base font-medium">
            Découvrez l'élite de l'équipement {sportType}. Des maillots authentiques pensés pour les vrais passionnés.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50/30 to-transparent z-20" />
      </div>

      {/* Modern Breadcrumb */}
      <div id="collection" className="container mx-auto px-4 md:px-6 max-w-[1600px] mt-12 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white w-fit px-6 py-4 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100">
          <Link href="/" className="text-gray-400 hover:text-[var(--color-brand-volt)] hover:scale-105 transition-all">Accueil</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/collections" className="text-gray-400 hover:text-[var(--color-brand-volt)] hover:scale-105 transition-all">Boutique</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-black">{collectionName}</span>
        </div>
      </div>

      <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[var(--color-brand-volt)] border-t-transparent rounded-full animate-spin"></div></div>}>
        <CollectionContent initialProducts={displayProducts} sportType={sportType} />
      </Suspense>
    </div>
  );
}
