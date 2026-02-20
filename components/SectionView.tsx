import React, { useState, useEffect, useRef } from 'react';
import { CategoryGroup, Project, StudioSection } from '../types';
import ProjectCard from './ProjectCard';
import { ChevronRight, CheckCircle, Upload, Paperclip, X as CloseIcon, Loader2 } from 'lucide-react';
import { CATEGORIES, urbanMasterplanningHeaderDescription, projectSupportHeaderDescription, isoContent } from '../constants';
import { sendProjectEnquiry } from '../services/emailService';

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
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    files: [] as File[]
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Convert files to base64 for submission
    const processedFiles = await Promise.all(
      formData.files.map(async (file) => ({
        name: file.name,
        type: file.type,
        data: await fileToBase64(file)
      }))
    );

    const success = await sendProjectEnquiry({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      files: processedFiles
    });

    if (success) {
      setEnquiryStep(4);
      setTimeout(() => {
        setFormData({ name: '', email: '', message: '', files: [] });
      }, 2000);
    }
    setIsSending(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) });
    }
  };

  const removeFile = (index: number) => {
      setFormData({
          ...formData,
          files: formData.files.filter((_, i) => i !== index)
      });
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
      className={`fixed inset-0 w-full transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'} bg-transparent`}
    >
      {isEnquiry && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://res.cloudinary.com/dwealmbfi/image/upload/v1769967857/make_the_background_2_xwqmiu.png" 
            alt="Enquiry Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
      )}
      
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
        <div className="flex items-center gap-16 md:gap-24 lg:gap-40 transition-all shrink-0" style={{ transitionTimingFunction: 'cubic-bezier(0.77, 0, 0.175, 1)', transitionDuration: '1000ms', transform: stage === 'gallery' ? `scale(${window.innerWidth >= 768 ? 0.5 : 0.4})` : 'scale(1)', transformOrigin: 'left' }}>
          <div className="flex items-center gap-3 shrink-0">
            <h2 className={`text-9xl font-light tracking-tighter text-black transition-all ${showDB ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`} style={{ fontSize: window.innerWidth >= 768 ? '12rem' : '9rem', transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)', transitionDuration: '1000ms' }}>DB</h2>
            <span className={`text-6xl md:text-8xl font-thin transition-all ${showPlus ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-45'} text-gray-400`} style={{ transitionDuration: '700ms' }}>+</span>
          </div>
          <div className="transition-all ease-out overflow-hidden flex-1" style={{ transitionDuration: '700ms', transform: showName ? 'translateX(0)' : 'translateX(-48px)', opacity: showName ? 1 : 0 }}>
            {isUrbanSection ? (
              <div className="flex flex-col items-start justify-center">
                <span className="text-4xl md:text-6xl tracking-[0.15em] font-light text-black leading-none block">Masterplanning +</span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">Urban</span>
              </div>
            ) : isDesignSection ? (
              <div className="flex flex-col items-start justify-center">
                <span className="text-4xl md:text-6xl tracking-[0.15em] font-light text-black leading-none block">Design</span>
                <span className="text-3xl md:text-5xl tracking-[0.15em] font-light text-gray-400 mt-4 leading-none block">& Management</span>
              </div>
            ) : (
              <span className="text-4xl md:text-6xl tracking-[0.15em] font-light text-black block leading-none">{isHomeSection ? '' : displayedCategory.name}</span>
            )}
          </div>
        </div>

        {displayedCategory.description && !isHomeSection && !isDesignSection && !isEnquiry && !isProjectSupportSection && !isStructureSection && !isBehindDBSection && (
          <div className={`transition-all ease-out overflow-hidden flex-1 ${stage === 'gallery' ? 'ml-6 md:ml-10 border-l border-black/20 pl-6 md:pl-10 max-w-3xl ' : 'pointer-events-none w-0 h-0'}`} style={{ transitionDuration: '1000ms', opacity: (stage === 'gallery' && showDesc) ? 1 : 0, transform: (stage === 'gallery' && showDesc) ? 'translateX(0)' : 'translateX(-40px)' }}>
            {isArchitectureSection ? (
              <span className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">Portfolio of selected projects</span>
            ) : isUrbanSection ? (
              <span className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line">{urbanMasterplanningHeaderDescription}</span>
            ) : (
              <div className="font-light text-gray-400 leading-tight tracking-tight italic text-sm md:text-base lg:text-lg whitespace-pre-line" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
            )}
          </div>
        )}
      </div>

      <div className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${stage === 'gallery' ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ paddingTop: '340px' }}>
        <div className="max-w-7xl mx-auto">
          {isEnquiry ? (
            <div className={`max-w-5xl mx-auto transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'} relative z-10`}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                <div className="lg:col-span-5 flex flex-col gap-12">
                  <div className="text-white p-12 space-y-8 rounded-2xl shadow-2xl bg-black border border-white/10 backdrop-blur-md">
                    <h3 className="text-4xl font-light tracking-tight mb-4 leading-tight">Contact Information</h3>
                    <div className="space-y-6">
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2">Office</p>
                            <p className="text-lg font-light leading-tight">108 Kestrel Road, Corby,<br/>Northamptonshire, England</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2">Telephone</p>
                            <p className="text-lg font-light leading-tight">+44 07955018937</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2">Email</p>
                            <p className="text-lg font-light leading-tight"><a href="mailto:db@dbsdesigner.com" className="hover:underline text-red-500 transition-all">db@dbsdesigner.com</a></p>
                        </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-7">
                    <form onSubmit={handleEnquirySubmit} className="space-y-8 p-12 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
                    {enquiryStep < 4 ? (
                        <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label htmlFor="name" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Full Name</label>
                                <input type="text" id="name" className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-red-600 transition-colors text-sm font-light text-white placeholder-white/20" placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required disabled={isSending} />
                            </div>
                            <div className="space-y-3">
                                <label htmlFor="email" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Email Address</label>
                                <input type="email" id="email" className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-red-600 transition-colors text-sm font-light text-white placeholder-white/20" placeholder="john@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required disabled={isSending} />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <label htmlFor="message" className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Project Brief</label>
                            <textarea id="message" className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-red-600 transition-colors min-h-[140px] text-sm font-light resize-none text-white placeholder-white/20 leading-tight" placeholder="Tell us about your architectural vision..." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required disabled={isSending} />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">Attachments</label>
                            <div 
                                onClick={() => !isSending && fileInputRef.current?.click()}
                                className={`group cursor-pointer border-2 border-dashed border-white/10 rounded-xl p-8 text-center transition-all bg-white/5 ${isSending ? 'opacity-50 cursor-not-allowed' : 'hover:border-red-600/50'}`}
                            >
                                <input 
                                    type="file" 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                    multiple 
                                    onChange={handleFileChange}
                                    disabled={isSending}
                                />
                                <div className="flex flex-col items-center gap-3">
                                    <Upload className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
                                    <p className="text-xs font-light text-white/60">Click to attach blueprints, photos, or project requirements</p>
                                    {formData.files.length > 0 && (
                                        <p className="text-xs font-bold text-red-500 mt-2">{formData.files.length} file(s) selected</p>
                                    )}
                                </div>
                            </div>
                            
                            {formData.files.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {formData.files.map((file, idx) => (
                                        <div key={idx} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                                            <Paperclip className="w-3 h-3 text-red-500" />
                                            <span className="text-[10px] text-white/80 max-w-[120px] truncate">{file.name}</span>
                                            <button type="button" onClick={() => !isSending && removeFile(idx)} className="hover:text-red-500 text-white/40 transition-colors">
                                                <CloseIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button 
                          type="submit" 
                          disabled={isSending}
                          className="flex items-center gap-6 group mt-8 text-black bg-white px-12 py-5 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="text-xs font-bold tracking-[0.4em] uppercase">
                              {isSending ? 'Transmitting...' : 'Submit to db+'}
                            </span>
                            {isSending ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                            )}
                        </button>
                        </>
                    ) : (
                        <div className="py-24 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
                            <div className="p-6 bg-white rounded-full">
                                <CheckCircle className="w-16 h-16 text-red-600" />
                            </div>
                            <div>
                                <h4 className="text-3xl font-light mb-4 text-white leading-tight">Vision Received</h4>
                                <p className="text-base text-white/60 font-light leading-tight max-w-md">Your project details and documents have been submitted to <span className="text-red-500">db@dbsdesigner.com</span>. We will review your vision and contact you shortly.</p>
                            </div>
                        </div>
                    )}
                    </form>
                </div>
              </div>
            </div>
          ) : isBehindDBSection ? (
            <div className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                <div className="md:col-span-1 p-8 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-xl">
                  <div className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                </div>
                <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/20">
                  <img src={displayedCategory.imageUrl} alt={displayedCategory.name} className="w-full h-auto object-cover" style={{ aspectRatio: window.innerWidth < 768 ? '1/1' : 'unset' }} loading="lazy" />
                </div>
              </div>
            </div>
          ) : (
            <div className={`transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              {(isUrbanSection || isStructureSection || isDesignSection || isProjectSupportSection || isArchitectureSection) && ( 
                <div className={`flex flex-col gap-12 ${isDesignSection ? 'mb-8' : 'mb-24'}`}>
                  <div className="w-full max-w-5xl p-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                    <div className={`text-black font-normal text-lg md:text-xl leading-tight`} dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                {displayedCategory.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} onClick={onProjectClick} currentSectionName={currentSectionName} />
                ))}
              </div>
              
              {isDesignSection && (
                <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="p-10 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                    <div className="text-black leading-tight" dangerouslySetInnerHTML={{ __html: isoContent }} />
                  </div>
                  <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-white">
                    <img 
                      src="https://res.cloudinary.com/dwealmbfi/image/upload/v1771155566/Gemini_Generated_Image_867rii867rii867r_czfvu7.png" 
                      alt="Design & Management Vision" 
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {isUrbanSection && (
                <div className="mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/20 bg-white">
                    <img 
                      src="https://res.cloudinary.com/dwealmbfi/image/upload/v1770138676/dibujo_limpio_profesional_1_i078jd.png" 
                      alt="Urban Masterplanning Drawing" 
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionView;