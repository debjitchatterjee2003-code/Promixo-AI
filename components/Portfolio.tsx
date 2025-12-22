import React, { useState, useEffect } from 'react';
import Section from '../components/ui/Section';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  height: string;
  color: string;
  image?: string;
  embedUrl?: string;
  isVideo?: boolean;
  objectMode?: 'cover' | 'contain';
  customBg?: string;
}

const PortfolioCard: React.FC<{ item: PortfolioItem; hoveredId: number | null; setHoveredId: (id: number | null) => void; itemAnim: any }> = ({ item, hoveredId, setHoveredId, itemAnim }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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
    setHoveredId(null);
  };

  return (
    <motion.div
      variants={itemAnim}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative w-full ${item.height} rounded-3xl overflow-hidden cursor-pointer group break-inside-avoid shadow-2xl ${item.customBg || 'bg-slate-900'} border border-white/5 transition-all duration-500 hover:border-brand-purple/30`}
    >
      {/* Base Visual (Image or Gradient) */}
      <AnimatePresence mode="wait">
        {(!item.embedUrl || hoveredId !== item.id) && (
          <motion.div
            key="base-visual"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 w-full h-full"
          >
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full ${item.objectMode === 'contain' ? 'object-contain' : 'object-cover'} transition-transform duration-700 group-hover:scale-110`}
              />
            ) : (
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-80 transition-transform duration-700 group-hover:scale-110`} />
            )}
            {/* Standard Overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 z-10" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video content (Active on hover if provided) */}
      {item.embedUrl && hoveredId === item.id && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 w-full h-full bg-black z-20"
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden">
             <iframe
              src={item.embedUrl}
              className="absolute top-1/2 left-1/2 w-[160%] h-[160%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
              allow="autoplay; encrypted-media"
              loading="lazy"
              title={item.title}
            ></iframe>
          </div>
        </motion.div>
      )}

      {/* Content Labels */}
      <div 
        style={{ transform: "translateZ(40px)" }}
        className={`absolute inset-0 flex flex-col justify-end p-8 z-30 transition-all duration-500 ${hoveredId === item.id && item.embedUrl ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}
      >
        <span className="text-brand-mint text-xs font-bold uppercase tracking-wider mb-2 drop-shadow-md">
          {item.category}
        </span>
        <h3 className="text-white text-2xl font-bold drop-shadow-lg">
          {item.title}
        </h3>
      </div>
      
      {/* Play Icon Placeholder (only for non-embed videos) */}
      {item.isVideo && !item.embedUrl && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500 border border-white/40 shadow-xl">
             <FaPlay className="text-white ml-1" />
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Portfolio: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
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

  const items: PortfolioItem[] = [
    { 
      id: 1, 
      title: "Premium Posters", 
      category: "One Click", 
      height: "aspect-[4/3]", 
      color: "from-purple-500 to-pink-500", 
      image: "https://lh3.googleusercontent.com/d/1JHInXgrJoMgsr3T5SOvrJbNomLIe4yYF",
      isVideo: false,
      objectMode: 'cover'
    },
    { 
      id: 2, 
      title: "Luxury Brand Story", 
      category: "Storytelling", 
      height: "aspect-[4/3]", 
      color: "bg-black", 
      image: "https://lh3.googleusercontent.com/d/1rK_3t_4DU7yJHA35mMGBkE8i_hVEE2d2",
      isVideo: false,
      objectMode: 'cover'
    },
    { 
      id: 3, 
      title: "Viral ads", 
      category: "Product launch", 
      height: "aspect-[4/3]", 
      color: "from-blue-600 to-cyan-400", 
      image: "https://lh3.googleusercontent.com/d/12H8v953TdBPeyEeh-Wk29CsyLtlUiKMo",
      isVideo: true,
      embedUrl: "https://drive.google.com/file/d/12H8v953TdBPeyEeh-Wk29CsyLtlUiKMo/preview"
    },
    { 
      id: 7, 
      title: "Funky Posters", 
      category: "Graphic Design", 
      height: "aspect-square", 
      color: "from-orange-500 to-brand-mint", 
      image: "https://lh3.googleusercontent.com/d/1qCXAVz5EjaWQp2OGiSTk_9-A26e97VMx",
      isVideo: false,
      objectMode: 'cover'
    },
    { 
      id: 4, 
      title: "Product Ad Campaigns", 
      category: "UGC Content", 
      height: "aspect-[4/3]", 
      color: "from-brand-mint to-gray-800", 
      image: "https://lh3.googleusercontent.com/d/1nqbPceXZKTRYHCLqWYY9zTrCbTqshALL",
      isVideo: false,
      objectMode: 'cover'
    },
    { 
      id: 5, 
      title: "Automated CRM Flow", 
      category: "System Architecture", 
      height: "h-72", 
      color: "from-gray-900 to-black", 
      image: "https://lh3.googleusercontent.com/d/1IXHe77mW0oH5gaFi-3F-d24yqa2AvLd6",
      isVideo: false,
      objectMode: 'cover',
      customBg: 'bg-black'
    },
    { 
      id: 6, 
      title: "Fashion Editorial", 
      category: "AI Image", 
      height: "h-80", 
      color: "from-rose-500 to-orange-500",
      image: "https://lh3.googleusercontent.com/d/1NDJpOJGDW_ZBdgP58aODAdjogmKSW8ba",
      isVideo: false,
      objectMode: 'cover'
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 50 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <Section id="portfolio" className="bg-brand-dark relative overflow-hidden">
       {/* Parallax Background Glows */}
      <motion.div 
        style={{ x: useTransform(springX, [-0.5, 0.5], [-100, 100]), y: useTransform(springY, [-0.5, 0.5], [-100, 100]) }}
        className="absolute top-[30%] left-0 w-[400px] h-[400px] bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div 
        style={{ x: useTransform(springX, [-0.5, 0.5], [100, -100]), y: useTransform(springY, [-0.5, 0.5], [100, -100]) }}
        className="absolute bottom-[30%] right-0 w-[400px] h-[400px] bg-brand-mint/10 rounded-full blur-[100px] pointer-events-none"
      />

      <div className="flex flex-col md:flex-row justify-between items-end mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-sm font-bold text-brand-purple tracking-widest uppercase mb-4">Selected Work</h2>
          <h3 className="text-5xl md:text-6xl font-display font-bold text-white">The Canvas of <span className="text-brand-purple">Intelligence</span></h3>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-slate-400 mt-6 md:mt-0 max-w-md text-right leading-relaxed font-medium"
        >
          A glimpse into the impossible made real. Explore our latest AI-generated campaigns and system architectures.
        </motion.p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10%" }}
        className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 relative z-10"
        style={{ perspective: '1200px' }}
      >
        {items.map((item) => (
          <PortfolioCard 
            key={item.id} 
            item={item} 
            hoveredId={hoveredId} 
            setHoveredId={setHoveredId} 
            itemAnim={itemAnim} 
          />
        ))}
      </motion.div>
    </Section>
  );
};

export default Portfolio;