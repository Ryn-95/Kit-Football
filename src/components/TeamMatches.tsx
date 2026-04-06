'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Trophy } from 'lucide-react';

interface Match {
  date: string;
  competition: string;
  opponent: string;
  home: boolean;
  stadium: string;
  time: string;
}

interface TeamMatches {
  matches: Match[];
}

interface TeamMatchesProps {
  teamName: string;
}

const competitionColors: Record<string, string> = {
  'Ligue 1': 'bg-blue-100 text-blue-800',
  'La Liga': 'bg-orange-100 text-orange-800',
  'Premier League': 'bg-purple-100 text-purple-800',
  'Bundesliga': 'bg-red-100 text-red-800',
  'Serie A': 'bg-green-100 text-green-800',
  'Champions League': 'bg-yellow-100 text-yellow-800',
  'Coupe de France': 'bg-indigo-100 text-indigo-800',
  'FA Cup': 'bg-pink-100 text-pink-800',
  'DFB Pokal': 'bg-teal-100 text-teal-800',
  'Éliminatoires Coupe du Monde': 'bg-emerald-100 text-emerald-800',
  'Match amical': 'bg-gray-100 text-gray-800'
};

export default function TeamMatches({ teamName }: TeamMatchesProps) {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMatches = async () => {
      try {
        const response = await fetch('/api/team-matches');
        if (response.ok) {
          const data = await response.json();
          const teamData = data[teamName];
          if (teamData && teamData.matches) {
            setMatches(teamData.matches.slice(0, 4)); // Prendre les 4 premiers matchs
          }
        }
      } catch (error) {
        console.error('Erreur chargement matchs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [teamName]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (matches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <Calendar className="w-6 h-6 text-black mr-2" />
        <h2 className="text-2xl font-bold text-black">Prochains Matchs</h2>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {matches.map((match, index) => (
          <div 
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <Trophy className="w-4 h-4 text-gray-600 mr-2" />
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  competitionColors[match.competition] || 'bg-gray-100 text-gray-800'
                }`}>
                  {match.competition}
                </span>
              </div>
              <span className="text-sm font-bold text-black">{match.date}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-black">
                  {match.home ? teamName : match.opponent}
                </span>
                <span className="text-gray-600">VS</span>
                <span className="font-semibold text-black">
                  {match.home ? match.opponent : teamName}
                </span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{match.stadium}</span>
                <span className="mx-2">•</span>
                <Clock className="w-3 h-3 mr-1" />
                <span>{match.time}</span>
              </div>
              
              <div className="text-xs text-gray-500">
                {match.home ? 'À domicile' : 'À l\'extérieur'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Supportez {teamName} avec le maillot officiel ! 🏆
        </p>
      </div>
    </div>
  );
}
