import React, { createContext, useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { tsParticles } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import AboutMe from './components/AboutMe.jsx';
import Skills from './components/Skills.jsx';
import Contact from './components/Contact.jsx';
import SnakeGame from './components/SnakeGame.jsx';
import { Analytics } from '@vercel/analytics/react';

export const ThemeContext = createContext();

function App() {
  console.log('App component rendered');
  const particlesContainerRef = useRef(null);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [showSnake, setShowSnake] = useState(false);
  const handleEasterEgg = useCallback(() => setShowSnake(true), []);

  useEffect(() => {
    console.log('Theme updated:', theme);
    document.documentElement.classList.toggle('dark', theme === 'light');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const particlesOptions = useMemo(() => {
    console.log('particlesOptions computed');
    return {
      background: {
        color: theme === 'dark' ? '#1c1c1c' : '#fafafa',
      },
      fpsLimit: 60,
      particles: {
        number: {
          value: 80,
          density: { enable: true, value_area: 800 },
        },
        color: { value: theme === 'dark' ? '#ffffff' : '#000000' },
        shape: { type: 'circle' },
        opacity: {
          value: { min: 0.3, max: 0.6 },
          // value: 0.6,
          random: true,
          // animation: { enable: true, speed: 0.5, minimumValue: 0.5 },
          anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
        },
        size: {
          value: { min: 2.5, max: 3},
          random: true,
          // animation: { enable: true, speed: 2, minimumValue: 2 },
          anim: { enable: true, speed: 2, size_min: 1, sync: false },
        },
        links: {
           enable: true,
          distance: 180,
          color: theme === 'dark' ? '#00BFFF' : '#1a73e8',
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 1,           // slow and calming
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
        },
      },
      interactivity: {
  // detectsOn: 'canvas',
  events: {
    onHover: {
      enable: true,
      mode: ['bubble', 'grab'],   // subtle line connection on hover
    },
    onClick: {
      enable: false,  // clicks won’t trigger anything; keeps focus on content
    },
    resize: { enable: true }, // responsive
  },
  modes: {
    grab: {
      distance: 150,       // how far lines stretch
      line_linked: {
        opacity: 0.2,      // very subtle lines
        color: '#00BFFF',  // matches your accent/theme
      },
    },
    bubble: {
      distance: 100,   // radius around cursor to trigger
      size: 6,         // how much the particle grows
      opacity: 0.8,    // opacity on hover
      duration: 2,     // smooth fade back to original
      color: '#00BFFF' // optional: changes particle color temporarily
    },
  },
},
      detectRetina: true,
    };
  }, [theme]);

  useEffect(() => {
    console.log('Particles useEffect started');
    const initParticles = async () => {
      if (!particlesContainerRef.current) {
        console.log('Particles container ref not found');
        return;
      }
      console.log('Initializing tsParticles...');
      try {
        await loadSlim(tsParticles);
        console.log('loadSlim completed');
        const container = await tsParticles.load({
          id: 'tsparticles',
          element: particlesContainerRef.current,
          options: particlesOptions,
        });
        console.log('tsParticles loaded:', container ? 'Container created' : 'No container');
        const canvas = particlesContainerRef.current.querySelector('canvas');
        if (canvas) {
          console.log('Canvas found:', {
            width: canvas.width,
            height: canvas.height,
            style: {
              position: canvas.style.position,
              top: canvas.style.top,
              left: canvas.style.left,
              width: canvas.style.width,
              height: canvas.style.height,
              zIndex: canvas.style.zIndex,
              display: canvas.style.display,
              opacity: canvas.style.opacity,
            },
          });
        } else {
          console.log('Canvas not found in container');
        }
      } catch (error) {
        console.error('tsParticles failed to load:', error);
      }
    };

    initParticles();

    return () => {
      console.log('Cleaning up tsParticles');
      const container = tsParticles.dom().find((c) => c.id === 'tsparticles');
      if (container) {
        container.destroy();
      }
    };
  }, [particlesOptions]);

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      {console.log('Rendering particles container')}
      <div
        id="tsparticles"
        ref={particlesContainerRef}
        className="absolute inset-0 w-full h-full particles-canvas"
        style={{ minHeight: '100vh', zIndex: -10 }} // Lower z-index
      />
      <Analytics />
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Navbar onEasterEgg={handleEasterEgg} />
        <Hero />
        <Experience />
        <Projects />
        <AboutMe />
        <Skills />
        <Contact />
        {showSnake && <SnakeGame onClose={() => setShowSnake(false)} theme={theme} />}
      </ThemeContext.Provider>
    </div>
  );
}

export default App;