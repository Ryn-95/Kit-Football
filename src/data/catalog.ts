// ==========================================
// CENTRAL CATALOG DATA EXPORTS
// Single source of truth for all product data
// ==========================================

import { scanCatalog } from '../lib/catalog-scanner';
import type { CatalogProduct, ClubInfo, TypeInfo, SeasonInfo, LegacyProduct } from '../types/catalog';
import { catalogToLegacy } from '../types/catalog';

// ==========================================
// SCAN AND CACHE
// ==========================================

let _cachedProducts: CatalogProduct[] | null = null;

function getProducts(): CatalogProduct[] {
  if (!_cachedProducts) {
    _cachedProducts = scanCatalog();
  }
  return _cachedProducts;
}

// ==========================================
// MAIN EXPORTS
// ==========================================

export function getAllCatalogProducts(): CatalogProduct[] {
  return getProducts();
}

export function getProductBySlug(slug: string): CatalogProduct | undefined {
  return getProducts().find(p => p.slug === slug);
}

export function getProductsByClub(clubSlug: string): CatalogProduct[] {
  return getProducts().filter(p => p.clubSlug === clubSlug);
}

export function getProductsByType(typeSlug: string): CatalogProduct[] {
  return getProducts().filter(p => p.typeSlug === typeSlug);
}

export function getProductsBySeason(seasonSlug: string): CatalogProduct[] {
  return getProducts().filter(p => p.seasonSlug === seasonSlug);
}

export function getProductsByCategory(category: string): CatalogProduct[] {
  return getProducts().filter(p => p.category === category);
}

// ==========================================
// AGGREGATION HELPERS
// ==========================================

export function getAllClubs(): ClubInfo[] {
  const products = getProducts();
  const clubMap = new Map<string, { name: string; slug: string; count: number; league: string; country: string }>();

  for (const p of products) {
    if (p.club === 'Autres') continue;
    const existing = clubMap.get(p.clubSlug);
    if (existing) {
      existing.count++;
    } else {
      clubMap.set(p.clubSlug, {
        name: p.club,
        slug: p.clubSlug,
        count: 1,
        league: p.league,
        country: p.country,
      });
    }
  }

  return Array.from(clubMap.values())
    .filter(c => c.count >= 2) // Only clubs with 2+ products
    .sort((a, b) => b.count - a.count);
}

export function getAllTypes(): TypeInfo[] {
  const products = getProducts();
  const typeMap = new Map<string, { name: string; slug: string; display: string; count: number }>();

  for (const p of products) {
    const existing = typeMap.get(p.typeSlug);
    if (existing) {
      existing.count++;
    } else {
      typeMap.set(p.typeSlug, {
        name: p.type,
        slug: p.typeSlug,
        display: p.typeDisplay,
        count: 1,
      });
    }
  }

  return Array.from(typeMap.values())
    .filter(t => t.count >= 3) // Only types with 3+ products
    .sort((a, b) => b.count - a.count);
}

export function getAllSeasons(): SeasonInfo[] {
  const products = getProducts();
  const seasonMap = new Map<string, { name: string; slug: string; display: string; count: number }>();

  for (const p of products) {
    if (p.seasonSlug === 'autre') continue;
    const existing = seasonMap.get(p.seasonSlug);
    if (existing) {
      existing.count++;
    } else {
      seasonMap.set(p.seasonSlug, {
        name: p.season,
        slug: p.seasonSlug,
        display: p.seasonDisplay,
        count: 1,
      });
    }
  }

  return Array.from(seasonMap.values())
    .filter(s => s.count >= 3)
    .sort((a, b) => b.count - a.count);
}

export function getAllLeagues(): { name: string; slug: string; count: number }[] {
  const products = getProducts();
  const leagueMap = new Map<string, number>();

  for (const p of products) {
    if (p.league === 'Autre') continue;
    leagueMap.set(p.league, (leagueMap.get(p.league) || 0) + 1);
  }

  return Array.from(leagueMap.entries())
    .filter(([, count]) => count >= 3)
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

// ==========================================
// RELATED PRODUCTS
// ==========================================

export function getRelatedProducts(product: CatalogProduct, limit = 8): CatalogProduct[] {
  const products = getProducts();
  const related: CatalogProduct[] = [];
  const seen = new Set<string>([product.id]);

  // Priority 1: Same club, different product
  const sameClub = products.filter(p => p.clubSlug === product.clubSlug && !seen.has(p.id));
  for (const p of sameClub.slice(0, 4)) {
    related.push(p);
    seen.add(p.id);
  }

  // Priority 2: Same type, different club
  const sameType = products.filter(p => p.type === product.type && !seen.has(p.id));
  for (const p of sameType.slice(0, 4)) {
    if (related.length >= limit) break;
    related.push(p);
    seen.add(p.id);
  }

  // Priority 3: Same season
  const sameSeason = products.filter(p => p.seasonSlug === product.seasonSlug && !seen.has(p.id));
  for (const p of sameSeason.slice(0, 4)) {
    if (related.length >= limit) break;
    related.push(p);
    seen.add(p.id);
  }

  return related.slice(0, limit);
}

// ==========================================
// BACKWARD COMPATIBILITY (for existing components)
// ==========================================

export function getAllLegacyProducts(): LegacyProduct[] {
  return getProducts().map(catalogToLegacy);
}

export function getBestSellers(): CatalogProduct[] {
  return getProducts().filter(p => p.isBestSeller).slice(0, 12);
}

export function getNewArrivals(): CatalogProduct[] {
  return getProducts().filter(p => p.isNew).slice(0, 12);
}

// ==========================================
// FILTER OPTIONS (for CollectionContent)
// ==========================================

export function getFilterOptions() {
  const products = getProducts();

  const clubs = [...new Set(products.map(p => p.club).filter(c => c !== 'Autres'))].sort();
  const types = [...new Set(products.map(p => p.typeDisplay))].sort();
  const seasons = [...new Set(products.map(p => p.season).filter(s => s !== 'Inconnue'))].sort().reverse();
  const leagues = [...new Set(products.map(p => p.league).filter(l => l !== 'Autre'))].sort();
  const categories = [
    { value: 'club', label: 'Clubs' },
    { value: 'national', label: 'Sélections Nationales' },
    { value: 'kids', label: 'Enfants' },
    { value: 'women', label: 'Femme' },
    { value: 'retro', label: 'Rétro' },
    { value: 'outerwear', label: 'Vestes & Sweats' },
  ];

  return { clubs, types, seasons, leagues, categories };
}
