
import React, { useState } from 'react';
import { generateItinerary } from '../services/geminiService';
import { ItineraryResponse, Language } from '../types';

interface Props {
  language: Language;
}

const AIPlanner: React.FC<Props> = ({ language }) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(4);
  const [interest, setInterest] = useState('Eksplorasi Hutan Primer & Birding');
  const [budget, setBudget] = useState('Backpacker');
  const [result, setResult] = useState<ItineraryResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await generateItinerary({ duration, interest, budget, language });
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Connection error.");
    } finally {
      setLoading(false);
    }
  };

  const labels = {
    id: { title: 'Ekspedisi Custom AI', desc: 'Rancang petualangan rimba Anda.', btn: 'GENERATE EKSPEDISI' },
    en: { title: 'AI Custom Expedition', desc: 'Design your jungle adventure.', btn: 'GENERATE EXPEDITION' },
    zh: { title: 'AI定制探险', desc: '设计您的丛林冒险。', btn: '生成探险计划' },
    de: { title: 'KI-Custom-Expedition', desc: 'Gestalten Sie Ihr Dschungelabenteuer.', btn: 'EXPEDITION GENERIEREN' }
  };

  return (
    <div id="planner" className="py-32 bg-emerald-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="max-w-3xl mb-20 reveal">
          <h2 className="text-6xl font-black mb-6 tracking-tighter leading-none">{labels[language].title}</h2>
          <p className="text-emerald-200/60 text-xl font-medium leading-relaxed">{labels[language].desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 reveal">
            <div className="space-y-8 bg-emerald-900/30 p-8 rounded-[2rem] border border-emerald-800/50">
              <button 
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-white hover:bg-emerald-400 hover:text-emerald-950 text-emerald-950 py-5 rounded-2xl font-black uppercase tracking-widest transition-all disabled:opacity-50"
              >
                {loading ? '...' : labels[language].btn}
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 reveal">
            {result && (
              <div className="bg-white text-emerald-950 p-12 rounded-[3rem] shadow-2xl">
                <h3 className="text-4xl font-black mb-4">{result.title}</h3>
                <p className="text-emerald-900/60 mb-12">{result.summary}</p>
                <div className="space-y-8">
                  {result.dailyPlan.map((day) => (
                    <div key={day.day} className="flex gap-6 border-l-4 border-emerald-400 pl-6">
                      <div>
                        <p className="font-black text-lg">{day.activity}</p>
                        <p className="text-sm italic text-emerald-700">"{day.tips}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
