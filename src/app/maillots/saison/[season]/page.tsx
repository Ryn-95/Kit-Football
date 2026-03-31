import { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { getAllSeasons, getProductsBySeason, getAllClubs, getAllTypes } from "../../../../data/catalog";
import { catalogToLegacy } from "../../../../types/catalog";
import CollectionContent from "../../../../components/collections/CollectionContent";
import { BreadcrumbJsonLd } from "../../../../components/seo/JsonLd";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ season: string }>;
}

export async function generateStaticParams() {
  return getAllSeasons().map((s) => ({ season: s.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { season: seasonSlug } = await params;
  const seasons = getAllSeasons();
  const seasonInfo = seasons.find((s) => s.slug === seasonSlug);

  if (!seasonInfo) return { title: "Saison introuvable | KITFOOTBALL" };

  return {
    title: `Maillots ${seasonInfo.display} – Nouveaux Maillots à 29€ | KITFOOTBALL`,
    description: `Tous les maillots de football ${seasonInfo.display.toLowerCase()} disponibles sur KitFootball. ${seasonInfo.count} modèles à partir de 29€. Clubs et sélections nationales.`,
    alternates: {
      canonical: `https://kitfootball.com/maillots/saison/${seasonSlug}`,
    },
  };
}

export default async function SeasonPage({ params }: PageProps) {
  const { season: seasonSlug } = await params;
  const seasons = getAllSeasons();
  const seasonInfo = seasons.find((s) => s.slug === seasonSlug);

  if (!seasonInfo) notFound();

  const products = getProductsBySeason(seasonSlug);
  const legacyProducts = products.map(catalogToLegacy);
  const otherSeasons = seasons.filter((s) => s.slug !== seasonSlug).slice(0, 6);
  const clubs = getAllClubs().slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50/30">
      <BreadcrumbJsonLd
        items={[
          { name: "Accueil", url: "https://kitfootball.com/" },
          { name: "Maillots", url: "https://kitfootball.com/maillots" },
          { name: seasonInfo.display, url: `https://kitfootball.com/maillots/saison/${seasonSlug}` },
        ]}
      />

      {/* Hero */}
      <div className="relative bg-[#050505] w-full h-[300px] md:h-[380px] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-white tracking-tighter mb-4 leading-none">
            Maillots {seasonInfo.display}
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            {products.length} maillots {seasonInfo.display.toLowerCase()} disponibles à partir de 29€.
          </p>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 md:px-6 max-w-[1600px] mt-8 mb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest bg-white w-fit px-6 py-4 border border-gray-100">
          <Link href="/" className="text-gray-400 hover:text-[var(--color-brand-volt)] transition-all">Accueil</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <Link href="/maillots" className="text-gray-400 hover:text-[var(--color-brand-volt)] transition-all">Maillots</Link>
          <ChevronRight size={14} className="text-gray-300" />
          <span className="text-black">{seasonInfo.display}</span>
        </div>
      </div>

      <Suspense fallback={<div className="flex justify-center p-12"><div className="w-8 h-8 border-4 border-[var(--color-brand-volt)] border-t-transparent rounded-full animate-spin"></div></div>}>
        <CollectionContent initialProducts={legacyProducts} sportType="football" />
      </Suspense>

      {/* Internal Links */}
      <div className="container mx-auto px-4 md:px-6 max-w-[1600px] py-12 space-y-6">
        <div className="bg-white border border-gray-100 p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Autres saisons</h2>
          <div className="flex flex-wrap gap-2">
            {otherSeasons.map((s) => (
              <Link key={s.slug} href={`/maillots/saison/${s.slug}`} className="text-sm font-bold bg-gray-50 text-gray-700 px-4 py-2 hover:bg-black hover:text-white transition-all">
                {s.display} ({s.count})
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Clubs populaires</h2>
          <div className="flex flex-wrap gap-2">
            {clubs.map((c) => (
              <Link key={c.slug} href={`/maillots/club/${c.slug}`} className="text-sm font-bold bg-gray-50 text-gray-700 px-4 py-2 hover:bg-black hover:text-white transition-all">
                {c.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white border border-gray-100 p-8">
          <h2 className="text-xl font-heading font-black italic uppercase text-black tracking-tight mb-4">
            Collection {seasonInfo.display}
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">
            Retrouvez tous les maillots de la {seasonInfo.display.toLowerCase()} sur KitFootball.
            Notre catalogue comprend {products.length} modèles de clubs et sélections nationales,
            tous disponibles à 29€ avec livraison rapide en Europe. Domicile, extérieur, third,
            éditions spéciales : trouvez le maillot idéal pour cette saison.
          </p>
        </div>
      </div>
    </div>
  );
}
