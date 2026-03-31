import { Metadata } from 'next';
import { getProductBySlug, getAllProducts } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';
import ProductCheckout from '@/components/product/ProductCheckout';

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

  return {
    title: `${product.name} | KitFootball`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | KitFootball`,
      description: product.shortDescription,
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = getAllProducts()
    .filter(p => p.team === product.team && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <BreadcrumbJsonLd 
        items={[
          { name: 'Accueil', url: 'https://kitfootball.com' },
          { name: 'Maillots', url: 'https://kitfootball.com/maillots' },
          { name: product.team, url: `https://kitfootball.com/maillots?team=${encodeURIComponent(product.team)}` },
          { name: product.name, url: `https://kitfootball.com/maillots/${product.slug}` }
        ]} 
      />
      <ProductJsonLd product={product} />

      <div className="container mx-auto px-6 py-10 max-w-[1200px]">
        {/* Breadcrumbs */}
        <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-wide">
          <Link href="/" className="hover:text-black hover:underline">Accueil</Link>
          <span>/</span>
          <Link href="/maillots" className="hover:text-black hover:underline">Maillots</Link>
          <span>/</span>
          <Link href={`/maillots?team=${encodeURIComponent(product.team)}`} className="hover:text-black hover:underline">{product.team}</Link>
          <span>/</span>
          <span className="text-black font-bold">{product.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="w-full md:w-3/5">
            <div className="grid grid-cols-2 gap-2">
              {product.images.map((img, idx) => (
                <div key={idx} className="bg-[#f5f5f5] aspect-[4/5] relative">
                  <ImageWithFallback 
                    src={img} 
                    alt={`${product.name} - Vue ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover mix-blend-multiply"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="w-full md:w-2/5 flex flex-col pt-4">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
                {product.name}
              </h1>
            </div>
            
            <p className="text-xl font-bold mb-8">{product.price} €</p>
            
            <div className="mb-4 prose prose-sm text-gray-700">
              <p>{product.shortDescription}</p>
            </div>

            <ProductCheckout product={product} />

            <div className="border-t border-gray-200 pt-8 mt-8">
              <h3 className="font-bold uppercase tracking-widest text-sm mb-4">Détails du produit</h3>
              <div className="prose prose-sm text-gray-700 whitespace-pre-line">
                {product.longDescription}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-black uppercase mb-8" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
              Autres maillots {product.team}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(rel => (
                <Link href={`/maillots/${rel.slug}`} key={rel.id} className="group block">
                  <div className="relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden border border-transparent hover:border-black transition-colors">
                    <ImageWithFallback 
                      src={rel.image} 
                      alt={rel.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm font-bold text-black mb-1">{rel.price} €</p>
                  <h3 className="text-sm text-black mb-1 group-hover:text-gray-600 transition-colors line-clamp-2">
                    {rel.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
