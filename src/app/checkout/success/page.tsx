"use client";

import { useEffect, useState, Suspense } from "react";
import { useCart } from "../../../context/CartContext";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const { clearCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    setMounted(true);
    // If we have a session ID, the payment was successful, so we clear the cart
    if (sessionId) {
      clearCart();
      
      // Envoi de la notification Telegram (une seule fois par session)
      if (!sessionStorage.getItem(`paid_${sessionId}`)) {
        sessionStorage.setItem(`paid_${sessionId}`, 'true');
        
        const timestamp = new Date().toLocaleString('fr-FR', { 
          timeZone: 'Europe/Paris',
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        const message = `🎉🎉🎉 <b>PAIEMENT VALIDÉ AVEC SUCCÈS!</b> 🎉🎉🎉
        
💰 <b>VENTE CONFIRMÉE!</b>
📅 <b>Date:</b> ${timestamp}
🔖 <b>Transaction ID:</b> ${sessionId?.slice(0, 25)}...

🏆 <b>Mission accomplie!</b> Le client a terminé son achat.
📦 <b>Préparez la commande!</b> Vérifiez les détails dans Stripe.

💳 <b>Statut:</b> PAYÉ ✅
🚀 <b>Action:</b> Préparez l'envoi!`;

        console.log('🚀 Envoi notification succès:', message.substring(0, 100) + '...');

        fetch('/api/telegram', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        }).then(response => {
          console.log('✅ Réponse API succès:', response.status, response.statusText);
          return response.json();
        }).then(data => {
          console.log('📦 Données réponse succès:', data);
        }).catch(error => {
          console.error('❌ Erreur notification succès:', error);
        });
      }
    }
  }, [sessionId, clearCart]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <div className="w-24 h-24 bg-[var(--color-brand-volt)] rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(204,255,0,0.3)]">
          <CheckCircle2 size={48} className="text-black" />
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-black italic uppercase mb-4">
          Commande Validée !
        </h1>
        <p className="text-gray-500 font-bold mb-8 uppercase tracking-widest text-sm">
          Numéro de transaction : {sessionId?.slice(0, 15)}...
        </p>
        <p className="text-xl text-gray-600 mb-12 leading-relaxed">
          Merci pour votre achat chez KIT FOOTBALL. Vous allez recevoir un email de confirmation d'ici quelques minutes avec le récapitulatif de votre commande et les informations de livraison.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/compte"
            className="w-full sm:w-auto bg-black text-white px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors rounded-xl"
          >
            Suivre ma commande
          </Link>
          <Link 
            href="/collections"
            className="w-full sm:w-auto bg-white text-black border-2 border-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors rounded-xl"
          >
            Retour à la boutique
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white pt-32 pb-24 flex justify-center"><div className="w-8 h-8 border-4 border-[var(--color-brand-volt)] border-t-transparent rounded-full animate-spin"></div></div>}>
      <SuccessContent />
    </Suspense>
  );
}
