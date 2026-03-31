'use client';

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // On s'assure de ne pas spammer le bot à chaque rechargement de page, 
    // on envoie une notif de visite unique par session utilisateur
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      
      fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: '👀 <b>Nouvelle visite sur le site !</b>\nQuelqu\'un vient de se connecter à la boutique.' 
        })
      }).catch(console.error);
    }
  }, []);

  return null;
}