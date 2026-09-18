import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Database, Box, Compass, Scroll, Bookmark, User, Menu, X, Volume2, VolumeX, Cpu } from 'lucide-react';
import { usePerformance } from '../../context/PerformanceContext';
import { useAuth } from '../../context/AuthContext';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { tier, setTier, soundEnabled, toggleSound } = usePerformance();
  const { user } = useAuth();

  const navLinks = [
    { name: 'ARMORY', path: '/', icon: Shield },
    { name: '3D VAULT', path: '/vault', icon: Box },
    { name: 'ARSENAL', path: '/arsenal', icon: Database },
    { name: '3D MAP', path: '/map', icon: Compass },
    { name: 'UNIVERSES', path: '/universes', icon: Scroll },
    { name: 'MY COLLECTION', path: '/collection', icon: Bookmark },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b border-cyan-500/20 px-4 md:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-400/50 flex items-center justify-center text-cyan-400 group-hover:shadow-glow-cyan transition-all">
            <Shield className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="font-orbitron font-extrabold text-lg tracking-wider text-white group-hover:text-cyan-400 transition-colors">
              ARMORY<span className="text-cyan-400">3D</span>
            </span>
            <p className="text-[10px] text-cyan-400/60 font-mono -mt-1 tracking-widest uppercase">
              ARCHIVE MATRIX v2.5
            </p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-orbitron font-semibold tracking-wider transition-all border ${
                  active
                    ? 'bg-cyan-500/15 border-cyan-400 text-cyan-300 shadow-glow-cyan'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-cyan-500/30 hover:bg-cyan-500/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-cyan-400' : 'text-gray-400'}`} />
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center bg-black/40 border border-cyan-500/30 rounded p-1 text-[11px] font-mono">
            <Cpu className="w-3.5 h-3.5 text-cyan-400 mr-1.5 ml-1" />
            {(['HIGH', 'MEDIUM', 'LOW'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`px-2 py-0.5 rounded uppercase transition-all ${
                  tier === t ? 'bg-cyan-400 text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <button
            onClick={toggleSound}
            className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 transition-all"
            title={soundEnabled ? 'Mute Audio Effects' : 'Enable Audio Effects'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-gray-500" />}
          </button>

          <Link
            to="/collection"
            className="flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-400/40 rounded text-xs font-orbitron font-bold text-cyan-300 hover:bg-cyan-500/20 transition-all"
          >
            <User className="w-4 h-4" />
            {user ? user.username : 'ARCHIVIST'}
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-cyan-400 border border-cyan-500/30 rounded bg-black/40"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-4 border-t border-cyan-500/20 bg-black/90 p-4 rounded-b-xl flex flex-col gap-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 p-2.5 rounded text-sm font-orbitron font-bold text-gray-300 hover:bg-cyan-500/20 hover:text-cyan-300"
              >
                <Icon className="w-5 h-5 text-cyan-400" />
                {link.name}
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
};
