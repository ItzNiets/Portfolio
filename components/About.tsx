import React from 'react';
import { useLanguage } from './LanguageContext';
import { CONTENT } from '../constants';
import { Download, Sparkles, Cpu, Layers } from 'lucide-react';

const About: React.FC = () => {
  const { language } = useLanguage();
  const content = CONTENT[language].about;

  return (
    <section id="about" className="py-32 bg-black relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Sticky Identity */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="relative">
                {/* Abstract Avatar Placeholder */}
                <div className="w-full aspect-square bg-gradient-to-br from-purple-900/20 to-black border border-white/10 rounded-2xl overflow-hidden relative group">
                  <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/rafael/600/600')] bg-cover bg-center opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6">
                    <h3 className="font-display text-3xl font-bold text-white">Rafael Alves</h3>
                    <p className="text-purple-400 font-mono text-sm mt-1">19yo • Visual Artist</p>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 border border-white/10 rounded-lg bg-white/5">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">Current Status</p>
                    <p className="font-bold text-sm text-white">Available for Work</p>
                  </div>
                </div>
                
                <button className="w-full py-4 border border-white/20 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2 cursor-hover">
                  <Download size={16} />
                  Download CV
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Content & Details */}
          <div className="lg:w-2/3 space-y-20">
            
            {/* 1. The Hook / Bio */}
            <div>
              <span className="text-purple-500 font-mono text-xs tracking-[0.2em] mb-6 block">01 // THE ARCHITECT</span>
              <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight mb-8">
                {content.bio.split('.')[0]}.
              </h2>
              <div className="text-gray-400 text-lg leading-relaxed space-y-6 max-w-2xl">
                <p>{content.bio}</p>
              </div>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Education */}
              <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors">
                <h4 className="text-white font-display font-bold text-xl mb-6 flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-500" /> {content.educationTitle}
                </h4>
                <div className="space-y-6">
                  {content.education.map((edu, idx) => (
                    <div key={idx}>
                      <p className="text-white font-medium">{edu.degree}</p>
                      <p className="text-sm text-gray-500">{edu.uni}</p>
                      <span className="text-xs text-purple-400 font-mono">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PCD & Setup */}
              <div className="space-y-6">
                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                   <h4 className="font-bold text-white mb-2">{content.pcd.title}</h4>
                   <p className="text-sm text-gray-400 leading-relaxed">{content.pcd.desc}</p>
                </div>
                <div className="p-8 border border-white/10 rounded-2xl bg-white/[0.02]">
                   <h4 className="font-bold text-white mb-2">{content.setup.title}</h4>
                   <p className="text-sm text-gray-400 leading-relaxed">{content.setup.desc}</p>
                </div>
              </div>
            </div>

            {/* 3. Arsenal / Skills */}
            <div>
              <span className="text-purple-500 font-mono text-xs tracking-[0.2em] mb-8 block">02 // ARSENAL</span>
              <div className="space-y-8">
                {content.skills.map((skillGroup, idx) => (
                  <div key={idx} className="group border-b border-white/10 pb-8 last:border-0">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                         {idx === 0 ? <Layers className="text-gray-600" /> : <Cpu className="text-gray-600" />}
                         {skillGroup.category}
                      </h3>
                      <div className="h-[1px] flex-1 bg-white/10 mx-6 hidden md:block group-hover:bg-purple-500/50 transition-colors"></div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {skillGroup.items.map((item, i) => (
                        <span key={i} className="px-4 py-2 bg-white/5 rounded-full text-sm text-gray-300 font-mono border border-transparent hover:border-purple-500 transition-colors cursor-hover">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;