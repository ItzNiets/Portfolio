import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from './LanguageContext';
import { CONTENT, PROJECTS } from '../constants';
import { Project } from '../types';
import { ArrowUpRight, X, Maximize2 } from 'lucide-react';

const Work: React.FC = () => {
  const { language } = useLanguage();
  const content = CONTENT[language].work;
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Logic for horizontal scroll mapping
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const offsetTop = container.offsetTop;
      const scrollY = window.scrollY;
      const height = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate how far we are into the section (0 to 1)
      const rawPercent = (scrollY - offsetTop) / (height - windowHeight);
      const percent = Math.min(Math.max(rawPercent, 0), 1);
      
      const track = document.getElementById('work-track');
      if (track) {
        // Move the track horizontally based on vertical scroll
        // The track width is roughly 100vw * number of projects. 
        // We move it negative X.
        const moveAmount = -(percent * (track.scrollWidth - window.innerWidth));
        track.style.transform = `translate3d(${moveAmount}px, 0, 0)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [selectedProject]);

  return (
    // Height is (100vh * number of items) to give enough scroll room
    <section 
      id="work" 
      ref={containerRef} 
      className="relative bg-neutral-900"
      style={{ height: '400vh' }} 
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">
        
        {/* Header absolute positioned */}
        <div className="absolute top-12 left-6 md:left-12 z-20 pointer-events-none">
           <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-2">{content.title}</h2>
           <div className="w-20 h-1 bg-purple-500"></div>
        </div>

        {/* The Moving Track */}
        <div 
          id="work-track" 
          className="flex gap-12 px-[10vw] items-center w-max will-change-transform"
        >
          {PROJECTS.map((project, idx) => (
            <div 
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="relative w-[85vw] md:w-[60vw] h-[60vh] shrink-0 group perspective-1000 cursor-hover"
            >
              {/* Card Container with 3D Tilt Effect on Hover */}
              <div className="w-full h-full relative transform-style-3d transition-transform duration-500 group-hover:rotate-y-2 group-hover:rotate-x-2">
                
                {/* Image */}
                <div className="absolute inset-0 overflow-hidden rounded-lg border border-white/10">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 scale-100 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                  
                  {/* Click indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-purple-600/90 backdrop-blur-md flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-300 delay-100 shadow-xl">
                       <Maximize2 size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                {/* Info Overlay (Small preview) */}
                <div className="absolute -bottom-6 -right-6 bg-black border border-white/20 p-6 md:p-8 max-w-sm z-20 shadow-2xl transform transition-transform duration-500 group-hover:-translate-y-4 group-hover:-translate-x-4 pointer-events-none">
                  <span className="text-purple-500 font-mono text-xs mb-2 block">{idx + 1 < 10 ? `0${idx+1}` : idx+1} — {project.category}</span>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{project.description[language]}</p>
                </div>

              </div>
            </div>
          ))}
          
          {/* End Card */}
          <div className="w-[30vw] h-[60vh] flex items-center justify-center shrink-0 border-l border-white/10 ml-12">
             <div className="text-center">
               <h3 className="font-display text-4xl font-bold text-white/20">FIN</h3>
             </div>
          </div>
        </div>

        {/* Progress Bar Bottom */}
        <div className="absolute bottom-12 left-0 w-full h-1 bg-white/5">
           <div className="h-full bg-purple-500 origin-left scale-x-0 transition-transform duration-75" 
                style={{ transform: `scaleX(${0})` }} /* This would be connected to scroll in a real app */
           ></div>
        </div>

      </div>

      {/* ------------------------------------------- */}
      {/* PROJECT LIGHTBOX MODAL                      */}
      {/* ------------------------------------------- */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
           
           {/* Backdrop with Blur */}
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-2xl transition-opacity duration-300 animate-in fade-in"
             onClick={() => setSelectedProject(null)}
           />

           {/* Content Container */}
           <div className="relative z-[101] w-full max-w-7xl h-full max-h-[90vh] flex flex-col md:flex-row bg-black border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-purple-600 transition-colors cursor-hover border border-white/10"
              >
                <X size={24} />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-2/3 h-1/2 md:h-full bg-neutral-900 relative">
                 <img 
                   src={selectedProject.image} 
                   alt={selectedProject.title} 
                   className="w-full h-full object-contain md:object-cover"
                 />
                 <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 to-transparent md:hidden"></div>
              </div>

              {/* Details Side with Staggered Animation */}
              <div className="w-full md:w-1/3 h-1/2 md:h-full p-8 md:p-12 flex flex-col justify-between bg-zinc-950/50 backdrop-blur-xl">
                 <div>
                    <div className="flex items-center gap-3 mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                      <span className="px-3 py-1 text-xs font-mono font-bold text-black bg-purple-500 rounded-full uppercase">
                        {selectedProject.category}
                      </span>
                      <span className="text-gray-500 text-xs font-mono">
                        PROJECT ID: {selectedProject.id < 10 ? `0${selectedProject.id}` : selectedProject.id}
                      </span>
                    </div>

                    <h3 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-none opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                      {selectedProject.title}
                    </h3>
                    
                    <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 border-l-2 border-purple-500 pl-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                      {selectedProject.description[language]}
                    </p>

                    <div className="space-y-4 opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tools Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tools.map((tool) => (
                          <span key={tool} className="px-3 py-2 border border-white/10 rounded text-xs text-gray-300 hover:border-purple-500 transition-colors">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/10 opacity-0 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                    <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 cursor-hover">
                      {content.viewProject} <ArrowUpRight size={18} />
                    </button>
                 </div>
              </div>

           </div>
        </div>
      )}

    </section>
  );
};

export default Work;