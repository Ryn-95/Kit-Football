'use client';

import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ProductActions } from '@/components/product/ProductActions';
import { ProductAccordion } from '@/components/product/ProductAccordion';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductCard } from '@/components/ui/ProductCard';
import TeamMatches from '@/components/TeamMatches';

interface ProductPageContentProps {
  product: any;
  relatedProducts: any[];
  sameClubProducts: any[];
  breadcrumbItems: any[];
}

export default function ProductPageContent({ 
  product, 
  relatedProducts, 
  sameClubProducts, 
  breadcrumbItems 
}: ProductPageContentProps) {
  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
    return parts.map((part, idx) => {
      const isBold = part.startsWith('**') && part.endsWith('**') && part.length >= 4;
      if (!isBold) return <span key={idx}>{part}</span>;
      return <strong key={idx}>{part.slice(2, -2)}</strong>;
    });
  };

  const renderSimpleMarkdown = (content: string) => {
    const lines = content.split('\n');
    const blocks: Array<
      | { type: 'h3'; text: string }
      | { type: 'h4'; text: string }
      | { type: 'p'; text: string }
      | { type: 'ul'; items: string[] }
    > = [];

    let paragraphLines: string[] = [];
    let listItems: string[] = [];

    const flushParagraph = () => {
      const text = paragraphLines.join(' ').trim();
      if (text) blocks.push({ type: 'p', text });
      paragraphLines = [];
    };

    const flushList = () => {
      if (listItems.length > 0) blocks.push({ type: 'ul', items: listItems });
      listItems = [];
    };

    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      const trimmed = line.trim();

      if (!trimmed) {
        flushList();
        flushParagraph();
        continue;
      }

      if (trimmed.startsWith('### ')) {
        flushList();
        flushParagraph();
        const raw = trimmed.replace(/^###\s+/, '');
        const [headingText, rest] = raw.split(/\s+-\s+/, 2);
        blocks.push({ type: 'h3', text: headingText.trim() });
        if (rest) {
          const items = raw
            .split(/\s+-\s+/)
            .slice(1)
            .map((v) => v.trim())
            .filter(Boolean);
          if (items.length > 0) blocks.push({ type: 'ul', items });
        }
        continue;
      }

      if (trimmed.startsWith('#### ')) {
        flushList();
        flushParagraph();
        const raw = trimmed.replace(/^####\s+/, '');
        const [headingText, rest] = raw.split(/\s+-\s+/, 2);
        blocks.push({ type: 'h4', text: headingText.trim() });
        if (rest) {
          const items = raw
            .split(/\s+-\s+/)
            .slice(1)
            .map((v) => v.trim())
            .filter(Boolean);
          if (items.length > 0) blocks.push({ type: 'ul', items });
        }
        continue;
      }

      if (trimmed.startsWith('- ')) {
        flushParagraph();
        listItems.push(trimmed.replace(/^-+\s+/, ''));
        continue;
      }

      flushList();
      paragraphLines.push(trimmed);
    }

    flushList();
    flushParagraph();

    return (
      <div className="space-y-4">
        {blocks.map((block, idx) => {
          if (block.type === 'h3') {
            return (
              <h3 key={idx} className="text-lg font-heading font-black italic uppercase text-black tracking-tight">
                {renderInline(block.text)}
              </h3>
            );
          }
          if (block.type === 'h4') {
            return (
              <h4 key={idx} className="text-sm font-bold uppercase tracking-wider text-black/80">
                {renderInline(block.text)}
              </h4>
            );
          }
          if (block.type === 'ul') {
            return (
              <ul key={idx} className="list-disc pl-5 space-y-1 text-sm text-gray-700 leading-relaxed">
                {block.items.map((item, itemIdx) => (
                  <li key={itemIdx}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={idx} className="text-sm text-gray-700 leading-relaxed">
              {renderInline(block.text)}
            </p>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="bg-white min-h-screen pt-8 pb-24">
        <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
          <Breadcrumbs items={breadcrumbItems} />

          {/* Team Matches */}
          {product.team && (
            <TeamMatches teamName={product.team} />
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-24">
            <ProductGallery
              images={product.images}
              altTexts={product.altTexts || []}
              productName={product.name}
              isNew={product.isNew}
            />

            <div className="flex flex-col py-4">
              {product.team && (
                <Link
                  href={`/maillots/club/${product.clubSlug || ''}`}
                  className="mb-2 text-sm font-bold text-gray-400 uppercase tracking-widest hover:text-[var(--color-brand-volt)] transition-colors"
                >
                  {product.team}
                </Link>
              )}

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black italic uppercase text-black tracking-tight mb-4 leading-none">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-black">
                  {Number(product.price).toFixed(2).replace('.', ',')}€
                </span>
                <div className="flex text-yellow-500 text-sm">
                  ★★★★★{" "}
                  <span className="text-gray-400 ml-2">(128 avis vérifiés)</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed mb-8">{product.shortDescription}</p>

              <ProductActions
                product={{
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  image: product.images[0] || "/placeholder.jpg",
                  slug: product.slug,
                }}
                teamName={product.team || product.club}
                clubSlug={product.clubSlug}
              />

              <ProductAccordion />
            </div>
          </div>

          <div className="bg-[#fcfcfc] border border-gray-100 p-8 md:p-12 mb-16">
            <h2 className="text-xl font-heading font-black italic uppercase text-black tracking-tight mb-6">
              À propos du {product.name}
            </h2>
            <div className="max-w-none">
              {product.longDescription ? renderSimpleMarkdown(product.longDescription) : null}
            </div>
          </div>

          {product.faq && product.faq.length > 0 && (
            <div className="mb-16">
              <h2 className="text-xl font-heading font-black italic uppercase text-black tracking-tight mb-6">
                Questions fréquentes
              </h2>
              <div className="space-y-4">
                {product.faq.map((item: any, i: number) => (
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

          <div className="bg-gray-50 border border-gray-100 p-6 mb-16">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">
              Explorer aussi
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.team && (
                <Link
                  href={`/maillots/club/${product.clubSlug || ''}`}
                  className="text-sm text-gray-600 hover:text-[var(--color-brand-volt)] transition-colors underline-offset-4 hover:underline"
                >
                  Tous les maillots {product.team}
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

          {sameClubProducts.length > 0 && (
            <div className="border-t border-gray-100 pt-16 mb-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-heading font-black italic uppercase text-black tracking-widest">
                  Autres maillots {product.team}
                </h2>
                {product.team && (
                  <Link
                    href={`/maillots/club/${product.clubSlug || ''}`}
                    className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
                  >
                    Voir tout →
                  </Link>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {sameClubProducts.map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
