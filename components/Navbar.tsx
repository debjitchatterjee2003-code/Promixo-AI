import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const logo = "https://lh3.googleusercontent.com/d/1GMWhrlX2nFk0Q7WYDVTaXZ2qcNqFJlni";

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Consultation', href: '#consultation' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-2xl' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10">
             <div className="absolute inset-0 bg-brand-mint blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full"></div>
             <img 
               src={logo} 
               alt="Promixo AI Logo" 
               referrerPolicy="no-referrer"
               className="h-full w-full object-contain relative z-10" 
             />
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            PROMIXO<span className="text-brand-purple">AI</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isConsultation = link.name === 'Consultation';
            return (
              <a
                key={link.name}
                href={link.href}
                className={isConsultation 
                  ? "text-sm font-bold text-white bg-sky-500 px-5 py-2.5 rounded-xl hover:bg-sky-600 hover:scale-105 transition-all shadow-lg shadow-sky-500/30"
                  : "text-sm font-semibold text-gray-300 hover:text-brand-purple transition-colors relative group"
                }
              >
                {link.name}
                {!isConsultation && (
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-purple transition-all duration-300 group-hover:w-full" />
                )}
              </a>
            );
          })}
        </div>

        <button 
          className="md:hidden text-white text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <motion.div
        initial={false}
        animate={isMobileMenuOpen ? { height: '100vh', opacity: 1 } : { height: 0, opacity: 0 }}
        className="md:hidden overflow-hidden bg-brand-dark fixed inset-0 z-40 top-[70px]"
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 pb-20">
          {navLinks.map((link) => {
            const isConsultation = link.name === 'Consultation';
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={isConsultation
                  ? "text-2xl font-bold text-white bg-sky-500 px-10 py-4 rounded-2xl shadow-xl shadow-sky-500/40"
                  : "text-2xl font-bold text-white hover:text-brand-purple transition-colors"
                }
              >
                {link.name}
              </a>
            );
          })}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;