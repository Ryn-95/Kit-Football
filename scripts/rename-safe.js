const fs = require('fs');
const path = require('path');
const slugify = require('slugify');

const maillotsDir = path.join(__dirname, '../public/maillots');

function renameToSafePaths() {
  if (!fs.existsSync(maillotsDir)) {
    console.error('Dossier maillots non trouvé');
    return;
  }

  const folders = fs.readdirSync(maillotsDir).filter(f => {
    return fs.statSync(path.join(maillotsDir, f)).isDirectory();
  });

  console.log(`Traitement de ${folders.length} dossiers...`);

  folders.forEach(folder => {
    const oldFolderPath = path.join(maillotsDir, folder);
    
    // 1. Rename files inside the folder first
    const files = fs.readdirSync(oldFolderPath);
    files.forEach(file => {
      const oldFilePath = path.join(oldFolderPath, file);
      if (fs.statSync(oldFilePath).isFile()) {
        const ext = path.extname(file);
        const nameWithoutExt = path.basename(file, ext);
        const safeFileName = slugify(nameWithoutExt, { lower: true, strict: true }) + ext.toLowerCase();
        
        if (file !== safeFileName) {
          const newFilePath = path.join(oldFolderPath, safeFileName);
          try {
            fs.renameSync(oldFilePath, newFilePath);
          } catch (err) {
            console.error(`Erreur renommage fichier: ${file} -> ${safeFileName}`, err);
          }
        }
      }
    });

    // 2. Rename the folder itself
    const safeFolderName = slugify(folder, { lower: true, strict: true });
    if (folder !== safeFolderName) {
      const newFolderPath = path.join(maillotsDir, safeFolderName);
      
      // Handle potential collisions
      let finalFolderPath = newFolderPath;
      if (fs.existsSync(finalFolderPath) && oldFolderPath !== finalFolderPath) {
        let counter = 1;
        while (fs.existsSync(`${newFolderPath}-${counter}`)) {
          counter++;
        }
        finalFolderPath = `${newFolderPath}-${counter}`;
      }

      try {
        fs.renameSync(oldFolderPath, finalFolderPath);
        // console.log(`Renommé dossier: ${folder} -> ${path.basename(finalFolderPath)}`);
      } catch (err) {
        console.error(`Erreur renommage dossier: ${folder} -> ${safeFolderName}`, err);
      }
    }
  });

  console.log('Renommage terminé.');
}

renameToSafePaths();
