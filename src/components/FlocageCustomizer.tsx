'use client';

import { useState } from 'react';
import { Type, Palette, User } from 'lucide-react';

interface FlocageCustomizerProps {
  onFlocageChange: (flocage: string) => void;
  currentFlocage?: string;
}

const predefinedNames = [
  'MBAPPÉ', 'MESSI', 'RONALDO', 'NEYMAR', 'HAALAND', 'DE BRUYNE',
  'GRIEZMANN', 'KANTE', 'VARANE', 'LORIS', 'POGBA', 'BENZEMA'
];

const flocageColors = [
  { name: 'Blanc', value: 'white', hex: '#FFFFFF' },
  { name: 'Noir', value: 'black', hex: '#000000' },
  { name: 'Or', value: 'gold', hex: '#FFD700' },
  { name: 'Argent', value: 'silver', hex: '#C0C0C0' },
  { name: 'Rouge', value: 'red', hex: '#FF0000' },
  { name: 'Bleu', value: 'blue', hex: '#0000FF' },
  { name: 'Vert', value: 'green', hex: '#00FF00' }
];

export default function FlocageCustomizer({ onFlocageChange, currentFlocage }: FlocageCustomizerProps) {
  const [customName, setCustomName] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [selectedColor, setSelectedColor] = useState('white');
  const [selectedNumber, setSelectedNumber] = useState('');
  const [activeTab, setActiveTab] = useState<'name' | 'number' | 'custom'>('name');

  const getFlocageDescription = () => {
    if (activeTab === 'name' && selectedName) {
      return `${selectedName} (${flocageColors.find(c => c.value === selectedColor)?.name})`;
    }
    if (activeTab === 'number' && selectedNumber) {
      return `Numéro ${selectedNumber} (${flocageColors.find(c => c.value === selectedColor)?.name})`;
    }
    if (activeTab === 'custom' && customName.trim()) {
      return `${customName.trim()} (${flocageColors.find(c => c.value === selectedColor)?.name})`;
    }
    return 'none';
  };

  const handleFlocageUpdate = () => {
    const description = getFlocageDescription();
    onFlocageChange(description);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center mb-6">
        <Type className="w-6 h-6 text-black mr-2" />
        <h3 className="text-xl font-bold text-black">Personnalisation Flocage</h3>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('name')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'name'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          <User className="w-4 h-4 inline mr-1" />
          Noms Prédéfinis
        </button>
        <button
          onClick={() => setActiveTab('number')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'number'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Numéro
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'custom'
              ? 'bg-white text-black shadow-sm'
              : 'text-gray-600 hover:text-black'
          }`}
        >
          Personnalisé
        </button>
      </div>

      {/* Color Selection */}
      <div className="mb-6">
        <div className="flex items-center mb-3">
          <Palette className="w-4 h-4 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Couleur du flocage</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {flocageColors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color.value
                  ? 'border-black scale-110 shadow-lg'
                  : 'border-gray-300 hover:border-gray-500'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[200px]">
        {activeTab === 'name' && (
          <div>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-4">
              {predefinedNames.map((name) => (
                <button
                  key={name}
                  onClick={() => setSelectedName(name)}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                    selectedName === name
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
            {selectedName && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Sélectionné: <span className="font-semibold">{selectedName}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'number' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro souhaité
            </label>
            <input
              type="text"
              value={selectedNumber}
              onChange={(e) => setSelectedNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 2))}
              placeholder="7, 10, 99..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              maxLength={2}
            />
            {selectedNumber && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Numéro: <span className="font-semibold">{selectedNumber}</span>
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'custom' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom personnalisé
            </label>
            <input
              type="text"
              value={customName}
              onChange={(e) => setCustomName(e.target.value.toUpperCase())}
              placeholder="VOTRE NOM..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-black focus:border-black"
              maxLength={15}
            />
            {customName.trim() && (
              <div className="mt-3 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Personnalisation: <span className="font-semibold">{customName.trim()}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Apply Button */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          {getFlocageDescription() !== 'none' && (
            <span>Flocage: {getFlocageDescription()}</span>
          )}
        </div>
        <button
          onClick={handleFlocageUpdate}
          disabled={getFlocageDescription() === 'none'}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            getFlocageDescription() !== 'none'
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Appliquer le flocage
        </button>
      </div>
    </div>
  );
}
