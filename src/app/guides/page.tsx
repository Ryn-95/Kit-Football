import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Guides & Conseils d\'Achat Maillots de Foot | KIT FOOTBALL',
  description: 'Le centre de ressources incontournable pour les passionnés de football. Découvrez nos guides sur les versions Fan vs Player, l\'entretien de vos maillots et les sélections Coupe du Monde.',
};

export default function GuidesHub() {
  const articles = [
    {
      title: "Différence entre Maillot Authentic (Pro) et Réplica (Fan) : Le Guide",
      slug: "authentic-vs-replica",
      category: "Guide d'Achat",
    },
    {
      title: "Comment entretenir et laver son maillot de foot floqué ?",
      slug: "entretien-maillot-flocage",
      category: "Conseils",
    },
    {
      title: "Top 10 des Maillots les plus attendus pour la Coupe du Monde 2026",
      slug: "top-maillots-coupe-du-monde-2026",
      category: "Tendances",
    },
    {
      title: "Comment choisir sa taille de maillot selon la marque (Nike, Adidas, Puma) ?",
      slug: "guide-des-tailles-marques",
      category: "Guide des Tailles",
    }
  ];

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        
        <div className="text-center mb-16">
          <span className="text-[var(--color-brand-volt)] font-bold tracking-[0.3em] text-xs uppercase mb-2 block">Puits de Connaissances</span>
          <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-black tracking-tight mb-6 leading-none">
            Guides & Le Mag <span className="text-[var(--color-brand-volt)] glow">FOOTBALL</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
             Pour vous aider à faire le meilleur choix avant d'acheter votre équipement sportif, nos experts décryptent toutes les spécificités des maillots des plus grands clubs et nations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {articles.map((article, i) => (
             <Link key={i} href={`/guides/${article.slug}`} className="group relative rounded-3xl overflow-hidden aspect-[16/9] bg-[#f8f8f8] flex flex-col justify-end p-8 border border-gray-100 hover:shadow-2xl transition-all duration-500">
               {/* Decorative background for the cards */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-brand-volt)]/10 rounded-full blur-3xl group-hover:bg-[var(--color-brand-volt)]/30 transition-colors"></div>
               
               <div className="relative z-20">
                 <span className="bg-[var(--color-brand-volt)] text-black text-[10px] font-bold uppercase tracking-widest px-2 py-1 mb-4 inline-block">
                   {article.category}
                 </span>
                 <h2 className="text-2xl font-bold text-white leading-snug group-hover:text-[var(--color-brand-volt)] transition-colors">
                   {article.title}
                 </h2>
               </div>
             </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
