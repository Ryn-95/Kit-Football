const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const maillotsDir = path.join(process.cwd(), 'public', 'maillots');

console.log('Quick optimization: keeping only first image per folder...\n');

const folders = fs.readdirSync(maillotsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let processed = 0;

async function optimizeFolder(folder) {
  const folderPath = path.join(maillotsDir, folder);
  const files = fs.readdirSync(folderPath)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort();
  
  if (files.length === 0) return;
  
  // Keep only first image, delete others
  for (let i = 1; i < files.length; i++) {
    fs.unlinkSync(path.join(folderPath, files[i]));
  }
  
  // Compress the first image
  const firstImage = path.join(folderPath, files[0]);
  try {
    const buffer = await sharp(firstImage)
      .resize(600, 600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, progressive: true })
      .toBuffer();
    
    fs.writeFileSync(firstImage, buffer);
    processed++;
    
    if (processed % 100 === 0) {
      console.log(`Processed ${processed}/${folders.length}...`);
    }
  } catch (error) {
    console.error(`Error with ${folder}:`, error.message);
  }
}

async function processAll() {
  const batchSize = 20;
  for (let i = 0; i < folders.length; i += batchSize) {
    const batch = folders.slice(i, i + batchSize);
    await Promise.all(batch.map(optimizeFolder));
  }
  
  console.log(`\n✅ Optimized ${processed} folders`);
  
  const { execSync } = require('child_process');
  const size = execSync('du -sh public/maillots/').toString().split('\t')[0];
  console.log(`New size: ${size}`);
}

processAll().catch(console.error);
