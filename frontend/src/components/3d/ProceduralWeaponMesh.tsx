import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ProceduralWeaponMeshProps {
  proceduralType?: string;
  primaryColor?: string;
  secondaryColor?: string;
  glowIntensity?: number;
  scale?: number;
  rotationSpeed?: number;
}

export const ProceduralWeaponMesh: React.FC<ProceduralWeaponMeshProps> = ({
  proceduralType = 'crystal_blade',
  primaryColor = '#00f0ff',
  secondaryColor = '#ff007f',
  scale = 1.0,
  rotationSpeed = 0.005,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * (delta * 60);
    }
    if (coreRef.current) {
      coreRef.current.rotation.x += 0.01;
      coreRef.current.rotation.z += 0.01;
    }
  });

  const pColor = new THREE.Color(primaryColor);
  const sColor = new THREE.Color(secondaryColor);

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {(proceduralType === 'crystal_blade' || !proceduralType) && (
        <group>
          <mesh position={[0, 1.2, 0]}>
            <coneGeometry args={[0.22, 3.2, 6]} />
            <meshStandardMaterial color={pColor} emissive={pColor} emissiveIntensity={1.2} metalness={0.8} roughness={0.1} />
          </mesh>
          <mesh ref={coreRef} position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 2.8, 8]} />
            <meshBasicMaterial color={sColor} />
          </mesh>
          <mesh position={[0, -0.4, 0]}>
            <boxGeometry args={[1.4, 0.15, 0.25]} />
            <meshStandardMaterial color="#222" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -1.0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 1.0, 12]} />
            <meshStandardMaterial color="#111" metalness={0.95} roughness={0.3} />
          </mesh>
        </group>
      )}

      {proceduralType === 'plasma_rifle' && (
        <group rotation={[0, 0, Math.PI / 12]}>
          <mesh position={[0.8, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <cylinderGeometry args={[0.18, 0.22, 2.8, 12]} />
            <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.2} />
          </mesh>
          {[-0.2, 0.3, 0.8, 1.3].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <torusGeometry args={[0.24, 0.05, 12, 24]} />
              <meshBasicMaterial color={i % 2 === 0 ? pColor : sColor} />
            </mesh>
          ))}
          <mesh position={[-0.8, -0.2, 0]} rotation={[0, 0, Math.PI / 6]}>
            <boxGeometry args={[1.0, 0.35, 0.2]} />
            <meshStandardMaterial color="#0f172a" metalness={0.8} />
          </mesh>
        </group>
      )}

      {proceduralType === 'void_staff' && (
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 4.0, 12]} />
            <meshStandardMaterial color="#0b0f19" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh ref={coreRef} position={[0, 2.2, 0]}>
            <icosahedronGeometry args={[0.45, 1]} />
            <meshBasicMaterial color={pColor} wireframe />
          </mesh>
          <mesh position={[0, 2.2, 0]}>
            <sphereGeometry args={[0.25, 32, 32]} />
            <meshBasicMaterial color={sColor} />
          </mesh>
        </group>
      )}

      {proceduralType === 'sci_scythe' && (
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 4.2, 12]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
          <mesh position={[0.9, 1.8, 0]} rotation={[0, 0, -Math.PI / 3]}>
            <coneGeometry args={[0.28, 2.4, 4]} />
            <meshStandardMaterial color={sColor} emissive={sColor} emissiveIntensity={1.5} />
          </mesh>
        </group>
      )}

      {proceduralType === 'hyper_shield' && (
        <group>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[1.4, 1.4, 0.1, 6]} />
            <meshStandardMaterial color={pColor} emissive={pColor} emissiveIntensity={1.0} transparent opacity={0.7} />
          </mesh>
        </group>
      )}

      {proceduralType === 'cosmic_cannon' && (
        <group>
          <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.4, 0.5, 2.6, 16]} />
            <meshStandardMaterial color="#111827" metalness={0.95} roughness={0.1} />
          </mesh>
          <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <sphereGeometry args={[0.42, 32, 32]} />
            <meshBasicMaterial color={sColor} />
          </mesh>
        </group>
      )}
    </group>
  );
};
