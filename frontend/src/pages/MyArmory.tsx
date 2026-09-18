import React, { useState, useEffect } from 'react';
import { Bookmark, Award, Trophy } from 'lucide-react';
import { Achievement } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const MyArmory: React.FC = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const [favRes, achRes] = await Promise.all([
        axios.get('/api/favorites/'),
        axios.get('/api/achievements/')
      ]);
      setFavorites(favRes.data.results || favRes.data);
      setAchievements(achRes.data.results || achRes.data);
    } catch {
      setAchievements([
        { id: 1, title: 'First Discovery', slug: 'first-discovery', description: 'Discover your first legendary 3D weapon artifact.', badge_icon: 'compass', fictional_points: 100 },
        { id: 2, title: 'Master Collector', slug: 'master-collector', description: 'Collect 10 or more weapons in your personal armory.', badge_icon: 'trophy', fictional_points: 500 },
        { id: 3, title: 'Legendary Hunter', slug: 'legendary-hunter', description: 'Inspect 5 Mythic or Ancient rarity armaments.', badge_icon: 'crown', fictional_points: 300 },
      ]);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 md:px-8 max-w-7xl mx-auto space-y-8">
      <div className="glass-panel p-6 rounded-2xl border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center text-cyan-300 font-orbitron font-bold text-2xl shadow-glow-cyan">
            {user ? user.username[0].toUpperCase() : 'A'}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-orbitron font-extrabold text-white">
              {user ? user.username : 'GRAND ARCHIVIST'}
            </h1>
            <p className="text-xs font-mono text-cyan-400 mt-1">
              LEVEL 99 • {user ? user.title : 'HIGH GRAND ARCHIVIST'}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="bg-black/50 px-4 py-2.5 rounded-xl border border-cyan-500/20 text-center">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">SAVED ARTIFACTS</span>
            <span className="font-orbitron font-extrabold text-xl text-cyan-400">{favorites.length}</span>
          </div>
          <div className="bg-black/50 px-4 py-2.5 rounded-xl border border-pink-500/20 text-center">
            <span className="text-[10px] font-mono text-gray-400 block uppercase">ACHIEVEMENTS</span>
            <span className="font-orbitron font-extrabold text-xl text-pink-400">{achievements.length}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
          <Bookmark className="w-5 h-5 text-cyan-400" />
          SAVED WEAPON COLLECTION
        </h2>

        {favorites.length === 0 ? (
          <div className="glass-panel p-8 rounded-xl text-center border border-cyan-500/20">
            <p className="font-mono text-sm text-gray-400">
              No saved weapons in your personal collection matrix yet.
            </p>
            <Link
              to="/arsenal"
              className="inline-block mt-4 px-6 py-2.5 rounded bg-cyan-400 text-black font-orbitron font-bold text-xs shadow-glow-cyan"
            >
              EXPLORE ARSENAL
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.map((fav) => (
              <div key={fav.id} className="glass-panel p-4 rounded-xl border border-cyan-500/20 space-y-2">
                <span className="text-xs font-mono text-cyan-400 uppercase">{fav.weapon_details?.category_name}</span>
                <h3 className="font-orbitron font-bold text-lg text-white">{fav.weapon_details?.name}</h3>
                <Link
                  to={`/weapon/${fav.weapon}`}
                  className="inline-block mt-2 text-xs font-mono text-pink-400 hover:underline"
                >
                  VIEW 3D SPECS →
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 pt-4 border-t border-cyan-500/20">
        <h2 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          COLLECTOR ACHIEVEMENTS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((ach) => (
            <div key={ach.id} className="glass-panel p-4 rounded-xl border border-amber-500/30 flex items-start gap-4">
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-400/40 text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-sm text-white">{ach.title}</h4>
                <p className="text-xs font-sans text-gray-300 mt-1">{ach.description}</p>
                <span className="inline-block mt-2 text-[10px] font-mono text-amber-400 font-bold">
                  +{ach.fictional_points} REPUTATION PTS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
