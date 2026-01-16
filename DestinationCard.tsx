
import React from 'react';
import { Destination } from '../types';

interface Props {
  destination: Destination;
  onOpenDetail: (dest: Destination) => void;
}

const DestinationCard: React.FC<Props> = ({ destination, onOpenDetail }) => {
  return (
    <div 
      onClick={() => onOpenDetail(destination)}
      className="group relative bg-white rounded-[2rem] overflow-hidden soft-shadow border border-emerald-50/50 transition-all duration-700 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative h-[28rem] overflow-hidden">
        <img 
          src={destination.imageUrl} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent"></div>
        
        <div className="absolute top-6 left-6">
          <span className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
            {destination.category.replace('-', ' ')}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex justify-between items-end">
            <div className="flex-1">
              <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{destination.region}</p>
              <h3 className="text-2xl font-bold text-white mb-2 leading-tight tracking-tight">{destination.name}</h3>
              <p className="text-white/70 text-sm line-clamp-2 max-w-xs font-medium">
                {destination.description}
              </p>
            </div>
            <div className="text-right">
              <span className="text-white font-bold text-lg block">{destination.priceRange.split(' - ')[0]}</span>
              <span className="text-white/40 text-[9px] uppercase font-bold tracking-widest">Mulai Dari</span>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
             <div className="flex space-x-4">
                <div className="flex flex-col">
                  <span className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Tingkat Kesulitan</span>
                  <span className="text-xs text-white font-semibold">{destination.difficulty}</span>
                </div>
             </div>
             <button 
                className="bg-white text-emerald-950 px-6 py-2.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest hover:bg-emerald-50 transition-colors shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetail(destination);
                }}
             >
               Detail
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
