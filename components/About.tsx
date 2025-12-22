import React, { useEffect } from 'react';
import Section from './ui/Section';
import { FaLightbulb, FaRocket, FaCogs } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const About: React.FC = () => {
  // Mouse movement for 3D parallax effect within this section
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Get the relative position of the mouse within the viewport
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transform values for background elements
  const bgTranslateX = useTransform(springX, [-1, 1], [-30, 30]);
  const bgTranslateY = useTransform(springY, [-1, 1], [-30, 30]);
  const bgRotate = useTransform(springX, [-1, 1], [-5, 5]);

  const cards = [
    { icon: FaLightbulb, title: "Our Vision", desc: "Revolutionizing digital landscapes by merging elite human creativity with machine speed." },
    { icon: FaCogs, title: "Our Mission", desc: "Empowering brands with autonomous growth engines that operate continuously." },
    { icon: FaRocket, title: "Innovation", desc: "Engineering custom LLM workflows and viral pipelines that stay years ahead." },
  ];

  return (
    <Section id="about" className="bg-brand-dark relative overflow-hidden">
      {/* --- 3D Background Decorative Elements --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating Wireframe Structure */}
        <motion.div 
          style={{ x: bgTranslateX, y: bgTranslateY, rotate: bgRotate }}
          className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] border border-brand-purple/20 rounded-[4rem] rotate-12 flex items-center justify-center"
        >
          <div className="w-[80%] h-[80%] border border-brand-purple/10 rounded-[3rem] animate-pulse" />
        </motion.div>

        {/* Floating Abstract Cube */}
        <motion.div 
          style={{ 
            x: useTransform(springX, [-1, 1], [40, -40]), 
            y: useTransform(springY, [-1, 1], [40, -40]) 
          }}
          className="absolute bottom-[10%] left-[5%] w-32 h-32 bg-gradient-to-br from-brand-purple/20 to-transparent blur-2xl rounded-full"
        />
        
        {/* Soft Background Glows */}
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-brand-purple/10 to-transparent" />
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center relative z-10" style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-sm font-bold text-brand-purple tracking-widest uppercase mb-4">Who We Are</h2>
          <h3 className="text-4xl md:text-6xl font-display font-bold mb-8 text-white leading-tight">
            Architects of the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple to-brand-cyan">Digital Renaissance</span>
          </h3>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Promixo AI acts as your laboratory for future growth. We bridge the gap between "what is" and "what could be" by deploying advanced AI models for storytelling and business logic.
          </p>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-1 bg-brand-red rounded-full mb-8"
          />
        </motion.div>
        
        <div className="grid gap-6">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 + idx * 0.1 }}
              whileHover={{ 
                scale: 1.02, 
                rotateX: -5,
                rotateY: 5,
                translateZ: 20
              }}
              className="group bg-slate-900/40 border-2 border-white/5 p-8 rounded-2xl flex items-start gap-6 hover:border-brand-purple/50 hover:bg-slate-800/60 hover:shadow-[0_20px_60px_rgba(112,0,223,0.15)] transition-all duration-500 cursor-default relative overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Inner glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="p-4 bg-brand-purple/10 rounded-xl text-brand-purple group-hover:text-white group-hover:bg-brand-purple transition-colors shrink-0">
                <card.icon size={24} />
              </div>
              <div style={{ transform: 'translateZ(30px)' }}>
                <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-purple transition-colors">{card.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default About;