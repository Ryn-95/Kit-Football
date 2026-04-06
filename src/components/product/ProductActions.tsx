"use client";

import { useState } from "react";
import { ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "../../context/CartContext";

const normalizeKey = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const flocageSuggestionsByKey: Record<string, string[]> = {
  "as-roma": ["DYBALA", "PELLEGRINI", "MANCINI"],
  roma: ["DYBALA", "PELLEGRINI", "MANCINI"],
  psg: ["DEMBELE", "MARQUINHOS", "VITINHA"],
  "real-madrid": ["MBAPPE", "VINICIUS", "BELLINGHAM"],
  "fc-barcelona": ["LEWANDOWSKI", "PEDRI", "YAMAL"],
  barcelona: ["LEWANDOWSKI", "PEDRI", "YAMAL"],
  "manchester-city": ["HAALAND", "DE-BRUYNE", "FODEN"],
  "manchester-united": ["BRUNO", "GARNACHO", "RASHFORD"],
  arsenal: ["SAKA", "ODEGAARD", "RICE"],
  liverpool: ["SALAH", "VAN-DIJK", "ALEXANDER-ARNOLD"],
  chelsea: ["PALMER", "ENZO", "JACKSON"],
  "ac-milan": ["LEAO", "THEO", "MAIGNAN"],
  milan: ["LEAO", "THEO", "MAIGNAN"],
  "inter-milan": ["LAUTARO", "BARELLA", "BASTONI"],
  inter: ["LAUTARO", "BARELLA", "BASTONI"],
  juventus: ["VLAHOVIC", "CHIESA", "BREMER"],
  napoli: ["OSIMHEN", "KVARATSKHELIA", "DI-LORENZO"],
  "bayern-munich": ["KANE", "MUSIALA", "KIMMICH"],
  bayern: ["KANE", "MUSIALA", "KIMMICH"],
  "borussia-dortmund": ["BRANDT", "ADEYEMI", "CAN"],
  dortmund: ["BRANDT", "ADEYEMI", "CAN"],
  "atletico-madrid": ["GRIEZMANN", "MORATA", "DE-PAUL"],
  atletico: ["GRIEZMANN", "MORATA", "DE-PAUL"],
  "paris-saint-germain": ["DEMBELE", "MARQUINHOS", "VITINHA"],
  france: ["MBAPPE", "GRIEZMANN", "DEMBELE"],
  portugal: ["RONALDO", "BRUNO", "LEAO"],
  argentina: ["MESSI", "DI-MARIA", "LAUTARO"],
  brazil: ["VINICIUS", "RODRYGO", "MARQUINHOS"],
  spain: ["MORATA", "PEDRI", "OLMO"],
};

const getFlocageSuggestions = (teamName?: string, clubSlug?: string) => {
  const keys = [clubSlug, teamName].filter(Boolean).map((v) => normalizeKey(String(v)));
  for (const key of keys) {
    if (flocageSuggestionsByKey[key]) return flocageSuggestionsByKey[key].slice(0, 3);
  }
  return [];
};

export function ProductActions({
  product,
  teamName,
  clubSlug,
}: {
  product: { id: string; name: string; price: number; image: string; slug: string };
  teamName?: string;
  clubSlug?: string;
}) {
  const { addItem } = useCart();
  const [version, setVersion] = useState<"Fan" | "Player">("Fan");
  const [size, setSize] = useState<string>("");
  const [patch, setPatch] = useState<string>("none");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [error, setError] = useState("");
  const suggestedNames = getFlocageSuggestions(teamName, clubSlug);

  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
  
  const currentPrice = product.price + (version === "Player" ? 5 : 0) + (patch !== "none" ? 10 : 0);

  const handleAddToCart = () => {
    if (!size) {
      setError("Veuillez sélectionner une taille.");
      return;
    }
    if (patch === "custom" && (!customName || !customNumber)) {
      setError("Veuillez renseigner le nom et le numéro pour le flocage personnalisé.");
      return;
    }
    
    setError("");
    
    let flocageText = undefined;
    if (patch === "ligue1") flocageText = "Patch Championnat";
    if (patch === "champion") flocageText = "Patch LDC";
    if (patch === "custom") flocageText = `${customName.toUpperCase()} - ${customNumber}`;

    addItem({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      size,
      version,
      flocage: flocageText,
      quantity: 1
    });
  };

  return (
    <div className="flex flex-col space-y-8">
      
      {/* Version Selection */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <label className="text-sm font-bold uppercase tracking-wider text-black">Version du Maillot</label>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => setVersion("Fan")}
            className={`py-3 px-4 border rounded-xl text-sm font-bold transition-all ${version === "Fan" ? "border-[var(--color-brand-volt)] bg-[var(--color-brand-volt)]/10 text-black shadow-sm" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
          >
            Version Fan (Standard)
          </button>
          <button 
            onClick={() => setVersion("Player")}
            className={`py-3 px-4 border rounded-xl text-sm font-bold transition-all relative ${version === "Player" ? "border-[var(--color-brand-volt)] bg-[var(--color-brand-volt)]/10 text-black shadow-sm" : "border-gray-200 text-gray-500 hover:border-gray-300"}`}
          >
            Version Player Pro
            <span className="absolute -top-2 -right-2 bg-black text-white text-[9px] px-1.5 py-0.5 rounded-sm">+5€</span>
          </button>
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <div className="flex justify-between items-end mb-3">
          <label className="text-sm font-bold uppercase tracking-wider text-black">Taille <span className="text-red-500">*</span></label>
          <a href="/guides/guide-des-tailles-marques" className="text-xs text-blue-600 hover:underline">Guide des tailles</a>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {sizes.map((s) => (
            <button 
              key={s}
              onClick={() => { setSize(s); setError(""); }}
              className={`py-2 border rounded-lg text-sm font-bold transition-all ${size === s ? "border-black bg-black text-white" : "border-gray-200 text-gray-600 hover:border-black"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Patch Selection */}
      <div>
        <label className="text-sm font-bold uppercase tracking-wider text-black mb-3 block">Flocage / Patchs (+10€)</label>
        <select 
          value={patch}
          onChange={(e) => { setPatch(e.target.value); setError(""); }}
          className="w-full border border-gray-200 rounded-xl p-3 text-sm font-medium focus:outline-none focus:border-black appearance-none bg-white cursor-pointer"
        >
          <option value="none">Sans patch</option>
          <option value="ligue1">Patch Championnat officiel</option>
          <option value="champion">Patch Champions League</option>
          <option value="custom">Flocage Nom + Numéro personnalisé</option>
        </select>
      </div>

      {patch === "custom" && (
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
          {suggestedNames.length > 0 && (
            <div>
              <div className="text-xs font-bold text-gray-500 mb-2">Joueurs de {teamName}</div>
              <div className="flex flex-wrap gap-2">
                {suggestedNames.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { setCustomName(name); setError(""); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                      customName === name
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-white text-gray-700 hover:border-black"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">Nom</label>
              <input 
                type="text" 
                maxLength={12}
                placeholder={suggestedNames[0] || "VOTRE NOM"}
                value={customName}
                onChange={(e) => { setCustomName(e.target.value.toUpperCase()); setError(""); }}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-black uppercase bg-white"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 mb-1 block">Numéro</label>
              <input 
                type="number" 
                min="1" max="99"
                placeholder="10"
                value={customNumber}
                onChange={(e) => { setCustomNumber(e.target.value); setError(""); }}
                className="w-full border border-gray-200 rounded-lg p-2 text-sm focus:outline-none focus:border-black bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

      {/* Price & CTA */}
      <div className="pt-4 border-t border-gray-100 flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">Prix total calculé</span>
          <span className="font-heading font-black italic text-3xl text-black">{currentPrice.toFixed(2).replace('.', ',')}€</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="w-full bg-[var(--color-brand-volt)] hover:bg-[#b3e600] text-black font-heading font-black italic text-lg uppercase tracking-wide py-5 rounded-2xl flex items-center justify-center gap-3 transition-colors shadow-[0_4px_14px_0_rgba(204,255,0,0.39)]"
        >
          <ShoppingCart size={22} />
          Ajouter au panier
        </button>
      </div>

      {/* Micro-Trust / Re-assurances sous le bouton */}
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <ShieldCheck size={16} className="text-[var(--color-brand-volt)]" />
          Paiement crypté sécurisé
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
          <Truck size={16} className="text-[var(--color-brand-volt)]" />
          Livraison suivie garantie
        </div>
      </div>
    </div>
  );
}
