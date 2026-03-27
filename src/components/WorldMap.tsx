import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Train, Moon, Sun, Castle, Skull, MapPin } from 'lucide-react';

const locations = [
  {
    id: 'academy',
    name: '스타트레일 아카데미',
    subtitle: '하늘을 나는 특수 열차',
    desc: '특수 학생 교육 및 각 도시의 문제 해결을 담당하는 기관. 거대한 특수 열차 자체가 하나의 학교이며 하늘을 날아 어디든 이동할 수 있습니다. 학생들은 본명이 아닌 교칙에 맞춘 코드네임으로 등록됩니다.',
    icon: <Train className="w-8 h-8" />,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgImage: 'https://working-cat.org/startrail/BACK/%EC%8A%A4%ED%83%80%ED%8A%B8%EB%A0%88%EC%9D%BC%20%EC%95%84%EC%B9%B4%EB%8D%B0%EB%AF%B81.png'
  },
  {
    id: 'luminaris',
    name: '루미나리스',
    subtitle: '현실과 꿈의 경계',
    desc: '아침과 밤, 태양과 달이 동시에 뜨는 기이한 거대 도시. 아침 구역은 현실 파벌이, 밤 구역은 꿈의 파벌이 각각 통치하고 있으며 도시 내부에는 보이지 않는 팽팽한 갈등이 존재합니다.',
    icon: <Sun className="w-8 h-8" />,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/50',
    bgImage: 'https://working-cat.org/startrail/BACK/%EB%A3%A8%EB%AF%B8%EB%82%98%EB%A6%AC%EC%8A%A4.png'
  },
  {
    id: 'noctis',
    name: '녹티스',
    subtitle: '영원한 밤의 도시',
    desc: '아침이 오지 않는 영원한 어둠의 도시. 흡혈귀들의 고향이자 다수가 거주하는 곳입니다. 시청과 같은 공공기관보다 거대 기업의 힘이 훨씬 강력하여 사실상 기업이 지배하는 사이버펑크적 성격을 띕니다.',
    icon: <Moon className="w-8 h-8" />,
    color: 'text-indigo-400',
    borderColor: 'border-indigo-500/50',
    bgImage: 'https://working-cat.org/startrail/BACK/%EB%85%B9%ED%8B%B0%EC%8A%A4.png'
  },
  {
    id: 'yamyeong',
    name: '야명성',
    subtitle: '수호신의 동양 도시',
    desc: '전통 기와집과 동양 특유의 수려한 자연 풍경이 어우러진 도시. 대부분 수인들의 고향입니다. 100년마다 한 번씩 선택받는 수호신이 도시를 통치하는 신비로운 전통을 가지고 있습니다.',
    icon: <MapPin className="w-8 h-8" />,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/50',
    bgImage: 'https://working-cat.org/startrail/BACK/%EC%95%BC%EB%AA%85%EC%84%B1.png'
  },
  {
    id: 'magicworld',
    name: '매직월드',
    subtitle: '마법의 성지',
    desc: '마녀들의 도시이자 모든 마법의 근원지. 거대한 중세 판타지 풍의 성과 첨탑들이 솟아있는 고풍스러운 풍경을 자랑합니다.',
    icon: <Castle className="w-8 h-8" />,
    color: 'text-fuchsia-400',
    borderColor: 'border-fuchsia-500/50',
    bgImage: 'https://working-cat.org/startrail/BACK/%EB%A7%A4%EC%A7%81%EC%9B%94%EB%93%9C.png'
  },
  {
    id: 'unknown',
    name: '언노운',
    subtitle: '절망한 자들의 공간',
    desc: '과거 아카데미의 일원이었으나 꿈을 잃고 절망에 빠진 자들의 세력. 도시에 여러 문제를 일으키는 아카데미의 확실한 적대 세력입니다. 그들의 본거지는 기괴하게 망가진 교실의 형상을 하고 있습니다.',
    icon: <Skull className="w-8 h-8" />,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/50',
    bgImage: 'https://working-cat.org/startrail/BACK/%EC%96%B8%EB%85%B8%EC%9A%B4.png'
  }
];

export default function WorldMap() {
  const [activeLocation, setActiveLocation] = useState(locations[0]);

  return (
    <div className="max-w-7xl mx-auto px-6 relative bg-slate-50 min-h-screen py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/50 bg-white/80 text-cyan-600 text-xs font-mono tracking-[0.3em] mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
          DATABASE: LOCATIONS
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-6 text-slate-900 drop-shadow-sm">MAP & FACTIONS</h2>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 h-auto">
        {/* Map List */}
        <div className="w-full lg:w-1/3 flex flex-row lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pr-2 custom-scrollbar pb-4">
          {locations.map((loc) => (
            <button
              key={loc.id}
              onClick={() => setActiveLocation(loc)}
              className={`p-4 text-left transition-all duration-300 border game-button flex-shrink-0 w-64 lg:w-full ${
                activeLocation.id === loc.id 
                  ? `bg-cyan-50 border-cyan-500 shadow-sm` 
                  : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-cyan-300'
              } backdrop-blur-md`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 border border-slate-200 bg-white ${loc.color.replace('400', '600')} game-panel-sm shadow-sm`}>
                  {loc.icon}
                </div>
                <div>
                  <h4 className={`font-black tracking-[0.1em] text-lg ${activeLocation.id === loc.id ? loc.color.replace('400', '700') : 'text-slate-700'}`}>{loc.name}</h4>
                  <p className="text-xs text-slate-500 font-mono tracking-[0.2em] uppercase">{loc.subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Map Detail */}
        <div className="w-full lg:w-2/3 relative overflow-hidden border border-cyan-200 shadow-md group game-panel bg-white h-[400px] lg:h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img 
                src={activeLocation.bgImage} 
                alt={activeLocation.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80 mix-blend-multiply transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className={`inline-flex items-center gap-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm border border-cyan-500/30 mb-2 ${activeLocation.color ? activeLocation.color.replace('400', '400') : 'text-cyan-400'} shadow-sm`}>
                    {activeLocation.icon}
                    <span className="text-[10px] md:text-xs font-mono tracking-[0.1em] uppercase">{activeLocation.subtitle}</span>
                  </div>
                  <h3 className="text-xl md:text-4xl font-black tracking-[0.05em] mb-1 md:mb-2 text-white drop-shadow-md">{activeLocation.name}</h3>
                  <p className="text-slate-200 text-[10px] md:text-sm leading-relaxed max-w-2xl font-medium bg-slate-900/60 p-2 md:p-3 backdrop-blur-sm border border-white/10 shadow-sm line-clamp-4 md:line-clamp-4">
                    {activeLocation.desc}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
