import React, { useRef, Suspense } from 'react';
import { useLanguage } from './LanguageContext';
import { CONTENT } from '../constants';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

// Fix for missing R3F types in strict environments
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      planeGeometry: any;
      shaderMaterial: any;
    }
  }
}

// --------------------------------------------------------
// ABSTRACT GRID SHADER
// --------------------------------------------------------
const GridShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColor1: { value: new THREE.Color('#1a0b2e') }, // Deep Dark Purple
    uColor2: { value: new THREE.Color('#d946ef') }, // Magenta
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Calculate distance from mouse pointer
      vec2 mousePos = (uMouse - 0.5) * 10.0;
      float dist = distance(pos.xy, mousePos);
      
      // Mouse Interaction: Gentler Ripple
      float interaction = smoothstep(5.0, 0.0, dist);
      float mouseWave = interaction * sin(dist * 2.0 - uTime * 2.0) * 0.3; // Reduced amplitude

      // Background Ambient Wave - Slower and Smoother
      // Reduced frequency (0.3 instead of 0.5) and speed (uTime * 0.2)
      float bigWave = sin(pos.x * 0.3 + uTime * 0.2) * sin(pos.y * 0.3 + uTime * 0.2) * 0.5; 
      
      // Subtle detail wave
      float detailWave = sin(pos.x * 1.0 + uTime * 0.5) * 0.1;
      
      // Combine elevations
      float elevation = bigWave + detailWave + mouseWave;
      
      pos.z += elevation;
      vElevation = elevation;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    varying vec2 vUv;
    varying float vElevation;

    void main() {
      // Create Grid Pattern
      float divisions = 40.0;
      float thickness = 0.03; // Thinner lines
      
      float gridX = step(1.0 - thickness, fract(vUv.x * divisions));
      float gridY = step(1.0 - thickness, fract(vUv.y * divisions));
      float grid = max(gridX, gridY);
      
      // Color mixing based on elevation
      float mixStrength = smoothstep(-1.0, 1.0, vElevation);
      vec3 color = mix(uColor1, uColor2, mixStrength);
      
      // Apply Grid
      vec3 finalColor = mix(color * 0.3, vec3(1.0), grid * 0.4); 
      
      // Circular Vignette
      float distFromCenter = distance(vUv, vec2(0.5));
      float alpha = 1.0 - smoothstep(0.3, 0.5, distFromCenter);

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

// --------------------------------------------------------
// 3D COMPONENT
// --------------------------------------------------------
const AbstractTerrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const mouse = useRef(new THREE.Vector2(0.5, 0.5));
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));

  useFrame((state) => {
    if (!materialRef.current) return;
    
    // Slower time progression
    materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    
    // Smooth Mouse
    mouse.current.lerp(targetMouse.current, 0.05); // Slower lerp for smoothness
    materialRef.current.uniforms.uMouse.value = mouse.current;
  });

  return (
    <mesh 
      ref={meshRef} 
      rotation={[-Math.PI / 3, 0, 0]} 
      position={[0, 0, 0]}
      onPointerMove={(e) => {
        if(e.uv) targetMouse.current.set(e.uv.x, e.uv.y);
      }}
      onPointerLeave={() => {
        targetMouse.current.set(0.5, 0.5);
      }}
    >
      <planeGeometry args={[16, 16, 128, 128]} />
      <shaderMaterial 
        ref={materialRef}
        args={[GridShaderMaterial]}
        transparent={true}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// --------------------------------------------------------
// HERO UI COMPONENT
// --------------------------------------------------------
const Hero: React.FC = () => {
  const { language } = useLanguage();
  const content = CONTENT[language].hero;

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center">
      
      {/* 1. 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <Suspense fallback={null}>
            <AbstractTerrain />
          </Suspense>
        </Canvas>
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between py-12 px-6">
        
        {/* Spacer */}
        <div></div>

        {/* CENTER TITLE */}
        <div className="flex flex-col items-center justify-center text-center mix-blend-exclusion perspective-1000">
            <p className="font-mono text-xs md:text-sm text-purple-400 mb-6 tracking-[0.4em] uppercase font-bold">
              {content.sub}
            </p>
            <div className="flex flex-col items-center leading-none space-y-2">
              <h1 className="font-display font-[800] text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white select-none">
                {content.role1}
              </h1>
              {/* Solid text matching the first line */}
              <h1 className="font-display font-[800] text-6xl md:text-8xl lg:text-9xl tracking-tighter text-white select-none">
                {content.role2}
              </h1>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end w-full gap-8">
           
           <div 
             className="pointer-events-auto flex items-center gap-4 group cursor-hover" 
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth'})}
           >
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-black/20 backdrop-blur-sm group-hover:border-purple-500 group-hover:bg-purple-500/20 transition-all duration-300">
                <ArrowDown size={20} className="text-white group-hover:translate-y-1 transition-transform" />
              </div>
              <span className="hidden md:inline font-mono text-xs text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">
                Scroll
              </span>
           </div>

           <button 
             onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth'})}
             className="pointer-events-auto group relative flex items-center gap-3 px-8 py-4 rounded-full bg-transparent backdrop-blur-xl border border-white/20 hover:bg-white/10 hover:border-purple-500 transition-all duration-500 cursor-hover shadow-[0_0_20px_rgba(0,0,0,0.5)]"
           >
             <span className="font-bold uppercase text-xs tracking-[0.15em] text-white">
               {content.cta}
             </span>
             <div className="relative w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform">
                <ArrowUpRight size={16} className="text-white relative z-10" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-pulse"></div>
             </div>
           </button>
        </div>

      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Hero;