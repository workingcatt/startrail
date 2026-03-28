import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const factions = {
  '스타트레일특수아카데미': [
    { name: '이하늘', code: 'A', grade: 'S', desc: '인간 · 17세 | 외형: 하늘색 장발, 분홍빛과 푸른색이 섞인 십자 동공, 하얀색 세라복 | 성격: 밝고 명랑한 순수 청춘. 1학년 수석 입학생이자 최고의 유망주입니다. 라줄리와 자매 관계이며, \'기적\'을 다루는 능력이 있습니다.' },
    { name: '서예리', code: 'B', grade: 'A', desc: '천사 · 17세 | 외형: 노란색 트윈테일, 노란색 눈, 세라복과 노란색 자켓 | 성격: 천사 중 가장 활발하고 장난기가 많으며 알뜰합니다. 이하늘의 단짝이며 에너지 형태의 전기를 다룹니다.' },
    { name: '유소을', code: 'C', grade: 'B', desc: '수인(고양이) · 17세 | 외형: 회색 단발, 분홍색 눈, 세라복, 회색 자켓, 검은색 빵모자 | 성격: 무뚝뚝하고 차분하며 나른한 성격. 지식에 통달해 있으나 귀찮은 것을 싫어합니다. 사슬 마법을 사용합니다.' },
    { name: '송유나', code: 'D', grade: 'A', desc: '유령 · 17세 | 외형: 한쪽 눈을 가린 베이지색 장발, 회색 눈, 세라복과 베이지색 자켓 | 성격: 소심하고 겁이 많으며 불안감을 자주 느끼지만 귀여운 것을 좋아합니다. 서예리가 주로 데리고 다니며 영능력을 다룹니다.' },
    { name: '백시율', code: 'F', grade: 'S', desc: '사신 · 19세 | 외형: 백발 장발, 붉은색 눈, 검은색 로브와 세라복, 붉은색 완장 | 성격: 쿨데레 성향의 원칙주의자. 3학년 선도부 일원으로 백하울의 언니이며 홍윤화와 친합니다. 붉은 불꽃을 다룹니다.' },
    { name: '한서윤', code: 'H', grade: 'B', desc: '용족 · 18세 | 외형: 검은색 장발, 보라색 눈, 세라복, 검 자켓, 한쪽 눈 안대 및 팔 붕대 | 성격: 거만하고 대범한 중2병 캐릭터지만, 실제 전투력과 성적이 매우 높습니다. 용족의 힘과 마안을 사용합니다.' },
    { name: '이브', code: 'G', grade: 'A', desc: '메카 · 18세 | 외형: 민트색 단발, 노란색 눈, 세라복과 하얀색 자켓 | 성격: 철저하고 규칙적이며 무뚝뚝해 보이지만 의외의 융통성을 지녔습니다. 주변 전자기기와 드론을 개조하는 능력이 있습니다.' },
    { name: '백토하', code: 'I', grade: 'C', desc: '수인(토끼) · 19세 | 외형: 백발에 분홍색 브릿지가 들어간 낮은 포니테일, 분홍색 눈 | 성격: 상냥하고 긍정적인 에너지를 뿜어내는 교내 엄마 같은 존재입니다. 토끼 수인 특유의 민첩함과 검술을 자랑합니다.' },
    { name: '윤세라', code: 'J', grade: 'B', desc: '흡혈귀 · 19세 | 외형: 남색 단발, 주황색 눈, 검은색 목도리와 머리띠 | 성격: 무서운 외관과 달리 차분하고 겸손하며 허당기 있는 쿨데레입니다. 베르무트의 동생임을 숨기고 있으며 창 형태의 혈마법을 씁니다.' },
    { name: '유설화', code: 'L', grade: 'A', desc: '정령 · 19세 | 외형: 단정한 백발 장발, 하얀색 눈, 깃털 머리핀, 한쪽 어깨 망토와 완장 | 성격: 명랑하고 유능한 3학년 학생회장. 아카데미 최고의 인싸이며 방대한 정령 에너지를 다룹니다. 과식 버릇을 신경 쓰고 있습니다.' },
    { name: '이세라', code: 'M', grade: 'A', desc: '천사 · 22세 | 외형: 민트색 낮은 트윈테일, 푸른색 눈, 파란색 기관사 모자와 케이프렛 | 성격: 유능하여 항상 일이 많은 과로 상태의 부기장(교장 대리)입니다. 학생들을 잘 챙기며 에너지 화살을 쏩니다.' },
    { name: '레인', code: 'N', grade: 'S', desc: '??? · 나이 불명 | 외형: 머리에 하늘이 비치는 하늘색 장발, 오드아이(노란색/파란색), 정복 코트 | 성격: 쾌활하고 창의적인 기장(교장). 고대 종족이라는 소문이 있으며 나이 언급에 민감합니다. 고대 마법을 다룹니다.' },
    { name: '구미호', code: 'O', grade: 'B', desc: '수인(여우) · 22세 | 외형: 베이지색 장발, 노란색 눈, 베이지색 자켓과 넥타이 | 성격: 능력 담당 교사. 장난기가 많고 능글맞은 성격(약간의 메스가키 속성)으로 학생들을 아낍니다. 야명성 출신이며 여우불을 다룹니다.' },
    { name: '홍윤화', code: 'K', grade: 'A', desc: '악마 · 19세 | 외형: 흑발 단발, 붉은색 눈, 검은색 세라복과 어깨 자켓 | 성격: 냉철하고 리더십 있는 성격. 화장품을 좋아하며, 악마 특유의 특징 때문에 서예리가 무서워해 곤란해합니다. 마검과 악마 권능을 씁니다.' },
    { name: '백하울', code: 'E', grade: 'B', desc: '사신 · 18세 | 외형: 백발 낮은 트윈테일, 파란색 눈, 검은색 로브와 파란색 완장 | 성격: 능글맞고 장난기가 많지만 의외로 성실한 선도부 일원. 푸른 불꽃을 다룹니다.' },
    { name: '송혜성', code: 'P', grade: 'A', desc: '인간 · 22세 | 외형: 남색 포니테일, 주황색 눈, 목도리와 하네스 | 성격: 복합 능력 담당 교사. 무뚝뚝하고 쿨데레 같지만 학생들을 진심으로 아끼며 레인의 신임을 받습니다. 초인적인 신체능력과 검술을 지녔습니다.' },
    { name: '아이라', code: 'Q', grade: 'S', desc: '마녀 · 23세 | 외형: 보라빛 은발 단발, 진주색 눈, 마녀 모자와 보라색 자켓 | 성격: 상냥하고 나긋나긋하며 우유부단한 성격의 대마녀. 아카데미의 이론 담당 교사이며 대마법을 다룹니다.' },
    { name: '휴피', code: 'NO', grade: 'S', desc: '고대 정령 · 나이 불명 | 외형: 구름 같은 백발 장발, 푸른색 눈, 하얀색 세라복과 빵모자 (15세 미소녀 외형) | 성격: 천진난만하고 희망찬 레인의 벗이자 스타레일 교사(열차)의 본체입니다. 그녀의 존재 자체가 1급 기밀이며 정령의 권능을 다룹니다.' }
  ],
  '루미나리스': [
    { name: '레굴루스', code: 'R', grade: 'S', desc: '인간 · 20세 | 외형: 흑발 장발, 보라색 눈, 검은색 드레스와 푸른 꽃 머리띠 | 성격: 차분하고 이상적인 \'꿈 세력\'의 어린 지도자. 스피카와 친구였으나 입장 차이로 헤어졌으며, 이상의 마법을 다룹니다.' },
    { name: '스피카', code: 'S', grade: 'S', desc: '인간 · 20세 | 외형: 은발 낮은 포니테일, 노란색 눈, 하얀색 드레스와 검은색 케이프렛 | 성격: 무뚝뚝하고 현실적인 \'현실 세력\'의 어린 지도자. 빛 형태의 현실 마법을 사용합니다.' },
    { name: '엘리스', code: 'T', grade: 'A', desc: '정령 · 20세 | 외형: 금발 장발, 푸른색 눈, 푸른색 드레스와 페도라 | 성격: 유능하고 체계적인 꿈 파벌 소속으로 레굴루스의 보좌관입니다. 카드를 이용한 마법을 씁니다.' },
    { name: '루셰', code: 'U', grade: 'B', desc: '천사 · 21세 | 외형: 남색 단발, 보라색 눈, 회색 슈러그와 하네스 | 성격: 차갑고 직설적인 현실 파벌 소속. 스피카의 동료로 신성력과 검술에 능합니다.' },
    { name: '레지스', code: 'V', grade: 'C', desc: '유령 · 20세 | 외형: 붉은색 포니테일, 붉은색 눈, 검은색 자켓과 브라탑 | 성격: 어느 파벌에도 속하지 않은 중립. 활발하고 능글맞으며 순수하게 분탕치는 것을 좋아하는 쾌락주의자입니다. 특수 제작 유령 폭탄을 다룹니다.' }
  ],
  '녹티스': [
    { name: '멜라시아', code: 'W', grade: 'S', desc: '흡혈귀 · 19세 | 외형: 은발 트윈테일, 붉은색 눈, 고스로리풍 검은 드레스 | 성격: 오만하고 자신감 넘치는 활발한 성격. 자칭 윤세라의 라이벌이자 친구이며 연기 형태의 혈마법을 씁니다.' },
    { name: '로즈마리', code: 'AB', grade: 'B', desc: '흡혈귀 · 23세 | 외형: 보라색 곱슬 장발, 주황색 눈, 검은색 바디슈트와 하네스 | 성격: 말이 거의 없고 음침한 쿨데레. 베르무트의 경호원이자 열렬한 추종자입니다. 권갑 형태의 혈마법을 다룹니다.' },
    { name: '슈베르츠', code: 'BC', grade: 'A', desc: '흡혈귀 · 21세 | 외형: 민트색 땋은 포니테일, 붉은색 눈, 하얀색 코트와 고글 | 성격: 엉뚱하고 괴짜 같은 천재 발명가. 흡혈귀도 쬘 수 있는 태양을 만드는 것이 목표입니다. 베르무트의 은밀한 지원을 받고 있습니다.' },
    { name: '베르무트', code: 'CD', grade: 'S', desc: '흡혈귀 · 23세 | 외형: 남색 장발, 붉은색 눈, 하얀색 셔츠와 검은색 코트, 머리 위 선글라스 | 성격: 녹티스 1등 기업 블라디테크의 회장. 세련되고 효율을 중시하는 쿨데레지만 중증 시스콘(윤세라의 언니)입니다. 실 형태의 혈마법을 씁니다.' }
  ],
  '야명성': [
    { name: '율', code: 'X', grade: 'S', desc: '용 · 20세 | 외형: 초록색 장발, 옥색 눈, 무녀복 | 성격: 호기심 많고 명랑한 말괄량이 성격. 야명성의 9대 수호자이며 강력한 용족의 힘을 지녔습니다.' },
    { name: '호랑', code: 'Y', grade: 'A', desc: '수인(호랑이) · 22세 | 외형: 주황색 호랑이 무늬 단발, 주황색 눈, 주황색 하오리와 가슴 붕대 | 성격: 능글맞고 나른한 성격의 온천 마니아. 율의 보좌관이며 호랑이 수인의 힘을 지녔습니다.' },
    { name: '네코', code: 'Z', grade: 'B', desc: '수인(고양이) · 21세 | 외형: 붉은 브릿지가 들어간 하얀색 장발, 붉은색 눈, 빨간색 하오리 | 성격: 도시의 막내이자 안내원 역할. 능글맞고 장난기가 많은 메스가키 속성이며 요술을 다룹니다.' },
    { name: '까오', code: 'DE', grade: 'A', desc: '수인(까마귀) · 21세 | 외형: 한쪽 눈을 가린 검은색 포니테일, 푸른색 눈, 검은색 하오리 | 성격: 무뚝뚝하고 차분하며 유능한 야명성의 책사. 율의 스승이기도 하며 깃털을 이용한 공격술을 씁니다.' }
  ],
  '매직월드': [
    { name: '글라시아', code: 'FG', grade: 'S', desc: '마녀 · 24세 | 외형: 베이지색 곱슬 장발, 노란색 눈, 마녀 모자 | 성격: 현직 마녀들의 대표이자 대마녀. 상냥하고 창의적이며 아이라와 에큘라의 스승입니다. 과거 제자였던 도로시에 대한 후회를 품고 있으며 환상 마법을 씁니다.' },
    { name: '에큘라', code: 'EF', grade: 'A', desc: '마녀 · 21세 | 외형: 한쪽 눈을 가린 자주색 장발, 자주색 눈, 검은색 드레스 | 성격: 흑요마탑의 탑주. 음침하고 소심해 보이지만 특정 분야에 집착하는 성향이 있습니다. 아이라의 친구이며 거울 마법을 다룹니다.' },
    { name: '레아', code: 'GH', grade: 'B', desc: '마녀 · 19세 | 외형: 주황색 낮은 트윈테일, 핑크색 눈, 갈색 망토 | 성격: 엄청난 재능을 지닌 글라시아의 막내 제자. 자신감 넘치고 도전적인 메스가키 속성이며 불완전한 환상 마법을 씁니다.' },
    { name: '로두스', code: 'HI', grade: 'C', desc: '마녀 · 21세 | 외형: 초록색 장발, 초록색 눈, 검은색 케이프렛과 초록색 목도리 | 성격: 마녀들 사이에서 공공연한 장난꾸러기이자 호기심 많은 분탕충. 뱀 같은 능글맞음이 특징이며 장난의 마법을 씁니다.' }
  ],
  '언노운': [
    { name: '라줄리', code: 'IJ', grade: 'S', desc: '인간 · 17세 | 외형: 짙은 회색의 부스스한 장발, X자 동공의 붉은색 눈, 회색 자켓 | 성격: 이하늘의 자매이자 언노운의 마스코트. 본래 청춘을 좋아하던 소녀였으나 특정 사건으로 절망하여 순수한 악의를 지니게 되었습니다. 저주 마법을 다룹니다.' },
    { name: '에버네일', code: 'JK', grade: 'A', desc: '정령 · 21세 | 외형: 라벤더 장발 드릴 머리, 회색 눈, 검은색 드레스와 베일 | 성격: 전 루미나리스의 통치자. 예의 바르고 차분해 보이나 루미나리스를 뜯어고치려는 음흉한 극단주의자입니다. 최면 파동을 사용합니다.' },
    { name: '블레드', code: 'KL', grade: 'B', desc: '흡혈귀 · 100세 (진조) | 외형: 은발 장발, 붉은색 눈, 하얀색 셔츠와 검은색 케이프렛 | 성격: 녹티스 8대 진조 중 하나로 늙지 않습니다. 오만하고 여유로우며, 심심한 것을 싫어해 라줄리와 자주 어울려 다닙니다. 피를 조종하는 권능을 가졌습니다.' },
    { name: '흑랑', code: 'LM', grade: 'A', desc: '수인(늑대) · 22세 | 외형: 검은색 포니테일, 노란색 눈, 검은색 하오리와 가슴 붕대 | 성격: 야명성의 추방자. 어린 \'율\'에게 모든 짐을 지우는 체제에 반기를 들다 추방당했습니다. 에버네일과 뜻을 같이하며 완벽한 검술을 구사합니다.' },
    { name: '도로시', code: 'MN', grade: 'C', desc: '마녀 · 19세 | 외형: 짙은 붉은색 트윈테일, 붉은색 눈, 붉은색 케이프렛과 마녀 모자 | 성격: 본래 글라시아의 수제자였으나, 천재 후배 \'레아\'에게 밀려난 열등감과 질투심으로 타락한 까칠하고 오만한 마녀입니다. 금지된 마법을 사용합니다.' }
  ]
};

export default function Characters() {
  const [selectedFaction, setSelectedFaction] = useState(Object.keys(factions)[0]);
  const [selectedChar, setSelectedChar] = useState<any>(null);

  const getRandomImage = (code: string) => {
    // Return 1.png as the initial image
    return `https://working-cat.org/startrail/${code}/1.png`;
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-slate-50 min-h-screen">
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-[0.2em] mb-6 text-slate-900 drop-shadow-sm">STUDENT RECORDS</h2>
        <div className="flex flex-wrap justify-center gap-2 px-2">
          {Object.keys(factions).map((faction) => (
            <button
              key={faction}
              onClick={() => setSelectedFaction(faction)}
              className={`px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm font-bold tracking-widest transition-all border ${
                selectedFaction === faction 
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                  : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-100 hover:border-slate-400'
              }`}
            >
              {faction}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        key={selectedFaction}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
      >
        {factions[selectedFaction as keyof typeof factions].map((char) => (
          <div 
            key={char.name} 
            onClick={() => setSelectedChar(char)}
            className="bg-[#fdfbf7] p-4 md:p-5 border-2 border-slate-300 shadow-[2px_4px_10px_rgba(0,0,0,0.05)] hover:shadow-[4px_8px_15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all group cursor-pointer relative overflow-hidden"
          >
            {/* Document styling elements */}
            <div className="absolute top-0 right-0 w-12 h-12 bg-red-500/10 border-l border-b border-red-500/20 flex items-center justify-center transform translate-x-4 -translate-y-4 rotate-45 group-hover:bg-red-500/20 transition-colors">
              <span className="text-[8px] font-black text-red-600/50 tracking-widest uppercase -rotate-45 mt-4 ml-2">CONFIDENTIAL</span>
            </div>
            <div className="absolute top-2 left-2 w-8 h-2 border-t-2 border-l-2 border-slate-300"></div>
            <div className="absolute bottom-2 right-2 w-8 h-2 border-b-2 border-r-2 border-slate-300"></div>
            
            <div className="flex justify-between items-start mb-3 border-b-2 border-slate-800 pb-2">
              <div>
                <p className="text-[9px] md:text-[10px] text-slate-500 font-mono tracking-widest uppercase mb-0.5">ID: {char.code}-{Math.floor(Math.random() * 9000) + 1000}</p>
                <h4 className="text-lg md:text-xl font-black text-slate-900 tracking-tight">{char.name}</h4>
              </div>
              <div className="bg-slate-900 text-white px-2 py-1 text-xs font-bold font-mono">
                {char.grade}
              </div>
            </div>

            <div className="aspect-video mb-4 overflow-hidden bg-slate-200 border border-slate-300 relative p-1">
              <div className="absolute inset-0 border border-dashed border-slate-400 m-1 pointer-events-none z-10"></div>
              <img 
                src={getRandomImage(char.code)} 
                alt={char.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale-[20%] contrast-125 group-hover:grayscale-0 transition-all duration-500"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase w-12">Class:</span>
                <span className="text-xs font-medium text-slate-800 bg-slate-200 px-1.5 py-0.5 rounded-sm">{char.desc.split('·')[0].trim()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase w-12">Status:</span>
                <span className="text-xs font-medium text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-sm">ACTIVE</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {mounted && createPortal(
        <AnimatePresence>
          {selectedChar && (
            <motion.div
              key="char-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-2 md:p-4"
              onClick={() => setSelectedChar(null)}
            >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-[#fdfbf7] p-3 md:p-8 shadow-2xl max-w-2xl w-[95vw] md:w-full relative max-h-[85vh] md:max-h-[90vh] overflow-y-auto overflow-x-hidden border-2 border-slate-800 custom-scrollbar flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Document styling */}
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-800 shrink-0"></div>
              <div className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 border-4 border-red-600/30 rounded-full flex items-center justify-center rotate-12 pointer-events-none">
                <span className="text-red-600/30 font-black text-[10px] md:text-sm tracking-widest -rotate-12">APPROVED</span>
              </div>

              <button 
                onClick={() => setSelectedChar(null)}
                className="absolute top-3 right-3 md:top-6 md:right-6 text-slate-500 hover:text-slate-900 bg-white/80 p-1 rounded-full backdrop-blur-sm z-10"
              >
                <X size={20} className="md:w-6 md:h-6" />
              </button>
              
              <div className="flex flex-col gap-3 md:gap-8 mt-2 md:mt-4 shrink-0">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full overflow-hidden bg-slate-200 border-2 border-slate-800 p-1 relative shadow-inner flex items-center justify-center">
                    <img 
                      src={getRandomImage(selectedChar.code)} 
                      alt={selectedChar.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-auto max-h-[35vh] md:max-h-[45vh] object-contain grayscale-[10%] contrast-110"
                      onError={(e) => (e.currentTarget.style.display = 'none')}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-[8px] font-mono px-1 py-0.5">
                      IMG_REF_{selectedChar.code}
                    </div>
                  </div>
                  {/* Barcode mock */}
                  <div className="h-4 md:h-8 w-full flex justify-between items-end px-2 opacity-60">
                    {[...Array(40)].map((_, i) => (
                      <div key={i} className={`bg-slate-800 ${Math.random() > 0.5 ? 'w-1' : 'w-0.5'} ${Math.random() > 0.3 ? 'h-full' : 'h-3/4'}`}></div>
                    ))}
                  </div>
                </div>
                
                <div className="w-full flex flex-col shrink-0">
                  <div className="border-b-4 border-slate-800 pb-2 md:pb-3 mb-3 md:mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter uppercase truncate pr-2">{selectedChar.name}</h3>
                      <div className="bg-slate-900 text-white px-2 py-0.5 md:px-3 md:py-1 text-sm md:text-lg font-black font-mono border-2 border-slate-900 shadow-[2px_2px_0_#cbd5e1] shrink-0">
                        {selectedChar.grade}
                      </div>
                    </div>
                    <div className="flex gap-3 md:gap-4 text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-600">
                      <span><strong className="text-slate-900">CODE:</strong> {selectedChar.code}</span>
                      <span><strong className="text-slate-900">STATUS:</strong> ACTIVE</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3 md:space-y-4 mb-4 md:mb-6 flex-grow">
                    <div className="bg-slate-100 p-3 md:p-4 border border-slate-300 relative">
                      <div className="absolute -top-2 left-4 bg-[#fdfbf7] px-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Personal Details</div>
                      <ul className="text-slate-800 leading-relaxed text-xs md:text-sm space-y-1.5 md:space-y-2 break-words whitespace-pre-wrap">
                        {selectedChar.desc.split('|').map((item: string, index: number) => {
                          const [label, ...rest] = item.split(':');
                          if (rest.length > 0) {
                            return (
                              <li key={index} className="flex flex-col sm:flex-row sm:gap-2 border-b border-slate-200 pb-1 last:border-0 last:pb-0">
                                <span className="font-bold text-slate-900 min-w-[40px] shrink-0">{label.trim()}:</span>
                                <span>{rest.join(':').trim()}</span>
                              </li>
                            );
                          }
                          return <li key={index} className="border-b border-slate-200 pb-1 last:border-0 last:pb-0">{item.trim()}</li>;
                        })}
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-slate-600"><span>Combat Power</span><span>85%</span></div>
                        <div className="h-1.5 md:h-2 bg-slate-200 border border-slate-300 overflow-hidden"><div className="h-full bg-slate-800 w-[85%]"></div></div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] font-bold mb-1 uppercase tracking-widest text-slate-600"><span>Agility</span><span>92%</span></div>
                        <div className="h-1.5 md:h-2 bg-slate-200 border border-slate-300 overflow-hidden"><div className="h-full bg-slate-800 w-[92%]"></div></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-3 md:pt-4 border-t-2 border-slate-300 flex justify-between items-end shrink-0">
                    <div className="text-[9px] md:text-[10px] text-slate-500 font-mono uppercase leading-tight">
                      Startrail Academy<br/>
                      Department of Records<br/>
                      Auth: {Math.random().toString(36).substring(2, 8).toUpperCase()}
                    </div>
                    <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-slate-800 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-slate-800 font-black text-[6px] md:text-[8px] text-center leading-none">OFFICIAL<br/>SEAL</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
  </div>
  );
}
