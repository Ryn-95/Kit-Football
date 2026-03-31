"use client";

import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, Lock, CreditCard } from "lucide-react";
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error(error);
        setIsProcessing(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Error redirecting to checkout:", err);
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-24">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold mb-6">Votre panier est vide</h1>
          <Link href="/collections" className="text-blue-600 underline">Continuer vos achats</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-heading font-black italic uppercase mb-8">Paiement Sécurisé</h2>
              
              <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }} className="space-y-8">
                {/* Shipping Info is now handled by Stripe Checkout */}
                <div className="space-y-4">
                  <p className="text-gray-600 bg-gray-50 p-4 rounded-xl text-sm leading-relaxed border border-gray-100">
                    En cliquant sur <strong>Payer avec Stripe</strong>, vous serez redirigé vers l'interface de paiement sécurisée de Stripe. 
                    Vous pourrez y renseigner vos informations de livraison et choisir votre méthode de paiement (Carte Bancaire, Apple Pay, Google Pay).
                  </p>
                </div>

                <button 
                  type="submit" 
                  disabled={isProcessing}
                  className="w-full bg-[var(--color-brand-volt)] text-black py-5 rounded-xl font-heading font-black italic uppercase tracking-wider text-xl hover:bg-black hover:text-[var(--color-brand-volt)] transition-colors flex items-center justify-center gap-3 shadow-[0_4px_14px_0_rgba(204,255,0,0.3)]"
                >
                  {isProcessing ? "Redirection..." : `Payer ${totalPrice.toFixed(2)} € avec Stripe`}
                  {!isProcessing && <Lock size={20} />}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
              <h3 className="font-bold text-xl mb-6">Résumé de la commande</h3>
              
              <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="relative w-16 h-16 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-gray-500">Taille: {item.size} | {item.version}</p>
                      {item.flocage && <p className="text-xs text-[var(--color-brand-volt)] font-bold">{item.flocage}</p>}
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{(item.price).toFixed(2)} €</p>
                      <p className="text-xs text-gray-500">Qté: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className="text-green-600 font-bold">Gratuite</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t">
                  <span>Total</span>
                  <span>{totalPrice.toFixed(2)} €</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <ShieldCheck className="text-green-600 flex-shrink-0" size={20} />
                  <span>Paiement 100% sécurisé via Stripe</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Truck className="text-blue-600 flex-shrink-0" size={20} />
                  <span>Expédition sous 24/48h avec suivi</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}