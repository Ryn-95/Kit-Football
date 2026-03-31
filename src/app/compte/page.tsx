"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, Heart, LogOut } from "lucide-react";

export default function ComptePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 pb-24 flex items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100 w-full max-w-[400px]">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[var(--color-brand-volt)] rounded-full flex items-center justify-center">
              <User size={32} className="text-black" />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-black italic uppercase text-center mb-2">Connexion</h1>
          <p className="text-gray-500 text-center mb-8 text-sm">Accédez à votre espace personnel</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-black"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 block">Mot de passe</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:border-black"
                placeholder="••••••••"
              />
            </div>
            <div className="flex justify-end">
              <Link href="#" className="text-xs text-gray-400 hover:text-black">Mot de passe oublié ?</Link>
            </div>
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-[var(--color-brand-volt)] hover:text-black transition-colors disabled:opacity-50"
            >
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Pas encore de compte ? <Link href="#" className="text-black font-bold hover:underline">Créer un compte</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-100">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-lg">
                  {email.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <p className="font-bold text-sm truncate w-32">{email || "Utilisateur"}</p>
                  <p className="text-xs text-gray-400">Membre Standard</p>
                </div>
              </div>
              <nav className="space-y-2">
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 text-black font-bold text-sm">
                  <Package size={18} /> Mes Commandes
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-black font-bold text-sm transition-colors">
                  <User size={18} /> Mon Profil
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-black font-bold text-sm transition-colors">
                  <MapPin size={18} /> Mes Adresses
                </a>
                <a href="#" className="flex items-center gap-3 p-3 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-black font-bold text-sm transition-colors">
                  <Heart size={18} /> Liste d'envies
                </a>
                <button 
                  onClick={() => setIsLoggedIn(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg text-red-500 hover:bg-red-50 font-bold text-sm transition-colors mt-4"
                >
                  <LogOut size={18} /> Déconnexion
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="text-3xl font-heading font-black italic uppercase mb-8">Mes Commandes</h1>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 text-center">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package size={32} className="text-gray-300" />
                </div>
                <h3 className="font-bold text-lg mb-2">Aucune commande pour le moment</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Vous n'avez pas encore passé de commande sur notre boutique. Découvrez nos nouveautés et trouvez le maillot de vos rêves !</p>
                <Link 
                  href="/collections"
                  className="inline-block bg-[var(--color-brand-volt)] text-black font-bold uppercase tracking-wider py-3 px-8 rounded-xl hover:bg-black hover:text-[var(--color-brand-volt)] transition-colors"
                >
                  Voir la boutique
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}