import { getAllProducts, TOP_CLUBS, TOP_NATIONS } from '@/lib/catalog';
import MaillotsClient from '@/components/catalog/MaillotsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Catalogue Maillots de Foot Pas Cher 29€ | 1000+ Modèles | KIT FOOTBALL',
  description: 'Découvrez notre catalogue complet de plus de 1000 maillots de football : Clubs, Nations, Rétro et versions Player. Qualité premium, prix imbattable 29€, livraison express 48h.',
  keywords: 'maillot de foot, maillot foot pas cher, boutique maillot foot, maillot psg, maillot real madrid, maillot retro, kit football',
  alternates: {
    canonical: 'https://www.kitsfootball.fr/maillots',
  },
};

export default function MaillotsPage() {
  const products = getAllProducts();

  return (
    <MaillotsClient 
      initialProducts={products} 
      topClubs={TOP_CLUBS} 
      topNations={TOP_NATIONS} 
    />
  );
}
