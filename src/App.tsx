import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Music, Music2, TrainFront, Play } from 'lucide-react';
import Hero from './components/Hero';
import Worldview from './components/Worldview';
import Characters from './components/Characters';
import Webtoon from './components/Webtoon';
import WorldMap from './components/WorldMap';

const navItems = [
  { id: 'main', label: 'MAIN' },
  { id: 'worldview', label: 'WORLDVIEW' },
  { id: 'characters', label: 'CHARACTERS' },
  { id: 'webtoon', label: 'WEBTOON' },
  { id: 'map', label: 'MAP' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('main');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [entered, setEntered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Sync state with audio element events for maximum stability
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => {
      console.log("BGM started playing");
      setIsPlaying(true);
    };
    const handlePause = () => {
      console.log("BGM paused");
      setIsPlaying(false);
    };
    const handleError = (e: any) => {
      const error = audio.error;
      console.error("Audio element error:", error?.code, error?.message, e);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    // Initial sync if already playing/paused
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  const handleEnter = () => {
    setEntered(true);
    // Small delay to ensure the transition starts smoothly before audio kicks in
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        audioRef.current.play().catch(err => {
          console.warn("Initial playback failed (likely autoplay policy):", err);
          // Don't crash, just log it. The user can still use the toggle.
        });
      }
    }, 100);
  };

  const toggleBGM = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const audio = audioRef.current;
    if (!audio) {
      console.warn("Audio ref not found during toggle");
      return;
    }
    
    try {
      if (audio.paused) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            console.error("Manual play failed:", err);
          });
        }
      } else {
        audio.pause();
      }
    } catch (err) {
      console.error("Error toggling BGM:", err);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'main': return <Hero setActiveTab={setActiveTab} />;
      case 'worldview': return <Worldview />;
      case 'characters': return <Characters />;
      case 'webtoon': return <Webtoon />;
      case 'map': return <WorldMap />;
      default: return <Hero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Global Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-multiply tech-grid"></div>
      
      {/* BGM Player - Native Audio with event-based state sync */}
      <audio
        ref={audioRef}
        src="https://working-cat.org/music/%EC%8A%A4%ED%83%80%ED%8A%B8%EB%A0%88%EC%9D%BC.mp3"
        loop
        preload="auto"
        crossOrigin="anonymous"
      />

      <AnimatePresence>
        {!entered && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-slate-900"
            exit={{ opacity: 0, transition: { duration: 1, delay: 0.5 } }}
          >
            <div className="scanline"></div>
            {/* Warp Background */}
            <div className="absolute inset-0 warp-container opacity-30">
              <div className="warp-lines"></div>
            </div>

            {/* Left Door */}
            <motion.div 
              className="absolute left-0 top-0 bottom-0 w-1/2 bg-slate-50 border-r-4 border-cyan-500 flex items-center justify-end pr-4 overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.2)]"
              exit={{ x: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
            >
              <div className="absolute inset-0 tech-grid opacity-20"></div>
              <div className="text-cyan-500/10 text-[15vw] font-black tracking-tighter whitespace-nowrap select-none">START</div>
            </motion.div>
            
            {/* Right Door */}
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-1/2 bg-slate-50 border-l-4 border-cyan-500 flex items-center justify-start pl-4 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.2)]"
              exit={{ x: "100%", transition: { duration: 0.8, ease: "easeInOut" } }}
            >
              <div className="absolute inset-0 tech-grid opacity-20"></div>
              <div className="text-cyan-500/10 text-[15vw] font-black tracking-tighter whitespace-nowrap select-none">RAIL</div>
            </motion.div>

            {/* Center Content */}
            <motion.div 
              className="relative z-10 flex flex-col items-center bg-white/40 p-10 rounded-2xl backdrop-blur-md border border-white/50 shadow-2xl"
              exit={{ scale: 1.5, opacity: 0, transition: { duration: 0.5 } }}
            >
              <div className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl animate-pulse pointer-events-none"></div>
              <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 border border-cyan-500/50 text-cyan-600 font-mono tracking-[0.3em] text-xs bg-white/90 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
                <span>CONNECTION ESTABLISHED</span>
              </div>
              
              <div className="mb-10 text-center">
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-2 drop-shadow-xl">
                  START<span className="text-cyan-500">RAIL</span>
                </h1>
                <p className="text-slate-700 font-mono tracking-[0.4em] text-sm md:text-base uppercase font-bold">
                  Next Destination: Unknown
                </p>
              </div>
              
              <button
                onClick={handleEnter}
                className="game-button relative group overflow-hidden bg-cyan-500 text-white px-16 py-5 font-bold tracking-[0.2em] text-lg hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3">
                  BOARD TRAIN <TrainFront className="w-5 h-5 group-hover:animate-bounce" />
                </span>
                <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-300 ease-out"></div>
              </button>
              
              <p className="mt-6 text-slate-600 font-medium text-xs font-mono tracking-[0.1em]">
                * BGM WILL PLAY UPON ENTRY
              </p>

              {/* Intro BGM Toggle */}
              <button 
                onClick={(e) => toggleBGM(e)}
                className="mt-8 flex items-center gap-2 px-4 py-2 border border-white/20 hover:border-cyan-500/50 text-white/70 hover:text-cyan-400 transition-all bg-white/5 backdrop-blur-sm font-mono text-[10px] font-bold tracking-widest uppercase"
              >
                {isPlaying ? (
                  <><Music className="w-3 h-3 animate-pulse" /> BGM ON</>
                ) : (
                  <><Music2 className="w-3 h-3 opacity-50" /> BGM OFF</>
                )}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {entered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          {/* Navigation - Game Menu Style */}
          <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || activeTab !== 'main' ? 'bg-white/90 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] border-b border-slate-200 py-2' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
              <div 
                className="text-xl font-black tracking-[0.2em] cursor-pointer flex items-center gap-3 text-slate-900 drop-shadow-sm"
                onClick={() => setActiveTab('main')}
              >
                <div className="w-8 h-8 border border-cyan-500 flex items-center justify-center bg-cyan-50">
                  <TrainFront className="w-5 h-5 text-cyan-500" />
                </div>
                <span>START RAIL</span>
              </div>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center gap-6">
                {/* Navigation Items */}
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`relative px-2 py-2 text-xs font-mono tracking-[0.2em] transition-all duration-300 ${
                      activeTab === item.id 
                        ? 'text-cyan-600 font-bold' 
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {activeTab === item.id && (
                      <motion.div 
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                      />
                    )}
                  </button>
                ))}

                {/* BGM Toggle - Restored to Header */}
                <div className="flex items-center gap-2 ml-4">
                  <button 
                    onClick={(e) => toggleBGM(e)}
                    className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 hover:border-cyan-500 text-cyan-600 transition-all bg-white shadow-sm font-mono text-[10px] font-bold tracking-widest"
                    title="Toggle BGM"
                  >
                    {isPlaying ? (
                      <>
                        <Music className="w-3.5 h-3.5 animate-pulse" /> BGM ON
                      </>
                    ) : (
                      <>
                        <Music2 className="w-3.5 h-3.5 opacity-50" /> BGM OFF
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Nav Toggle */}
              <div className="md:hidden flex items-center gap-3">
                <button 
                  onClick={(e) => toggleBGM(e)} 
                  className="flex items-center gap-1.5 text-cyan-600 px-2.5 py-1.5 border border-slate-200 bg-white shadow-sm font-mono text-[10px] font-bold tracking-wider"
                >
                  {isPlaying ? (
                    <><Music className="w-3 h-3 animate-pulse" /> ON</>
                  ) : (
                    <><Music2 className="w-3 h-3 opacity-50" /> OFF</>
                  )}
                </button>
                <button 
                  className="text-slate-900 p-1.5 border border-slate-200 bg-white shadow-sm"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-24 px-6 md:hidden border-b border-slate-200"
              >
                <div className="flex flex-col gap-4 text-xl">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`text-left font-mono tracking-[0.2em] p-4 border-b border-slate-100 ${activeTab === item.id ? 'text-cyan-600 bg-cyan-50' : 'text-slate-600'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="pt-0 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className={activeTab === 'main' ? '' : 'pt-32 pb-20'}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </motion.div>
      )}
    </div>
  );
}

function SparklesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
