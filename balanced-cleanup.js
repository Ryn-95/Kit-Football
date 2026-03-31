const fs = require('fs');
const path = require('path');

const maillotsDir = '/Users/rayanemouhajer/Documents/trae_projects/kitfootball/public/maillots';

// Clubs populaires + clubs moyens qui se vendent quand même
const popularAndMediumClubs = [
  'psg', 'paris saint-germain', 'real madrid', 'barcelona', 'barca', 'manchester united', 'manchester city', 
  'liverpool', 'chelsea', 'arsenal', 'bayern munich', 'juventus', 'milan', 'inter', 'napoli',
  'dortmund', 'leverkusen', 'atlético madrid', 'sevilla', 'valencia', 'roma', 'lazio', 'atalanta',
  'tottenham', 'leicester', 'newcastle', 'everton', 'west ham', 'wolfsburg', 'monaco', 'lyon', 'marseille',
  'bordeaux', 'lille', 'nice', 'strasbourg', 'porto', 'benfica', 'sporting', 'ajax', 'psv', 'feyenoord',
  'celtic', 'rangers', 'galatasaray', 'fenerbahçe', 'besiktas', 'shakhtar', 'dynamo', 'zenit', 'cska'
];

// Plus d'équipes nationales
const allPopularNationalTeams = [
  'france', 'brésil', 'brazil', 'argentine', 'portugal', 'angleterre', 'england', 
  'allemagne', 'germany', 'espagne', 'spain', 'italie', 'italy', 'belgique', 'belgium',
  'croatie', 'croatia', 'maroc', 'morocco', 'pays-bas', 'netherlands', 'suisse', 'switzerland',
  'danemark', 'denmark', 'suède', 'sweden', 'norvège', 'norway', 'pologne', 'poland',
  'uruguay', 'colombie', 'colombia', 'mexique', 'mexico', 'japon', 'japan', 'corée du sud', 'korea',
  'états-unis', 'usa', 'canada', 'australie', 'australia', 'algérie', 'algeria', 'tunisie', 'tunisia',
  'ghana', 'sénégal', 'senegal', 'cameroun', 'cameroon', 'nigéria', 'nigeria', 'egypte', 'egypt'
];

// Saisons plus larges
const recentSeasons = ['2025-26', '2024-25', '2023-24', '2022-23', '2021-22', '2020-21'];

function shouldKeepProduct(folderName) {
  const name = folderName.toLowerCase();
  
  // Clubs populaires et moyens
  const isClub = popularAndMediumClubs.some(club => name.includes(club));
  
  // Équipes nationales
  const isNational = allPopularNationalTeams.some(team => name.includes(team));
  
  // Saisons récentes
  const isRecent = recentSeasons.some(season => {
    return name.includes(season.replace('-', '')) || 
           name.includes(season) ||
           name.includes(season.split('-')[1]) + season.split('-')[0]);
  });
  
  // Garder les éditions spéciales pour clubs/nationaux
  const specialKeywords = ['retro', 'vintage', 'legend', 'special', 'anniversary', 'classic', 'edition'];
  const isSpecial = specialKeywords.some(keyword => name.includes(keyword));
  
  // Garder aussi les compétitions internationales
  const competitionKeywords = ['champions league', 'europa league', 'world cup', 'euro', 'copa america'];
  const isCompetition = competitionKeywords.some(comp => name.includes(comp));
  
  // Logique: garder si club/national ET (récent OU spécial OU compétition)
  if ((isClub || isNational) && (isRecent || isSpecial || isCompetition)) {
    return true;
  }
  
  // Garder les rétros même anciens si c'est spécial
  if ((isClub || isNational) && isSpecial) {
    return true;
  }
  
  return false;
}

function balancedCleanup() {
  console.log('⚖️  Nettoyage équilibré du dossier maillots...');
  
  const folders = fs.readdirSync(maillotsDir).filter(f => fs.statSync(path.join(maillotsDir, f)).isDirectory());
  
  let deletedCount = 0;
  let keptCount = 0;
  let totalSizeSaved = 0;
  
  folders.forEach(folder => {
    const shouldKeep = shouldKeepProduct(folder);
    
    if (!shouldKeep) {
      const folderPath = path.join(maillotsDir, folder);
      
      try {
        const stats = fs.statSync(folderPath);
        totalSizeSaved += stats.size;
        
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`🗑️  Supprimé: ${folder}`);
        deletedCount++;
      } catch (error) {
        console.log(`❌ Erreur suppression ${folder}: ${error.message}`);
      }
    } else {
      keptCount++;
    }
  });
  
  console.log('\n📊 Résumé du nettoyage équilibré:');
  console.log(`   🗑️  Dossiers supprimés: ${deletedCount}`);
  console.log(`   ✅ Dossiers conservés: ${keptCount}`);
  console.log(`   💾 Espace économisé: ${(totalSizeSaved / 1024 / 1024 / 1024).toFixed(2)} Go`);
  
  try {
    const newStats = fs.statSync(maillotsDir);
    console.log(`   📏 Nouvelle taille: ${(newStats.size / 1024 / 1024 / 1024).toFixed(2)} Go`);
  } catch (e) {
    console.log('   Impossible de calculer la nouvelle taille');
  }
}

balancedCleanup();
