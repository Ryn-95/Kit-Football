"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { X } from 'lucide-react';
import { Product } from '@/types';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

interface MaillotsClientProps {
  initialProducts: Product[];
  topClubs: string[];
  topNations: string[];
}

function CatalogContent({ initialProducts, topClubs, topNations }: MaillotsClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // All static products
  const allProducts = initialProducts;
  
  // State for filters
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [filterTeam, setFilterTeam] = useState<string | null>(searchParams.get('team'));
  const [filterType, setFilterType] = useState<string | null>(searchParams.get('type'));
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));

  // Sync state when URL changes (back/forward navigation)
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setFilterTeam(searchParams.get('team'));
    setFilterType(searchParams.get('type'));
    setPage(parseInt(searchParams.get('page') || '1'));
  }, [searchParams]);

  // Update URL without reloading the page
  const updateUrl = (newParams: Record<string, string | null>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const url = search ? `/maillots?${search}` : '/maillots';
    router.push(url, { scroll: true });
  };

  // Handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    updateUrl({ q: query || null, page: '1' });
  };

  const handleFilterTeam = (team: string | null) => {
    setFilterTeam(team);
    setPage(1);
    updateUrl({ team, page: '1' });
  };

  const handleFilterType = (type: string | null) => {
    setFilterType(type);
    setPage(1);
    updateUrl({ type, page: '1' });
  };

  // Derived state (filtering logic)
  const filtered = useMemo(() => {
    let result = allProducts;
    
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q));
    }
    if (filterTeam) {
      result = result.filter(p => p.team === filterTeam);
    }
    if (filterType) {
      result = result.filter(p => p.type === filterType);
    }
    
    return result;
  }, [allProducts, query, filterTeam, filterType]);

  // Pagination
  const itemsPerPage = 48;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const offset = (page - 1) * itemsPerPage;
  const currentProducts = filtered.slice(offset, offset + itemsPerPage);

  // Extract unique lists for UI
  const allTeams = useMemo(() => Array.from(new Set(allProducts.map(p => p.team))), [allProducts]);
  const availableTopClubs = useMemo(() => topClubs.filter(t => allTeams.includes(t)), [allTeams, topClubs]);
  const availableTopNations = useMemo(() => topNations.filter(t => allTeams.includes(t)), [allTeams, topNations]);
  const otherTeams = useMemo(() => allTeams.filter(t => !topClubs.includes(t) && !topNations.includes(t)).sort(), [allTeams, topClubs, topNations]);
  const types = useMemo(() => Array.from(new Set(allProducts.map(p => p.type))).sort(), [allProducts]);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-black uppercase mb-8" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
        Catalogue Complet ({filtered.length} produits)
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Filters Sidebar */}
        <div className="w-full lg:w-1/4 flex flex-col gap-8">
          
          {/* Active Filters Badges */}
          {(filterTeam || filterType || query) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {query && (
                <button onClick={() => { setQuery(''); updateUrl({ q: null, page: '1' }); }} className="flex items-center gap-1 bg-gray-100 px-3 py-1 text-sm rounded-full hover:bg-gray-200 transition-colors">
                  "{query}" <X size={14} />
                </button>
              )}
              {filterTeam && (
                <button onClick={() => handleFilterTeam(null)} className="flex items-center gap-1 bg-black text-white px-3 py-1 text-sm rounded-full hover:bg-gray-800 transition-colors">
                  {filterTeam} <X size={14} />
                </button>
              )}
              {filterType && (
                <button onClick={() => handleFilterType(null)} className="flex items-center gap-1 bg-black text-white px-3 py-1 text-sm rounded-full hover:bg-gray-800 transition-colors">
                  {filterType} <X size={14} />
                </button>
              )}
              <button 
                onClick={() => { setQuery(''); setFilterTeam(null); setFilterType(null); setPage(1); router.push('/maillots'); }}
                className="text-sm underline text-gray-500 hover:text-black ml-2"
              >
                Tout effacer
              </button>
            </div>
          )}

          <div>
            <h3 className="font-bold text-lg mb-4 uppercase">Recherche</h3>
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: Real Madrid, Rétro..." 
                className="w-full border border-gray-300 p-3 focus:border-black outline-none text-sm"
              />
            </form>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 uppercase border-b pb-2">Types de Maillots</h3>
            <div className="space-y-2 text-sm pt-2">
              <button onClick={() => handleFilterType(null)} className={`block hover:underline w-full text-left ${!filterType ? 'font-bold' : ''}`}>
                Tous les types
              </button>
              {types.map(t => (
                <button key={t} onClick={() => handleFilterType(t)} className={`block hover:underline w-full text-left ${filterType === t ? 'font-bold' : ''}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 uppercase border-b pb-2">Top Clubs</h3>
            <div className="space-y-2 text-sm pt-2">
              <button onClick={() => handleFilterTeam(null)} className={`block hover:underline w-full text-left ${!filterTeam ? 'font-bold' : ''}`}>
                Toutes les équipes
              </button>
              {availableTopClubs.map(t => (
                <button key={t} onClick={() => handleFilterTeam(t)} className={`block hover:underline w-full text-left ${filterTeam === t ? 'font-bold' : ''}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 uppercase border-b pb-2">Nations</h3>
            <div className="space-y-2 text-sm pt-2">
              {availableTopNations.map(t => (
                <button key={t} onClick={() => handleFilterTeam(t)} className={`block hover:underline w-full text-left ${filterTeam === t ? 'font-bold' : ''}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 uppercase border-b pb-2">Autres Équipes</h3>
            <div className="max-h-64 overflow-y-auto pr-2 space-y-2 text-sm pt-2 border border-gray-100 p-2">
              {otherTeams.map(t => (
                <button key={t} onClick={() => handleFilterTeam(t)} className={`block hover:underline w-full text-left ${filterTeam === t ? 'font-bold' : ''}`}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          {currentProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">Aucun produit trouvé pour ces critères.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8">
              {currentProducts.map((product: Product) => (
                <Link href={`/maillots/${product.slug}`} key={product.id} className="group block" title={`Acheter ${product.name} - 29€`}>
                  <div className="relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden border border-transparent hover:border-black transition-colors">
                    <ImageWithFallback 
                      src={product.image} 
                      alt={`Maillot ${product.name} pas cher - Boutique KIT FOOTBALL`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-bold text-black mb-1">{product.price} €</p>
                  <h3 className="text-sm text-black mb-1 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500">{product.type}</p>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12">
              {page > 1 && (
                <button onClick={() => { setPage(p => p - 1); updateUrl({ page: (page - 1).toString() }); window.scrollTo(0, 0); }} className="px-4 py-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors">
                  Précédent
                </button>
              )}
              <span className="px-4 py-2">Page {page} sur {totalPages}</span>
              {page < totalPages && (
                <button onClick={() => { setPage(p => p + 1); updateUrl({ page: (page + 1).toString() }); window.scrollTo(0, 0); }} className="px-4 py-2 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-colors">
                  Suivant
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MaillotsClient(props: MaillotsClientProps) {
  return (
    <Suspense fallback={<div className="container mx-auto px-6 py-20 text-center font-bold">Chargement du catalogue...</div>}>
      <CatalogContent {...props} />
    </Suspense>
  );
}