import { ShieldCheck, Truck, Headphones, RotateCcw } from "lucide-react";
import React from "react";

export default function TrustBanner() {
  const elements = [
    { 
      icon: <ShieldCheck size={32} />, 
      title: "Paiement sécurisé", 
      desc: "Données bancaires traitées en\nexterne" 
    },
    { 
      icon: <Truck size={32} />, 
      title: "Expédition à domicile", 
      desc: "Livraison avec tracking\nSuivez votre colis en temps réel" 
    },
    { 
      icon: <Headphones size={32} />, 
      title: "Service client réactif", 
      desc: "Chatbot 24/7 + Support mail\nRéponse en quelques heures" 
    },
    { 
      icon: <RotateCcw size={32} />, 
      title: "Livraison gratuite", 
      desc: "À partir de 100€ TTC selon\ndestination" 
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 text-center">
          {elements.map((item, i) => (
            <div key={i} className="flex flex-col items-center justify-start group cursor-pointer">
              <div className="w-20 h-20 rounded-full border border-gray-100 bg-white flex items-center justify-center shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_10px_30px_rgba(204,255,0,0.3)] group-hover:border-[var(--color-brand-volt)] mb-6">
                {React.cloneElement(item.icon, { className: "text-[#111] group-hover:text-[var(--color-brand-volt)] transition-colors duration-500" })}
              </div>
              <h4 className="text-[#111] font-heading font-black italic uppercase text-lg mb-3 tracking-tight group-hover:text-[var(--color-brand-volt)] transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
