import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { CONTENT } from '../constants';
import { Globe, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const text = CONTENT[language].nav;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 flex justify-center pt-6`}
      >
        <div className={`
          relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500
          ${isScrolled ? 'w-[90%] md:w-[60%] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl shadow-purple-900/10' : 'w-[95%] bg-transparent border-transparent'}
        `}>
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-display font-bold text-lg tracking-tight cursor-hover text-white flex items-center gap-2"
          >
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            RAFAEL ALVES
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['work', 'about', 'contact'].map((key) => (
              <button 
                key={key}
                onClick={() => scrollTo(key)}
                className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors cursor-hover relative group"
              >
                {text[key as keyof typeof text]}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-purple-500 transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Settings */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white transition-colors cursor-hover px-3 py-1 rounded-full border border-white/10 hover:border-purple-500 hover:bg-purple-500/10"
            >
              <Globe size={12} />
              {language.toUpperCase()}
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-40 transition-transform duration-500 md:hidden flex flex-col items-center justify-center gap-8 ${mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}>
        {['work', 'about', 'contact'].map((key) => (
           <button 
             key={key}
             onClick={() => scrollTo(key)}
             className="font-display text-4xl font-bold uppercase text-white hover:text-purple-500 transition-colors"
           >
             {text[key as keyof typeof text]}
           </button>
        ))}
         <button 
            onClick={() => { toggleLanguage(); setMobileMenuOpen(false); }}
            className="mt-8 flex items-center gap-2 text-sm font-bold border border-white/20 px-6 py-2 rounded-full"
          >
            <Globe size={14} />
            Change Language ({language.toUpperCase()})
          </button>
      </div>
    </>
  );
};

export default Header;