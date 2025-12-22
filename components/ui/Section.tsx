import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, children, className = "", noPadding = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" }); // Trigger when 10% visible

  return (
    <section 
      id={id} 
      ref={ref}
      className={`relative ${noPadding ? '' : 'py-24 md:py-36'} px-6 md:px-12 overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        // Premium ease-out-quart style curve
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default Section;