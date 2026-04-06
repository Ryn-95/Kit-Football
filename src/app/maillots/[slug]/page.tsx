import { Metadata } from 'next';
import { getProductBySlug, getAllProducts, getRelatedProducts } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import ProductPageContent from '@/components/product/ProductPageContent';

export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) return {};

  const title = `Acheter ${product.name} Pas Cher 29€ | KIT FOOTBALL`;
  const description = `Commandez votre ${product.name} au meilleur prix (29€). Maillot de haute qualité, tissu respirant, toutes tailles dispos. Livraison express 48h. Paiement sécurisé.`;

  return {
    title,
    description,
    keywords: `${product.name}, maillot ${product.team}, acheter maillot foot, maillot foot pas cher, maillot ${product.team} 2024, maillot ${product.team} 2025, kit football`,
    openGraph: {
      title,
      description,
      images: [{ url: `https://www.kitsfootball.fr${product.image}` }],
      url: `https://www.kitsfootball.fr/maillots/${product.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`https://www.kitsfootball.fr${product.image}`],
    },
    alternates: {
      canonical: `https://www.kitsfootball.fr/maillots/${product.slug}`,
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 8);
  const sameClubProducts = relatedProducts.filter((p) => p.clubSlug === product.clubSlug).slice(0, 4);
  const otherRelated = relatedProducts.filter((p) => p.clubSlug !== product.clubSlug).slice(0, 4);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Maillots", href: "/maillots" },
    ...(product.team
      ? [{ label: product.team, href: `/maillots/club/${product.clubSlug || ''}` }]
      : []),
    { label: product.name, href: `/maillots/${product.slug}` },
  ];

  return (
    <>
      <ProductJsonLd product={product as any} />
      <BreadcrumbJsonLd 
        items={breadcrumbItems.map(item => ({
          name: item.label || '',
          url: `https://www.kitsfootball.fr${item.href}`
        }))} 
      />
      {product.faq && product.faq.length > 0 && <FAQJsonLd faq={product.faq} />}

      <ProductPageContent 
        product={product}
        relatedProducts={relatedProducts}
        sameClubProducts={sameClubProducts}
        breadcrumbItems={breadcrumbItems}
      />
    </>
  );
