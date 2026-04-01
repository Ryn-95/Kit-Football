import { ALL_SILO_PAGES, SiloPage } from "../../data/seo-data";
import { LONG_TAIL_PAGES, MONEY_PAGES, LongTailPage, MoneyPage } from "../../data/longtail-data";
import { ALL_PROGRAMMATIC_PAGES, ProgrammaticPage } from "../../data/programmatic/seo-matrix";
import { ALL_PRODUCTS } from "../../data/mock";
import { ProductCard } from "../../components/ui/ProductCard";
import { Breadcrumbs } from "../../components/ui/Breadcrumbs";
import { AggressiveSEO } from "../../components/seo/AggressiveSEO";
import { FAQJsonLd } from "../../components/seo/JsonLd";
import { CrossLinking } from "../../components/seo/CrossLinking";
import Script from "next/script";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

// ============================================================
// UNIVERSAL DYNAMIC ROUTE
// Handles: Silo pages + Long-tail pages + Money pages
// ============================================================

interface PageProps {
  params: Promise<{ slug: string }>;
}

type PageType = "silo" | "longtail" | "money" | "programmatic";

function findPage(slug: string): { type: PageType; silo?: SiloPage; lt?: LongTailPage; money?: MoneyPage; prog?: ProgrammaticPage } | null {
  const silo = ALL_SILO_PAGES.find(p => p.slug === slug);
  if (silo) return { type: "silo", silo };

  const lt = LONG_TAIL_PAGES.find(p => p.slug === slug);
  if (lt) return { type: "longtail", lt };

  const money = MONEY_PAGES.find(p => p.slug === slug);
  if (money) return { type: "money", money };

  const prog = ALL_PROGRAMMATIC_PAGES.find(p => p.slug === slug);
  if (prog) return { type: "programmatic", prog };

  // INFINITE SEO CATCH-ALL: Si le slug commence par des mots clés stratégiques, on génère la page à la volée.
  if (slug.startsWith('maillot-') || slug.startsWith('survetement-') || slug.startsWith('ensemble-') || slug.startsWith('replique-') || slug.startsWith('avis-') || slug.startsWith('code-promo-') || slug === 'boite-mystere' || slug === 'accessoires') {
    const cleanName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    const isCheap = slug.includes('pas-cher');
    
    // CONTENT SPINNING (Génération dynamique)
    const spinIntros = [
      `Vous cherchez à vous équiper avec ${cleanName} ? Retrouvez les meilleures offres sur notre boutique experte. Que ce soit pour offrir ou pour vous-même, profitez de nos tarifs exclusifs et d'une qualité inégalée.`,
      `Bienvenue sur la page dédiée à ${cleanName}. Notre catalogue vous propose les meilleures éditions de l'année au prix le plus juste. Ne ratez pas nos promotions en cours !`,
      `Acheter ${cleanName} n'a jamais été aussi simple. Nous garantissons une expédition express et un flocage 100% officiel pour tous nos articles.`,
      `Découvrez pourquoi des milliers de fans choisissent KIT FOOTBALL pour ${cleanName}. Un rapport qualité-prix imbattable sur le marché européen.`
    ];
    const spunIntro = spinIntros[slug.length % spinIntros.length];

    // FAQ DYNAMIQUE (SCHEMA BOMBING)
    const dynamicFaq = [
      { q: `Où acheter ${cleanName} au meilleur prix ?`, a: `Chez KIT FOOTBALL, nous proposons ${cleanName} avec des réductions allant jusqu'à -50%. Livraison 48h partout en France et en Europe.` },
      { q: `Le flocage est-il officiel pour ${cleanName} ?`, a: `Oui, tous nos maillots et équipements, y compris ${cleanName}, disposent d'un flocage 100% officiel (joueur ou personnalisé).` },
      { q: `Quels sont les délais de livraison pour ${cleanName} ?`, a: `Si vous commandez ${cleanName} aujourd'hui, votre colis sera expédié sous 24h et livré en 48h/72h à votre domicile ou en point relais.` },
      { q: `Pourquoi choisir KIT FOOTBALL plutôt que les concurrents pour ${cleanName} ?`, a: `Nous sommes les spécialistes du maillot de football. Contrairement à nos concurrents, nous garantissons un service client réactif 7j/7 et la qualité "Version Player" authentique pour ${cleanName}.` },
    ];

    return {
      type: "programmatic",
      prog: {
        slug,
        title: `${cleanName} | KIT FOOTBALL`,
        metaTitle: isCheap ? `Acheter ${cleanName} | Promo & Livraison Rapide ⚡` : `${cleanName} Officiel | Flocage & Livraison 48h`,
        metaDescription: `Découvrez notre collection pour ${cleanName}. Qualité premium garantie, flocage officiel et expédition express en 48h partout en Europe.`,
        h1: cleanName,
        introText: spunIntro,
        type: "intent",
        relatedSlugs: ["maillot-foot-pas-cher", "maillot-version-player"],
        faq: dynamicFaq
      }
    };
  }

  return null;
}

export async function generateStaticParams() {
  const siloSlugs = ALL_SILO_PAGES.map(p => ({ slug: p.slug }));
  const ltSlugs = LONG_TAIL_PAGES.map(p => ({ slug: p.slug }));
  const moneySlugs = MONEY_PAGES.map(p => ({ slug: p.slug }));
  const progSlugs = ALL_PROGRAMMATIC_PAGES.map(p => ({ slug: p.slug }));
  return [...siloSlugs, ...ltSlugs, ...moneySlugs, ...progSlugs];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = findPage(slug);
  if (!found) return { title: "Page introuvable | KIT FOOTBALL" };

  if (found.type === "silo" && found.silo) {
    return {
      title: found.silo.metaTitle,
      description: found.silo.metaDescription,
      alternates: { canonical: `https://www.kitsfootball.fr/${slug}` },
      openGraph: { title: found.silo.metaTitle, description: found.silo.metaDescription, siteName: "KIT FOOTBALL" },
    };
  }
  if (found.type === "longtail" && found.lt) {
    return {
      title: found.lt.metaTitle,
      description: found.lt.metaDescription,
      alternates: { canonical: `https://www.kitsfootball.fr/${slug}` },
      openGraph: { title: found.lt.metaTitle, description: found.lt.metaDescription, siteName: "KIT FOOTBALL" },
    };
  }
  if (found.type === "money" && found.money) {
    return {
      title: found.money.metaTitle,
      description: found.money.metaDescription,
      alternates: { canonical: `https://www.kitsfootball.fr/${slug}` },
      openGraph: { title: found.money.metaTitle, description: found.money.metaDescription, siteName: "KIT FOOTBALL" },
    };
  }
  if (found.type === "programmatic" && found.prog) {
    return {
      title: found.prog.metaTitle,
      description: found.prog.metaDescription,
      alternates: { canonical: `https://www.kitsfootball.fr/${slug}` },
      openGraph: { title: found.prog.metaTitle, description: found.prog.metaDescription, siteName: "KIT FOOTBALL" },
    };
  }
  return { title: "KIT FOOTBALL" };
}

// ============================================================
// SHARED COMPONENTS
// ============================================================

function ProductGrid({ clubSearch }: { clubSearch: string }) {
  const allProducts = ALL_PRODUCTS;
  const search = clubSearch.toLowerCase().replace(/-/g, " ");
  const matched = allProducts.filter(p =>
    p.team.toLowerCase().includes(search) || p.slug.includes(search) || p.category.includes(search)
  );
  const displayProducts = matched.length > 0 ? matched : allProducts.slice(0, 4);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-heading font-black italic uppercase text-black tracking-wider">Notre Sélection</h2>
          <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">{displayProducts.length} produit{displayProducts.length > 1 ? "s" : ""}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faq, slug }: { faq: { q: string; a: string }[], slug: string }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  return (
    <>
      <Script id={`faq-${slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} strategy="beforeInteractive" />
      <section className="py-12 border-t border-gray-100 bg-[#fcfcfc]">
        <div className="container mx-auto px-6 max-w-[900px]">
          <h2 className="text-lg font-heading font-black text-black uppercase italic mb-8">Questions Fréquentes</h2>
          <div className="space-y-3">
            {faq.map((f, i) => (
              <details key={i} className="bg-white border border-gray-100 rounded-2xl p-5 group cursor-pointer">
                <summary className="text-sm font-bold text-black flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-gray-400 group-open:rotate-45 transition-transform text-xl ml-4">+</span>
                </summary>
                <p className="text-gray-500 text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function TopSalesLinks() {
  return (
    <div className="py-12 border-t border-gray-100 bg-[#fbfbfb]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-6">Top Ventes KIT FOOTBALL</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: "Maillot PSG", href: "/maillot-psg" },
            { label: "Maillot Real Madrid", href: "/maillot-real-madrid" },
            { label: "Maillot France", href: "/maillot-france" },
            { label: "Coupe du Monde 2026", href: "/maillot-coupe-du-monde-2026" },
            { label: "Maillots Pas Cher", href: "/maillot-foot-pas-cher" },
            { label: "Maillots Rétro", href: "/maillot-retro" },
            { label: "Maillots Enfant", href: "/maillot-enfant" },
            { label: "Version Player", href: "/maillot-version-player" },
            { label: "Guides", href: "/guides" },
          ].map(link => (
            <Link key={link.href} href={link.href} className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full text-gray-600 hover:border-[var(--color-brand-volt)] hover:text-black transition-colors">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SILO PAGE RENDERER
// ============================================================
function SiloPageRenderer({ page }: { page: SiloPage }) {
  const relatedPages = page.relatedSlugs.map(s => ALL_SILO_PAGES.find(p => p.slug === s)).filter(Boolean);
  const siloLabels: Record<string, string> = { clubs: "Clubs", selections: "Sélections", types: "Types", intentions: "Boutique", "coupe-du-monde": "Coupe du Monde 2026" };
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: siloLabels[page.silo] || "Collections", href: "/collections" },
    { label: page.title, href: `/${page.slug}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#050505] py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(204,255,0,0.06)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black italic uppercase text-white tracking-tighter leading-none mb-6">
            {page.title.split("—")[0]}<br />
            <span className="text-[var(--color-brand-volt)]">{page.title.split("—")[1] || ""}</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl leading-relaxed">{page.heroText}</p>
        </div>
      </section>

      <ProductGrid clubSearch={page.slug.replace("maillot-", "")} />

      {relatedPages.length > 0 && (
        <section className="py-12 border-t border-gray-100 bg-[#fcfcfc]">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-6">Explorer aussi</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPages.map(rp => rp && (
                <Link key={rp.slug} href={`/${rp.slug}`} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[var(--color-brand-volt)] hover:shadow-lg transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-2">{siloLabels[rp.silo]}</span>
                  <span className="text-base font-bold text-black group-hover:text-[var(--color-brand-volt)] transition-colors">{rp.title.split("—")[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 max-w-[1000px] text-gray-500 text-sm leading-relaxed">
          <h2 className="text-xl font-heading font-black text-black uppercase italic mb-4 not-prose">{page.title} chez KIT FOOTBALL</h2>
          <p>{page.seoLongText}</p>
        </div>
      </section>

      <FAQSection faq={page.faq} slug={page.slug} />
      <TopSalesLinks />
      <CrossLinking currentSlug={page.slug} relatedSlugs={page.relatedSlugs} />
      <AggressiveSEO keyword={page.title} type="silo" />
      <FAQJsonLd faq={page.faq} />
    </div>
  );
}

// ============================================================
// LONG-TAIL PAGE RENDERER
// ============================================================
function LongTailRenderer({ page }: { page: LongTailPage }) {
  const relatedPillar = page.relatedSlugs.map(s => ALL_SILO_PAGES.find(p => p.slug === s)).filter(Boolean);
  const relatedLongTail = LONG_TAIL_PAGES.filter(p => p.slug !== page.slug && p.club === page.club).slice(0, 6);
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: `Maillot ${page.club}`, href: `/${page.relatedSlugs[0] || "maillot-football"}` },
    { label: page.h1, href: `/${page.slug}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#050505] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(204,255,0,0.05)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-[var(--color-brand-volt)] text-black text-[10px] font-black uppercase tracking-widest px-2 py-1">{page.type}</span>
            <span className="bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">Saison {page.season}</span>
            {page.audience && <span className="bg-blue-500 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1">{page.audience}</span>}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black italic uppercase text-white tracking-tighter leading-none mb-6">{page.h1}</h1>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">{page.introText}</p>
        </div>
      </section>

      <ProductGrid clubSearch={page.club} />

      {relatedLongTail.length > 0 && (
        <section className="py-12 bg-[#fcfcfc] border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-6">Voir aussi — Maillots {page.club}</h3>
            <div className="flex flex-wrap gap-2">
              {relatedLongTail.map(lt => (
                <Link key={lt.slug} href={`/${lt.slug}`} className="text-xs bg-white border border-gray-200 px-4 py-2 rounded-full text-gray-600 hover:border-[var(--color-brand-volt)] hover:text-black transition-colors">{lt.h1}</Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedPillar.length > 0 && (
        <section className="py-12 border-t border-gray-100">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-6">Collections Principales</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPillar.map(p => p && (
                <Link key={p.slug} href={`/${p.slug}`} className="group bg-[#050505] border border-gray-800 rounded-2xl p-6 hover:border-[var(--color-brand-volt)] transition-all">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">{p.silo}</span>
                  <span className="text-sm font-bold text-white group-hover:text-[var(--color-brand-volt)] transition-colors">{p.title.split("—")[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-[900px] text-gray-500 text-sm leading-relaxed">
          <h2 className="text-lg font-heading font-black text-black uppercase italic mb-4">{page.h1} — Pourquoi KIT FOOTBALL ?</h2>
          <p>{page.detailText}</p>
        </div>
      </section>

      <FAQSection faq={page.faq} slug={page.slug} />
      <TopSalesLinks />
      <CrossLinking currentSlug={page.slug} relatedSlugs={page.relatedSlugs} />
      <AggressiveSEO keyword={page.h1} type="longtail" />
      <FAQJsonLd faq={page.faq} />
    </div>
  );
}

// ============================================================
// MONEY PAGE RENDERER
// ============================================================
function MoneyPageRenderer({ page }: { page: MoneyPage }) {
  const relatedPillar = page.relatedSlugs.map(s => ALL_SILO_PAGES.find(p => p.slug === s)).filter(Boolean);
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: page.h1, href: `/${page.slug}` },
  ];

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-[#050505] py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(204,255,0,0.08)_0%,transparent_50%)]"></div>
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase text-white tracking-tighter leading-none mb-4">{page.h1}</h1>
          <p className="text-[var(--color-brand-volt)] font-bold text-lg mb-6">{page.subtitle}</p>
          <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">{page.introText}</p>
          
          {/* Selling Points */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {page.sellingPoints.map((sp, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                <span className="text-white text-sm font-bold">{sp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProductGrid clubSearch="best" />

      {relatedPillar.length > 0 && (
        <section className="py-12 border-t border-gray-100 bg-[#fcfcfc]">
          <div className="container mx-auto px-6 max-w-[1400px]">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-6">Explorer par catégorie</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedPillar.map(p => p && (
                <Link key={p.slug} href={`/${p.slug}`} className="group bg-white border border-gray-100 rounded-2xl p-6 hover:border-[var(--color-brand-volt)] hover:shadow-lg transition-all">
                  <span className="text-base font-bold text-black group-hover:text-[var(--color-brand-volt)] transition-colors">{p.title.split("—")[0]}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection faq={page.faq} slug={page.slug} />
      <TopSalesLinks />
      <CrossLinking currentSlug={page.slug} relatedSlugs={page.relatedSlugs} />
      <AggressiveSEO keyword={page.h1} type="money" />
      <FAQJsonLd faq={page.faq} />
    </div>
  );
}

// ============================================================
// PROGRAMMATIC PAGE RENDERER
// ============================================================
function ProgrammaticPageRenderer({ page }: { page: ProgrammaticPage }) {
  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: page.title, href: `/${page.slug}` },
  ];

  // Schema.org avancé pour e-commerce
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "name": page.h1,
        "description": page.metaDescription,
        "image": "https://www.kitsfootball.fr/favicon.ico",
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "EUR",
          "lowPrice": "29.99",
          "highPrice": "89.99",
          "offerCount": Math.floor(Math.random() * 50) + 10,
          "availability": "https://schema.org/InStock"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": (4.5 + Math.random() * 0.5).toFixed(1),
          "reviewCount": Math.floor(Math.random() * 500) + 50
        }
      },
      page.type === "local" ? {
        "@type": "LocalBusiness",
        "name": `KIT FOOTBALL ${(page.slug.split('-').pop() || '').toUpperCase()}`,
        "image": "https://www.kitsfootball.fr/favicon.ico",
        "telephone": "+33100000000",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": (page.slug.split('-').pop() || '').charAt(0).toUpperCase() + (page.slug.split('-').pop() || '').slice(1),
          "addressCountry": "FR"
        },
        "priceRange": "$$"
      } : {}
    ].filter(s => Object.keys(s).length > 0)
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      <Script id={`schema-${page.slug}`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} strategy="beforeInteractive" />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="bg-[#fcfcfc] py-16 border-b border-gray-100">
        <div className="container mx-auto px-6 max-w-[1200px] text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase mb-6 text-black tracking-tight">
            {page.h1}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {page.introText}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-[1200px] py-16">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-heading font-black italic uppercase">Sélection recommandée</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {ALL_PRODUCTS.slice(0, 4).map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {page.faq && (
        <FAQSection faq={page.faq} slug={page.slug} />
      )}

      <div className="container mx-auto px-6 max-w-[1200px] mt-8">
        <CrossLinking currentSlug={page.slug} relatedSlugs={page.relatedSlugs} />
        <AggressiveSEO keyword={page.h1} type="silo" />
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default async function UniversalPage({ params }: PageProps) {
  const { slug } = await params;
  const found = findPage(slug);

  if (!found) notFound();

  if (found.type === "silo" && found.silo) return <SiloPageRenderer page={found.silo} />;
  if (found.type === "longtail" && found.lt) return <LongTailRenderer page={found.lt} />;
  if (found.type === "money" && found.money) return <MoneyPageRenderer page={found.money} />;
  if (found.type === "programmatic" && found.prog) return <ProgrammaticPageRenderer page={found.prog} />;

  notFound();
}
