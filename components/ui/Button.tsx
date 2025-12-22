
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

// Use HTMLMotionProps instead of React.ButtonHTMLAttributes to avoid conflicts with framer-motion specific prop signatures
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, className, ...props }) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group whitespace-nowrap text-sm md:text-base";
  
  const variants = {
    primary: "bg-gradient-to-r from-brand-mint to-brand-cyan text-black hover:shadow-[0_10px_40px_rgba(204,255,0,0.3)] border border-transparent",
    secondary: "bg-slate-800 text-white border border-white/10 hover:bg-brand-red hover:text-white hover:border-brand-red hover:shadow-[0_10px_30px_rgba(255,0,84,0.3)]",
    outline: "border border-white/20 text-white hover:border-brand-mint hover:text-brand-mint bg-white/5 backdrop-blur-sm",
    ghost: "bg-transparent text-slate-400 hover:text-white"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.96 }}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
      )}
    </motion.button>
  );
};

export default Button;
