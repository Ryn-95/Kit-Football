import Link from "next/link";
import Image from "next/image";
import { Globe, DollarSign } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Column 1: Logo & Warning */}
          <div className="flex flex-col items-start space-y-4">
            <Link href="/" className="flex flex-col items-start group mb-2">
              <img 
                src="/logo_kit_football_sans_arriere_plan.png" 
                alt="Kit Football Logo" 
                className="h-16 w-auto object-contain"
              />
            </Link>
            <div className="text-gray-500 text-sm leading-relaxed max-w-xs">
              <strong className="text-gray-900 italic font-bold">Attention :</strong>
              <br />
              <i>Visitez uniquement le site officiel <strong>www.kitsfootball.fr</strong>. Faites attention aux URLs similaires qui pourraient compromettre votre sécurité personnelle.</i>
            </div>
          </div>

          {/* Column 2: Information & Catégories */}
          <div className="flex flex-col">
            <h4 className="text-[#111] font-bold text-lg mb-6">Navigation</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/maillots" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors font-bold">Tous les Maillots</Link></li>
              <li><Link href="/maillots/type/retro" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Maillots Rétro</Link></li>
              <li><Link href="/maillots/type/training" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Survêtements Foot</Link></li>
              <li><Link href="/maillots/club/psg" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Boutique PSG</Link></li>
              <li><Link href="/maillots/club/france" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Équipe de France</Link></li>
              <li><Link href="/guides" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Guides & Conseils</Link></li>
            </ul>
          </div>

          {/* Column 3: Aide & Légal */}
          <div className="flex flex-col">
            <h4 className="text-[#111] font-bold text-lg mb-6">Aide & Légal</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li><Link href="/faq" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">FAQ's</Link></li>
              <li><Link href="/compte" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Suivre ma commande</Link></li>
              <li><Link href="/cgv" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Conditions Générales de Vente</Link></li>
              <li><Link href="/cgv" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Politique de confidentialité</Link></li>
              <li><Link href="/cgv" className="hover:text-[var(--color-brand-volt)] hover:underline transition-colors">Mentions légales</Link></li>
            </ul>
          </div>

          {/* Column 4: Langue & Devise */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h4 className="text-[#111] font-bold text-lg mb-4">Langue</h4>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded p-3 text-sm text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:border-black">
                  <option value="fr">FR Français</option>
                  <option value="en">EN English</option>
                  <option value="es">ES Español</option>
                </select>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#111] font-bold text-lg mb-4">Devise</h4>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded p-3 text-sm text-gray-700 bg-white appearance-none cursor-pointer focus:outline-none focus:border-black">
                  <option value="EUR">€ Euro (EUR)</option>
                  <option value="USD">$ United States dollar (USD)</option>
                  <option value="GBP">£ British Pound (GBP)</option>
                </select>
              </div>
            </div>
          </div>

        </div>
        
        <div className="mt-16 pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
          <p>© 2026 KIT FOOTBALL. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {/* Payment icons placeholders */}
            <span className="opacity-50 hover:opacity-100 transition-opacity">VISA</span>
            <span className="opacity-50 hover:opacity-100 transition-opacity">MASTERCARD</span>
            <span className="opacity-50 hover:opacity-100 transition-opacity">PAYPAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
