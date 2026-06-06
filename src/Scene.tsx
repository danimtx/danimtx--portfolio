import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Environment, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export function Scene() {
  const { scene } = useGLTF('/astronaut-optimized.glb') as any;
  const group = useRef<THREE.Group>(null);

  // Animación suave de rotación general (sigue al mouse)
  useFrame((state) => {
    if (group.current) {
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      
      // Inercia / suavizado
      group.current.rotation.y += (targetX - group.current.rotation.y) * 0.03;
      group.current.rotation.x += (-targetY - group.current.rotation.x) * 0.03;
    }
  });

  return (
    <>
      <color attach="background" args={['#020205']} />
      
      <Environment preset="city" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      
      {/* Luces de Neón Extremas */}
      <pointLight position={[-5, 0, -5]} intensity={3} color="#bf00ff" distance={15} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#ff003c" distance={15} />

      {/* Efecto de Estrellas Ultra Realista (Drei) */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Polvo Espacial / Neón al rededor del astronauta */}
      <Sparkles count={100} scale={12} size={3} speed={0.4} opacity={0.5} color="#bf00ff" />
      <Sparkles count={50} scale={10} size={4} speed={0.2} opacity={0.3} color="#ff003c" />

      {/* Objeto principal (Astronauta) */}
      <Float 
        speed={1.5} 
        rotationIntensity={0.2} 
        floatIntensity={2} 
        floatingRange={[-0.2, 0.2]} 
      >
        <group ref={group}>
          <primitive object={scene} scale={1.8} position={[0, -1.5, 0]} />
        </group>
      </Float>

    </>
  );
}

// Pre-cargar modelo
useGLTF.preload('/astronaut-optimized.glb');
