import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const characters = [
  {
    id: 'char1',
    name: '루미아',
    codename: 'Seraph',
    race: '천사',
    quote: '"내 날개는 빛으로 이루어져 있어. 어둠 속에서도 길을 잃지 않도록."',
    desc: '스타트레일 아카데미의 우등생. 등 뒤에 떠있는 에너지 형태의 날개와 헤일로가 특징입니다. 타인을 돕고자 하는 강한 소망을 품고 있습니다.',
    image: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=800&auto=format&fit=crop',
    color: 'from-cyan-950/80 to-[#050505]'
  },
  {
    id: 'char2',
    name: '블라드',
    codename: 'Nightfall',
    race: '흡혈귀',
    quote: '"태양은 질색이야. 하지만... 네가 원한다면 조금은 참아볼게."',
    desc: '녹티스 출신의 전학생. 햇빛을 받으면 능력이 크게 저하되지만, 밤이 되면 누구보다 민첩해집니다. 차가워 보이는 외모와 달리 정이 많습니다.',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=800&auto=format&fit=crop',
    color: 'from-purple-950/80 to-[#050505]'
  },
  {
    id: 'char3',
    name: '유니트-7',
    codename: 'Gear',
    race: '메카족',
    quote: '"감정 회로에 알 수 없는 오류가 발생했습니다. 원인: 당신."',
    desc: '목덜미의 바코드와 기계 귀를 제외하면 인간과 똑같은 메카족 소년. 논리와 효율을 중시하지만, 아카데미 생활을 통해 감정을 배워가고 있습니다.',
    image: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=800&auto=format&fit=crop',
    color: 'from-emerald-950/80 to-[#050505]'
  },
  {
    id: 'char4',
    name: '미야',
    codename: 'Claw',
    race: '수인 (고양이)',
    quote: '"비 오는 날은 최악이야! 꼬리가 젖는단 말이야!"',
    desc: '야명성에서 온 고양이 수인. 호기심이 많고 장난기가 넘칩니다. 물을 극도로 싫어하며, 기분이 좋으면 골골거리는 소리를 냅니다.',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800&auto=format&fit=crop',
    color: 'from-amber-950/80 to-[#050505]'
  }
];

export default function Characters() {
  const [selectedChar, setSelectedChar] = useState(characters[0]);

  return (
    <div className="max-w-7xl mx-auto px-6 relative bg-slate-50 min-h-screen py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/50 bg-white/80 text-cyan-600 text-xs font-mono tracking-[0.3em] mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
          DATABASE: PERSONNEL
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-6 text-slate-900 drop-shadow-sm">CHARACTERS</h2>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Character Selection */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 custom-scrollbar">
          {characters.map((char) => (
            <button
              key={char.id}
              onClick={() => setSelectedChar(char)}
              className={`relative flex-shrink-0 w-48 lg:w-full text-left p-4 transition-all duration-300 overflow-hidden group shadow-sm game-button ${
                selectedChar.id === char.id 
                  ? 'bg-cyan-50 border-cyan-500 text-slate-900 shadow-[0_0_15px_rgba(6,182,212,0.2)]' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
              } border backdrop-blur-md`}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${char.color.replace('950/80', '100').replace('#050505', 'white')} opacity-0 group-hover:opacity-10 transition-opacity`} />
              {selectedChar.id === char.id && (
                <motion.div 
                  layoutId="active-char"
                  className="absolute left-0 top-0 bottom-0 w-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                />
              )}
              <div className="relative z-10">
                <p className={`text-xs mb-1 font-mono tracking-[0.2em] ${selectedChar.id === char.id ? 'text-cyan-600' : 'text-cyan-500'}`}>[{char.codename}]</p>
                <h4 className={`text-xl font-black tracking-[0.1em] ${selectedChar.id === char.id ? 'text-slate-900' : 'text-slate-700'}`}>{char.name}</h4>
                <p className={`text-sm mt-1 font-medium ${selectedChar.id === char.id ? 'text-cyan-700' : 'text-slate-500'}`}>{char.race}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Character Display */}
        <div className="lg:col-span-8 relative overflow-hidden bg-white/80 backdrop-blur-md shadow-md min-h-[500px] flex items-center game-panel border border-cyan-200">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedChar.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full flex flex-col md:flex-row"
            >
              <div className="w-full md:w-1/2 h-64 md:h-full relative overflow-hidden game-panel-sm m-4 md:m-0 md:rounded-none">
                <div className={`absolute inset-0 bg-gradient-to-br ${selectedChar.color.replace('950/80', '100').replace('#050505', 'white')} mix-blend-overlay opacity-40 z-10`} />
                <img 
                  src={selectedChar.image} 
                  alt={selectedChar.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-105 mix-blend-multiply opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white to-transparent z-20" />
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center relative z-30">
                <div className="mb-6">
                  <span className={`inline-block px-4 py-1 text-xs font-mono tracking-[0.2em] bg-gradient-to-r ${selectedChar.color.replace('950/80', '500').replace('#050505', 'cyan-600')} text-white mb-4 shadow-sm game-button border border-cyan-200`}>
                    {selectedChar.race}
                  </span>
                  <h3 className="text-5xl font-black tracking-[0.1em] mb-2 text-slate-900 drop-shadow-sm">{selectedChar.name}</h3>
                  <p className="text-cyan-600 font-mono tracking-[0.2em] text-sm">CODE: {selectedChar.codename}</p>
                </div>
                
                <blockquote className="text-lg text-slate-700 border-l-2 border-cyan-500 pl-4 mb-6 font-medium bg-cyan-50 py-3 pr-4 backdrop-blur-sm">
                  {selectedChar.quote}
                </blockquote>
                
                <p className="text-slate-600 leading-relaxed font-medium">
                  {selectedChar.desc}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
