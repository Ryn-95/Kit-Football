"use client";

import { useRef, useState } from 'react';
import Link from 'next/link';

const teams = [
  { name: 'France', logo: 'https://crests.football-data.org/773.svg', link: '/maillots/club/france' },
  { name: 'Argentine', logo: 'https://crests.football-data.org/762.svg', link: '/maillots/club/argentine' },
  { name: 'Allemagne', logo: 'https://crests.football-data.org/759.svg', link: '/maillots/club/allemagne' },
  { name: 'Espagne', logo: 'https://crests.football-data.org/760.svg', link: '/maillots/club/espagne' },
  { name: 'Italie', logo: 'https://crests.football-data.org/784.svg', link: '/maillots/club/italie' },
  { name: 'Belgique', logo: 'https://crests.football-data.org/805.svg', link: '/maillots/club/belgique' },
  { name: 'Portugal', logo: 'https://crests.football-data.org/765.svg', link: '/maillots/club/portugal' },
  { name: 'Brésil', logo: 'https://crests.football-data.org/764.svg', link: '/maillots/club/bresil' },
  { name: 'Angleterre', logo: 'https://crests.football-data.org/770.svg', link: '/maillots/club/angleterre' },
  { name: 'Pays-Bas', logo: 'https://crests.football-data.org/866.svg', link: '/maillots/club/pays-bas' },
];

export default function NationalTeams() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  return (
    <div className="w-full py-12 px-6 lg:px-10 bg-white mt-10">
      <h2 className="text-3xl lg:text-[32px] font-black uppercase mb-8 text-black tracking-tight" style={{fontFamily: "'AdihausDIN', Helvetica, Arial, sans-serif"}}>
        TROUVE TON ÉQUIPE NATIONALE
      </h2>

      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {teams.map((team, index) => (
          <Link href={team.link} key={index} className="min-w-[160px] lg:min-w-[180px] flex-shrink-0 snap-start cursor-pointer group block" title={`Maillots équipe de ${team.name}`}>
            <div className="bg-[#f5f5f5] aspect-square flex items-center justify-center p-8 mb-3 group-hover:border-black border border-transparent transition-colors shadow-sm group-hover:shadow-md">
              <img src={team.logo} alt={`Maillot équipe nationale ${team.name} pas cher`} className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-110" loading="lazy" />
            </div>
            <p className="text-center font-bold text-sm text-black underline-offset-4 group-hover:underline">
              {team.name}
            </p>
          </Link>
        ))}
      </div>

      {/* Custom Scrollbar Indicator */}
      <div className="w-full h-[2px] bg-gray-200 mt-2 relative">
        <div 
          className="absolute top-0 left-0 h-full bg-black transition-all duration-150 ease-out"
          style={{ 
            width: '20%', 
            transform: `translateX(${scrollProgress * 400}%)`
          }}
        />
      </div>
    </div>
  );
}
