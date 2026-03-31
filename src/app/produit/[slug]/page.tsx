import { getAllCatalogProducts, getProductBySlug, getRelatedProducts, getAllClubs, getAllTypes } from "../../../data/catalog";
import { ProductCard } from "../../../components/ui/ProductCard";
import { ProductJsonLd, BreadcrumbJsonLd, FAQJsonLd } from "../../../components/seo/JsonLd";
import { Breadcrumbs } from "../../../components/ui/Breadcrumbs";
import { ProductActions } from "../../../components/product/ProductActions";
import { ProductAccordion } from "../../../components/product/ProductAccordion";
import { ProductGallery } from "../../../components/product/ProductGallery";
import { catalogToLegacy } from "../../../types/catalog";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = getAllCatalogProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Produit introuvable | KIT FOOTBALL" };
  }

  return {
    title: `${product.name} Pas Cher – ${product.price}€ | KITFOOTBALL`,
    description: product.shortDescription,
    keywords: product.keywords.join(", "),
    alternates: {
      canonical: `https://kitfootball.com/produit/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | KITFOOTBALL`,
      description: product.shortDescription,
      url: `https://kitfootball.com/produit/${product.slug}`,
      images: product.images.slice(0, 4).map((img) => ({
        url: `https://kitfootball.com${img}`,
        alt: product.name,
      })),
      type: "website",
      locale: "fr_FR",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.shortDescription,
      images: product.images[0] ? [`https://kitfootball.com${product.images[0]}`] : [],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = getRelatedProducts(product, 8);
  const sameClubProducts = relatedProducts.filter((p) => p.clubSlug === product.clubSlug).slice(0, 4);
  const otherRelated = relatedProducts.filter((p) => p.clubSlug !== product.clubSlug).slice(0, 4);

  const breadcrumbItems = [
    { label: "Accueil", href: "/" },
    { label: "Maillots", href: "/maillots" },
    ...(product.club !== "Autres"
      ? [{ label: product.club, href: `/maillots/club/${product.clubSlug}` }]
      : []),
    { label: product.name, href: `/produit/${product.slug}` },
  ];

  const breadcrumbJsonLd = breadcrumbItems.map((item) => ({
    name: item.label,
    url: `https://kitfootball.com${item.href}`,
  }));

  return (
    <>
      <ProductJsonLd product={catalogToLegacy(product)} />
      <BreadcrumbJsonLd items={breadcrumbJsonLd} />
      {product.faq.length > 0 && <FAQJsonLd faq={product.faq} />}

      <div className="bg-white min-h-screen pt-8 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Main Product Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
            {/* Left: Image Gallery */}
            <ProductGallery
              images={product.images}
              altTexts={product.altTexts}
              productName={product.name}
              isNew={product.isNew}
            />

            {/* Right: Product Details */}
            <div className="flex flex-col py-4">
              {/* Club/Team name */}
              {product.club !== "Autres" && (
                <Link
                  href={`/maillots/club/${product.clubSlug}`}
                  className="mb-2 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-[var(--color-brand-volt)] transition-colors"
                >
                  {product.club}
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black italic uppercase text-black tracking-tight mb-4 leading-none">
                {product.name}
              </h1>

              {/* Price + Rating */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-black">{product.price},00€</span>
                <div className="flex text-yellow-500 text-sm">
                  ★★★★★{" "}
                  <span className="text-gray-400 ml-2">(128 avis vérifiés)</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 leading-relaxed mb-8">{product.shortDescription}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {product.type !== "other" && (
                  <Link
                    href={`/maillots/type/${product.typeSlug}`}
                    className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {product.typeDisplay}
                  </Link>
                )}
                {product.season !== "Inconnue" && (
                  <Link
                    href={`/maillots/saison/${product.seasonSlug}`}
                    className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {product.seasonDisplay}
                  </Link>
                )}
                {product.isPlayerEdition && (
                  <span className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded-full">
                    Version Player
                  </span>
                )}
                {product.isKids && (
                  <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
                    Enfant
                  </span>
                )}
                {product.isRetro && (
                  <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1.5 rounded-full">
                    Rétro
                  </span>
                )}
              </div>

              {/* Product Actions (size, version, patch, cart button) */}
              <ProductActions
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] || "/placeholder.jpg",
                  slug: product.slug,
                }}
              />

              <ProductAccordion />

              {/* Available Sizes Reference */}
              {product.sizes.length > 0 && (
                <div className="mt-6 bg-gray-50 border border-gray-100 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">
                    Tailles disponibles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <span
                        key={size}
                        className="text-sm font-bold text-gray-600 bg-white border border-gray-200 px-3 py-1"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Long Description */}
          <div className="bg-[#fcfcfc] border border-gray-100 p-8 md:p-12 mb-16">
            <h2 className="text-xl font-heading font-black italic uppercase text-black tracking-tight mb-6">
              À propos du {product.name}
            </h2>
            <div className="text-gray-600 leading-relaxed prose prose-sm max-w-none space-y-4">
              {product.longDescription.split("\n\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          {product.faq.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl font-heading font-black italic uppercase text-black tracking-tight mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {product.faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white border border-gray-100 p-6 transition-colors hover:border-gray-200"
                  >
                    <summary className="cursor-pointer font-bold text-black text-sm list-none flex items-center justify-between">
                      {item.q}
                      <span className="text-gray-400 group-open:rotate-45 transition-transform text-lg">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Internal Links - Maillage interne */}
          <div className="bg-gray-50 border border-gray-100 p-6 mb-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Explorer aussi
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.club !== "Autres" && (
                <Link
                  href={`/maillots/club/${product.clubSlug}`}
                  className="text-sm text-gray-600 hover:text-[var(--color-brand-volt)] transition-colors underline-offset-4 hover:underline"
                >
                  Tous les maillots {product.club}
                </Link>
              )}
              {product.type !== "other" && (
                <Link
                  href={`/maillots/type/${product.typeSlug}`}
                  className="text-sm text-gray-600 hover:text-[var(--color-brand-volt)] transition-colors underline-offset-4 hover:underline"
                >
                  Maillots {product.typeDisplay}
                </Link>
              )}
              {product.season !== "Inconnue" && (
                <Link
                  href={`/maillots/saison/${product.seasonSlug}`}
                  className="text-sm text-gray-600 hover:text-[var(--color-brand-volt)] transition-colors underline-offset-4 hover:underline"
                >
                  {product.seasonDisplay}
                </Link>
              )}
              <Link
                href="/maillots"
                className="text-sm text-gray-600 hover:text-[var(--color-brand-volt)] transition-colors underline-offset-4 hover:underline"
              >
                Tous les maillots
              </Link>
            </div>
          </div>

          {/* Same Club Products */}
          {sameClubProducts.length > 0 && (
            <div className="border-t border-gray-100 pt-16 mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-black italic uppercase text-black tracking-widest">
                  Autres maillots {product.club}
                </h2>
                {product.club !== "Autres" && (
                  <Link
                    href={`/maillots/club/${product.clubSlug}`}
                    className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
                  >
                    Voir tout →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {sameClubProducts.map((rp) => (
                  <ProductCard key={rp.id} product={catalogToLegacy(rp)} />
                ))}
              </div>
            </div>
          )}

          {/* Other Related Products */}
          {otherRelated.length > 0 && (
            <div className="border-t border-gray-100 pt-16 mb-16">
              <h2 className="text-2xl font-heading font-black italic uppercase text-black tracking-widest mb-8">
                Vous aimerez aussi
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {otherRelated.map((rp) => (
                  <ProductCard key={rp.id} product={catalogToLegacy(rp)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
