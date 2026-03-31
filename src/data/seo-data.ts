// ============================================================
// SEO DATA ENGINE — KIT FOOTBALL
// The single source of truth for all programmatic SEO pages.
// Each entry generates a unique, rich, internally-linked page.
// ============================================================

export interface SiloPage {
  slug: string;           // URL path segment (e.g. "psg")
  title: string;          // H1 visible on page
  metaTitle: string;      // <title> tag
  metaDescription: string;
  heroText: string;       // Short intro paragraph
  seoLongText: string;    // Deep SEO paragraph
  faq: { q: string; a: string }[];
  relatedSlugs: string[]; // Internal links to other silo pages
  silo: "clubs" | "selections" | "types" | "intentions" | "coupe-du-monde" | "basketball" | "rugby";
}

// ————————————————————————————————
// SILO 1 : CLUBS
// ————————————————————————————————
export const SILO_CLUBS: SiloPage[] = [
  {
    slug: "maillot-psg",
    title: "Maillot PSG — Paris Saint-Germain",
    metaTitle: "Acheter Maillot PSG Pas Cher | Domicile, Extérieur, Third | KIT FOOTBALL",
    metaDescription: "Découvrez tous les maillots du Paris Saint-Germain : domicile, extérieur, third, rétro. Version fan et player. Flocage officiel et livraison rapide.",
    heroText: "Portez les couleurs du club de la capitale avec la collection complète des maillots du PSG.",
    seoLongText: "Le Paris Saint-Germain est l'un des clubs les plus populaires au monde. Chez KIT FOOTBALL, nous proposons l'intégralité du catalogue officiel : maillot PSG domicile bleu nuit, extérieur blanc et third exclusif. Chaque maillot est disponible en version Fan (coupe classique) et Player (Dri-FIT ADV). Flocage Marquinhos, Dembélé, Donnarumma avec patchs Ligue 1 et Champions League.",
    faq: [
      { q: "Quelle est la différence entre version Fan et Player ?", a: "Fan = coupe ample, confort quotidien. Player = coupe ajustée, Dri-FIT ADV identique au terrain." },
      { q: "Puis-je ajouter un flocage officiel ?", a: "Oui, flocage Ligue 1 et Champions League avec le joueur de votre choix." },
      { q: "Quelle taille choisir ?", a: "Fan = taille habituelle. Player = une taille au-dessus." }
    ],
    relatedSlugs: ["maillot-real-madrid", "maillot-barca", "maillot-france", "maillot-marseille"],
    silo: "clubs"
  },
  {
    slug: "maillot-real-madrid",
    title: "Maillot Real Madrid",
    metaTitle: "Acheter Maillot Real Madrid Pas Cher | Édition 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Real Madrid officiel au meilleur prix. Domicile blanc, extérieur, third. Flocage Mbappé, Bellingham, Vinicius. Livraison express.",
    heroText: "La Casa Blanca à portée de main. La collection complète des maillots du club le plus titré d'Europe.",
    seoLongText: "Le Real Madrid CF est synonyme d'excellence avec 15 Ligues des Champions. Maillot domicile blanc emblématique, extérieur et third modernes. Version Fan et Player adidas HEAT.RDY. Flocage Mbappé, Bellingham, Vinicius Jr. avec patchs Liga et Champions League.",
    faq: [
      { q: "Le maillot Real Madrid est-il Adidas ?", a: "Oui, Real Madrid est équipé par Adidas depuis 1998." },
      { q: "Flocage Mbappé disponible ?", a: "Oui, Mbappé n°9 sur tous les maillots Real Madrid." }
    ],
    relatedSlugs: ["maillot-psg", "maillot-barca", "maillot-manchester-city", "maillot-version-player"],
    silo: "clubs"
  },
  {
    slug: "maillot-barca",
    title: "Maillot FC Barcelone — Barça",
    metaTitle: "Acheter Maillot Barça Pas Cher | FC Barcelone 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillots du FC Barcelone : blaugrana domicile, extérieur, third. Flocage Lamine Yamal. Prix imbattable et livraison rapide.",
    heroText: "Més que un club. Les légendaires couleurs blaugrana du FC Barcelone.",
    seoLongText: "Le FC Barcelone et ses rayures blaugrana sont un symbole universel du beau jeu. Maillot domicile, extérieur et third Nike. Lamine Yamal, Pedri et Gavi portent les couleurs d'un club qui a vu évoluer Messi, Xavi et Iniesta. Flocage officiel La Liga et Champions League.",
    faq: [
      { q: "Maillot Barça version enfant ?", a: "Oui, tailles enfant (6-14 ans) dans toutes les éditions." },
      { q: "Flocage Lamine Yamal ?", a: "Oui, Lamine Yamal n°19 sur tous les maillots Barça." }
    ],
    relatedSlugs: ["maillot-real-madrid", "maillot-psg", "maillot-enfant", "maillot-retro"],
    silo: "clubs"
  },
  {
    slug: "maillot-manchester-city",
    title: "Maillot Manchester City",
    metaTitle: "Acheter Maillot Manchester City | Puma 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Manchester City Puma officiel. Domicile, extérieur, third. Flocage Haaland, De Bruyne. Livraison France.",
    heroText: "Les Cityzens. La collection complète de maillots Manchester City, dominant de la Premier League.",
    seoLongText: "Manchester City domine le football anglais. Maillots Puma en versions Fan et Player (dryCELL). Flocage Haaland, De Bruyne avec patchs Premier League.",
    faq: [{ q: "Quelle marque pour Manchester City ?", a: "Puma depuis 2019." }],
    relatedSlugs: ["maillot-liverpool", "maillot-arsenal", "maillot-chelsea", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-inter-milan",
    title: "Maillot Inter Milan — Nerazzurri",
    metaTitle: "Acheter Maillot Inter Milan | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Inter Milan Nike. Rayures nerazzurri, version Fan et Player. Flocage Lautaro Martinez, Thuram. Livraison rapide.",
    heroText: "Les rayures nerazzurri légendaires. Champion d'Italie en titre.",
    seoLongText: "L'Inter Milan, FC Internazionale, est l'un des géants du calcio. Maillots Nike aux rayures noires et bleues. Version Fan et Player Dri-FIT ADV. Flocage Lautaro, Barella, Thuram.",
    faq: [{ q: "Version authentique ?", a: "Oui, version Player avec Nike Dri-FIT ADV." }],
    relatedSlugs: ["maillot-ac-milan", "maillot-juventus", "maillot-naples", "maillot-version-player"],
    silo: "clubs"
  },
  // ——— NEW: Couverture compétiteur maximale ———
  {
    slug: "maillot-marseille",
    title: "Maillot Olympique de Marseille — OM",
    metaTitle: "Acheter Maillot OM Pas Cher | Marseille 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Olympique de Marseille. Domicile blanc, extérieur, third, rétro 1993. Flocage joueur dispo. Livraison express.",
    heroText: "Droit au But. Les maillots de l'Olympique de Marseille, seul club français vainqueur de la Ligue des Champions.",
    seoLongText: "L'Olympique de Marseille est le club le plus populaire de France. Le maillot blanc emblématique est porté avec fierté par des millions de supporters. Retrouvez l'intégralité de la collection OM sur KIT FOOTBALL : domicile, extérieur, third et les mythiques éditions rétro (1993 Ligue des Champions, 1991). Flocage officiel disponible.",
    faq: [
      { q: "Le maillot OM 1993 est-il disponible ?", a: "Oui, notre réédition collector du maillot OM 1993 Ligue des Champions est disponible." },
    ],
    relatedSlugs: ["maillot-psg", "maillot-lyon", "maillot-france", "maillot-retro"],
    silo: "clubs"
  },
  {
    slug: "maillot-lyon",
    title: "Maillot Olympique Lyonnais — OL",
    metaTitle: "Acheter Maillot OL | Lyon Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Olympique Lyonnais Adidas. Domicile, extérieur, third. Flocage joueur. Livraison France.",
    heroText: "Les Gones. Découvrez la collection de maillots de l'Olympique Lyonnais.",
    seoLongText: "L'OL, 7 fois champion de France consécutifs, est un pilier du football français. Maillots Adidas en version Fan et Player.",
    faq: [{ q: "L'OL est-il toujours équipé par Adidas ?", a: "Oui, Adidas est l'équipementier officiel de l'OL." }],
    relatedSlugs: ["maillot-marseille", "maillot-psg", "maillot-saint-etienne", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-liverpool",
    title: "Maillot Liverpool FC",
    metaTitle: "Acheter Maillot Liverpool Pas Cher | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Liverpool FC Nike. Rouge iconique, version Fan et Player. Flocage Salah. Livraison express.",
    heroText: "You'll Never Walk Alone. Le maillot rouge d'Anfield, l'un des plus iconiques du football.",
    seoLongText: "Liverpool FC et son maillot rouge sont indissociables de la légende du football anglais. 6 Ligues des Champions, un palmarès immense. Maillots Nike en version Fan et Player Dri-FIT ADV. Flocage Salah, Van Dijk, Mac Allister.",
    faq: [{ q: "Flocage Salah ?", a: "Oui, Salah n°11 disponible sur tous les maillots Liverpool." }],
    relatedSlugs: ["maillot-manchester-city", "maillot-arsenal", "maillot-chelsea", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-arsenal",
    title: "Maillot Arsenal FC",
    metaTitle: "Acheter Maillot Arsenal Pas Cher | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Arsenal Adidas officiel. Rouge et blanc domicile. Flocage Saka, Rice. Livraison rapide.",
    heroText: "The Gunners. Le maillot rouge et blanc d'Arsenal, institution du football londonien.",
    seoLongText: "Arsenal FC, les Gunners, sont l'un des clubs les plus titrés d'Angleterre. Maillots Adidas domicile rouge et blanc, extérieur et third. Version Fan et Player HEAT.RDY. Flocage Saka, Rice, Ødegaard.",
    faq: [{ q: "Arsenal est-il équipé par Adidas ?", a: "Oui, depuis 2019." }],
    relatedSlugs: ["maillot-chelsea", "maillot-tottenham", "maillot-liverpool", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-chelsea",
    title: "Maillot Chelsea FC",
    metaTitle: "Acheter Maillot Chelsea Pas Cher | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Chelsea Nike. Bleu royal domicile. Version Fan et Player. Flocage Palmer. Livraison express.",
    heroText: "The Blues. Le bleu royal de Stamford Bridge, un classique du football anglais.",
    seoLongText: "Chelsea FC, les Blues de Stamford Bridge. Maillots Nike bleu royal domicile, éditions extérieur et third. Version Fan et Player Dri-FIT ADV. Flocage Palmer, Enzo, Mudryk.",
    faq: [{ q: "Maillot third Chelsea ?", a: "Oui, le third est souvent le plus original et le plus recherché." }],
    relatedSlugs: ["maillot-arsenal", "maillot-tottenham", "maillot-manchester-united", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-manchester-united",
    title: "Maillot Manchester United",
    metaTitle: "Acheter Maillot Manchester United Pas Cher | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Manchester United Adidas. Rouge diable domicile, version Fan et Player. Flocage Rashford. Rétro 2008 dispo.",
    heroText: "Red Devils. Le maillot de Manchester United, le club le plus titré d'Angleterre.",
    seoLongText: "Manchester United FC, les Red Devils, Old Trafford. Maillots Adidas domicile rouge, extérieur et third. Éditions rétro 2008 (victoire LdC) très recherchées. Flocage Rashford, Bruno, Hojlund.",
    faq: [{ q: "Maillot rétro 2008 dispo ?", a: "Oui, le maillot rétro 2007/08 avec flocage Ronaldo 7 est un best-seller." }],
    relatedSlugs: ["maillot-liverpool", "maillot-manchester-city", "maillot-arsenal", "maillot-retro"],
    silo: "clubs"
  },
  {
    slug: "maillot-juventus",
    title: "Maillot Juventus FC",
    metaTitle: "Acheter Maillot Juventus Pas Cher | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Juventus Adidas. Bianconeri rayures noires et blanches. Flocage Vlahovic. Livraison France.",
    heroText: "Bianconeri. Les rayures noires et blanches de la Juventus, 36 fois champion d'Italie.",
    seoLongText: "La Juventus FC est le club le plus titré d'Italie. Les rayures bianconere sont iconiques. Maillots Adidas domicile, extérieur et third. Flocage Vlahovic, Chiesa, Locatelli.",
    faq: [{ q: "La Juve est-elle chez Adidas ?", a: "Oui, contrat longue durée avec Adidas." }],
    relatedSlugs: ["maillot-inter-milan", "maillot-ac-milan", "maillot-naples", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-ac-milan",
    title: "Maillot AC Milan",
    metaTitle: "Acheter Maillot AC Milan Pas Cher | Puma 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot AC Milan Puma. Rossoneri rayures rouges et noires. Flocage Leão, Pulisic. Livraison rapide.",
    heroText: "Rossoneri. Les mythiques rayures rouges et noires de l'AC Milan.",
    seoLongText: "L'AC Milan, 7 Ligues des Champions, est un monument du football mondial. Maillots Puma rossoneri domicile, extérieur et third. Flocage Leão, Pulisic, Theo Hernandez.",
    faq: [{ q: "Maillot rétro Milan ?", a: "Oui, éditions rétro 1993 et 2007 disponibles." }],
    relatedSlugs: ["maillot-inter-milan", "maillot-juventus", "maillot-retro", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-naples",
    title: "Maillot Naples — Napoli",
    metaTitle: "Acheter Maillot Naples Pas Cher | SSC Napoli 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot SSC Napoli. Bleu azzurro domicile. Flocage Osimhen, Kvara. Livraison France.",
    heroText: "Gli Azzurri. Le bleu de Naples, champion d'Italie 2023.",
    seoLongText: "Le SSC Napoli et son maillot bleu azzurro sont revenus au sommet du football italien. Champion d'Italie 2023 après 33 ans d'attente. Flocage Osimhen, Kvaratskhelia, Di Lorenzo.",
    faq: [{ q: "Maillot Napoli avec Osimhen ?", a: "Oui, flocage Osimhen n°9 disponible." }],
    relatedSlugs: ["maillot-inter-milan", "maillot-juventus", "maillot-as-roma", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-bayern",
    title: "Maillot Bayern Munich",
    metaTitle: "Acheter Maillot Bayern Munich Pas Cher | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Bayern Munich Adidas. Rouge domicile. Flocage Kane, Musiala. Livraison express.",
    heroText: "Mia san Mia. Le maillot rouge du Bayern Munich, le plus grand club allemand.",
    seoLongText: "Le FC Bayern München domine le football allemand depuis des décennies. Maillots Adidas en rouge domicile iconique. Flocage Kane, Musiala, Sané. Version Fan et Player HEAT.RDY.",
    faq: [{ q: "Flocage Kane ?", a: "Oui, Kane n°9 sur tous les maillots Bayern." }],
    relatedSlugs: ["maillot-dortmund", "maillot-bayer-leverkusen", "maillot-real-madrid", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-dortmund",
    title: "Maillot Borussia Dortmund — BVB",
    metaTitle: "Acheter Maillot Dortmund Pas Cher | Puma BVB 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Borussia Dortmund Puma. Jaune et noir domicile. Mur jaune. Flocage joueur dispo.",
    heroText: "Echte Liebe. Le jaune et noir du Borussia Dortmund et de son mythique Signal Iduna Park.",
    seoLongText: "Le Borussia Dortmund (BVB) et son mur jaune sont un phénomène du football européen. Maillots Puma jaune et noir domicile, éditions extérieur et third.",
    faq: [{ q: "Maillot domicile jaune ?", a: "Oui, le jaune et noir emblématique du BVB." }],
    relatedSlugs: ["maillot-bayern", "maillot-bayer-leverkusen", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-bayer-leverkusen",
    title: "Maillot Bayer Leverkusen",
    metaTitle: "Acheter Maillot Bayer Leverkusen | Champion Bundesliga | KIT FOOTBALL",
    metaDescription: "Maillot Bayer 04 Leverkusen. Champion invaincu 2024. Flocage Wirtz, Xhaka. Livraison rapide.",
    heroText: "Werkself. Le maillot du Bayer Leverkusen, champion invaincu de Bundesliga 2024.",
    seoLongText: "Le Bayer 04 Leverkusen a réalisé l'exploit de devenir champion d'Allemagne invaincu en 2024. Flocage Wirtz, Xhaka, Grimaldo.",
    faq: [{ q: "Leverkusen champion ?", a: "Oui, premier titre en 2024, invaincu en Bundesliga !" }],
    relatedSlugs: ["maillot-bayern", "maillot-dortmund", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-tottenham",
    title: "Maillot Tottenham Hotspur",
    metaTitle: "Acheter Maillot Tottenham Pas Cher | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Tottenham Hotspur Nike. Blanc domicile. Flocage Son. Livraison France.",
    heroText: "Spurs. Le blanc de Tottenham et le nouveau stade de Londres Nord.",
    seoLongText: "Tottenham Hotspur, les Spurs, jouent à domicile en blanc. Maillots Nike en version Fan et Player. Flocage Son, Maddison, Van de Ven.",
    faq: [{ q: "Flocage Son ?", a: "Oui, Son Heung-min n°7 disponible." }],
    relatedSlugs: ["maillot-arsenal", "maillot-chelsea", "maillot-liverpool", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-ajax",
    title: "Maillot Ajax Amsterdam",
    metaTitle: "Acheter Maillot Ajax Amsterdam | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Ajax Amsterdam Adidas. Rouge et blanc domicile. Éditions extérieur, third et rétro. Livraison France.",
    heroText: "Le rouge et blanc de l'Ajax, berceau du football total et formation d'exception.",
    seoLongText: "L'AFC Ajax, club iconique du football néerlandais, est le berceau du Total Football de Cruyff. Maillots Adidas domicile rouge et blanc, extérieur et éditions rétro collectors.",
    faq: [{ q: "Maillot rétro Ajax ?", a: "Oui, plusieurs éditions rétro sont disponibles." }],
    relatedSlugs: ["maillot-psv-eindhoven", "maillot-feyenoord", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-flamengo",
    title: "Maillot Flamengo — CR Flamengo",
    metaTitle: "Acheter Maillot Flamengo Pas Cher | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Flamengo Adidas. Rouge et noir Rubro-Negro. Le plus populaire du Brésil. Livraison rapide.",
    heroText: "Rubro-Negro. Le maillot le plus populaire d'Amérique du Sud avec plus de 40 millions de supporters.",
    seoLongText: "Le CR Flamengo est le club le plus populaire du Brésil et l'un des plus suivis au monde. Maillots Adidas rouge et noir, le design le plus reconnaissable du football brésilien. Flocage disponible.",
    faq: [{ q: "Flamengo est-il populaire ?", a: "Le club le plus suivi du Brésil avec 40+ millions de fans." }],
    relatedSlugs: ["maillot-santos", "maillot-palmeiras", "maillot-boca-juniors", "maillot-bresil"],
    silo: "clubs"
  },
  {
    slug: "maillot-inter-miami",
    title: "Maillot Inter Miami — Messi",
    metaTitle: "Acheter Maillot Inter Miami | Messi MLS | KIT FOOTBALL",
    metaDescription: "Maillot Inter Miami CF avec Messi. Rose domicile. Flocage Messi n°10 dispo. Livraison express.",
    heroText: "Le club de Messi en MLS. Le maillot rose d'Inter Miami, le plus vendu aux États-Unis.",
    seoLongText: "Inter Miami CF est devenu un phénomène mondial depuis l'arrivée de Lionel Messi. Le maillot rose domicile est le plus vendu de l'histoire de la MLS. Flocage Messi n°10, Busquets, Alba.",
    faq: [{ q: "Flocage Messi ?", a: "Oui, Messi n°10 est l'option la plus populaire." }],
    relatedSlugs: ["maillot-barca", "maillot-argentine", "maillot-flamengo", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-al-nassr",
    title: "Maillot Al Nassr — Ronaldo",
    metaTitle: "Acheter Maillot Al Nassr | Ronaldo CR7 | KIT FOOTBALL",
    metaDescription: "Maillot Al Nassr FC. Jaune domicile. Flocage Cristiano Ronaldo CR7. Livraison rapide.",
    heroText: "CR7 en Arabie Saoudite. Le maillot d'Al Nassr avec Cristiano Ronaldo.",
    seoLongText: "Al Nassr FC est devenu mondialement connu avec l'arrivée de Cristiano Ronaldo en 2023. Le maillot jaune domicile avec le flocage CR7 est l'un des plus vendus au monde. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Ronaldo ?", a: "Oui, Ronaldo CR7 n°7 disponible." }],
    relatedSlugs: ["maillot-real-madrid", "maillot-manchester-united", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  // ===== EXPANSION MASSIVE — CLUBS MANQUANTS =====
  {
    slug: "maillot-atletico-madrid",
    title: "Maillot Atlético de Madrid",
    metaTitle: "Acheter Maillot Atletico Madrid Pas Cher | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Atlético Madrid Nike. Rayures rojiblancas. Flocage Griezmann, Álvarez. Livraison rapide France.",
    heroText: "L'esprit colchonero. Les rayures rouge et blanc de l'Atlético de Madrid, portées par Griezmann et Julián Álvarez.",
    seoLongText: "L'Atlético de Madrid de Diego Simeone est l'un des clubs les plus compétitifs d'Europe. Les rayures rojiblancas sont un symbole de combativité et de passion. Avec des stars comme Antoine Griezmann, Julián Álvarez et Rodrigo De Paul, le club madrilène brille en Liga. Le maillot Nike est disponible en version Fan et Player sur KIT FOOTBALL, avec flocage officiel.",
    faq: [{ q: "Flocage Griezmann ?", a: "Oui, flocage Griezmann n°7 disponible sur tous les maillots Atlético." }],
    relatedSlugs: ["maillot-real-madrid", "maillot-barca", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-as-roma",
    title: "Maillot AS Roma — Giallorossi",
    metaTitle: "Acheter Maillot AS Roma Pas Cher | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot AS Roma Adidas. Rouge et jaune giallorossi. Flocage Dybala, Lukaku. Livraison express France.",
    heroText: "La Louve de Rome. Le maillot giallorossi de l'AS Roma, porté par Dybala et Lukaku.",
    seoLongText: "L'AS Roma, fondée en 1927, est l'un des grands clubs italiens. Le maillot rouge et jaune giallorossi est un symbole fort de la capitale italienne. Chez KIT FOOTBALL, retrouvez les maillots officiels Adidas de la Roma avec flocage Dybala, Lukaku ou Pellegrini.",
    faq: [{ q: "Version Player disponible ?", a: "Oui, en technologie Adidas HEAT.RDY." }],
    relatedSlugs: ["maillot-inter-milan", "maillot-ac-milan", "maillot-naples"],
    silo: "clubs"
  },
  {
    slug: "maillot-sporting-portugal",
    title: "Maillot Sporting CP — Leões",
    metaTitle: "Acheter Maillot Sporting Portugal Pas Cher | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Sporting CP Nike. Vert et blanc des Leões. Flocage Gyökeres. Livraison rapide.",
    heroText: "Les Leões de Lisbonne. Le maillot vert et blanc du Sporting CP, porté par Viktor Gyökeres.",
    seoLongText: "Le Sporting CP est l'un des trois grands clubs portugais. Le maillot vert et blanc est iconique du football lusitanien. Viktor Gyökeres, buteur prolifique, porte les couleurs des Leões. KIT FOOTBALL propose le maillot officiel Nike avec flocage.",
    faq: [{ q: "Flocage Gyökeres disponible ?", a: "Oui, flocage Gyökeres disponible sur tous les maillots Sporting." }],
    relatedSlugs: ["maillot-benfica", "maillot-porto", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-lille",
    title: "Maillot LOSC Lille — Les Dogues",
    metaTitle: "Acheter Maillot Lille LOSC Pas Cher | New Balance 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot LOSC Lille New Balance. Rouge et blanc des Dogues. Flocage David, Zhegrova. Livraison express.",
    heroText: "Les Dogues du Nord. Le maillot rouge et blanc du LOSC, champion de France 2021.",
    seoLongText: "Le LOSC Lille, champion de France 2021, est l'un des clubs les plus dynamiques de Ligue 1. Le maillot rouge et blanc New Balance est porté par des talents comme Jonathan David et Edon Zhegrova. Retrouvez tous les maillots LOSC sur KIT FOOTBALL.",
    faq: [{ q: "Le maillot champion 2021 est-il disponible ?", a: "Nous proposons les maillots de la saison en cours et des éditions rétro quand disponibles." }],
    relatedSlugs: ["maillot-psg", "maillot-marseille", "maillot-lyon"],
    silo: "clubs"
  },
  {
    slug: "maillot-boca-juniors",
    title: "Maillot Boca Juniors — La Bombonera",
    metaTitle: "Acheter Maillot Boca Juniors Pas Cher | Adidas | KIT FOOTBALL",
    metaDescription: "Maillot Boca Juniors Adidas. Bleu et or de la Bombonera. Flocage Cavani. Livraison France.",
    heroText: "La passion de la Bombonera. Le maillot bleu et or de Boca Juniors, légende du football argentin.",
    seoLongText: "Boca Juniors est l'un des clubs les plus passionnés au monde. Le maillot bleu et or avec la bande horizontale est un classique absolu. La Bombonera vibre au rythme des exploits de Cavani et ses coéquipiers. Le maillot Adidas est disponible chez KIT FOOTBALL.",
    faq: [{ q: "Le maillot Boca Juniors est-il en stock ?", a: "Oui, maillot domicile et extérieur en stock." }],
    relatedSlugs: ["maillot-flamengo", "maillot-argentine", "maillot-inter-miami"],
    silo: "clubs"
  },
  {
    slug: "maillot-vasco-da-gama",
    title: "Maillot Vasco da Gama",
    metaTitle: "Acheter Maillot Vasco da Gama | Kappa | KIT FOOTBALL",
    metaDescription: "Maillot Vasco da Gama Kappa. Blanc et bande noire diagonale. Flocage Coutinho, Payet. Livraison rapide.",
    heroText: "Le Gigante da Colina. Le maillot blanc à bande diagonale de Vasco da Gama, avec Coutinho et Payet.",
    seoLongText: "Vasco da Gama, le géant de la colline, est l'un des clubs les plus populaires du Brésil. Le maillot blanc avec sa bande diagonale noire est l'un des designs les plus reconnaissables du football brésilien. Avec Coutinho et Payet, Vasco retrouve les sommets.",
    faq: [{ q: "Maillot Payet disponible ?", a: "Oui, flocage Payet disponible." }],
    relatedSlugs: ["maillot-flamengo", "maillot-botafogo", "maillot-fluminense"],
    silo: "clubs"
  },
  {
    slug: "maillot-santos",
    title: "Maillot Santos FC — Le club de Pelé et Neymar",
    metaTitle: "Acheter Maillot Santos FC | Umbro | KIT FOOTBALL",
    metaDescription: "Maillot Santos FC Umbro. Le club de Pelé et Neymar. Blanc iconique. Flocage Neymar. Livraison express.",
    heroText: "Le club de Pelé et Neymar. Le maillot blanc mythique de Santos FC, berceau des plus grands.",
    seoLongText: "Santos FC est le club qui a révélé Pelé et Neymar au monde entier. Le maillot blanc est l'un des plus mythiques du football mondial. Avec le retour de Neymar, le maillot Santos est plus recherché que jamais. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Neymar disponible ?", a: "Oui, flocage Neymar disponible sur tous les maillots Santos." }],
    relatedSlugs: ["maillot-bresil", "maillot-flamengo", "maillot-palmeiras"],
    silo: "clubs"
  },
  {
    slug: "maillot-botafogo",
    title: "Maillot Botafogo FR",
    metaTitle: "Acheter Maillot Botafogo | Reebok | KIT FOOTBALL",
    metaDescription: "Maillot Botafogo FR Reebok. Noir et blanc à rayures verticales. Champion du Brésil. Livraison rapide.",
    heroText: "L'Étoile Solitaire. Botafogo, champion du Brésil, avec son maillot noir et blanc légendaire.",
    seoLongText: "Botafogo FR, l'Étoile Solitaire de Rio, est champion du Brésil en titre. Le maillot noir et blanc à rayures verticales est un symbole du football carioca. Chez KIT FOOTBALL, retrouvez le maillot officiel Reebok.",
    faq: [{ q: "Maillot champion disponible ?", a: "Oui, l'édition championne du Brésil est en stock." }],
    relatedSlugs: ["maillot-flamengo", "maillot-vasco-da-gama", "maillot-fluminense"],
    silo: "clubs"
  },
  {
    slug: "maillot-fluminense",
    title: "Maillot Fluminense FC — Tricolor",
    metaTitle: "Acheter Maillot Fluminense FC | Umbro | KIT FOOTBALL",
    metaDescription: "Maillot Fluminense Umbro. Tricolor grenat, vert et blanc. Flocage Cano, Ganso. Livraison France.",
    heroText: "Le Tricolor carioca. Fluminense FC et son maillot grenat, vert et blanc, champion de la Libertadores 2023.",
    seoLongText: "Fluminense FC, le Tricolor de Rio, est champion de la Copa Libertadores 2023. Le maillot grenat, vert et blanc est l'un des plus beaux du football brésilien. Umbro signe des designs élégants saison après saison. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Libertadores dispo ?", a: "Oui, avec patchs Libertadores." }],
    relatedSlugs: ["maillot-flamengo", "maillot-botafogo", "maillot-bresil"],
    silo: "clubs"
  },
  {
    slug: "maillot-gremio",
    title: "Maillot Grêmio FBPA",
    metaTitle: "Acheter Maillot Grêmio Porto Alegre | Umbro | KIT FOOTBALL",
    metaDescription: "Maillot Grêmio Umbro. Bleu ciel, noir et blanc tricolore. Flocage Suárez. Livraison rapide.",
    heroText: "Le Tricolor Gaúcho. Le maillot bleu, noir et blanc de Grêmio, avec Luis Suárez.",
    seoLongText: "Grêmio Porto Alegre, le Tricolor Gaúcho, est l'un des grands clubs du sud du Brésil. Le maillot bleu ciel, noir et blanc est porté par Luis Suárez. Le design classique signé Umbro est disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Suárez ?", a: "Oui, flocage Suárez disponible." }],
    relatedSlugs: ["maillot-flamengo", "maillot-palmeiras", "maillot-bresil"],
    silo: "clubs"
  },
  {
    slug: "maillot-palmeiras",
    title: "Maillot Palmeiras — Verdão",
    metaTitle: "Acheter Maillot Palmeiras | Puma | KIT FOOTBALL",
    metaDescription: "Maillot Palmeiras Puma. Le vert du Verdão. Flocage Endrick. Livraison express France.",
    heroText: "Le Verdão. Le maillot vert de Palmeiras, club formateur d'Endrick et Raphael Veiga.",
    seoLongText: "Palmeiras, le Verdão, est l'un des clubs les plus titrés du Brésil. Le maillot vert Puma est un classique du football brésilien. Club formateur d'Endrick, transferé au Real Madrid, Palmeiras est un vivier de talents. Maillot disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Endrick disponible ?", a: "Oui, éditions spéciales et flocage Endrick en stock." }],
    relatedSlugs: ["maillot-bresil", "maillot-flamengo", "maillot-corinthians"],
    silo: "clubs"
  },
  {
    slug: "maillot-corinthians",
    title: "Maillot Corinthians — Timão",
    metaTitle: "Acheter Maillot Corinthians | Nike | KIT FOOTBALL",
    metaDescription: "Maillot Corinthians Nike. Blanc et noir du Timão. Le plus populaire du Brésil. Livraison rapide.",
    heroText: "Le Timão, le club le plus populaire du Brésil. Le maillot blanc et noir de Corinthians.",
    seoLongText: "Corinthians, surnommé le Timão, est le club le plus populaire du Brésil avec la plus grande base de fans. Le maillot blanc et noir signé Nike est un incontournable. Retrouvez-le chez KIT FOOTBALL.",
    faq: [{ q: "Maillot domicile Corinthians ?", a: "Oui, maillot blanc domicile Nike en stock." }],
    relatedSlugs: ["maillot-palmeiras", "maillot-santos", "maillot-bresil"],
    silo: "clubs"
  },
  {
    slug: "maillot-crystal-palace",
    title: "Maillot Crystal Palace FC",
    metaTitle: "Acheter Maillot Crystal Palace | Macron 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Crystal Palace Macron. Rouge et bleu de Selhurst Park. Flocage Olise, Eze. Livraison rapide.",
    heroText: "Les Eagles de Selhurst Park. Le rouge et bleu de Crystal Palace, avec Olise et Eze.",
    seoLongText: "Crystal Palace, les Eagles de Selhurst Park, affichent un style de jeu spectaculaire. Le maillot rouge et bleu signé Macron est l'un des plus colorés de Premier League. Olise et Eze font vibrer les fans. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Olise ?", a: "Oui, flocage Olise disponible." }],
    relatedSlugs: ["maillot-arsenal", "maillot-chelsea", "maillot-brighton"],
    silo: "clubs"
  },
  {
    slug: "maillot-leicester",
    title: "Maillot Leicester City FC — The Foxes",
    metaTitle: "Acheter Maillot Leicester City | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Leicester City Adidas. Bleu des Foxes, champions 2016. Flocage Vardy. Livraison express.",
    heroText: "The Foxes. Leicester City, le conte de fées de 2016. Le maillot bleu des champions miraculés.",
    seoLongText: "Leicester City, les Foxes, ont réalisé l'un des plus grands exploits du sport en remportant la Premier League 2016. Le maillot bleu Adidas perpétue cette légende. Jamie Vardy et les Foxes sont de retour en Premier League. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot champion 2016 disponible ?", a: "Nous proposons des éditions rétro quand disponibles." }],
    relatedSlugs: ["maillot-aston-villa", "maillot-nottingham-forest", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-nottingham-forest",
    title: "Maillot Nottingham Forest",
    metaTitle: "Acheter Maillot Nottingham Forest | Macron 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Nottingham Forest Macron. Rouge historique de la City Ground. Double champion d'Europe. Livraison rapide.",
    heroText: "Double champion d'Europe. Le rouge mythique de Nottingham Forest, le club de Brian Clough.",
    seoLongText: "Nottingham Forest, double champion d'Europe sous Brian Clough (1979, 1980), est l'un des clubs les plus historiques d'Angleterre. Le maillot rouge Macron depuis la City Ground est un classique. KIT FOOTBALL le propose avec flocage officiel.",
    faq: [{ q: "Maillot rétro Brian Clough ?", a: "Éditions rétro disponibles ponctuellement." }],
    relatedSlugs: ["maillot-leicester", "maillot-aston-villa", "maillot-liverpool"],
    silo: "clubs"
  },
  {
    slug: "maillot-aston-villa",
    title: "Maillot Aston Villa FC — The Villans",
    metaTitle: "Acheter Maillot Aston Villa | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Aston Villa Adidas. Claret et bleu des Villans. Champions League 2025. Livraison express.",
    heroText: "Les Villans. Aston Villa, de retour en Champions League, avec leur maillot claret et bleu iconique.",
    seoLongText: "Aston Villa, champions d'Europe 1982, font leur grand retour en Champions League. Le maillot claret et bleu Adidas est porté par Ollie Watkins, McGinn et Tielemans. KIT FOOTBALL propose les maillots officiels avec flocage.",
    faq: [{ q: "Patch Champions League dispo ?", a: "Oui, patchs UEFA Champions League disponibles sur les maillots Aston Villa." }],
    relatedSlugs: ["maillot-liverpool", "maillot-arsenal", "maillot-leicester"],
    silo: "clubs"
  },
  {
    slug: "maillot-brighton",
    title: "Maillot Brighton & Hove Albion",
    metaTitle: "Acheter Maillot Brighton | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Brighton Nike. Bleu et blanc des Seagulls. Flocage Mitoma, Pedro. Livraison rapide.",
    heroText: "Les Seagulls. Brighton, le club révélation de Premier League, avec Mitoma et Kaoru Pedro.",
    seoLongText: "Brighton & Hove Albion est devenu une force de la Premier League. Le maillot bleu et blanc Nike des Seagulls est porté par des talents comme Mitoma et Pedro. Le jeu léché de Brighton attire les fans du monde entier. Disponible sur KIT FOOTBALL.",
    faq: [{ q: "Flocage Mitoma ?", a: "Oui, flocage Mitoma disponible." }],
    relatedSlugs: ["maillot-crystal-palace", "maillot-chelsea", "maillot-arsenal"],
    silo: "clubs"
  },
  {
    slug: "maillot-burnley",
    title: "Maillot Burnley FC — The Clarets",
    metaTitle: "Acheter Maillot Burnley FC | Adidas | KIT FOOTBALL",
    metaDescription: "Maillot Burnley Adidas. Claret et bleu ciel des Clarets. Livraison rapide France.",
    heroText: "The Clarets. Le maillot claret et bleu ciel de Burnley FC.",
    seoLongText: "Burnley FC, les Clarets, est un club historique du football anglais. Le maillot claret et bleu ciel Adidas est un classique de Turf Moor. Disponible chez KIT FOOTBALL au meilleur prix.",
    faq: [{ q: "Maillot Burnley en stock ?", a: "Oui, domicile et extérieur disponibles." }],
    relatedSlugs: ["maillot-leicester", "maillot-nottingham-forest", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-braga",
    title: "Maillot SC Braga",
    metaTitle: "Acheter Maillot SC Braga | Macron | KIT FOOTBALL",
    metaDescription: "Maillot SC Braga Macron. Rouge des Arsenalistas. Club montant du Portugal. Livraison rapide.",
    heroText: "Les Arsenalistas. Le rouge de SC Braga, la force montante du football portugais.",
    seoLongText: "SC Braga, surnommé les Arsenalistas, est le quatrième grand club portugais. Le maillot rouge Macron est porté par des talents ambitieux qui défient les trois grands. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Livraison en France ?", a: "Oui, livraison standard et express disponibles." }],
    relatedSlugs: ["maillot-sporting-portugal", "maillot-benfica", "maillot-porto"],
    silo: "clubs"
  },
  {
    slug: "maillot-majorque",
    title: "Maillot RCD Majorque — Mallorca",
    metaTitle: "Acheter Maillot Majorque | Nike | KIT FOOTBALL",
    metaDescription: "Maillot RCD Majorque Nike. Rouge et noir. Club de l'île des Baléares. Livraison rapide.",
    heroText: "Le soleil des Baléares. Le maillot rouge et noir de RCD Majorque.",
    seoLongText: "RCD Majorque, le club de l'île des Baléares, évolue en Liga espagnole. Le maillot rouge et noir Nike représente la passion méditerranéenne pour le football. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Majorque disponible ?", a: "Oui, domicile et extérieur en stock." }],
    relatedSlugs: ["maillot-barca", "maillot-atletico-madrid", "maillot-betis-seville"],
    silo: "clubs"
  },
  {
    slug: "maillot-betis-seville",
    title: "Maillot Real Betis Séville — Los Verdiblancos",
    metaTitle: "Acheter Maillot Betis Séville | Hummel | KIT FOOTBALL",
    metaDescription: "Maillot Real Betis Séville Hummel. Vert et blanc. Flocage Isco, Fekir. Livraison express.",
    heroText: "Los Verdiblancos. Le vert et blanc du Real Betis, avec Isco et Fekir.",
    seoLongText: "Le Real Betis Balompié, los Verdiblancos, est l'un des clubs les plus passionnés d'Espagne. Le maillot vert et blanc Hummel est un design original et très apprécié. Isco et Fekir mènent l'attaque sévillane. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Fekir ?", a: "Oui, flocage Fekir et Isco disponibles." }],
    relatedSlugs: ["maillot-atletico-madrid", "maillot-barca", "maillot-real-madrid"],
    silo: "clubs"
  },
  {
    slug: "maillot-celta-vigo",
    title: "Maillot RC Celta de Vigo",
    metaTitle: "Acheter Maillot Celta Vigo | Adidas | KIT FOOTBALL",
    metaDescription: "Maillot Celta Vigo Adidas. Bleu ciel de Balaídos. Flocage Aspas. Livraison rapide.",
    heroText: "Le bleu ciel de Vigo. Le maillot du Celta, le club d'Iago Aspas.",
    seoLongText: "Le RC Celta de Vigo et son maillot bleu ciel sont indissociables de la Liga espagnole. Iago Aspas, légende vivante du club, porte fièrement les couleurs de Balaídos. Maillot Adidas disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Aspas ?", a: "Oui, flocage Aspas disponible." }],
    relatedSlugs: ["maillot-betis-seville", "maillot-atletico-madrid", "maillot-real-madrid"],
    silo: "clubs"
  },
  {
    slug: "maillot-la-galaxy",
    title: "Maillot LA Galaxy — MLS",
    metaTitle: "Acheter Maillot LA Galaxy | Adidas MLS | KIT FOOTBALL",
    metaDescription: "Maillot LA Galaxy Adidas. Blanc et bleu de Los Angeles. MLS. Flocage Riqui Puig. Livraison rapide.",
    heroText: "The Galaxy. Le maillot blanc et bleu du club le plus glamour de la MLS.",
    seoLongText: "LA Galaxy est le club le plus titré de la MLS et le plus glamour du football américain. Après Beckham et Ibrahimovic, le Galaxy continue d'attirer les stars. Le maillot blanc et bleu Adidas est un must pour les fans de MLS. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot rétro Beckham ?", a: "Éditions rétro disponibles quand en stock." }],
    relatedSlugs: ["maillot-inter-miami", "maillot-lafc", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-lafc",
    title: "Maillot Los Angeles FC — LAFC",
    metaTitle: "Acheter Maillot LAFC | Adidas MLS | KIT FOOTBALL",
    metaDescription: "Maillot LAFC Adidas. Noir et or de Los Angeles. Flocage Lloris. Livraison express.",
    heroText: "Black & Gold. Le maillot noir et or du LAFC, avec Hugo Lloris.",
    seoLongText: "Los Angeles FC, le club noir et or de la MLS, a rapidement conquis une place de choix dans le football américain. Avec Hugo Lloris dans les cages et Bouanga à l'attaque, le LAFC brille. Maillot Adidas dispo chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Lloris ?", a: "Oui, flocage Lloris disponible." }],
    relatedSlugs: ["maillot-la-galaxy", "maillot-inter-miami", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-new-york-city",
    title: "Maillot New York City FC — NYCFC",
    metaTitle: "Acheter Maillot New York City FC | Adidas MLS | KIT FOOTBALL",
    metaDescription: "Maillot NYCFC Adidas. Bleu ciel de Manhattan. MLS. Livraison rapide France.",
    heroText: "NYC. Le maillot bleu ciel de New York City FC, franchise du City Football Group.",
    seoLongText: "New York City FC, franchise MLS du City Football Group, arbore un maillot bleu ciel inspiré de Manchester City. Club basé à New York, le NYCFC porte les couleurs de la ville qui ne dort jamais. Maillot Adidas dispo chez KIT FOOTBALL.",
    faq: [{ q: "Lien avec Manchester City ?", a: "NYCFC fait partie du City Football Group, comme Manchester City." }],
    relatedSlugs: ["maillot-manchester-city", "maillot-inter-miami", "maillot-la-galaxy"],
    silo: "clubs"
  },
  {
    slug: "maillot-tigres",
    title: "Maillot Tigres UANL — Liga MX",
    metaTitle: "Acheter Maillot Tigres UANL | Adidas | KIT FOOTBALL",
    metaDescription: "Maillot Tigres UANL Adidas. Jaune et bleu du Mexique. Flocage Gignac. Livraison rapide.",
    heroText: "Los Tigres. Le maillot jaune et bleu de Tigres UANL, avec André-Pierre Gignac.",
    seoLongText: "Tigres UANL est l'un des clubs les plus puissants de la Liga MX. André-Pierre Gignac est devenu une légende au Mexique. Le maillot jaune et bleu Adidas des Tigres est très recherché en France grâce à la présence de Gignac et Thauvin. Dispo chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Gignac ?", a: "Oui, flocage Gignac disponible sur tous les maillots Tigres." }],
    relatedSlugs: ["maillot-inter-miami", "maillot-la-galaxy", "maillot-flamengo"],
    silo: "clubs"
  },
  {
    slug: "maillot-paris-fc",
    title: "Maillot Paris FC",
    metaTitle: "Acheter Maillot Paris FC | Nike | KIT FOOTBALL",
    metaDescription: "Maillot Paris FC Nike. Bleu et blanc. L'autre club parisien en pleine ascension. Livraison rapide.",
    heroText: "L'autre Paris. Le maillot bleu et blanc du Paris FC, club ambitieux de la capitale.",
    seoLongText: "Le Paris FC est l'autre club professionnel de la capitale française. En pleine ascension avec de nouveaux investisseurs, le club parisien vise la Ligue 1. Le maillot bleu et blanc Nike est disponible chez KIT FOOTBALL.",
    faq: [{ q: "Le Paris FC en Ligue 1 ?", a: "Le Paris FC vise la montée en Ligue 1 et attire de plus en plus d'attention." }],
    relatedSlugs: ["maillot-psg", "maillot-marseille", "maillot-lyon"],
    silo: "clubs"
  },
  {
    slug: "maillot-nantes",
    title: "Maillot FC Nantes — Les Canaris",
    metaTitle: "Acheter Maillot FC Nantes | Macron 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot FC Nantes Macron. Jaune et vert des Canaris. Livraison express France.",
    heroText: "Les Canaris. Le maillot jaune et vert de Nantes, 8 fois champion de France.",
    seoLongText: "Le FC Nantes, les Canaris, est l'un des clubs les plus titrés de France avec 8 championnats. Le maillot jaune et vert Macron est un classique du football français. Retrouvez-le chez KIT FOOTBALL au meilleur prix.",
    faq: [{ q: "Maillot historique Canaris ?", a: "Oui, le jaune iconique de Nantes est toujours en stock." }],
    relatedSlugs: ["maillot-brest", "maillot-toulouse", "maillot-marseille"],
    silo: "clubs"
  },
  {
    slug: "maillot-brest",
    title: "Maillot Stade Brestois 29",
    metaTitle: "Acheter Maillot Brest | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Stade Brestois Nike. Rouge et blanc. Qualifié Champions League 2025. Livraison rapide.",
    heroText: "La surprise bretonne. Le maillot rouge et blanc du Stade Brestois, qualifié en Champions League 2025.",
    seoLongText: "Le Stade Brestois 29 a réalisé l'exploit en se qualifiant pour la Champions League 2024/25. Le maillot rouge et blanc Nike est porté par les héros bretons Del Castillo et Ajorque. Patchs Champions League disponibles chez KIT FOOTBALL.",
    faq: [{ q: "Patch Champions League ?", a: "Oui, patchs UCL disponibles sur les maillots Brest." }],
    relatedSlugs: ["maillot-psg", "maillot-marseille", "maillot-nantes"],
    silo: "clubs"
  },
  {
    slug: "maillot-toulouse",
    title: "Maillot Toulouse FC — Le TFC",
    metaTitle: "Acheter Maillot Toulouse FC (TFC) | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot TFC Toulouse Nike. Violet de la Ville Rose. Livraison express France.",
    heroText: "Le Violet de Toulouse. Le maillot TFC, club de la Ville Rose.",
    seoLongText: "Le Toulouse FC, le TFC, porte les couleurs violettes de la Ville Rose. Le maillot Nike violet est l'un des plus distinctifs de Ligue 1. Retrouvez-le chez KIT FOOTBALL avec flocage officiel.",
    faq: [{ q: "Pourquoi violet ?", a: "Le violet est la couleur historique de Toulouse FC, en référence à la violette de Toulouse." }],
    relatedSlugs: ["maillot-marseille", "maillot-psg", "maillot-nantes"],
    silo: "clubs"
  },
  {
    slug: "maillot-lorient",
    title: "Maillot FC Lorient — Les Merlus",
    metaTitle: "Acheter Maillot Lorient | KIT FOOTBALL",
    metaDescription: "Maillot FC Lorient. Orange des Merlus. Club historique breton. Livraison rapide France.",
    heroText: "Les Merlus. Le maillot orange de Lorient, la fierté du Morbihan.",
    seoLongText: "Le FC Lorient, les Merlus, arbore un maillot orange vif qui le distingue dans le paysage du football français. Club breton au caractère affirmé, Lorient est un formateur reconnu. Maillot disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Lorient en stock ?", a: "Oui, maillot domicile orange disponible." }],
    relatedSlugs: ["maillot-brest", "maillot-nantes", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-venise",
    title: "Maillot Venezia FC — Venise",
    metaTitle: "Acheter Maillot Venise FC | Kappa | KIT FOOTBALL",
    metaDescription: "Maillot Venezia FC Kappa. Les designs les plus stylés du football. Club tendance de Serie A. Livraison rapide.",
    heroText: "Le club le plus stylé du monde. Venezia FC et ses maillots Kappa qui font le buzz chaque saison.",
    seoLongText: "Venezia FC est devenu le club le plus tendance du football mondial grâce à ses maillots Kappa aux designs révolutionnaires. Chaque saison, les maillots de Venise font le buzz et se vendent comme des pièces de mode. Collector ultime. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Pourquoi le maillot de Venise est-il si populaire ?", a: "Venezia FC collabore avec des designers de mode pour créer des maillots qui transcendent le sport, mélangeant art, mode et football." }],
    relatedSlugs: ["maillot-ac-milan", "maillot-inter-milan", "maillot-naples"],
    silo: "clubs"
  },
  {
    slug: "maillot-rb-leipzig",
    title: "Maillot RB Leipzig",
    metaTitle: "Acheter Maillot RB Leipzig | Nike 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot RB Leipzig Nike. Blanc et rouge. Bundesliga. Flocage Nkunku, Openda. Livraison rapide.",
    heroText: "Die Roten Bullen. Le maillot blanc et rouge de RB Leipzig, force émergente de la Bundesliga.",
    seoLongText: "RB Leipzig s'est imposé comme l'un des clubs dominants de la Bundesliga. Le maillot blanc et rouge Nike est porté par des stars comme Openda et Olmo. Ambiance Red Bull et football moderne. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Version Player dispo ?", a: "Oui, en technologie Nike Dri-FIT ADV." }],
    relatedSlugs: ["maillot-bayern", "maillot-dortmund", "maillot-bayer-leverkusen"],
    silo: "clubs"
  },
  {
    slug: "maillot-vissel-kobe",
    title: "Maillot Vissel Kobe",
    metaTitle: "Acheter Maillot Vissel Kobe | KIT FOOTBALL",
    metaDescription: "Maillot Vissel Kobe. Club japonais. Flocage Iniesta. J-League. Livraison France.",
    heroText: "Le club d'Iniesta au Japon. Le maillot rouge de Vissel Kobe, J-League.",
    seoLongText: "Vissel Kobe, club de J-League, est devenu célèbre en Europe grâce à l'arrivée d'Andrés Iniesta. Le maillot rouge de Kobe est recherché par les fans du football japonais. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Iniesta ?", a: "Flocage Iniesta disponible sur les éditions spéciales." }],
    relatedSlugs: ["maillot-japon", "maillot-barca", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-al-hilal",
    title: "Maillot Al Hilal SFC",
    metaTitle: "Acheter Maillot Al Hilal | Puma | KIT FOOTBALL",
    metaDescription: "Maillot Al Hilal Puma. Bleu du club de Neymar. Saudi Pro League. Livraison rapide.",
    heroText: "Le club de Neymar en Arabie. Le maillot bleu d'Al Hilal SFC.",
    seoLongText: "Al Hilal SFC est le club le plus titré d'Arabie Saoudite. Avec l'arrivée de Neymar et Milinkovic-Savic, le club bleu de Riyad attire l'attention mondiale. Le maillot Puma est disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Neymar ?", a: "Oui, flocage Neymar disponible." }],
    relatedSlugs: ["maillot-al-nassr", "maillot-bresil", "maillot-psg"],
    silo: "clubs"
  },
  {
    slug: "maillot-benfica",
    title: "Maillot SL Benfica — Águias",
    metaTitle: "Acheter Maillot Benfica | Adidas 2024/25 | KIT FOOTBALL",
    metaDescription: "Maillot Benfica Adidas. Rouge des Águias. Flocage Di María. Livraison express.",
    heroText: "Les Águias. Le rouge mythique de Benfica, le club le plus titré du Portugal.",
    seoLongText: "Le SL Benfica, les Aigles de Lisbonne, est le club le plus titré du Portugal. Le maillot rouge Adidas est un classique du football européen. Avec Di María et Neres, Benfica continue de briller. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Di María ?", a: "Oui, flocage Di María disponible." }],
    relatedSlugs: ["maillot-sporting-portugal", "maillot-porto", "maillot-braga"],
    silo: "clubs"
  },
  {
    slug: "maillot-porto",
    title: "Maillot FC Porto — Dragões",
    metaTitle: "Acheter Maillot FC Porto | New Balance | KIT FOOTBALL",
    metaDescription: "Maillot FC Porto New Balance. Bleu et blanc des Dragões. Livraison rapide France.",
    heroText: "Os Dragões. Le bleu et blanc de Porto, double champion d'Europe.",
    seoLongText: "Le FC Porto, les Dragões, est un géant du football européen avec 2 Ligues des Champions. Le maillot bleu et blanc New Balance est un incontournable du football portugais. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Porto en Champions League ?", a: "Porto est un habitué de la Champions League et nous proposons les maillots avec patchs UCL." }],
    relatedSlugs: ["maillot-benfica", "maillot-sporting-portugal", "maillot-braga"],
    silo: "clubs"
  },
  {
    slug: "maillot-galatasaray",
    title: "Maillot Galatasaray SK — Cim Bom",
    metaTitle: "Acheter Maillot Galatasaray | Nike | KIT FOOTBALL",
    metaDescription: "Maillot Galatasaray Nike. Orange et rouge du Cim Bom. Flocage Icardi, Ziyech. Livraison rapide.",
    heroText: "Cim Bom Bom ! Le maillot orange et rouge de Galatasaray, le plus grand club de Turquie.",
    seoLongText: "Galatasaray SK est le club le plus titré et passionné de Turquie. Le maillot orange et rouge Nike est porté par Icardi, Ziyech et Mertens. L'ambiance du Türk Telekom Stadyumu est légendaire. Maillot disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Icardi ?", a: "Oui, flocage Icardi et Ziyech disponibles." }],
    relatedSlugs: ["maillot-inter-milan", "maillot-al-nassr", "maillot-foot-pas-cher"],
    silo: "clubs"
  },
  {
    slug: "maillot-sheffield-united",
    title: "Maillot Sheffield United — The Blades",
    metaTitle: "Acheter Maillot Sheffield United | KIT FOOTBALL",
    metaDescription: "Maillot Sheffield United. Rouge et blanc des Blades. Livraison rapide France.",
    heroText: "The Blades. Le rouge et blanc de Sheffield United, club historique du Yorkshire.",
    seoLongText: "Sheffield United, les Blades, est l'un des clubs les plus anciens d'Angleterre. Le maillot rouge et blanc à rayures est un classique du football anglais. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Sheffield dispo ?", a: "Oui, domicile et extérieur en stock." }],
    relatedSlugs: ["maillot-leicester", "maillot-burnley", "maillot-nottingham-forest"],
    silo: "clubs"
  },
];



// ————————————————————————————————
// SILO 2 : SÉLECTIONS NATIONALES
// ————————————————————————————————
export const SILO_SELECTIONS: SiloPage[] = [
  {
    slug: "maillot-france",
    title: "Maillot Équipe de France",
    metaTitle: "Acheter Maillot France Pas Cher | Équipe de France 2024/2026 | KIT FOOTBALL",
    metaDescription: "Le maillot officiel de l'Équipe de France Nike. Bleu domicile, blanc extérieur. Flocage Mbappé, Griezmann. Prêt pour la Coupe du Monde 2026.",
    heroText: "Allez les Bleus ! Soutenez l'Équipe de France avec le maillot officiel Nike. Une pièce incontournable à l'approche de la Coupe du Monde 2026.",
    seoLongText: "L'Équipe de France de football, double championne du monde (1998, 2018), est l'une des sélections les plus talentueuses du globe. Le maillot domicile bleu marine orné du coq doré est un symbole national. Sur KIT FOOTBALL, vous trouverez le maillot France domicile et extérieur, en versions Fan et Player, avec le flocage des stars : Kylian Mbappé, Antoine Griezmann, Aurélien Tchouaméni ou William Saliba. À quelques mois de la Coupe du Monde 2026 aux États-Unis, au Mexique et au Canada, équipez-vous dès maintenant pour vivre l'événement à fond.",
    faq: [
      { q: "Le maillot France est-il différent pour la Coupe du Monde 2026 ?", a: "Nike dévoilera une édition spéciale Coupe du Monde quelques mois avant le tournoi. Nous la proposerons dès sa sortie officielle." },
      { q: "Puis-je avoir le maillot France avec le flocage Mbappé ?", a: "Oui, le flocage Mbappé n°10 est disponible sur tous les maillots de l'Équipe de France." }
    ],
    relatedSlugs: ["maillot-coupe-du-monde-2026", "maillot-argentine", "maillot-bresil", "maillot-psg"],
    silo: "selections"
  },
  {
    slug: "maillot-argentine",
    title: "Maillot Argentine — Albiceleste",
    metaTitle: "Acheter Maillot Argentine | Champions du Monde | KIT FOOTBALL",
    metaDescription: "Maillot Argentine Adidas officiel. Rayures albiceleste, flocage Messi. Le maillot du champion du monde en titre. Livraison rapide.",
    heroText: "L'Albiceleste championne du monde. Arborez les couleurs de Messi et de la sélection argentine avec nos maillots officiels Adidas.",
    seoLongText: "L'Argentine, triple championne du monde (1978, 1986, 2022), fascine le monde entier. Le maillot aux rayures bleu ciel et blanc est l'un des plus reconnaissables du football mondial. Portée par la légende Lionel Messi, la sélection de Lionel Scaloni défendra son titre lors de la Coupe du Monde 2026. Nos maillots Argentine Adidas sont disponibles en version Fan et Player (HEAT.RDY), avec le flocage Messi n°10 ou Álvarez, Di María, Mac Allister.",
    faq: [
      { q: "Proposez-vous le maillot Argentine avec 3 étoiles ?", a: "Oui, tous nos maillots Argentine de la saison en cours portent les 3 étoiles de champion du monde." }
    ],
    relatedSlugs: ["maillot-france", "maillot-bresil", "maillot-coupe-du-monde-2026", "maillot-retro"],
    silo: "selections"
  },
  {
    slug: "maillot-bresil",
    title: "Maillot Brésil — Seleção",
    metaTitle: "Acheter Maillot Brésil | Nike Seleção 2024/2026 | KIT FOOTBALL",
    metaDescription: "Le maillot jaune du Brésil, la Seleção de Neymar et Vinicius. Version Fan et Player Nike. Livraison express France.",
    heroText: "Le jaune le plus célèbre du football. Retrouvez les maillots officiels de la Seleção brésilienne, quintuple championne du monde.",
    seoLongText: "Le Brésil et ses 5 étoiles de champion du monde est la sélection la plus titrée de l'histoire. Le maillot jaune canari est un vêtement iconique qui dépasse le cadre du sport. Équipé par Nike, le maillot Brésil 2024/2026 arbore un design moderne tout en respectant l'héritage de Pelé, Ronaldo et Ronaldinho. Disponible en version Fan et Player avec le flocage Vinicius Jr., Endrick ou Rodrygo.",
    faq: [
      { q: "Le maillot du Brésil est-il jaune comme d'habitude ?", a: "Oui, le maillot domicile du Brésil reste jaune, fidèle à la tradition centenaire de la Seleção." }
    ],
    relatedSlugs: ["maillot-argentine", "maillot-france", "maillot-coupe-du-monde-2026", "maillot-japon"],
    silo: "selections"
  },
  {
    slug: "maillot-japon",
    title: "Maillot Japon — Samurai Blue",
    metaTitle: "Acheter Maillot Japon | Adidas Samurai Blue | KIT FOOTBALL",
    metaDescription: "Maillot Japon Adidas officiel. Le design le plus innovant du football mondial. Version Fan et Player. Livraison France.",
    heroText: "Les Samurai Blue au design révolutionnaire. Le Japon propose systématiquement les maillots les plus créatifs et recherchés du marché.",
    seoLongText: "Le Japon est devenu un acteur majeur du football asiatique et mondial. Mais c'est surtout pour ses designs de maillots que le pays fait parler de lui. Chaque édition Adidas est un événement, mêlant traditions japonaises et innovations graphiques. Le maillot Japon est un collector pour de nombreux passionnés, au-delà même des supporters. Disponible en version Fan et Player HEAT.RDY.",
    faq: [
      { q: "Pourquoi le maillot du Japon est-il si populaire ?", a: "Les designs des maillots japonais sont réputés pour leur créativité unique, mêlant art traditionnel nippon et innovation textile moderne." }
    ],
    relatedSlugs: ["maillot-bresil", "maillot-coupe-du-monde-2026", "maillot-retro"],
    silo: "selections"
  },
  // ===== EXPANSION MASSIVE — SÉLECTIONS MANQUANTES =====
  {
    slug: "maillot-portugal",
    title: "Maillot Portugal — Seleção das Quinas",
    metaTitle: "Acheter Maillot Portugal Pas Cher | Nike 2024/2026 | KIT FOOTBALL",
    metaDescription: "Maillot Portugal Nike. Rouge domicile, vert extérieur. Flocage Ronaldo CR7. Prêt pour la CDM 2026. Livraison rapide.",
    heroText: "A Seleção. Le maillot rouge du Portugal, porté par Cristiano Ronaldo. La nation de football qui a conquis l'Euro 2016.",
    seoLongText: "Le Portugal, champion d'Europe 2016 et vainqueur de la Ligue des Nations, est une puissance du football mondial. Le maillot rouge Nike avec le flocage CR7 est l'un des plus vendus au monde. Avec Ronaldo, Bruno Fernandes et Bernardo Silva, le Portugal vise un grand parcours à la Coupe du Monde 2026. Disponible sur KIT FOOTBALL en version Fan et Player.",
    faq: [
      { q: "Flocage Ronaldo dispo ?", a: "Oui, flocage Ronaldo CR7 n°7 disponible sur tous les maillots Portugal." },
      { q: "Le maillot sera-t-il différent pour la CDM 2026 ?", a: "Nike dévoilera un design spécial CDM quelques mois avant le tournoi." }
    ],
    relatedSlugs: ["maillot-france", "maillot-bresil", "maillot-coupe-du-monde-2026", "maillot-al-nassr"],
    silo: "selections"
  },
  {
    slug: "maillot-maroc",
    title: "Maillot Maroc — Lions de l'Atlas",
    metaTitle: "Acheter Maillot Maroc Pas Cher | Puma 2024/2026 | KIT FOOTBALL",
    metaDescription: "Maillot Maroc Puma. Rouge des Lions de l'Atlas. Flocage Hakimi, En-Nesyri. Héros de la CDM 2022. Livraison rapide.",
    heroText: "Les Lions de l'Atlas. Le maillot rouge du Maroc, demi-finaliste historique de la Coupe du Monde 2022.",
    seoLongText: "Le Maroc a écrit l'histoire en devenant la première nation africaine à atteindre les demi-finales d'une Coupe du Monde en 2022. Le maillot rouge Puma des Lions de l'Atlas est porté par Hakimi, En-Nesyri et Ziyech. L'engouement pour le maillot marocain est énorme en France, où la diaspora marocaine soutient massivement la sélection. Disponible chez KIT FOOTBALL.",
    faq: [
      { q: "Le maillot Maroc est-il très demandé ?", a: "Oui, c'est l'un de nos maillots les plus vendus, notamment depuis la CDM 2022." },
      { q: "Flocage Hakimi disponible ?", a: "Oui, flocage Hakimi n°2 et En-Nesyri disponibles." }
    ],
    relatedSlugs: ["maillot-france", "maillot-algerie", "maillot-coupe-du-monde-2026", "maillot-cote-ivoire"],
    silo: "selections"
  },
  {
    slug: "maillot-italie",
    title: "Maillot Italie — Azzurri",
    metaTitle: "Acheter Maillot Italie Pas Cher | Adidas Azzurri | KIT FOOTBALL",
    metaDescription: "Maillot Italie Adidas. Bleu azur des Azzurri. Champions d'Europe 2021. Flocage Donnarumma, Barella. Livraison express.",
    heroText: "Gli Azzurri. Le bleu mythique de l'Italie, 4 fois championne du monde et star de l'Euro 2021.",
    seoLongText: "L'Italie, 4 fois championne du monde et championne d'Europe 2021, arbore le légendaire maillot bleu azur Adidas. Les Azzurri de Donnarumma, Chiesa et Barella portent l'héritage de Buffon, Del Piero et Pirlo. Le bleu italien est l'un des maillots les plus iconiques du football. Disponible sur KIT FOOTBALL avec flocage officiel.",
    faq: [
      { q: "Maillot champion d'Europe 2021 ?", a: "Nous proposons les éditions commémoratives quand disponibles et les maillots saison en cours." }
    ],
    relatedSlugs: ["maillot-france", "maillot-espagne", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-allemagne",
    title: "Maillot Allemagne — Die Mannschaft",
    metaTitle: "Acheter Maillot Allemagne | Adidas Die Mannschaft | KIT FOOTBALL",
    metaDescription: "Maillot Allemagne Adidas. Blanc domicile. Flocage Musiala, Wirtz. 4x champion du monde. Livraison rapide.",
    heroText: "Die Mannschaft. Le blanc iconique de l'Allemagne, 4 fois championne du monde.",
    seoLongText: "L'Allemagne, 4 fois championne du monde, est équipée par Adidas depuis toujours. Le maillot blanc domicile est un symbole du football mondial. Avec la nouvelle génération Musiala, Wirtz et Havertz, la Mannschaft vise un grand parcours à la CDM 2026. Disponible sur KIT FOOTBALL.",
    faq: [{ q: "Flocage Musiala ?", a: "Oui, flocage Musiala et Wirtz disponibles." }],
    relatedSlugs: ["maillot-france", "maillot-italie", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-angleterre",
    title: "Maillot Angleterre — Three Lions",
    metaTitle: "Acheter Maillot Angleterre | Nike Three Lions | KIT FOOTBALL",
    metaDescription: "Maillot Angleterre Nike. Blanc des Three Lions. Flocage Bellingham, Saka. Livraison express France.",
    heroText: "It's coming home. Le maillot blanc des Three Lions, finalistes de l'Euro 2024.",
    seoLongText: "L'Angleterre, double finaliste de l'Euro (2021, 2024), est l'une des meilleures sélections actuelles. Le maillot blanc Nike des Three Lions est porté par Bellingham, Saka et Foden. La patrie du football vise enfin un titre majeur à la CDM 2026. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Bellingham ?", a: "Oui, flocage Bellingham et Saka disponibles." }],
    relatedSlugs: ["maillot-france", "maillot-allemagne", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-espagne",
    title: "Maillot Espagne — La Roja",
    metaTitle: "Acheter Maillot Espagne | Adidas La Roja | KIT FOOTBALL",
    metaDescription: "Maillot Espagne Adidas. Rouge de La Roja. Champions d'Europe 2024. Flocage Pedri, Lamine Yamal. Livraison rapide.",
    heroText: "La Roja. Le rouge de l'Espagne, championne d'Europe 2024, avec Pedri et Lamine Yamal.",
    seoLongText: "L'Espagne, championne d'Europe 2024 et triple championne du monde/Europe (2008-2012), est le pays du tiki-taka. Le maillot rouge Adidas de La Roja est porté par la nouvelle génération dorée : Pedri, Gavi et le prodige Lamine Yamal. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Lamine Yamal ?", a: "Oui, flocage Lamine Yamal disponible." }],
    relatedSlugs: ["maillot-france", "maillot-italie", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-coree-du-sud",
    title: "Maillot Corée du Sud — Taeguk Warriors",
    metaTitle: "Acheter Maillot Corée du Sud | Nike | KIT FOOTBALL",
    metaDescription: "Maillot Corée du Sud Nike. Rouge des Taeguk Warriors. Flocage Son Heung-min. Livraison rapide.",
    heroText: "Les Taeguk Warriors. Le maillot rouge de la Corée du Sud, emmené par Son Heung-min.",
    seoLongText: "La Corée du Sud, demi-finaliste de la CDM 2002 à domicile, est une puissance asiatique. Le maillot rouge Nike est porté par la superstar Son Heung-min et Lee Kang-in. Les designs coréens sont très recherchés pour leur créativité. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Son Heung-min ?", a: "Oui, flocage Son disponible sur tous les maillots Corée du Sud." }],
    relatedSlugs: ["maillot-japon", "maillot-coupe-du-monde-2026", "maillot-foot-pas-cher"],
    silo: "selections"
  },
  {
    slug: "maillot-cote-ivoire",
    title: "Maillot Côte d'Ivoire — Les Éléphants",
    metaTitle: "Acheter Maillot Côte d'Ivoire | Puma | KIT FOOTBALL",
    metaDescription: "Maillot Côte d'Ivoire Puma. Orange des Éléphants. Champions d'Afrique 2024. Flocage Haller. Livraison rapide.",
    heroText: "Les Éléphants. Le orange de la Côte d'Ivoire, champions d'Afrique 2024.",
    seoLongText: "La Côte d'Ivoire, championne d'Afrique 2024 à domicile, arbore un maillot orange Puma vibrant. Les Éléphants de Haller et Kessié portent avec fierté les couleurs ivoiriennes. Un maillot très prisé, notamment en France. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot CAN 2024 disponible ?", a: "Oui, l'édition CAN 2024 est en stock." }],
    relatedSlugs: ["maillot-maroc", "maillot-algerie", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-algerie",
    title: "Maillot Algérie — Les Fennecs",
    metaTitle: "Acheter Maillot Algérie | Adidas Les Fennecs | KIT FOOTBALL",
    metaDescription: "Maillot Algérie Adidas. Blanc et vert des Fennecs. Flocage Mahrez. Livraison rapide France.",
    heroText: "Les Fennecs. Le blanc et vert de l'Algérie, champions d'Afrique 2019.",
    seoLongText: "L'Algérie, championne d'Afrique 2019, arbore un maillot blanc et vert Adidas des Fennecs. Avec Mahrez, Bennacer et la diaspora massive en France, le maillot algérien est l'un des plus vendus chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Mahrez ?", a: "Oui, flocage Mahrez disponible." }],
    relatedSlugs: ["maillot-maroc", "maillot-cote-ivoire", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-tunisie",
    title: "Maillot Tunisie — Les Aigles de Carthage",
    metaTitle: "Acheter Maillot Tunisie | Kappa | KIT FOOTBALL",
    metaDescription: "Maillot Tunisie Kappa. Rouge des Aigles de Carthage. Livraison express France.",
    heroText: "Les Aigles de Carthage. Le maillot rouge de la Tunisie, présent à la CDM 2022.",
    seoLongText: "La Tunisie, les Aigles de Carthage, est une sélection régulière des phases finales de Coupe du Monde. Le maillot rouge Kappa est très demandé en France. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot vert Tunisie ?", a: "Oui, maillot extérieur vert disponible également." }],
    relatedSlugs: ["maillot-maroc", "maillot-algerie", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-ecosse",
    title: "Maillot Écosse — Tartan Army",
    metaTitle: "Acheter Maillot Écosse | Adidas | KIT FOOTBALL",
    metaDescription: "Maillot Écosse Adidas. Bleu marine des Tartan Army. Flocage Robertson, McTominay. Livraison rapide.",
    heroText: "Tartan Army. Le bleu marine de l'Écosse, avec Robertson et McTominay.",
    seoLongText: "L'Écosse, la Tartan Army, est de retour sur la scène internationale. Le maillot bleu marine Adidas est porté par Robertson et McTominay. La passion écossaise pour le football est légendaire. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Robertson ?", a: "Oui, flocage Robertson et McTominay disponibles." }],
    relatedSlugs: ["maillot-angleterre", "maillot-france", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-turquie",
    title: "Maillot Turquie — Ay-Yıldızlılar",
    metaTitle: "Acheter Maillot Turquie | Nike | KIT FOOTBALL",
    metaDescription: "Maillot Turquie Nike. Rouge et blanc au croissant. Flocage Calhanoglu, Yildiz. Livraison rapide.",
    heroText: "Le croissant rouge. Le maillot de la Turquie, porté par Calhanoglu et le prodige Yildiz.",
    seoLongText: "La Turquie, demi-finaliste de la CDM 2002 et de l'Euro 2008, est une nation de football passionnée. Le maillot rouge Nike au croissant est porté par Calhanoglu, Yildiz et Güler. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Maillot Turquie en stock ?", a: "Oui, domicile rouge et extérieur blanc en stock." }],
    relatedSlugs: ["maillot-italie", "maillot-allemagne", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-colombie",
    title: "Maillot Colombie — Los Cafeteros",
    metaTitle: "Acheter Maillot Colombie | Adidas | KIT FOOTBALL",
    metaDescription: "Maillot Colombie Adidas. Jaune des Cafeteros. Flocage James, Luis Díaz. Livraison rapide.",
    heroText: "Los Cafeteros. Le jaune vibrant de la Colombie, porté par James et Luis Díaz.",
    seoLongText: "La Colombie, los Cafeteros, arbore l'un des maillots les plus éclatants du football avec son jaune vibrant Adidas. James Rodríguez et Luis Díaz portent les espoirs d'une nation passionnée. Finaliste de la Copa América 2024. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage James ?", a: "Oui, flocage James et Luis Díaz disponibles." }],
    relatedSlugs: ["maillot-bresil", "maillot-argentine", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-mexique",
    title: "Maillot Mexique — El Tri",
    metaTitle: "Acheter Maillot Mexique | Adidas El Tri | KIT FOOTBALL",
    metaDescription: "Maillot Mexique Adidas. Vert d'El Tri. Co-organisateur CDM 2026. Flocage Álvarez. Livraison rapide.",
    heroText: "El Tri. Le vert du Mexique, co-organisateur de la Coupe du Monde 2026.",
    seoLongText: "Le Mexique, El Tri, est co-organisateur de la Coupe du Monde 2026 avec les USA et le Canada. Le maillot vert Adidas est l'un des plus populaires des Amériques. Avec Edson Álvarez et la passion des supporters mexicains, le maillot est un incontournable. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Le Mexique est-il co-organisateur de la CDM 2026 ?", a: "Oui, la CDM 2026 se tiendra aux USA, au Mexique et au Canada." }],
    relatedSlugs: ["maillot-argentine", "maillot-bresil", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-croatie",
    title: "Maillot Croatie — Vatreni",
    metaTitle: "Acheter Maillot Croatie | Nike Vatreni | KIT FOOTBALL",
    metaDescription: "Maillot Croatie Nike. Damier rouge et blanc légendaire. Flocage Modric. Livraison rapide.",
    heroText: "Le damier. Le maillot rouge et blanc de la Croatie, finaliste de la CDM 2018.",
    seoLongText: "La Croatie, finaliste de la CDM 2018 et 3ème en 2022, arbore le legendaire maillot à damier rouge et blanc Nike. Luka Modric, Ballon d'Or 2018, porte les couleurs des Vatreni. Un maillot design iconique du football mondial. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Flocage Modric ?", a: "Oui, flocage Modric n°10 disponible." }],
    relatedSlugs: ["maillot-france", "maillot-argentine", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
  {
    slug: "maillot-canada",
    title: "Maillot Canada — Les Rouges",
    metaTitle: "Acheter Maillot Canada | Nike | KIT FOOTBALL",
    metaDescription: "Maillot Canada Nike. Rouge à la feuille d'érable. Co-organisateur CDM 2026. Livraison rapide.",
    heroText: "L'érable rouge. Le maillot du Canada, co-organisateur de la Coupe du Monde 2026.",
    seoLongText: "Le Canada, co-organisateur de la CDM 2026, est une sélection en pleine ascension. Le maillot rouge Nike avec la feuille d'érable est de plus en plus recherché. Avec Alphonso Davies et Jonathan David, le Canada vise les grands sommets. Disponible chez KIT FOOTBALL.",
    faq: [{ q: "Le Canada sera-t-il à la CDM 2026 ?", a: "Oui, le Canada est co-organisateur et automatiquement qualifié." }],
    relatedSlugs: ["maillot-mexique", "maillot-france", "maillot-coupe-du-monde-2026"],
    silo: "selections"
  },
];

// ————————————————————————————————
// SILO 3 : TYPES DE MAILLOTS
// ————————————————————————————————
export const SILO_TYPES: SiloPage[] = [
  {
    slug: "maillot-domicile",
    title: "Maillots Domicile — Home Kits",
    metaTitle: "Maillots Domicile Foot | Les Home Kits des Plus Grands Clubs | KIT FOOTBALL",
    metaDescription: "Découvrez tous les maillots domicile des plus grands clubs et sélections. Les couleurs emblématiques portées à domicile. Livraison express.",
    heroText: "Les couleurs de la maison. Le maillot domicile est l'identité même d'un club, celui que les joueurs portent devant leur public.",
    seoLongText: "Le maillot domicile (Home Kit) est la pièce maîtresse de l'identité d'un club. C'est celui qui est porté lors des matchs à domicile, dans l'ambiance unique de leur stade. Le bleu du PSG, le blanc du Real Madrid, le blaugrana du Barça : chaque maillot domicile porte en lui l'histoire et l'âme du club. KIT FOOTBALL vous propose tous les maillots domicile des grands clubs européens et des sélections nationales, en version Fan et Player.",
    faq: [
      { q: "Quelle est la différence entre un maillot domicile et extérieur ?", a: "Le maillot domicile arbore les couleurs traditionnelles du club. Le maillot extérieur propose un coloris alternatif utilisé lors des déplacements pour éviter la confusion avec l'adversaire." }
    ],
    relatedSlugs: ["maillot-exterieur", "maillot-third", "maillot-psg", "maillot-real-madrid"],
    silo: "types"
  },
  {
    slug: "maillot-exterieur",
    title: "Maillots Extérieur — Away Kits",
    metaTitle: "Maillots Extérieur Foot | Les Away Kits Tendance | KIT FOOTBALL",
    metaDescription: "Tous les maillots extérieur des grands clubs. Designs audacieux et coloris alternatifs. Version Fan et Player.",
    heroText: "L'audace des couleurs alternatives. Les maillots extérieur repoussent les limites du design et sont souvent les plus recherchés par les collectionneurs.",
    seoLongText: "Le maillot extérieur (Away Kit) offre aux équipementiers une liberté créative totale. C'est souvent le maillot le plus original et le plus surprenant de la saison. Nike, Adidas et Puma rivalisent d'imagination pour créer des pièces qui deviennent parfois cultes. Chez KIT FOOTBALL, retrouvez tous les maillots extérieur de la saison en cours avec la possibilité de flocage officiel.",
    faq: [
      { q: "Les maillots extérieur sont-ils de la même qualité que les domicile ?", a: "Absolument. La qualité, les matériaux et les technologies sont identiques pour les trois éditions (domicile, extérieur, third)." }
    ],
    relatedSlugs: ["maillot-domicile", "maillot-third", "maillot-version-player"],
    silo: "types"
  },
  {
    slug: "maillot-third",
    title: "Maillots Third — 3ème Maillot",
    metaTitle: "Maillots Third Foot | Les 3èmes Maillots les Plus Stylés | KIT FOOTBALL",
    metaDescription: "Les maillots third les plus créatifs de la saison. Éditions limitées, designs exclusifs. Découvrez notre sélection.",
    heroText: "La créativité à son maximum. Le third kit est l'édition la plus libre et souvent la plus collectionnée par les fans de football et de streetwear.",
    seoLongText: "Le maillot third (3ème maillot) est devenu un véritable phénomène de mode. Libre de toute contrainte historique, c'est l'espace où les équipementiers expriment leur créativité la plus audacieuse. Couleurs inédites, motifs originaux, collaborations artistiques : le third kit transcende le sport pour devenir une pièce de mode à part entière. KIT FOOTBALL vous propose les third kits les plus recherchés.",
    faq: [
      { q: "Le maillot third est-il porté en match officiel ?", a: "Oui, le maillot third est un maillot officiel utilisé en compétition lorsque les couleurs domicile et extérieur entrent en conflit avec celles de l'adversaire." }
    ],
    relatedSlugs: ["maillot-domicile", "maillot-exterieur", "maillot-retro"],
    silo: "types"
  },
  {
    slug: "maillot-retro",
    title: "Maillots Rétro & Vintage — Éditions Iconiques",
    metaTitle: "Maillots Rétro Foot | Éditions Vintage Collector | KIT FOOTBALL",
    metaDescription: "Replongez dans l'histoire du football avec nos maillots rétro. Éditions vintage du Brésil 1970, AC Milan 93, France 98. Qualité premium.",
    heroText: "Les légendes ne meurent jamais. Redécouvrez les maillots qui ont marqué l'histoire du football, fidèlement reproduits avec des matériaux modernes.",
    seoLongText: "Les maillots rétro et vintage sont bien plus que de simples répliques : ce sont des pièces d'histoire du football. Du maillot jaune du Brésil de Pelé en 1970 au maillot rayé de l'AC Milan de Van Basten en 1993, en passant par le légendaire maillot France 1998 de Zidane, chaque pièce raconte une épopée. Chez KIT FOOTBALL, nous sélectionnons les meilleures rééditions rétro officielles, fabriquées avec des matériaux modernes pour un confort optimal tout en respectant le design original.",
    faq: [
      { q: "Les maillots rétro sont-ils des originaux d'époque ?", a: "Non, ce sont des rééditions officielles produites par les équipementiers (Adidas Originals, Nike Heritage). Le design est fidèle à l'original, les matériaux sont modernes." }
    ],
    relatedSlugs: ["maillot-psg", "maillot-inter-milan", "maillot-bresil", "maillot-france"],
    silo: "types"
  },
  {
    slug: "maillot-version-player",
    title: "Maillots Version Player — Authentic Pro",
    metaTitle: "Maillot Version Player Authentic | Identique aux Joueurs | KIT FOOTBALL",
    metaDescription: "Le maillot porté sur le terrain par les pros. Coupe ajustée, technologie avancée (Dri-FIT ADV, HEAT.RDY). Version Authentic / Player.",
    heroText: "Portez exactement ce que portent vos joueurs préférés sur la pelouse. La version Player offre une coupe ajustée et des technologies de pointe.",
    seoLongText: "La version Player (ou Authentic) est le maillot le plus haut de gamme proposé par les équipementiers. Contrairement à la version Fan (Replica), le maillot Player est strictement identique à celui porté par les professionnels lors des matchs officiels. Coupe ajustée, tissus ultra-légers, technologies d'évacuation de la transpiration avancées (Nike Dri-FIT ADV, Adidas HEAT.RDY, Puma dryCELL) : c'est le choix des puristes et des athlètes qui veulent la performance maximale.",
    faq: [
      { q: "Dois-je prendre une taille au-dessus en version Player ?", a: "Oui, la version Player a une coupe très ajustée. Nous recommandons de prendre une taille au-dessus de votre taille habituelle pour un port confortable." },
      { q: "La version Player est-elle plus chère que la version Fan ?", a: "Oui, la version Player coûte généralement 30 à 50€ de plus en raison de sa qualité premium et de ses technologies avancées." }
    ],
    relatedSlugs: ["maillot-domicile", "maillot-foot-pas-cher", "maillot-psg", "maillot-real-madrid"],
    silo: "types"
  },
  {
    slug: "maillot-enfant",
    title: "Maillots Enfant — Mini Kit Football",
    metaTitle: "Maillot Foot Enfant Pas Cher | Mini Kit & Junior | KIT FOOTBALL",
    metaDescription: "Maillots de football pour enfant. Mini kits complets (maillot + short + chaussettes). Tous les clubs et sélections. Tailles 6 à 14 ans.",
    heroText: "Les graines de champion. Offrez à vos enfants le maillot de leur héros avec nos mini kits complets pour les 6-14 ans.",
    seoLongText: "Chez KIT FOOTBALL, nous savons que la passion du football commence très tôt. C'est pourquoi nous proposons une large gamme de maillots enfant pour les 6 à 14 ans. Chaque mini kit comprend le maillot, le short et les chaussettes aux couleurs du club ou de la sélection préférée de votre enfant. Tous les grands clubs (PSG, Real Madrid, Barça, Manchester City) et sélections (France, Argentine, Brésil) sont disponibles. Le flocage avec le nom du joueur préféré est proposé pour faire de ce cadeau un souvenir inoubliable.",
    faq: [
      { q: "Le mini kit enfant comprend-il le maillot, le short et les chaussettes ?", a: "Oui, le mini kit est un ensemble complet comprenant le maillot, le short et les chaussettes assortis." },
      { q: "À partir de quel âge sont disponibles les maillots enfant ?", a: "Nos maillots enfant sont disponibles à partir de 6 ans (taille XS enfant) jusqu'à 14 ans (taille XL enfant)." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-psg", "maillot-france", "maillot-domicile"],
    silo: "types"
  }
];

// ————————————————————————————————
// SILO 4 : INTENTIONS D'ACHAT
// ————————————————————————————————
export const SILO_INTENTIONS: SiloPage[] = [
  {
    slug: "maillot-football",
    title: "Maillot de Football — Toute la Boutique",
    metaTitle: "Maillot de Football | N°1 de la Vente en Ligne | KIT FOOTBALL",
    metaDescription: "Achetez votre maillot de football au meilleur prix. Plus de 200 maillots clubs et sélections. Flocage officiel, livraison express, paiement sécurisé.",
    heroText: "La plus grande sélection de maillots de football en France. Clubs européens, sélections nationales, éditions rétro et équipement complet.",
    seoLongText: "KIT FOOTBALL est la référence n°1 pour l'achat de maillots de football en ligne en France. Notre catalogue couvre l'intégralité des grands clubs européens (PSG, Real Madrid, FC Barcelone, Manchester City, Bayern Munich, Inter Milan, Juventus, Liverpool, Arsenal) et les sélections nationales les plus populaires (France, Argentine, Brésil, Allemagne, Japon). Chaque maillot est disponible en version Fan et Player, avec un service de flocage officiel à la commande. Livraison express, paiement 100% sécurisé et retours sous 30 jours garantis.",
    faq: [
      { q: "KIT FOOTBALL est-il un site fiable ?", a: "Oui, KIT FOOTBALL est une boutique spécialisée en maillots de football. Paiement sécurisé, données bancaires traitées en externe, livraison suivie et service client réactif." },
      { q: "En combien de temps reçoit-on sa commande ?", a: "La livraison standard est de 5 à 10 jours ouvrés. La livraison express est disponible en 2 à 4 jours ouvrés." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-psg", "maillot-france", "maillot-coupe-du-monde-2026"],
    silo: "intentions"
  },
  {
    slug: "maillot-foot-pas-cher",
    title: "Maillot de Foot Pas Cher — Les Meilleurs Prix",
    metaTitle: "Maillot de Foot Pas Cher | Meilleur Prix Garanti | KIT FOOTBALL",
    metaDescription: "Trouvez le maillot de foot pas cher que vous cherchez. Prix imbattables sur les maillots des grands clubs et sélections. Qualité premium garantie.",
    heroText: "Des maillots de qualité premium aux prix les plus compétitifs du marché. Pas de compromis entre le prix et l'authenticité.",
    seoLongText: "Chercher un maillot de foot pas cher ne devrait pas signifier sacrifier la qualité. Chez KIT FOOTBALL, nous nous engageons à proposer les meilleurs prix du marché sur tous les maillots de football, qu'il s'agisse de la version Fan accessible ou de la version Player premium. Nos prix sont régulièrement comparés et ajustés pour rester les plus compétitifs. De plus, la livraison est offerte dès 100€ d'achat, ce qui rend l'offre encore plus attractive. Consultez nos catégories pour trouver le maillot de vos rêves au meilleur prix.",
    faq: [
      { q: "Les maillots pas chers de KIT FOOTBALL sont-ils de bonne qualité ?", a: "Absolument. Nos maillots pas chers sont des produits officiels des équipementiers (Nike, Adidas, Puma). Le prix inférieur ne signifie pas une qualité moindre." },
      { q: "Y a-t-il des promotions régulières ?", a: "Oui, nous proposons régulièrement des offres spéciales, des ventes flash et des réductions saisonnières. Inscrivez-vous à notre newsletter pour ne rien manquer." }
    ],
    relatedSlugs: ["maillot-football", "maillot-enfant", "maillot-psg", "maillot-france"],
    silo: "intentions"
  },
  {
    slug: "boite-mystere",
    title: "Boîte Mystère Football — Maillot Aléatoire",
    metaTitle: "Boîte Mystère Football : Recevez un Maillot Aléatoire | KIT FOOTBALL",
    metaDescription: "Commandez votre boîte mystère football et recevez un maillot de foot aléatoire ! Clubs, sélections nationales, 100% surprise et sensations garanties.",
    heroText: "Le cadeau idéal pour les passionnés de foot : la boîte mystère avec un maillot officiel aléatoire.",
    seoLongText: "La boîte mystère KIT FOOTBALL est le concept parfait pour les collectionneurs et les curieux. Sélectionnez votre taille et laissez-nous choisir pour vous ! Vous recevrez un maillot de football (club ou sélection) parmi notre immense catalogue. Sensations fortes garanties à l'ouverture du colis.",
    faq: [
      { q: "Puis-je exclure des équipes ?", a: "Oui, vous pouvez préciser dans les notes de commande les équipes que vous ne souhaitez absolument pas recevoir (ex: rival de votre club de cœur)." },
      { q: "Les maillots sont-ils neufs ?", a: "Absolument, 100% neufs avec étiquettes." }
    ],
    relatedSlugs: ["accessoires", "maillot-foot-pas-cher"],
    silo: "intentions"
  },
  {
    slug: "accessoires",
    title: "Accessoires de Football",
    metaTitle: "Accessoires de Football : Écharpes, Casquettes, Ballons | KIT FOOTBALL",
    metaDescription: "Découvrez notre gamme d'accessoires de football. Écharpes de supporters, casquettes, sacs et bien plus pour compléter votre équipement.",
    heroText: "Complétez votre tenue de supporter avec notre sélection d'accessoires officiels.",
    seoLongText: "Un vrai supporter ne s'arrête pas au maillot ! Retrouvez sur KIT FOOTBALL une large sélection d'accessoires : écharpes de clubs, casquettes, chaussettes, sacs de sport et ballons. Idéal pour offrir ou pour compléter votre collection.",
    faq: [
      { q: "Quels types d'accessoires proposez-vous ?", a: "Nous proposons des écharpes, casquettes, bonnets, chaussettes et autres goodies." }
    ],
    relatedSlugs: ["boite-mystere", "maillot-enfant"],
    silo: "intentions"
  }
];

// ————————————————————————————————
// SILO 5 : COUPE DU MONDE 2026
// ————————————————————————————————
export const SILO_COUPE_DU_MONDE: SiloPage[] = [
  {
    slug: "maillot-coupe-du-monde-2026",
    title: "Maillots Coupe du Monde 2026 — FIFA World Cup™",
    metaTitle: "Maillots Coupe du Monde 2026 | Toutes les Sélections | KIT FOOTBALL",
    metaDescription: "Préparez-vous pour la Coupe du Monde 2026 ! Tous les maillots des sélections participantes. France, Argentine, Brésil. Flocage officiel.",
    heroText: "Le plus grand événement sportif de la planète approche. La Coupe du Monde FIFA 2026™ aux États-Unis, au Mexique et au Canada sera un tournoi historique avec 48 équipes. Équipez-vous dès maintenant.",
    seoLongText: "La Coupe du Monde FIFA 2026™ se tiendra du 11 juin au 19 juillet 2026 aux États-Unis, au Canada et au Mexique. Ce sera la première édition à 48 équipes, promettant un festival de football sans précédent. Chez KIT FOOTBALL, nous vous préparons à cet événement planétaire avec la plus grande sélection de maillots des sélections participantes. De l'Argentine championne en titre à la France vice-championne, en passant par le Brésil, l'Allemagne, l'Angleterre et les surprises attendues, retrouvez chaque maillot officiel dès sa sortie. Le flocage de vos joueurs préférés avec les patchs FIFA World Cup™ officiels est disponible.",
    faq: [
      { q: "Quand la Coupe du Monde 2026 aura-t-elle lieu ?", a: "La Coupe du Monde FIFA 2026 se déroulera du 11 juin au 19 juillet 2026 aux États-Unis, au Canada et au Mexique." },
      { q: "Les maillots Coupe du Monde 2026 sont-ils déjà disponibles ?", a: "Les maillots officiels sont dévoilés quelques mois avant le tournoi. Nous les proposerons dès leur sortie officielle. En attendant, les maillots actuels des sélections sont disponibles." },
      { q: "Combien d'équipes participent à la Coupe du Monde 2026 ?", a: "48 équipes, contre 32 lors des éditions précédentes. C'est le format le plus ambitieux de l'histoire de la compétition." }
    ],
    relatedSlugs: ["maillot-france", "maillot-argentine", "maillot-bresil", "maillot-japon"],
    silo: "coupe-du-monde"
  }
];

// ————————————————————————————————
// ALL SILOS COMBINED
// ————————————————————————————————
// ————————————————————————————————
// SILO : AUTRES SPORTS (BASKETBALL, RUGBY)
// ————————————————————————————————
export const SILO_AUTRES_SPORTS: SiloPage[] = [
  {
    slug: "maillot-basketball",
    title: "Maillots de Basketball NBA & Équipes",
    metaTitle: "Acheter Maillot de Basketball NBA | Pas Cher & Qualité | KIT FOOTBALL",
    metaDescription: "Découvrez notre collection de maillots de basketball. Franchises NBA, sélections nationales. Maillots Lakers, Bulls, Warriors au meilleur prix.",
    heroText: "Le meilleur du basketball s'invite chez KIT FOOTBALL. Retrouvez les maillots iconiques des plus grandes franchises NBA et européennes.",
    seoLongText: "Si KIT FOOTBALL est le spécialiste incontesté du ballon rond, nous proposons également une sélection premium de maillots de basketball. Que vous soyez fan des Los Angeles Lakers de LeBron James, des Golden State Warriors de Stephen Curry ou nostalgique des Chicago Bulls de Michael Jordan, notre catalogue NBA saura vous séduire. Nos maillots de basket, disponibles en éditions Swingman (fan) et Authentic (joueur), bénéficient des mêmes exigences de qualité et de prix bas que nos tenues de foot. Avec des flocages officiels, des coupes respirantes idéales pour les parquets ou la rue, vous trouverez la tenue parfaite pour afficher votre passion pour la balle orange.",
    faq: [
      { q: "Quelles équipes NBA proposez-vous ?", a: "Nous proposons les franchises majeures : Lakers, Bulls, Celtics, Heat, Mavericks, Warriors, et bien d'autres, ainsi que des éditions rétro (Hardwood Classics)." },
      { q: "Quelle est la différence entre Swingman et Authentic ?", a: "La version Swingman est destinée aux supporters avec des détails thermocollés ou cousus simples, tandis que l'Authentic est la copie conforme de ce que portent les joueurs NBA avec des finitions premium et des tissus ultra-techniques." }
    ],
    relatedSlugs: ["maillot-football", "maillot-rugby", "maillot-version-player"],
    silo: "basketball"
  },
  {
    slug: "maillot-rugby",
    title: "Maillots de Rugby - Top 14 & Sélections",
    metaTitle: "Acheter Maillot de Rugby | Top 14, XV de France, All Blacks | KIT FOOTBALL",
    metaDescription: "Achetez votre maillot de rugby au meilleur prix. Maillots du XV de France, All Blacks, Stade Toulousain, Stade Rochelais. Flocage disponible.",
    heroText: "Entrez dans la mêlée avec notre sélection de maillots de rugby. Les plus grandes nations et les meilleurs clubs du Top 14 vous attendent.",
    seoLongText: "Le rugby est un sport de passion et de combat, et le maillot en est le symbole ultime. Sur KIT FOOTBALL, découvrez notre gamme dédiée au ballon ovale. Retrouvez les maillots officiels des grandes nations du rugby comme le XV de France, les mythiques All Blacks de Nouvelle-Zélande, l'Irlande ou l'Afrique du Sud. Les amateurs de championnat ne sont pas en reste avec les tuniques des cadors du Top 14 (Stade Toulousain, Stade Rochelais, RCT). Conçus pour résister aux tirages et offrir un confort optimal, nos maillots de rugby se déclinent en version supporter (plus ample) et pro (très moulante), toujours avec la garantie du meilleur prix.",
    faq: [
      { q: "Les maillots de rugby taillent-ils comme ceux de foot ?", a: "Les maillots de rugby, surtout les versions Replica, ont tendance à tailler légèrement plus grand pour s'adapter à la carrure des rugbymen. Vérifiez notre guide des tailles." },
      { q: "Peut-on floquer un maillot de rugby ?", a: "Oui, nous proposons le flocage officiel (numéro et nom) pour la plupart de nos maillots de rugby nationaux et de clubs." }
    ],
    relatedSlugs: ["maillot-football", "maillot-basketball", "maillot-france"],
    silo: "rugby"
  }
];

export const ALL_SILO_PAGES: SiloPage[] = [
  ...SILO_CLUBS,
  ...SILO_SELECTIONS,
  ...SILO_TYPES,
  ...SILO_INTENTIONS,
  ...SILO_COUPE_DU_MONDE,
  ...SILO_AUTRES_SPORTS
];
