import React, { useState, useEffect, useRef } from 'react';
import { CategoryGroup, Project, StudioSection } from '../types';
import ProjectCard from './ProjectCard';
import { ChevronRight, CheckCircle, Maximize2 } from 'lucide-react';
import { CATEGORIES, designFocusAreas, urbanMasterplanningHeaderDescription, projectSupportHeaderDescription } from '../constants';

interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string;
}

const SectionView: React.FC<SectionViewProps> = ({ category, onProjectClick, isActive, currentSectionName }) => {
  const [displayedCategory, setDisplayedCategory] = useState<CategoryGroup>(category);
  const [showDB, setShowDB] = useState(false);
  const [showPlus, setShowPlus] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showDesc, setShowDesc] = useState(false);
  const [showGalleryItems, setShowGalleryItems] = useState(false);
  const [stage, setStage] = useState<'intro' | 'gallery'>('intro');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const isFirstRender = useRef(true);

  const [enquiryStep, setEnquiryStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
    files: [] as File[]
  });

  const resetSequence = () => {
    setShowDB(false);
    setShowPlus(false);
    setShowName(false);
    setShowDesc(false);
    setShowGalleryItems(false);
    setStage('intro');
    setEnquiryStep(1);
  };

  const startSequence = () => {
    setShowDB(true);
    const t1 = setTimeout(() => setShowPlus(true), 400);
    const t2 = setTimeout(() => setShowName(true), 700);
    const t3 = setTimeout(() => setStage('gallery'), 1000); 
    const t4 = setTimeout(() => setShowDesc(true), 1300); 
    const t5 = setTimeout(() => setShowGalleryItems(true), 1600); 
    return [t1, t2, t3, t4, t5];
  };

  useEffect(() => {
    if (isActive && isFirstRender.current) {
      isFirstRender.current = false;
      const timers = startSequence();
      return () => timers.forEach(clearTimeout);
    }
  }, [isActive]);

  useEffect(() => {
    if (isFirstRender.current) return;
    if (category.id !== displayedCategory.id) {
      setIsTransitioning(true);
      const tOut = setTimeout(() => {
        resetSequence();
        setDisplayedCategory(category);
        setIsTransitioning(false);
        const tIn = setTimeout(() => {
          startSequence();
        }, 100);
      }, 500);
      return () => clearTimeout(tOut);
    }
  }, [category, displayedCategory.id]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enquiryStep < 3) {
      setEnquiryStep(enquiryStep + 1);
    } else {
      setEnquiryStep(4);
      setFormData({ name: '', email: '', phone: '', projectType: '', message: '', files: [] });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files).filter((file: File) => file.size <= 10 * 1024 * 1024);
      setFormData(prev => ({ ...prev, files: selectedFiles }));
    }
  };

  if (!isActive) return null;

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHomeSection = displayedCategory.name === StudioSection.HOME;
  const isUrbanSection = displayedCategory.name === StudioSection.URBANISM;
  const isDesignSection = displayedCategory.name === StudioSection.DESIGN;
  const isArchitectureSection = displayedCategory.name === StudioSection.ARCHITECTURE;
  const isProjectSupportSection = displayedCategory.name === StudioSection.PROJECT_SUPPORT;
  const isStructureSection = displayedCategory.name === StudioSection.STRUCTURE; 
  const isBehindDBSection = displayedCategory.name === StudioSection.BEHIND_DB;

  return (
    <div
      className={`fixed inset-0 w-full transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'} bg-white`}
    >
      {isEnquiry && <div className="absolute inset-0 bg-black/70 z-0"></div>}
      
      <div 
        className={`fixed z-30 flex items-center transition-all ${
          stage === 'intro' 
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-7xl px-10 justify-center' 
            : 'top-24 left-10 translate-x-0 translate-y-0 pointer-events-none justify-start'
        }`}
        style={{ 
          transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)',
          transitionDuration: '1000ms',
          width: stage === 'intro' ? '100%' : 'calc(100% - 80px)' 
        }}
      >
        <div className="flex items-center gap-6 transition-all shrink-0" style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)', transitionDuration: '1000ms', transform: stage === 'gallery' ? `scale(${window.innerWidth >= 768 ? 0.5 : 0.4})` : 'scale(1)', transformOrigin: 'left' }}>
          <div className="flex items-center gap-3">
            <h2 className={`text-9xl font-light tracking-tighter text-black transition-all ${showDB ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ fontSize: window.innerWidth >= 768 ? '12rem' : '9rem', transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)', transitionDuration: '1000ms' }}>DB</h2>
            <span className={`text-6xl md:text-8xl font-thin text-gray-300 transition-all ${showPlus ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-45'}`} style={{ transitionDuration: '700ms' }}>+</span>
          </div>
          <div className="transition-all ease-out overflow-hidden flex-1" style={{ transitionDuration: '700ms', transform: showName ? 'translateX(0)' : 'translateX(-48px)', opacity: showName ? 1 : 0 }}>
            <span className="text-4xl md:text-6xl tracking-[0.15em] font-light whitespace-nowrap text-black">{isHomeSection ? '' : displayedCategory.name}</span>
          </div>
        </div>

        {displayedCategory.description && !isHomeSection && !isDesignSection && !isEnquiry && !isProjectSupportSection && !isStructureSection && !isBehindDBSection && (
          <div className={`transition-all ease-out overflow-hidden flex-1 ${stage === 'gallery' ? 'ml-6 md:ml-10 border-l border-black/20 pl-6 md:pl-10 max-w-3xl ' : 'pointer-events-none w-0 h-0'}`} style={{ transitionDuration: '1000ms', opacity: (stage === 'gallery' && showDesc) ? 1 : 0, transform: (stage === 'gallery' && showDesc) ? 'translateX(0)' : 'translateX(-40px)' }}>
            {isArchitectureSection ? (
              <span className="font-light text-gray-400 leading-relaxed tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">Portfolio of selected projects</span>
            ) : isUrbanSection ? (
              <span className="font-light text-gray-400 leading-relaxed tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">{urbanMasterplanningHeaderDescription}</span>
            ) : (
              <div className="font-light text-gray-400 leading-relaxed tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
            )}
          </div>
        )}
      </div>

      <div className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${stage === 'gallery' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ paddingTop: '340px' }}>
        <div className="max-w-7xl mx-auto">
          {isHomeSection ? (
            <div className={`flex flex-col animate-fade-in transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              <div className="max-w-4xl mb-24">
                 <p className="text-xl md:text-2xl font-light text-black leading-relaxed">{CATEGORIES[0].description}</p>
              </div>

              <div className="w-full mb-16 overflow-hidden relative group rounded-xl shadow-2xl">
                <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769971319/scketch_5_vaanb9.jpg" alt="DB+ Architecture Insight" className="w-full object-cover transition-transform duration-[2000ms] group-hover:scale-[1.02]" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24 px-4 md:px-0">
                <div className="lg:col-span-8">
                  <div className="font-light text-black leading-relaxed whitespace-pre-line text-lg md:text-xl" dangerouslySetInnerHTML={{ __html: CATEGORIES[1].description }} />
                </div>
                <div className="lg:col-span-4 flex justify-center lg:justify-end">
                  <h1 className="text-6xl md:text-8xl lg:text-9xl font-thin tracking-tighter text-black/5 uppercase select-none pointer-events-none">ARCHITECTURE</h1>
                </div>
              </div>

              <div className="w-full mb-16 overflow-hidden relative group rounded-xl shadow-2xl">
                <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-md px-3 py-1 border border-black/10 flex items-center gap-2 rounded-full">
                   <Maximize2 className="w-3 h-3 text-black" />
                   <span className="text-[9px] font-bold tracking-widest text-black">ORTHOGRAPHIC PROJECTION</span>
                </div>
                <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769246957/Edit_the_previous_im_f8flks.png" alt="DB+ Studio Overview" className="w-full object-cover shadow-2xl transition-transform duration-[2000ms] group-hover:scale-[1.01]" style={{ aspectRatio: '16 / 9' }} loading="lazy" />
              </div>
            </div>
          ) : isEnquiry ? (
            <div className={`max-w-4xl mx-auto transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'} relative z-10`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                <div className="flex flex-col gap-20">
                  <div className="text-white p-10 space-y-6 rounded-2xl shadow-2xl bg-black border border-white/10">
                    <h3 className="text-4xl font-light tracking-tight mb-4">Office</h3>
                    <p className="text-base font-light leading-relaxed">108 Kestrel Road, Corby,<br/>Northamptonshire England</p>
                    <p className="text-base font-light">Telephone: +44 07955018937</p>
                    <p className="text-base font-light"><a href="mailto:DB+@dbsdesigner.com" className="hover:underline text-white">DB+@dbsdesigner.com</a></p>
                  </div>
                </div>
                <form onSubmit={handleEnquirySubmit} className="space-y-8 p-10 bg-black rounded-2xl border border-white/10">
                  {enquiryStep < 4 ? (
                    <>
                      <div className="space-y-4"><label htmlFor="name" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Name</label><input type="text" id="name" className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-white transition-colors text-sm font-light text-white placeholder-gray-500" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required /></div>
                      <div className="space-y-4"><label htmlFor="email" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Email</label><input type="email" id="email" className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-white transition-colors text-sm font-light text-white placeholder-gray-500" placeholder="Your Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required /></div>
                      <div className="space-y-4"><label htmlFor="message" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Message</label><textarea id="message" className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-white transition-colors min-h-[120px] text-sm font-light resize-none text-white placeholder-gray-500" placeholder="Project Details..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required /></div>
                      <button type="submit" className="flex items-center gap-6 group mt-12 text-white bg-black px-10 py-5 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all shadow-xl"><span className="text-xs font-bold tracking-[0.4em] uppercase">Send Vision</span><ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" /></button>
                    </>
                  ) : (
                    <div className="py-20 flex flex-col items-center text-center space-y-6 animate-in fade-in zoom-in duration-700"><CheckCircle className="w-16 h-16 text-white" /><div><h4 className="text-2xl font-light mb-2 text-white">Message Received.</h4><p className="text-sm text-gray-200 font-light">We will be in touch shortly to discuss your vision.</p></div></div>
                  )}
                </form>
              </div>
            </div>
          ) : isBehindDBSection ? (
            <div className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                <div className="md:col-span-1">
                  <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-justify">{displayedCategory.description}</p>
                </div>
                <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-black/5">
                  <img src={displayedCategory.imageUrl} alt={displayedCategory.name} className="w-full h-auto object-cover" style={{ aspectRatio: window.innerWidth < 768 ? '1/1' : 'unset' }} loading="lazy" />
                </div>
              </div>
            </div>
          ) : (
            <div className={`transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              {(isUrbanSection || isStructureSection || isDesignSection || isProjectSupportSection) && ( 
                <div className={`flex flex-col gap-12 ${isDesignSection ? 'mb-8' : 'mb-24'}`}>
                  <div className="w-full max-w-5xl">
                    <div className={`whitespace-pre-line text-black font-normal text-lg md:text-xl leading-relaxed`} dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={onProjectClick} currentSectionName={currentSectionName} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;