const { getAllProducts } = require('../src/lib/catalog');
const products = getAllProducts();
console.log(`Nombre total de produits : ${products.length}`);
if (products.length > 0) {
  console.log('Exemple de produit (les 5 premiers) :');
  products.slice(0, 5).forEach(p => {
    console.log(`- ${p.name} | Folder: ${p.folderName} | Image: ${p.image}`);
  });
}
