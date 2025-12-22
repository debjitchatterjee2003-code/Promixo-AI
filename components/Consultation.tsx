import React, { useState, useEffect } from 'react';
import Section from './ui/Section';
import Button from './ui/Button';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaUser, FaInfoCircle, FaCheckCircle } from 'react-icons/fa';

const Consultation: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
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

  const cardRotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const cardRotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/mjknnlaj", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <Section id="consultation" className="bg-brand-dark relative overflow-hidden">
      {/* 3D background abstract shapes */}
      <motion.div 
        style={{ x: useTransform(springX, [-0.5, 0.5], [100, -100]), y: useTransform(springY, [-0.5, 0.5], [100, -100]) }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none"
      />

      <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10" style={{ perspective: '1200px' }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold text-brand-purple tracking-widest uppercase mb-4">Book a Session</h2>
          <h3 className="text-5xl md:text-6xl font-display font-bold text-white mb-8">
            Let's Engineer Your <span className="text-brand-purple">Edge</span>
          </h3>
          <p className="text-xl text-slate-400 leading-relaxed mb-8 max-w-lg">
            Ready to deploy advanced AI automation in your workflow? Schedule a 1-on-1 discovery call to discuss your business architecture.
          </p>
          
          <div className="space-y-6">
            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 text-slate-200 group">
              <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center text-brand-purple border border-brand-purple/20 group-hover:bg-brand-purple group-hover:text-white transition-colors">
                <FaPhoneAlt />
              </div>
              <span className="text-lg font-bold">Strategic Analysis</span>
            </motion.div>
            <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 text-slate-200 group">
              <div className="w-12 h-12 rounded-full bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20 group-hover:bg-brand-cyan group-hover:text-white transition-colors">
                <FaInfoCircle />
              </div>
              <span className="text-lg font-bold">Custom Roadmap Planning</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          style={{ rotateX: cardRotateX, rotateY: cardRotateY, transformStyle: "preserve-3d" }}
          className="bg-slate-900/40 border border-white/5 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden shadow-2xl backdrop-blur-md"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 blur-[70px] rounded-full -mr-16 -mt-16" />
          
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-brand-mint/20 text-brand-mint rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
                  <FaCheckCircle />
                </div>
                <h4 className="text-3xl font-bold text-white mb-4">Request Received!</h4>
                <p className="text-slate-400 mb-8 font-medium">One of our specialists will reach out shortly.</p>
                <Button variant="outline" onClick={() => setStatus('idle')}>Send Another Message</Button>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Enter your name"
                      className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Email ID</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="your@email.com"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Phone Number</label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input 
                        required
                        name="phone"
                        type="tel" 
                        placeholder="+1 234 567 890"
                        className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest px-1">Other Information (Optional)</label>
                  <textarea 
                    name="message"
                    rows={4}
                    placeholder="Tell us about your project..."
                    className="w-full bg-slate-800/50 border border-white/10 rounded-2xl py-4 px-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full shadow-2xl shadow-brand-purple/20"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending...' : 'Schedule Consultation'}
                </Button>

                {status === 'error' && (
                  <p className="text-brand-red text-sm text-center font-bold mt-4">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </Section>
  );
};

export default Consultation;