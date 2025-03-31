import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, useGLTF, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Avatar3D = () => {
  const avatarRef = useRef();
  const { nodes, materials } = useGLTF('/models/desk.glb');

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    avatarRef.current.rotation.y = Math.sin(time * 0.5) * 0.1;
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.5}
      floatIntensity={0.5}
    >
      <group ref={avatarRef}>
        <mesh
          geometry={nodes.desk.geometry}
          material={materials.desk}
        >
          <meshStandardMaterial
            color="#00ffff"
            transparent
            opacity={0.9}
            metalness={1}
            roughness={0.1}
            emissive="#00ffff"
            emissiveIntensity={1}
            envMapIntensity={1}
            toneMapped={false}
          />
        </mesh>
      </group>
    </Float>
  );
};

export default Avatar3D; 