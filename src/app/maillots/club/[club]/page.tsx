import { Metadata } from 'next';
import { getAllProducts, getProductsByTeam } from '@/lib/catalog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import slugify from 'slugify';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export async function generateStaticParams() {
  const products = getAllProducts();
  const teams = Array.from(new Set(products.map(p => p.team)));
  
  return teams.map((team) => ({
    club: slugify(team, { lower: true, strict: true }),
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ club: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const products = getAllProducts();
  const teamName = products.find(p => slugify(p.team, { lower: true, strict: true }) === resolvedParams.club)?.team;

  if (!teamName) return {};

  return {
    title: `Maillots ${teamName} | Boutique Officielle | KitFootball`,
    description: `Découvrez tous les maillots de football de ${teamName}. Domicile, extérieur, third et rétro. Livraison express disponible.`,
  };
}

export default async function ClubPage({ params }: { params: Promise<{ club: string }> }) {
  const resolvedParams = await params;
  const allProducts = getAllProducts();
  
  // Find original team name from slug
  const targetProduct = allProducts.find(p => slugify(p.team, { lower: true, strict: true }) === resolvedParams.club);
  if (!targetProduct) {
    notFound();
  }
  
  const teamName = targetProduct.team;
  const teamProducts = getProductsByTeam(teamName);

  return (
    <div className="container mx-auto px-6 py-10">
      <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2 uppercase tracking-wide">
        <Link href="/" className="hover:text-black hover:underline">Accueil</Link>
        <span>/</span>
        <Link href="/maillots" className="hover:text-black hover:underline">Maillots</Link>
        <span>/</span>
        <span className="text-black font-bold">{teamName}</span>
      </nav>

      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-black uppercase mb-4" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
          Maillots {teamName}
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Retrouvez notre sélection complète de maillots pour <strong>{teamName}</strong>. 
          Que vous cherchiez le tout dernier maillot domicile pour la saison en cours, 
          une édition extérieure ou un maillot rétro légendaire, vous trouverez votre bonheur ici. 
          Soutenez votre équipe avec style.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-8">
        {teamProducts.map(product => (
          <Link href={`/maillots/${product.slug}`} key={product.id} className="group block">
            <div className="relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden border border-transparent hover:border-black transition-colors">
              <ImageWithFallback 
                src={product.image} 
                alt={product.name}
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
            <p className="text-xs text-gray-500">{product.type}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
