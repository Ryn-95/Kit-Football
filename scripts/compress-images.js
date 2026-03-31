const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const maillotsDir = path.join(process.cwd(), 'public', 'maillots');

// Check if ImageMagick is available
try {
  execSync('which convert', { stdio: 'ignore' });
} catch {
  console.log('ImageMagick not found. Installing via brew...');
  try {
    execSync('brew install imagemagick', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to install ImageMagick. Please install manually: brew install imagemagick');
    process.exit(1);
  }
}

console.log('Starting image compression...');
console.log('This will take several minutes for 1000 folders...\n');

const folders = fs.readdirSync(maillotsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

let processed = 0;
let totalSizeBefore = 0;
let totalSizeAfter = 0;

for (const folder of folders) {
  const folderPath = path.join(maillotsDir, folder);
  const files = fs.readdirSync(folderPath);
  
  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;
    
    const filePath = path.join(folderPath, file);
    const stats = fs.statSync(filePath);
    totalSizeBefore += stats.size;
    
    try {
      // Compress with ImageMagick: resize to max 800px width, 85% quality
      execSync(`convert "${filePath}" -resize 800x800\\> -quality 85 "${filePath}"`, { stdio: 'ignore' });
      
      const newStats = fs.statSync(filePath);
      totalSizeAfter += newStats.size;
      processed++;
      
      if (processed % 100 === 0) {
        const savedMB = ((totalSizeBefore - totalSizeAfter) / 1024 / 1024).toFixed(2);
        console.log(`Processed ${processed} images... Saved ${savedMB}MB so far`);
      }
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  }
}

const savedMB = ((totalSizeBefore - totalSizeAfter) / 1024 / 1024).toFixed(2);
const beforeGB = (totalSizeBefore / 1024 / 1024 / 1024).toFixed(2);
const afterMB = (totalSizeAfter / 1024 / 1024).toFixed(2);

console.log(`\n✅ Compression complete!`);
console.log(`   Before: ${beforeGB}GB`);
console.log(`   After: ${afterMB}MB`);
console.log(`   Saved: ${savedMB}MB`);
console.log(`   Processed: ${processed} images`);
