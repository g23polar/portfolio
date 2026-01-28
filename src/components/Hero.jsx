import { motion } from 'motion/react';
import { ThemeContext } from '../App';
import { useContext, useMemo } from 'react';
import ReactGA from 'react-ga4';
import { FileText, Mail } from 'lucide-react';

function Hero() {
  const { theme } = useContext(ThemeContext);

  const handleResume = () => {
    ReactGA.event({
      category: "Resume",
      action: "View",
      label: "Resume PDF",
    });
    
    window.open(
      "https://drive.google.com/file/d/1b7_xr5SbCWuRyOd_We0x1UAxb0btyLfl/view?usp=sharing",
      "_blank",
      "noopener,noreferrer"
    );
  };

  const handleContactScroll = (e) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  // Memoize name letters to prevent re-computation
  const nameLetters = useMemo(() => "Aditya Pillai".split(""), []);

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden ${
        theme === "dark" ? "bg-[#1c1c1c]" : "bg-[#fafafa]"
      }`}
    >
      {/* Optimized background blobs - reduced opacity for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-[0.15] ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -60, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-[0.15] ${
            theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
          }`}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center relative z-10 max-w-5xl mx-auto"
      >
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className={`text-base md:text-lg mb-6 font-medium tracking-wide ${
            theme === "dark" ? "text-[#aed9e0]/70" : "text-[#5e6472]/60"
          }`}
        >
          Hello! I'm
        </motion.div>

        {/* Name - Optimized with reduced animations */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block group/name mb-8 cursor-default"
        >
          <span className={`text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight ${
            theme === "dark" ? "text-[#b8f2e6]" : "text-[#5e6472]"
          }`}>
            {nameLetters.map((char, i) => (
              <motion.span
                key={`${char}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: 0.4 + i * 0.02,
                  duration: 0.3
                }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          
          {/* Center-spreading underline */}
          <motion.div
            className={`absolute -bottom-2 left-1/2 h-1 rounded-full ${
              theme === "dark" ? "bg-[#b8f2e6]" : "bg-[#aed9e0]"
            }`}
            initial={{ width: 0, x: 0 }}
            whileHover={{ 
              width: "100%",
              x: "-50%",
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
            style={{ transformOrigin: "center" }}
          />
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={`text-xl md:text-2xl lg:text-3xl mb-10 font-light leading-relaxed ${
            theme === "dark" ? "text-[#aed9e0]/90" : "text-[#5e6472]/80"
          }`}
        >
          Full-Stack Developer & Creative Thinker
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`h-1 w-48 mx-auto rounded-full mb-12 ${
            theme === "dark" ? "bg-[#b8f2e6]/50" : "bg-[#aed9e0]/60"
          }`}
        />

        {/* CTA Buttons - Optimized layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          {/* Primary CTA */}
          <motion.button
            onClick={handleResume}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`
              group relative px-8 py-4 rounded-2xl font-semibold text-base md:text-lg
              transition-all duration-300 overflow-hidden
              ${theme === "dark" 
                ? "bg-[#b8f2e6] text-[#1c1c1c]" 
                : "bg-[#aed9e0] text-[#5e6472]"
              }
              shadow-lg hover:shadow-2xl
              ${theme === "dark"
                ? "hover:shadow-[#b8f2e6]/30"
                : "hover:shadow-[#aed9e0]/40"
              }
            `}
            aria-label="View Resume"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              style={{
                background: theme === "dark"
                  ? 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)'
                  : 'linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)'
              }}
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                repeatDelay: 2
              }}
            />
            
            <span className="relative z-10 flex items-center gap-2.5">
              <FileText size={20} className="flex-shrink-0" />
              View Resume
            </span>
          </motion.button>

          {/* Secondary CTA */}
          <motion.a
            href="#contact"
            onClick={handleContactScroll}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className={`
              group px-8 py-4 rounded-2xl font-semibold text-base md:text-lg
              transition-all duration-300 border-2
              ${theme === "dark"
                ? "border-[#b8f2e6]/40 text-[#b8f2e6] hover:bg-[#b8f2e6]/10 hover:border-[#b8f2e6]"
                : "border-[#5e6472]/30 text-[#5e6472] hover:bg-[#5e6472]/5 hover:border-[#5e6472]"
              }
            `}
            aria-label="Get In Touch"
          >
            <span className="flex items-center gap-2.5">
              <Mail size={20} className="flex-shrink-0" />
              Get In Touch
            </span>
          </motion.a>
        </motion.div>

        {/* Scroll indicator - Optimized animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
        >
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;