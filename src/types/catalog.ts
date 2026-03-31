// ==========================================
// CATALOG PRODUCT TYPES
// Complete type definitions for auto-generated catalog from /public/maillots/
// ==========================================

export interface CatalogProduct {
  id: string;
  name: string;
  slug: string;
  folderName: string;

  // Classification
  club: string;
  clubSlug: string;
  season: string;
  seasonSlug: string;
  seasonDisplay: string;
  type: ProductType;
  typeSlug: string;
  typeDisplay: string;
  category: ProductCategory;

  // Commerce
  price: number;
  images: string[];
  sizes: string[];

  // Content
  shortDescription: string;
  longDescription: string;
  faq: FAQItem[];

  // SEO
  keywords: string[];
  canonical: string;
  altTexts: string[];

  // Flags
  isKids: boolean;
  isWomens: boolean;
  isRetro: boolean;
  isPlayerEdition: boolean;
  isSpecialEdition: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isAvailable: boolean;

  // Derived
  league: string;
  country: string;
}

export type ProductType =
  | 'home'
  | 'away'
  | 'third'
  | 'retro'
  | 'training'
  | 'goalkeeper'
  | 'special'
  | 'jacket'
  | 'hoodie'
  | 'windbreaker'
  | 'other';

export type ProductCategory =
  | 'club'
  | 'national'
  | 'kids'
  | 'women'
  | 'retro'
  | 'outerwear'
  | 'other';

export interface FAQItem {
  q: string;
  a: string;
}

export interface ClubInfo {
  name: string;
  slug: string;
  count: number;
  league: string;
  country: string;
}

export interface TypeInfo {
  name: string;
  slug: string;
  display: string;
  count: number;
}

export interface SeasonInfo {
  name: string;
  slug: string;
  display: string;
  count: number;
}

// Backward compatibility with existing Product type
export interface LegacyProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  hoverImage?: string;
  category: string;
  team: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  badges?: string[];
}

export function catalogToLegacy(p: CatalogProduct): LegacyProduct {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    price: p.price,
    image: p.images[0] || '/placeholder.jpg',
    hoverImage: p.images[1],
    category: p.category,
    team: p.club,
    isNew: p.isNew,
    isBestSeller: p.isBestSeller,
  };
}
