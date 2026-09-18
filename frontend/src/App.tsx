import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PerformanceProvider } from './context/PerformanceContext';
import { Navbar } from './components/ui/Navbar';
import { Home } from './pages/Home';
import { Armory3DVault } from './pages/Armory3DVault';
import { Arsenal } from './pages/Arsenal';
import { WeaponDetail } from './pages/WeaponDetail';
import { Compare } from './pages/Compare';
import { WorldMap3D } from './pages/WorldMap3D';
import { MyArmory } from './pages/MyArmory';
import { Universes } from './pages/Universes';

export default function App() {
  return (
    <AuthProvider>
      <PerformanceProvider>
        <Router>
          <div className="min-h-screen bg-[#030712] text-gray-100 flex flex-col selection:bg-cyan-500 selection:text-black">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vault" element={<Armory3DVault />} />
                <Route path="/arsenal" element={<Arsenal />} />
                <Route path="/weapon/:id" element={<WeaponDetail />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/map" element={<WorldMap3D />} />
                <Route path="/collection" element={<MyArmory />} />
                <Route path="/universes" element={<Universes />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </main>
          </div>
        </Router>
      </PerformanceProvider>
    </AuthProvider>
  );
}
