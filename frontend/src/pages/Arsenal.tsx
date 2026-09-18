import React, { useState, useEffect } from 'react';
import { Search, Filter, Shield, Zap, Columns, Check, Eye } from 'lucide-react';
import { Weapon } from '../types';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Arsenal: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchWeapons();
  }, [searchQuery, selectedRarity, selectedCategory]);

  const fetchWeapons = async () => {
    setIsLoading(true);
    try {
      const params: Record<string, string> = {};
      if (searchQuery) params.search = searchQuery;
      if (selectedRarity) params.rarity = selectedRarity;
      if (selectedCategory) params.category = selectedCategory;

      const res = await axios.get('/api/weapons/', { params });
      setWeapons(res.data.results || res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCompare = (id: number) => {
    setCompareList((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold text-white">
            ARSENAL DATABASE
          </h1>
          <p className="text-gray-400 font-mono text-sm mt-1">
            Search, filter and compare fictional armaments across cosmic universes.
          </p>
        </div>

        {compareList.length > 0 && (
          <Link
            to={`/compare?ids=${compareList.join(',')}`}
            className="px-6 py-3 rounded-lg bg-pink-500 text-white font-orbitron font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-pink-600 transition-all shadow-glow-pink"
          >
            <Columns className="w-4 h-4" />
            COMPARE ({compareList.length}/3 SELECTED)
          </Link>
        )}
      </div>

      <div className="glass-panel p-4 rounded-xl border border-cyan-500/30 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search weapon name, material, energy core, lore..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/60 border border-cyan-500/30 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-cyan-400 font-mono"
          />
        </div>

        <select
          value={selectedRarity}
          onChange={(e) => setSelectedRarity(e.target.value)}
          className="bg-black/60 border border-cyan-500/30 rounded-lg px-4 py-2 text-sm text-cyan-300 font-mono focus:outline-none"
        >
          <option value="">All Rarities</option>
          <option value="COMMON">Common</option>
          <option value="RARE">Rare</option>
          <option value="EPIC">Epic</option>
          <option value="LEGENDARY">Legendary</option>
          <option value="MYTHIC">Mythic</option>
          <option value="ANCIENT">Ancient</option>
        </select>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-cyan-400 font-orbitron text-lg">
          QUERYING ARSENAL MATRIX...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weapons.map((w) => {
            const isSelected = compareList.includes(w.id);
            return (
              <div
                key={w.id}
                className="glass-panel p-5 rounded-2xl border border-cyan-500/20 hover:border-cyan-400/60 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyan-400 uppercase tracking-widest">{w.category_name}</span>
                    <span className="px-2 py-0.5 rounded font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                      {w.rarity}
                    </span>
                  </div>

                  <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {w.name}
                  </h3>

                  <p className="text-xs font-mono text-gray-400 mt-1">
                    {w.faction_name} • {w.universe_name}
                  </p>

                  <p className="text-sm font-sans text-gray-300 mt-3 line-clamp-2">
                    {w.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-cyan-500/10">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-gray-400">FICTIONAL POWER:</span>
                    <span className="text-amber-400 font-bold">{w.fictional_power_rating} / 100</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-pink-500"
                      style={{ width: `${w.fictional_power_rating}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Link
                    to={`/weapon/${w.id}`}
                    className="flex-1 py-2 rounded bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-orbitron font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-cyan-500/30 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" /> DETAILS
                  </Link>

                  <button
                    onClick={() => toggleCompare(w.id)}
                    className={`p-2 rounded font-mono text-xs border transition-all ${
                      isSelected
                        ? 'bg-pink-500 text-white border-pink-400'
                        : 'bg-black/40 text-gray-400 border-cyan-500/20 hover:text-white'
                    }`}
                  >
                    <Columns className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
