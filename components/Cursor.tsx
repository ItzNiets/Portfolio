import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const [hoverState, setHoverState] = useState<'default' | 'pointer' | 'text'>('default');

  // We use simple variables for the mouse position to avoid React overhead in the loop
  const mouseX = useRef(-100);
  const mouseY = useRef(-100);

  // Smooth interpolation positions
  const ringX = useRef(-100);
  const ringY = useRef(-100);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      
      const target = e.target as HTMLElement;
      
      // Determine hover state
      if (
        target.tagName === 'BUTTON' || 
        target.closest('button') || 
        target.tagName === 'A' || 
        target.closest('a') || 
        target.classList.contains('cursor-hover') ||
        target.closest('.cursor-hover')
      ) {
        setHoverState('pointer');
      } else if (
        target.tagName === 'P' || 
        target.tagName === 'H1' || 
        target.tagName === 'H2' || 
        target.tagName === 'SPAN'
      ) {
        setHoverState('text');
      } else {
        setHoverState('default');
      }
    };

    const handleMouseDown = () => {
        if (ringRef.current) ringRef.current.style.transform += ` scale(0.9)`;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    
    // Animation Loop
    let rafId: number;
    const animate = () => {
      // 1. Dot: Moves INSTANTLY. No lerp. strict 1:1 mapping to fix "dislocation".
      // We perform direct DOM manipulation for maximum performance.
      if (cursorRef.current) {
        // Center offset: -4px (width 8px)
        cursorRef.current.style.transform = `translate3d(${mouseX.current - 4}px, ${mouseY.current - 4}px, 0)`;
      }

      // 2. Ring: Smooth LERP (Linear Interpolation) for that "luxury" lag feel
      // Lerp factor 0.15
      ringX.current += (mouseX.current - ringX.current) * 0.15;
      ringY.current += (mouseY.current - ringY.current) * 0.15;

      if (ringRef.current) {
        // Center offset: -24px (width 48px)
        ringRef.current.style.transform = `translate3d(${ringX.current - 24}px, ${ringY.current - 24}px, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      {/* Dot - The precise pointer */}
      <div 
        ref={cursorRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999] mix-blend-exclusion transition-colors duration-200 ${hoverState === 'pointer' ? 'bg-neon-magenta' : 'bg-white'}`}
      />
      
      {/* Ring - The aesthetic lag */}
      <div 
        ref={ringRef}
        className={`
          fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9998] border border-white/50
          transition-[width,height,background-color,border-color] duration-300 ease-out mix-blend-exclusion
          ${hoverState === 'pointer' ? 'w-16 h-16 bg-white/20 border-transparent' : ''}
          ${hoverState === 'text' ? 'w-20 h-20 bg-white border-transparent opacity-20' : ''}
        `}
      />
    </>
  );
};

export default Cursor;