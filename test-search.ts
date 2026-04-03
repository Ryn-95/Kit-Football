import { scanCatalog } from './src/lib/catalog-scanner';
const p = scanCatalog().find(x => x.name.toLowerCase().includes('acffiorentinasxxl'));
console.log(p);
