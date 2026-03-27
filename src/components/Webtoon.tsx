import React from 'react';
import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

const episodes = [
  {
    id: 1,
    title: '프롤로그: 잃어버린 꿈을 찾아서',
    date: '2024.05.01',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 2,
    title: '1화: 스타트레일 탑승',
    date: '2024.05.08',
    image: 'https://images.unsplash.com/photo-1515002246390-7bf7e8f87b54?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 3,
    title: '2화: 루미나리스의 두 얼굴',
    date: '2024.05.15',
    image: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 4,
    title: '3화: 녹티스의 그림자',
    date: '2024.05.22',
    image: 'https://images.unsplash.com/photo-1504253163759-c23fccaebb55?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 5,
    title: '4화: 언노운의 습격',
    date: '2024.05.29',
    image: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 6,
    title: '5화: 각성',
    date: '2024.06.05',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop'
  }
];

export default function Webtoon() {
  return (
    <div className="max-w-7xl mx-auto px-6 relative bg-slate-50 min-h-screen py-20">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 border border-cyan-500/50 bg-white/80 text-cyan-600 text-xs font-mono tracking-[0.3em] mb-6 backdrop-blur-sm shadow-sm">
          <span className="w-2 h-2 bg-cyan-500 animate-pulse"></span>
          DATABASE: ARCHIVE
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-[0.2em] mb-6 text-slate-900 drop-shadow-sm">WEBTOON</h2>
        <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto" />
        <p className="mt-6 text-slate-600 font-medium">스타트레일의 숨겨진 이야기들을 웹툰으로 만나보세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {episodes.map((ep, index) => (
          <motion.div
            key={ep.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group cursor-pointer bg-white/80 backdrop-blur-sm p-4 border border-slate-200 hover:border-cyan-400 shadow-sm hover:shadow-md transition-all duration-300 game-panel-sm"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-4 border border-slate-100 group-hover:border-cyan-200 transition-colors game-panel-sm">
              <img 
                src={ep.image} 
                alt={ep.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100 mix-blend-multiply group-hover:mix-blend-normal"
              />
              <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <PlayCircle className="w-16 h-16 text-cyan-500 drop-shadow-sm" />
              </div>
              <div className="absolute top-0 left-0 px-4 py-1 bg-white/90 backdrop-blur-md border border-cyan-200 text-cyan-600 text-xs font-mono tracking-[0.2em] shadow-sm game-button">
                EP.{ep.id}
              </div>
            </div>
            <h3 className="text-xl font-black tracking-[0.1em] text-slate-800 group-hover:text-cyan-700 transition-colors">{ep.title}</h3>
            <p className="text-sm text-slate-500 mt-2 font-mono tracking-[0.2em]">{ep.date}</p>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 text-center">
        <button className="group relative px-10 py-4 bg-white text-cyan-600 font-mono tracking-[0.2em] border border-cyan-300 hover:border-cyan-500 hover:bg-cyan-50 transition-all shadow-sm game-button overflow-hidden">
          <div className="absolute inset-0 bg-cyan-100/50 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          <span className="relative z-10 block font-bold">LOAD MORE</span>
        </button>
      </div>
    </div>
  );
}
