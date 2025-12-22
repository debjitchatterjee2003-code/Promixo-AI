import React, { useEffect } from 'react';
import Section from './ui/Section';
import { FaVideo, FaBullhorn, FaMagic, FaRobot, FaNetworkWired, FaChartLine } from 'react-icons/fa';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { IconType } from 'react-icons';

interface ServiceItem {
  icon: IconType;
  title: string;
  desc: string;
}

const ServiceCard: React.FC<{ item: ServiceItem }> = ({ item }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="bg-slate-900/40 p-8 rounded-3xl border-2 border-white/5 hover:border-brand-purple/40 hover:shadow-[0_20px_50px_rgba(112,0,223,0.2)] hover:bg-slate-800/80 transition-all duration-500 group relative overflow-hidden h-full"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10" style={{ transform: "translateZ(50px)" }}>
        <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center text-brand-purple text-3xl mb-6 border-2 border-white/5 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white transition-all duration-500 shadow-sm">
          <item.icon />
        </div>
        <h4 className="text-2xl font-bold text-white mb-4">{item.title}</h4>
        <p className="text-slate-400 leading-relaxed text-sm md:text-base group-hover:text-slate-200">{item.desc}</p>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 30 });

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const bgX = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const bgY = useTransform(springY, [-0.5, 0.5], [-50, 50]);

  const creativeServices: ServiceItem[] = [
    { icon: FaMagic, title: "Generative Ad Production", desc: "Full-scale commercial production using state-of-the-art video generation models." },
    { icon: FaBullhorn, title: "Viral Growth Assets", desc: "High-conversion short-form content engineered specifically to trend on TikTok & Reels." },
    { icon: FaVideo, title: "Hyper-Real Avatars", desc: "AI-enhanced spokespersons and realistic voiceovers that simulate genuine user testimonials." },
  ];

  const automationServices: ServiceItem[] = [
    { icon: FaRobot, title: "Autonomous Nurture", desc: "Smart SMS/Email systems that engage leads and book appointments 24/7 without human input." },
    { icon: FaNetworkWired, title: "Unified Brain Workflows", desc: "Seamlessly connect your CRM, Marketing, and Sales stacks into one intelligent ecosystem." },
    { icon: FaChartLine, title: "Custom SaaS Dashboards", desc: "Bespoke analytics and control platforms tailored to your specific operational KPIs." },
  ];

  return (
    <Section id="services" className="bg-brand-dark relative overflow-hidden">
      {/* 3D Background Elements */}
      <motion.div 
        style={{ x: bgX, y: bgY }}
        className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div 
        style={{ x: useTransform(springX, [-0.5, 0.5], [50, -50]), y: useTransform(springY, [-0.5, 0.5], [50, -50]) }}
        className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-brand-purple/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
        <h2 className="text-sm font-bold text-brand-purple tracking-widest uppercase mb-4">Our Expertise</h2>
        <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">Two Pillars of Power</h3>
        <p className="text-slate-400 text-lg">Combining elite creative production with ruthless operational efficiency.</p>
      </div>

      <div className="mb-32 relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent to-brand-purple/30 flex-1"></div>
          <h4 className="text-3xl font-bold text-white font-display">Creative & Production</h4>
          <div className="h-px bg-gradient-to-l from-transparent to-brand-purple/30 flex-1"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {creativeServices.map((item, idx) => <ServiceCard key={idx} item={item} />)}
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-6 mb-12">
          <div className="h-px bg-gradient-to-r from-transparent to-brand-cyan/30 flex-1"></div>
          <h4 className="text-3xl font-bold text-white font-display">Automation & Intelligence</h4>
          <div className="h-px bg-gradient-to-l from-transparent to-brand-cyan/30 flex-1"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {automationServices.map((item, idx) => <ServiceCard key={idx} item={item} />)}
        </div>
        
        <motion.div 
          whileHover={{ scale: 1.02, rotateX: 2 }}
          className="bg-slate-900/50 border-2 border-brand-purple/20 rounded-2xl p-8 text-center max-w-4xl mx-auto backdrop-blur-sm shadow-2xl"
        >
          <p className="text-brand-purple font-semibold text-lg">
            ✨ Note: We build custom automation architectures tailored to your exact business logic.
          </p>
        </motion.div>
      </div>
    </Section>
  );
};

export default Services;