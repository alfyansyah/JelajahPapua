
import React, { useState } from 'react';
import { generateItinerary } from '../services/geminiService';
import { ItineraryResponse } from '../types';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(3);
  const [interest, setInterest] = useState('Danau Sentani & Budaya');
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
      console.error("AI Planner Error:", err);
      setError(err.message || "Terjadi gangguan koneksi. Silakan coba sesaat lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="planner" className="py-32 bg-emerald-950 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-900/20 blur-3xl rounded-full translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-3xl mb-20 reveal">
          <h2 className="text-5xl font-extrabold mb-6 tracking-tight leading-none">Rancang Perjalananmu <br /><span className="text-emerald-400">Secara Personal</span></h2>
          <p className="text-emerald-200/60 text-lg font-medium leading-relaxed">
            Teknologi AI kami memahami nuansa alam Papua untuk menyusun jadwal yang efisien namun tetap memberikan ruang untuk spontanitas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 reveal" style={{animationDelay: '0.2s'}}>
            <div className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Durasi Perjalanan</label>
                <div className="flex items-center space-x-4">
                  <input 
                    type="range" min="1" max="14" value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="flex-1 h-1 bg-emerald-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                  />
                  <span className="text-2xl font-bold w-12">{duration}D</span>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Fokus Utama</label>
                <select 
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full bg-emerald-900/50 border border-emerald-800 text-white px-6 py-4 rounded-2xl outline-none focus:border-emerald-400 transition-all font-medium"
                >
                  <option className="bg-emerald-950">Danau Sentani & Budaya</option>
                  <option className="bg-emerald-950">Mendaki Pegunungan Cycloop</option>
                  <option className="bg-emerald-950">Backpacker Island Hopping</option>
                  <option className="bg-emerald-950">Birding & Hutan Arfak</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-4">Gaya Budget</label>
                <div className="grid grid-cols-3 gap-3">
                  {(['Backpacker', 'Standard', 'Luxury'] as const).map((b) => (
                    <button
                      key={b}
                      onClick={() => setBudget(b)}
                      className={`py-3 text-[10px] font-bold uppercase tracking-widest rounded-xl border transition-all active:scale-95 ${
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

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <p className="text-red-400 text-xs font-bold leading-relaxed">
                    <span className="block mb-1">⚠️ Perhatian:</span>
                    {error}
                  </p>
                </div>
              )}

              <button 
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-white hover:bg-emerald-50 text-emerald-950 py-5 rounded-2xl font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-3 disabled:opacity-50 active:scale-95"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-emerald-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <span>Susun Rencana</span>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 reveal" style={{animationDelay: '0.4s'}}>
            {result ? (
              <div className="bg-white text-emerald-950 p-12 rounded-[2.5rem] shadow-2xl">
                <div className="mb-12 border-b border-emerald-50 pb-8">
                  <h3 className="text-3xl font-bold mb-4 tracking-tight">{result.title}</h3>
                  <p className="text-emerald-900/60 leading-relaxed font-medium">{result.summary}</p>
                </div>

                <div className="space-y-10">
                  {result.dailyPlan.map((day) => (
                    <div key={day.day} className="flex gap-10">
                      <div className="flex-shrink-0 text-center">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300 block mb-1">Day</span>
                        <span className="text-4xl font-black text-emerald-950">0{day.day}</span>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-emerald-900 mb-3 leading-snug">{day.activity}</p>
                        <div className="flex items-start space-x-2 bg-emerald-50/50 p-4 rounded-xl">
                          <span className="text-[10px] font-bold text-emerald-600 mt-1 uppercase tracking-widest">Tips:</span>
                          <p className="text-sm text-emerald-800/80 font-medium">{day.tips}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-10 border-t border-emerald-50">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-300 mb-6">Equipment Checklist</h4>
                  <div className="flex flex-wrap gap-3">
                    {result.essentials.map((item, idx) => (
                      <span key={idx} className="bg-emerald-950 text-white px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[500px] border-2 border-emerald-800/30 rounded-[2.5rem] flex flex-col items-center justify-center text-center p-16">
                <div className="w-16 h-16 border border-emerald-800 rounded-full flex items-center justify-center mb-8">
                  <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-emerald-100 mb-4">Mulai Ekspedisimu</h4>
                <p className="text-emerald-200/40 max-w-sm font-medium">Lengkapi parameter di sisi kiri untuk mendapatkan panduan perjalanan eksklusif dari tim AI kami.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
