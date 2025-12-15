import React, { useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { CONTENT } from '../constants';
import { Mail, Phone, MapPin, Linkedin, Instagram, FileText } from 'lucide-react';

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const content = CONTENT[language].contact;
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-20 bg-gradient-to-t from-purple-950/20 to-black relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="font-display text-5xl md:text-7xl font-bold mb-8">{content.cta}</h2>
          <div className="w-24 h-1 bg-purple-500 mx-auto rounded-full"></div>
        </div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/10 pt-16 max-w-7xl mx-auto">
          
          {/* Col 1: Contact Info */}
          <div className="space-y-6">
            <h3 className="font-bold text-xl mb-4">{content.title}</h3>
            
            <a href="mailto:rafinha.alvescosta@gmail.com" className="flex items-center gap-4 text-gray-400 hover:text-purple-400 transition-colors group">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <Mail size={18} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-600">{content.email}</span>
                rafinha.alvescosta@gmail.com
              </div>
            </a>

            <div className="flex items-center gap-4 text-gray-400 group">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-600">{content.phone}</span>
                (41) 99527-3616
              </div>
            </div>

             <div className="flex items-center gap-4 text-gray-400 group">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-600">{content.location}</span>
                Curitiba, PR - Brazil
              </div>
            </div>
          </div>

          {/* Col 2: Social / Links */}
          <div className="space-y-6 md:border-l md:border-white/10 md:pl-12">
             <h3 className="font-bold text-xl mb-4">SOCIAL</h3>
             <div className="flex gap-4">
               <a href="#" className="p-4 border border-white/20 rounded-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                 <Linkedin size={24} />
               </a>
               <a href="#" className="p-4 border border-white/20 rounded-lg hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                 <Instagram size={24} />
               </a>
             </div>
             
             <div className="pt-6">
               <button className="flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-purple-400 hover:text-white transition-colors">
                 <FileText size={16} />
                 Download CV / Resumo
               </button>
             </div>
          </div>

          {/* Col 3: Time Widget (Moved here) */}
          <div className="flex flex-col justify-center md:items-center md:border-l md:border-white/10 md:pl-12">
            <div className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center">
               <span className="text-[10px] uppercase tracking-[0.2em] text-purple-400 mb-2 block">Local Time (Brasília)</span>
               <div className="text-3xl md:text-4xl font-display font-bold text-white tabular-nums tracking-tight">
                 {time}
               </div>
               <div className="mt-4 flex items-center justify-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Online & Active</span>
               </div>
            </div>
          </div>

        </div>

        <footer className="mt-32 border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left text-xs text-gray-600 font-mono">
            <p>© 2024 RAFAEL ALVES DA COSTA. ALL RIGHTS RESERVED.</p>
            <p className="mt-2">DESIGNED & DEVELOPED WITH REACT</p>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;