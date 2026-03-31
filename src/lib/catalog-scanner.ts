// ==========================================
// CATALOG SCANNER
// Scans /public/maillots/ folders and parses product data
// ==========================================

import fs from 'fs';
import path from 'path';
import type { CatalogProduct, ProductType, ProductCategory } from '../types/catalog';
import { generateDescriptions, generateFAQ } from './descriptions';

// ==========================================
// CLUB NORMALIZATION DICTIONARY
// ==========================================
const CLUB_ALIASES: Record<string, string> = {
  'man u': 'Manchester United',
  'man utd': 'Manchester United',
  'manchester united': 'Manchester United',
  'manchester city': 'Manchester City',
  'man city': 'Manchester City',
  'barca': 'FC Barcelona',
  'barcelona': 'FC Barcelona',
  'barça': 'FC Barcelona',
  'psg': 'Paris Saint-Germain',
  'paris': 'Paris Saint-Germain',
  'paris saint-germain': 'Paris Saint-Germain',
  'real madrid': 'Real Madrid',
  'bayern munich': 'Bayern Munich',
  'bayern': 'Bayern Munich',
  'borussia dortmund': 'Borussia Dortmund',
  'dortmund': 'Borussia Dortmund',
  'inter': 'Inter Milan',
  'inter milan': 'Inter Milan',
  'ac milan': 'AC Milan',
  'ac': 'AC Milan',
  'juventus': 'Juventus',
  'juve': 'Juventus',
  'napoli': 'SSC Napoli',
  'roma': 'AS Roma',
  'as roma': 'AS Roma',
  'liverpool': 'Liverpool',
  'chelsea': 'Chelsea',
  'arsenal': 'Arsenal',
  'tottenham': 'Tottenham Hotspur',
  'tottenham hotspur': 'Tottenham Hotspur',
  'atletico madrid': 'Atlético Madrid',
  'atletico': 'Atlético Madrid',
  'marseille': 'Olympique de Marseille',
  'marseilles': 'Olympique de Marseille',
  'olympique de marseille': 'Olympique de Marseille',
  'lyon': 'Olympique Lyonnais',
  'olympique lyonnais': 'Olympique Lyonnais',
  'newcastle': 'Newcastle United',
  'aston villa': 'Aston Villa',
  'sunderland': 'Sunderland',
  'southampton': 'Southampton',
  'wolves': 'Wolverhampton',
  'benfica': 'SL Benfica',
  'porto': 'FC Porto',
  'lisbon': 'Sporting CP',
  'sporting': 'Sporting CP',
  'ajax': 'Ajax Amsterdam',
  'feyenoord': 'Feyenoord',
  'psv': 'PSV Eindhoven',
  'psv eindhoven': 'PSV Eindhoven',
  'villarreal': 'Villarreal CF',
  'betis': 'Real Betis',
  'real sociedad': 'Real Sociedad',
  'fiorentina': 'ACF Fiorentina',
  'corinthians': 'SC Corinthians',
  'flamengo': 'Flamengo',
  'flamenco': 'Flamengo',
  'fluminense': 'Fluminense',
  'boca juniors': 'Boca Juniors',
  'cruzeiro': 'Cruzeiro',
  'palmeiras': 'SE Palmeiras',
  'palmelas': 'SE Palmeiras',
  'vasco da gama': 'Vasco da Gama',
  'vasco da gama rj': 'Vasco da Gama',
  'são paulo': 'São Paulo FC',
  'sao paulo': 'São Paulo FC',
  'chivas': 'CD Guadalajara',
  'chivas regal': 'CD Guadalajara',
  'toluca': 'Deportivo Toluca',
  'santos': 'Santos FC',
  'galaxy': 'LA Galaxy',
  'miami': 'Inter Miami',
  'toronto': 'Toronto FC',
  'vancouver': 'Vancouver Whitecaps',
  'columbus': 'Columbus Crew',
  'washington': 'DC United',
  'atlanta': 'Atlanta United',
  'salzburg red bulls': 'RB Salzburg',
  'frankfurt': 'Eintracht Frankfurt',
  'schalke': 'FC Schalke 04',
  'schalke 04': 'FC Schalke 04',
  'nuremberg': 'FC Nuremberg',
  'stuttgart': 'VfB Stuttgart',
  'fenerbahce': 'Fenerbahçe',
  'galata': 'Galatasaray',
  'galatasaray': 'Galatasaray',
  'venice': 'Venezia FC',
  'blackburn': 'Blackburn Rovers',
  'la coruna': 'Deportivo La Coruña',
};

// ==========================================
// NATIONAL TEAMS
// ==========================================
const NATIONAL_TEAMS: Set<string> = new Set([
  'france', 'french', 'brazil', 'brazilian', 'argentina', 'argentine',
  'germany', 'german', 'spain', 'spanish', 'italy', 'italian',
  'england', 'english', 'portugal', 'portuguese', 'netherlands',
  'belgium', 'belgian', 'japan', 'japanese', 'morocco', 'moroccan',
  'senegal', 'cameroon', 'ghana', 'ivory coast', 'congo', 'mali',
  'gambia', 'south africa', 'nigeria', 'egypt', 'tunisia',
  'mexico', 'mexican', 'usa', 'canada', 'canadian', 'chile', 'chilean',
  'colombia', 'colombian', 'uruguay', 'paraguay', 'ecuador', 'peru',
  'venezuela', 'bolivia', 'jamaica',
  'scotland', 'scottish', 'wales', 'welsh', 'ireland', 'irish',
  'denmark', 'denmark', 'sweden', 'norway', 'finland', 'iceland',
  'switzerland', 'swiss', 'austria', 'czech', 'poland', 'polish',
  'croatia', 'serbia', 'ukraine', 'romania', 'qatar',
  'south korea', 'korea', 'saudi arabia', 'uae', 'united arab emirates',
]);

const NATIONAL_TEAM_NORMALIZE: Record<string, string> = {
  'french': 'France', 'france': 'France',
  'brazilian': 'Brésil', 'brazil': 'Brésil',
  'argentine': 'Argentine', 'argentina': 'Argentine',
  'german': 'Allemagne', 'germany': 'Allemagne',
  'spanish': 'Espagne', 'spain': 'Espagne',
  'italian': 'Italie', 'italy': 'Italie',
  'english': 'Angleterre', 'england': 'Angleterre',
  'portuguese': 'Portugal', 'portugal': 'Portugal',
  'netherlands': 'Pays-Bas',
  'belgian': 'Belgique', 'belgium': 'Belgique',
  'japanese': 'Japon', 'japan': 'Japon',
  'moroccan': 'Maroc', 'morocco': 'Maroc',
  'senegal': 'Sénégal',
  'cameroon': 'Cameroun',
  'ghana': 'Ghana',
  'ivory coast': 'Côte d\'Ivoire',
  'congo': 'Congo',
  'mali': 'Mali',
  'gambia': 'Gambie',
  'south africa': 'Afrique du Sud',
  'nigeria': 'Nigéria',
  'egypt': 'Égypte',
  'tunisia': 'Tunisie',
  'mexico': 'Mexique', 'mexican': 'Mexique',
  'usa': 'États-Unis',
  'canada': 'Canada', 'canadian': 'Canada',
  'chile': 'Chili', 'chilean': 'Chili',
  'colombia': 'Colombie', 'colombian': 'Colombie',
  'uruguay': 'Uruguay',
  'paraguay': 'Paraguay',
  'ecuador': 'Équateur',
  'peru': 'Pérou',
  'venezuela': 'Venezuela',
  'jamaica': 'Jamaïque',
  'scotland': 'Écosse', 'scottish': 'Écosse',
  'wales': 'Pays de Galles', 'welsh': 'Pays de Galles',
  'denmark': 'Danemark',
  'sweden': 'Suède',
  'norway': 'Norvège',
  'switzerland': 'Suisse', 'swiss': 'Suisse',
  'austria': 'Autriche',
  'poland': 'Pologne', 'polish': 'Pologne',
  'croatia': 'Croatie',
  'serbia': 'Serbie',
  'ukraine': 'Ukraine',
  'qatar': 'Qatar',
  'south korea': 'Corée du Sud', 'korea': 'Corée du Sud',
  'saudi arabia': 'Arabie Saoudite',
  'uae': 'Émirats Arabes Unis', 'united arab emirates': 'Émirats Arabes Unis',
};

// ==========================================
// CLUB TO LEAGUE MAPPING
// ==========================================
const CLUB_TO_LEAGUE: Record<string, string> = {
  'Paris Saint-Germain': 'Ligue 1',
  'Olympique de Marseille': 'Ligue 1',
  'Olympique Lyonnais': 'Ligue 1',
  'Real Madrid': 'La Liga',
  'FC Barcelona': 'La Liga',
  'Atlético Madrid': 'La Liga',
  'Villarreal CF': 'La Liga',
  'Real Betis': 'La Liga',
  'Real Sociedad': 'La Liga',
  'Arsenal': 'Premier League',
  'Chelsea': 'Premier League',
  'Liverpool': 'Premier League',
  'Manchester City': 'Premier League',
  'Manchester United': 'Premier League',
  'Tottenham Hotspur': 'Premier League',
  'Newcastle United': 'Premier League',
  'Aston Villa': 'Premier League',
  'Sunderland': 'Premier League',
  'Southampton': 'Premier League',
  'Blackburn Rovers': 'Premier League',
  'Juventus': 'Serie A',
  'AC Milan': 'Serie A',
  'Inter Milan': 'Serie A',
  'SSC Napoli': 'Serie A',
  'AS Roma': 'Serie A',
  'ACF Fiorentina': 'Serie A',
  'Venezia FC': 'Serie A',
  'Bayern Munich': 'Bundesliga',
  'Borussia Dortmund': 'Bundesliga',
  'Eintracht Frankfurt': 'Bundesliga',
  'FC Schalke 04': 'Bundesliga',
  'FC Nuremberg': 'Bundesliga',
  'VfB Stuttgart': 'Bundesliga',
  'RB Salzburg': 'Bundesliga',
  'SL Benfica': 'Liga Portugal',
  'FC Porto': 'Liga Portugal',
  'Sporting CP': 'Liga Portugal',
  'Ajax Amsterdam': 'Eredivisie',
  'PSV Eindhoven': 'Eredivisie',
  'Feyenoord': 'Eredivisie',
  'Galatasaray': 'Süper Lig',
  'Fenerbahçe': 'Süper Lig',
  'Flamengo': 'Brasileirão',
  'Fluminense': 'Brasileirão',
  'SC Corinthians': 'Brasileirão',
  'Cruzeiro': 'Brasileirão',
  'SE Palmeiras': 'Brasileirão',
  'Vasco da Gama': 'Brasileirão',
  'São Paulo FC': 'Brasileirão',
  'Santos FC': 'Brasileirão',
  'Boca Juniors': 'Liga Argentina',
  'CD Guadalajara': 'Liga MX',
  'Deportivo Toluca': 'Liga MX',
  'LA Galaxy': 'MLS',
  'Inter Miami': 'MLS',
  'Toronto FC': 'MLS',
  'Vancouver Whitecaps': 'MLS',
  'Columbus Crew': 'MLS',
  'DC United': 'MLS',
  'Atlanta United': 'MLS',
};

// ==========================================
// CLUB TO COUNTRY MAPPING
// ==========================================
const CLUB_TO_COUNTRY: Record<string, string> = {
  'Ligue 1': 'France',
  'La Liga': 'Espagne',
  'Premier League': 'Angleterre',
  'Serie A': 'Italie',
  'Bundesliga': 'Allemagne',
  'Liga Portugal': 'Portugal',
  'Eredivisie': 'Pays-Bas',
  'Süper Lig': 'Turquie',
  'Brasileirão': 'Brésil',
  'Liga Argentina': 'Argentine',
  'Liga MX': 'Mexique',
  'MLS': 'États-Unis',
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .substring(0, 80);
}

function parseSeason(raw: string): { season: string; seasonSlug: string; seasonDisplay: string } {
  // Match patterns like "2627", "25-26", "2526", "0304", "9798", "04", "06", "1920"
  const twoDigitMatch = raw.match(/^(\d{2})[-.]?(\d{2})\b/);
  if (twoDigitMatch) {
    let y1 = parseInt(twoDigitMatch[1]);
    let y2 = parseInt(twoDigitMatch[2]);

    // Convert to full years
    let fullY1: number;
    let fullY2: number;

    if (y1 >= 50) {
      fullY1 = 1900 + y1;
    } else {
      fullY1 = 2000 + y1;
    }

    if (y2 >= 50) {
      fullY2 = 1900 + y2;
    } else {
      fullY2 = 2000 + y2;
    }

    // If it's actually year+year (like 2003/04)
    if (y2 < y1 || (y2 - y1 === 1) || (y1 === 99 && y2 === 0)) {
      return {
        season: `${fullY1}/${String(fullY2).slice(-2)}`,
        seasonSlug: `${fullY1}-${String(fullY2).slice(-2)}`,
        seasonDisplay: `Saison ${fullY1}/${String(fullY2).slice(-2)}`,
      };
    }

    // Same thing, consecutive years
    return {
      season: `${fullY1}/${String(fullY2).slice(-2)}`,
      seasonSlug: `${fullY1}-${String(fullY2).slice(-2)}`,
      seasonDisplay: `Saison ${fullY1}/${String(fullY2).slice(-2)}`,
    };
  }

  // Match single year patterns like "2022", "2026", "04"
  const yearMatch = raw.match(/^(\d{4})\b/);
  if (yearMatch) {
    const year = yearMatch[1];
    return {
      season: year,
      seasonSlug: year,
      seasonDisplay: `Saison ${year}`,
    };
  }

  // Two-digit year alone (e.g. "04 Italy")
  const shortYearMatch = raw.match(/^(\d{2})\s/);
  if (shortYearMatch) {
    const y = parseInt(shortYearMatch[1]);
    const fullYear = y >= 50 ? 1900 + y : 2000 + y;
    return {
      season: String(fullYear),
      seasonSlug: String(fullYear),
      seasonDisplay: `Saison ${fullYear}`,
    };
  }

  return { season: 'Inconnue', seasonSlug: 'autre', seasonDisplay: 'Autre saison' };
}

function detectType(name: string): { type: ProductType; typeDisplay: string } {
  const lower = name.toLowerCase();

  if (/\bhoodie\b|sweatshirt|卫衣/.test(lower)) return { type: 'hoodie', typeDisplay: 'Sweat / Hoodie' };
  if (/\bwindbreaker\b|trench\s*coat|wind/.test(lower)) return { type: 'windbreaker', typeDisplay: 'Coupe-vent' };
  if (/\bjacket\b|棉服|cotton[-\s]padded|fleece\s*thick|racing\s*suit/.test(lower)) return { type: 'jacket', typeDisplay: 'Veste' };
  if (/\bgoalkeeper\b|gardien|守门/.test(lower)) return { type: 'goalkeeper', typeDisplay: 'Gardien de but' };
  if (/\btraining\b|pre[-\s]*match|entra[iî]nement|训练/.test(lower)) return { type: 'training', typeDisplay: 'Entraînement' };
  if (/\bretro\b|vintage|classic|anniversary|commemorat|1901|125th|150th|50th|113th/.test(lower)) return { type: 'retro', typeDisplay: 'Rétro / Édition spéciale' };
  if (/\bspecial\s*edition\b|limited\s*edition|collaboration|concept|特别版/.test(lower)) return { type: 'special', typeDisplay: 'Édition spéciale' };
  if (/\bthird\b|troisième/.test(lower)) return { type: 'third', typeDisplay: 'Third' };
  if (/\baway\b|extérieur|ext[ée]rieur/.test(lower)) return { type: 'away', typeDisplay: 'Extérieur' };
  if (/\bhome\b|domicile|主场/.test(lower)) return { type: 'home', typeDisplay: 'Domicile' };

  return { type: 'other', typeDisplay: 'Autre' };
}

function detectClub(name: string): { club: string; isNational: boolean } {
  const lower = name.toLowerCase();

  // Strip common prefixes to isolate the club/team name
  let cleaned = lower
    .replace(/^\d{2}[-.]?\d{0,2}\s*/, '')        // remove season prefix
    .replace(/\bkids?\b/gi, '')
    .replace(/\bwomen'?s?\b/gi, '')
    .replace(/\bplayer'?s?\s*(?:edition|version)?\b/gi, '')
    .replace(/\bplayers?\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // Check for national teams first
  for (const [key, displayName] of Object.entries(NATIONAL_TEAM_NORMALIZE)) {
    // Match whole word
    const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(cleaned)) {
      return { club: displayName, isNational: true };
    }
  }

  // Check club aliases
  for (const [alias, normalized] of Object.entries(CLUB_ALIASES)) {
    const regex = new RegExp(`\\b${alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(cleaned)) {
      return { club: normalized, isNational: false };
    }
  }

  // Try to extract the club name heuristically
  // Remove type keywords, size info, and common words
  const extracted = cleaned
    .replace(/\b(home|away|third|retro|vintage|training|pre-match|special|edition|limited|goalkeeper|classic|commemorat\w*|anniversary|windbreaker|jacket|hoodie|sweatshirt|fleece|cotton|padded|set|suit)\b/gi, '')
    .replace(/\b(game|team|court|ground|match|shirt|jersey|dress|polo|tank\s*top|long[\s-]*sleeve|short[\s-]*sleeve|half[\s-]*sleeve|size|version)\b/gi, '')
    .replace(/\b(s-?\d*x?l\d*|m-?\d*x?l|16#?\s*-?\s*\d+#?|[sml]|xl|xxl|xxxl|2xl|3xl|4xl)\b/gi, '')
    .replace(/\b(yellow|red|blue|green|black|white|purple|dark\s*\w+|maroon)\b/gi, '')
    .replace(/\b(for|in|the|of|at|on|de|du|des|le|la|les|un|une|à|et)\b/gi, '')
    .replace(/[#\-~_.,()]/g, ' ')
    .replace(/\d+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (extracted && extracted.length > 1) {
    // Capitalize
    const capitalized = extracted.split(' ')
      .filter(w => w.length > 0)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    if (capitalized.length > 1) {
      return { club: capitalized, isNational: false };
    }
  }

  return { club: 'Autres', isNational: false };
}

function detectSizes(name: string): string[] {
  const lower = name.toLowerCase();

  // Kids sizes pattern: 16# - 28#, 16#-30#
  if (/\d+#\s*-?\s*\d+#/.test(lower)) {
    return ['16', '18', '20', '22', '24', '26', '28'];
  }

  // Adult size ranges: S-4XL, S-XXL, M-3XL, etc.
  const sizeMatch = lower.match(/([sml])\s*[-~]\s*(\d*x*l)/i);
  if (sizeMatch) {
    const allSizes = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL'];
    const start = sizeMatch[1].toUpperCase();
    let end = sizeMatch[2].toUpperCase();
    // Normalize
    if (end === '2XL') end = 'XXL';

    const startIdx = allSizes.findIndex(s => s === start);
    const endIdx = allSizes.findIndex(s => s === end);

    if (startIdx >= 0 && endIdx >= 0) {
      return allSizes.slice(startIdx, endIdx + 1);
    }
  }

  return ['S', 'M', 'L', 'XL', 'XXL'];
}

function isKidsProduct(name: string): boolean {
  const lower = name.toLowerCase();
  return /\bkids?\b|enfants?|children|#\s*-?\s*\d+#|16#/.test(lower);
}

function isWomensProduct(name: string): boolean {
  const lower = name.toLowerCase();
  return /\bwomen'?s?\b|femme|féminin/.test(lower);
}

function isPlayerEdition(name: string): boolean {
  const lower = name.toLowerCase();
  return /\bplayer'?s?\s*(edition|version)?\b|\bplayers?\b/i.test(lower);
}

function shouldSkipFolder(name: string): boolean {
  // Skip non-product folders
  const lower = name.toLowerCase();
  return (
    lower.startsWith('http') ||
    lower === 'size' ||
    lower.includes('size chart') ||
    lower.includes('size reference') ||
    /^[^\w\s]/.test(name) ||
    name.length < 3 ||
    /^(棉服|阿迪)\d*$/.test(name)
  );
}

function hasChineseChars(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

function cleanProductName(folderName: string, club: string, type: string, season: string, isKids: boolean, isWomens: boolean, isPlayer: boolean): string {
  // Build a clean, French-language product name
  let name = 'Maillot';

  if (type === 'jacket') name = 'Veste';
  else if (type === 'hoodie') name = 'Sweat';
  else if (type === 'windbreaker') name = 'Coupe-vent';
  else if (type === 'training') name = 'Maillot d\'entraînement';
  else if (type === 'goalkeeper') name = 'Maillot de gardien';

  if (isKids) name += ' Enfant';
  if (isWomens) name += ' Femme';

  if (club && club !== 'Autres') name += ` ${club}`;

  const typeMap: Record<string, string> = {
    'home': 'Domicile',
    'away': 'Extérieur',
    'third': 'Third',
    'retro': 'Rétro',
    'special': 'Édition Spéciale',
    'goalkeeper': '',
    'training': '',
    'jacket': '',
    'hoodie': '',
    'windbreaker': '',
    'other': '',
  };

  const typeLabel = typeMap[type] || '';
  if (typeLabel) name += ` ${typeLabel}`;

  if (season && season !== 'Inconnue') name += ` ${season}`;

  if (isPlayer) name += ' Version Player';

  return name.replace(/\s+/g, ' ').trim();
}

// ==========================================
// FALLBACK PRODUCTS GENERATOR
// ==========================================

function generateFallbackProducts(): CatalogProduct[] {
  const fallbackProducts: CatalogProduct[] = [
    // PSG
    {
      id: 'psg-domicile-2024-25',
      name: 'Maillot PSG Domicile 2024-25',
      slug: 'maillot-psg-domicile-2024-25',
      folderName: 'psg-domicile-2024-25',
      club: 'Paris Saint-Germain',
      clubSlug: 'paris-saint-germain',
      season: '2024-25',
      seasonSlug: '2024-25',
      seasonDisplay: '2024-25',
      type: 'home',
      typeSlug: 'home',
      typeDisplay: 'Domicile',
      category: 'club',
      price: 89.99,
      images: ['/Images/maillot-psg-domicile-2024-25.jpg'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      shortDescription: 'Le maillot domicile du PSG pour la saison 2024-25 avec les couleurs emblématiques bleu, rouge et blanc.',
      longDescription: 'Le maillot domicile du PSG pour la saison 2024-25 avec les couleurs emblématiques bleu, rouge et blanc.',
      faq: [],
      keywords: ['psg', 'paris saint-germain', 'domicile', '2024-25'],
      canonical: '/maillot-psg-domicile-2024-25',
      altTexts: ['Maillot PSG Domicile 2024-25'],
      isKids: false,
      isWomens: false,
      isRetro: false,
      isPlayerEdition: false,
      isSpecialEdition: false,
      isNew: true,
      isBestSeller: true,
      isAvailable: true,
      league: 'Ligue 1',
      country: 'France'
    },
    // Real Madrid
    {
      id: 'real-madrid-domicile-2024-25',
      name: 'Maillot Real Madrid Domicile 2024-25',
      slug: 'maillot-real-madrid-domicile-2024-25',
      folderName: 'real-madrid-domicile-2024-25',
      club: 'Real Madrid',
      clubSlug: 'real-madrid',
      season: '2024-25',
      seasonSlug: '2024-25',
      seasonDisplay: '2024-25',
      type: 'home',
      typeSlug: 'home',
      typeDisplay: 'Domicile',
      category: 'club',
      price: 94.99,
      images: ['/Images/maillot-real-madrid-domicile-2024-25.jpg'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      shortDescription: 'Le maillot domicile mythique du Real Madrid avec son blanc pur et les détails dorés.',
      longDescription: 'Le maillot domicile mythique du Real Madrid avec son blanc pur et les détails dorés.',
      faq: [],
      keywords: ['real madrid', 'domicile', '2024-25'],
      canonical: '/maillot-real-madrid-domicile-2024-25',
      altTexts: ['Maillot Real Madrid Domicile 2024-25'],
      isKids: false,
      isWomens: false,
      isRetro: false,
      isPlayerEdition: false,
      isSpecialEdition: false,
      isNew: true,
      isBestSeller: true,
      isAvailable: true,
      league: 'La Liga',
      country: 'Espagne'
    },
    // France
    {
      id: 'france-domicile-2024-25',
      name: 'Maillot France Domicile 2024-25',
      slug: 'maillot-france-domicile-2024-25',
      folderName: 'france-domicile-2024-25',
      club: 'France',
      clubSlug: 'france',
      season: '2024-25',
      seasonSlug: '2024-25',
      seasonDisplay: '2024-25',
      type: 'home',
      typeSlug: 'home',
      typeDisplay: 'Domicile',
      category: 'national',
      price: 92.99,
      images: ['/Images/maillot-france-domicile-2024-25.jpg'],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      shortDescription: 'Le maillot domicile de l\'équipe de France avec le bleu tricolore emblématique.',
      longDescription: 'Le maillot domicile de l\'équipe de France avec le bleu tricolore emblématique.',
      faq: [],
      keywords: ['france', 'domicile', '2024-25', 'equipe nationale'],
      canonical: '/maillot-france-domicile-2024-25',
      altTexts: ['Maillot France Domicile 2024-25'],
      isKids: false,
      isWomens: false,
      isRetro: false,
      isPlayerEdition: false,
      isSpecialEdition: false,
      isNew: true,
      isBestSeller: true,
      isAvailable: true,
      league: 'Euro',
      country: 'France'
    }
  ];

  console.log(`[catalog-scanner] Generated ${fallbackProducts.length} fallback products`);
  return fallbackProducts;
}

// ==========================================
// MAIN SCAN FUNCTION
// ==========================================

export function scanCatalog(): CatalogProduct[] {
  const maillotsDir = path.join(process.cwd(), 'public', 'maillots');

  if (!fs.existsSync(maillotsDir)) {
    console.warn('[catalog-scanner] /public/maillots/ not found, generating fallback products');
    return generateFallbackProducts();
  }

  const folders = fs.readdirSync(maillotsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(name => !shouldSkipFolder(name));

  const products: CatalogProduct[] = [];
  let idCounter = 1;

  for (const folderName of folders) {
    // Skip folders with only Chinese characters (no usable product info)
    if (hasChineseChars(folderName) && !/[a-zA-Z]{3,}/.test(folderName)) {
      continue;
    }

    const folderPath = path.join(maillotsDir, folderName);

    // Get images in this folder
    let imageFiles: string[];
    try {
      imageFiles = fs.readdirSync(folderPath)
        .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
        .sort((a, b) => {
          // Sort by number suffix: _1, _2, etc.
          const getNum = (name: string) => {
            const match = name.match(/_(\d+)\./);
            return match ? parseInt(match[1]) : 999;
          };
          return getNum(a) - getNum(b);
        });
    } catch {
      continue;
    }

    if (imageFiles.length === 0) continue;

    // Build image paths (relative to /public)
    const encodedFolder = encodeURIComponent(folderName);
    const images = imageFiles.map(f => `/maillots/${encodedFolder}/${encodeURIComponent(f)}`);

    // Parse season
    const { season, seasonSlug, seasonDisplay } = parseSeason(folderName);

    // Detect club/team
    const { club, isNational } = detectClub(folderName);

    // Detect type
    const { type, typeDisplay } = detectType(folderName);

    // Detect sizes
    const sizes = detectSizes(folderName);

    // Detect flags
    const kids = isKidsProduct(folderName);
    const womens = isWomensProduct(folderName);
    const player = isPlayerEdition(folderName);
    const isRetro = type === 'retro' || /retro|vintage|classic/i.test(folderName);
    const isSpecial = type === 'special' || /special|limited|anniversary|commemorat/i.test(folderName);

    // Build clean name
    const name = cleanProductName(folderName, club, type, season, kids, womens, player);

    // Generate slug
    const slug = generateSlug(name);

    // Skip if slug is too short or duplicate
    if (slug.length < 5) continue;

    // Determine category
    let category: ProductCategory = 'club';
    if (kids) category = 'kids';
    else if (womens) category = 'women';
    else if (isNational) category = 'national';
    else if (isRetro) category = 'retro';
    else if (['jacket', 'hoodie', 'windbreaker'].includes(type)) category = 'outerwear';

    // League and country
    const clubSlug = generateSlug(club);
    const league = isNational ? 'Sélections Nationales' : (CLUB_TO_LEAGUE[club] || 'Autre');
    const country = isNational ? club : (CLUB_TO_COUNTRY[league] || 'Autre');

    // Generate descriptions
    const { shortDescription, longDescription } = generateDescriptions(
      name, club, type, typeDisplay, season, kids, womens, player, isNational, isRetro, isSpecial
    );

    // Generate FAQ
    const faq = generateFAQ(name, club, type, season, kids);

    // Generate alt texts
    const altTexts = images.map((_, i) => {
      if (i === 0) return `${name} - Vue principale`;
      if (i === 1) return `${name} - Vue arrière`;
      return `${name} - Vue détail ${i}`;
    });

    // Generate SEO keywords
    const keywords: string[] = [
      `maillot ${club.toLowerCase()} pas cher`,
      `maillot ${typeDisplay.toLowerCase()} ${club.toLowerCase()}`,
      name.toLowerCase(),
    ];
    if (season !== 'Inconnue') keywords.push(`maillot ${club.toLowerCase()} ${season}`);
    if (isNational) keywords.push(`maillot equipe nationale ${club.toLowerCase()}`);

    const product: CatalogProduct = {
      id: `cat-${idCounter++}`,
      name,
      slug,
      folderName,
      club,
      clubSlug,
      season,
      seasonSlug,
      seasonDisplay,
      type,
      typeSlug: generateSlug(typeDisplay),
      typeDisplay,
      category,
      price: 29,
      images,
      sizes,
      shortDescription,
      longDescription,
      faq,
      keywords,
      canonical: `/produit/${slug}`,
      altTexts,
      isKids: kids,
      isWomens: womens,
      isRetro,
      isPlayerEdition: player,
      isSpecialEdition: isSpecial,
      isNew: season.includes('2026') || season.includes('2027'),
      isBestSeller: false,
      isAvailable: true,
      league,
      country,
    };

    products.push(product);
  }

  // Mark best sellers: products with the most images are likely best sellers
  const sorted = [...products].sort((a, b) => b.images.length - a.images.length);
  sorted.slice(0, Math.ceil(products.length * 0.15)).forEach(p => {
    const found = products.find(prod => prod.id === p.id);
    if (found) found.isBestSeller = true;
  });

  // Deduplicate slugs
  const slugMap = new Map<string, number>();
  for (const product of products) {
    const count = slugMap.get(product.slug) || 0;
    if (count > 0) {
      product.slug = `${product.slug}-${count + 1}`;
      product.canonical = `/produit/${product.slug}`;
    }
    slugMap.set(product.slug.replace(/-\d+$/, ''), count + 1);
  }

  return products;
}
