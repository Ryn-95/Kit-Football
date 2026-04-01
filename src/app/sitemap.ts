import { MetadataRoute } from 'next';
import { getAllProducts, getAllClubs, getAllTypes, getAllSeasons } from '@/lib/catalog';
import { ALL_SILO_PAGES } from '@/data/seo-data';
import { LONG_TAIL_PAGES, MONEY_PAGES } from '@/data/longtail-data';
import { ALL_PROGRAMMATIC_PAGES } from '@/data/programmatic/seo-matrix';
import { GUIDES } from '@/data/guides-data';
import slugify from 'slugify';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kitsfootball.fr';

  const products = getAllProducts();
  const clubs = getAllClubs();
  const types = getAllTypes();
  const seasons = getAllSeasons();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/maillots/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const teamUrls = clubs.map((club) => ({
    url: `${baseUrl}/maillots/club/${club.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const typeUrls = types.map((type) => ({
    url: `${baseUrl}/maillots/type/${type.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const seasonUrls = seasons.map((season) => ({
    url: `${baseUrl}/maillots/saison/${season.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const guideUrls = GUIDES.map((guide) => ({
    url: `${baseUrl}/guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const seoUrls = [
    ...ALL_SILO_PAGES,
    ...LONG_TAIL_PAGES,
    ...MONEY_PAGES,
    ...ALL_PROGRAMMATIC_PAGES,
  ].map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${baseUrl}/maillots`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/guides`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/collections`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ];

  return [
    ...staticPages,
    ...seoUrls,
    ...teamUrls,
    ...typeUrls,
    ...seasonUrls,
    ...productUrls,
    ...guideUrls,
  ];
}
