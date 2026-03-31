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
  description: 'Boutique n°1 en France pour acheter vos maillots de football au meilleur prix. Maillots officiels, survêtements, flocage officiel Ligue 1, Premier League, Liga. Livraison 48h Europe.',
  keywords: 'maillot de foot pas cher, maillot de foot france, survêtement foot, flocage maillot, maillot equipe de france, football shirts, camisetas de futbol, maglie calcio, trikots',
  authors: [{ name: 'KIT FOOTBALL' }],
  metadataBase: new URL('https://kitfootball.com'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',    // France (Principal)
      'fr-BE': '/be',    // Belgique Francophone
      'fr-CH': '/ch',    // Suisse Francophone
      'en-GB': '/uk',    // Royaume-Uni
      'es-ES': '/es',    // Espagne
      'it-IT': '/it',    // Italie
      'de-DE': '/de',    // Allemagne
    },
  },
  openGraph: {
    title: 'KIT FOOTBALL | Boutique N°1 Maillots de Football',
    description: 'Achetez vos maillots de football au meilleur prix. Maillots Coupe du Monde, survêtements et éditions Premium. Qualité joueur et flocage officiel.',
    url: 'https://kitfootball.com',
    siteName: 'KIT FOOTBALL',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KIT FOOTBALL - Maillots de football',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KIT FOOTBALL | Maillots de Football & Survêtements',
    description: 'Boutique n°1 de maillots de football. Qualité joueur, flocage officiel et livraison rapide.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      noimageindex: false,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // TODO: Add real code
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
              "image": "https://kitfootball.com/og-image.jpg",
              "description": "Boutique N°1 en France : Maillots de foot pas chers, qualité joueur, flocage officiel et livraison rapide 48h partout en Europe (France, Belgique, Suisse, UK).",
              "url": "https://kitfootball.com",
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
                "lowPrice": "19.99",
                "highPrice": "129.99",
                "offerCount": "5000"
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
