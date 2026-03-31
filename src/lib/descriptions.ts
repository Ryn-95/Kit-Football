// ==========================================
// AUTOMATIC DESCRIPTION GENERATOR
// Generates unique, natural descriptions and FAQ per product
// ==========================================

import type { ProductType } from '../types/catalog';

// ==========================================
// DESCRIPTION TEMPLATES (rotated for variety)
// ==========================================

const SHORT_TEMPLATES = [
  (name: string, club: string, season: string) =>
    `Découvrez le ${name}, un maillot de qualité premium pensé pour les vrais supporters. Confort optimal et design authentique.`,
  (name: string, club: string, season: string) =>
    `Le ${name} allie performance et style. Un incontournable pour afficher vos couleurs avec fierté.`,
  (name: string, club: string, season: string) =>
    `Craquez pour le ${name}. Design moderne, tissu respirant et finitions soignées pour un look matchday impeccable.`,
  (name: string, club: string, season: string) =>
    `Portez les couleurs de ${club} avec le ${name}. Réplique fidèle, confort au quotidien et rapport qualité-prix imbattable.`,
  (name: string, club: string, season: string) =>
    `Le ${name} est le choix idéal pour tout passionné de football. Qualité supérieure, livraison rapide en Europe.`,
  (name: string, club: string, season: string) =>
    `Affirmez votre passion avec le ${name}. Un maillot premium au meilleur prix, pensé pour les fans exigeants.`,
];

function getShortDescription(name: string, club: string, season: string, hash: number): string {
  const idx = hash % SHORT_TEMPLATES.length;
  return SHORT_TEMPLATES[idx](name, club, season);
}

// ==========================================
// LONG DESCRIPTION PARAGRAPHS
// ==========================================

const INTRO_PARAGRAPHS = [
  (name: string, club: string) =>
    `Le ${name} est bien plus qu'un simple maillot de football. C'est une pièce qui incarne la passion, l'identité et l'histoire de ${club}. Conçu avec des matériaux de haute qualité, il offre un confort exceptionnel aussi bien dans les tribunes qu'au quotidien.`,
  (name: string, club: string) =>
    `Ajoutez le ${name} à votre collection et rejoignez la communauté des supporters de ${club}. Ce maillot représente le meilleur du design sportif contemporain : coupe ajustée, tissu technique respirant et finitions premium.`,
  (name: string, club: string) =>
    `Le ${name} est un choix évident pour tout fan de ${club}. Fabriqué pour offrir une expérience de port agréable, il reprend les codes du maillot porté par les professionnels dans un format adapté au quotidien des supporters.`,
];

const QUALITY_PARAGRAPHS = [
  (type: string) =>
    `La qualité de fabrication est au rendez-vous : coutures renforcées, tissu polyester respirant à séchage rapide, et une tenue parfaite même après de nombreux lavages. L'écusson et les logos sont brodés ou thermocollés avec une précision remarquable.`,
  (type: string) =>
    `Chaque détail a été pensé pour offrir un produit à la hauteur des attentes : matières techniques, finitions soignées, et un rendu visuel fidèle au maillot officiel. Le tissu Dry-Fit assure une ventilation optimale par temps chaud.`,
  (type: string) =>
    `Ce maillot allie performance sportive et élégance. Sa technologie de gestion de l'humidité garde votre peau au sec, tandis que sa coupe ergonomique suit naturellement les mouvements du corps.`,
];

const TYPE_PARAGRAPHS: Partial<Record<ProductType, string>> = {
  'home': `Le maillot domicile est la pièce maîtresse de toute collection de supporter. Il représente l'identité visuelle forte du club et ses couleurs historiques. Portez-le avec fierté lors des soirées de match, au stade ou simplement au quotidien pour afficher votre soutien indéfectible.`,
  'away': `Le maillot extérieur se distingue par un design audacieux et souvent novateur. C'est une pièce de caractère qui permet de se démarquer tout en restant fidèle à votre club. Un choix parfait pour ceux qui apprécient l'originalité sans compromettre l'authenticité.`,
  'third': `Le maillot third, ou troisième maillot, est traditionnellement le plus créatif de la collection. Avec des couleurs et des motifs qui sortent de l'ordinaire, il est devenu un véritable objet de mode apprécié bien au-delà des terrains de football.`,
  'retro': `Ce maillot rétro vous plonge dans la grande histoire du football. Inspiré des tenues légendaires qui ont marqué les esprits, il marie nostalgie et modernité grâce à une coupe actuelle et des matériaux contemporains. Un hommage parfait aux grandes heures du club.`,
  'training': `Le maillot d'entraînement est conçu pour la performance au quotidien. Léger et respirant, il est idéal pour vos sessions sportives tout en arborant les couleurs de votre équipe favorite. Son tissu technique évacue efficacement la transpiration.`,
  'goalkeeper': `Le maillot de gardien de but est une pièce unique dans toute collection. Couleurs distinctives et design spécifique, il rend hommage au poste le plus atypique du football. Un choix original pour les supporters qui veulent se démarquer.`,
  'special': `Cette édition spéciale est produite en nombre limité. Son design exclusif et ses finitions haut de gamme en font une pièce de collection prisée. Un choix idéal pour les collectionneurs et les fans qui recherchent l'unicité.`,
};

const CALL_TO_ACTION_PARAGRAPHS = [
  (name: string, price: number) =>
    `Disponible sur KitFootball au prix de ${price}€, le ${name} est livré rapidement partout en Europe. Ne manquez pas l'occasion d'enrichir votre vestiaire sportif avec un maillot premium à prix accessible. Commandez dès maintenant et recevez votre colis en quelques jours.`,
  (name: string, price: number) =>
    `Au tarif de ${price}€, ce maillot offre un rapport qualité-prix exceptionnel. La livraison est rapide et sécurisée partout en France et en Europe. Profitez de notre service client réactif et d'un suivi de commande en temps réel.`,
  (name: string, price: number) =>
    `Commandez le ${name} dès aujourd'hui au prix de ${price}€. Livraison express disponible. Échanges et retours facilités. Rejoignez les milliers de supporters satisfaits qui ont choisi KitFootball pour leurs équipements.`,
];

// ==========================================
// MAIN GENERATORS
// ==========================================

function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0;
  }
  return Math.abs(hash);
}

export function generateDescriptions(
  name: string,
  club: string,
  type: ProductType,
  typeDisplay: string,
  season: string,
  isKids: boolean,
  isWomens: boolean,
  isPlayer: boolean,
  isNational: boolean,
  isRetro: boolean,
  isSpecial: boolean,
): { shortDescription: string; longDescription: string } {
  const hash = simpleHash(name);
  const shortDescription = getShortDescription(name, club, season, hash);

  // Build long description from multiple paragraphs
  const intro = INTRO_PARAGRAPHS[hash % INTRO_PARAGRAPHS.length](name, club);
  const quality = QUALITY_PARAGRAPHS[(hash + 1) % QUALITY_PARAGRAPHS.length](type);
  const typeParagraph = TYPE_PARAGRAPHS[type] || TYPE_PARAGRAPHS['home']!;
  const cta = CALL_TO_ACTION_PARAGRAPHS[(hash + 2) % CALL_TO_ACTION_PARAGRAPHS.length](name, 29);

  let extras = '';
  if (isKids) {
    extras += `\n\nCette version enfant reprend le design du maillot adulte dans des tailles adaptées aux jeunes supporters. Un cadeau parfait pour les passionnés en herbe qui veulent ressembler à leurs idoles.`;
  }
  if (isWomens) {
    extras += `\n\nLa coupe féminine de ce maillot a été spécifiquement adaptée pour un confort optimal et un tombé élégant. Les tailles vont du S au XXL pour s'adapter à toutes les morphologies.`;
  }
  if (isPlayer) {
    extras += `\n\nLa version Player de ce maillot est identique à celle portée par les joueurs professionnels. Coupe ajustée, tissu technique Vaporknit ou Dri-FIT ADV, et finitions ultraprécises pour une expérience au plus proche du terrain.`;
  }
  if (isNational) {
    extras += `\n\nPorter les couleurs de sa sélection nationale est un acte de fierté et d'identité. Ce maillot vous permet de soutenir votre équipe lors des grandes compétitions internationales : Coupe du Monde, Euro, Copa América et bien d'autres.`;
  }

  const longDescription = `${intro}\n\n${quality}\n\n${typeParagraph}${extras}\n\n${cta}`;

  return { shortDescription, longDescription };
}

// ==========================================
// FAQ GENERATOR
// ==========================================

export function generateFAQ(
  name: string,
  club: string,
  type: string,
  season: string,
  isKids: boolean,
): { q: string; a: string }[] {
  const faq: { q: string; a: string }[] = [];

  faq.push({
    q: `Quelles tailles sont disponibles pour le ${name} ?`,
    a: isKids
      ? `Ce maillot enfant est disponible dans les tailles 16 à 28, adaptées aux jeunes supporters de 4 à 14 ans environ. Consultez notre guide des tailles pour choisir la taille idéale.`
      : `Ce maillot est disponible du S au 4XL selon les stocks. Nous vous recommandons de consulter notre guide des tailles pour trouver votre coupe parfaite. En cas de doute, prenez une taille au-dessus.`,
  });

  faq.push({
    q: `Quel est le délai de livraison pour ce maillot ?`,
    a: `La livraison standard prend généralement entre 5 et 12 jours ouvrés en France métropolitaine. Une option de livraison express est disponible pour recevoir votre commande plus rapidement. Un numéro de suivi vous est communiqué dès l'expédition.`,
  });

  faq.push({
    q: `Ce maillot est-il une réplique officielle ?`,
    a: `Nos maillots sont des répliques de très haute qualité, fidèles au design officiel. Ils sont fabriqués avec des matériaux premium pour garantir un rendu visuel et un confort comparables aux versions officielles, à un prix bien plus accessible.`,
  });

  if (club && club !== 'Autres') {
    faq.push({
      q: `Puis-je personnaliser ce maillot avec un flocage ?`,
      a: `Oui, le flocage personnalisé est disponible pour ce maillot. Vous pouvez choisir un nom et un numéro de joueur officiel ou vos propres initiales. Le service de flocage est proposé en option lors de la commande.`,
    });
  }

  return faq;
}
