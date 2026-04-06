"use client";

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { X, Search, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
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
  const [filterPrice, setFilterPrice] = useState<string | null>(searchParams.get('price'));
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sort') || 'newest');
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  
  // UI States
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    search: true,
    clubs: true,
    types: true,
    nations: false,
    price: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Sync state when URL changes (back/forward navigation)
  useEffect(() => {
    setQuery(searchParams.get('q') || '');
    setFilterTeam(searchParams.get('team'));
    setFilterType(searchParams.get('type'));
    setFilterPrice(searchParams.get('price'));
    setSortBy(searchParams.get('sort') || 'newest');
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
    if (window.innerWidth < 1024) setShowFiltersMobile(false);
  };

  const handleFilterType = (type: string | null) => {
    setFilterType(type);
    setPage(1);
    updateUrl({ type, page: '1' });
    if (window.innerWidth < 1024) setShowFiltersMobile(false);
  };

  const handleFilterPrice = (priceRange: string | null) => {
    setFilterPrice(priceRange);
    setPage(1);
    updateUrl({ price: priceRange, page: '1' });
    if (window.innerWidth < 1024) setShowFiltersMobile(false);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSortBy(val);
    setPage(1);
    updateUrl({ sort: val, page: '1' });
  };

  const clearAllFilters = () => {
    setQuery('');
    setFilterTeam(null);
    setFilterType(null);
    setFilterPrice(null);
    setPage(1);
    router.push('/maillots');
  };

  // Derived state (filtering & sorting logic)
  const filteredAndSorted = useMemo(() => {
    let result = [...allProducts];
    
    // Filtering
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
    if (filterPrice) {
      if (filterPrice === 'under-30') result = result.filter(p => p.price < 30);
      if (filterPrice === '30-40') result = result.filter(p => p.price >= 30 && p.price <= 40);
      if (filterPrice === 'over-40') result = result.filter(p => p.price > 40);
    }
    
    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else {
      // 'newest' / default (Assuming isNew flag or just keeping original order)
      result.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    }
    
    return result;
  }, [allProducts, query, filterTeam, filterType, filterPrice, sortBy]);

  // Pagination
  const itemsPerPage = 48;
  const totalPages = Math.ceil(filteredAndSorted.length / itemsPerPage);
  const offset = (page - 1) * itemsPerPage;
  const currentProducts = filteredAndSorted.slice(offset, offset + itemsPerPage);

  // Extract unique lists for UI
  const allTeams = useMemo(() => Array.from(new Set(allProducts.map(p => p.team))), [allProducts]);
  const availableTopClubs = useMemo(() => topClubs.filter(t => allTeams.includes(t)), [allTeams, topClubs]);
  const availableTopNations = useMemo(() => topNations.filter(t => allTeams.includes(t)), [allTeams, topNations]);
  const types = useMemo(() => Array.from(new Set(allProducts.map(p => p.type))).sort(), [allProducts]);

  return (
    <div className="bg-white min-h-screen pb-24 font-sans">
      {/* Premium Header (Nike/Adidas Style) */}
      <div className="bg-white border-b border-gray-200 py-8 md:py-16 mb-8 px-6">
        <div className="container mx-auto max-w-[1600px] flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black italic uppercase tracking-tighter text-black mb-4">
            TOUS LES MAILLOTS
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base font-medium">
            Équipez-vous pour la saison. Des centaines de maillots de football officiels, 
            éditions rétro et versions player. Affichez fièrement vos couleurs.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-[1600px]">
        
        {/* Toolbar (Filters toggle + Sorting + Count) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-4 border-b border-gray-200 gap-4 sticky top-0 bg-white/95 backdrop-blur-md z-30 py-4">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setShowFiltersMobile(!showFiltersMobile)}
              className="flex items-center gap-2 text-base font-bold text-black hover:text-gray-600 transition-colors"
            >
              <span>{showFiltersMobile ? 'Masquer les filtres' : 'Afficher les filtres'}</span>
              <SlidersHorizontal size={20} />
            </button>
            <div className="hidden md:block text-gray-500 font-medium">
              {filteredAndSorted.length} {filteredAndSorted.length === 1 ? 'Produit' : 'Produits'}
            </div>
          </div>

          <div className="flex items-center gap-4 self-end md:self-auto">
            <label className="text-sm font-bold text-gray-500 uppercase tracking-widest hidden md:block">Trier par</label>
            <select 
              value={sortBy} 
              onChange={handleSortChange}
              className="border-none bg-transparent text-base font-bold text-black focus:ring-0 cursor-pointer outline-none text-right appearance-none pr-4"
            >
              <option value="newest">Nouveautés</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative items-start">
          
          {/* Sidebar Filters (Slide-over on mobile, sticky on desktop) */}
          <div className={`
            fixed inset-0 z-50 bg-white w-full h-full overflow-y-auto p-6
            lg:static lg:block lg:w-[280px] lg:h-auto lg:p-0 lg:bg-transparent lg:overflow-visible lg:z-auto
            ${showFiltersMobile ? 'block' : 'hidden'}
            transition-all duration-300
          `}>
            
            <div className="lg:hidden flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-heading font-black italic uppercase">Filtres</h2>
              <button onClick={() => setShowFiltersMobile(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="lg:sticky lg:top-32 flex flex-col gap-0">
              
              {/* Active Filters */}
              {(filterTeam || filterType || query || filterPrice) && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {query && (
                      <button onClick={() => { setQuery(''); updateUrl({ q: null, page: '1' }); }} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors">
                        {query} <X size={14} />
                      </button>
                    )}
                    {filterTeam && (
                      <button onClick={() => handleFilterTeam(null)} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors">
                        {filterTeam} <X size={14} />
                      </button>
                    )}
                    {filterType && (
                      <button onClick={() => handleFilterType(null)} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors">
                        {filterType} <X size={14} />
                      </button>
                    )}
                    {filterPrice && (
                      <button onClick={() => handleFilterPrice(null)} className="flex items-center gap-2 bg-black text-white px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full hover:bg-gray-800 transition-colors">
                        Prix <X size={14} />
                      </button>
                    )}
                  </div>
                  <button onClick={clearAllFilters} className="text-xs font-bold text-gray-500 hover:text-black mt-4 uppercase tracking-wider underline underline-offset-4">
                    Tout effacer
                  </button>
                </div>
              )}

              {/* Search Accordion */}
              <div className="border-b border-gray-200 py-4">
                <button onClick={() => toggleSection('search')} className="flex justify-between items-center w-full text-left font-bold text-black">
                  Recherche
                  {expandedSections['search'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections['search'] && (
                  <form onSubmit={handleSearch} className="mt-4 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input 
                      type="text" 
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Nom, équipe..." 
                      className="w-full bg-gray-100 pl-10 pr-4 py-3 rounded-md focus:ring-1 focus:ring-black outline-none text-sm font-medium"
                    />
                  </form>
                )}
              </div>

              {/* Prix Accordion */}
              <div className="border-b border-gray-200 py-4">
                <button onClick={() => toggleSection('price')} className="flex justify-between items-center w-full text-left font-bold text-black">
                  Prix
                  {expandedSections['price'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections['price'] && (
                  <div className="mt-4 flex flex-col gap-3">
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={filterPrice === 'under-30'} onChange={() => handleFilterPrice('under-30')} className="w-5 h-5 accent-black text-black bg-gray-100 border-gray-300 focus:ring-black" />
                      <span className="text-base text-gray-700 group-hover:text-black">Moins de 30€</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={filterPrice === '30-40'} onChange={() => handleFilterPrice('30-40')} className="w-5 h-5 accent-black text-black bg-gray-100 border-gray-300 focus:ring-black" />
                      <span className="text-base text-gray-700 group-hover:text-black">30€ - 40€</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <input type="radio" name="price" checked={filterPrice === 'over-40'} onChange={() => handleFilterPrice('over-40')} className="w-5 h-5 accent-black text-black bg-gray-100 border-gray-300 focus:ring-black" />
                      <span className="text-base text-gray-700 group-hover:text-black">Plus de 40€</span>
                    </label>
                  </div>
                )}
              </div>

              {/* Types Accordion */}
              <div className="border-b border-gray-200 py-4">
                <button onClick={() => toggleSection('types')} className="flex justify-between items-center w-full text-left font-bold text-black">
                  Types de Maillots
                  {expandedSections['types'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections['types'] && (
                  <div className="mt-4 flex flex-col gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                    {types.map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={filterType === t} 
                          onChange={() => handleFilterType(filterType === t ? null : t)} 
                          className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-base text-gray-700 group-hover:text-black capitalize">{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Clubs Accordion */}
              <div className="border-b border-gray-200 py-4">
                <button onClick={() => toggleSection('clubs')} className="flex justify-between items-center w-full text-left font-bold text-black">
                  Clubs
                  {expandedSections['clubs'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections['clubs'] && (
                  <div className="mt-4 flex flex-col gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {availableTopClubs.map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={filterTeam === t} 
                          onChange={() => handleFilterTeam(filterTeam === t ? null : t)} 
                          className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-base text-gray-700 group-hover:text-black">{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Nations Accordion */}
              <div className="border-b border-gray-200 py-4">
                <button onClick={() => toggleSection('nations')} className="flex justify-between items-center w-full text-left font-bold text-black">
                  Nations
                  {expandedSections['nations'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {expandedSections['nations'] && (
                  <div className="mt-4 flex flex-col gap-3 max-h-[250px] overflow-y-auto custom-scrollbar pr-2">
                    {availableTopNations.map(t => (
                      <label key={t} className="flex items-center gap-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          checked={filterTeam === t} 
                          onChange={() => handleFilterTeam(filterTeam === t ? null : t)} 
                          className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                        />
                        <span className="text-base text-gray-700 group-hover:text-black">{t}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile apply button */}
              <div className="lg:hidden mt-8 sticky bottom-6">
                <button 
                  onClick={() => setShowFiltersMobile(false)}
                  className="w-full bg-black text-white py-4 rounded-full font-bold uppercase tracking-widest"
                >
                  Appliquer ({filteredAndSorted.length})
                </button>
              </div>

            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1 w-full">
            {currentProducts.length === 0 ? (
              <div className="bg-gray-50 rounded-2xl p-16 text-center flex flex-col items-center justify-center min-h-[500px]">
                <Search size={48} className="text-gray-300 mb-6" />
                <h3 className="text-2xl font-black mb-3 text-black">Aucun produit trouvé</h3>
                <p className="text-gray-500 max-w-md text-lg">Essayez de modifier vos filtres ou de faire une autre recherche.</p>
                <button 
                  onClick={clearAllFilters}
                  className="mt-8 px-8 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-800 transition-colors uppercase tracking-widest text-sm"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-16">
                {currentProducts.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-20 pt-10 border-t border-gray-200">
                {page > 1 && (
                  <button 
                    onClick={() => { setPage(p => p - 1); updateUrl({ page: (page - 1).toString() }); window.scrollTo(0, 0); }} 
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-black hover:border-black hover:bg-black hover:text-white transition-all"
                  >
                    ←
                  </button>
                )}
                
                <div className="flex gap-2">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = page - 2 + i;
                    if (pageNum <= 0) pageNum += Math.abs(page - 2) + 1;
                    if (pageNum > totalPages) return null;
                    
                    return (
                      <button 
                        key={pageNum}
                        onClick={() => { setPage(pageNum); updateUrl({ page: pageNum.toString() }); window.scrollTo(0, 0); }}
                        className={`w-12 h-12 flex items-center justify-center rounded-full font-bold transition-all text-sm ${page === pageNum ? 'bg-black text-white border border-black' : 'border border-transparent text-gray-500 hover:bg-gray-100'}`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {page < totalPages && (
                  <button 
                    onClick={() => { setPage(p => p - 1); updateUrl({ page: (page + 1).toString() }); window.scrollTo(0, 0); }} 
                    className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-300 text-black hover:border-black hover:bg-black hover:text-white transition-all"
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-bold text-2xl uppercase tracking-widest text-gray-400">Chargement...</div>}>
      <CatalogContent {...props} />
    </Suspense>
  );
}