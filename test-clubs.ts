import { getAllClubs } from './src/data/catalog';
const clubs = getAllClubs();
console.log(clubs.slice(0, 50));
