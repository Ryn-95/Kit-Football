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
  season?: string | null;
  type: string; // Domicile, Extérieur, Third, Rétro, Training, Gardien
  folderName: string; // original folder name for reference
  shortDescription?: string;
  longDescription?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  badges?: string[];
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
