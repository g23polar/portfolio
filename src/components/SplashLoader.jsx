import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
import SignatureSVG from '../assets/AP.svg?react';

// Register CSSPlugin
gsap.registerPlugin(CSSPlugin);

const SplashLoader = ({ onAnimationComplete }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const svgElement = svgRef.current;
    const container = containerRef.current;
    
    if (!svgElement || !container) return;

    // Select all stroke-based elements
    const paths = svgElement.querySelectorAll('path, line, polyline, circle, ellipse');

    if (paths.length === 0) return;

    // Initialize paths
    paths.forEach((path) => {
      const length = path.getTotalLength?.();
      if (isNaN(length) || !length) return;

      // Clear inline attributes
      path.removeAttribute('fill');
      path.removeAttribute('stroke');
      path.removeAttribute('stroke-width');
      path.removeAttribute('stroke-dasharray');
      path.removeAttribute('stroke-dashoffset');

      // Set initial state
      gsap.set(path, {
        strokeDasharray: length,
        strokeDashoffset: length,
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        fill: 'none',
        stroke: '#b8f2e6',
        strokeWidth: 1,
      });
    });

    // Remove fill from groups
    svgElement.querySelectorAll('g').forEach((g) => {
      g.removeAttribute('fill');
      g.style.fill = 'none';
    });

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out animation
        gsap.to(container, {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete: () => {
            setIsMounted(false);
            if (onAnimationComplete) onAnimationComplete();
          }
        });
      },
    });

    // Signature draw animation
    tl.to(paths, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: 'power2.inOut',
      stagger: {
        each: 0.15,
        ease: 'power1.inOut'
      },
    })
    // Add a subtle glow effect
    .to(paths, {
      filter: 'drop-shadow(0 0 8px rgba(184, 242, 230, 0.6))',
      duration: 0.4,
      ease: 'power2.out',
    }, '-=0.5')
    // Hold for a moment
    .to({}, { duration: 0.8 });

    return () => {
      tl.kill();
    };
  }, [onAnimationComplete]);

  if (!isMounted) return null;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1c1c1c',
        zIndex: 100000,
        opacity: 1,
      }}
    >
      {/* Animated background gradient */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(184, 242, 230, 0.1) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      <SignatureSVG
        ref={svgRef}
        style={{
          width: '320px',
          height: 'auto',
          stroke: '#b8f2e6',
          fill: 'none',
          strokeWidth: 1,
          position: 'relative',
          zIndex: 1,
        }}
      />

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.5;
            transform: translate(-50%, -50%) scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default SplashLoader;