const fs = require('fs');
const path = require('path');

const maillotsDir = path.join(__dirname, '../public/maillots');
const outputFile = path.join(__dirname, '../src/data/maillots-catalog.json');

if (!fs.existsSync(maillotsDir)) {
  console.log('Maillots directory not found, skipping catalog generation');
  process.exit(0);
}

const folders = fs.readdirSync(maillotsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const catalog = folders.map(folder => {
  const folderPath = path.join(maillotsDir, folder);
  const files = fs.readdirSync(folderPath);
  const images = files
    .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
    .map(f => `/maillots/${folder}/${f}`)
    .sort((a, b) => {
      const aIsMain = a.includes('_1.') ? -1 : 0;
      const bIsMain = b.includes('_1.') ? -1 : 0;
      if (aIsMain !== bIsMain) return aIsMain - bIsMain;
      return a.localeCompare(b, undefined, { numeric: true });
    });

  return {
    folderName: folder,
    images: images
  };
}).filter(item => item.images.length > 0);

fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2));
console.log(`✅ Generated catalog with ${catalog.length} maillots`);
