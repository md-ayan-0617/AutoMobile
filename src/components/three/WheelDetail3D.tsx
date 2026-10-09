import React, { useRef, Component, ErrorInfo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { SafeImage } from '../ui/SafeImage';

interface WheelDetailProps {
  finishColor?: string;
  caliperColor?: string;
}

function WheelMesh({ finishColor = '#C0C5CA', caliperColor = '#FF5A1F' }: WheelDetailProps) {
  const wheelGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (wheelGroupRef.current) {
      wheelGroupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={wheelGroupRef} rotation={[0, 0, 0]}>
      {/* Outer Tire */}
      <mesh>
        <torusGeometry args={[1.5, 0.42, 20, 48]} />
        <meshStandardMaterial color="#14171A" roughness={0.88} metalness={0.12} />
      </mesh>

      {/* Rim Barrel */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.28, 1.28, 0.65, 28, 1, true]} />
        <meshStandardMaterial color={finishColor} metalness={0.92} roughness={0.22} />
      </mesh>

      {/* Rim Center Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.3, 20]} />
        <meshStandardMaterial color="#1B1F22" metalness={0.9} roughness={0.18} />
      </mesh>

      {/* Wheel Spokes (10 aerodynamic blades) */}
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 10;
        return (
          <group key={i} rotation={[0, 0, angle]}>
            <mesh position={[0, 0.72, 0.08]} rotation={[0, 0.1, 0]}>
              <boxGeometry args={[0.12, 1.15, 0.08]} />
              <meshStandardMaterial color={finishColor} metalness={0.94} roughness={0.16} />
            </mesh>
          </group>
        );
      })}

      {/* Carbon-Ceramic Brake Rotor */}
      <mesh position={[0, 0, -0.06]}>
        <ringGeometry args={[0.42, 1.05, 28]} />
        <meshStandardMaterial
          color="#2A2E33"
          roughness={0.5}
          metalness={0.65}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Monoblock Brake Caliper */}
      <group position={[0, 0.76, 0.04]} rotation={[0, 0, 0.35]}>
        <mesh>
          <boxGeometry args={[0.38, 0.68, 0.22]} />
          <meshStandardMaterial color={caliperColor} roughness={0.25} metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

class WheelErrorBoundary extends Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('Wheel 3D context fallback active:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ width: '100%', height: '100%', minHeight: '320px' }}>
          <SafeImage
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=800&auto=format&fit=crop"
            alt="Aurelis Monoblock Wheel Detail"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </div>
      );
    }
    return this.props.children;
  }
}

export const WheelDetail3D: React.FC<WheelDetailProps> = (props) => {
  return (
    <WheelErrorBoundary>
      <div style={{ width: '100%', height: '360px', position: 'relative' }}>
        <Canvas gl={{ antialias: true, alpha: true }} dpr={[1, 1.5]}>
          <PerspectiveCamera makeDefault position={[0, 0, 4.2]} fov={40} />
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 5, 5]} intensity={2.5} color="#FFFFFF" />
          <directionalLight position={[-4, -3, -2]} intensity={1.2} color="#65A0FF" />
          <spotLight position={[0, 5, 2]} intensity={2} angle={0.5} penumbra={1} />

          <WheelMesh {...props} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
      </div>
    </WheelErrorBoundary>
  );
};
