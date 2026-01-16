
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import DestinationCard from './components/DestinationCard';
import AIPlanner from './components/AIPlanner';
import { DESTINATIONS } from './constants';
import { Destination } from './types';

const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const filteredDestinations = useMemo(() => {
    if (activeCategory === 'all') return DESTINATIONS;
    return DESTINATIONS.filter(d => d.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-vignette"></div>
        <div className="relative z-10 text-center px-8 reveal">
          <span className="text-emerald-300 font-bold uppercase tracking-[0.5em] text-[10px] mb-6 block">The Last Paradise on Earth</span>
          <h1 className="text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter leading-none">
            JELAJAH<br />PAPUA
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Dari pengamatan Cendrawasih di hutan rimba hingga island hopping ala backpacker. Temukan sisi Papua yang belum pernah Anda bayangkan.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-emerald-950 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-50 transition-all shadow-2xl active:scale-95"
            >
              Mulai Eksplorasi
            </button>
            <button 
              onClick={() => document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-emerald-800/30 backdrop-blur-md border border-white/20 text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-all active:scale-95"
            >
              Coba AI Planner
            </button>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="explore" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 reveal">
          <div className="max-w-xl">
            <h2 className="text-5xl font-extrabold text-emerald-950 mb-6 tracking-tight">Destinasi Pilihan</h2>
            <p className="text-emerald-900/60 text-lg font-medium leading-relaxed">
              Kami kurasi destinasi terbaik di Papua untuk pecinta alam, pengamat burung, dan petualang gaya ransel.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {['all', 'cendrawasih', 'island-hopping', 'camping', 'lake-sentani'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeCategory === cat 
                    ? 'bg-emerald-950 text-white shadow-xl' 
                    : 'bg-emerald-50 text-emerald-900/40 hover:text-emerald-900'
                }`}
              >
                {cat === 'all' ? 'Semua' : cat.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredDestinations.map((dest, idx) => (
            <div key={dest.id} className="reveal" style={{ animationDelay: `${idx * 0.1}s` }}>
              <DestinationCard destination={dest} onOpenDetail={setSelectedDest} />
            </div>
          ))}
        </div>
      </section>

      {/* AI Planner Section */}
      <AIPlanner />

      {/* Footer */}
      <footer className="bg-white py-20 border-t border-emerald-50">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
            <h4 className="text-2xl font-black text-emerald-950 mb-2">JelajahPapua</h4>
            <p className="text-emerald-900/40 font-medium">© 2025 Petualangan Alam Papua.</p>
          </div>
          <div className="flex space-x-12 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
            <a href="#" className="hover:text-emerald-950">Instagram</a>
            <a href="#" className="hover:text-emerald-950">Facebook</a>
            <a href="#" className="hover:text-emerald-950">YouTube</a>
          </div>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedDest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-emerald-950/40 backdrop-blur-xl" onClick={() => setSelectedDest(null)}></div>
          <div className="relative bg-white w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            <div className="md:w-1/2 h-80 md:h-auto relative">
              <img src={selectedDest.imageUrl} className="w-full h-full object-cover" alt={selectedDest.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/50 to-transparent"></div>
            </div>
            <div className="md:w-1/2 p-12 overflow-y-auto">
              <button 
                onClick={() => setSelectedDest(null)}
                className="absolute top-8 right-8 w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-950 hover:bg-emerald-100 transition-colors"
              >
                ✕
              </button>
              <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">{selectedDest.region}</span>
              <h3 className="text-4xl font-black text-emerald-950 mb-6 tracking-tight leading-none">{selectedDest.name}</h3>
              <p className="text-emerald-900/70 text-lg leading-relaxed mb-8 font-medium">{selectedDest.description}</p>
              
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="bg-emerald-50 p-6 rounded-2xl">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">Kesulitan</span>
                  <span className="text-emerald-950 font-bold">{selectedDest.difficulty}</span>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block mb-1">Estimasi Biaya</span>
                  <span className="text-emerald-950 font-bold">{selectedDest.priceRange}</span>
                </div>
              </div>
              
              <button 
                onClick={() => setSelectedDest(null)}
                className="w-full bg-emerald-950 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-emerald-900 transition-all shadow-xl shadow-emerald-950/10"
              >
                Tanya Paket Tour
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
