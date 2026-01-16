
import React from 'react';
import { Destination, Language } from '../types';

interface Props {
  destination: Destination;
  onOpenDetail: (dest: Destination) => void;
  lang: Language;
}

const DestinationCard: React.FC<Props> = ({ destination, onOpenDetail, lang }) => {
  return (
    <div 
      onClick={() => onOpenDetail(destination)}
      className="group relative bg-white rounded-[2rem] overflow-hidden soft-shadow border border-emerald-50/50 transition-all duration-700 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-[30rem] overflow-hidden">
        <img src={destination.imageUrl} alt={destination.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-transparent"></div>
        
        <div className="absolute top-6 left-6">
          <span className="bg-emerald-400 text-emerald-950 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
            {destination.category.replace('-', ' ')}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mb-6">
            <p className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-2">{destination.region}</p>
            <h3 className="text-3xl font-black text-white mb-3 leading-tight tracking-tighter">{destination.name}</h3>
            
            <div className="flex flex-wrap gap-4 mt-4 py-4 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-[7px] text-white/40 font-bold uppercase tracking-widest">{lang === 'id' ? 'Kesulitan' : 'Difficulty'}</span>
                <span className="text-xs text-white font-bold">{destination.difficulty[lang]}</span>
              </div>
              <div className="flex flex-col ml-auto text-right">
                <span className="text-[7px] text-white/40 font-bold uppercase tracking-widest">{lang === 'id' ? 'Mulai Dari' : 'Starts From'}</span>
                <span className="text-sm text-emerald-400 font-black">{destination.priceRange.split(' - ')[0]}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
             <button className="bg-white text-emerald-950 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors shadow-xl">
               {lang === 'id' ? 'Eksplorasi' : 'Explore'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
