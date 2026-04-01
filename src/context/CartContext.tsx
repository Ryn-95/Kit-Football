"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string; // product id + size + version
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  version: "Fan" | "Player";
  flocage?: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem("kitfootball_cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart");
      }
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("kitfootball_cart", JSON.stringify(items));
    }
  }, [items, isMounted]);

  const addItem = (newItem: Omit<CartItem, "id">) => {
    // Notification Telegram améliorée
    const timestamp = new Date().toLocaleString('fr-FR', { 
      timeZone: 'Europe/Paris',
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const message = `🛒 <b>ARTICLE AJOUTÉ AU PANIER!</b>
    
📅 <b>Heure:</b> ${timestamp}
📦 <b>Produit:</b> ${newItem.name}
📏 <b>Taille:</b> ${newItem.size}
✨ <b>Version:</b> ${newItem.version}${newItem.flocage ? `\n🎨 <b>Flocage:</b> ${newItem.flocage}` : ''}
💰 <b>Prix unitaire:</b> ${newItem.price}€
🔢 <b>Quantité:</b> ${newItem.quantity}
💳 <b>Total:</b> ${newItem.price * newItem.quantity}€

🎯 <b>Client intéressé!</b> Préparez-vous pour la vente!`;

    // Ajout de logs pour diagnostiquer
    console.log('🚀 Envoi notification Telegram:', message);
    
    fetch('/api/telegram', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    }).then(response => {
      console.log('✅ Réponse API Telegram:', response.status, response.statusText);
      return response.json();
    }).then(data => {
      console.log('📦 Données réponse:', data);
    }).catch(error => {
      console.error('❌ Erreur notification Telegram:', error);
    });

    setItems(current => {
      const generatedId = `${newItem.productId}-${newItem.version}-${newItem.size}-${newItem.flocage || 'none'}`;
      const existingItem = current.find(item => item.id === generatedId);
      
      if (existingItem) {
        return current.map(item => 
          item.id === generatedId 
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...current, { ...newItem, id: generatedId }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems(current => 
      current.map(item => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}