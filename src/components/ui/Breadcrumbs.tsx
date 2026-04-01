import Link from 'next/link';
import { BreadcrumbJsonLd } from '../seo/JsonLd';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schemaItems = items.map(item => ({ name: item.label, url: `https://www.kitsfootball.fr${item.href}` }));

  return (
    <>
      <BreadcrumbJsonLd items={schemaItems} />
      <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 overflow-x-auto whitespace-nowrap pb-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <div key={item.href} className="flex items-center">
              {isLast ? (
                <span className="text-black" aria-current="page">{item.label}</span>
              ) : (
                <>
                  <Link href={item.href} className="hover:text-[var(--color-brand-volt)] transition-colors">
                    {item.label}
                  </Link>
                  <ChevronRight size={14} className="mx-2 opacity-50" />
                </>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
}
