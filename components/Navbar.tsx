
import React from 'react';

const Navbar: React.FC = () => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Logic to handle scroll with fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    } else {
      console.warn(`Element with id ${id} not found`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav px-8 py-5">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
          className="flex items-center space-x-3 group outline-none"
        >
          <div className="w-8 h-8 bg-emerald-900 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
            <svg className="w-4 h-4 text-emerald-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-emerald-950 tracking-tighter">Jelajah<span className="text-emerald-700 font-medium">Papua</span></span>
        </button>
        
        <div className="hidden md:flex space-x-10 text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-900/60">
          <button onClick={() => scrollTo('explore')} className="hover:text-emerald-950 transition-all outline-none">Destinasi</button>
          <button onClick={() => scrollTo('planner')} className="hover:text-emerald-950 transition-all outline-none">AI Planner</button>
          <button onClick={() => scrollTo('tips')} className="hover:text-emerald-950 transition-all outline-none">Panduan</button>
        </div>

        <button 
          onClick={() => scrollTo('planner')}
          className="bg-emerald-950 hover:bg-emerald-900 text-white px-7 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-xl shadow-emerald-950/10 active:scale-95 outline-none"
        >
          Coba AI Planner
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
