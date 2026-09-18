import React, { useState, useEffect } from 'react';
import { Box, Sparkles, Zap, Shield, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Viewer3D } from '../components/3d/Viewer3D';
import { Weapon } from '../types';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Armory3DVault: React.FC = () => {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchVaultWeapons();
  }, []);

  const fetchVaultWeapons = async () => {
    try {
      const res = await axios.get('/api/weapons/');
      setWeapons(res.data.results || []);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = () => {
    if (weapons.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % weapons.length);
  };

  const handlePrev = () => {
    if (weapons.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + weapons.length) % weapons.length);
  };

  const currentWeapon = weapons[currentIndex] || null;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-cyan-500/20 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono mb-2 uppercase">
            <Box className="w-3.5 h-3.5" /> Interactive 3D Hall of Legends
          </div>
          <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold text-white">
            3D WEAPON VAULT
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="p-3 rounded-lg glass-panel border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="font-mono text-sm text-gray-300 font-bold px-3">
            {currentIndex + 1} / {weapons.length}
          </span>
          <button
            onClick={handleNext}
            className="p-3 rounded-lg glass-panel border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="glass-panel h-[500px] flex items-center justify-center text-cyan-400 font-orbitron">
          INITIALIZING VAULT MATRIX...
        </div>
      ) : currentWeapon ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 glass-panel p-4 rounded-2xl relative border border-cyan-500/30 shadow-glow-cyan">
            <Viewer3D
              modelSpec={currentWeapon.model_3d}
              preset="Neon"
              autoRotate={true}
              className="w-full h-[500px]"
            />
          </div>

          <div className="lg:col-span-4 space-y-6 glass-panel p-6 rounded-2xl border border-cyan-500/30">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {currentWeapon.category_name} • {currentWeapon.universe_name}
              </span>
              <h2 className="text-2xl font-orbitron font-bold text-white mt-1">
                {currentWeapon.name}
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/40">
                {currentWeapon.rarity}
              </span>
              <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                {currentWeapon.faction_name}
              </span>
            </div>

            <div className="space-y-3 bg-black/40 p-4 rounded-xl border border-cyan-500/20">
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-gray-400">FICTIONAL POWER:</span>
                  <span className="text-amber-400 font-bold">{currentWeapon.fictional_power_rating} / 100</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-pink-500"
                    style={{ width: `${currentWeapon.fictional_power_rating}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-gray-400">CORE STABILITY:</span>
                  <span className="text-cyan-400 font-bold">{currentWeapon.fictional_stability}%</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-cyan-400"
                    style={{ width: `${currentWeapon.fictional_stability}%` }}
                  />
                </div>
              </div>
            </div>

            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {currentWeapon.description}
            </p>

            <Link
              to={`/weapon/${currentWeapon.id}`}
              className="w-full py-3 rounded bg-cyan-400 text-black font-orbitron font-extrabold text-sm flex items-center justify-center gap-2 hover:bg-cyan-300 transition-all shadow-glow-cyan"
            >
              <Eye className="w-4 h-4" />
              FULL 3D INSPECTION & LORE
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
};
