export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white py-24">
      <div className="container mx-auto px-6 max-w-[800px]">
        <h1 className="text-4xl md:text-5xl font-heading font-black italic uppercase mb-12">Foire aux questions</h1>
        
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-bold uppercase mb-2">Quels sont les délais de livraison ?</h3>
            <p className="text-gray-600">Nos délais de livraison standard sont de 7 à 12 jours ouvrés pour la France métropolitaine. Une fois votre commande expédiée, vous recevrez un numéro de suivi par e-mail.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold uppercase mb-2">Les maillots sont-ils authentiques ?</h3>
            <p className="text-gray-600">Nous proposons deux gammes : la gamme Réplica (Fan) et la gamme Authentic (Player). Tous nos maillots sont neufs, étiquetés et d'une qualité premium irréprochable.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-2">Comment taille la version Player ?</h3>
            <p className="text-gray-600">La version Player est cintrée et près du corps. Nous vous recommandons vivement de prendre une taille au-dessus de votre taille habituelle pour un port confortable.</p>
          </div>

          <div>
            <h3 className="text-xl font-bold uppercase mb-2">Puis-je retourner ma commande ?</h3>
            <p className="text-gray-600">Vous disposez d'un délai de 14 jours après réception pour nous retourner un article non porté, avec son étiquette d'origine. Attention, les maillots avec un flocage personnalisé ne peuvent être ni repris ni échangés.</p>
          </div>
        </div>
      </div>
    </div>
  );
}