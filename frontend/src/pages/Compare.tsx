import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Columns } from 'lucide-react';
import { Weapon } from '../types';
import { Viewer3D } from '../components/3d/Viewer3D';
import axios from 'axios';

export const Compare: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const ids = searchParams.get('ids') || '';

  useEffect(() => {
    if (ids) {
      fetchComparedWeapons();
    } else {
      setIsLoading(false);
    }
  }, [ids]);

  const fetchComparedWeapons = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/weapons/compare/?ids=${ids}`);
      setWeapons(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between border-b border-cyan-500/20 pb-6">
        <div>
          <Link
            to="/arsenal"
            className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> BACK TO ARSENAL
          </Link>
          <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold text-white">
            WEAPON COMPARISON
          </h1>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-20 text-cyan-400 font-orbitron text-lg">
          ANALYZING COMPARED ENERGY MATRICES...
        </div>
      ) : weapons.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl border border-cyan-500/20">
          <Columns className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h3 className="text-xl font-orbitron font-bold text-white">NO WEAPONS SELECTED</h3>
          <p className="text-sm font-mono text-gray-400 mt-2">
            Select up to 3 weapons in the Arsenal database to perform a side-by-side spec evaluation.
          </p>
          <Link
            to="/arsenal"
            className="inline-block mt-6 px-6 py-3 rounded bg-cyan-400 text-black font-orbitron font-bold text-xs shadow-glow-cyan"
          >
            GO TO ARSENAL
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weapons.map((w) => (
            <div key={w.id} className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-6">
              <Viewer3D modelSpec={w.model_3d} preset="Neon" className="w-full h-[220px]" />

              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{w.category_name}</span>
                <h3 className="text-xl font-orbitron font-bold text-white mt-1">{w.name}</h3>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  {w.rarity}
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-cyan-500/20 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-400">FACTION:</span>
                  <span className="text-white font-bold">{w.faction_name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-400">UNIVERSE:</span>
                  <span className="text-white font-bold">{w.universe_name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-400">FICTIONAL POWER:</span>
                  <span className="text-amber-400 font-bold">{w.fictional_power_rating} / 100</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-400">CORE STABILITY:</span>
                  <span className="text-cyan-400 font-bold">{w.fictional_stability}%</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-800">
                  <span className="text-gray-400">ENERGY CORE:</span>
                  <span className="text-pink-400 font-bold truncate max-w-[150px]">{w.energy_type}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-400">ERA:</span>
                  <span className="text-gray-300">{w.fictional_creation_era}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
