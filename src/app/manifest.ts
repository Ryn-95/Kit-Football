import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KIT FOOTBALL - Maillots de Foot Pas Cher',
    short_name: 'KIT FOOTBALL',
    description: 'Boutique n°1 de maillots de football pas cher en France. PSG, Real Madrid, France à 29€.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
