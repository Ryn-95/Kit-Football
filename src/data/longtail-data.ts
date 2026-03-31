// ============================================================
// MEGA SEO ENGINE — KIT FOOTBALL
// Covers ALL competitor keywords from maxikits.com (21K+ KW)
// Combinatorial: club × type × season × audience × retro
// ============================================================

export interface LongTailPage {
  slug: string;
  club: string;
  type: string;
  season: string;
  audience?: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  introText: string;
  detailText: string;
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
}

// ————————————————————————————————
// ALL CLUBS (50+ — matches competitor coverage)
// ————————————————————————————————
const clubs = [
  // LIGUE 1
  { key: "psg", name: "PSG", full: "Paris Saint-Germain", league: "Ligue 1", stars: "Dembélé, Marquinhos, Donnarumma", equip: "Nike" },
  { key: "marseille", name: "Marseille", full: "Olympique de Marseille", league: "Ligue 1", stars: "Greenwood, Rabiot, Wahi", equip: "Puma" },
  { key: "lyon", name: "Lyon", full: "Olympique Lyonnais", league: "Ligue 1", stars: "Lacazette, Tolisso, Caqueret", equip: "Adidas" },
  { key: "lille", name: "Lille", full: "LOSC Lille", league: "Ligue 1", stars: "David, Cabella, Zhegrova", equip: "New Balance" },
  { key: "monaco", name: "Monaco", full: "AS Monaco", league: "Ligue 1", stars: "Ben Yedder, Golovin, Camara", equip: "Kappa" },
  { key: "lens", name: "Lens", full: "RC Lens", league: "Ligue 1", stars: "Sotoca, Gradit, Frankowski", equip: "Nike" },
  { key: "nantes", name: "Nantes", full: "FC Nantes", league: "Ligue 1", stars: "Simon, Mostafa, Castelletto", equip: "Macron" },
  { key: "saint-etienne", name: "Saint-Étienne", full: "AS Saint-Étienne", league: "Ligue 1", stars: "Wadji, Moueffek, Appiah", equip: "Le Coq Sportif" },
  { key: "strasbourg", name: "Strasbourg", full: "RC Strasbourg", league: "Ligue 1", stars: "Emegha, Diallo, Doué", equip: "Adidas" },
  { key: "toulouse", name: "Toulouse", full: "Toulouse FC", league: "Ligue 1", stars: "Dallinga, King, Aboukhlal", equip: "Nike" },
  { key: "brest", name: "Brest", full: "Stade Brestois 29", league: "Ligue 1", stars: "Del Castillo, Ajorque, Lees-Melou", equip: "Nike" },
  { key: "paris-fc", name: "Paris FC", full: "Paris FC", league: "Ligue 2", stars: "Music, Music, Music", equip: "Nike" },
  // LA LIGA
  { key: "real-madrid", name: "Real Madrid", full: "Real Madrid CF", league: "La Liga", stars: "Mbappé, Bellingham, Vinicius Jr.", equip: "Adidas" },
  { key: "barca", name: "Barça", full: "FC Barcelone", league: "La Liga", stars: "Lamine Yamal, Pedri, Raphinha", equip: "Nike" },
  { key: "atletico-madrid", name: "Atletico Madrid", full: "Atlético de Madrid", league: "La Liga", stars: "Griezmann, Álvarez, De Paul", equip: "Nike" },
  { key: "betis-seville", name: "Betis Séville", full: "Real Betis Balompié", league: "La Liga", stars: "Isco, Fekir, Ruibal", equip: "Hummel" },
  { key: "villarreal", name: "Villarreal", full: "Villarreal CF", league: "La Liga", stars: "Moreno, Baena, Chukwueze", equip: "Joma" },
  { key: "athletic-bilbao", name: "Athletic Bilbao", full: "Athletic Club", league: "La Liga", stars: "Williams, Muniain, Sancet", equip: "Nike" },
  { key: "osasuna", name: "Osasuna", full: "CA Osasuna", league: "La Liga", stars: "Budimir, Aimar, Rubén García", equip: "Adidas" },
  { key: "celta-vigo", name: "Celta Vigo", full: "RC Celta de Vigo", league: "La Liga", stars: "Aspas, Iago, Cervi", equip: "Adidas" },
  { key: "mallorca", name: "Majorque", full: "RCD Mallorca", league: "La Liga", stars: "Muriqi, Dani Rodríguez, Raíllo", equip: "Nike" },
  // PREMIER LEAGUE
  { key: "manchester-city", name: "Manchester City", full: "Manchester City FC", league: "Premier League", stars: "Haaland, De Bruyne, Foden", equip: "Puma" },
  { key: "liverpool", name: "Liverpool", full: "Liverpool FC", league: "Premier League", stars: "Salah, Van Dijk, Mac Allister", equip: "Nike" },
  { key: "arsenal", name: "Arsenal", full: "Arsenal FC", league: "Premier League", stars: "Saka, Rice, Ødegaard", equip: "Adidas" },
  { key: "chelsea", name: "Chelsea", full: "Chelsea FC", league: "Premier League", stars: "Palmer, Enzo, Mudryk", equip: "Nike" },
  { key: "manchester-united", name: "Manchester United", full: "Manchester United FC", league: "Premier League", stars: "Rashford, Bruno, Hojlund", equip: "Adidas" },
  { key: "tottenham", name: "Tottenham", full: "Tottenham Hotspur", league: "Premier League", stars: "Son, Maddison, Van de Ven", equip: "Nike" },
  { key: "aston-villa", name: "Aston Villa", full: "Aston Villa FC", league: "Premier League", stars: "Watkins, McGinn, Tielemans", equip: "Adidas" },
  { key: "crystal-palace", name: "Crystal Palace", full: "Crystal Palace FC", league: "Premier League", stars: "Olise, Eze, Mateta", equip: "Macron" },
  { key: "brighton", name: "Brighton", full: "Brighton & Hove Albion", league: "Premier League", stars: "Mitoma, Pedro, Dunk", equip: "Nike" },
  { key: "wolverhampton", name: "Wolverhampton", full: "Wolverhampton Wanderers", league: "Premier League", stars: "Cunha, Hwang, Neto", equip: "Castore" },
  { key: "leicester", name: "Leicester City", full: "Leicester City FC", league: "Premier League", stars: "Vardy, Daka, Ndidi", equip: "Adidas" },
  { key: "everton", name: "Everton", full: "Everton FC", league: "Premier League", stars: "Calvert-Lewin, Doucouré, Pickford", equip: "Hummel" },
  { key: "fulham", name: "Fulham", full: "Fulham FC", league: "Premier League", stars: "Jiménez, Willian, Reed", equip: "Adidas" },
  { key: "burnley", name: "Burnley", full: "Burnley FC", league: "Championship", stars: "Rodriguez, Brownhill, Barnes", equip: "Adidas" },
  { key: "nottingham-forest", name: "Nottingham Forest", full: "Nottingham Forest FC", league: "Premier League", stars: "Wood, Awoniyi, Gibbs-White", equip: "Macron" },
  // SERIE A
  { key: "inter-milan", name: "Inter Milan", full: "FC Internazionale Milano", league: "Serie A", stars: "Lautaro Martinez, Barella, Thuram", equip: "Nike" },
  { key: "ac-milan", name: "AC Milan", full: "AC Milan", league: "Serie A", stars: "Leão, Pulisic, Theo Hernandez", equip: "Puma" },
  { key: "juventus", name: "Juventus", full: "Juventus FC", league: "Serie A", stars: "Vlahovic, Chiesa, Locatelli", equip: "Adidas" },
  { key: "naples", name: "Naples", full: "SSC Napoli", league: "Serie A", stars: "Osimhen, Kvara, Di Lorenzo", equip: "EA7" },
  { key: "as-roma", name: "AS Roma", full: "AS Roma", league: "Serie A", stars: "Dybala, Lukaku, Pellegrini", equip: "Adidas" },
  { key: "lazio", name: "Lazio", full: "SS Lazio", league: "Serie A", stars: "Immobile, Guendouzi, Felipe Anderson", equip: "Mizuno" },
  { key: "atalanta", name: "Atalanta", full: "Atalanta Bergame", league: "Serie A", stars: "Lookman, De Ketelaere, Koopmeiners", equip: "Joma" },
  { key: "venise", name: "Venise", full: "Venezia FC", league: "Serie A", stars: "Pohjanpalo, Busio, Tessmann", equip: "Kappa" },
  // BUNDESLIGA
  { key: "bayern", name: "Bayern Munich", full: "FC Bayern München", league: "Bundesliga", stars: "Kane, Musiala, Sané", equip: "Adidas" },
  { key: "dortmund", name: "Dortmund", full: "Borussia Dortmund", league: "Bundesliga", stars: "Adeyemi, Sabitzer, Brandt", equip: "Puma" },
  { key: "bayer-leverkusen", name: "Bayer Leverkusen", full: "Bayer 04 Leverkusen", league: "Bundesliga", stars: "Wirtz, Xhaka, Grimaldo", equip: "Castore" },
  { key: "rb-leipzig", name: "RB Leipzig", full: "RB Leipzig", league: "Bundesliga", stars: "Nkunku, Olmo, Openda", equip: "Nike" },
  // PORTUGAL
  { key: "sporting-portugal", name: "Sporting Portugal", full: "Sporting CP", league: "Liga Portugal", stars: "Gyökeres, Pote, Gonçalves", equip: "Nike" },
  { key: "benfica", name: "Benfica", full: "SL Benfica", league: "Liga Portugal", stars: "Di María, Neres, Otamendi", equip: "Adidas" },
  { key: "porto", name: "Porto", full: "FC Porto", league: "Liga Portugal", stars: "Taremi, Conceição, Pepê", equip: "New Balance" },
  { key: "braga", name: "Braga", full: "SC Braga", league: "Liga Portugal", stars: "Horta, Banza, Rodrigues", equip: "Macron" },
  // PAYS-BAS
  { key: "ajax", name: "Ajax Amsterdam", full: "AFC Ajax", league: "Eredivisie", stars: "Bergwijn, Taylor, Berghuis", equip: "Adidas" },
  { key: "psv-eindhoven", name: "PSV Eindhoven", full: "PSV Eindhoven", league: "Eredivisie", stars: "De Jong, Til, Veerman", equip: "Puma" },
  { key: "feyenoord", name: "Feyenoord", full: "Feyenoord Rotterdam", league: "Eredivisie", stars: "Giménez, Timber, Stengs", equip: "Castore" },
  // AMÉRIQUE DU SUD
  { key: "flamengo", name: "Flamengo", full: "CR Flamengo", league: "Brasileirão", stars: "Arrascaeta, Pedro, De La Cruz", equip: "Adidas" },
  { key: "santos", name: "Santos", full: "Santos FC", league: "Brasileirão", stars: "Neymar", equip: "Umbro" },
  { key: "palmeiras", name: "Palmeiras", full: "SE Palmeiras", league: "Brasileirão", stars: "Endrick, Raphael Veiga, Rony", equip: "Puma" },
  { key: "corinthians", name: "Corinthians", full: "SC Corinthians", league: "Brasileirão", stars: "Yuri Alberto, Renato Augusto", equip: "Nike" },
  { key: "fluminense", name: "Fluminense", full: "Fluminense FC", league: "Brasileirão", stars: "Cano, Ganso, André", equip: "Umbro" },
  { key: "botafogo", name: "Botafogo", full: "Botafogo FR", league: "Brasileirão", stars: "Tiquinho, Almada, Luiz Henrique", equip: "Reebok" },
  { key: "sao-paulo", name: "São Paulo", full: "São Paulo FC", league: "Brasileirão", stars: "Luciano, Alisson, Calleri", equip: "New Balance" },
  { key: "gremio", name: "Grêmio", full: "Grêmio FBPA", league: "Brasileirão", stars: "Suárez, Villasanti, Cristaldo", equip: "Umbro" },
  { key: "vasco-da-gama", name: "Vasco da Gama", full: "CR Vasco da Gama", league: "Brasileirão", stars: "Vegetti, Payet, Coutinho", equip: "Kappa" },
  { key: "boca-juniors", name: "Boca Juniors", full: "CA Boca Juniors", league: "Liga Argentina", stars: "Cavani, Medina, Rojo", equip: "Adidas" },
  { key: "inter-miami", name: "Inter Miami", full: "Inter Miami CF", league: "MLS", stars: "Messi, Busquets, Alba", equip: "Adidas" },
  // MLS / AUTRES
  { key: "los-angeles-galaxy", name: "LA Galaxy", full: "LA Galaxy", league: "MLS", stars: "Chicharito, Riqui Puig", equip: "Adidas" },
  { key: "los-angeles-fc", name: "LAFC", full: "Los Angeles FC", league: "MLS", stars: "Bouanga, Lloris, Acosta", equip: "Adidas" },
  // TURQUIE
  { key: "galatasaray", name: "Galatasaray", full: "Galatasaray SK", league: "Süper Lig", stars: "Icardi, Ziyech, Mertens", equip: "Nike" },
  { key: "besiktas", name: "Beşiktaş", full: "Beşiktaş JK", league: "Süper Lig", stars: "Gedson, Muci, Salih", equip: "Adidas" },
  // ÉCOSSE
  { key: "celtic-glasgow", name: "Celtic Glasgow", full: "Celtic FC", league: "Scottish Premiership", stars: "Maeda, Hatate, Kyogo", equip: "Adidas" },
  // ARABIE / AFRIQUE
  { key: "al-nassr", name: "Al Nassr", full: "Al Nassr FC", league: "Saudi Pro League", stars: "Ronaldo, Mané, Brozovic", equip: "Nike" },
  { key: "al-hilal", name: "Al Hilal", full: "Al Hilal SFC", league: "Saudi Pro League", stars: "Neymar, Milinkovic-Savic, Malcom", equip: "Puma" },
  { key: "al-ittihad", name: "Al Ittihad", full: "Al Ittihad Club", league: "Saudi Pro League", stars: "Benzema, Kanté, Fabinho", equip: "Adidas" },
  { key: "al-ahly", name: "Al Ahly", full: "Al Ahly SC", league: "Egyptian League", stars: "Percy Tau, Dieng, Affsha", equip: "Adidas" },
  // MEXIQUE
  { key: "club-america", name: "Club América", full: "Club América", league: "Liga MX", stars: "Henry Martín, Fidalgo, Valdés", equip: "Nike" },
  { key: "tigres", name: "Tigres", full: "Tigres UANL", league: "Liga MX", stars: "Gignac, Thauvin, Aquino", equip: "Adidas" },
  { key: "chivas", name: "Chivas", full: "CD Guadalajara", league: "Liga MX", stars: "Vega, Beltrán, Guzman", equip: "Puma" },
  // COLOMBIE
  { key: "atletico-nacional", name: "Atletico Nacional", full: "Atlético Nacional", league: "Liga BetPlay", stars: "Jarlan Barrera, Dorlan Pabón", equip: "Nike" },
];

// ————————————————————————————————
// ALL NATIONAL TEAMS (25+)
// ————————————————————————————————
const selections = [
  { key: "france", name: "France", full: "Équipe de France", stars: "Mbappé, Griezmann, Tchouaméni", equip: "Nike" },
  { key: "argentine", name: "Argentine", full: "Sélection Argentine", stars: "Messi, Álvarez, Di María", equip: "Adidas" },
  { key: "bresil", name: "Brésil", full: "Seleção Brésilienne", stars: "Vinicius Jr., Endrick, Rodrygo", equip: "Nike" },
  { key: "japon", name: "Japon", full: "Samurai Blue", stars: "Mitoma, Kubo, Kamada", equip: "Adidas" },
  { key: "allemagne", name: "Allemagne", full: "Die Mannschaft", stars: "Musiala, Wirtz, Havertz", equip: "Adidas" },
  { key: "angleterre", name: "Angleterre", full: "Three Lions", stars: "Bellingham, Saka, Foden", equip: "Nike" },
  { key: "portugal", name: "Portugal", full: "Seleção Portuguesa", stars: "Ronaldo, Bruno, Bernardo Silva", equip: "Nike" },
  { key: "espagne", name: "Espagne", full: "La Roja", stars: "Pedri, Gavi, Lamine Yamal", equip: "Adidas" },
  { key: "italie", name: "Italie", full: "Azzurri", stars: "Donnarumma, Chiesa, Barella", equip: "Adidas" },
  { key: "mexique", name: "Mexique", full: "El Tri", stars: "Edson Álvarez, Lozano, Jiménez", equip: "Adidas" },
  { key: "colombie", name: "Colombie", full: "Los Cafeteros", stars: "James, Luis Díaz, Arias", equip: "Adidas" },
  { key: "pays-bas", name: "Pays-Bas", full: "Oranje", stars: "Van Dijk, Depay, Gakpo", equip: "Nike" },
  { key: "coree-du-sud", name: "Corée du Sud", full: "Taeguk Warriors", stars: "Son, Lee Kang-in, Kim Min-jae", equip: "Nike" },
  { key: "maroc", name: "Maroc", full: "Lions de l'Atlas", stars: "Hakimi, En-Nesyri, Ziyech", equip: "Puma" },
  { key: "algerie", name: "Algérie", full: "Les Fennecs", stars: "Mahrez, Bennacer, Atal", equip: "Adidas" },
  { key: "cote-divoire", name: "Côte d'Ivoire", full: "Les Éléphants", stars: "Haller, Kessié, Pépé", equip: "Puma" },
  { key: "turquie", name: "Turquie", full: "Ay-Yıldızlılar", stars: "Calhanoglu, Yildiz, Güler", equip: "Nike" },
  { key: "croatie", name: "Croatie", full: "Vatreni", stars: "Modric, Kovacic, Gvardiol", equip: "Nike" },
  { key: "ecosse", name: "Écosse", full: "Tartan Army", stars: "Robertson, McTominay, McGinn", equip: "Adidas" },
  { key: "norvege", name: "Norvège", full: "Norway", stars: "Haaland, Ødegaard, Sørloth", equip: "Nike" },
  { key: "nigeria", name: "Nigeria", full: "Super Eagles", stars: "Osimhen, Iwobi, Lookman", equip: "Nike" },
  { key: "senegal", name: "Sénégal", full: "Lions de la Teranga", stars: "Mané, Mendy, Kouyaté", equip: "Puma" },
  { key: "qatar", name: "Qatar", full: "Al Annabi", stars: "Akram Afif, Almoez Ali", equip: "Nike" },
  { key: "suede", name: "Suède", full: "Blågult", stars: "Isak, Kulusevski, Forsberg", equip: "Adidas" },
  { key: "jamaique", name: "Jamaïque", full: "Reggae Boyz", stars: "Bailey, Antonio, Blake", equip: "Puma" },
];

const types = [
  { key: "domicile", label: "Domicile" },
  { key: "exterieur", label: "Extérieur" },
  { key: "third", label: "Third" },
];

const seasons = ["2024", "24-25", "2025", "25-26", "2026"];

// ————————————————————————————————
// RETRO JERSEYS (huge traffic — competitor top pages)
// ————————————————————————————————
interface RetroEntry {
  slug: string; club: string; year: string; stars: string; equip: string;
  metaTitle: string; metaDescription: string; h1: string; intro: string; detail: string;
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
}

const retroPages: RetroEntry[] = [
  // FRANCE RETRO
  ...["1982", "1984", "1998", "2006"].map(yr => ({
    slug: `maillot-france-retro-${yr}`,
    club: "France", year: yr, stars: yr === "1998" ? "Zidane, Henry, Thuram" : yr === "2006" ? "Zidane, Ribéry, Vieira" : "Platini, Giresse, Tigana", equip: "Adidas",
    metaTitle: `Maillot France ${yr} Rétro – Édition Collector ⚽ | KIT FOOTBALL`,
    metaDescription: `Revivez la gloire du football français avec le maillot rétro de l'Équipe de France ${yr}. Flocage disponible. Livraison rapide.`,
    h1: `Maillot France Rétro ${yr}`,
    intro: `Replongez dans l'histoire du football français avec ce maillot rétro de l'Équipe de France saison ${yr}. Une pièce de collection incontournable.`,
    detail: `Le maillot France ${yr} est l'un des maillots les plus mythiques de l'histoire du football. ${yr === "1998" ? "Porté par Zidane lors de la victoire en Coupe du Monde à domicile, il symbolise l'âge d'or du football français." : yr === "2006" ? "Porté lors de la finale de Coupe du Monde 2006, ce maillot reste gravé dans la mémoire collective." : `Ce maillot classique des années ${yr} incarne l'élégance du football à la française.`} Chez KIT FOOTBALL, nous proposons cette réédition fidèle au meilleur prix.`,
    faq: [
      { q: `Le maillot France ${yr} est-il une reproduction officielle ?`, a: `C'est une réédition fidèle haut de gamme, reproduisant les détails originaux du maillot ${yr}.` },
      { q: "Puis-je ajouter un flocage ?", a: yr === "1998" ? "Oui, flocage Zidane 10, Henry 12, Thuram 15 disponible." : "Oui, les flocages d'époque sont disponibles." }
    ],
    relatedSlugs: ["maillot-france", "maillot-retro", "maillot-coupe-du-monde-2026"]
  })),
  // MARSEILLE RETRO
  ...["1991", "1993", "1998"].map(yr => ({
    slug: `maillot-marseille-retro-${yr}`,
    club: "Marseille", year: yr, stars: yr === "1993" ? "Papin, Waddle, Boli" : "Deschamps, Barthez, Ravanelli", equip: "Adidas",
    metaTitle: `Maillot OM ${yr} Rétro – Ligue des Champions ⭐ | KIT FOOTBALL`,
    metaDescription: `Le maillot mythique de l'Olympique de Marseille ${yr}. ${yr === "1993" ? "Édition Ligue des Champions." : ""} Réédition collector fidèle. Livraison rapide.`,
    h1: `Maillot Marseille Rétro ${yr}`,
    intro: `Le maillot de l'OM saison ${yr}, une pièce de collection pour les vrais supporters marseillais.${yr === "1993" ? " L'année de la victoire historique en Ligue des Champions." : ""}`,
    detail: `Le maillot de l'Olympique de Marseille ${yr} est un symbole du football français. ${yr === "1993" ? "C'est le maillot de la seule victoire française en Ligue des Champions. Boli, Papin et les héros de Munich 93 ont écrit l'histoire avec cette tunique mythique." : `Le design classique de cette époque incarne la passion marseillaise.`}`,
    faq: [
      { q: `Le maillot OM ${yr} est-il disponible ?`, a: `Oui, notre réédition collector du maillot OM ${yr} est disponible en stock limité.` },
    ],
    relatedSlugs: ["maillot-marseille", "maillot-retro", "maillot-foot-pas-cher"]
  })),
  // PSG RETRO
  ...["1995", "1998", "2006"].map(yr => ({
    slug: `maillot-psg-retro-${yr}`,
    club: "PSG", year: yr, stars: yr === "1995" ? "Weah, Ginola, Rai" : "Ronaldinho, Okocha, Anelka", equip: "Nike",
    metaTitle: `Maillot PSG ${yr} Rétro – Édition Vintage Nike ⚽ | KIT FOOTBALL`,
    metaDescription: `Le maillot rétro du Paris Saint-Germain ${yr}. Design iconique, qualité premium. Flocage d'époque dispo. Livraison express.`,
    h1: `Maillot PSG Rétro ${yr}`,
    intro: `Retrouvez le design mythique du PSG saison ${yr}. ${yr === "1995" ? "L'ère Weah et Ginola, le plus beau PSG de l'histoire." : "Une époque dorée du football parisien."}`,
    detail: `Le maillot du Paris Saint-Germain ${yr} est devenu une icône du streetwear et du football. ${yr === "1995" ? "Porté par George Weah, Ballon d'Or, et David Ginola, ce maillot bleu nuit reste le plus beau de l'histoire du club." : "Ce design vintage est très recherché par les collectionneurs."} KIT FOOTBALL vous propose cette réédition fidèle.`,
    faq: [
      { q: `Quels flocages sont disponibles pour le maillot PSG ${yr} ?`, a: yr === "1995" ? "Flocage Weah 14 et Ginola 11 disponibles." : "Flocages d'époque disponibles sur demande." },
    ],
    relatedSlugs: ["maillot-psg", "maillot-retro", "maillot-foot-pas-cher"]
  })),
  // REAL MADRID RETRO
  ...["1998", "2002", "2006", "2014"].map(yr => ({
    slug: `maillot-real-madrid-retro-${yr}`,
    club: "Real Madrid", year: yr, stars: yr === "2014" ? "Ronaldo, Benzema, Bale" : yr === "2002" ? "Zidane, Ronaldo, Figo" : "Raúl, Roberto Carlos, Hierro", equip: "Adidas",
    metaTitle: `Maillot Real Madrid ${yr} Rétro – Galactiques ⭐ | KIT FOOTBALL`,
    metaDescription: `Maillot vintage Real Madrid ${yr}. L'ère des Galactiques. Flocage Zidane, Ronaldo dispo. Éd. collector. Livraison rapide.`,
    h1: `Maillot Real Madrid Rétro ${yr}`,
    intro: `Revivez la gloria del Real Madrid saison ${yr}. ${yr === "2002" ? "L'ère des Galactiques avec Zidane en 5." : "Un design mythique du club le plus titré d'Europe."}`,
    detail: `Le maillot du Real Madrid ${yr} est un symbole du football mondial. ${yr === "2002" ? "C'est le maillot de la volée de Zidane en finale de Ligue des Champions. Ronaldo, Figo, Roberto Carlos : les Galactiques au sommet." : "Un design classique pour le club le plus titré d'Europe."}`,
    faq: [
      { q: `Le maillot Real Madrid ${yr} est-il en stock ?`, a: "Oui, disponible en stock limité. Flocages d'époque proposés." },
    ],
    relatedSlugs: ["maillot-real-madrid", "maillot-retro", "maillot-foot-pas-cher"]
  })),
  // MANCHESTER UNITED RETRO
  ...["2008"].map(yr => ({
    slug: `maillot-manchester-united-retro-${yr}`,
    club: "Manchester United", year: yr, stars: "Ronaldo, Rooney, Tevez", equip: "Nike",
    metaTitle: `Maillot Manchester United ${yr} Rétro – CR7 & Rooney 🏆 | KIT FOOTBALL`,
    metaDescription: `Le maillot Manchester United ${yr}, saison de la victoire en Ligue des Champions. Flocage Ronaldo 7 disponible. Stock limité.`,
    h1: `Maillot Manchester United Rétro ${yr}`,
    intro: `Le maillot de la victoire en Ligue des Champions 2008. Ronaldo, Rooney, Tevez : un trio d'attaque légendaire.`,
    detail: `Le maillot Manchester United 2007/08 est le maillot de la victoire en Ligue des Champions à Moscou. Ronaldo au sommet de son art avec le Ballon d'Or. Ce maillot Nike rouge iconique avec le sponsor AIG est l'un des plus recherchés au monde.`,
    faq: [
      { q: "Le flocage Ronaldo 7 est-il disponible ?", a: "Oui, le flocage Ronaldo n°7 est notre option la plus populaire pour ce maillot." },
    ],
    relatedSlugs: ["maillot-manchester-united", "maillot-retro", "maillot-foot-pas-cher"]
  })),
  // BRESIL RETRO
  ...["1994", "1998", "2002", "2006"].map(yr => ({
    slug: `maillot-bresil-retro-${yr}`,
    club: "Brésil", year: yr, stars: yr === "2002" ? "Ronaldo, Rivaldo, Ronaldinho" : yr === "1998" ? "Ronaldo, Cafu, Roberto Carlos" : yr === "2006" ? "Ronaldinho, Kaká, Adriano" : "Romário, Bebeto, Cafu", equip: "Nike",
    metaTitle: `Maillot Brésil ${yr} Rétro – Seleção Légendaire ⚽🇧🇷 | KIT FOOTBALL`,
    metaDescription: `Maillot rétro Brésil ${yr}. La Seleção à son apogée. ${yr === "2002" ? "Ronaldo R9, double champion du monde." : ""} Livraison rapide.`,
    h1: `Maillot Brésil Rétro ${yr}`,
    intro: `La Seleção ${yr}, l'une des plus belles équipes de l'histoire du football. Revivez la magie du jeu brésilien.`,
    detail: `Le maillot du Brésil ${yr} est indissociable de l'histoire du football mondial. ${yr === "2002" ? "Ronaldo, crâne rasé et double buts en finale contre l'Allemagne. La rédemption après 1998." : yr === "1998" ? "Ronaldo était le meilleur joueur du monde. Le maillot jaune mythique de la Copa." : "Le joga bonito à son apogée."} KIT FOOTBALL propose cette réédition fidèle au meilleur prix.`,
    faq: [
      { q: `Quel flocage pour le maillot Brésil ${yr} ?`, a: yr === "2002" ? "Ronaldo 9 et Ronaldinho 11 sont les plus demandés." : "Flocages d'époque disponibles : " + (yr === "1998" ? "Ronaldo 9, Roberto Carlos 6" : "Romário 11, Bebeto 7") },
    ],
    relatedSlugs: ["maillot-bresil", "maillot-retro", "maillot-coupe-du-monde-2026"]
  })),
  // ARGENTINE RETRO
  ...["1986", "1994"].map(yr => ({
    slug: `maillot-argentine-retro-${yr}`,
    club: "Argentine", year: yr, stars: yr === "1986" ? "Maradona" : "Batistuta, Redondo, Simeone", equip: "Le Coq Sportif",
    metaTitle: `Maillot Argentine ${yr} Rétro – ${yr === "1986" ? "Maradona" : "Batistuta"} 🇦🇷 | KIT FOOTBALL`,
    metaDescription: `Maillot rétro Argentine ${yr}. ${yr === "1986" ? "Le maillot de la Main de Dieu et du But du Siècle de Maradona." : "L'Argentine de Batistuta."} Édition collector.`,
    h1: `Maillot Argentine Rétro ${yr}`,
    intro: `${yr === "1986" ? "Le maillot iconique de la Coupe du Monde 1986. Maradona, la Main de Dieu, le But du Siècle." : "L'Argentine de Batistuta et Simeone, une époque dorée du football argentin."}`,
    detail: `Le maillot de l'Argentine ${yr} est un monument du football mondial. ${yr === "1986" ? "Porté par Diego Armando Maradona lors de la Coupe du Monde au Mexique, ce maillot rayé bleu ciel et blanc est devenu l'un des objets les plus iconiques du sport." : "Le numéro 9 de Batistuta a marqué une génération entière."}`,
    faq: [
      { q: `Le flocage est-il disponible ?`, a: yr === "1986" ? "Oui, flocage Maradona 10 disponible." : "Oui, flocage Batistuta 9 disponible." },
    ],
    relatedSlugs: ["maillot-argentine", "maillot-retro", "maillot-coupe-du-monde-2026"]
  })),
  // PORTUGAL RETRO
  ...["2004", "2006", "2012", "2016"].map(yr => ({
    slug: `maillot-portugal-retro-${yr}`,
    club: "Portugal", year: yr, stars: yr === "2016" ? "Ronaldo, Pepe, Quaresma" : yr === "2006" ? "Ronaldo, Figo, Deco" : yr === "2004" ? "Figo, Rui Costa, Deco" : "Ronaldo, Nani, Pepe", equip: "Nike",
    metaTitle: `Maillot Portugal ${yr} Rétro – Seleção das Quinas ⚽ | KIT FOOTBALL`,
    metaDescription: `Maillot rétro Portugal ${yr}. ${yr === "2016" ? "Champions d'Europe à domicile !" : yr === "2004" ? "Finaliste de l'Euro 2004." : "Le Portugal de Ronaldo."} Livraison rapide.`,
    h1: `Maillot Portugal Rétro ${yr}`,
    intro: `Le maillot historique du Portugal ${yr}. ${yr === "2016" ? "L'année du sacre européen." : "Une époque dorée du football portugais."}`,
    detail: `Le maillot du Portugal ${yr} est un classique. ${yr === "2016" ? "C'est le maillot de la victoire historique à l'Euro 2016 en France !" : yr === "2004" ? "Le Portugal de Figo et Rui Costa en finale de l'Euro à domicile." : "Le Portugal au sommet du football mondial."} Disponible chez KIT FOOTBALL.`,
    faq: [
      { q: `Flocage pour le maillot Portugal ${yr} ?`, a: yr === "2016" ? "Oui, flocage Ronaldo 7 et Nani 17 disponibles." : "Oui, flocages d'époque disponibles." },
    ],
    relatedSlugs: ["maillot-portugal", "maillot-retro", "maillot-coupe-du-monde-2026"]
  })),
  // ITALIE RETRO
  ...["1982", "1994", "2006"].map(yr => ({
    slug: `maillot-italie-retro-${yr}`,
    club: "Italie", year: yr, stars: yr === "2006" ? "Cannavaro, Pirlo, Buffon" : yr === "1982" ? "Paolo Rossi, Zoff, Tardelli" : "Baggio, Baresi, Maldini", equip: "Adidas",
    metaTitle: `Maillot Italie ${yr} Rétro – Azzurri Légendaires 🇮🇹 | KIT FOOTBALL`,
    metaDescription: `Maillot rétro Italie ${yr}. ${yr === "2006" ? "Le sacre de Berlin, Materazzi et Grosso !" : yr === "1982" ? "La victoire de Paolo Rossi en Espagne." : "L'Italie de Baggio en finale."} Édition collector.`,
    h1: `Maillot Italie Rétro ${yr}`,
    intro: `Le bleu azur de l'Italie ${yr}. ${yr === "2006" ? "Champions du monde à Berlin !" : yr === "1982" ? "L'Italie de Paolo Rossi, triomphante en Espagne." : "Roberto Baggio et la Dream Team italienne."}`,
    detail: `Le maillot de l'Italie ${yr} est un monument du football. ${yr === "2006" ? "Cannavaro, Pirlo, Buffon : la dernière grande Squadra Azzurra championne du monde." : yr === "1982" ? "Paolo Rossi, meilleur buteur et Ballon d'Or, mène l'Italie au 3ème titre mondial." : "L'Italie de Sacchi et Baggio en finale, le maillot du faux-pas légendaire."} Chez KIT FOOTBALL.`,
    faq: [
      { q: `Maillot Italie ${yr} en stock ?`, a: `Oui, réédition collector du maillot Italie ${yr} disponible.` },
    ],
    relatedSlugs: ["maillot-italie", "maillot-retro", "maillot-coupe-du-monde-2026"]
  })),
  // AC MILAN RETRO
  ...["1988", "1994", "2003", "2007"].map(yr => ({
    slug: `maillot-ac-milan-retro-${yr}`,
    club: "AC Milan", year: yr, stars: yr === "1988" ? "Van Basten, Gullit, Rijkaard" : yr === "2003" ? "Shevchenko, Maldini, Pirlo" : yr === "2007" ? "Kaká, Inzaghi, Nesta" : "Baresi, Maldini, Savicevic", equip: yr === "2007" || yr === "2003" ? "Adidas" : "Kappa",
    metaTitle: `Maillot AC Milan ${yr} Rétro – Rossoneri Légendaires 🔴⚫ | KIT FOOTBALL`,
    metaDescription: `Maillot rétro AC Milan ${yr}. ${yr === "2007" ? "Kaká, le maillot de la 7ème Champions League." : yr === "1988" ? "Le trio hollandais légendaire." : "Le Milan au sommet de l'Europe."} Stock limité.`,
    h1: `Maillot AC Milan Rétro ${yr}`,
    intro: `Le maillot rossonero saison ${yr}. ${yr === "2007" ? "Le Milan de Kaká, vainqueur de la Champions League." : yr === "1988" ? "L'ère des tulipes hollandaises à San Siro." : "Un Milan conquérant."}`,
    detail: `Le maillot de l'AC Milan ${yr} est un classique du football européen. ${yr === "1988" ? "Van Basten, Gullit et Rijkaard forment le trio hollandais le plus légendaire de l'histoire. Milan domine l'Europe." : yr === "2007" ? "Kaká, Ballon d'Or, mène le Milan à la revanche contre Liverpool en finale de Champions League." : `Le Milan AC au sommet de l'Europe.`} Chez KIT FOOTBALL.`,
    faq: [
      { q: `Flocages pour le maillot Milan ${yr} ?`, a: yr === "1988" ? "Van Basten 9, Gullit 10, Rijkaard 8 disponibles." : yr === "2007" ? "Kaká 22, Inzaghi 9 disponibles." : "Flocages d'époque sur demande." },
    ],
    relatedSlugs: ["maillot-ac-milan", "maillot-retro", "maillot-inter-milan"]
  })),
  // BARCELONA RETRO
  ...["2006", "2009", "2011", "2015"].map(yr => ({
    slug: `maillot-barca-retro-${yr}`,
    club: "FC Barcelone", year: yr, stars: yr === "2006" ? "Ronaldinho, Eto'o, Deco" : yr === "2009" ? "Messi, Xavi, Iniesta" : yr === "2011" ? "Messi, Xavi, Iniesta" : "Messi, Neymar, Suárez", equip: "Nike",
    metaTitle: `Maillot Barça ${yr} Rétro – Blaugrana Légendaire ⚽ | KIT FOOTBALL`,
    metaDescription: `Maillot rétro FC Barcelone ${yr}. ${yr === "2006" ? "L'ère Ronaldinho, le Ballon d'Or." : yr === "2015" ? "Le trio MSN : Messi, Suárez, Neymar." : "Le tiki-taka de Pep Guardiola."} Édition collector.`,
    h1: `Maillot FC Barcelone Rétro ${yr}`,
    intro: `Le blaugrana mythique saison ${yr}. ${yr === "2006" ? "Ronaldinho au sommet, le meilleur joueur du monde." : yr === "2015" ? "MSN : le trio d'attaque le plus dévastateur de l'histoire." : "Le Barça de Guardiola, le plus beau football jamais joué."}`,
    detail: `Le maillot du FC Barcelone ${yr} est une légende. ${yr === "2006" ? "Ronaldinho, Ballon d'Or, fait danser le Santiago Bernabeu et conquiert le monde." : yr === "2009" ? "Le sextuplé de Guardiola. Messi, Xavi, Iniesta : le tiki-taka parfait." : yr === "2011" ? "La plus belle équipe de l'histoire selon beaucoup. Messi à son apogée." : "Messi, Neymar, Suárez : la MSN marque 122 buts en une saison. Triplé historique."} Chez KIT FOOTBALL.`,
    faq: [
      { q: `Flocage pour le maillot Barça ${yr} ?`, a: yr === "2006" ? "Ronaldinho 10 et Eto'o 9 disponibles." : yr === "2015" ? "Messi 10, Neymar 11, Suárez 9 disponibles." : "Messi 10, Xavi 6, Iniesta 8 disponibles." },
    ],
    relatedSlugs: ["maillot-barca", "maillot-retro", "maillot-real-madrid"]
  })),
  // INTER MILAN RETRO
  ...["2010"].map(yr => ({
    slug: `maillot-inter-milan-retro-${yr}`,
    club: "Inter Milan", year: yr, stars: "Sneijder, Milito, Eto'o", equip: "Nike",
    metaTitle: `Maillot Inter Milan ${yr} Rétro – Le Triplé de Mourinho 🏆 | KIT FOOTBALL`,
    metaDescription: `Maillot rétro Inter Milan ${yr}. Le triplé historique de Mourinho (Serie A, Coupe d'Italie, Champions League). Édition collector.`,
    h1: `Maillot Inter Milan Rétro ${yr}`,
    intro: `Le maillot du triplé historique. L'Inter Milan 2009/10 de José Mourinho, la seule équipe italienne à réaliser le triplé.`,
    detail: `Le maillot de l'Inter Milan 2009/10 de Mourinho est mythique. Sneijder, Milito et Eto'o réalisent le triplé (Serie A, Coupe d'Italie, Champions League). Milito double buteur en finale contre le Bayern à Madrid. Le nerazzurro au sommet de l'Europe. Chez KIT FOOTBALL.`,
    faq: [
      { q: "Flocage Sneijder ?", a: "Oui, Sneijder 10, Milito 22, Eto'o 9 disponibles." },
    ],
    relatedSlugs: ["maillot-inter-milan", "maillot-retro", "maillot-ac-milan"]
  })),
  // JUVENTUS RETRO
  ...["1996", "2003"].map(yr => ({
    slug: `maillot-juventus-retro-${yr}`,
    club: "Juventus", year: yr, stars: yr === "1996" ? "Del Piero, Zidane, Vialli" : "Buffon, Del Piero, Nedved", equip: yr === "1996" ? "Kappa" : "Nike",
    metaTitle: `Maillot Juventus ${yr} Rétro – La Vecchia Signora ⚪⚫ | KIT FOOTBALL`,
    metaDescription: `Maillot rétro Juventus ${yr}. ${yr === "1996" ? "Le duo Del Piero-Zidane, victoire en Champions League." : "Nedved, Ballon d'Or, en finale de CL."} Édition collector.`,
    h1: `Maillot Juventus Rétro ${yr}`,
    intro: `Le bianconero saison ${yr}. ${yr === "1996" ? "La Juventus de Lippi, championne d'Europe avec Del Piero et Zidane." : "Le Juventus de Nedved, Ballon d'Or 2003, en finale de Champions League."}`,
    detail: `Le maillot de la Juventus ${yr} est un incontournable. ${yr === "1996" ? "Del Piero et Zidane conquièrent l'Europe à Rome. Le duo le plus créatif de l'histoire de la Juve." : "Nedved, le plus beau jeu d'Europe, mène la Juve en finale à Manchester."} Chez KIT FOOTBALL.`,
    faq: [
      { q: `Flocages Juve ${yr} ?`, a: yr === "1996" ? "Del Piero 10, Zidane 21 disponibles." : "Nedved 11, Buffon 1 disponibles." },
    ],
    relatedSlugs: ["maillot-juventus", "maillot-retro", "maillot-ac-milan"]
  })),
];

// ————————————————————————————————
// GENERATOR — Club × Type × Season
// ————————————————————————————————
function generateClubPages(): LongTailPage[] {
  const pages: LongTailPage[] = [];
  const topClubs = clubs.slice(0, 20); // Top 20 clubs get full season coverage

  for (const club of topClubs) {
    for (const type of types) {
      for (const season of seasons) {
        const slug = `maillot-${club.key}-${type.key}-${season}`;
        const title = `Maillot ${club.name} ${type.label} ${season}`;
        pages.push({
          slug, club: club.name, type: type.label, season,
          metaTitle: `${title} Pas Cher – Livraison Express ⚽ | KIT FOOTBALL`,
          metaDescription: `Achetez le ${title} au meilleur prix. Version Fan et Player ${club.equip}. Flocage ${club.stars.split(",")[0].trim()} dispo. Stock limité.`,
          h1: title,
          introText: `Découvrez le maillot ${type.label.toLowerCase()} du ${club.full} pour la saison ${season}. Confectionné par ${club.equip}, disponible en version Fan et Player.`,
          detailText: `Le ${title} est l'un des maillots les plus recherchés de la saison. Fabriqué par ${club.equip} avec les dernières technologies textiles. Chez KIT FOOTBALL, nous proposons ce maillot au meilleur prix avec flocage officiel (${club.stars}). Livraison suivie, paiement sécurisé, retours 30 jours.`,
          faq: [
            { q: `Quel est le prix du ${title} ?`, a: `À partir de 89,99€ (Fan) et 119,99€ (Player) sur KIT FOOTBALL.` },
            { q: `Version Player disponible ?`, a: `Oui, coupe ajustée avec technologie ${club.equip === "Nike" ? "Dri-FIT ADV" : club.equip === "Adidas" ? "HEAT.RDY" : "dryCELL"}.` },
            { q: "Livraison rapide ?", a: "Expédition 24-48h. Standard 5-10 jours, express 2-4 jours. Gratuite dès 100€." }
          ],
          relatedSlugs: [`maillot-${club.key}`, `maillot-${type.key}`, "maillot-foot-pas-cher", `maillot-${club.key}-${types.find(t => t.key !== type.key)?.key || "domicile"}-${season}`]
        });
      }
    }
  }

  // Remaining clubs get current season only (domicile + extérieur)
  for (const club of clubs.slice(20)) {
    for (const type of types.slice(0, 2)) {
      const season = "24-25";
      const slug = `maillot-${club.key}-${type.key}-${season}`;
      const title = `Maillot ${club.name} ${type.label} ${season}`;
      pages.push({
        slug, club: club.name, type: type.label, season,
        metaTitle: `${title} Pas Cher – Livraison Express ⚽ | KIT FOOTBALL`,
        metaDescription: `${title} au meilleur prix. ${club.equip}. Flocage ${club.stars.split(",")[0].trim()} dispo. Livraison rapide.`,
        h1: title,
        introText: `Le maillot ${type.label.toLowerCase()} du ${club.full} saison ${season}, par ${club.equip}.`,
        detailText: `Le ${title} du ${club.full} est disponible chez KIT FOOTBALL au meilleur prix du marché. Flocage officiel (${club.stars}) et livraison suivie en France métropolitaine inclus.`,
        faq: [
          { q: `Prix du ${title} ?`, a: `À partir de 89,99€ en version Fan.` },
          { q: "Livraison ?", a: "Expédition 24-48h. Gratuite dès 100€." }
        ],
        relatedSlugs: [`maillot-${type.key}`, "maillot-foot-pas-cher", "maillot-football"]
      });
    }
  }

  return pages;
}

// ————————————————————————————————
// GENERATOR — Selection × Type × Season (CDM focus)
// ————————————————————————————————
function generateSelectionPages(): LongTailPage[] {
  const pages: LongTailPage[] = [];
  for (const sel of selections) {
    for (const type of types.slice(0, 2)) {
      for (const season of ["2024", "2026"]) {
        const slug = `maillot-${sel.key}-${type.key}-${season}`;
        const title = `Maillot ${sel.name} ${type.label} ${season}`;
        pages.push({
          slug, club: sel.name, type: type.label, season,
          metaTitle: `${title} – Prêt Coupe du Monde 2026 ⚽🏆 | KIT FOOTBALL`,
          metaDescription: `${title} officiel ${sel.equip}. Flocage ${sel.stars.split(",")[0].trim()} dispo. Parfait pour la CDM 2026. Stock limité.`,
          h1: title,
          introText: `Soutenez ${sel.full} avec le maillot ${type.label.toLowerCase()} ${sel.equip} saison ${season}. Prêt pour la Coupe du Monde 2026.`,
          detailText: `Le ${title} par ${sel.equip} est une pièce incontournable pour tout supporter. Avec la Coupe du Monde 2026, c'est le moment de s'équiper. Flocage ${sel.stars} et patchs FIFA World Cup™ disponibles chez KIT FOOTBALL.`,
          faq: [
            { q: `Ce maillot sera-t-il porté à la CDM 2026 ?`, a: season === "2026" ? "Oui, c'est l'édition prévue pour la Coupe du Monde FIFA 2026." : `Non, l'édition CDM 2026 sera dispo dès sa sortie.` },
            { q: "Flocage disponible ?", a: `Oui : ${sel.stars}.` },
          ],
          relatedSlugs: [`maillot-${sel.key}`, "maillot-coupe-du-monde-2026", "maillot-version-player", "maillot-foot-pas-cher"]
        });
      }
    }
  }
  return pages;
}

// ————————————————————————————————
// GENERATOR — Enfant pages (easy ranking wins)
// ————————————————————————————————
function generateEnfantPages(): LongTailPage[] {
  const pages: LongTailPage[] = [];
  const topTeams = [...clubs.slice(0, 12), ...selections.slice(0, 8)];

  for (const team of topTeams) {
    const isClub = clubs.includes(team as typeof clubs[0]);
    const slug = `maillot-${team.key}-enfant`;
    pages.push({
      slug, club: team.name, type: "Enfant", season: "2024-2026", audience: "enfant",
      metaTitle: `Maillot ${team.name} Enfant Pas Cher – Mini Kit Complet 🧒 | KIT FOOTBALL`,
      metaDescription: `Maillot ${team.name} enfant (6-14 ans). Mini kit : maillot + short + chaussettes. Flocage ${team.stars.split(",")[0].trim()} dispo. Livraison rapide.`,
      h1: `Maillot ${team.name} Enfant`,
      introText: `Le mini kit ${team.name} pour enfants de 6 à 14 ans. Maillot + short + chaussettes. Parfait comme cadeau.`,
      detailText: `Le maillot ${team.name} enfant est un best-seller. Par ${team.equip}, mêmes standards que la version adulte. Tissu adapté aux enfants, résistant aux lavages. Flocage ${team.stars.split(",")[0].trim()} ou prénom personnalisé disponible.`,
      faq: [
        { q: `À partir de quel âge ?`, a: "Disponible de 6 ans (XS) à 14 ans (XL enfant)." },
        { q: "Kit complet ?", a: "Oui : maillot + short + chaussettes assortis." },
      ],
      relatedSlugs: isClub ? [`maillot-${team.key}`, "maillot-enfant", "maillot-foot-pas-cher"] : [`maillot-${team.key}`, "maillot-enfant", "maillot-coupe-du-monde-2026"]
    });
  }
  return pages;
}

// ————————————————————————————————
// CONVERT RETRO ENTRIES → LongTailPage
// ————————————————————————————————
function convertRetroPages(): LongTailPage[] {
  return retroPages.map(r => ({
    slug: r.slug,
    club: r.club,
    type: "Rétro",
    season: r.year,
    metaTitle: r.metaTitle,
    metaDescription: r.metaDescription,
    h1: r.h1,
    introText: r.intro,
    detailText: r.detail,
    faq: r.faq,
    relatedSlugs: r.relatedSlugs,
  }));
}

// ————————————————————————————————
// ASSEMBLE ALL LONG-TAIL PAGES
// ————————————————————————————————
export const LONG_TAIL_PAGES: LongTailPage[] = [
  ...generateClubPages(),
  ...generateSelectionPages(),
  ...generateEnfantPages(),
  ...convertRetroPages(),
];

// ————————————————————————————————
// MONEY PAGES (high-intent conversion)
// ————————————————————————————————
export interface MoneyPage {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  introText: string;
  sellingPoints: string[];
  faq: { q: string; a: string }[];
  relatedSlugs: string[];
}

export const MONEY_PAGES: MoneyPage[] = [
  {
    slug: "maillot-football-promo",
    metaTitle: "🔥 Promos Maillots de Football – Jusqu'à -40% | KIT FOOTBALL",
    metaDescription: "Promotions maillots de football. Jusqu'à -40% sur PSG, Real Madrid, Barça. Stock limité, livraison express.",
    h1: "Promotions Maillots de Football",
    subtitle: "Jusqu'à -40% sur une sélection de maillots premium",
    introText: "Ne manquez pas nos offres sur les maillots de football des plus grands clubs et sélections. Stocks limités.",
    sellingPoints: ["Jusqu'à -40%", "Qualité premium", "Stocks limités", "Livraison offerte dès 100€"],
    faq: [
      { q: "Les maillots promo sont-ils de bonne qualité ?", a: "Mêmes maillots officiels, simplement à prix réduit." },
      { q: "Durée des promos ?", a: "Limitées en temps et en quantité." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-football", "maillot-psg", "maillot-real-madrid"]
  },
  {
    slug: "maillot-football-homme",
    metaTitle: "Maillot de Football Homme – Tailles S à 3XL | KIT FOOTBALL",
    metaDescription: "Maillot football homme. Tailles S à 3XL, version Fan et Player. 200+ maillots clubs et sélections. Livraison rapide.",
    h1: "Maillots de Football Homme",
    subtitle: "Du S au 3XL – Version Fan & Player",
    introText: "Notre collection homme : toutes tailles du S au 3XL. Coupe Fan ou Player.",
    sellingPoints: ["Tailles S à 3XL", "Version Fan et Player", "Flocage à la commande", "Guide des tailles"],
    faq: [
      { q: "Quelle taille prendre ?", a: "Fan = taille habituelle. Player = une taille au-dessus (coupe ajustée)." },
    ],
    relatedSlugs: ["maillot-football", "maillot-version-player", "maillot-psg", "maillot-foot-pas-cher"]
  },
  {
    slug: "maillot-football-meilleur-prix",
    metaTitle: "Maillot de Football au Meilleur Prix Garanti 💰 | KIT FOOTBALL",
    metaDescription: "KIT FOOTBALL : meilleurs prix garantis sur tous les maillots. Comparaison quotidienne. Livraison gratuite dès 100€.",
    h1: "Maillots de Football – Meilleur Prix Garanti",
    subtitle: "Prix comparés quotidiennement – Imbattable",
    introText: "Les prix les plus compétitifs du marché français, vérifiés et ajustés quotidiennement.",
    sellingPoints: ["Prix le plus bas garanti", "Comparaison quotidienne", "Livraison gratuite dès 100€", "Qualité garantie"],
    faq: [
      { q: "Comment garantissez-vous le meilleur prix ?", a: "Prix comparés quotidiennement avec les sites concurrents." },
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-football-promo", "maillot-football", "maillot-enfant"]
  },
  {
    slug: "maillot-football-2026",
    metaTitle: "Nouveaux Maillots 2026 – Saison & Coupe du Monde ⚽🏆 | KIT FOOTBALL",
    metaDescription: "Tous les nouveaux maillots 2026 : clubs et sélections. Éditions Coupe du Monde FIFA 2026. Flocage officiel. Livraison express.",
    h1: "Maillots de Football 2026 – Nouveautés",
    subtitle: "Saison 2025/26 + Coupe du Monde 2026",
    introText: "2026 : l'année du football. Coupe du Monde USA-Mexique-Canada. Tous les nouveaux maillots dès leur sortie.",
    sellingPoints: ["Nouveautés dès la sortie", "Éditions Coupe du Monde", "Flocage + patchs FIFA", "Pré-commandes ouvertes"],
    faq: [
      { q: "Quand sortent les maillots 2026 ?", a: "Clubs : été 2025. Sélections CDM : début 2026." },
    ],
    relatedSlugs: ["maillot-coupe-du-monde-2026", "maillot-france", "maillot-argentine", "maillot-football"]
  },
  {
    slug: "site-maillot-foot-pas-cher-fiable",
    metaTitle: "Site de Maillots de Foot Pas Cher et Fiable ✅ | KIT FOOTBALL",
    metaDescription: "KIT FOOTBALL : site fiable et sécurisé pour acheter vos maillots de foot pas cher. Paiement sécurisé, livraison suivie, retours 30 jours.",
    h1: "Site de Maillots de Foot Pas Cher et Fiable",
    subtitle: "Paiement sécurisé • Livraison suivie • Retours 30 jours",
    introText: "KIT FOOTBALL est LE site de référence pour acheter vos maillots de football au meilleur prix en toute confiance.",
    sellingPoints: ["Paiement 100% sécurisé", "Livraison suivie en France", "Retours acceptés 30 jours", "Service client réactif"],
    faq: [
      { q: "KIT FOOTBALL est-il un site fiable ?", a: "Oui, paiement sécurisé par Stripe, livraison avec tracking, et plus de 10 000 clients satisfaits." },
      { q: "Quels moyens de paiement acceptez-vous ?", a: "Visa, Mastercard, PayPal et Apple Pay." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-football", "maillot-football-meilleur-prix"]
  },
  {
    slug: "maillot-foot-pas-cher-livraison-rapide",
    metaTitle: "Maillot de Foot Pas Cher – Livraison Rapide 24-48h ⚡ | KIT FOOTBALL",
    metaDescription: "Maillots de foot pas cher avec livraison rapide en 24-48h. Plus de 500 maillots en stock. Expédition express disponible.",
    h1: "Maillots de Foot Pas Cher – Livraison Rapide",
    subtitle: "Expédition 24-48h • Livraison express 2-4 jours",
    introText: "Commandez avant 14h, votre maillot est expédié le jour même. Livraison standard 5-10 jours, express 2-4 jours.",
    sellingPoints: ["Expédition 24-48h", "Livraison express 2-4 jours", "500+ maillots en stock", "Gratuite dès 100€"],
    faq: [
      { q: "Quels sont les délais de livraison ?", a: "Standard : 5-10 jours ouvrés. Express : 2-4 jours. Expédition sous 24-48h." },
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-football", "maillot-football-promo"]
  },
  {
    slug: "maillot-concept",
    metaTitle: "Maillots Concept Football – Designs Exclusifs & Uniques ⚽ | KIT FOOTBALL",
    metaDescription: "Découvrez nos maillots concept exclusifs. Designs uniques, pièces collectors. Brésil, PSG, Real Madrid, Argentine. Stocks très limités.",
    h1: "Maillots Concept Football",
    subtitle: "Designs exclusifs • Éditions limitées • Collectors",
    introText: "Les maillots concept réinventent le design des maillots de football. Pièces uniques, designs audacieux, éditions limitées que vous ne trouverez nulle part ailleurs.",
    sellingPoints: ["Designs exclusifs", "Éditions limitées", "Pièces collectors", "Introuvables ailleurs"],
    faq: [
      { q: "Qu'est-ce qu'un maillot concept ?", a: "Un maillot au design alternatif et créatif, différent des éditions officielles. Ce sont des pièces collectors très recherchées." },
    ],
    relatedSlugs: ["maillot-football", "maillot-bresil", "maillot-psg", "maillot-real-madrid"]
  },
  {
    slug: "ensemble-foot-pas-cher",
    metaTitle: "Ensemble de Foot Pas Cher – Maillot + Short + Chaussettes | KIT FOOTBALL",
    metaDescription: "Ensemble de foot complet pas cher : maillot + short + chaussettes. Clubs et sélections. À partir de 69,99€. Livraison rapide.",
    h1: "Ensembles de Football Pas Cher",
    subtitle: "Maillot + Short + Chaussettes – Dès 69,99€",
    introText: "Nos ensembles complets comprennent le maillot, le short et les chaussettes assortis. L'équipement complet au meilleur prix.",
    sellingPoints: ["Kit complet", "Dès 69,99€", "Adulte et enfant", "Tous les clubs"],
    faq: [
      { q: "Que comprend un ensemble de foot ?", a: "Maillot + short + chaussettes assortis dans les couleurs du club ou de la sélection." },
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-enfant", "maillot-football-homme"]
  },
  // ===== EXPANSION MASSIVE — NOUVELLES MONEY/NICHE PAGES =====
  {
    slug: "maillot-foot-style",
    metaTitle: "Maillots de Foot Stylés – Les Plus Beaux Designs ⚽ | KIT FOOTBALL",
    metaDescription: "Découvrez les plus beaux maillots de football. Designs uniques, éditions limitées, maillots tendance. Le football rencontre la mode.",
    h1: "Maillots de Foot Stylés — Les Plus Beaux Designs",
    subtitle: "Football × Mode — Les maillots qui cassent les codes",
    introText: "Le football est devenu un phénomène de mode. Certains maillots sont de véritables œuvres d'art portées aussi bien au stade que dans la rue.",
    sellingPoints: ["Designs créatifs", "Éditions limitées", "Football × Streetwear", "Pièces collectors"],
    faq: [
      { q: "Quels sont les maillots les plus stylés ?", a: "Les maillots de Venezia FC (Kappa), les third kits des grands clubs et les éditions concept sont les plus recherchés." },
      { q: "Peut-on porter un maillot de foot au quotidien ?", a: "Absolument, le maillot de foot est devenu un incontournable du streetwear." }
    ],
    relatedSlugs: ["maillot-venise", "maillot-concept", "maillot-third", "maillot-retro"]
  },
  {
    slug: "replique-maillot-foot",
    metaTitle: "Réplique Maillot de Foot – Qualité Premium Garantie | KIT FOOTBALL",
    metaDescription: "Répliques de maillots de foot haute qualité. Même design que les originaux, prix accessible. Version Fan officielle. Livraison rapide.",
    h1: "Répliques de Maillots de Foot — Qualité Premium",
    subtitle: "Même design, même qualité, meilleur prix",
    introText: "Nos maillots version Fan (réplique) reprennent le design exact des maillots portés par les joueurs, avec un tissage confortable adapté au quotidien.",
    sellingPoints: ["Design identique", "Qualité premium", "Prix accessibles", "Confort quotidien"],
    faq: [
      { q: "Vos maillots sont-ils des contrefaçons ?", a: "Non, ce sont des versions Fan officielles produites par les équipementiers (Nike, Adidas, Puma). La version Fan est le produit standard, la version Player est la version pro." },
      { q: "Quelle différence avec un maillot authentique ?", a: "La version Fan a une coupe plus ample et un tissu plus confortable. Le design est identique." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-version-player", "maillot-football"]
  },
  {
    slug: "maillot-foot-20-euros",
    metaTitle: "Maillot de Foot à 20€ – Petits Prix, Grande Qualité | KIT FOOTBALL",
    metaDescription: "Maillots de foot à partir de 20€. Petits prix, grande qualité. Destockage et promotions sur les maillots des grands clubs. Stock limité.",
    h1: "Maillots de Foot dès 20€",
    subtitle: "Destockage & promotions — Stocks très limités",
    introText: "Profitez de nos prix cassés sur une sélection de maillots de football. Saisons précédentes et destockage à partir de 20€.",
    sellingPoints: ["Dès 20€", "Destockage saisons précédentes", "Qualité identique", "Stocks très limités"],
    faq: [
      { q: "Pourquoi ces prix si bas ?", a: "Ce sont des maillots de saisons précédentes en destockage. La qualité est identique, seul le design de la saison change." },
      { q: "Les tailles sont-elles complètes ?", a: "Sur les articles en destockage, les tailles sont limitées. Commandez rapidement." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "maillot-football-promo", "maillot-football"]
  },
  {
    slug: "meilleur-site-maillot-foot",
    metaTitle: "Meilleur Site Maillot de Foot en 2026 – Pourquoi KIT FOOTBALL ✅",
    metaDescription: "KIT FOOTBALL : le meilleur site pour acheter des maillots de foot en France. Paiement sécurisé, livraison rapide, prix imbattables, 10 000+ clients.",
    h1: "Meilleur Site de Maillots de Foot en France",
    subtitle: "10 000+ clients satisfaits • Paiement sécurisé • Livraison rapide",
    introText: "Vous cherchez le meilleur site pour acheter un maillot de foot ? KIT FOOTBALL est la référence en France avec le catalogue le plus large et les prix les plus compétitifs.",
    sellingPoints: ["N°1 en France", "10 000+ clients", "800+ maillots", "Livraison suivie"],
    faq: [
      { q: "KIT FOOTBALL est-il le meilleur site de maillot ?", a: "Avec plus de 800 maillots, des prix imbattables et 10 000+ clients satisfaits, nous sommes la référence en France." },
      { q: "Comment KIT FOOTBALL se compare aux autres sites ?", a: "Prix plus bas, catalogue plus large, livraison plus rapide et service client réactif en français." }
    ],
    relatedSlugs: ["site-maillot-foot-pas-cher-fiable", "maillot-foot-pas-cher", "maillot-football"]
  },
  {
    slug: "ou-acheter-maillot-foot-pas-cher",
    metaTitle: "Où Acheter un Maillot de Foot Pas Cher ? Guide 2026 | KIT FOOTBALL",
    metaDescription: "Guide complet : où acheter un maillot de foot pas cher et fiable en France. Comparatif des meilleurs sites, avis, prix. Le choix n°1.",
    h1: "Où Acheter un Maillot de Foot Pas Cher ?",
    subtitle: "Le guide ultime pour trouver le meilleur rapport qualité/prix",
    introText: "La question que tout fan de foot se pose : où trouver un maillot de qualité au meilleur prix sans se faire arnaquer ? Voici notre guide complet.",
    sellingPoints: ["Guide d'achat complet", "Comparatif prix", "Conseils qualité", "Éviter les arnaques"],
    faq: [
      { q: "Quel est le meilleur site pour acheter un maillot pas cher ?", a: "KIT FOOTBALL propose les meilleurs prix du marché français avec une garantie qualité et un paiement sécurisé." },
      { q: "Comment reconnaitre un site fiable ?", a: "Vérifiez le paiement sécurisé, les avis clients, les mentions légales et le service client en français." }
    ],
    relatedSlugs: ["site-maillot-foot-pas-cher-fiable", "meilleur-site-maillot-foot", "maillot-foot-pas-cher"]
  },
  {
    slug: "boite-mystere-maillot",
    metaTitle: "Boîte Mystère Maillot de Foot 🎁 Surprise Garantie | KIT FOOTBALL",
    metaDescription: "Boîte mystère maillot de foot : recevez un maillot surprise d'un grand club ou sélection. Dès 29,99€. La surprise ultime pour les fans.",
    h1: "Boîte Mystère Maillot de Football",
    subtitle: "🎁 Recevez un maillot surprise — Dès 29,99€",
    introText: "L'excitation d'ouvrir une boîte mystère et de découvrir le maillot qui se cache à l'intérieur ! Grands clubs et sélections du monde entier.",
    sellingPoints: ["Effet surprise", "Dès 29,99€", "Maillots premium", "Cadeau parfait"],
    faq: [
      { q: "Qu'est-ce que la boîte mystère ?", a: "Vous recevez un maillot de football surprise d'un grand club ou sélection. Le maillot fait au minimum 79,99€ de valeur." },
      { q: "Puis-je choisir la taille ?", a: "Oui, vous choisissez votre taille, seul le maillot reste une surprise." }
    ],
    relatedSlugs: ["maillot-football", "maillot-foot-pas-cher", "maillot-football-promo"]
  },
  {
    slug: "maillot-thailande-qualite",
    metaTitle: "Maillot Foot Qualité Thaïlande – Premium à Petit Prix | KIT FOOTBALL",
    metaDescription: "Maillots de foot qualité Thaïlande : qualité premium, finitions soignées, prix accessibles. Le meilleur rapport qualité-prix du marché.",
    h1: "Maillots Qualité Thaïlande — Premium à Petit Prix",
    subtitle: "Qualité premium, finitions soignées, prix imbattable",
    introText: "La « qualité Thaïlande » est devenue un standard de qualité reconnu dans le milieu des maillots de football. Finitions soignées, tissus confortables, flocage résistant.",
    sellingPoints: ["Qualité premium", "Prix accessibles", "Finitions soignées", "Flocage résistant"],
    faq: [
      { q: "Qu'est-ce que la qualité Thaïlande ?", a: "C'est un terme désignant des maillots de qualité supérieure, avec des finitions soignées proches des versions officielles, à des prix accessibles." },
      { q: "La qualité est-elle bonne ?", a: "Oui, les maillots qualité Thaïlande sont réputés pour leur excellent rapport qualité-prix." }
    ],
    relatedSlugs: ["maillot-foot-pas-cher", "replique-maillot-foot", "maillot-football"]
  },
  {
    slug: "maillot-blue-lock",
    metaTitle: "Maillots Blue Lock ⚽⚡ Édition Manga Football | KIT FOOTBALL",
    metaDescription: "Maillots Blue Lock inspirés du manga. Maillot Japon Blue Lock, éditions collectors. Le manga football rencontre le vrai maillot.",
    h1: "Maillots Blue Lock — Manga × Football",
    subtitle: "Le phénomène manga qui a conquis le football",
    introText: "Blue Lock, le manga phénomène, a révolutionné la relation entre l'anime et le football. Retrouvez les maillots inspirés de la série, notamment le maillot du Japon version Blue Lock.",
    sellingPoints: ["Inspiration manga", "Maillot Japon Blue Lock", "Éditions limitées", "Collectors"],
    faq: [
      { q: "Existe-t-il un vrai maillot Blue Lock ?", a: "Adidas a sorti des éditions spéciales du maillot du Japon inspirées de Blue Lock, très recherchées par les fans." },
      { q: "Où trouver un maillot Blue Lock ?", a: "Chez KIT FOOTBALL, nous proposons le maillot du Japon et ses éditions spéciales Blue Lock." }
    ],
    relatedSlugs: ["maillot-japon", "maillot-concept", "maillot-retro"]
  },
  {
    slug: "maillot-flocage-personnalise",
    metaTitle: "Maillot de Foot avec Flocage Personnalisé | KIT FOOTBALL",
    metaDescription: "Maillot de foot avec flocage personnalisé. Nom, numéro, patchs officiels. Service de flocage pro sur tous les maillots. Livraison rapide.",
    h1: "Maillots Floqués — Flocage Personnalisé",
    subtitle: "Votre nom, votre numéro, votre maillot",
    introText: "Personnalisez votre maillot de football avec le flocage officiel de votre joueur préféré ou votre propre nom et numéro.",
    sellingPoints: ["Flocage officiel", "Nom personnalisé", "Patchs UEFA/FIFA", "Qualité pro"],
    faq: [
      { q: "Puis-je mettre mon propre nom ?", a: "Oui, flocage personnalisé avec votre nom et numéro au choix sur tous les maillots." },
      { q: "Le flocage résiste-t-il au lavage ?", a: "Oui, nos flocages sont réalisés avec la technique thermocollée professionnelle, résistant aux lavages à 30°C." }
    ],
    relatedSlugs: ["maillot-football", "maillot-psg", "maillot-real-madrid", "maillot-foot-pas-cher"]
  },
  {
    slug: "kit-football-complet",
    metaTitle: "Kit Football Complet – Maillot + Short + Chaussettes | KIT FOOTBALL",
    metaDescription: "Kit football complet : maillot + short + chaussettes. Tous les clubs et sélections. Adulte et enfant. À partir de 69,99€.",
    h1: "Kit Football Complet — L'Équipement Intégral",
    subtitle: "Maillot + Short + Chaussettes — Dès 69,99€",
    introText: "L'équipement complet pour ressembler à votre joueur préféré. Kit intégral avec maillot, short et chaussettes aux couleurs de votre club.",
    sellingPoints: ["Kit complet", "Tous les clubs", "Adulte et enfant", "Dès 69,99€"],
    faq: [
      { q: "Que contient un kit complet ?", a: "Maillot + short + chaussettes aux couleurs du club ou de la sélection." },
      { q: "Flocage inclus ?", a: "Le flocage est en option sur tous nos kits complets." }
    ],
    relatedSlugs: ["ensemble-foot-pas-cher", "maillot-enfant", "maillot-foot-pas-cher"]
  },
  {
    slug: "maillot-foot-ete-2026",
    metaTitle: "Maillots de Foot Été 2026 – Toutes les Nouveautés ☀️ | KIT FOOTBALL",
    metaDescription: "Maillots de foot été 2026 : toutes les nouveautés clubs et sélections. Prêt pour la Coupe du Monde. Livraison express.",
    h1: "Maillots de Foot Été 2026 — Nouveautés",
    subtitle: "Saison 2025/26 + Coupe du Monde FIFA 2026™",
    introText: "L'été 2026 sera historique avec la Coupe du Monde. Découvrez tous les nouveaux maillots dès leur sortie officielle.",
    sellingPoints: ["CDM 2026", "Nouveautés clubs", "Pré-commandes", "Livraison express"],
    faq: [
      { q: "Quand sortent les maillots été 2026 ?", a: "Les maillots clubs sortent en juin/juillet 2025. Les maillots CDM sortent début 2026." },
    ],
    relatedSlugs: ["maillot-coupe-du-monde-2026", "maillot-football-2026", "maillot-football"]
  },
  {
    slug: "maillot-euro-2025",
    metaTitle: "Maillots Euro Féminin 2025 – Toutes les Sélections | KIT FOOTBALL",
    metaDescription: "Maillots Euro féminin 2025 : toutes les sélections européennes. Maillots femme et unisexe. Livraison rapide France.",
    h1: "Maillots Euro 2025 — Compétition Européenne",
    subtitle: "Toutes les sélections européennes",
    introText: "L'Euro est la plus grande compétition européenne. Retrouvez tous les maillots des sélections participantes chez KIT FOOTBALL.",
    sellingPoints: ["Toutes les sélections", "Flocage officiel", "Version femme dispo", "Patchs UEFA"],
    faq: [
      { q: "Maillots Euro disponibles ?", a: "Oui, tous les maillots des sélections européennes qualifiées sont disponibles." },
    ],
    relatedSlugs: ["maillot-france", "maillot-espagne", "maillot-allemagne", "maillot-coupe-du-monde-2026"]
  },
  {
    slug: "guide-taille",
    metaTitle: "Guide des Tailles Maillot de Foot | Fan vs Player | KIT FOOTBALL",
    metaDescription: "Guide complet des tailles pour maillots de football. Différence entre version Fan et Player. Comment bien choisir sa taille pour Nike, Adidas, Puma.",
    h1: "Guide des Tailles : Comment choisir son maillot ?",
    subtitle: "Comparatif Version Fan et Version Player",
    introText: "Ne vous trompez plus de taille ! Voici le guide complet pour choisir la bonne taille de maillot de foot, selon la marque et la version.",
    sellingPoints: ["Guide Fan vs Player", "Mesures précises", "Conseils Nike/Adidas", "Retours 30 jours"],
    faq: [
      { q: "Quelle est la différence entre Fan et Player ?", a: "La version Fan a une coupe classique/ample. La version Player a une coupe très ajustée, identique aux joueurs professionnels." },
      { q: "Faut-il prendre une taille au-dessus pour la version Player ?", a: "Oui, nous recommandons de prendre une taille au-dessus de votre taille habituelle pour les maillots version Player (Authentic)." }
    ],
    relatedSlugs: ["maillot-football-homme", "maillot-enfant", "maillot-version-player", "replique-maillot-foot"]
  },
];

