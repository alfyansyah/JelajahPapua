
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import DestinationCard from './components/DestinationCard';
import AIPlanner from './components/AIPlanner';
import { DESTINATIONS } from './constants';
import { Destination, Language } from './types';
import { UI_STRINGS } from './translations';

const WHATSAPP_NUMBER = "6282280307626"; 

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('id');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const t = (key: string) => UI_STRINGS[key]?.[lang] || key;

  const filteredDestinations = useMemo(() => {
    if (activeCategory === 'all') return DESTINATIONS;
    return DESTINATIONS.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  const handleInquiry = (dest: Destination) => {
    const message = lang === 'id' 
      ? `Halo JelajahPapua, saya tertarik dengan paket *${dest.name}* di *${dest.region}*.`
      : `Hi JelajahPapua, I am interested in the *${dest.name}* package in *${dest.region}*.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navbar currentLang={lang} onLangChange={setLang} />

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-vignette"></div>
        <div className="relative z-10 text-center px-8 reveal">
          <span className="text-emerald-300 font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">{t('hero_subtitle')}</span>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
            JELAJAH<br />PAPUA
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            {t('hero_desc')}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-emerald-950 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-2xl active:scale-95"
            >
              {t('btn_explore')}
            </button>
          </div>
        </div>
      </section>

      <section id="explore" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold text-emerald-950 mb-6 tracking-tight">{t('section_title_dest')}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {['all', 'cendrawasih', 'island-hopping', 'camping'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat ? 'bg-emerald-950 text-white' : 'bg-emerald-50 text-emerald-900/40 hover:text-emerald-900'
                }`}
              >
                {cat === 'all' ? (lang === 'id' ? 'Semua' : 'All') : cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDestinations.map((dest) => (
            <div key={dest.id}>
              {/* Note: DestinationCard needs translation prop too, or access lang */}
              <DestinationCard destination={dest} onOpenDetail={setSelectedDest} lang={lang} />
            </div>
          ))}
        </div>
      </section>

      <AIPlanner language={lang} />

      {selectedDest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xl" onClick={() => setSelectedDest(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <div className="md:w-1/2 h-80 md:h-auto relative">
              <img src={selectedDest.imageUrl} className="w-full h-full object-cover" alt={selectedDest.name} />
            </div>
            <div className="md:w-1/2 p-12 overflow-y-auto">
              <button onClick={() => setSelectedDest(null)} className="absolute top-8 right-8 w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">✕</button>
              <h3 className="text-4xl font-black text-emerald-950 mb-6">{selectedDest.name}</h3>
              <p className="text-emerald-900/70 text-lg mb-8">{selectedDest.description[lang]}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-emerald-50 p-6 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">{t('difficulty_label')}</span>
                  <span className="text-emerald-950 font-bold">{selectedDest.difficulty[lang]}</span>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl">
                  <span className="text-[10px] font-bold uppercase text-emerald-400 block mb-1">{t('price_label')}</span>
                  <span className="text-emerald-950 font-bold">{selectedDest.priceRange}</span>
                </div>
              </div>
              
              <button onClick={() => handleInquiry(selectedDest)} className="w-full bg-emerald-950 text-white py-5 rounded-2xl font-bold uppercase">
                {t('btn_inquiry')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
