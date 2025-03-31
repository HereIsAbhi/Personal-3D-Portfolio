import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { Canvas, useGLTF } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, EffectComposer, Bloom } from '@react-three/drei';
import { useTheme } from '../context/ThemeContext';
import { useInView } from 'react-intersection-observer';
import Avatar3D from './Avatar3D';
import TechStack from './TechStack';
import EnhancedScene from './EnhancedScene';

const HolographicCard = ({ title, content, delay }) => {
  const { isDarkMode } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={`relative p-6 rounded-lg backdrop-blur-lg ${
        isDarkMode ? 'bg-gray-900/50' : 'bg-white/50'
      } border border-opacity-20 ${
        isDarkMode ? 'border-blue-500' : 'border-blue-300'
      } shadow-lg hover:shadow-xl transition-all duration-300 group`}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h3 className={`text-xl font-bold mb-4 ${
        isDarkMode ? 'text-blue-400' : 'text-blue-600'
      }`}>{title}</h3>
      <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {content}
      </p>
    </motion.div>
  );
};

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = '#0F0';
      ctx.font = '15px monospace';
      
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
      const columns = canvas.width / 15;
      
      for (let i = 0; i < columns; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        const x = i * 15;
        const y = Math.random() * canvas.height;
        ctx.fillText(text, x, y);
      }

      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    resizeCanvas();
    drawMatrix();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none opacity-10"
      style={{ zIndex: -1 }}
    />
  );
};

const About = () => {
  const { isDarkMode } = useTheme();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const sceneRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event) => {
    if (!sceneRef.current) return;
    const rect = sceneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="about" className="min-h-screen relative overflow-hidden py-20">
      <MatrixBackground />
      
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About Me
          </h2>
          <div className={`w-24 h-1 mx-auto ${
            isDarkMode ? 'bg-blue-500' : 'bg-blue-600'
          }`} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <HolographicCard
              title="Introduction"
              content="I'm a passionate full-stack developer with expertise in creating immersive web experiences. My journey in tech is driven by a constant desire to learn and innovate."
              delay={0.2}
            />
            <HolographicCard
              title="Skills"
              content="Proficient in React, Three.js, Node.js, and modern web technologies. Specialized in creating interactive 3D experiences and responsive web applications."
              delay={0.4}
            />
          </div>
          <div className="space-y-6">
            <HolographicCard
              title="Work Mode"
              content="I thrive in remote environments, collaborating with teams worldwide. My work style combines creativity with technical precision."
              delay={0.6}
            />
            <HolographicCard
              title="Passion"
              content="I'm passionate about creating seamless user experiences and pushing the boundaries of web technology. Always excited to tackle new challenges."
              delay={0.8}
            />
          </div>
        </div>

        <div className="mt-16">
          <h3 className={`text-2xl font-bold mb-8 text-center ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Tech Stack
          </h3>
          <TechStack />
        </div>

        <motion.div 
          ref={sceneRef}
          className="mt-16 h-[400px] relative"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX: useTransform(mouseY, [-100, 100], [15, -15]),
            rotateY: useTransform(mouseX, [-100, 100], [-15, 15]),
            transformStyle: 'preserve-3d',
            perspective: 1000,
          }}
        >
          <EnhancedScene />
        </motion.div>
      </div>
    </section>
  );
};

export default About; 