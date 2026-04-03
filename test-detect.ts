import { scanCatalog } from './src/lib/catalog-scanner';
const p = scanCatalog().find(x => x.folderName.includes('ac-milan-black-and-red'));
console.log(p);
