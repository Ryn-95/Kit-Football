import Script from "next/script";

export function AggressiveSEO({ keyword, type }: { keyword: string; type: "silo" | "longtail" | "money" }) {
  const lsiModifiers = [
    "pas cher", "officiel 2025", "livraison rapide france", "prix discount", "acheter en ligne", "boutique", 
    "nouveau maillot", "2024", "2025", "2026", "flocage personnalisé", "soldes", "promo", "enfant", 
    "homme", "femme", "version player", "version fan", "authentic", "replique",
    "meilleur site", "qualité premium", "vintage", "rétro", "domicile", 
    "extérieur", "third", "champions league", "coupe du monde"
  ];

  const keywords = lsiModifiers.map(mod => `${keyword} ${mod}`);
  const tagCloud = keywords.slice(0, 8).join(", ");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${keyword} | KIT FOOTBALL`,
    "description": `Découvrez ${keyword} avec livraison rapide, options de flocage et versions adaptées.`,
    "keywords": tagCloud
  };

  return (
    <>
      <Script 
        id={`aggressive-seo-${keyword.replace(/\s+/g, '-')}`} 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
        strategy="beforeInteractive" 
      />
      <div className="mt-16 border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Recherches associées</h4>
          <p className="text-sm text-gray-600">
            {keywords.slice(0, 8).map((kw, i) => (
              <span key={i} className="mr-2 inline-block">{kw}{i < 7 ? " •" : ""}</span>
            ))}
          </p>
        </div>
      </div>
    </>
  );
}
