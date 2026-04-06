import FranceHero from "../components/home/FranceHero";
import NationalTeams from "../components/home/NationalTeams";
import PromoSection from "../components/home/PromoSection";
import MaillotsBanner from "../components/home/MaillotsBanner";
import FourColumnGrid from "../components/home/FourColumnGrid";
import ProductCarousel from "../components/home/ProductCarousel";
import { WebSiteJsonLd, OrganizationJsonLd } from "../components/seo/JsonLd";
import { getAllProducts } from "@/lib/catalog";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";

export default function Home() {
  const allProducts = getAllProducts();
  
  // Filter out accessories and get only primary shirts for "Nouveautés"
  // Deduplicate by team and type (so we don't show Home Fan, Home Player, Home Enfant of the same team)
  const uniqueMaillots = [];
  const seenCombos = new Set();
  
  for (const product of allProducts) {
    const isAccessory = product.name.toLowerCase().includes('chaussettes') || 
                        product.name.toLowerCase().includes('short') || 
                        product.name.toLowerCase().includes('survêtement') || 
                        product.name.toLowerCase().includes('coupe vent') ||
                        product.type.toLowerCase().includes('accessoire');
                        
    const isVariant = product.name.toLowerCase().includes('enfant') || 
                      product.name.toLowerCase().includes('player');
                      
    if (isAccessory || isVariant) continue;
    
    // We try to show unique teams in the first 4 slots
    const comboKey = `${product.team}-${product.type}`;
    if (!seenCombos.has(comboKey)) {
      seenCombos.add(comboKey);
      uniqueMaillots.push(product);
    }
  }
  
  // Sort them so that isNew items come first, or just take the first ones
  uniqueMaillots.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
  
  const bestSellers = uniqueMaillots.slice(0, 12); 

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      
      <div className="flex flex-col min-h-screen bg-white">
        <h1 className="sr-only">KIT FOOTBALL | Boutique N°1 de Maillots de Foot Pas Cher 29€ - PSG, Real Madrid, France</h1>
        <FranceHero />
        
        {/* DÉCOUVRE LES NOUVEAUTÉS section */}
        <div className="w-full px-6 lg:px-10 py-10 mt-6">
          <h2 className="text-3xl lg:text-[40px] font-black uppercase mb-8 text-black tracking-tight" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
            DÉCOUVRE LES NOUVEAUTÉS
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {bestSellers.slice(0, 4).map((product, index) => (
              <a href={`/maillots/${product.slug}`} key={index} className="flex flex-col group cursor-pointer">
                <div className="w-full aspect-square overflow-hidden mb-3 bg-[#eceff1] border border-transparent hover:border-black transition-colors relative">
                  <ImageWithFallback 
                    src={product.image} 
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-sm font-bold text-black mb-1">{product.price} €</p>
                <h3 className="text-sm text-black mb-1 group-hover:text-gray-600 transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.type}</p>
              </a>
            ))}
          </div>
        </div>

        {/* SECTION PROMO -40% */}
        <PromoSection />
        
        <MaillotsBanner />
        <ProductCarousel title="Nouveautés" products={bestSellers} />
        
        <NationalTeams />
        <FourColumnGrid />
        
        {/* SEO Content Section */}
        <div className="w-full px-6 lg:px-10 py-16 bg-gray-50 border-t border-gray-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-black uppercase mb-8 text-black italic" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
              Maillots de Foot à Prix Imbattables : 29€ et 34€
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <section>
                <p className="leading-relaxed text-lg text-justify">
                  Bienvenue sur <strong>KIT FOOTBALL</strong>, la référence absolue pour <strong>acheter des maillots de football pas chers</strong> en France et en Europe. 
                  Nous mettons à votre disposition une collection gigantesque de plus de <strong>1000 maillots</strong> issus des plus grands championnats (Ligue 1, La Liga, Premier League, Serie A) et des sélections nationales les plus prestigieuses. 
                  Nos tarifs sont imbattables : seulement <strong>29€ pour nos maillots Fan Edition</strong> et <strong>34€ pour les versions Player Edition</strong> haute performance.
                </p>
              </section>
              
              <section className="grid md:grid-cols-2 gap-8 mt-10">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-4">Les Incontournables de la Saison</h3>
                  <p className="mb-4">Retrouvez les nouveaux kits pour la saison 2024-2025 et les exclusivités 2025-2026 :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Maillot PSG Pas Cher</strong> - Portez les couleurs de Paris avec style.</li>
                    <li><strong>Maillot Real Madrid</strong> - Le mythique maillot blanc des champions d'Europe.</li>
                    <li><strong>Maillot FC Barcelona</strong> - L'élégance du Barça à prix réduit.</li>
                    <li><strong>Maillot Équipe de France</strong> - Le maillot des Bleus pour soutenir notre nation.</li>
                    <li><strong>Maillot Argentine</strong> - Le kit trois étoiles des champions du monde.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-4">Expertise et Qualité Premium</h3>
                  <p className="mb-4">Nous ne faisons aucun compromis sur la qualité de nos équipements :</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Flocage Officiel</strong> - Personnalisez votre maillot avec le nom et numéro de votre joueur préféré (Mbappé, Vinícius Jr, Bellingham, Messi).</li>
                    <li><strong>Tissu Respirant</strong> - Technologie Dry-Fit pour une évacuation maximale de la transpiration.</li>
                    <li><strong>Version Player</strong> - Coupe athlétique ajustée et badges thermocollés pour un rendu professionnel.</li>
                    <li><strong>Maillots Rétro</strong> - Revivez l'histoire du foot avec nos rééditions de maillots classiques des années 90 et 2000.</li>
                  </ul>
                </div>
              </section>
              
              <section className="mt-10 bg-white p-8 border border-gray-200 rounded-lg">
                <h3 className="text-2xl font-bold text-black mb-4 text-center">Pourquoi commander sur KIT FOOTBALL ?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-3xl mb-2">🚚</div>
                    <h4 className="font-bold">Livraison Express</h4>
                    <p className="text-sm">Expédition sous 48h avec suivi complet.</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">💰</div>
                    <h4 className="font-bold">Prix Garantis</h4>
                    <p className="text-sm">Les meilleurs tarifs du marché sans intermédiaire.</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">🔒</div>
                    <h4 className="font-bold">Paiement Sûr</h4>
                    <p className="text-sm">Transactions sécurisées par Stripe et PayPal.</p>
                  </div>
                  <div>
                    <div className="text-3xl mb-2">⭐</div>
                    <h4 className="font-bold">Service Client</h4>
                    <p className="text-sm">Une équipe à votre écoute 7j/7 pour vous aider.</p>
                  </div>
                </div>
              </section>

              <section className="mt-10">
                <h3 className="text-2xl font-bold text-black mb-4">La Boutique de Foot de Référence</h3>
                <p>
                  Que vous soyez un collectionneur de <strong>maillots vintage</strong> ou un fan à la recherche de la dernière tenue d'entraînement de <strong>Manchester City</strong>, 
                  <strong>Liverpool</strong>, ou du <strong>Bayern Munich</strong>, KIT FOOTBALL est votre partenaire de confiance. 
                  Nous livrons partout en France métropolitaine, DOM-TOM, Belgique, Suisse et dans toute l'Europe.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
