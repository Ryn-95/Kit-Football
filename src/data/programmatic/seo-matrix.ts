export interface ProgrammaticPage {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introText: string;
  type: "local" | "player" | "comparison" | "intent";
  relatedSlugs: string[];
  faq?: { q: string; a: string }[];
}

const TOP_CITIES = [
  "paris", "marseille", "lyon", "toulouse", "nice", 
  "nantes", "strasbourg", "montpellier", "bordeaux", "lille",
  "rennes", "reims", "saint-etienne", "toulon", "le-havre",
  "grenoble", "dijon", "angers", "nimes", "villeurbanne",
  "clermont-ferrand", "le-mans", "aix-en-provence", "brest", "tours",
  "amiens", "limoges", "annecy", "perpignan", "boulogne-billancourt",
  "metz", "besancon", "orleans", "argenteuil", "rouen",
  "mulhouse", "montreuil", "caen", "nancy", "saint-denis",
  "tourcoing", "roubaix", "nanterre", "vitry-sur-seine", "avignon",
  "creteil", "poitiers", "dunkerque", "versailles", "courbevoie"
];

const TOP_PLAYERS = [
  { slug: "mbappe", name: "Kylian Mbappé", club: "real-madrid" },
  { slug: "bellingham", name: "Jude Bellingham", club: "real-madrid" },
  { slug: "vinicius", name: "Vinícius Jr", club: "real-madrid" },
  { slug: "haaland", name: "Erling Haaland", club: "manchester-city" },
  { slug: "messi", name: "Lionel Messi", club: "inter-miami" },
  { slug: "ronaldo", name: "Cristiano Ronaldo", club: "al-nassr" },
  { slug: "salah", name: "Mohamed Salah", club: "liverpool" },
  { slug: "de-bruyne", name: "Kevin De Bruyne", club: "manchester-city" },
  { slug: "kane", name: "Harry Kane", club: "bayern-munich" },
  { slug: "lewandowski", name: "Robert Lewandowski", club: "barcelone" },
  { slug: "griezmann", name: "Antoine Griezmann", club: "atletico-madrid" },
  { slug: "saka", name: "Bukayo Saka", club: "arsenal" },
  { slug: "foden", name: "Phil Foden", club: "manchester-city" },
  { slug: "pedri", name: "Pedri", club: "barcelone" },
  { slug: "yamal", name: "Lamine Yamal", club: "barcelone" }
];

const TOP_CLUBS = [
  "psg", "real-madrid", "marseille", "barca", "arsenal",
  "manchester-city", "manchester-united", "liverpool", "chelsea", "tottenham",
  "bayern-munich", "borussia-dortmund", "bayer-leverkusen", "juventus", "ac-milan",
  "inter-milan", "napoli", "as-roma", "atletico-madrid", "seville",
  "olympique-lyonnais", "monaco", "lille-osc", "rc-lens", "stade-rennais"
];

const STRATEGIC_KEYWORDS = [
  "pas-cher", "officiel", "replica", "version-player", "enfant",
  "femme", "flocage", "vintage", "manches-longues", "survetement"
];

// 1. GENERATE LOCAL PAGES
export const LOCAL_PAGES: ProgrammaticPage[] = TOP_CITIES.map(city => ({
  slug: `maillot-foot-${city}`,
  title: `Maillot de Foot à ${city.charAt(0).toUpperCase() + city.slice(1)}`,
  metaTitle: `Maillot de Foot ${city.charAt(0).toUpperCase() + city.slice(1)} | Livraison Rapide & Pas Cher ⚡`,
  metaDescription: `Achetez votre maillot de football à ${city.charAt(0).toUpperCase() + city.slice(1)}. Livraison rapide dans toute l'agglomération. Maillots officiels PSG, OM, Real, France. Qualité premium garantie.`,
  h1: `Acheter un maillot de football à ${city.charAt(0).toUpperCase() + city.slice(1)}`,
  introText: `Vous cherchez un maillot de football authentique et livré rapidement à ${city.charAt(0).toUpperCase() + city.slice(1)} ? Découvrez notre collection complète de maillots des plus grands clubs et sélections nationales. Profitez de nos offres exclusives pour les supporters locaux.`,
  type: "local",
  relatedSlugs: TOP_CITIES.filter(c => c !== city).slice(0, 3).map(c => `maillot-foot-${c}`)
}));

// 2. GENERATE PLAYER PAGES
export const PLAYER_PAGES: ProgrammaticPage[] = TOP_PLAYERS.map(player => ({
  slug: `maillot-${player.club}-${player.slug}`,
  title: `Maillot ${player.name} - ${player.club.replace('-', ' ').toUpperCase()} 2025`,
  metaTitle: `Maillot ${player.name} 2025 | Flocage Officiel | Livraison Rapide ⚡`,
  metaDescription: `Commandez le nouveau maillot de ${player.name} avec le ${player.club.replace('-', ' ')}. Flocage officiel, tailles adulte et enfant. Meilleur prix garanti.`,
  h1: `Maillot Officiel ${player.name} 2025/2026`,
  introText: `Affichez fièrement le numéro et le nom de ${player.name} dans le dos de votre maillot. Retrouvez les éditions domicile, extérieur et third avec le flocage officiel de la saison en cours.`,
  type: "player",
  relatedSlugs: [`maillot-${player.club}`, "maillot-version-player", "maillot-enfant"]
}));

// 3. GENERATE COMPARISON PAGES
export const COMPARISON_PAGES: ProgrammaticPage[] = [
  {
    slug: "maillot-psg-vs-om",
    title: "Maillot PSG vs OM : Le Classico des Ventes",
    metaTitle: "Maillot PSG ou OM ? Le comparatif des ventes | KIT FOOTBALL",
    metaDescription: "Qui vend le plus de maillots entre le PSG et l'Olympique de Marseille ? Découvrez notre comparatif des tuniques du Classico français.",
    h1: "PSG vs OM : Le match des maillots",
    introText: "Le classico se joue aussi sur le terrain du merchandising. Entre la tunique parisienne signée Nike/Jordan et le maillot phocéen par Puma, lequel est le plus populaire cette saison ?",
    type: "comparison",
    relatedSlugs: ["maillot-psg", "maillot-marseille", "maillot-france"]
  }
];

const COMPETITORS = [
  "unisport", "footcenter", "maxmaillots", "classic-football-shirts", 
  "pro-direct-soccer", "sports-direct", "intersport", "decathlon", 
  "nike", "adidas", "puma", "go-sport", "boutique-psg", "boutique-om"
];

// 3.5 GENERATE COMPETITOR HIJACKING PAGES (GREY HAT SEO)
export const COMPETITOR_PAGES: ProgrammaticPage[] = COMPETITORS.flatMap(comp => [
  {
    slug: `avis-${comp}`,
    title: `Avis ${comp.toUpperCase()} 2025 : Faut-il y acheter ses maillots ?`,
    metaTitle: `Avis ${comp.toUpperCase()} 2025 | Pourquoi KIT FOOTBALL est moins cher et plus rapide ⚡`,
    metaDescription: `Lisez notre avis honnête sur ${comp.toUpperCase()} en 2025. Découvrez pourquoi de plus en plus de clients préfèrent KIT FOOTBALL pour l'achat de leurs maillots de football (prix, qualité, livraison 48h).`,
    h1: `Avis ${comp.toUpperCase()} : Notre comparatif 2025`,
    introText: `Vous hésitez à commander sur ${comp.toUpperCase()} ? Nous avons analysé les prix, la qualité des flocages et les délais de livraison. Découvrez notre comparatif détaillé et pourquoi KIT FOOTBALL s'impose comme l'alternative n°1 en France.`,
    type: "comparison",
    relatedSlugs: ["maillot-foot-pas-cher", "livraison-48h"]
  },
  {
    slug: `code-promo-${comp}`,
    title: `Code Promo ${comp.toUpperCase()} 2025 : Jusqu'à -50%`,
    metaTitle: `Code Promo ${comp.toUpperCase()} 2025 | Offre Exclusive KIT FOOTBALL -50% 🔥`,
    metaDescription: `Vous cherchez un code promo ${comp.toUpperCase()} valide en 2025 ? Ne cherchez plus ! Sur KIT FOOTBALL, profitez de prix discount toute l'année, sans avoir besoin de chercher un coupon de réduction.`,
    h1: `Alternative au Code Promo ${comp.toUpperCase()} (2025)`,
    introText: `Les codes promos ${comp.toUpperCase()} sont souvent expirés ou soumis à des conditions strictes. Chez KIT FOOTBALL, nous avons pris le parti de proposer les prix les plus bas du marché toute l'année. Découvrez nos maillots à prix cassé dès aujourd'hui !`,
    type: "comparison",
    relatedSlugs: ["soldes", "promotions"]
  }
]);


// 4. HIGH INTENT PAGES
export const INTENT_PAGES: ProgrammaticPage[] = TOP_CLUBS.map(club => ({
  slug: `meilleur-maillot-${club}-2025`,
  title: `Quel est le meilleur maillot du ${club.toUpperCase()} en 2025 ?`,
  metaTitle: `Meilleur Maillot ${club.toUpperCase()} 2025 | Guide d'Achat | KIT FOOTBALL`,
  metaDescription: `Vous hésitez entre le domicile, l'extérieur ou le third ? Découvrez notre classement et guide d'achat des maillots du ${club.toUpperCase()} pour la saison 2025/2026.`,
  h1: `Guide d'achat : Le meilleur maillot du ${club.toUpperCase()} (2025)`,
  introText: `Chaque saison, les équipementiers rivalisent d'inventivité. Découvrez notre analyse complète des tuniques du ${club.toUpperCase()} pour cette nouvelle saison. Coupe, design, confort : on vous dit tout.`,
  type: "intent",
  relatedSlugs: [`maillot-${club}`, `maillot-${club}-pas-cher`, "maillot-version-player"]
}));

// 5. CLUB X KEYWORD PAGES (25 clubs * 10 keywords = 250 pages)
export const CLUB_KEYWORD_PAGES: ProgrammaticPage[] = TOP_CLUBS.flatMap(club => 
  STRATEGIC_KEYWORDS.map(keyword => ({
    slug: `maillot-${club}-${keyword}`,
    title: `Maillot ${club.toUpperCase()} ${keyword.replace('-', ' ')}`,
    metaTitle: `Acheter Maillot ${club.toUpperCase()} ${keyword.replace('-', ' ')} | Prix Réduit ⚡`,
    metaDescription: `Retrouvez le maillot ${club.toUpperCase()} en version ${keyword.replace('-', ' ')}. Qualité premium, livraison rapide et flocage disponible. Commandez dès maintenant !`,
    h1: `Maillot ${club.toUpperCase()} - Édition ${keyword.replace('-', ' ')}`,
    introText: `Découvrez notre sélection de maillots du ${club.toUpperCase()} spécifiquement pour la catégorie ${keyword.replace('-', ' ')}. Profitez des meilleurs tarifs sur les équipements de votre équipe favorite.`,
    type: "intent",
    relatedSlugs: [`maillot-${club}`, `meilleur-maillot-${club}-2025`]
  }))
);

// 6. CLUB X CITY PAGES (25 clubs * 50 cities = 1250 pages)
export const CLUB_CITY_PAGES: ProgrammaticPage[] = TOP_CLUBS.flatMap(club => 
  TOP_CITIES.map(city => ({
    slug: `maillot-${club}-${city}`,
    title: `Maillot ${club.toUpperCase()} à ${city.charAt(0).toUpperCase() + city.slice(1)}`,
    metaTitle: `Maillot ${club.toUpperCase()} à ${city.charAt(0).toUpperCase() + city.slice(1)} | Achat Local & Livraison ⚡`,
    metaDescription: `Achetez le maillot du ${club.toUpperCase()} depuis ${city.charAt(0).toUpperCase() + city.slice(1)}. Expédition rapide dans toute la région. Trouvez votre tenue complète dès aujourd'hui !`,
    h1: `Où acheter le maillot du ${club.toUpperCase()} à ${city.charAt(0).toUpperCase() + city.slice(1)} ?`,
    introText: `Supporters du ${club.toUpperCase()} résidant à ${city.charAt(0).toUpperCase() + city.slice(1)}, commandez votre maillot en ligne avec une livraison garantie et rapide dans votre ville.`,
    type: "local",
    relatedSlugs: [`maillot-foot-${city}`, `maillot-${club}`]
  }))
);

export const ALL_PROGRAMMATIC_PAGES = [
  ...LOCAL_PAGES,
  ...PLAYER_PAGES,
  ...COMPARISON_PAGES,
  ...COMPETITOR_PAGES,
  ...INTENT_PAGES,
  ...CLUB_KEYWORD_PAGES,
  ...CLUB_CITY_PAGES
];