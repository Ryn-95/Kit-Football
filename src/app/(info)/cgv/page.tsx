import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales de Vente | KIT FOOTBALL",
  description: "Consultez les conditions générales de vente de la boutique KIT FOOTBALL : prix, commandes, paiements et droit de rétractation.",
};

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-6 max-w-[800px] prose prose-lg">
        <h1 className="text-4xl font-heading font-black italic uppercase mb-8">Conditions Générales de Vente</h1>
        
        <p>Les présentes conditions générales de vente s'appliquent à toutes les commandes passées sur la boutique KIT FOOTBALL.</p>

        <h3>1. Prix</h3>
        <p>Les prix de nos produits sont indiqués en euros toutes taxes comprises (TVA et autres taxes applicables au jour de la commande), sauf indication contraire et hors frais de traitement et d'expédition.</p>

        <h3>2. Commandes</h3>
        <p>Vous pouvez passer commande sur notre site internet. KIT FOOTBALL se réserve le droit de ne pas enregistrer un paiement, et de ne pas confirmer une commande pour quelque raison que ce soit.</p>

        <h3>3. Paiement</h3>
        <p>Le fait de valider votre commande implique pour vous l'obligation de payer le prix indiqué. Le règlement de vos achats s'effectue par carte bancaire ou PayPal via des systèmes sécurisés.</p>

        <h3>4. Rétractation</h3>
        <p>Conformément aux dispositions légales, vous disposez d'un délai de rétractation de 14 jours à compter de la réception de vos produits pour exercer votre droit de rétraction. <strong>Exception :</strong> Les produits personnalisés (flocage nom/numéro sur demande) ne sont pas éligibles au droit de rétractation.</p>
      </div>
    </div>
  );
}