import { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  OrbitControls, 
  Float, 
  EffectComposer, 
  Bloom, 
  ChromaticAberration,
  Noise,
  Scanline,
  Glitch
} from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const ParticleField = () => {
  const particlesRef = useRef();
  const { isDarkMode } = useTheme();
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);

  useEffect(() => {
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = (Math.random() - 0.5) * 20;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    particlesRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < positions.length; i += 3) {
      positions[i + 1] += Math.sin(time + positions[i]) * 0.01;
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05}
        color={isDarkMode ? '#00ffff' : '#0066ff'}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const CyberGrid = () => {
  const gridRef = useRef();
  const { isDarkMode } = useTheme();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    gridRef.current.material.uniforms.time.value = time;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={gridRef}
        uniforms={{
          time: { value: 0 },
          color: { value: new THREE.Color(isDarkMode ? '#00ffff' : '#0066ff') }
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec3 color;
          varying vec2 vUv;
          void main() {
            float grid = step(0.95, mod(vUv.x * 20.0 + time * 0.5, 1.0)) +
                        step(0.95, mod(vUv.y * 20.0 + time * 0.5, 1.0));
            gl_FragColor = vec4(color * grid * 0.3, grid * 0.3);
          }
        `}
        transparent
      />
    </mesh>
  );
};

const EnhancedScene = () => {
  const { isDarkMode } = useTheme();
  const [glitchActive, setGlitchActive] = useState(false);
  const sceneRef = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 100);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 45 }}
      className="w-full h-full"
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance"
      }}
    >
      <color attach="background" args={[isDarkMode ? '#000' : '#111']} />
      <fog attach="fog" args={[isDarkMode ? '#000' : '#111', 5, 30]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color={isDarkMode ? '#00ffff' : '#0066ff'} />
      <pointLight position={[-5, -5, -5]} intensity={1} color={isDarkMode ? '#ff00ff' : '#6600ff'} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color={isDarkMode ? '#00ffff' : '#0066ff'}
      />

      <Float
        speed={1.5}
        rotationIntensity={0.5}
        floatIntensity={0.5}
      >
        <group ref={sceneRef}>
          <mesh
            geometry={nodes.desk.geometry}
            material={materials.desk}
          >
            <meshStandardMaterial
              color={isDarkMode ? '#00ffff' : '#0066ff'}
              transparent
              opacity={0.9}
              metalness={1}
              roughness={0.1}
              emissive={isDarkMode ? '#00ffff' : '#0066ff'}
              emissiveIntensity={1}
              envMapIntensity={1}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>

      <ParticleField />
      <CyberGrid />

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 2}
      />

      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration
          offset={[0.002, 0.002]}
          radialModulation={true}
          modulationOffset={0.5}
        />
        <Noise opacity={0.02} />
        <Scanline density={0.5} />
        {glitchActive && <Glitch delay={[1.5, 3.5]} />}
      </EffectComposer>
    </Canvas>
  );
};

export default EnhancedScene; 