import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES } from "../../../data/guides-data";
import { ArticleJsonLd, BreadcrumbJsonLd } from "../../../components/seo/JsonLd";
import Image from "next/image";
import Link from "next/link";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    return { title: "Guide introuvable | KIT FOOTBALL" };
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    alternates: {
      canonical: `https://www.kitsfootball.fr/guides/${slug}`,
    },
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
      type: "article",
      publishedTime: guide.datePublished,
      authors: [guide.authorName],
      images: [
        {
          url: guide.heroImage,
          width: 1200,
          height: 630,
          alt: guide.title,
        }
      ]
    }
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const breadcrumbs = [
    { name: "Accueil", url: "https://www.kitsfootball.fr" },
    { name: "Guides", url: "https://www.kitsfootball.fr/guides" },
    { name: guide.title, url: `https://www.kitsfootball.fr/guides/${guide.slug}` }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <ArticleJsonLd 
        article={{
          title: guide.title,
          description: guide.metaDescription,
          image: guide.heroImage,
          datePublished: guide.datePublished,
          authorName: guide.authorName,
          url: `https://www.kitsfootball.fr/guides/${guide.slug}`
        }} 
      />

      <article className="min-h-screen bg-white pb-24">
        {/* Hero Section */}
        <div className="relative h-[40vh] md:h-[50vh] w-full bg-black">
          <Image 
            src={guide.heroImage}
            alt={guide.title}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <span className="text-[var(--color-brand-volt)] font-bold tracking-[0.2em] text-xs uppercase mb-4 bg-black/50 px-3 py-1 rounded">
              {guide.category}
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black italic uppercase text-white max-w-4xl leading-tight">
              {guide.title}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-6 max-w-[800px] mt-16">
          <div className="flex items-center text-sm text-gray-500 mb-10 border-b pb-6">
            <span>Par <strong className="text-black">{guide.authorName}</strong></span>
            <span className="mx-3">•</span>
            <time dateTime={guide.datePublished}>
              {new Date(guide.datePublished).toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          <div 
            className="prose prose-lg prose-headings:font-heading prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-a:text-[var(--color-brand-volt)] max-w-none"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          {/* Call to action */}
          <div className="mt-16 p-8 bg-gray-50 rounded-2xl text-center border border-gray-100">
            <h3 className="text-2xl font-heading font-black italic uppercase mb-4">Prêt à trouver votre maillot idéal ?</h3>
            <p className="text-gray-600 mb-6">Découvrez notre collection de plus de 200 maillots authentiques au meilleur prix.</p>
            <Link 
              href="/collections" 
              className="inline-block bg-[var(--color-brand-volt)] text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-[var(--color-brand-volt)] transition-colors duration-300"
            >
              Voir la boutique
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}