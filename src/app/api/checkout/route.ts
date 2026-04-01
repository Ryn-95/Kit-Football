import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia' as any,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product, size, quantity, version, flocage, items } = body;
    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    let line_items: any[] = [];
    let orderMetadata: Record<string, string> = {};

    if (items && items.length > 0) {
      // Cart checkout
      const cartSummary = items.map((item: any) => 
        `${item.quantity}x ${item.name} (${item.size}, ${item.version || 'Fan'}${item.flocage && item.flocage !== 'none' ? `, Flocage: ${item.flocage}` : ''})`
      ).join(' | ');

      orderMetadata = {
        type_commande: 'Panier Multiple',
        details: cartSummary.substring(0, 500) // Stripe metadata value limit is 500 chars
      };

      line_items = items.map((item: any) => {
        const descriptionDetails = [
          `Taille: ${item.size}`,
          `Version: ${item.version || 'Fan'}`,
          item.flocage && item.flocage !== 'none' ? `Flocage: ${item.flocage}` : null
        ].filter(Boolean).join(' | ');

        const fullImageUrl = item.image.startsWith('http') ? item.image : `${origin}${item.image}`;
        // Encodage de l'URL pour gérer les espaces et vérification localhost
        const isLocalhost = origin.includes('localhost');
        
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: item.name,
              images: isLocalhost ? [] : [encodeURI(fullImageUrl)],
              description: descriptionDetails,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        };
      });
    } else if (product && size && quantity) {
      // Direct checkout
      const unitAmount = Math.round(product.price * 100);
      
      const descriptionDetails = [
        `Taille: ${size}`,
        `Version: ${version || 'Fan'}`,
        flocage ? `Flocage: ${flocage}` : null
      ].filter(Boolean).join(' | ');

      orderMetadata = {
        produit: product.name,
        taille: size,
        version: version || 'Fan',
        flocage: flocage || 'Aucun',
        quantite: quantity.toString()
      };

      const fullImageUrl = product.image.startsWith('http') ? product.image : `${origin}${product.image}`;
      const isLocalhost = origin.includes('localhost');

      line_items = [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: product.name,
              images: isLocalhost ? [] : [encodeURI(fullImageUrl)],
              description: descriptionDetails,
            },
            unit_amount: unitAmount,
          },
          quantity: quantity,
        },
      ];
    } else {
      return NextResponse.json(
        { error: 'Données de paiement manquantes' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'link', 'klarna'],
      line_items,
      mode: 'payment',
      shipping_address_collection: {
        allowed_countries: ['FR', 'BE', 'CH', 'LU', 'DE', 'ES', 'IT', 'GB'],
      },
      payment_intent_data: {
        metadata: orderMetadata,
      },
      metadata: orderMetadata,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: items ? `${origin}/checkout` : `${origin}/maillots/${product?.slug}`,
    });

    // Notification Telegram pour l'arrivée sur la page de paiement
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    
    if (botToken && chatId) {
      try {
        const timestamp = new Date().toLocaleString('fr-FR', { 
          timeZone: 'Europe/Paris',
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
        
        const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Inconnue';
        const userAgent = request.headers.get('user-agent') || 'Inconnu';
        
        let orderDetails = '';
        let totalAmount = 0;
        
        if (items && items.length > 0) {
          totalAmount = Math.round(items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0));
          orderDetails = items.map((item: any, index: number) => 
            `${index + 1}. ${item.quantity}x ${item.name} (${item.size}, ${item.version || 'Fan'}) - ${item.price * item.quantity}€`
          ).join('\n');
        } else if (product) {
          totalAmount = Math.round(product.price * quantity);
          orderDetails = `${quantity}x ${product.name} (${size}, ${version || 'Fan'}) - ${totalAmount}€`;
        }

        const message = `💳 <b>CLIENT SUR POINT DE PAYER!</b>

📅 <b>Heure:</b> ${timestamp}
🌍 <b>IP:</b> ${clientIP}

� <b>Commande:</b>
${orderDetails}

💰 <b>MONTANT TOTAL:</b> ${totalAmount}€
🎯 <b>STATUT:</b> En attente de paiement

⚡ Préparez-vous!`;

        await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'HTML',
          }),
        });
      } catch (e) {
        console.error('Erreur notification Telegram:', e);
      }
    }

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('❌ Stripe Checkout Error:', error);
    if (error.message?.includes('API key')) {
      console.error('⚠️ CONSEIL: Votre clé Stripe semble invalide ou non chargée. Vérifiez votre fichier .env et redémarrez le serveur.');
    }
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue lors de la création de la session de paiement', details: error },
      { status: 500 }
    );
  }
}