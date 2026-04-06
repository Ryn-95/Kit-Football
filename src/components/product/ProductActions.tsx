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
  // LIGUE 1
  "paris-saint-germain": ["MBAPPE", "DEMBELE", "BARCOLA", "ZAIRE-EMERY", "MARQUINHOS", "HAKIMI"],
  psg: ["MBAPPE", "DEMBELE", "BARCOLA", "ZAIRE-EMERY", "MARQUINHOS"],
  "marseille": ["AUBAMEYANG", "CLAUSS", "HARIT", "VERETOUT", "MBEMBA"],
  "om": ["AUBAMEYANG", "CLAUSS", "HARIT", "VERETOUT", "MBEMBA"],
  "lyon": ["LACAZETTE", "CHERKI", "TOLISSO", "CAQUERET", "MATIC"],
  "ol": ["LACAZETTE", "CHERKI", "TOLISSO", "CAQUERET", "MATIC"],
  "monaco": ["BEN YEDDER", "GOLOVIN", "MINAMINO", "FOFANA", "ZAKARIA"],
  "lens": ["SOTOCA", "MEDINA", "DANSO", "FRANKOWSKI", "SAMED"],
  "lille": ["DAVID", "GOMES", "YORO", "ANDRE", "CHEVALIER"],

  // PREMIER LEAGUE
  "arsenal": ["SAKA", "ODEGAARD", "RICE", "MARTINELLI", "SALIBA", "GABRIEL"],
  "chelsea": ["PALMER", "ENZO", "GALLAGHER", "JAMES", "SILVA"],
  "liverpool": ["SALAH", "VAN DIJK", "NUNEZ", "DIAZ", "ALEXANDER-ARNOLD", "MAC ALLISTER"],
  "manchester-city": ["HAALAND", "DE BRUYNE", "FODEN", "RODRI", "SILVA", "DIAS"],
  "manchester-united": ["BRUNO", "RASHFORD", "GARNACHO", "MAINOO", "MARTINEZ", "HOJLUND"],
  "tottenham": ["SON", "MADDISON", "ROMERO", "KULUSEVSKI", "RICHARLISON"],
  "newcastle": ["ISAK", "GORDON", "BRUNO G.", "TRIPPIER", "BOTMAN"],

  // LIGA
  "real-madrid": ["BELLINGHAM", "VINICIUS JR", "RODRYGO", "VALVERDE", "CAMAVINGA", "MODRIC", "KROOS"],
  "fc-barcelona": ["LEWANDOWSKI", "YAMAL", "PEDRI", "GAVI", "DE JONG", "ARAUJO"],
  "barcelona": ["LEWANDOWSKI", "YAMAL", "PEDRI", "GAVI", "DE JONG", "ARAUJO"],
  "atletico-madrid": ["GRIEZMANN", "MORATA", "KOKE", "DE PAUL", "OBLAK"],
  "atletico": ["GRIEZMANN", "MORATA", "KOKE", "DE PAUL", "OBLAK"],

  // SERIE A
  "juventus": ["VLAHOVIC", "CHIESA", "RABIOT", "BREMER", "LOCATELLI"],
  "ac-milan": ["LEAO", "GIROUD", "HERNANDEZ", "PULISIC", "MAIGNAN"],
  "milan": ["LEAO", "GIROUD", "HERNANDEZ", "PULISIC", "MAIGNAN"],
  "inter-milan": ["LAUTARO", "BARELLA", "THURAM", "CALHANOGLU", "BASTONI"],
  "inter": ["LAUTARO", "BARELLA", "THURAM", "CALHANOGLU", "BASTONI"],
  "as-roma": ["DYBALA", "LUKAKU", "PELLEGRINI", "MANCINI", "PAREDES"],
  "roma": ["DYBALA", "LUKAKU", "PELLEGRINI", "MANCINI", "PAREDES"],
  "napoli": ["OSIMHEN", "KVARATSKHELIA", "DI LORENZO", "ANGUISSA", "LOBOTKA"],

  // BUNDESLIGA
  "bayern-munich": ["KANE", "MUSIALA", "SANE", "KIMMICH", "MULLER", "DAVIES"],
  "bayern": ["KANE", "MUSIALA", "SANE", "KIMMICH", "MULLER", "DAVIES"],
  "borussia-dortmund": ["BRANDT", "FULLKRUG", "SANCHO", "CAN", "SCHLOTTERBECK"],
  "dortmund": ["BRANDT", "FULLKRUG", "SANCHO", "CAN", "SCHLOTTERBECK"],
  "bayer-leverkusen": ["WIRTZ", "FRIMPONG", "GRIMALDO", "XHAKA", "BONIFACE"],
  "leipzig": ["OPENDA", "SIMONS", "OLMO", "SCHLAGER", "ORBAN"],

  // NATIONS
  "france": ["MBAPPE", "GRIEZMANN", "DEMBELE", "GIROUD", "TCHOUAMENI", "HERNANDEZ"],
  "portugal": ["RONALDO", "BRUNO F.", "BERNARDO", "LEAO", "DIAS", "FELIX"],
  "argentina": ["MESSI", "DI MARIA", "ALVAREZ", "FERNANDEZ", "MAC ALLISTER", "MARTINEZ"],
  "brazil": ["VINICIUS JR", "RODRYGO", "NEYMAR JR", "RICHARLISON", "PAQUETA", "MARQUINHOS"],
  "spain": ["MORATA", "PEDRI", "GAVI", "YAMAL", "RODRI", "WILLIAMS"],
  "england": ["KANE", "BELLINGHAM", "SAKA", "FODEN", "RICE", "GREALISH"],
  "germany": ["MUSIALA", "WIRTZ", "KROOS", "GUNDOGAN", "HAVERTZ", "FULLKRUG"],
  "italy": ["CHIESA", "BARELLA", "DONNARUMMA", "DIMARCO", "PELLEGRINI"],
  "belgium": ["DE BRUYNE", "LUKAKU", "DOKU", "TROSSARD", "ONANA"],
  "netherlands": ["GAKPO", "SIMONS", "VAN DIJK", "DE LIGT", "DUMFRIES"],
  "pays-bas": ["GAKPO", "SIMONS", "VAN DIJK", "DE LIGT", "DUMFRIES"],
};

const getFlocageSuggestions = (teamName?: string, clubSlug?: string) => {
  const keys = [clubSlug, teamName].filter(Boolean).map((v) => normalizeKey(String(v)));
  for (const key of keys) {
    if (flocageSuggestionsByKey[key]) return flocageSuggestionsByKey[key].slice(0, 6);
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
  const [flocage, setFlocage] = useState<string>("none");
  const [customName, setCustomName] = useState("");
  const [customNumber, setCustomNumber] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const suggestedNames = getFlocageSuggestions(teamName, clubSlug);

  const sizes = ["S", "M", "L", "XL", "XXL", "3XL"];
  
  const currentPrice = product.price + (version === "Player" ? 5 : 0) + (flocage === "custom" ? 10 : 0);

  const handleAddToCart = () => {
    if (!size) {
      setError("Veuillez sélectionner une taille.");
      return;
    }
    if (flocage === "custom" && (!customName || !customNumber)) {
      setError("Veuillez renseigner le nom et le numéro pour le flocage personnalisé.");
      return;
    }
    
    setError("");
    
    let flocageText = undefined;
    if (flocage === "custom") flocageText = `${customName.toUpperCase()} - ${customNumber}`;

    addItem({
      productId: product.id,
      name: product.name,
      price: currentPrice,
      image: product.image,
      size,
      version,
      flocage: flocageText,
      quantity: quantity
    });
  };

  return (
    <div className="flex flex-col space-y-8">
      
      {/* Version Selection */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 w-16">VERSION</label>
          <div className="relative flex-1">
            <select 
              value={version}
              onChange={(e) => { setVersion(e.target.value as "Fan" | "Player"); }}
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black appearance-none bg-white cursor-pointer transition-colors"
            >
              <option value="Fan">Version Fan (Standard)</option>
              <option value="Player">Version Player Pro (+5€)</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>
      </div>

      {/* Size Selection (Dropdown style like Maxikits) */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-xs font-bold uppercase tracking-widest text-gray-500 w-16">TAILLE</label>
          <div className="relative flex-1">
            <select 
              value={size}
              onChange={(e) => { setSize(e.target.value); setError(""); }}
              className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black appearance-none bg-white cursor-pointer transition-colors"
            >
              <option value="" disabled>Choisir une option</option>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
            </div>
          </div>
        </div>
        <div className="ml-20 mt-2">
          <a href="/guides/guide-des-tailles-marques" className="inline-block bg-[#00b0ff] text-white text-xs font-bold px-4 py-2 hover:bg-[#0090d0] transition-colors">Guide des tailles</a>
        </div>
      </div>

      {/* Flocage / Patch (Only inputs if custom is selected, maybe simplify this) */}
      <div className="pt-4 border-t border-gray-100">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">Flocage (+10€)</label>
        <select 
          value={flocage}
          onChange={(e) => { setFlocage(e.target.value); setError(""); }}
          className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black appearance-none bg-white cursor-pointer mb-4"
        >
          <option value="none">Sans flocage</option>
          <option value="custom">Flocage Nom + Numéro personnalisé (+10€)</option>
        </select>

        {flocage === "custom" && (
          <div className="space-y-4 mt-4">
            {suggestedNames.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {suggestedNames.map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => { setCustomName(name); setError(""); }}
                    className={`px-3 py-1.5 text-xs font-bold border transition-colors ${
                      customName === name
                        ? "border-black bg-black text-white"
                        : "border-gray-200 bg-gray-50 text-gray-700 hover:border-black"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            <div>
              <label className="text-sm text-gray-700 mb-2 block">Nom</label>
              <input 
                type="text" 
                maxLength={12}
                value={customName}
                onChange={(e) => { setCustomName(e.target.value.toUpperCase()); setError(""); }}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black uppercase bg-white transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-gray-700 mb-2 block">Numéro</label>
              <input 
                type="number" 
                min="1" max="99"
                value={customNumber}
                onChange={(e) => { setCustomNumber(e.target.value); setError(""); }}
                className="w-full border border-gray-200 p-3 text-sm focus:outline-none focus:border-black bg-white transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {error && <p className="text-red-500 text-sm font-bold">{error}</p>}

      {/* Add to Cart Area (Quantity + Button) */}
      <div className="pt-6 flex items-center gap-4">
        <div className="flex border border-gray-200 h-12 w-32 shrink-0">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">-</button>
          <div className="flex-1 flex items-center justify-center font-bold text-sm">{quantity}</div>
          <button onClick={() => setQuantity(quantity + 1)} className="w-10 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">+</button>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex-1 h-12 bg-[#1a1a1a] hover:bg-black text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
        >
          AJOUTER AU PANIER
        </button>
      </div>

      {/* Meta info like Maxikits */}
      <div className="pt-6 border-t border-gray-100 flex flex-col gap-4">
        <div className="text-sm text-gray-500">
          Catégories : <a href="/maillots" className="text-gray-800 hover:underline">Maillots</a>, {teamName && <a href={`/maillots/club/${clubSlug}`} className="text-gray-800 hover:underline">{teamName}</a>}
        </div>
      </div>
    </div>
  );
}
