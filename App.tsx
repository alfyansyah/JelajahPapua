
import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import DestinationCard from './components/DestinationCard';
import AIPlanner from './components/AIPlanner';
import { DESTINATIONS } from './constants';
import { Destination } from './types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weatherData = [
  { month: 'Jan', rain: 250 }, { month: 'Feb', rain: 240 }, { month: 'Mar', rain: 280 },
  { month: 'Apr', rain: 180 }, { month: 'Mei', rain: 150 }, { month: 'Jun', rain: 140 },
  { month: 'Jul', rain: 130 }, { month: 'Agu', rain: 120 }, { month: 'Sep', rain: 140 },
  { month: 'Okt', rain: 160 }, { month: 'Nov', rain: 190 }, { month: 'Des', rain: 230 },
];

const App: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cendrawasih' | 'island-hopping' | 'camping' | 'lake-sentani'>('all');
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);

  const filteredDestinations = useMemo(() => {
    if (filter === 'all') return DESTINATIONS;
    return DESTINATIONS.filter(dest => dest.category === filter);
  }, [filter]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedDest) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [selectedDest]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen selection:bg-emerald-200">
      <Navbar />

      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center px-8 overflow-hidden">
        <div className="absolute inset-0 hero-vignette"></div>
        
        <div className="relative z-10 text-center max-w-5xl reveal">
          <span className="inline-block text-emerald-300 text-[11px] font-black uppercase tracking-[0.5em] mb-10 border-b border-emerald-400/30 pb-2">
            The Last Frontier of Indonesia
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-[0.9]">
            Keajaiban Papua <br /> <span className="text-emerald-400">Dalam Genggaman</span>
          </h1>
          <p className="text-xl md:text-2xl text-emerald-50/70 mb-14 max-w-3xl mx-auto leading-relaxed font-medium italic">
            "Menemukan ketenangan di antara kabut Cycloop dan riak biru Danau Sentani."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
              onClick={() => scrollToSection('explore')}
              className="group bg-emerald-400 hover:bg-emerald-300 text-emerald-950 px-12 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-emerald-400/20 flex items-center outline-none active:scale-95"
            >
              Mulai Eksplorasi
              <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('explore')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hover:opacity-100 transition-opacity"
        >
           <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </button>
      </section>

      {/* Exploration Section */}
      <section id="explore" className="py-40 bg-[#fcfcfc]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-5xl font-extrabold text-emerald-950 mb-6 tracking-tight">Koleksi Destinasi</h2>
              <p className="text-emerald-900/50 text-lg font-medium">
                Pilihan rute yang mengutamakan kedekatan dengan alam dan masyarakat lokal. Setiap perjalanan adalah cerita.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => setFilter('all')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all outline-none ${filter === 'all' ? 'bg-emerald-950 text-white' : 'border border-emerald-100 text-emerald-900/40 hover:border-emerald-300'}`}
              >
                Semua
              </button>
              <button 
                onClick={() => setFilter('lake-sentani')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all outline-none ${filter === 'lake-sentani' ? 'bg-emerald-950 text-white' : 'border border-emerald-100 text-emerald-900/40 hover:border-emerald-300'}`}
              >
                Danau
              </button>
              <button 
                onClick={() => setFilter('island-hopping')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all outline-none ${filter === 'island-hopping' ? 'bg-emerald-950 text-white' : 'border border-emerald-100 text-emerald-900/40 hover:border-emerald-300'}`}
              >
                Pulau
              </button>
              <button 
                onClick={() => setFilter('camping')}
                className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all outline-none ${filter === 'camping' ? 'bg-emerald-950 text-white' : 'border border-emerald-100 text-emerald-900/40 hover:border-emerald-300'}`}
              >
                Gunung
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 min-h-[400px]">
            {filteredDestinations.length > 0 ? (
              filteredDestinations.map(dest => (
                <DestinationCard 
                  key={dest.id} 
                  destination={dest} 
                  onOpenDetail={(d) => setSelectedDest(d)}
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-emerald-900/40 font-bold uppercase tracking-widest">
                Belum ada destinasi untuk kategori ini.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selectedDest && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xl animate-in fade-in duration-500"
            onClick={() => setSelectedDest(null)}
          ></div>
          <div className="relative bg-white w-full max-w-5xl max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 flex flex-col md:flex-row">
            <button 
              onClick={() => setSelectedDest(null)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-white/20 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-white/40 transition-colors outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <div className="w-full md:w-1/2 h-[300px] md:h-full relative">
              <img src={selectedDest.imageUrl} alt={selectedDest.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 to-transparent md:hidden"></div>
            </div>
            
            <div className="w-full md:w-1/2 p-10 md:p-16 overflow-y-auto">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">{selectedDest.region}</span>
              <h2 className="text-4xl font-extrabold text-emerald-950 mb-6 tracking-tight">{selectedDest.name}</h2>
              <div className="flex gap-4 mb-8">
                <div className="bg-emerald-50 px-4 py-2 rounded-xl">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Kesulitan</span>
                  <span className="text-sm font-bold text-emerald-900">{selectedDest.difficulty}</span>
                </div>
                <div className="bg-emerald-50 px-4 py-2 rounded-xl">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">Estimasi</span>
                  <span className="text-sm font-bold text-emerald-900">{selectedDest.priceRange}</span>
                </div>
              </div>
              <p className="text-emerald-900/60 text-lg leading-relaxed font-medium mb-10">
                {selectedDest.description}
              </p>
              
              <div className="space-y-4 mb-10">
                <h4 className="font-black text-emerald-950 text-xs uppercase tracking-widest">Informasi Penting:</h4>
                <ul className="grid grid-cols-1 gap-3">
                  <li className="flex items-center space-x-3 text-sm text-emerald-900/70 font-medium">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                    <span>Terbuka untuk backpacker & rombongan</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-emerald-900/70 font-medium">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                    <span>Layanan pandu lokal tersertifikasi</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={() => {
                  setSelectedDest(null);
                  scrollToSection('planner');
                }}
                className="w-full bg-emerald-950 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-emerald-950/20 hover:bg-emerald-900 transition-all outline-none"
              >
                Buat Jadwal ke Sini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Planner Section */}
      <AIPlanner />

      {/* Insights Section */}
      <section id="tips" className="py-40 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <div className="reveal">
              <span className="text-emerald-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 block">Travel Insights</span>
              <h2 className="text-5xl font-extrabold text-emerald-950 mb-8 tracking-tight leading-tight">Mempersiapkan <br /> Jiwa & Raga</h2>
              <p className="text-emerald-900/60 mb-12 text-lg leading-relaxed font-medium">
                Papua menuntut kesiapan lebih dari sekadar logistik. Ia menuntut keterbukaan pikiran dan ketangguhan fisik untuk benar-benar merasakan magisnya.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-6 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2.5" /></svg>
                  </div>
                  <h4 className="font-bold text-emerald-950 mb-2">Timing Akurat</h4>
                  <p className="text-sm text-emerald-900/40 font-medium">Mengejar 'Golden Hours' di Sentani memerlukan koordinasi waktu yang presisi.</p>
                </div>
                <div className="group">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700 mb-6 transition-transform group-hover:scale-110">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2.5 2.5 0 012.5-2.5h1.065" strokeWidth="2.5" /></svg>
                  </div>
                  <h4 className="font-bold text-emerald-950 mb-2">Kearifan Lokal</h4>
                  <p className="text-sm text-emerald-900/40 font-medium">Selalu utamakan noken dan produk lokal sebagai bentuk dukungan ekonomi komunitas.</p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/50 p-12 rounded-[3rem] border border-emerald-100/50 h-[450px] relative reveal" style={{animationDelay: '0.3s'}}>
              <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] mb-12">Climate Pulse (Precipitation)</h3>
              <ResponsiveContainer width="100%" height="75%">
                <AreaChart data={weatherData}>
                  <defs>
                    <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#064e3b" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#064e3b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#d1fae5" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#064e3b', fontSize: 10, fontWeight: 700}} dy={15} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 50px rgba(6,78,59,0.1)', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="rain" stroke="#064e3b" strokeWidth={4} fillOpacity={1} fill="url(#colorRain)" />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-900/30 uppercase tracking-widest italic">Januari - Desember</span>
                <span className="text-[10px] font-bold text-emerald-950 uppercase tracking-widest">Ideal: Jun-Sep</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-950 text-white pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-10">
                <div className="w-8 h-8 bg-emerald-400 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-black tracking-tighter">Jelajah<span className="text-emerald-400">Papua</span></span>
              </div>
              <p className="text-emerald-200/40 max-w-sm leading-loose font-medium">
                Visi kami adalah menjadikan Papua sebagai destinasi ekowisata nomor satu dunia yang berbasis pada konservasi dan komunitas.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-8">Navigasi</h4>
              <ul className="space-y-4 text-emerald-100/60 text-xs font-bold uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('explore')} className="hover:text-emerald-400 transition-colors outline-none">Destinasi</button></li>
                <li><button onClick={() => scrollToSection('planner')} className="hover:text-emerald-400 transition-colors outline-none">AI Planner</button></li>
                <li><button onClick={() => scrollToSection('tips')} className="hover:text-emerald-400 transition-colors outline-none">Panduan</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-8">Hubungi Kami</h4>
              <ul className="space-y-4 text-emerald-100/60 text-xs font-bold uppercase tracking-widest">
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">WhatsApp</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition-colors">Email Us</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-16 border-t border-emerald-900/50 flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-emerald-200/20 text-[10px] font-bold uppercase tracking-[0.2em]">&copy; 2024 JelajahPapua Studio. All Rights Reserved.</p>
            <div className="flex space-x-8 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-200/20">
               <a href="#">Privacy</a>
               <a href="#">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
