import Link from "next/link";
import { getAllClubs, getAllTypes, getAllSeasons } from "../../data/catalog";

export function RelatedCategories() {
  const clubs = getAllClubs().slice(0, 6);
  const types = getAllTypes().slice(0, 6);
  const seasons = getAllSeasons().slice(0, 4);

  const groups = [
    {
      title: "Clubs Populaires",
      links: clubs.map((c) => ({
        label: `Maillot ${c.name}`,
        href: `/maillots/club/${c.slug}`,
      })),
    },
    {
      title: "Par Type",
      links: types.map((t) => ({
        label: `Maillots ${t.display}`,
        href: `/maillots/type/${t.slug}`,
      })),
    },
    {
      title: "Par Saison",
      links: seasons.map((s) => ({
        label: s.display,
        href: `/maillots/saison/${s.slug}`,
      })),
    },
    {
      title: "Liens Utiles",
      links: [
        { label: "Tous les Maillots", href: "/maillots" },
        { label: "Boutique Complète", href: "/collections" },
        { label: "Guides & Conseils", href: "/guides" },
      ],
    },
  ];

  return (
    <div className="py-16 border-t border-gray-100 bg-[#fbfbfb]">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-[#111] mb-8">
          Naviguer sur KIT FOOTBALL
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-[var(--color-brand-volt)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
