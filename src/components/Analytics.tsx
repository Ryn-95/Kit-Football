'use client';

import { useEffect } from 'react';

export function Analytics() {
  useEffect(() => {
    // On s'assure de ne pas spammer le bot à chaque rechargement de page, 
    // on envoie une notif de visite unique par session utilisateur
    if (!sessionStorage.getItem('visited')) {
      sessionStorage.setItem('visited', 'true');
      
      // Récupérer les infos du visiteur
      const visitorInfo = {
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        language: navigator.language,
        platform: navigator.platform,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timestamp: new Date().toLocaleString('fr-FR', { 
          timeZone: 'Europe/Paris',
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      };
      
      const message = `🌐 <b>Nouveau visiteur sur KIT FOOTBALL!</b>
      
📅 <b>Heure:</b> ${visitorInfo.timestamp}
🌍 <b>Localisation:</b> ${visitorInfo.timezone}
💻 <b>Appareil:</b> ${visitorInfo.platform}
📱 <b>Écran:</b> ${visitorInfo.screenResolution}
🌐 <b>Langue:</b> ${visitorInfo.language}
${visitorInfo.referrer ? `🔗 <b>Provenance:</b> ${visitorInfo.referrer}` : '🔗 <b>Provenance:</b> Accès direct'}

🛍️ <b>Boutique active!</b> Prêt pour les achats`;

      fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      }).catch(console.error);
    }
  }, []);

  return null;
}