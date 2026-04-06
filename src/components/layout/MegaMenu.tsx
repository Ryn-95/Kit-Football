"use client";

import Link from 'next/link';
import menuData from '../../data/menu-structure.json';
import slugify from 'slugify';
import { motion } from 'framer-motion';

interface MegaMenuProps {
  onClose: () => void;
}

// Top teams we want to highlight per league (if they exist in the data)
// If a team is not in this list, we fallback to slicing the first few.
const topTeamsPerLeague: Record<string, string[]> = {
  "Ligue 1": ["Paris SG", "Marseille", "Lyon", "Monaco", "Lens", "Lille"],
  "Premier League": ["Arsenal", "Chelsea", "Liverpool", "Manchester City", "Manchester United", "Newcastle"],
  "Liga": ["Real Madrid", "Barcelone", "Atletico Madrid", "Betis Seville", "Athletic Bilbao"],
  "Serie A": ["Juventus", "Milan AC", "Inter Milan", "AS Roma", "Naples"],
  "Bundesliga": ["Bayern Munich", "Dortmund", "Bayer Leverkusen", "RB Leipzig"],
  "Equipes Nationales": ["Argentine", "Bresil", "France", "Allemagne", "Angleterre", "Belgique", "Espagne", "Portugal"],
};

// Leagues we want to display in the MegaMenu
const targetLeagues = ["Ligue 1", "Premier League", "Liga", "Serie A", "Bundesliga", "Equipes Nationales", "Clubs Europe"];

export default function MegaMenu({ onClose }: MegaMenuProps) {
  // Filter only the leagues we want to show
  const leagues = Object.keys(menuData).filter(league => targetLeagues.includes(league));

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-white border-b border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-12 gap-y-10">
        {leagues.map((league) => {
          const allTeams: string[] = (menuData as any)[league] || [];
          const topTeams = topTeamsPerLeague[league] || [];
          
          // Get teams to display: intersection of topTeams and allTeams, or fallback to first 6
          let displayTeams = topTeams.filter(t => allTeams.includes(t));
          if (displayTeams.length === 0) {
            displayTeams = allTeams.slice(0, 6);
          }

          return (
            <div key={league} className="flex flex-col group">
              <Link 
                href={`/maillots?q=${league}`}
                onClick={onClose}
                className="font-heading font-black italic text-black text-lg uppercase tracking-wide border-b-2 border-transparent group-hover:border-[var(--color-brand-volt)] pb-1 mb-4 inline-block self-start transition-colors"
              >
                {league}
              </Link>
              <ul className="flex flex-col space-y-2.5">
                {displayTeams.map((team: string) => {
                  const teamSlug = slugify(team, { lower: true, strict: true });
                  return (
                    <li key={team}>
                      <Link 
                        href={`/maillots/club/${teamSlug}`}
                        onClick={onClose}
                        className="text-gray-500 hover:text-black hover:translate-x-1 transition-all text-sm font-medium block"
                      >
                        {team}
                      </Link>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <Link 
                    href={`/maillots?q=${league}`}
                    onClick={onClose}
                    className="text-black font-bold hover:text-[var(--color-brand-volt)] text-xs flex items-center gap-1 group/link transition-colors uppercase tracking-widest"
                  >
                    Voir tout <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </Link>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
      
      {/* Bottom Visual Bar */}
      <div className="h-1 w-full bg-gradient-to-r from-black via-[var(--color-brand-volt)] to-black"></div>
    </motion.div>
  );
}
