import { getAllProducts } from '@/lib/catalog';
import { Product } from '@/types';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const products = getAllProducts();
  
  const baseUrl = 'https://kitsfootball.fr';

  const generateXmlProduct = (product: Product) => {
    // Escape XML special characters
    const escapeXml = (unsafe: string) => {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    };

    const title = escapeXml(product.name);
    
    // Default description if none provided
    const description = escapeXml(
      product.shortDescription || 
      product.longDescription || 
      `Découvrez le ${product.name}. Parfait pour tous les fans de ${product.team || 'football'}. Qualité premium.`
    );
    
    const link = `${baseUrl}/maillots/${product.slug}`;
    const imageLink = `${baseUrl}${product.image}`;
    
    // Some products have a specific price depending on version (Player edition usually 34, normal 29)
    // We assume the base price is correct, ensuring it's formatted to two decimal places
    const price = `${(product.price || 29.99).toFixed(2)} EUR`;

    // Extract brand from team, otherwise default to KitsFootball
    const brand = escapeXml(product.team || 'KitsFootball');
    
    // Unique product ID based on slug or id
    const id = escapeXml(product.slug || product.id);
    
    // Category mapping: Adultes or Enfants
    const gender = product.isWomens ? 'female' : 'unisex'; // Approximation
    const ageGroup = product.isKids ? 'kids' : 'adult';
    const googleProductCategory = '178'; // 178 = Apparel & Accessories > Clothing > Activewear > Football Shirts
    
    return `
    <item>
      <g:id>${id}</g:id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${link}</g:link>
      <g:image_link>${imageLink}</g:image_link>
      <g:availability>in_stock</g:availability>
      <g:price>${price}</g:price>
      <g:condition>new</g:condition>
      <g:brand>${brand}</g:brand>
      <g:google_product_category>${googleProductCategory}</g:google_product_category>
      <g:gender>${gender}</g:gender>
      <g:age_group>${ageGroup}</g:age_group>
      <g:identifier_exists>no</g:identifier_exists>
    </item>`;
  };

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Kits Football</title>
    <link>${baseUrl}</link>
    <description>Boutique de maillots de football vintage et actuels à prix réduit.</description>
    ${products.map(generateXmlProduct).join('')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
