import { Metadata } from 'next';
import { getProductBySlug } from '@/lib/catalog';
import Link from 'next/link';
import { ImageWithFallback } from '@/components/ui/ImageWithFallback';

export const metadata: Metadata = {
  title: 'Commander | KitFootball',
  description: 'Finalisez la commande de votre maillot de football.',
  robots: { index: false, follow: false },
};

export default function CommandePage({ searchParams }: { searchParams: { product?: string } }) {
  const product = searchParams.product ? getProductBySlug(searchParams.product) : null;

  return (
    <div className="container mx-auto px-6 py-10 max-w-4xl min-h-[60vh]">
      <h1 className="text-3xl font-black uppercase mb-8" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
        Formulaire de commande
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Form */}
        <div className="w-full md:w-2/3">
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Prénom</label>
                <input type="text" className="w-full border border-gray-300 p-3 focus:border-black outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Nom</label>
                <input type="text" className="w-full border border-gray-300 p-3 focus:border-black outline-none" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Email</label>
              <input type="email" className="w-full border border-gray-300 p-3 focus:border-black outline-none" required />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Adresse de livraison</label>
              <input type="text" className="w-full border border-gray-300 p-3 focus:border-black outline-none" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">Code Postal</label>
                <input type="text" className="w-full border border-gray-300 p-3 focus:border-black outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Ville</label>
                <input type="text" className="w-full border border-gray-300 p-3 focus:border-black outline-none" required />
              </div>
            </div>

            {product && (
              <div>
                <label className="block text-sm font-bold mb-2">Taille souhaitée</label>
                <select className="w-full border border-gray-300 p-3 focus:border-black outline-none" required>
                  <option value="">Sélectionnez une taille</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2">Demande de flocage (Optionnel)</label>
              <input type="text" placeholder="Ex: ZIDANE 10" className="w-full border border-gray-300 p-3 focus:border-black outline-none" />
            </div>

            <button type="submit" className="w-full bg-black text-white font-bold py-4 uppercase tracking-widest hover:bg-gray-800 transition-colors">
              Valider la commande
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 bg-gray-50 p-6 h-fit">
          <h2 className="font-bold uppercase tracking-widest mb-6 border-b border-gray-200 pb-4">Résumé</h2>
          
          {product ? (
            <div className="flex gap-4 mb-6 border-b border-gray-200 pb-6">
              <div className="w-20 h-24 relative bg-white flex-shrink-0">
                <ImageWithFallback src={product.image} alt={product.name} fill className="object-cover mix-blend-multiply" />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.team}</p>
                </div>
                <p className="font-bold">{product.price} €</p>
              </div>
            </div>
          ) : (
            <div className="mb-6 border-b border-gray-200 pb-6 text-sm text-gray-500">
              Aucun produit sélectionné.
            </div>
          )}

          <div className="flex justify-between items-center mb-4 text-sm">
            <span>Sous-total</span>
            <span>{product ? `${product.price} €` : '0 €'}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-sm">
            <span>Livraison</span>
            <span className="text-green-600 font-bold">Gratuite</span>
          </div>
          
          <div className="flex justify-between items-center font-bold text-lg pt-4 border-t border-gray-200">
            <span>Total</span>
            <span>{product ? `${product.price} €` : '0 €'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
