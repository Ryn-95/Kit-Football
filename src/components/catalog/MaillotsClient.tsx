"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Search, SlidersHorizontal } from 'lucide-react';
import { Product } from '@/types';
import { ProductCard } from '@/components/ui/ProductCard';

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
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

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
    setShowFiltersMobile(false);
  };

  const handleFilterType = (type: string | null) => {
    setFilterType(type);
    setPage(1);
    updateUrl({ type, page: '1' });
    setShowFiltersMobile(false);
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
    <div className="bg-[#fcfcfc] min-h-screen pb-20">
      {/* Banner Header */}
      <div className="bg-black text-white py-12 md:py-20 mb-8 px-6">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase tracking-tighter mb-4">
            Tous les Maillots
          </h1>
          <p className="text-gray-400 max-w-2xl text-sm md:text-base leading-relaxed">
            Découvrez notre collection complète. Des centaines de maillots de foot au meilleur prix.
            Trouvez votre équipe préférée et affichez vos couleurs avec fierté.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex items-center justify-between mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-sm font-bold">{filtered.length} produits</div>
          <button 
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="flex items-center gap-2 text-sm font-bold bg-black text-white px-4 py-2 rounded-xl"
          >
            <SlidersHorizontal size={16} />
            Filtres
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Filters Sidebar */}
          <div className={`w-full lg:w-1/4 flex-col gap-8 lg:flex ${showFiltersMobile ? 'flex' : 'hidden'}`}>
            <div className="bg-white p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 sticky top-24">
              
              {/* Active Filters Badges */}
              {(filterTeam || filterType || query) && (
                <div className="mb-8 pb-6 border-b border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Filtres actifs</div>
                  <div className="flex flex-wrap gap-2">
                    {query && (
                      <button onClick={() => { setQuery(''); updateUrl({ q: null, page: '1' }); }} className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 text-xs font-bold rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors group">
                        "{query}" <X size={12} className="group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                    {filterTeam && (
                      <button onClick={() => handleFilterTeam(null)} className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-xs font-bold rounded-xl hover:bg-red-600 transition-colors group">
                        {filterTeam} <X size={12} className="group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                    {filterType && (
                      <button onClick={() => handleFilterType(null)} className="flex items-center gap-1.5 bg-black text-white px-3 py-1.5 text-xs font-bold rounded-xl hover:bg-red-600 transition-colors group">
                        {filterType} <X size={12} className="group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => { setQuery(''); setFilterTeam(null); setFilterType(null); setPage(1); router.push('/maillots'); }}
                    className="text-xs font-bold text-gray-400 hover:text-black mt-4 uppercase tracking-wider transition-colors"
                  >
                    Tout effacer
                  </button>
                </div>
              )}

              {/* Search */}
              <div className="mb-8">
                <form onSubmit={handleSearch} className="relative">
                  <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher..." 
                    className="w-full border-2 border-gray-100 bg-gray-50 pl-10 pr-4 py-3 rounded-xl focus:border-black focus:bg-white outline-none text-sm font-medium transition-colors"
                  />
                </form>
              </div>

              {/* Top Clubs */}
              <div className="mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-4">Top Clubs</h3>
                <div className="flex flex-col gap-1.5">
                  <button 
                    onClick={() => handleFilterTeam(null)} 
                    className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${!filterTeam ? 'bg-[var(--color-brand-volt)]/20 text-black font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                  >
                    Toutes les équipes
                  </button>
                  {availableTopClubs.map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleFilterTeam(t)} 
                      className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${filterTeam === t ? 'bg-[var(--color-brand-volt)]/20 text-black font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Types */}
              <div className="mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-4">Types</h3>
                <div className="flex flex-wrap gap-2">
                  <button 
                    onClick={() => handleFilterType(null)} 
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors border ${!filterType ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'}`}
                  >
                    Tous
                  </button>
                  {types.map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleFilterType(t)} 
                      className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors border ${filterType === t ? 'border-black bg-black text-white' : 'border-gray-200 text-gray-600 hover:border-black hover:text-black'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nations */}
              <div className="mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-4">Nations</h3>
                <div className="flex flex-col gap-1.5">
                  {availableTopNations.map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleFilterTeam(t)} 
                      className={`text-left text-sm px-3 py-2 rounded-lg transition-colors ${filterTeam === t ? 'bg-[var(--color-brand-volt)]/20 text-black font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Autres */}
              <div>
                <h3 className="text-sm font-black uppercase tracking-widest text-black mb-4">Autres</h3>
                <div className="max-h-[200px] overflow-y-auto pr-2 flex flex-col gap-1 custom-scrollbar">
                  {otherTeams.map(t => (
                    <button 
                      key={t} 
                      onClick={() => handleFilterTeam(t)} 
                      className={`text-left text-sm px-3 py-1.5 rounded-lg transition-colors ${filterTeam === t ? 'bg-black text-white font-bold' : 'text-gray-500 hover:bg-gray-50 hover:text-black'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            {/* Desktop Top Bar */}
            <div className="hidden lg:flex items-center justify-between mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
              <div className="text-sm text-gray-500 font-medium">
                Affichage de <span className="text-black font-bold">{currentProducts.length}</span> sur <span className="text-black font-bold">{filtered.length}</span> produits
              </div>
            </div>

            {currentProducts.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-12 text-center border border-gray-100 shadow-sm flex flex-col items-center justify-center min-h-[400px]">
                <Search size={48} className="text-gray-300 mb-4" />
                <h3 className="text-xl font-black mb-2 text-black">Aucun produit trouvé</h3>
                <p className="text-gray-500 max-w-md">Essayez de modifier vos filtres ou de faire une autre recherche pour trouver le maillot que vous cherchez.</p>
                <button 
                  onClick={() => { setQuery(''); setFilterTeam(null); setFilterType(null); setPage(1); router.push('/maillots'); }}
                  className="mt-6 px-6 py-3 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-colors"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
                {currentProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-16 bg-white p-4 rounded-2xl shadow-sm border border-gray-100 inline-flex mx-auto">
                {page > 1 && (
                  <button 
                    onClick={() => { setPage(p => p - 1); updateUrl({ page: (page - 1).toString() }); window.scrollTo(0, 0); }} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-black font-bold hover:bg-[var(--color-brand-volt)] transition-colors"
                  >
                    ←
                  </button>
                )}
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show pages around current page
                    let pageNum = page - 2 + i;
                    if (pageNum <= 0) pageNum += Math.abs(page - 2) + 1;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => { setPage(pageNum); updateUrl({ page: pageNum.toString() }); window.scrollTo(0, 0); }}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold transition-colors ${page === pageNum ? 'bg-black text-white' : 'bg-transparent text-gray-500 hover:bg-gray-100'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {page < totalPages && (
                  <button 
                    onClick={() => { setPage(p => p + 1); updateUrl({ page: (page + 1).toString() }); window.scrollTo(0, 0); }} 
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 text-black font-bold hover:bg-[var(--color-brand-volt)] transition-colors"
                  >
                    →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MaillotsClient(props: MaillotsClientProps) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-xl">Chargement du catalogue...</div>}>
      <CatalogContent {...props} />
    </Suspense>
  );
}