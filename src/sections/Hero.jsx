import { PerspectiveCamera } from "@react-three/drei";
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import HackerRoom from "../components/HackerRoom.jsx";
import CanvasLoader from "../components/CanvasLoader.jsx";
// import {useControls} from 'leva';
import { useMediaQuery } from "react-responsive";
import { calculateSizes } from "../constants/index.js";
import Target from "../components/Target.jsx";
import ReactLogo from "../components/ReactLogo.jsx";
import Cube from "../components/Cube.jsx";
import Rings from "../components/Rings.jsx";
import HeroCamera from "../components/HeroCamera.jsx";
import Button from "../components/Button.jsx";
import { useTheme } from '../context/ThemeContext';

// class ErrorBoundary extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     return { hasError: true };
//   }

//   render() {
//     if (this.state.hasError) {
//       return <p className="text-white">Something went wrong while loading the 3D scene.</p>;
//     }
//     return this.props.children;
//   }
// }


const Hero = () => {

    // const x = useControls('Hacker Room', {
    //   positionX: {
    //     value: 2.5,
    //     min: -10,
    //     max: 10,
    //   },
    //   positionY: {
    //     value: 2.5,
    //     min: -15,
    //     max: 10,
    //   },
    //   positionZ: {
    //     value: 2.5,
    //     min: -10,
    //     max: 10,
    //   },
    //   rotationX: {
    //     value: 2.5,
    //     min: -10,
    //     max: 10,
    //   },
    //   rotationY: {
    //     value: 2.5,
    //     min: -10,
    //     max: 10,
    //   },
    //   rotationZ: {
    //     value: 2.5,
    //     min: -10,
    //     max: 10,
    //   },
    //   scale: {
    //     value: 0.1,
    //     min: -10,
    //     max: 10,
    //   },
    // });
    const isSmall = useMediaQuery({query:'(max-width: 640px)'});
    const isMobile = useMediaQuery({query:'(max-width: 768px)'});
    const isTablet = useMediaQuery({query:'(min-width:768px,max-width: 1024px)'});
    const { isDarkMode } = useTheme();
    const sizes = calculateSizes(isSmall, isMobile, isTablet);
    
    

  return(
    <section className="min-h-screen w-full flex flex-col relative" id="home">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
      
        <p className={`sm:text-3xl text-2xl font-medium text-center font-generalsans ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Hi,I am Abhinav <span className="waving-hand">👋</span></p>
        <p className={`hero_tag ${isDarkMode ? 'text-gray_gradient' : 'text-gray-800'}`}>I am a FullStack Developer</p>
        {/* <p className="text-white text-center">I am a passionate Frontend Developer with a keen interest in building responsive, user-friendly websites and web applications
        </p>
        <div className="flex justify-center gap-4">
          <a href="#about" className="btn">About Me</a>
          <a href="#projects" className="btn">Projects</a>
          <a href="#contact" className="btn">Contact</a>
          
        </div> */} 
        




      </div>

    
      <div className="w-full h-full absolute inset-0">
  <Canvas style={{ width: '100%', height: '100%' }}>
    <Suspense fallback={<CanvasLoader />}>
      <PerspectiveCamera makeDefault position={[0, 0, 20]} />
      <HeroCamera isMobile={isMobile}>
      <HackerRoom 
      
      position={sizes.deskPosition} 
      rotation={[0,-Math.PI,0]}
      scale={sizes.deskScale}
      />
      </HeroCamera>
      <group>
        <Target position={sizes.targetPosition} />
        <ReactLogo position={sizes.reactLogoPosition} />
        <Cube position={sizes.cubePosition} />
        <Rings position={sizes.ringPosition} />
      </group>

        
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
    </Suspense>
  </Canvas>
</div>
<div className="w-full z-10 left-0 absolute bottom-7 right-0 c-space">
          <a href="#About" className="w-fit">
            <Button name="let's work together" isBeam containerClass="sm:w-fit w-full sm:min-w-96" />
            
          </a>
</div>
    </section>
  )
}

export default Hero;