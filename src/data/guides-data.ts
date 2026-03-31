export interface Guide {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  datePublished: string;
  authorName: string;
  heroImage: string;
  content: string; // HTML or Markdown
}

export const GUIDES: Guide[] = [
  {
    slug: "authentic-vs-replica",
    title: "Différence entre Maillot Authentic (Pro) et Réplica (Fan) : Le Guide",
    metaTitle: "Différence Maillot Authentic vs Replica | Fan vs Player | KIT FOOTBALL",
    metaDescription: "Tout savoir sur les différences entre un maillot version Authentic (Player) et Replica (Fan). Coupe, tissu, prix, comment bien choisir son maillot de foot.",
    category: "Guide d'Achat",
    datePublished: "2025-01-15T08:00:00+01:00",
    authorName: "Équipe KIT FOOTBALL",
    heroImage: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>1. Introduction : Fan ou Player ?</h2>
      <p>Lorsque vous achetez un maillot de football, vous êtes souvent confronté à un choix crucial : opter pour la version <strong>Réplica (Fan)</strong> ou la version <strong>Authentic (Player)</strong>. Ce guide vous explique en détail les différences pour vous aider à faire le bon choix.</p>
      
      <h2>2. La Version Réplica (Fan)</h2>
      <p>Contrairement à ce que son nom pourrait laisser penser, le terme "Réplica" ne désigne pas une contrefaçon. Il s'agit du maillot officiel destiné aux supporters.</p>
      <ul>
        <li><strong>Coupe :</strong> Plus ample et décontractée, idéale pour un usage quotidien.</li>
        <li><strong>Tissu :</strong> Tissu respirant standard (comme le Nike Dri-FIT classique ou l'Adidas AEROREADY). Plus résistant aux lavages fréquents.</li>
        <li><strong>Logos :</strong> Les écussons et logos des sponsors sont généralement brodés ou cousus.</li>
        <li><strong>Prix :</strong> Plus abordable, généralement autour de 90€ à 100€.</li>
      </ul>

      <h2>3. La Version Authentic (Player)</h2>
      <p>C'est le maillot exact porté par les joueurs professionnels sur le terrain.</p>
      <ul>
        <li><strong>Coupe :</strong> Très ajustée (slim fit) pour éviter les tirages de maillot. Il est souvent conseillé de prendre une taille au-dessus.</li>
        <li><strong>Tissu :</strong> Ultra-léger, extensible et doté des dernières technologies d'évacuation de la transpiration (Nike Dri-FIT ADV, Adidas HEAT.RDY).</li>
        <li><strong>Logos :</strong> Les logos sont thermocollés (imprimés à chaud) pour réduire le poids et éviter les frottements sur la peau.</li>
        <li><strong>Prix :</strong> Plus cher, généralement entre 140€ et 150€.</li>
      </ul>

      <h2>4. Quel maillot choisir ?</h2>
      <p>Si vous cherchez un maillot confortable pour aller au stade, regarder le match entre amis ou pour un usage quotidien, la version <strong>Réplica</strong> est parfaite. Si vous jouez régulièrement, que vous voulez la meilleure technologie possible ou que vous êtes un collectionneur exigeant, optez pour la version <strong>Authentic</strong>.</p>
    `
  },
  {
    slug: "guide-des-tailles-marques",
    title: "Comment choisir sa taille de maillot selon la marque ?",
    metaTitle: "Guide des Tailles Maillots de Foot : Nike, Adidas, Puma | KIT FOOTBALL",
    metaDescription: "Ne vous trompez plus de taille ! Découvrez notre guide complet pour choisir la bonne taille de maillot selon les équipementiers : Nike, Adidas, Puma.",
    category: "Guide des Tailles",
    datePublished: "2025-02-10T10:00:00+01:00",
    authorName: "Équipe KIT FOOTBALL",
    heroImage: "https://images.unsplash.com/photo-1555008872-f03b347ffb53?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>1. Introduction</h2>
      <p>Chaque équipementier taille différemment. Un maillot taille M chez Nike ne correspondra pas forcément à un taille M chez Kappa ou Macron. Voici les règles d'or pour ne plus vous tromper.</p>

      <h2>2. Les Maillots Nike</h2>
      <p>Nike a tendance à tailler de manière standard sur ses versions Fan, mais très près du corps sur les versions Player.</p>
      <ul>
        <li><strong>Version Fan :</strong> Prenez votre taille habituelle.</li>
        <li><strong>Version Player (Authentic) :</strong> Prenez systématiquement une taille au-dessus de votre taille habituelle.</li>
      </ul>

      <h2>3. Les Maillots Adidas</h2>
      <p>Adidas taille généralement un peu plus grand et plus long que Nike.</p>
      <ul>
        <li><strong>Version Fan :</strong> Votre taille habituelle conviendra parfaitement, avec un rendu légèrement ample.</li>
        <li><strong>Version Player (Authentic) :</strong> Coupe cintrée en V. Prenez une taille au-dessus si vous avez un peu de ventre, sinon votre taille habituelle peut suffire si vous aimez le port très ajusté.</li>
      </ul>

      <h2>4. Les Maillots Puma</h2>
      <p>Puma est réputé pour ses coupes très (très) moulantes, particulièrement sur les modèles haut de gamme.</p>
      <ul>
        <li><strong>Version Fan :</strong> Taille habituelle, coupe standard.</li>
        <li><strong>Version Player (Authentic) :</strong> Coupe extrêmement moulante. Il est impératif de prendre au moins une taille au-dessus.</li>
      </ul>

      <h2>5. Les autres marques (Macron, Kappa, Castore)</h2>
      <p>Les marques italiennes (Kappa, Macron) taillent traditionnellement très petit. Nous recommandons de prendre <strong>une à deux tailles au-dessus</strong> pour ces équipementiers, surtout pour les maillots Kombat de Kappa.</p>
    `
  },
  {
    slug: "entretien-maillot-flocage",
    title: "Comment entretenir et laver son maillot de foot floqué ?",
    metaTitle: "Laver et Entretenir un Maillot de Foot Floqué | Le Guide KIT FOOTBALL",
    metaDescription: "Astuces et conseils pour laver votre maillot de foot floqué sans l'abîmer. Température, essorage, repassage : gardez vos maillots comme neufs.",
    category: "Conseils",
    datePublished: "2025-03-01T09:00:00+01:00",
    authorName: "Équipe KIT FOOTBALL",
    heroImage: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>Les 5 Règles d'Or pour laver un maillot floqué</h2>
      <p>Rien de pire que de voir le flocage de son joueur préféré se décoller ou s'effriter après quelques lavages. Voici comment l'éviter :</p>
      
      <ol>
        <li><strong>Laver à l'envers :</strong> C'est la règle absolue. Retournez toujours votre maillot avant de le mettre en machine pour protéger les flocages et les patchs du frottement contre le tambour.</li>
        <li><strong>Laver à froid (30°C maximum) :</strong> L'eau chaude fait fondre la colle des flocages thermocollés. Utilisez toujours un programme froid ou à 30°C.</li>
        <li><strong>Pas d'adoucissant :</strong> L'adoucissant obstrue les pores des tissus respirants (Dri-FIT, etc.) et détruit les propriétés techniques de votre maillot.</li>
        <li><strong>Pas de sèche-linge :</strong> Le sèche-linge est l'ennemi mortel du flocage. Laissez sécher votre maillot à l'air libre, sur un cintre.</li>
        <li><strong>Ne jamais repasser sur le flocage :</strong> Si vous devez repasser votre maillot, faites-le à l'envers, à très basse température, et ne passez jamais le fer sur les zones floquées.</li>
      </ol>
    `
  },
  {
    slug: "top-maillots-coupe-du-monde-2026",
    title: "Top 10 des Maillots les plus attendus pour la Coupe du Monde 2026",
    metaTitle: "Maillots Coupe du Monde 2026 : Le Top 10 | KIT FOOTBALL",
    metaDescription: "Découvrez les maillots les plus attendus pour la Coupe du Monde 2026. France, Brésil, Argentine, USA... Les designs qui vont marquer le tournoi.",
    category: "Tendances",
    datePublished: "2025-03-20T10:00:00+01:00",
    authorName: "Équipe KIT FOOTBALL",
    heroImage: "https://images.unsplash.com/photo-1574629810360-7efbb1925846?auto=format&fit=crop&q=80&w=1200",
    content: `
      <h2>L'événement footballistique de la décennie</h2>
      <p>La Coupe du Monde 2026 organisée conjointement par les États-Unis, le Mexique et le Canada promet d'être spectaculaire. Et qui dit Coupe du Monde, dit nouveaux maillots exceptionnels. Voici notre top 10 des tuniques les plus attendues.</p>

      <h2>1. L'Équipe de France (Nike)</h2>
      <p>Après l'échec de 2022, les Bleus reviennent avec un maillot au bleu plus électrique, rendant hommage aux grandes épopées nord-américaines.</p>

      <h2>2. Le Brésil (Nike)</h2>
      <p>Le jaune et le vert mythiques revisités avec des motifs subtils inspirés de l'Amazonie.</p>

      <h2>3. Les États-Unis (Nike)</h2>
      <p>En tant que pays hôte principal, la Team USA bénéficiera d'un traitement de faveur avec un design audacieux et patriote.</p>
    `
  }
];