const fs = require('fs');
const path = require('path');

const maillotsDir = path.join(process.cwd(), 'public', 'maillots');

function cleanupImages() {
  if (!fs.existsSync(maillotsDir)) {
    console.log('Dossier maillots non trouvé');
    return;
  }

  const folders = fs.readdirSync(maillotsDir).filter(f => {
    return fs.statSync(path.join(maillotsDir, f)).isDirectory();
  });

  console.log(`Traitement de ${folders.length} dossiers...`);

  folders.forEach(folder => {
    const folderPath = path.join(maillotsDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => {
      return /\.(jpg|jpeg|png|webp|gif)$/i.test(f);
    });

    if (files.length > 1) {
      // Garder seulement la première image
      const imageToKeep = files[0];
      const imagesToDelete = files.slice(1);

      imagesToDelete.forEach(img => {
        try {
          fs.unlinkSync(path.join(folderPath, img));
        } catch (err) {
          console.error(`Erreur lors de la suppression de ${img} dans ${folder}:`, err);
        }
      });
      // console.log(`Nettoyé ${folder}: gardé ${imageToKeep}, supprimé ${imagesToDelete.length} images`);
    }
  });

  console.log('Nettoyage terminé.');
}

cleanupImages();
