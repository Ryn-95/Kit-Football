#!/usr/bin/env node
// ==========================================
// FILTER BAD IMAGES SCRIPT
// Scans /public/maillots/ and detects invalid images
// Run: node scripts/filter-bad-images.js
// ==========================================

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const MAILLOTS_DIR = path.join(__dirname, '..', 'public', 'maillots');
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'invalid-images.json');

const MIN_WIDTH = 200;
const MIN_HEIGHT = 200;
const MIN_SIZE_KB = 20;

async function checkImage(imagePath) {
  try {
    const stats = fs.statSync(imagePath);
    const sizeKb = stats.size / 1024;

    if (sizeKb < MIN_SIZE_KB) {
      return { path: imagePath, valid: false, reason: `trop_petite_${Math.round(sizeKb)}KB` };
    }

    const meta = await sharp(imagePath).metadata();
    const width = meta.width || 0;
    const height = meta.height || 0;

    if (width < MIN_WIDTH || height < MIN_HEIGHT) {
      return { path: imagePath, valid: false, reason: `resolution_trop_basse_${width}x${height}` };
    }

    const ratio = width / height;
    if (ratio > 2.5 || ratio < 0.3) {
      return { path: imagePath, valid: false, reason: `ratio_suspect_${ratio.toFixed(2)}` };
    }

    return { path: imagePath, valid: true };
  } catch (e) {
    return { path: imagePath, valid: false, reason: 'lecture_impossible' };
  }
}

async function main() {
  if (!fs.existsSync(MAILLOTS_DIR)) {
    console.error('❌ Dossier /public/maillots/ introuvable');
    process.exit(1);
  }

  const productDirs = fs.readdirSync(MAILLOTS_DIR)
    .map(d => path.join(MAILLOTS_DIR, d))
    .filter(d => {
      try { return fs.statSync(d).isDirectory(); } catch { return false; }
    });

  console.log(`📂 ${productDirs.length} dossiers produits trouvés`);

  let valid = 0;
  let invalid = 0;
  const badImages = [];

  for (const dir of productDirs) {
    const images = fs.readdirSync(dir)
      .filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f))
      .map(f => path.join(dir, f));

    for (const img of images) {
      const check = await checkImage(img);
      if (check.valid) {
        valid++;
      } else {
        invalid++;
        // Store as relative URL path (matching what catalog.ts generates)
        const relativePath = '/' + path.relative(path.join(__dirname, '..', 'public'), img);
        badImages.push(relativePath);
        // Only log first 50 to avoid spam
        if (invalid <= 50) {
          console.log(`❌ ${path.relative(MAILLOTS_DIR, img)} — ${check.reason}`);
        }
      }
    }
  }

  // Ensure output directory exists
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(badImages, null, 2));

  console.log(`\n✅ ${valid} images valides`);
  console.log(`❌ ${invalid} images invalides → listées dans src/data/invalid-images.json`);
}

main().catch(err => {
  console.error('Erreur:', err);
  process.exit(1);
});
