export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string; // main image
  hoverImage?: string; // secondary image if available
  images: string[]; // all images
  category: string; // Adulte, Enfant
  team: string;
  club?: string; // mapping to team for some components
  season?: string | null;
  type: string; // Domicile, Extérieur, Third, Rétro, Training, Gardien
  folderName: string; // original folder name for reference
  shortDescription?: string;
  longDescription?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  badges?: string[];
  keywords?: string[];
  clubSlug?: string;
  seasonSlug?: string;
  seasonDisplay?: string;
  typeSlug?: string;
  typeDisplay?: string;
  faq?: { q: string; a: string }[];
  altTexts?: string[];
  canonical?: string;
  isPlayerEdition?: boolean;
  isRetro?: boolean;
  isKids?: boolean;
  sizes?: string[];
  isWomens?: boolean;
  isSpecialEdition?: boolean;
  isAvailable?: boolean;
}

export interface Collection {
  id: string;
  title: string;
  slug: string;
  image: string;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Club {
  id: string;
  name: string;
  logo: string;
  slug: string;
}
