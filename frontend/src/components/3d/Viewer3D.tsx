import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { ProceduralWeaponMesh } from './ProceduralWeaponMesh';
import { WeaponModelSpec } from '../../types';

export type LightingPreset = 'Studio' | 'Dark' | 'Neon' | 'Cyberpunk' | 'Ancient' | 'Cosmic';

interface Viewer3DProps {
  modelSpec?: WeaponModelSpec | null;
  preset?: LightingPreset;
  autoRotate?: boolean;
  showParticles?: boolean;
  className?: string;
}

const StarParticleField: React.FC<{ color?: string }> = ({ color = '#00f0ff' }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const count = 300;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 12;
  }

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial transparent color={color} size={0.06} sizeAttenuation depthWrite={false} />
    </Points>
  );
};

const LightingSetup: React.FC<{ preset: LightingPreset }> = ({ preset }) => {
  switch (preset) {
    case 'Neon':
      return (
        <>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} color="#00f0ff" intensity={3.0} />
          <pointLight position={[-5, -5, -5]} color="#ff007f" intensity={3.0} />
          <directionalLight position={[0, 10, 0]} intensity={1.0} color="#ffffff" />
        </>
      );
    case 'Cyberpunk':
      return (
        <>
          <ambientLight intensity={0.2} />
          <spotLight position={[0, 10, 5]} angle={0.4} penumbra={1} color="#ff007f" intensity={4.0} />
          <pointLight position={[-4, 2, -2]} color="#00f0ff" intensity={2.5} />
          <pointLight position={[4, -2, 2]} color="#39ff14" intensity={2.0} />
        </>
      );
    case 'Ancient':
      return (
        <>
          <ambientLight intensity={0.5} />
          <pointLight position={[4, 6, 4]} color="#ffb700" intensity={3.5} />
          <pointLight position={[-4, -2, -4]} color="#ff4500" intensity={2.0} />
        </>
      );
    case 'Cosmic':
      return (
        <>
          <ambientLight intensity={0.3} />
          <pointLight position={[0, 8, 2]} color="#9d00ff" intensity={3.0} />
          <pointLight position={[6, -4, 4]} color="#00f0ff" intensity={2.5} />
          <pointLight position={[-6, 4, -4]} color="#ff007f" intensity={2.0} />
        </>
      );
    case 'Dark':
      return (
        <>
          <ambientLight intensity={0.15} />
          <directionalLight position={[5, 10, 5]} color="#00f0ff" intensity={1.5} />
          <pointLight position={[-5, -5, -5]} color="#ff0033" intensity={1.0} />
        </>
      );
    case 'Studio':
    default:
      return (
        <>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 7]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={1.0} color="#00f0ff" />
        </>
      );
  }
};

export const Viewer3D: React.FC<Viewer3DProps> = ({
  modelSpec,
  preset = 'Neon',
  autoRotate = true,
  showParticles = true,
  className = 'w-full h-[450px]',
}) => {
  const pType = modelSpec?.procedural_type || 'crystal_blade';
  const pColor = modelSpec?.primary_color || '#00f0ff';
  const sColor = modelSpec?.secondary_color || '#ff007f';
  const scale = modelSpec?.default_scale || 1.0;
  const rotSpeed = modelSpec?.rotation_speed || 0.005;

  return (
    <div className={`relative overflow-hidden rounded-xl bg-black/60 border border-cyan-500/20 hud-corner ${className}`}>
      <Canvas gl={{ antialias: true, alpha: true }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={50} />
        <OrbitControls
          enableZoom
          enablePan
          autoRotate={autoRotate}
          autoRotateSpeed={rotSpeed * 200}
          minDistance={1.8}
          maxDistance={9.0}
        />
        <LightingSetup preset={preset} />
        {showParticles && <StarParticleField color={pColor} />}
        <Suspense fallback={null}>
          <ProceduralWeaponMesh
            proceduralType={pType}
            primaryColor={pColor}
            secondaryColor={sColor}
            scale={scale}
            rotationSpeed={autoRotate ? rotSpeed : 0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
