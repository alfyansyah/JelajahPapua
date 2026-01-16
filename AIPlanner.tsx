
import React, { useState } from 'react';
import { generateItinerary } from '../services/geminiService';
import { ItineraryResponse } from '../types';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(4);
  const [interest, setInterest] = useState('Eksplorasi Hutan Primer & Birding');
  const [budget, setBudget] = useState<'Backpacker' | 'Standard' | 'Luxury'>('Backpacker');
  const [result, setResult] = useState<ItineraryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await generateItinerary({ duration, interest, budget });
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Terjadi gangguan koneksi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="planner" className="py-32 bg-emerald-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-800/20 blur-3xl rounded-full translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-3xl mb-20 reveal">
          <h2 className="text-6xl font-black mb-6 tracking-tighter leading-none">Ekspedisi <br /><span className="text-emerald-400 underline decoration-emerald-800 underline-offset-8">Custom AI</span></h2>
          <p className="text-emerald-200/60 text-xl font-medium leading-relaxed">
            Rancang petualangan rimba Anda sendiri. AI kami akan menghitung logistik hutan untuk memastikan perjalanan aman dan berkesan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 reveal" style={{animationDelay: '0.2s'}}>
            <div className="space-y-8 bg-emerald-900/30 p-8 rounded-[2rem] border border-emerald-800/50">
              <div className="group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Lama Ekspedisi</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range" min="2" max="14" value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="flex-1 h-1.5 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <span className="text-3xl font-black w-14 text-emerald-400">{duration}D</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Target Penjelajahan</label>
                <select 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-emerald-900/50 border border-emerald-800 text-white px-6 py-4 rounded-2xl outline-none focus:border-emerald-400 transition-all font-bold text-sm"
                >
                  <option value="Eksplorasi Hutan Primer & Birding" className="bg-emerald-950">Eksplorasi Hutan Primer & Birding</option>
                  <option value="Pendakian Puncak Tinggi (Hiking)" className="bg-emerald-950">Pendakian Puncak Tinggi (Hiking)</option>
                  <option value="Survival Danau & Sungai" className="bg-emerald-950">Survival Danau & Sungai</option>
                  <option value="Island Trekking & Snorkeling" className="bg-emerald-950">Island Trekking & Snorkeling</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Tipe Logistik</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Backpacker', 'Standard', 'Luxury'] as const).map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`py-3 text-[9px] font-black uppercase tracking-widest rounded-xl border-2 transition-all active:scale-95 ${
                        budget === b 
                          ? 'bg-emerald-400 border-emerald-400 text-emerald-950' 
                          : 'bg-transparent border-emerald-800 text-emerald-500 hover:border-emerald-600'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p className="text-red-400 text-xs font-bold bg-red-500/10 p-4 rounded-xl border border-red-500/20">{error}</p>}

              <button 
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-white hover:bg-emerald-400 hover:text-emerald-950 text-emerald-950 py-5 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center space-x-3 disabled:opacity-50 active:scale-95 shadow-2xl"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>MENGANALISIS RIMBA...</span>
                  </div>
                ) : (
                  <span>GENERATE EXPEDITION</span>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 reveal" style={{animationDelay: '0.4s'}}>
            {result ? (
              <div className="bg-white text-emerald-950 p-12 rounded-[3rem] shadow-2xl border border-emerald-100">
                <div className="mb-12 border-b-2 border-emerald-50 pb-8 flex justify-between items-start">
                  <div className="max-w-xl">
                    <h3 className="text-4xl font-black mb-4 tracking-tighter leading-none text-emerald-950">{result.title}</h3>
                    <p className="text-emerald-900/60 leading-relaxed font-medium text-lg">{result.summary}</p>
                  </div>
                  <div className="bg-emerald-50 px-6 py-4 rounded-3xl text-center">
                    <span className="block text-[8px] font-black uppercase text-emerald-400 tracking-[0.2em] mb-1">Status</span>
                    <span className="text-emerald-900 font-black text-xs">READY TO GO</span>
                  </div>
                </div>

                <div className="space-y-12">
                  {result.dailyPlan.map((day: any) => (
                    <div key={day.day} className="flex gap-10 group">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-950 text-white flex flex-col items-center justify-center group-hover:bg-emerald-400 group-hover:text-emerald-950 transition-colors duration-500">
                          <span className="text-[8px] font-black uppercase tracking-widest">Day</span>
                          <span className="text-2xl font-black">0{day.day}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xl font-black text-emerald-950 mb-3 leading-snug">{day.activity}</p>
                        <div className="bg-emerald-50/50 border-l-4 border-emerald-400 p-5 rounded-r-2xl">
                          <p className="text-sm text-emerald-800 font-medium italic">"{day.tips}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[600px] border-4 border-dashed border-emerald-800/20 rounded-[3rem] flex flex-col items-center justify-center text-center p-16 group hover:border-emerald-800/40 transition-colors">
                <div className="w-24 h-24 bg-emerald-900/10 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                  <svg className="w-10 h-10 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <h4 className="text-3xl font-black text-emerald-100 mb-6 tracking-tighter">Panggil Navigator AI</h4>
                <p className="text-emerald-200/40 max-w-sm font-medium text-lg">Input preferensi Anda di kiri, dan biarkan sistem kami memetakan jalur rimba terbaik untuk Anda.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
