"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

export function ProductAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items: AccordionItem[] = [
    {
      title: "Détails du Produit",
      content: "Maillot officiel coupe premium. Tissu respirant avec technologie d'évacuation de l'humidité. Laver en machine à l'eau froide avec des couleurs similaires, sécher à l'air libre. Ne pas repasser sur le flocage."
    },
    {
      title: "Livraison & Retours",
      content: "La livraison standard est gratuite à partir de 100€ d'achat. Expédition sous 24/48h. Retours acceptés dans un délai de 30 jours à condition que l'article n'ait pas été porté ni lavé (hors articles floqués sur mesure)."
    },
    {
      title: "Garantie Authenticité",
      content: "Chez KIT FOOTBALL, nous garantissons l'authenticité de tous nos maillots. Nos produits proviennent des circuits de distribution agréés et validés par les marques."
    }
  ];

  return (
    <div className="border-t border-gray-100 mt-12">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border-b border-gray-100">
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
            >
              <span className="text-sm font-bold uppercase tracking-wide text-black group-hover:text-[var(--color-brand-volt)] transition-colors">{item.title}</span>
              {isOpen ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}
            >
              <p className="text-gray-500 text-sm leading-relaxed">{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
