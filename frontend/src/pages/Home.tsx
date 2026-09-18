import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Sparkles, Box, Database, ArrowRight, Zap, Eye, Award, Cpu } from 'lucide-react';
import { Viewer3D, LightingPreset } from '../components/3d/Viewer3D';
import { Weapon } from '../types';
import axios from 'axios';

export const Home: React.FC = () => {
  const [featuredWeapons, setFeaturedWeapons] = useState<Weapon[]>([]);
  const [selectedPreset, setSelectedPreset] = useState<LightingPreset>('Neon');
  const [activeWeaponIndex, setActiveWeaponIndex] = useState<number>(0);

  useEffect(() => {
    fetchFeatured();
  }, []);

  const fetchFeatured = async () => {
    try {
      const res = await axios.get('/api/weapons/featured/');
      if (res.data && res.data.length > 0) {
        setFeaturedWeapons(res.data);
      }
    } catch {
      // Fallback
    }
  };

  const currentWeapon = featuredWeapons[activeWeaponIndex] || null;

  return (
    <div className="relative min-h-screen pt-20 pb-16 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-pink-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
        <div className="lg:col-span-6 z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            Sci-Fi & Fantasy Weaponry Vault
          </div>

          <h1 className="text-4xl md:text-6xl xl:text-7xl font-orbitron font-extrabold tracking-tight text-white leading-none">
            ENTER THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500 drop-shadow-glow-cyan">
              3D ARMORY
            </span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg font-sans max-w-xl leading-relaxed">
            Explore legendary fictional weapons in an immersive 3D WebGL universe. Analyze energy signatures, ancient lore, weapon variants, and cosmic factions.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/arsenal"
              className="px-7 py-3.5 rounded bg-cyan-400 text-black font-orbitron font-extrabold text-sm tracking-wider flex items-center gap-2 hover:bg-cyan-300 hover:shadow-glow-cyan transition-all"
            >
              <Database className="w-4 h-4" />
              EXPLORE ARSENAL
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/vault"
              className="px-7 py-3.5 rounded glass-panel border border-cyan-500/40 text-cyan-300 font-orbitron font-bold text-sm tracking-wider flex items-center gap-2 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
            >
              <Box className="w-4 h-4 text-cyan-400" />
              ENTER 3D VAULT
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-cyan-500/20">
            <div>
              <p className="font-orbitron font-extrabold text-2xl text-cyan-400">20+</p>
              <p className="text-xs font-mono text-gray-400 uppercase">Fictional Artifacts</p>
            </div>
            <div>
              <p className="font-orbitron font-extrabold text-2xl text-pink-500">6</p>
              <p className="text-xs font-mono text-gray-400 uppercase">3D Preset Shaders</p>
            </div>
            <div>
              <p className="font-orbitron font-extrabold text-2xl text-amber-400">3</p>
              <p className="text-xs font-mono text-gray-400 uppercase">Cosmic Universes</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 z-10 space-y-4">
          <div className="glass-panel p-2 rounded-2xl relative shadow-2xl border border-cyan-500/30">
            <Viewer3D
              modelSpec={currentWeapon?.model_3d}
              preset={selectedPreset}
              autoRotate={true}
              className="w-full h-[420px] md:h-[480px]"
            />

            {currentWeapon && (
              <div className="absolute top-6 left-6 glass-panel px-4 py-2.5 rounded-lg border-l-4 border-l-cyan-400">
                <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest block">
                  {currentWeapon.category_name}
                </span>
                <h3 className="font-orbitron font-bold text-base text-white">
                  {currentWeapon.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                    {currentWeapon.rarity}
                  </span>
                  <span className="text-xs font-mono text-amber-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> PWR: {currentWeapon.fictional_power_rating}
                  </span>
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between px-3 py-2 bg-black/60 rounded-lg border border-cyan-500/20 text-xs font-mono">
              <span className="text-gray-400 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-cyan-400" /> LIGHTING SHADER:
              </span>
              <div className="flex gap-1">
                {(['Studio', 'Dark', 'Neon', 'Cyberpunk', 'Ancient', 'Cosmic'] as LightingPreset[]).map((p) => (
                  <button
                    key={p}
                    onClick={() => setSelectedPreset(p)}
                    className={`px-2 py-1 rounded transition-all ${
                      selectedPreset === p
                        ? 'bg-cyan-400 text-black font-bold shadow-glow-cyan'
                        : 'text-gray-400 hover:text-white hover:bg-cyan-500/10'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {featuredWeapons.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {featuredWeapons.map((w, idx) => (
                <button
                  key={w.id}
                  onClick={() => setActiveWeaponIndex(idx)}
                  className={`p-2 rounded-lg text-left transition-all border ${
                    activeWeaponIndex === idx
                      ? 'bg-cyan-500/20 border-cyan-400 shadow-glow-cyan'
                      : 'glass-panel border-cyan-500/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <p className="text-[10px] font-mono text-cyan-400 truncate">{w.rarity}</p>
                  <p className="text-xs font-orbitron font-bold text-white truncate">{w.name}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
