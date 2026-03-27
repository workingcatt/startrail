import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle } from 'lucide-react';

export default function Hero({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-50">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80 mix-blend-multiply"
        style={{ 
          backgroundImage: 'url("https://working-cat.org/SITE/1%20(8).png")',
          backgroundPosition: 'center 30%'
        }}
      >
        {/* Gradient overlays for light mode */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-transparent to-slate-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/40 to-transparent"></div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[5%] w-64 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent opacity-30"></div>
        <div className="absolute bottom-[30%] right-[5%] w-64 h-[1px] bg-gradient-to-l from-cyan-500 to-transparent opacity-30"></div>
        
        <svg className="absolute top-[15%] right-[15%] w-32 h-32 opacity-10 animate-float" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#06b6d4" strokeWidth="0.5" />
          <path d="M50 10 L50 90 M10 50 L90 50" stroke="#06b6d4" strokeWidth="0.5" opacity="0.5" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-20 px-6 max-w-7xl mx-auto mt-20 w-full flex flex-col items-start justify-center">
        
        {/* Left Side: Title & Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-2/3 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/50 bg-white/80 text-cyan-600 text-xs font-mono tracking-[0.3em] mb-6 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
            PROJECT: START RAIL
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[0.1em] text-slate-900 drop-shadow-md leading-[0.9] mb-6">
            START<br/>RAIL
          </h1>
          
          <div className="relative pl-6 border-l-2 border-cyan-500 mb-10">
            <p className="text-lg md:text-xl text-slate-600 font-medium max-w-xl leading-relaxed">
              현대적인 도시의 이면에 숨겨진 마법과 기계.<br/>
              당신의 잃어버린 꿈을 찾아 떠나는<br/>
              어반 판타지 RPG.
            </p>
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-cyan-500"></div>
            <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-cyan-500"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setActiveTab('worldview')}
              className="group relative px-8 py-4 bg-cyan-50 hover:bg-cyan-100 border border-cyan-500 text-cyan-600 game-button transition-all flex items-center justify-center gap-3 overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 bg-cyan-500/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
              <span className="relative z-10 font-mono font-bold tracking-[0.2em] uppercase">ACCESS ARCHIVE</span>
              <ChevronRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-cyan-600/70 text-[10px] font-mono tracking-[0.3em] uppercase">System.Scroll</span>
        <div className="w-[1px] h-16 bg-slate-300 overflow-hidden relative">
          <motion.div 
            animate={{ y: [0, 64] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-full h-1/3 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]"
          />
        </div>
      </motion.div>
    </div>
  );
}
