
import React, { useEffect } from 'react';
import Section from './ui/Section';
import Button from './ui/Button';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const PricingCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(x, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xVal = (e.clientX - rect.left) / rect.width - 0.5;
    const yVal = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xVal);
    y.set(yVal);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="bg-slate-900/40 border-2 border-white/5 p-10 rounded-3xl hover:border-brand-purple/30 hover:bg-slate-800/60 hover:shadow-2xl transition-all h-full"
    >
      <div style={{ transform: "translateZ(30px)" }}>
        <h4 className="text-2xl font-bold text-white mb-4">{title}</h4>
        <p className="text-slate-400 leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const whatsappLink = "https://wa.me/916290201182?text=Hi%20I%20am%20interested%20in%20Promixo%20AI%20services";
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  return (
    <Section id="pricing" className="bg-brand-dark relative overflow-hidden">
      {/* 3D Background Grid */}
      {/* Fix: Merged duplicate style attributes into a single object */}
      <motion.div 
        style={{ 
          rotateX: 60,
          y: useTransform(springY, [-0.5, 0.5], [-20, 20]),
          x: useTransform(springX, [-0.5, 0.5], [-20, 20]),
          backgroundImage: 'linear-gradient(to right, #7000df 1px, transparent 1px), linear-gradient(to bottom, #7000df 1px, transparent 1px)'
        }}
        className="absolute bottom-[-10%] left-[-10%] w-[120%] h-[50%] bg-[size:40px_40px] opacity-[0.05] pointer-events-none"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/10 to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto text-center relative z-10" style={{ perspective: '1000px' }}>
        <h2 className="text-sm font-bold text-brand-purple tracking-widest uppercase mb-4">Pricing</h2>
        <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">Tailored for Impact</h3>
        
        <p className="text-xl text-slate-400 leading-relaxed mb-16 max-w-2xl mx-auto">
          Every business is unique. We price based on value, complexity, and scale. No rigid tiers—just results.
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
          <PricingCard 
            title="Flexible & Custom" 
            desc="We structure deals that make sense for your cash flow. Project-based sprints or long-term growth partnerships." 
          />
          <PricingCard 
            title="ROI-Focused" 
            desc="Our retainers are built around KPIs. We only win when you scale. Transparent pricing with no hidden tech fees." 
          />
        </div>

        <motion.div 
          whileHover={{ y: -5 }}
          className="flex flex-col items-center gap-8"
        >
          <p className="text-white font-bold text-lg underline decoration-brand-purple decoration-2 underline-offset-8">Ready to build the future?</p>
          <a 
            href={whatsappLink}
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Button variant="primary" className="shadow-2xl shadow-brand-mint/20">
              <FaWhatsapp className="text-xl" /> 
              <span>Chat on WhatsApp</span>
            </Button>
          </a>
        </motion.div>
      </div>
    </Section>
  );
};

export default Pricing;
