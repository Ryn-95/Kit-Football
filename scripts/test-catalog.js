const { getAllProducts } = require('./src/lib/catalog');
const products = getAllProducts();
console.log(`Nombre total de produits détectés : ${products.length}`);
if (products.length > 0) {
  console.log('Exemple de produit :', JSON.stringify(products[0], null, 2));
}
