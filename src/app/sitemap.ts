import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/catalog';
import slugify from 'slugify';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kitfootball.com';

  const products = getAllProducts();
  const teams = Array.from(new Set(products.map(p => p.team)));
  const types = Array.from(new Set(products.map(p => p.type)));

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/maillots/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const teamUrls = teams.map((team) => ({
    url: `${baseUrl}/maillots/club/${slugify(team, { lower: true, strict: true })}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const typeUrls = types.map((type) => ({
    url: `${baseUrl}/maillots/type/${slugify(type, { lower: true, strict: true })}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/maillots`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...teamUrls,
    ...typeUrls,
    ...productUrls,
  ];
}
