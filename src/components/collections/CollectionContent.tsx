"use client";

import { useState, useMemo, useEffect } from 'react';
import { Filter, ChevronDown, ChevronUp, SlidersHorizontal, X, Search, Check, Frown, ArrowUpDown } from 'lucide-react';
import { ProductCard } from '../ui/ProductCard';
import { useSearchParams } from 'next/navigation';

export default function CollectionContent({ initialProducts, sportType }: { initialProducts: any[], sportType: string }) {
  const searchParams = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam && !selectedFilters.includes(filterParam)) {
      setSelectedFilters([filterParam]);
    }
  }, [searchParams]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'Catégories': true,
    'Type': true,
    'Conférences': true,
    'Édition': true,
    'Équipes': true,
    'Ligue': true,
    'Marque': true
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define filters dynamically based on sport type
  const filterSections = useMemo(() => {
    if (sportType === 'nba') {
      return [
        { id: 'Conférences', title: "Conférences", items: ['Ouest', 'Est', 'Lakers', 'Bulls', 'Warriors', 'Celtics'] },
        { id: 'Édition', title: "Édition", items: ['City Edition', 'Statement', 'Association'] },
      ];
    } else if (sportType === 'nhl') {
      return [
        { id: 'Équipes', title: "Équipes", items: ['Canadiens', 'Rangers', 'Maple Leafs', 'Bruins'] },
        { id: 'Type', title: "Type de Maillot", items: ['Domicile', 'Extérieur', 'Rétro'] },
      ];
    } else if (sportType === 'rugby') {
      return [
        { id: 'Compétition', title: "Compétition", items: ['Top 14', 'Nations', 'Tournoi des 6 Nations'] },
        { id: 'Type', title: "Type de Maillot", items: ['Domicile', 'Extérieur'] },
      ];
    }
    // Default Football
    return [
      { id: 'Ligue', title: "Championnat", items: ['Ligue 1', 'La Liga', 'Premier League', 'Serie A', 'National'] },
      { id: 'Type', title: "Type de Maillot", items: ['Domicile', 'Extérieur', 'Third', 'Player Pro'] },
      { id: 'Marque', title: "Équipementier", items: ['Nike', 'Adidas', 'Puma', 'Jordan'] },
    ];
  }, [sportType]);

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleFilter = (item: string) => {
    setSelectedFilters(prev => 
      prev.includes(item) ? prev.filter(f => f !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
    setSelectedFilters([]);
    setSearchQuery("");
  };

  // Advanced Filtering Logic
  const displayProducts = useMemo(() => {
    let filtered = [...initialProducts];

    // Smart Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.team?.toLowerCase().includes(query) ||
        p.category?.toLowerCase().includes(query)
      );
    }

    // Multi-criteria Filtering
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(p => {
        const searchableText = `${p.name} ${p.team} ${p.category} ${p.isNew ? 'nouveau' : ''}`.toLowerCase();
        
        // Enhance searchable text with leagues and brands to make demo filters work
        let extraTags = "";
        const teamLower = p.team?.toLowerCase() || "";
        
        // Leagues mapping
        if (["psg", "olympique de marseille", "olympique lyonnais"].includes(teamLower)) extraTags += " ligue 1";
        if (["real madrid", "fc barcelona", "atletico madrid"].includes(teamLower)) extraTags += " la liga";
        if (["arsenal", "chelsea", "liverpool", "manchester city", "manchester united"].includes(teamLower)) extraTags += " premier league";
        if (["juventus", "ac milan", "inter milan", "napoli", "as roma"].includes(teamLower)) extraTags += " serie a";
        if (["bayern munich", "borussia dortmund"].includes(teamLower)) extraTags += " bundesliga";
        
        // Mock Brands mapping based on ID to ensure filters return results
        if (p.id.includes("1") || p.id.includes("5")) extraTags += " nike";
        if (p.id.includes("2") || p.id.includes("6")) extraTags += " adidas";
        if (p.id.includes("3") || p.id.includes("7")) extraTags += " puma";
        if (p.id.includes("4") || p.id.includes("8")) extraTags += " jordan";
        
        const fullSearchable = (searchableText + extraTags).toLowerCase();
        
        // Match ANY of the selected filters (OR logic within filters)
        return selectedFilters.some(filter => fullSearchable.includes(filter.toLowerCase()));
      });
    }

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case 'bestseller':
        filtered.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
    }

    return filtered;
  }, [initialProducts, selectedFilters, searchQuery, sortBy]);

  if (!isMounted) return null;

  return (
    <div className="container mx-auto px-4 md:px-6 max-w-[1600px] py-12 font-sans">
      
      {/* Smart Toolbar - Extremely Premium */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6 bg-white p-5 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 relative z-20">
        <div className="flex items-center gap-4 w-full lg:w-auto">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 bg-black text-white py-3.5 px-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all active:scale-95 shadow-[0_5px_20px_rgba(0,0,0,0.15)]"
          >
            <SlidersHorizontal size={16} /> Filtres
          </button>
          
          <div className="relative flex-1 lg:w-96 group">
            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[var(--color-brand-volt)] transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher une équipe, un joueur..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50/50 border-2 border-gray-100 py-3.5 pl-12 pr-4 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-black transition-all"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between w-full lg:w-auto gap-6">
          <p className="text-gray-400 font-bold text-xs uppercase tracking-widest whitespace-nowrap hidden sm:block">
            <span className="text-black text-lg mr-1">{displayProducts.length}</span> résultats
          </p>
          
          <div className="relative w-full sm:w-56 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[var(--color-brand-volt)] z-10">
              <ArrowUpDown size={16} />
            </div>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full appearance-none bg-gray-50/50 border-2 border-gray-100 py-3.5 pl-12 pr-10 rounded-2xl text-sm font-bold focus:outline-none focus:bg-white focus:border-black cursor-pointer transition-all hover:bg-gray-100/50"
            >
              <option value="newest">Nouveautés d'abord</option>
              <option value="bestseller">Meilleures ventes</option>
              <option value="price-asc">Prix : Croissant</option>
              <option value="price-desc">Prix : Décroissant</option>
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Sidebar Filters (Desktop) - Sleek Design */}
        <aside className="hidden lg:block w-[280px] flex-shrink-0 relative">
          <div className="sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto pr-4 scrollbar-hide pb-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading font-black italic uppercase text-3xl flex items-center gap-3">
                Filtres
              </h2>
              {selectedFilters.length > 0 && (
                <button onClick={clearFilters} className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full font-bold hover:bg-red-50 hover:text-red-500 uppercase tracking-widest transition-colors">
                  Tout effacer
                </button>
              )}
            </div>

            <div className="space-y-8">
              {filterSections.map((section) => (
                <div key={section.id} className="border-b border-gray-100 pb-8 last:border-0 last:pb-0">
                  <button 
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between group"
                  >
                    <h3 className="font-black text-sm uppercase tracking-widest text-gray-900 group-hover:text-[var(--color-brand-volt)] transition-colors">
                      {section.title}
                    </h3>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-50 transition-transform duration-300 ${openSections[section.id] ? 'rotate-180' : ''}`}>
                      <ChevronDown size={16} className="text-black" />
                    </div>
                  </button>
                  
                  <div className={`mt-5 space-y-3 overflow-hidden transition-all duration-500 ease-in-out ${openSections[section.id] ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col gap-2">
                      {section.items.map(item => {
                        const isSelected = selectedFilters.includes(item);
                        return (
                          <label key={item} className="flex items-center cursor-pointer group relative overflow-hidden rounded-xl">
                            <input 
                              type="checkbox" 
                              className="peer sr-only"
                              checked={isSelected}
                              onChange={() => toggleFilter(item)}
                            />
                            <div className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border-2 ${isSelected ? 'bg-black border-black shadow-[0_4px_15px_rgba(0,0,0,0.1)]' : 'bg-transparent border-transparent hover:bg-gray-50 hover:border-gray-100'}`}>
                              <div className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? 'bg-[var(--color-brand-volt)] border-[var(--color-brand-volt)]' : 'border-gray-300 peer-hover:border-black'}`}>
                                <Check size={12} className={`text-black transition-transform duration-300 ${isSelected ? 'scale-100' : 'scale-0'}`} strokeWidth={4} />
                              </div>
                              <span className={`text-sm font-bold transition-colors ${isSelected ? 'text-white' : 'text-gray-600 peer-hover:text-black'}`}>
                                {item}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Mobile Filter Drawer - Premium Bottom/Side Sheet */}
        <div className={`fixed inset-0 z-[100] flex lg:hidden transition-opacity duration-500 ${isMobileFilterOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileFilterOpen(false)} />
          <div className={`relative bg-white w-full max-w-md h-[90vh] mt-[10vh] md:h-full md:mt-0 ml-auto rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-tr-none shadow-2xl flex flex-col transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) ${isMobileFilterOpen ? 'translate-y-0 md:translate-x-0 md:translate-y-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'}`}>
            
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-gray-100">
              <h2 className="font-heading font-black italic uppercase text-3xl">
                Filtres
              </h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-3 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-10">
              {filterSections.map((section) => (
                <div key={section.id}>
                  <h3 className="font-black text-sm uppercase tracking-widest mb-5 text-gray-900 flex items-center gap-2">
                    <span className="w-2 h-2 bg-[var(--color-brand-volt)] rounded-full"></span>
                    {section.title}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {section.items.map(item => {
                      const isSelected = selectedFilters.includes(item);
                      return (
                        <button 
                          key={item}
                          onClick={() => toggleFilter(item)}
                          className={`py-3 px-5 rounded-2xl text-sm font-bold border-2 transition-all duration-300 ${isSelected ? 'bg-black border-black text-white shadow-[0_5px_15px_rgba(0,0,0,0.15)]' : 'bg-white border-gray-100 text-gray-600 hover:border-black hover:text-black'}`}
                        >
                          {item}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 md:p-8 border-t border-gray-100 bg-white">
              <div className="flex gap-4">
                <button 
                  onClick={clearFilters}
                  className="flex-1 py-4 font-bold text-gray-500 uppercase tracking-widest text-sm border-2 border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors"
                >
                  Effacer
                </button>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="flex-[2] bg-[var(--color-brand-volt)] text-black py-4 rounded-2xl font-black italic uppercase tracking-widest text-sm shadow-[0_5px_20px_rgba(204,255,0,0.4)] hover:scale-[1.02] transition-transform"
                >
                  Voir ({displayProducts.length})
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          
          {/* Active Filters Chips - Pill Design */}
          {selectedFilters.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mr-2">Filtres actifs :</span>
              {selectedFilters.map(filter => (
                <span key={filter} className="bg-white border border-gray-200 text-black pl-4 pr-2 py-2 rounded-full text-xs font-bold flex items-center gap-2 animate-fade-in shadow-sm hover:border-black transition-colors">
                  {filter}
                  <div 
                    className="w-6 h-6 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer hover:bg-black hover:text-white transition-colors"
                    onClick={() => toggleFilter(filter)}
                  >
                    <X size={12} />
                  </div>
                </span>
              ))}
            </div>
          )}

          {/* Product Grid or Empty State */}
          {displayProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {displayProducts.map((product: any) => (
                <div key={product.id} className="animate-fade-in">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50/50 rounded-[3rem] p-16 md:p-24 flex flex-col items-center text-center border-2 border-dashed border-gray-200">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)] mb-8">
                <Search size={40} className="text-gray-300" />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-black italic uppercase mb-4 tracking-tight">Aucun résultat</h3>
              <p className="text-gray-500 font-medium max-w-md mx-auto mb-10 text-lg leading-relaxed">
                Nous n'avons pas trouvé de produits correspondant à vos critères. Essayez de modifier vos filtres.
              </p>
              <button 
                onClick={clearFilters}
                className="bg-black text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[var(--color-brand-volt)] hover:text-black hover:scale-105 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
          
          {/* Pagination Mock */}
          {displayProducts.length > 0 && (
            <div className="mt-20 flex justify-center items-center gap-3">
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-100 text-gray-400 hover:border-black hover:text-black font-bold transition-all hover:-translate-x-1">&larr;</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl bg-black text-white font-black shadow-[0_10px_20px_rgba(0,0,0,0.1)]">1</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-transparent hover:bg-gray-50 text-gray-600 font-bold transition-all">2</button>
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-transparent hover:bg-gray-50 text-gray-600 font-bold transition-all">3</button>
              <span className="text-gray-400 mx-2 font-bold">...</span>
              <button className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gray-100 text-gray-400 hover:border-black hover:text-black font-bold transition-all hover:translate-x-1">&rarr;</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
