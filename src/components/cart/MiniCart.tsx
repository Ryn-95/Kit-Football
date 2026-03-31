"use client";

import { useCart } from "../../context/CartContext";
import { X, Minus, Plus, ShoppingBag, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function MiniCart() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, totalPrice } = useCart();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFastCheckout = async () => {
    try {
      setIsProcessing(true);
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const { url, error } = await response.json();

      if (error) {
        console.error(error);
        setIsProcessing(false);
        return;
      }

      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Error redirecting to checkout:", err);
      setIsProcessing(false);
    }
  };

  if (!mounted) return null;

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />
      
      <div className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col transform transition-transform duration-300">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-heading font-black italic uppercase">Votre Panier</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <ShoppingBag size={64} className="text-gray-200" />
              <p className="text-gray-500 font-medium">Votre panier est vide</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="bg-black text-white px-8 py-3 font-bold uppercase tracking-wider hover:bg-[var(--color-brand-volt)] hover:text-black transition-colors"
              >
                Continuer mes achats
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b pb-6">
                  <div className="relative w-24 h-24 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-sm leading-tight">{item.name}</h3>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    <div className="text-xs text-gray-500 space-y-0.5 mb-3">
                      <p>Taille : <span className="font-bold text-black">{item.size}</span></p>
                      <p>Version : <span className="font-bold text-black">{item.version}</span></p>
                      {item.flocage && <p>Flocage : <span className="font-bold text-black">{item.flocage}</span></p>}
                    </div>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border rounded">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="font-bold">{(item.price).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t bg-gray-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-bold text-gray-600">Sous-total</span>
              <span className="text-2xl font-black">{totalPrice.toFixed(2)} €</span>
            </div>
            <button 
              onClick={handleFastCheckout}
              disabled={isProcessing}
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-brand-volt)] text-black py-4 font-bold uppercase tracking-wider hover:bg-black hover:text-[var(--color-brand-volt)] transition-colors shadow-[0_4px_14px_0_rgba(204,255,0,0.3)] disabled:opacity-70"
            >
              {isProcessing ? "Redirection..." : "Paiement Rapide"}
              {!isProcessing && <Lock size={18} />}
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-medium uppercase tracking-widest">
              Paiement 100% sécurisé via Stripe
            </p>
          </div>
        )}
      </div>
    </>
  );
}