const fs = require('fs');
const path = require('path');

const TEAM_ALIASES = {
  'man u': 'Manchester United',
  'man utd': 'Manchester United',
  'manchester utd': 'Manchester United',
  'man city': 'Manchester City',
  'barca': 'FC Barcelona',
  'barcelona': 'FC Barcelona',
  'paris saintgermain': 'PSG',
  'paris saint germain': 'PSG',
  'paris': 'PSG',
  'real': 'Real Madrid',
  'real madrid': 'Real Madrid',
  'bayern': 'Bayern Munich',
  'juve': 'Juventus',
  'ac': 'AC Milan',
  'inter': 'Inter Milan',
  'atm': 'Atletico Madrid',
  'atletico': 'Atletico Madrid',
  'bvb': 'Borussia Dortmund',
  'dortmund': 'Borussia Dortmund',
  'ol': 'Olympique Lyonnais',
  'om': 'Olympique de Marseille',
  'marseille': 'Olympique de Marseille',
  'lyon': 'Olympique Lyonnais'
};

function normalizeTeam(team) {
  let t = team.toLowerCase().trim();
  for (const [alias, realName] of Object.entries(TEAM_ALIASES)) {
    if (t === alias || t.includes(alias) && alias.length > 3) {
      return realName;
    }
  }
  return team.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
}

function parseFolderName(folderName) {
  let name = folderName.replace(/^#/, '').trim();
  
  // Clean trailing numbers after sizes like S-XXL3 -> S-XXL
  name = name.replace(/(S-[A-Z0-9XL]+)\d+$/i, '$1');
  
  let season = null;
  // Match seasons like 23-24, 23/24, 2023-2024, 0103 (01-03), 0304 (03-04), 0506, 0607
  const seasonMatch = name.match(/(20\d{2}[-/]\d{2}|\d{2}[-/]\d{2}|\b\d{4}\b|\b\d{2}\b)/);
  if (seasonMatch) {
    let raw = seasonMatch[1];
    if (raw.length === 4 && !raw.includes('-') && !raw.includes('/')) {
      season = raw.substring(0,2) + '-' + raw.substring(2,4);
    } else if (raw.length === 2) {
      season = '20' + raw; // Assuming 06 -> 2006 (not always true but ok fallback)
    } else {
      season = raw.replace('/', '-');
    }
    name = name.replace(seasonMatch[0], ' ').trim();
  }

  let type = 'Domicile'; // default home
  if (/away|extérieur/i.test(name)) type = 'Extérieur';
  if (/third/i.test(name)) type = 'Third';
  if (/retro|throwback/i.test(name)) type = 'Rétro';
  if (/training|jacket|survetement|veste|pantalon/i.test(name)) type = 'Training';
  if (/goalkeeper|gk|gardien/i.test(name)) type = 'Gardien';
  
  let category = /kids|enfant/i.test(name) || /16#-28#/i.test(name) ? 'Enfant' : 'Adulte';

  // Clean up team name
  let team = name
    .replace(/away|home|third|retro|game|shirt|jersey|long sleeve|short sleeve|jacket|kids|size|edition|domicile|extérieur|third|gardien|throwback|at |kit|player|anniversary|longsleeved/ig, '')
    .replace(/\b[SMLXL0-9#-]+\b/g, '') // remove sizes
    .replace(/[-(),]/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  team = normalizeTeam(team);
    
  return { folderName, team, season, type, category };
}

const folders = fs.readdirSync(path.join(process.cwd(), 'public/maillots')).slice(0, 50);
folders.forEach(f => {
  if(f === '.' || f === '..') return;
  console.log(parseFolderName(f));
});
