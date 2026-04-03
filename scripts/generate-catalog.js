const fs = require('fs');
const path = require('path');

const maxikitsDir = path.join(__dirname, '../public/maxikits');
const outputFile = path.join(__dirname, '../src/data/maillots-catalog.json');

if (!fs.existsSync(maxikitsDir)) {
  console.log('Maxikits directory not found, skipping catalog generation');
  process.exit(0);
}

const catalog = [];

const leagues = fs.readdirSync(maxikitsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

leagues.forEach(league => {
  const leaguePath = path.join(maxikitsDir, league);
  const teams = fs.readdirSync(leaguePath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  teams.forEach(team => {
    const teamPath = path.join(leaguePath, team);
    const jerseys = fs.readdirSync(teamPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    jerseys.forEach(jersey => {
      const jerseyPath = path.join(teamPath, jersey);
      const files = fs.readdirSync(jerseyPath);
      const images = files
        .filter(f => /\.(jpg|jpeg|png|webp|avif)$/i.test(f))
        .map(f => `/maxikits/${league}/${team}/${jersey}/${f}`)
        .sort((a, b) => {
          const aIsMain = a.includes('_1.') ? -1 : 0;
          const bIsMain = b.includes('_1.') ? -1 : 0;
          if (aIsMain !== bIsMain) return aIsMain - bIsMain;
          return a.localeCompare(b, undefined, { numeric: true });
        });

      if (images.length > 0) {
        catalog.push({
          league,
          team,
          jerseyName: jersey,
          images
        });
      }
    });
  });
});

fs.writeFileSync(outputFile, JSON.stringify(catalog, null, 2));
console.log(`✅ Generated catalog with ${catalog.length} maillots from maxikits`);

// Generate Menu Structure
const menuStructure = {};
catalog.forEach(item => {
  if (!menuStructure[item.league]) menuStructure[item.league] = new Set();
  menuStructure[item.league].add(item.team);
});

const finalMenu = {};
Object.keys(menuStructure).sort().forEach(league => {
  finalMenu[league] = Array.from(menuStructure[league]).sort().slice(0, 20);
});

const menuOutputFile = path.join(__dirname, '../src/data/menu-structure.json');
fs.writeFileSync(menuOutputFile, JSON.stringify(finalMenu, null, 2));
console.log(`✅ Generated menu structure`);
