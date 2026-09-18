import React, { createContext, useContext, useState } from 'react';

type PerformanceTier = 'HIGH' | 'MEDIUM' | 'LOW';

interface PerformanceContextType {
  tier: PerformanceTier;
  setTier: (tier: PerformanceTier) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const PerformanceContext = createContext<PerformanceContextType>({
  tier: 'HIGH',
  setTier: () => {},
  soundEnabled: true,
  toggleSound: () => {},
});

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tier, setTier] = useState<PerformanceTier>('HIGH');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => setSoundEnabled((prev) => !prev);

  return (
    <PerformanceContext.Provider value={{ tier, setTier, soundEnabled, toggleSound }}>
      {children}
    </PerformanceContext.Provider>
  );
};

export const usePerformance = () => useContext(PerformanceContext);
