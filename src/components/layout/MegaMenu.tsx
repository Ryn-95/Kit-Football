"use client";

import Link from 'next/link';
import menuData from '../../data/menu-structure.json';
import slugify from 'slugify';
import { motion, AnimatePresence } from 'framer-motion';

interface MegaMenuProps {
  onClose: () => void;
}

export default function MegaMenu({ onClose }: MegaMenuProps) {
  const leagues = Object.keys(menuData);

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-10 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-12 overflow-y-auto max-h-[70vh] custom-scrollbar">
        {leagues.map((league) => (
          <div key={league} className="flex flex-col gap-4">
            <h3 className="font-black text-black text-[13px] tracking-[0.1em] uppercase border-b-2 border-black pb-2 inline-block self-start">
              {league}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {(menuData as any)[league].map((team: string) => {
                const teamSlug = slugify(team, { lower: true, strict: true });
                return (
                  <li key={team}>
                    <Link 
                      href={`/maillots/club/${teamSlug}`}
                      onClick={onClose}
                      className="text-gray-500 hover:text-black hover:bg-gray-50 px-2 py-1 -ml-2 rounded-sm transition-all text-[13px] font-medium block"
                    >
                      {team}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link 
                  href={`/maillots?q=${league}`}
                  onClick={onClose}
                  className="text-black font-bold hover:underline text-[12px] flex items-center gap-1 mt-3 group"
                >
                  VOIR TOUT <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </li>
            </ul>
          </div>
        ))}
      </div>
      
      {/* Bottom Visual Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-black via-gray-800 to-black"></div>
    </motion.div>
  );
}
