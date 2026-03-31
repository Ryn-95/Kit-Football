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

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json(
      { error: error.message || 'Une erreur est survenue lors de la création de la session de paiement' },
      { status: 500 }
    );
  }
}