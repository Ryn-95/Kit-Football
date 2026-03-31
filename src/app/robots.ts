import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/commande', '/search'],
    },
    sitemap: 'https://www.kitfootball.com/sitemap.xml',
  };
}
