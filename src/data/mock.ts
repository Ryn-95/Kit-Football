// ==========================================
// BACKWARD COMPATIBILITY LAYER
// Re-exports catalog data in the old mock format
// ==========================================

import { getAllLegacyProducts, getBestSellers, getNewArrivals, getAllClubs, getAllCatalogProducts } from './catalog';
import { catalogToLegacy } from '../types/catalog';
import type { LegacyProduct } from '../types/catalog';
import type { Product, Collection, Category, Club } from '../types';

// Re-export as Product[] for backward compatibility
export const ALL_PRODUCTS: Product[] = getAllLegacyProducts() as Product[];
export const BEST_SELLERS: Product[] = getBestSellers().map(p => catalogToLegacy(p) as Product);
export const NEW_ARRIVALS: Product[] = getNewArrivals().map(p => catalogToLegacy(p) as Product);

// Generate PREMIUM_COLLECTIONS from real clubs with most products
const topClubs = getAllClubs().slice(0, 4);
export const PREMIUM_COLLECTIONS: Collection[] = topClubs.map((club, i) => {
  const clubProducts = getAllCatalogProducts().filter(p => p.clubSlug === club.slug);
  const firstImage = clubProducts[0]?.images[0] || '/placeholder.jpg';
  return {
    id: `c${i + 1}`,
    title: club.name.toUpperCase(),
    slug: club.slug,
    image: firstImage,
  };
});

export const SECONDARY_CATEGORIES: Category[] = [
  {
    id: 'sc1',
    name: 'SÉLECTIONS NATIONALES',
    slug: 'selections',
    image: getAllCatalogProducts().find(p => p.category === 'national')?.images[0] || '/placeholder.jpg',
  },
  {
    id: 'sc2',
    name: 'MAILLOTS RÉTRO',
    slug: 'retro',
    image: getAllCatalogProducts().find(p => p.isRetro)?.images[0] || '/placeholder.jpg',
  },
  {
    id: 'sc3',
    name: 'VERSION PLAYER',
    slug: 'player',
    image: getAllCatalogProducts().find(p => p.isPlayerEdition)?.images[0] || '/placeholder.jpg',
  },
  {
    id: 'sc4',
    name: 'COLLECTION ENFANTS',
    slug: 'enfants',
    image: getAllCatalogProducts().find(p => p.isKids)?.images[0] || '/placeholder.jpg',
  },
];

// Generate CLUBS from real data
const realClubs = getAllClubs().slice(0, 12);
export const CLUBS: Club[] = realClubs.map((club, i) => {
  const clubProducts = getAllCatalogProducts().filter(p => p.clubSlug === club.slug);
  return {
    id: `cl${i + 1}`,
    name: club.name,
    slug: club.slug,
    logo: clubProducts[0]?.images[0] || '/placeholder.jpg',
  };
});
