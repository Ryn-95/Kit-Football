import Link from "next/link";
import { ALL_SILO_PAGES } from "../../data/seo-data";
import { ALL_PROGRAMMATIC_PAGES } from "../../data/programmatic/seo-matrix";

interface CrossLinkingProps {
  currentSlug: string;
  relatedSlugs: string[];
}

export function CrossLinking({ currentSlug, relatedSlugs }: CrossLinkingProps) {
  if (!relatedSlugs || relatedSlugs.length === 0) return null;

  // Search in both arrays
  const relatedPages = relatedSlugs
    .map(slug => {
      const siloPage = ALL_SILO_PAGES.find(p => p.slug === slug);
      if (siloPage) return { title: siloPage.title, desc: siloPage.heroText, slug: siloPage.slug };
      
      const progPage = ALL_PROGRAMMATIC_PAGES.find(p => p.slug === slug);
      if (progPage) return { title: progPage.title, desc: progPage.introText, slug: progPage.slug };
      
      return null;
    })
    .filter(Boolean);

  if (relatedPages.length === 0) return null;

  return (
    <div className="mt-16 border-t border-gray-100 pt-10">
      <h3 className="text-xl font-heading font-black italic uppercase mb-6 text-black">
        Recherches fréquentes
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {relatedPages.map((page, idx) => (
          page && (
            <Link 
              key={idx} 
              href={`/${page.slug}`}
              className="group block p-4 bg-gray-50 rounded-lg hover:bg-[var(--color-brand-volt)] transition-colors duration-300"
            >
              <h4 className="font-bold text-black text-sm group-hover:text-black mb-1">{page.title}</h4>
              <p className="text-xs text-gray-600 group-hover:text-gray-800 line-clamp-2">
                {page.desc}
              </p>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}