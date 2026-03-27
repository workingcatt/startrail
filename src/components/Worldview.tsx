import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Sun, Shield, Zap } from 'lucide-react';

const races = [
  {
    name: '천사',
    desc: '에너지 형태의 날개와 헤일로를 지닌 존재. 일반적인 깃털 날개가 아닌 순수한 에너지가 형상화된 모습을 띕니다.',
    icon: <Sun className="w-6 h-6 text-cyan-400" />,
    color: 'from-cyan-950/80 to-[#050505]',
    borderColor: 'border-cyan-500/30'
  },
  {
    name: '흡혈귀',
    desc: '태양빛에 죽지는 않지만 극도로 취약해지는 종족. 영원한 밤의 도시 녹티스에 주로 거주합니다.',
    icon: <Moon className="w-6 h-6 text-purple-400" />,
    color: 'from-purple-950/80 to-[#050505]',
    borderColor: 'border-purple-500/30'
  },
  {
    name: '메카족',
    desc: '귀, 목덜미 등 일부 기계 부위를 제외하면 인간과 완벽히 동일한 외형을 가진 기계 생명체입니다.',
    icon: <Zap className="w-6 h-6 text-emerald-400" />,
    color: 'from-emerald-950/80 to-[#050505]',
    borderColor: 'border-emerald-500/30'
  },
  {
    name: '수인',
    desc: '각 동물의 고유한 특징을 보유한 종족. 늑대 수인의 애정표현인 깨물기나, 고양이 수인의 물 혐오 등 본능이 남아있습니다.',
    icon: <Shield className="w-6 h-6 text-amber-400" />,
    color: 'from-amber-950/80 to-[#050505]',
    borderColor: 'border-amber-500/30'
  }
];

export default function Worldview() {
  return (
    <div className="max-w-7xl mx-auto px-6 relative bg-slate-50 min-h-screen py-20">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
          <polygon points="50,10 90,90 10,90" fill="none" stroke="#06b6d4" strokeWidth="1" />
        </svg>
      </div>

      <div className="text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/50 bg-white/80 text-cyan-600 text-xs font-mono tracking-[0.3em] mb-6 backdrop-blur-sm shadow-sm"
        >
          <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
          DATABASE: WORLDVIEW
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-6 text-slate-900 drop-shadow-sm"
        >
          WORLDVIEW
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto mb-8"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium"
        >
          현대적인 도시의 이면에 숨겨진 마법과 기계, 그리고 다양한 종족들이 공존하는 어반 판타지 세계.
          17세 이상의 청소년 중 일부는 자신의 종족, 소망, 꿈을 바탕으로 특별한 능력을 각성하게 됩니다.
          하지만 그들 스스로는 자신이 어떤 소망과 꿈을 가졌는지 알지 못합니다.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-20 lg:mb-32">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative aspect-video overflow-hidden border border-cyan-500/30 shadow-md game-panel bg-white"
        >
          <img 
            src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?q=80&w=1000&auto=format&fit=crop" 
            alt="Academy" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-80 scale-105 mix-blend-multiply"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 md:bottom-8 md:left-8 md:right-8">
            <h3 className="text-xl md:text-3xl font-black tracking-[0.1em] mb-2 flex items-center gap-2 text-slate-900 drop-shadow-sm">
              <Sparkles className="text-cyan-500 w-6 h-6 md:w-8 md:h-8" />
              스타트레일 특수 아카데미
            </h3>
            <p className="text-xs md:text-base text-slate-600 font-medium bg-white/90 p-2 md:p-3 backdrop-blur-sm border border-cyan-200 game-panel-sm shadow-sm">
              특수 학생들을 교육하고 그들의 잃어버린 꿈을 일깨워주기 위한 비밀 기관.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6 bg-white/80 backdrop-blur-md border border-cyan-200 p-8 shadow-md relative game-panel"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500"></div>

          <h3 className="text-3xl font-black tracking-[0.1em] text-slate-900 flex items-center gap-3">
            <span className="text-cyan-500">능력의</span> 각성
          </h3>
          <p className="text-slate-600 leading-relaxed font-medium">
            세계의 이면에는 평범한 일상을 살아가는 이들이 모르는 거대한 흐름이 존재합니다. 
            어느 날 갑자기 발현되는 능력은 축복일 수도, 저주일 수도 있습니다. 
            스타트레일 아카데미는 이 혼란스러운 변화를 겪는 아이들을 찾아내어 올바른 길로 인도합니다.
          </p>
          <ul className="space-y-4 mt-8">
            {[
              '자신의 진정한 꿈을 찾는 여정',
              '다양한 종족과의 만남과 갈등',
              '세계를 위협하는 언노운과의 대립'
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                <div className="w-2 h-2 rotate-45 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.4)]" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      <div className="mb-20">
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-cyan-500/50"></div>
          <h3 className="text-2xl font-mono tracking-[0.3em] text-center text-cyan-600 drop-shadow-sm">FACTIONS</h3>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-cyan-500/50"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {races.map((race, index) => (
            <motion.div
              key={race.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 bg-white border border-slate-200 backdrop-blur-sm hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden group shadow-sm hover:shadow-md hover:border-cyan-500 game-panel-sm`}
            >
              <div className="absolute -right-4 -top-4 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-colors"></div>
              <div className="w-12 h-12 bg-slate-50 border border-cyan-200 flex items-center justify-center mb-6 shadow-sm relative z-10 rotate-45 group-hover:rotate-0 transition-transform duration-500 game-button">
                <div className="-rotate-45 group-hover:rotate-0 transition-transform duration-500">
                  {race.icon}
                </div>
              </div>
              <h4 className="text-xl font-black tracking-[0.1em] mb-3 text-slate-900 relative z-10">{race.name}</h4>
              <p className="text-sm text-slate-600 leading-relaxed relative z-10 font-medium">
                {race.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
