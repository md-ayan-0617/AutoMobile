import React, { useRef, useMemo, Component, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SafeImage } from '../ui/SafeImage';

interface CarBodyProps {
  color?: string;
}

function StylizedAurelisCar({ color = '#1B1F22' }: CarBodyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const frontLightRef = useRef<THREE.PointLight>(null);

  // Subtle pointer movement
  useFrame((state) => {
    if (!groupRef.current) return;
    const { pointer } = state;
    // Subtly shift orientation: 1-2% as per creative concept
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, (pointer.x * Math.PI) / 18, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, (-pointer.y * Math.PI) / 36, 0.05);
  });

  const carPaintMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.88,
        roughness: 0.18,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.95
      }),
    [color]
  );

  const glassMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#0A0C0E'),
        metalness: 0.2,
        roughness: 0.05,
        transmission: 0.65,
        thickness: 0.8,
        transparent: true,
        opacity: 0.88
      }),
    []
  );

  const wheelRimMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#D8DEE4',
        metalness: 0.95,
        roughness: 0.2
      }),
    []
  );

  const tireMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#151719',
        roughness: 0.85,
        metalness: 0.1
      }),
    []
  );

  const ledLightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#A5C9FF',
        emissive: '#65A0FF',
        emissiveIntensity: 3.5
      }),
    []
  );

  const tailLightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#FF2200',
        emissive: '#FF3300',
        emissiveIntensity: 2.8
      }),
    []
  );

  return (
    <group ref={groupRef} position={[0, -0.4, 0]}>
      {/* Lower Chassis / Aerodynamic Splitter */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[4.7, 0.35, 1.95]} />
        <meshStandardMaterial color="#0A0C0E" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Main Sculpted Body */}
      <mesh material={carPaintMaterial} position={[0, 0.65, 0]}>
        <boxGeometry args={[4.4, 0.55, 1.88]} />
      </mesh>

      {/* Hood Slope */}
      <mesh
        material={carPaintMaterial}
        position={[1.5, 0.68, 0]}
        rotation={[0, 0, -0.1]}
      >
        <boxGeometry args={[1.5, 0.45, 1.84]} />
      </mesh>

      {/* Rear Haunches / Fastback slope */}
      <mesh
        material={carPaintMaterial}
        position={[-1.4, 0.82, 0]}
        rotation={[0, 0, 0.12]}
      >
        <boxGeometry args={[1.6, 0.48, 1.84]} />
      </mesh>

      {/* Cabin / Greenhouse */}
      <mesh material={glassMaterial} position={[-0.1, 1.15, 0]}>
        <boxGeometry args={[2.2, 0.55, 1.5]} />
      </mesh>

      {/* Roof Panel */}
      <mesh material={carPaintMaterial} position={[-0.1, 1.45, 0]}>
        <boxGeometry args={[1.9, 0.08, 1.42]} />
      </mesh>

      {/* Laser Front Lights */}
      <mesh material={ledLightMaterial} position={[2.22, 0.66, 0.68]}>
        <boxGeometry args={[0.08, 0.06, 0.38]} />
      </mesh>
      <mesh material={ledLightMaterial} position={[2.22, 0.66, -0.68]}>
        <boxGeometry args={[0.08, 0.06, 0.38]} />
      </mesh>

      {/* Full-width Rear Light Signature */}
      <mesh material={tailLightMaterial} position={[-2.22, 0.72, 0]}>
        <boxGeometry args={[0.08, 0.05, 1.78]} />
      </mesh>

      {/* Wheels */}
      {/* Front Left */}
      <group position={[1.45, 0.35, 0.98]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={tireMaterial}>
          <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={wheelRimMaterial} position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.26, 0.26, 0.29, 16]} />
        </mesh>
      </group>

      {/* Front Right */}
      <group position={[1.45, 0.35, -0.98]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={tireMaterial}>
          <cylinderGeometry args={[0.38, 0.38, 0.28, 24]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={wheelRimMaterial} position={[0, 0, -0.02]}>
          <cylinderGeometry args={[0.26, 0.26, 0.29, 16]} />
        </mesh>
      </group>

      {/* Rear Left */}
      <group position={[-1.45, 0.35, 0.98]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={tireMaterial}>
          <cylinderGeometry args={[0.38, 0.38, 0.32, 24]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={wheelRimMaterial} position={[0, 0, 0.02]}>
          <cylinderGeometry args={[0.26, 0.26, 0.33, 16]} />
        </mesh>
      </group>

      {/* Rear Right */}
      <group position={[-1.45, 0.35, -0.98]}>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={tireMaterial}>
          <cylinderGeometry args={[0.38, 0.38, 0.32, 24]} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} material={wheelRimMaterial} position={[0, 0, -0.02]}>
          <cylinderGeometry args={[0.26, 0.26, 0.33, 16]} />
        </mesh>
      </group>

      {/* Subtle Front Ambient Glow */}
      <pointLight ref={frontLightRef} position={[2.6, 0.6, 0]} intensity={1.5} color="#65A0FF" distance={4} />
    </group>
  );
}

class ThreeErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Three.js canvas context fallback active:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', minHeight: '380px' }}>
          <SafeImage
            src="https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1800&auto=format&fit=crop"
            alt="Aurelis Motors Hero Vehicle Stage"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export const HeroVehicle3D: React.FC<{ color?: string }> = ({ color = '#181C20' }) => {
  return (
    <ThreeErrorBoundary>
      <div style={{ width: '100%', height: '100%', minHeight: '360px', position: 'relative' }}>
        <Canvas
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ pointerEvents: 'auto' }}
        >
          <PerspectiveCamera makeDefault position={[4.2, 1.8, 4.6]} fov={38} />

          {/* Showroom Lighting Environment */}
          <ambientLight intensity={0.9} />
          <rectAreaLight width={6} height={3} intensity={4} color="#F7F8F9" position={[0, 5, 0]} rotation={[-Math.PI / 2, 0, 0]} />
          <directionalLight position={[5, 6, 4]} intensity={2.2} color="#FFFFFF" />
          <directionalLight position={[-4, 4, -3]} intensity={1.4} color="#65A0FF" />
          <spotLight position={[0, 6, 3]} intensity={1.8} angle={0.6} penumbra={0.8} color="#FFFAED" />

          <Float speed={1.2} rotationIntensity={0.06} floatIntensity={0.12} floatingRange={[-0.05, 0.05]}>
            <StylizedAurelisCar color={color} />
          </Float>

          <ContactShadows
            position={[0, -0.42, 0]}
            opacity={0.7}
            scale={7}
            blur={1.6}
            far={3}
            resolution={256}
            color="#000000"
          />
        </Canvas>
      </div>
    </ThreeErrorBoundary>
  );
};
