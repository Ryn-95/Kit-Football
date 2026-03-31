import { getAllProducts, TOP_CLUBS, TOP_NATIONS } from '@/lib/catalog';
import MaillotsClient from '@/components/catalog/MaillotsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Catalogue des Maillots - KitFootball',
  description: 'Découvrez notre catalogue complet de maillots de football : Top Clubs, Nations, Rétro et plus encore.',
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
