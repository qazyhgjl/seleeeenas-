import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Universes: React.FC = () => {
  const [universes, setUniverses] = useState<any[]>([]);

  useEffect(() => {
    fetchUniverses();
  }, []);

  const fetchUniverses = async () => {
    try {
      const res = await axios.get('/api/universes/');
      setUniverses(res.data.results || res.data);
    } catch {
      setUniverses([
        { id: 1, name: 'Aetheria Nexus', era: '7th Singularity Epoch', status: 'Active Astral Matrix', description: 'A high-tech ethereal realm where quantum gravity and celestial arcane energy fuse in stellar forge reactors.' },
        { id: 2, name: 'Chronos Void', era: 'Post-Subspace Collapse', status: 'Stabilized Void Field', description: 'A bleak cyberpunk cosmos governed by rogue synthetic intelligence and dark anti-matter anomalies.' },
        { id: 3, name: 'Mythos Dominion', era: 'Age of Sun-Kings', status: 'Dormant Dragon Core', description: 'An ancient primordial domain of dragon-gods, eldritch steel, and sun-forged relics.' },
      ]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      <div className="border-b border-cyan-500/20 pb-6">
        <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold text-white">
          COSMIC UNIVERSES
        </h1>
        <p className="text-gray-400 font-mono text-sm mt-1">
          Explore the fictional world-building lore and factions of the 3D Armory.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {universes.map((u) => (
          <div key={u.id} className="glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-4">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{u.era}</span>
            <h3 className="text-2xl font-orbitron font-bold text-white">{u.name}</h3>
            <span className="inline-block px-2.5 py-0.5 rounded text-xs font-mono bg-pink-500/20 text-pink-400 border border-pink-500/30">
              {u.status}
            </span>
            <p className="text-sm font-sans text-gray-300 leading-relaxed">
              {u.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
