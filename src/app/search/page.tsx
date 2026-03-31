import { Metadata } from "next";
import { ProductCard } from "../../components/ui/ProductCard";
import { ALL_PRODUCTS } from "../../data/mock";

export const metadata: Metadata = {
  title: "Recherche | KIT FOOTBALL",
  description: "Recherchez votre maillot de football sur KIT FOOTBALL.",
  robots: {
    index: false,
    follow: true,
  }
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.toLowerCase() || "";

  // Mock search combining all products
  const allProducts = ALL_PRODUCTS;
  const results = allProducts.filter(p => 
    p.name.toLowerCase().includes(query) || 
    p.team.toLowerCase().includes(query)
  );

  // Remove duplicates based on id
  const uniqueResults = Array.from(new Map(results.map(item => [item.id, item])).values());

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <h1 className="text-3xl md:text-5xl font-heading font-black italic uppercase mb-4">
          Recherche
        </h1>
        
        <div className="mb-12">
          <p className="text-gray-500 text-lg">
            {query 
              ? `${uniqueResults.length} résultat(s) pour "${q}"`
              : "Veuillez entrer une recherche."}
          </p>
        </div>

        {query && uniqueResults.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {uniqueResults.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">Aucun maillot trouvé</h3>
            <p className="text-gray-600 mb-8">Nous n'avons pas trouvé de résultat pour "{q}". Essayez de rechercher un club (ex: PSG), un pays (ex: France) ou un joueur.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}