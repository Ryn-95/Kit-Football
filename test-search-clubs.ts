import { getAllClubs } from './src/data/catalog';
const clubs = getAllClubs();
const f = clubs.filter(c => c.name.toLowerCase().includes('fiorentina'));
console.log(f);
