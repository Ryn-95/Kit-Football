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
      </div>
    </>
  );
}
