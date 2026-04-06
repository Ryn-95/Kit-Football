"use client";

import Link from 'next/link';
import menuData from '../../data/menu-structure.json';
import slugify from 'slugify';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MegaMenuProps {
  onClose: () => void;
}

const topTeamsPerLeague: Record<string, string[]> = {
  "Ligue 1": ["Paris SG", "Marseille", "Lyon", "Monaco"],
  "Premier League": ["Arsenal", "Chelsea", "Liverpool", "Manchester City", "Manchester United"],
  "Liga": ["Real Madrid", "Barcelone", "Atletico Madrid"],
  "Serie A": ["Juventus", "Milan AC", "Inter Milan", "AS Roma", "Naples"],
  "Bundesliga": ["Bayern Munich", "Dortmund", "Bayer Leverkusen"],
  "Equipes Nationales": ["Argentine", "Bresil", "France", "Allemagne", "Espagne", "Portugal"],
};

const targetLeagues = ["Ligue 1", "Premier League", "Liga", "Serie A", "Bundesliga", "Equipes Nationales"];

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const leagues = Object.keys(menuData).filter(league => targetLeagues.includes(league));

  return (
    <>
      {/* Backdrop overlay (dimming the rest of the site) */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-full left-0 w-screen h-screen bg-black/40 backdrop-blur-sm -z-10"
        onClick={onClose}
      />

      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-full left-0 w-full bg-white border-b border-gray-200 z-50 overflow-hidden"
      >
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-10 py-12 flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Navigation Links Grid (Left) */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-12">
            {leagues.map((league) => {
              const allTeams: string[] = (menuData as any)[league] || [];
              const topTeams = topTeamsPerLeague[league] || [];
              
              let displayTeams = topTeams.filter(t => allTeams.includes(t));
              if (displayTeams.length === 0) displayTeams = allTeams.slice(0, 5);

              return (
                <div key={league} className="flex flex-col group/league">
                  <Link 
                    href={`/maillots?q=${league}`}
                    onClick={onClose}
                    className="font-heading font-black italic text-black text-xl uppercase tracking-tighter mb-4 inline-block hover:text-[var(--color-brand-volt)] transition-colors duration-200"
                  >
                    {league}
                  </Link>
                  <ul className="flex flex-col space-y-3">
                    {displayTeams.map((team: string) => {
                      const teamSlug = slugify(team, { lower: true, strict: true });
                      return (
                        <li key={team}>
                          <Link 
                            href={`/maillots/club/${teamSlug}`}
                            onClick={onClose}
                            className="text-gray-500 hover:text-black hover:underline underline-offset-4 transition-all duration-300 text-sm font-medium block"
                          >
                            {team}
                          </Link>
                        </li>
                      );
                    })}
                    <li className="pt-3">
                      <Link 
                        href={`/maillots?q=${league}`}
                        onClick={onClose}
                        className="text-black font-bold hover:text-gray-600 hover:underline underline-offset-4 text-xs uppercase tracking-widest flex items-center gap-1 group/link transition-colors"
                      >
                        Tout afficher <span className="transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>

          {/* Promotional / Visual Area (Right - Hidden on small screens) */}
          <div className="hidden lg:flex w-80 flex-col gap-6 border-l border-gray-100 pl-12">
            <Link href="/maillots/type/retro" onClick={onClose} className="group relative block aspect-[4/5] bg-gray-100 overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/40 transition-colors duration-500" />
              {/* Replace with a real path if you have a featured image, otherwise fallback to generic CSS pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 scale-105 group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <span className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full mb-3 inline-block">Nouveau</span>
                <h4 className="text-white font-heading font-black italic text-3xl uppercase tracking-tighter leading-none mb-2 group-hover:-translate-y-1 transition-transform duration-300">
                  Éditions<br/>Rétro
                </h4>
                <p className="text-white/80 text-sm font-medium mb-4 group-hover:-translate-y-1 transition-transform duration-300 delay-75">
                  Revivez l'histoire.
                </p>
                <span className="text-white text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:-translate-y-1 transition-transform duration-300 delay-100">
                  Découvrir <span className="transition-transform group-hover:translate-x-2">→</span>
                </span>
              </div>
            </Link>
          </div>

        </div>
        
        {/* Bottom Accent Bar */}
        <div className="h-1.5 w-full bg-black"></div>
      </motion.div>
    </>
  );
}
