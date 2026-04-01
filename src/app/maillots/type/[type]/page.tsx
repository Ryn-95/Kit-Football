import { Metadata } from 'next';
import { getAllProducts, getProductsByType } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import slugify from 'slugify';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export async function generateStaticParams() {
  const products = getAllProducts();
  const types = Array.from(new Set(products.map(p => p.type)));
  
  return types.map((type) => ({
    type: slugify(type, { lower: true, strict: true }),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const products = getAllProducts();
  const typeName = products.find(p => slugify(p.type, { lower: true, strict: true }) === resolvedParams.type)?.type;

  if (!typeName) return {};

  const title = `Maillots ${typeName} Foot Pas Cher 29€ | Collection 2024-25 | KIT FOOTBALL`;
  const description = `Découvrez notre collection exclusive de maillots ${typeName}. Plus de 1000 modèles de clubs et nations à 29€. Qualité premium, livraison rapide 48h.`;

  return {
    title,
    description,
    keywords: `maillot ${typeName}, maillot de foot ${typeName}, maillot foot pas cher, acheter maillot foot, kit football`,
    alternates: {
      canonical: `https://www.kitsfootball.fr/maillots/type/${resolvedParams.type}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
    }
  };
}

export default async function TypePage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = await params;
  const allProducts = getAllProducts();
  
  const targetProduct = allProducts.find(p => slugify(p.type, { lower: true, strict: true }) === resolvedParams.type);
  if (!targetProduct) {
    notFound();
  }
  
  const typeName = targetProduct.type;
  const typeProducts = getProductsByType(typeName);

  return (
    <div className="container mx-auto px-6 py-10">
      <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-wide">
        <Link href="/" className="hover:text-black hover:underline">Accueil</Link>
        <span>/</span>
        <Link href="/maillots" className="hover:text-black hover:underline">Maillots</Link>
        <span>/</span>
        <span className="text-black font-bold">{typeName}</span>
      </nav>

      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-black uppercase mb-4" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
          Maillots {typeName}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Explorez notre gamme complète de maillots <strong>{typeName}</strong>. 
          Des designs classiques aux tenues d'entraînement, nous avons ce qu'il vous faut pour représenter vos couleurs.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8">
        {typeProducts.map(product => (
          <Link href={`/maillots/${product.slug}`} key={product.id} className="group block" title={`Maillot ${product.name} - Acheter à 29€`}>
            <div className="relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden border border-transparent hover:border-black transition-colors">
              <ImageWithFallback 
                src={product.image} 
                alt={`Maillot ${product.name} pas cher - Boutique Officielle KIT FOOTBALL`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <p className="text-sm font-bold text-black mb-1">{product.price} €</p>
            <h3 className="text-sm text-black mb-1 group-hover:text-gray-600 transition-colors line-clamp-2">
              {product.name}
            </h3>
            <p className="text-xs text-gray-500">{product.team}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
