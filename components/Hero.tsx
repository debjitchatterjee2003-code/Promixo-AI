import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import Button from './ui/Button';
import { FaPlay, FaArrowRight } from 'react-icons/fa';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Mouse movement for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for high-end organic movement
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale mouse position from -1 to 1 for better transform range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Complex parallax transforms
  const rotateX = useTransform(springY, [-1, 1], [15, -15]);
  const rotateY = useTransform(springX, [-1, 1], [-15, 15]);
  
  const glass1X = useTransform(springX, [-1, 1], [-40, 40]);
  const glass1Y = useTransform(springY, [-1, 1], [-40, 40]);
  const glass1Rotate = useTransform(springX, [-1, 1], [-10, 10]);

  const glass2X = useTransform(springX, [-1, 1], [60, -60]);
  const glass2Y = useTransform(springY, [-1, 1], [60, -60]);

  const gridMoveY = useTransform(scrollY, [0, 500], [0, -150]);
  const contentOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const contentScale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <section 
      ref={containerRef}
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-brand-dark"
      style={{ perspective: '1200px' }}
    >
      {/* --- 3D BACKGROUND SYSTEM --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Deep Perspective 3D Grid Floor */}
        <motion.div 
          style={{ 
            rotateX: 65,
            y: gridMoveY,
            translateZ: -100,
          }}
          className="absolute -bottom-[20%] left-[-50%] w-[200%] h-[150%] origin-center"
        >
          <div className="w-full h-full bg-[size:60px_60px] opacity-[0.15]" 
               style={{ 
                 backgroundImage: `linear-gradient(to right, #7000df 1px, transparent 1px), 
                                   linear-gradient(to bottom, #7000df 1px, transparent 1px)` 
               }} 
          />
          {/* Pulsing Light Scan Line on Grid */}
          <motion.div 
            animate={{ y: ['0%', '100%'], opacity: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-brand-purple/40 to-transparent"
          />
        </motion.div>

        {/* Ambient Energy Glows (Reference: soft neon blobs) */}
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[10%] w-[600px] h-[600px] bg-brand-purple/20 rounded-full blur-[120px] mix-blend-screen opacity-60"
        />
        <motion.div 
          animate={{ 
            x: [0, -60, 0], 
            y: [0, 40, 0],
            scale: [1.2, 1, 1.2]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[10%] right-[10%] w-[700px] h-[700px] bg-brand-cyan/15 rounded-full blur-[140px] mix-blend-screen opacity-40"
        />

        {/* Floating 3D Interactive Elements (Glass shards/cards) */}
        <motion.div 
          style={{ x: glass1X, y: glass1Y, rotateZ: glass1Rotate, rotateX, rotateY }}
          className="absolute top-[25%] right-[15%] w-64 h-80 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl z-20 hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl" />
          <div className="p-6 flex flex-col h-full justify-between">
             <div className="w-12 h-12 bg-brand-purple/20 rounded-xl border border-brand-purple/30 animate-pulse" />
             <div className="space-y-3">
               <div className="h-2 w-full bg-white/10 rounded-full" />
               <div className="h-2 w-2/3 bg-white/10 rounded-full" />
             </div>
          </div>
        </motion.div>

        <motion.div 
          style={{ x: glass2X, y: glass2Y, rotateX: rotateY, rotateY: rotateX }}
          className="absolute bottom-[20%] left-[10%] w-48 h-48 bg-brand-mint/5 backdrop-blur-xl border border-brand-mint/10 rounded-[2rem] rotate-12 z-10 hidden lg:block"
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-brand-mint/10 to-transparent rounded-[2rem]" />
        </motion.div>

        {/* Dynamic Light Beam that follows mouse */}
        <motion.div 
          style={{ 
            left: useTransform(springX, [-1, 1], ['30%', '70%']),
            top: useTransform(springY, [-1, 1], ['30%', '70%']),
          }}
          className="absolute w-[400px] h-[400px] bg-brand-purple/30 rounded-full blur-[100px] opacity-30 pointer-events-none"
        />

        {/* Falling Data Streams */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ top: -100, left: `${Math.random() * 100}%`, opacity: 0 }}
              animate={{ top: '120%', opacity: [0, 0.5, 0] }}
              transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 10 
              }}
              className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-brand-purple/40 to-transparent"
            />
          ))}
        </div>
      </div>

      {/* --- HERO CONTENT --- */}
      <motion.div 
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="max-w-7xl mx-auto px-6 relative z-30 text-center flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-mint opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-mint"></span>
            </span>
            <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
              The Frontier of Intelligence
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-8xl lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter mb-10"
        >
          <span className="text-white drop-shadow-2xl">Shape</span><br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-mint">
            Possibility.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-2xl text-slate-400 max-w-2xl mb-14 leading-relaxed font-medium"
        >
          Engineering the next era of digital dominance. 
          Elite <span className="text-white">AI Automation</span> meets <span className="text-white">Cinematic Content</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6"
        >
          <Button variant="primary" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
            View Services <FaArrowRight />
          </Button>
          <Button variant="outline" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
            <FaPlay className="text-xs" /> Our Impact
          </Button>
        </motion.div>

        {/* Feature Cards with 3D Interaction */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {[
            { label: "AI Creative", val: "Viral Ready" },
            { label: "Systems", val: "Autonomous" },
            { label: "Performance", val: "Data Driven" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -15, scale: 1.02 }}
              className="p-10 rounded-[2.5rem] bg-white/5 backdrop-blur-md border border-white/10 flex flex-col items-center justify-center group relative overflow-hidden transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h3 className="text-4xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors relative z-10">{stat.val}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 relative z-10 group-hover:text-slate-300 transition-colors">{stat.label}</p>
              
              {/* Card corner glow */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-brand-purple/20 blur-2xl rounded-full" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <style>{`
        section#home {
          background: radial-gradient(circle at 50% 50%, #16181d 0%, #0f1115 100%);
        }
      `}</style>
    </section>
  );
};

export default Hero;