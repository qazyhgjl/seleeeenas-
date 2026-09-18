import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Shield, Scroll } from 'lucide-react';
import axios from 'axios';

interface SectorLocation {
  id: number;
  name: string;
  sector_type: string;
  map_coordinates_x: number;
  map_coordinates_y: number;
  map_coordinates_z: number;
  description: string;
  universe_name: string;
}

export const WorldMap3D: React.FC = () => {
  const [locations, setLocations] = useState<SectorLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<SectorLocation | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get('/api/locations/');
      const data = res.data.results || res.data;
      setLocations(data);
      if (data.length > 0) setSelectedLocation(data[0]);
    } catch {
      const sampleLocations: SectorLocation[] = [
        {
          id: 1,
          name: 'Vault of Starlight',
          sector_type: 'Astral Vault',
          map_coordinates_x: 35,
          map_coordinates_y: 25,
          map_coordinates_z: 12,
          description: 'Floating crystal fortress holding legendary starlight weapons.',
          universe_name: 'Aetheria Nexus',
        },
        {
          id: 2,
          name: 'Abyssal Forge 09',
          sector_type: 'Sub-Space Lab',
          map_coordinates_x: 70,
          map_coordinates_y: 65,
          map_coordinates_z: -88,
          description: 'Deep orbital dark matter laboratory crafting singularity weaponry.',
          universe_name: 'Chronos Void',
        },
        {
          id: 3,
          name: 'Magma Spire Anvil',
          sector_type: 'Dragon Forge',
          map_coordinates_x: 20,
          map_coordinates_y: 80,
          map_coordinates_z: 45,
          description: 'Volcanic anvil hearth of the Sol-Forge Guild.',
          universe_name: 'Mythos Dominion',
        },
      ];
      setLocations(sampleLocations);
      setSelectedLocation(sampleLocations[0]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-8 border-b border-cyan-500/20 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono mb-2 uppercase">
          <Compass className="w-3.5 h-3.5" /> Interactive Sector Radar
        </div>
        <h1 className="text-3xl md:text-5xl font-orbitron font-extrabold text-white">
          COSMIC WEAPON LOCATIONS
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 glass-panel h-[500px] rounded-2xl relative overflow-hidden border border-cyan-500/30 p-6 flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-black to-black opacity-80" />
          <div className="scanlines absolute inset-0" />

          <div className="w-96 h-96 rounded-full border border-cyan-500/20 absolute flex items-center justify-center animate-spin" style={{ animationDuration: '40s' }}>
            <div className="w-64 h-64 rounded-full border border-cyan-500/30" />
            <div className="w-32 h-32 rounded-full border border-pink-500/20" />
          </div>

          {locations.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            return (
              <button
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                style={{
                  top: `${Math.max(15, Math.min(85, loc.map_coordinates_y))}%`,
                  left: `${Math.max(15, Math.min(85, loc.map_coordinates_x))}%`,
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20`}
              >
                <div
                  className={`relative p-3 rounded-full transition-all ${
                    isSelected
                      ? 'bg-cyan-400 text-black scale-125 shadow-glow-cyan'
                      : 'bg-cyan-950/80 text-cyan-400 border border-cyan-400/50 hover:scale-110'
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                  <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/90 px-2 py-1 rounded text-xs font-orbitron font-bold text-cyan-300 border border-cyan-500/30 opacity-80 group-hover:opacity-100">
                    {loc.name}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-cyan-500/30 space-y-6">
          {selectedLocation ? (
            <>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  SECTOR TYPE: {selectedLocation.sector_type}
                </span>
                <h2 className="text-2xl font-orbitron font-bold text-white mt-1">
                  {selectedLocation.name}
                </h2>
                <span className="text-xs font-mono text-pink-400 block mt-1">
                  REALM: {selectedLocation.universe_name}
                </span>
              </div>

              <div className="bg-black/50 p-4 rounded-xl border border-cyan-500/20 space-y-2 font-mono text-xs text-gray-300">
                <p className="text-cyan-400 font-bold">COORDINATES:</p>
                <p>X: {selectedLocation.map_coordinates_x}.00 | Y: {selectedLocation.map_coordinates_y}.00 | Z: {selectedLocation.map_coordinates_z}.00</p>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {selectedLocation.description}
              </p>
            </>
          ) : (
            <div className="text-gray-400 font-mono text-sm text-center py-12">
              Select a sector marker on the 3D map grid to inspect location intel.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
