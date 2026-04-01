import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { CartProvider } from '../context/CartContext';
import { MiniCart } from '../components/cart/MiniCart';
import { Analytics } from '../components/Analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// We use Montserrat for headings as it looks very similar to the bold italic font in the screenshot
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '700', '800', '900']
});

export const metadata: Metadata = {
  title: {
    template: '%s | KIT FOOTBALL',
    default: 'KIT FOOTBALL | Maillots de Football, Survêtements & Équipements',
  },
  description: 'Boutique n°1 de maillots de football pas cher en France. Maillots PSG, Real Madrid, France à 29€. Qualité Premium, version Player 34€. Livraison express 48h. Plus de 1000 modèles en stock.',
  keywords: 'maillot de foot pas cher, maillot foot 29 euros, maillot psg pas cher, maillot real madrid, maillot barcelone, maillot france, maillot argentine, player edition, maillot foot 2024, maillot foot 2025, survêtement foot, flocage maillot, maillot equipe de france, maillot manchester city, maillot liverpool, maillot bayern munich, maillot retro, kit football',
  authors: [{ name: 'KIT FOOTBALL' }],
  metadataBase: new URL('https://www.kitsfootball.fr'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/',
    },
  },
  openGraph: {
    title: 'KIT FOOTBALL | Maillots Foot Pas Cher 29€ - Boutique Officielle',
    description: 'Achetez vos maillots de foot 2024-25 au meilleur prix (29€). PSG, Real, Barça, France. Qualité premium, livraison 48h express.',
    url: 'https://www.kitsfootball.fr',
    siteName: 'KIT FOOTBALL',
    images: [
      {
        url: 'https://www.kitsfootball.fr/herosection.jpg',
        width: 1200,
        height: 630,
        alt: 'KIT FOOTBALL - Maillots de football haute qualité',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KIT FOOTBALL | Maillots de Foot à 29€',
    description: 'Le plus grand choix de maillots de foot pas cher en France. Livraison rapide 48h.',
    images: ['https://www.kitsfootball.fr/herosection.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'VOTRE_CODE_GOOGLE_SEARCH_CONSOLE', // Remplacer par le code fourni par Google Search Console
  },
  other: {
    'google-site-verification': 'VOTRE_CODE_GOOGLE_SEARCH_CONSOLE', // Alternative format
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${montserrat.variable} bg-white text-gray-900`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsStore",
              "name": "KIT FOOTBALL",
              "image": "https://www.kitsfootball.fr/herosection.jpg",
              "description": "Boutique N°1 en France : Maillots de foot à 29€, Player Edition à 34€. Plus de 1000 modèles disponibles : PSG, Real Madrid, Barça, France, Argentine. Livraison rapide 48h partout en Europe.",
              "url": "https://www.kitsfootball.fr",
              "telephone": "+33100000000",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Champs-Élysées",
                "addressLocality": "Paris",
                "postalCode": "75008",
                "addressCountry": "FR"
              },
              "priceRange": "€€",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "12480"
              },
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "EUR",
                "lowPrice": "29",
                "highPrice": "34",
                "offerCount": "100"
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday"
                ],
                "opens": "00:00",
                "closes": "23:59"
              },
              "sameAs": [
                "https://www.instagram.com/kitfootball",
                "https://www.tiktok.com/@kitfootball",
                "https://twitter.com/kitfootball"
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Analytics />
          <Header />
          <MiniCart />
          <main className="flex-1 w-full relative">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
