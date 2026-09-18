import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Zap, Shield, Sparkles, Film, Bookmark, BookmarkCheck } from 'lucide-react';
import { Weapon } from '../types';
import { Viewer3D, LightingPreset } from '../components/3d/Viewer3D';
import axios from 'axios';

export const WeaponDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<LightingPreset>('Neon');
  const [cinematicMode, setCinematicMode] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) fetchWeaponDetail();
  }, [id]);

  const fetchWeaponDetail = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/weapons/${id}/`);
      setWeapon(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSaveCollection = async () => {
    if (!weapon) return;
    try {
      await axios.post('/api/favorites/toggle/', { weapon_id: weapon.id });
      setIsSaved(!isSaved);
    } catch {
      setIsSaved(!isSaved);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-32 text-center font-orbitron text-cyan-400">
        LOADING WEAPON MATRIX DATA...
      </div>
    );
  }

  if (!weapon) {
    return (
      <div className="min-h-screen pt-32 text-center font-orbitron text-pink-500">
        WEAPON NOT FOUND IN ARMORY DATABASE
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      {cinematicMode && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-6">
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-xs font-mono text-cyan-400">CINEMATIC SHOWCASE MODE</span>
              <h2 className="text-2xl font-orbitron font-extrabold text-white">{weapon.name}</h2>
            </div>
            <button
              onClick={() => setCinematicMode(false)}
              className="px-4 py-2 rounded bg-pink-500 text-white font-orbitron font-bold text-xs"
            >
              EXIT SHOWCASE
            </button>
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <Viewer3D
              modelSpec={weapon.model_3d}
              preset={selectedPreset}
              autoRotate={true}
              className="w-full h-full border-none rounded-none bg-transparent"
            />
          </div>

          <div className="z-10 bg-black/60 p-4 rounded-xl border border-cyan-500/30 flex items-center justify-between text-xs font-mono">
            <span>RARE ARTIFACT CATEGORY: {weapon.category_name}</span>
            <span className="text-amber-400 font-bold">POWER RATING: {weapon.fictional_power_rating}</span>
          </div>
        </div>
      )}

      <Link
        to="/arsenal"
        className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> BACK TO ARSENAL
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-4">
          <div className="glass-panel p-2 rounded-2xl relative border border-cyan-500/30 shadow-glow-cyan">
            <Viewer3D
              modelSpec={weapon.model_3d}
              preset={selectedPreset}
              autoRotate={true}
              className="w-full h-[450px]"
            />

            <button
              onClick={() => setCinematicMode(true)}
              className="absolute top-4 right-4 p-2.5 rounded-lg bg-black/60 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <Film className="w-4 h-4 text-pink-400" /> CINEMATIC SHOWCASE
            </button>
          </div>

          <div className="glass-panel p-3 rounded-xl border border-cyan-500/20 flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">ENVIRONMENT LIGHTING:</span>
            <div className="flex gap-1.5">
              {(['Studio', 'Dark', 'Neon', 'Cyberpunk', 'Ancient', 'Cosmic'] as LightingPreset[]).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPreset(p)}
                  className={`px-2.5 py-1 rounded transition-all ${
                    selectedPreset === p
                      ? 'bg-cyan-400 text-black font-bold shadow-glow-cyan'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                {weapon.category_name} • {weapon.universe_name}
              </span>
              <h1 className="text-3xl font-orbitron font-extrabold text-white mt-1">
                {weapon.name}
              </h1>
            </div>

            <button
              onClick={toggleSaveCollection}
              className={`p-3 rounded-xl border transition-all ${
                isSaved
                  ? 'bg-pink-500/20 border-pink-400 text-pink-400'
                  : 'bg-black/40 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10'
              }`}
            >
              {isSaved ? <BookmarkCheck className="w-5 h-5" /> : <Bookmark className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/40">
              {weapon.rarity}
            </span>
            <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
              {weapon.faction_name}
            </span>
            <span className="px-3 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {weapon.size_class}
            </span>
          </div>

          <div className="bg-black/40 p-4 rounded-xl border border-cyan-500/20 space-y-3 font-mono text-xs">
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">FICTIONAL POWER:</span>
              <span className="text-amber-400 font-bold">{weapon.fictional_power_rating} / 100</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">CORE STABILITY:</span>
              <span className="text-cyan-400 font-bold">{weapon.fictional_stability}%</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">ENERGY CORE:</span>
              <span className="text-pink-400 font-bold">{weapon.energy_type}</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-2">
              <span className="text-gray-400">PRIMARY MATERIAL:</span>
              <span className="text-white font-bold">{weapon.primary_material}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">MANUFACTURER:</span>
              <span className="text-gray-300">{weapon.fictional_manufacturer}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-orbitron font-bold text-cyan-400">HISTORICAL LORE & ORIGINS</h3>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {weapon.description}
            </p>
            {weapon.lore_snippet && (
              <blockquote className="p-3 bg-cyan-500/5 border-l-2 border-cyan-400 text-xs italic text-cyan-200 mt-2">
                "{weapon.lore_snippet}"
              </blockquote>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
