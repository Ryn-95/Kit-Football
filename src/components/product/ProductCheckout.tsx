'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Minus, Plus, ShoppingBag, CreditCard, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface ProductCheckoutProps {
  product: any;
}

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCheckout({ product }: ProductCheckoutProps) {
  const { addItem, setIsCartOpen } = useCart();
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [version, setVersion] = useState<'Fan' | 'Player'>('Fan');
  const [flocage, setFlocage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Prix calculé
  const finalPrice = product.price + (version === 'Player' ? 10 : 0) + (flocage.trim() !== '' ? 5 : 0);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Veuillez sélectionner une taille.');
      return;
    }
    
    setError('');
    
    addItem({
      productId: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      size: selectedSize,
      version: version,
      flocage: flocage.trim() !== '' ? flocage : undefined,
      quantity: quantity
    });
  };

  const handleCheckout = async () => {
    if (!selectedSize) {
      setError('Veuillez sélectionner une taille.');
      return;
    }
    
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product: { ...product, price: finalPrice },
          size: selectedSize,
          quantity,
          version,
          flocage: flocage.trim() !== '' ? flocage : undefined,
        }),
      });

      const session = await response.json();

      if (response.ok) {
        window.location.href = session.url;
      } else {
        setError(session.error || 'Erreur lors de la création de la session de paiement');
      }
    } catch (err: any) {
      setError('Une erreur est survenue.');
    } finally {
      setIsLoading(false);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const incrementQuantity = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <div className="flex flex-col space-y-8 mt-6">
      
      {/* Version du Maillot */}
      <div>
        <span className="font-bold uppercase tracking-widest text-sm text-gray-900 mb-3 block">Version du maillot</span>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setVersion('Fan')}
            className={`py-3 px-4 text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
              version === 'Fan' 
                ? 'border-black bg-black text-white' 
                : 'border-gray-300 bg-white text-gray-900 hover:border-black'
            }`}
          >
            <span>Fan (Standard)</span>
            <span className={version === 'Fan' ? 'text-gray-300 font-normal text-xs' : 'text-gray-500 font-normal text-xs'}>Coupe classique</span>
          </button>
          <button
            onClick={() => setVersion('Player')}
            className={`py-3 px-4 text-sm font-bold border transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
              version === 'Player' 
                ? 'border-black bg-black text-white' 
                : 'border-gray-300 bg-white text-gray-900 hover:border-black'
            }`}
          >
            <span>Player (+10€)</span>
            <span className={version === 'Player' ? 'text-gray-300 font-normal text-xs' : 'text-gray-500 font-normal text-xs'}>Coupe cintrée pro</span>
          </button>
        </div>
      </div>

      {/* Sélecteur de Taille */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold uppercase tracking-widest text-sm text-gray-900">Tailles disponibles <span className="text-red-500">*</span></span>
          <button className="text-xs text-gray-500 underline hover:text-black transition-colors">Guide des tailles</button>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {SIZES.map((size) => (
            <button
              key={size}
              onClick={() => {
                setSelectedSize(size);
                setError('');
              }}
              className={`py-3 text-sm font-bold border transition-all duration-200 ${
                selectedSize === size 
                  ? 'border-black bg-black text-white' 
                  : 'border-gray-300 bg-white text-gray-900 hover:border-black'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Flocage Personnalisé */}
      <div>
        <span className="font-bold uppercase tracking-widest text-sm text-gray-900 mb-3 block">Flocage personnalisé (+5€)</span>
        <input 
          type="text" 
          placeholder="Ex: MBAPPÉ 10" 
          value={flocage}
          onChange={(e) => setFlocage(e.target.value)}
          className="w-full border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-400 uppercase"
          maxLength={15}
        />
        <p className="text-xs text-gray-500 mt-2">Laissez vide si vous ne souhaitez pas de flocage.</p>
      </div>

      {/* Prix final & Quantité */}
      <div className="flex items-end justify-between bg-gray-50 p-4 border border-gray-100">
        <div>
          <span className="font-bold uppercase tracking-widest text-xs text-gray-500 block mb-1">Prix total</span>
          <span className="text-2xl font-black">{finalPrice * quantity} €</span>
        </div>
        
        <div>
          <span className="font-bold uppercase tracking-widest text-xs text-gray-500 mb-1 block text-center">Quantité</span>
          <div className="flex items-center border border-gray-300 w-28 h-10 bg-white">
            <button 
              onClick={decrementQuantity}
              className="w-8 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Minus size={14} />
            </button>
            <div className="flex-1 flex items-center justify-center font-bold text-gray-900 text-sm">
              {quantity}
            </div>
            <button 
              onClick={incrementQuantity}
              className="w-8 h-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
      
      {error && <p className="text-red-600 text-sm font-medium bg-red-50 p-3 border border-red-100">{error}</p>}

      {/* Boutons d'Achat */}
      <div className="space-y-3 pt-2">
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-2 bg-white text-black border-2 border-black h-14 font-bold uppercase tracking-widest hover:bg-gray-50 transition-colors"
        >
          <ShoppingBag size={20} />
          Ajouter au panier
        </button>
        
        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 bg-black text-white h-14 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <CreditCard size={20} />
              Acheter maintenant
            </>
          )}
        </button>
      </div>

      {/* Réassurances */}
      <div className="border border-gray-200 p-5 mt-6 flex flex-col gap-4 bg-white shadow-sm">
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <Truck className="text-gray-900 mt-0.5" size={18} />
          <div>
            <span className="font-bold block text-gray-900">Livraison suivie offerte</span>
            <span className="text-gray-500">Expédition sous 24/48h.</span>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm text-gray-700">
          <ShieldCheck className="text-gray-900 mt-0.5" size={18} />
          <div>
            <span className="font-bold block text-gray-900">Paiement 100% sécurisé</span>
            <span className="text-gray-500">Cartes Bancaires, Apple Pay, Google Pay, Klarna, PayPal.</span>
          </div>
        </div>
      </div>
    </div>
  );
}