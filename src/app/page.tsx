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
  const bestSellers = allProducts.slice(0, 12); // Just taking first 12 for now

  return (
    <>
      <WebSiteJsonLd />
      <OrganizationJsonLd />
      
      <div className="flex flex-col min-h-screen bg-white">
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
        <div className="w-full px-6 lg:px-10 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-black">Maillots de Foot à Prix Imbattables : 29€ et 34€</h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Bienvenue sur <strong>KIT FOOTBALL</strong>, votre boutique n°1 pour acheter des <strong>maillots de football pas chers</strong> en France. 
                Nous proposons plus de <strong>100 maillots</strong> des plus grandes équipes au monde à des prix défiant toute concurrence : 
                <strong> 29€ pour les maillots Fan Edition</strong> et <strong>34€ pour les Player Edition</strong>.
              </p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Les Maillots les Plus Populaires</h3>
              <p>
                Découvrez notre sélection exclusive de <strong>maillots 2024-25</strong> des clubs et équipes nationales les plus prestigieux :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Maillot PSG</strong> - Le maillot domicile du Paris Saint-Germain avec ses couleurs emblématiques</li>
                <li><strong>Maillot Real Madrid</strong> - Le blanc légendaire du club le plus titré d'Europe</li>
                <li><strong>Maillot FC Barcelona</strong> - Les rayures blaugrana iconiques du Barça</li>
                <li><strong>Maillot France</strong> - Le bleu tricolore des champions du monde</li>
                <li><strong>Maillot Argentine</strong> - Les couleurs albicelestes des champions du monde 2022</li>
                <li><strong>Maillot Manchester City</strong> - Le sky blue des champions d'Angleterre</li>
                <li><strong>Maillot Liverpool</strong> - Le rouge légendaire des Reds</li>
                <li><strong>Maillot Bayern Munich</strong> - Le rouge et blanc du géant allemand</li>
              </ul>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Player Edition vs Fan Edition</h3>
              <p>
                Nous proposons deux versions pour répondre à tous les besoins :
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Fan Edition (29€)</strong> : Coupe confortable, tissu respirant, parfait pour le quotidien et les tribunes</li>
                <li><strong>Player Edition (34€)</strong> : Qualité professionnelle, coupe athlétique ajustée, tissu technique premium identique aux joueurs</li>
              </ul>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Livraison Rapide en Europe</h3>
              <p>
                Profitez de notre <strong>livraison express 48h</strong> partout en Europe : France, Belgique, Suisse, Luxembourg. 
                Commandez aujourd'hui, portez votre maillot ce week-end !
              </p>
              
              <h3 className="text-2xl font-bold mt-8 mb-4">Pourquoi Choisir KIT FOOTBALL ?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>✅ <strong>Prix imbattables</strong> : 29€ et 34€ seulement</li>
                <li>✅ <strong>100+ modèles</strong> disponibles en stock permanent</li>
                <li>✅ <strong>Qualité garantie</strong> : Fan Edition et Player Edition</li>
                <li>✅ <strong>Livraison rapide</strong> : 48h partout en Europe</li>
                <li>✅ <strong>Tailles disponibles</strong> : S, M, L, XL, XXL</li>
                <li>✅ <strong>Maillots 2024-25</strong> : Les dernières nouveautés</li>
                <li>✅ <strong>Maillots rétro</strong> : Les classiques intemporels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
