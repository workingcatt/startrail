import React from 'react';
import { motion } from 'framer-motion';

const webtoonImages = [
  'https://working-cat.org/WEBTOON/START%20RAIL/1.png',
  'https://working-cat.org/WEBTOON/START%20RAIL/2.png',
  'https://working-cat.org/WEBTOON/START%20RAIL/3.png'
];

export default function Webtoon() {
  return (
    <div className="bg-slate-950 min-h-screen py-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-[0.2em] text-white mb-2">WEBTOON</h2>
          <div className="h-[1px] w-20 bg-cyan-500 mx-auto" />
        </div>

        <div className="flex flex-col gap-0 cursor-grab active:cursor-grabbing">
          {webtoonImages.map((image, index) => (
            <motion.img
              key={index}
              src={image}
              alt={`Webtoon page ${index + 1}`}
              referrerPolicy="no-referrer"
              className="w-full h-auto block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -100px 0px" }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center text-slate-500 font-mono text-xs tracking-widest">
          END OF EPISODE
        </div>
      </div>
    </div>
  );
}
