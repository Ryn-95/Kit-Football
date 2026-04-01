import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/commande', '/search', '/compte', '/api/'],
    },
    sitemap: 'https://www.kitsfootball.fr/sitemap.xml',
  };
}
