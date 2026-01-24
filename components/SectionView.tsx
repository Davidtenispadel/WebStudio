
import React, { useState, useEffect, useRef } from 'react';
import { CategoryGroup, Project, StudioSection } from '../types';
import ProjectCard from './ProjectCard';
import { Mail, User, FileText, ChevronRight, CheckCircle, Send as SendIcon, MessageSquare } from 'lucide-react';
import { CORE_SERVICE_CATEGORIES } from '../constants'; // Import CORE_SERVICE_CATEGORIES

interface SectionViewProps {
  category: CategoryGroup;
  onProjectClick: (project: Project) => void;
  isActive: boolean;
  currentSectionName: string; // Nueva prop para el nombre de la sección actual
}

// Helper function to capitalize title words, excluding articles/conjunctions
// Moved here for reusability in Design section rendering
const capitalizeTitle = (title: string): string => {
  const words = title.toLowerCase().split(' ');
  const articlesAndConjunctions = ['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'y'];

  return words.map((word, index) => {
    if (index > 0 && articlesAndConjunctions.includes(word)) {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
};

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

  // Enquiry Form State
  const [enquiryStep, setEnquiryStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
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
    const t3 = setTimeout(() => setStage('gallery'), 1800);
    const t4 = setTimeout(() => setShowDesc(true), 3000);
    const t5 = setTimeout(() => setShowGalleryItems(true), 3600);
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
        
        return () => clearTimeout(tIn);
      }, 500);

      return () => clearTimeout(tOut);
    }
  }, [category]);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enquiryStep < 3) {
      setEnquiryStep(enquiryStep + 1);
    } else {
      setEnquiryStep(4);
    }
  };

  if (!isActive) return null;

  const isEnquiry = displayedCategory.name === StudioSection.ENQUIRY;
  const isHomeSection = displayedCategory.name === StudioSection.HOME;
  const isAboutUsSection = displayedCategory.name === StudioSection.ABOUT_US;
  // const isDesignSection = displayedCategory.name === StudioSection.DESIGN; // Ya no es necesario un manejo especial para la sección Design aquí

  return (
    <div className={`fixed inset-0 w-full bg-white transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Cinematic Brand Header Unit - DB in black, + in grey */}
      <div 
        className={`fixed z-30 flex items-center transition-all duration-[1800ms] cubic-bezier(0.77, 0, 0.175, 1) ${
          stage === 'intro' 
            ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl px-10 justify-center' 
            : 'top-24 left-10 translate-x-0 translate-y-0 w-[calc(100%-80px)] pointer-events-none justify-start'
        }`}
      >
        <div className={`flex items-center gap-6 transition-all duration-[1800ms] cubic-bezier(0.77, 0, 0.175, 1) shrink-0 ${
          stage === 'gallery' ? 'scale-[0.4] md:scale-[0.5] origin-left' : 'scale-100'
        }`}>
          <div className="flex items-center gap-3">
            <h2 className={`text-9xl md:text-[12rem] font-light tracking-tighter text-black transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${
              showDB ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
            }`}>
              DB
            </h2>
            <span className={`text-6xl md:text-8xl font-thin text-gray-300 transition-all duration-700 ${
              showPlus ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-45'
            }`}>
              +
            </span>
          </div>

          <div className={`transition-all duration-700 ease-out overflow-hidden flex-1 ${
            showName ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <span 
              className="text-4xl md:text-6xl tracking-[0.15em] font-light whitespace-nowrap text-black"
            >
              {isHomeSection ? '' : displayedCategory.name} {/* Hide category name for Home */}
            </span>
          </div>
        </div>

        <div className={`transition-all duration-1000 ease-out overflow-hidden flex-1 ${
          stage === 'gallery' 
            ? `ml-6 md:ml-10 border-l border-black/20 pl-6 md:pl-10 max-w-3xl ${showDesc ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}` 
            : 'opacity-0 pointer-events-none w-0 h-0'
        }`}>
          <p className="text-sm md:text-base lg:text-lg font-light text-gray-400 leading-relaxed tracking-tight italic">
            {displayedCategory.description}
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div 
        className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-1000 ${
          stage === 'gallery' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ paddingTop: '340px' }}
      >
        <div className="max-w-7xl mx-auto">
          {isHomeSection ? (
            /* HOME PAGE CONTENT */
            <div className={`flex flex-col animate-fade-in transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              {displayedCategory.imageUrl && (
                <img 
                  src={displayedCategory.imageUrl} 
                  alt="DB+ Studio Overview"
                  className="w-full object-cover object-center aspect-[16/9] mb-16 shadow-lg border border-black/5"
                  loading="lazy"
                />
              )}
              <div className="md:w-3/4 lg:w-2/3 mx-auto text-center py-12 px-4 md:px-0">
                <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">
                  {displayedCategory.description}
                </p>
              </div>
            </div>
          ) : isAboutUsSection ? (
            /* ABOUT US PAGE CONTENT */
            <div className={`flex flex-col animate-fade-in transition-opacity duration-1000 ${showGalleryItems ? 'opacity-100' : 'opacity-0'}`}>
              {displayedCategory.imageUrl && (
                <img 
                  src={displayedCategory.imageUrl} 
                  alt="About DB+ Studio"
                  className="w-full object-cover object-center aspect-[16/9] mb-16 shadow-lg border border-black/5"
                  loading="lazy"
                />
              )}
              <div className="md:w-3/4 lg:w-2/3 mx-auto text-center py-12 px-4 md:px-0">
                <p className="text-lg md:text-xl font-light text-gray-700 leading-relaxed">
                  {displayedCategory.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
                {CORE_SERVICE_CATEGORIES.map((serviceCat) => (
                  <div key={serviceCat.id} className="p-6 bg-gray-50 border border-black/5 flex flex-col items-start text-left">
                    <h3 className="text-2xl font-bold tracking-tight text-black mb-4">{serviceCat.name}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{serviceCat.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : !isEnquiry ? (
            /* PROJECT GALLERY (para todas las categorías, incluyendo Design) */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-32">
              {displayedCategory.projects.map((project, idx) => (
                <div 
                  key={project.id} 
                  className={`transition-all duration-1000 ease-out ${
                    showGalleryItems 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-24'
                  } ${idx % 3 === 1 ? 'md:mt-48' : ''}`}
                  style={{ 
                    transitionDelay: `${idx * 150}ms` 
                  }}
                >
                  <ProjectCard 
                    project={project} 
                    onClick={onProjectClick} 
                    currentSectionName={currentSectionName} // Pasa el nombre de la sección
                  />
                </div>
              ))}
            </div>
          ) : (
            /* ENQUIRY PAGE CONTENT */
            <div className={`flex flex-col md:flex-row bg-white border border-black/5 shadow-2xl overflow-hidden min-h-[600px] transition-all duration-1000 ${showGalleryItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'}`}>
              {/* Left Cinematic Panel - Connection text in grey */}
              <div className="hidden md:block w-3/5 relative overflow-hidden bg-white border-r border-black/5">
                <img 
                  src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200" 
                  alt="Architecture and Motion Connection"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.8] brightness-105"
                />
                <div className="absolute inset-0 bg-white/5"></div>
                
                <div className="absolute bottom-12 left-12 right-12 transition-all duration-1000">
                  <span className="text-5xl md:text-6xl tracking-[0.15em] font-light block text-gray-400">
                    Connection
                  </span>
                </div>
              </div>

              {/* Right Form Panel */}
              <div className="w-full md:w-2/5 p-12 flex flex-col bg-white">
                <div className="mb-8">
                  <div className="flex-1 h-[1px] bg-gray-100 relative mb-6">
                    <div className="absolute left-0 top-0 h-full bg-black transition-all duration-700" style={{ width: `${(enquiryStep / 3) * 100}%` }}></div>
                  </div>
                  <p className="text-[11px] text-gray-500 font-medium tracking-wide leading-relaxed">
                    Ofrecemos evaluaciones y cotizaciones de proyectos adaptadas al alcance y la especificidad de sus requisitos. Para solicitudes muy detalladas o técnicamente complejas, recomendamos programar una cita para asegurar que todos los aspectos estén claramente definidos antes de proceder con la evaluación y el precio.
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium tracking-wide leading-relaxed mt-4">
                    Por favor, envíe cualquier detalle relevante, dibujos o referencias visuales que nos ayuden a comprender sus necesidades a: <span className="font-bold text-black">projectinfo@dbsdesigner.com</span>
                  </p>
                </div>

                <form onSubmit={handleEnquirySubmit} className="flex-1 flex flex-col justify-center">
                  {enquiryStep === 1 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed mb-4">Identificación y Mensaje</p>
                      <div className="relative group">
                        <User className="absolute left-0 top-3 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                        <input required type="text" placeholder="NOMBRE COMPLETO" className="w-full pl-8 py-3 bg-transparent border-b border-gray-200 focus:border-black outline-none text-[10px] font-bold tracking-widest uppercase transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="relative group">
                        <Mail className="absolute left-0 top-3 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                        <input required type="email" placeholder="DIRECCIÓN DE CORREO ELECTRÓNICO" className="w-full pl-8 py-3 bg-transparent border-b border-gray-200 focus:border-black outline-none text-[10px] font-bold tracking-widest uppercase transition-all" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                      </div>
                      
                      {/* Message field without requirements text */}
                      <div className="relative group pt-4">
                        <MessageSquare className="absolute left-0 top-3 w-4 h-4 text-gray-300 group-focus-within:text-black transition-colors" />
                        <textarea 
                          required 
                          placeholder="MENSAJE" 
                          maxLength={10000}
                          rows={8} 
                          className="w-full pl-8 py-3 bg-transparent border-b border-gray-200 focus:border-black outline-none text-[10px] font-bold tracking-widest uppercase transition-all resize-none custom-scroll" 
                          value={formData.message} 
                          onChange={e => setFormData({...formData, message: e.target.value})} 
                        />
                      </div>
                    </div>
                  )}

                  {enquiryStep === 2 && (
                    <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed mb-4">Alcance del Proyecto</p>
                      <select required className="w-full py-3 bg-transparent border-b border-gray-200 focus:border-black outline-none text-[10px] font-bold tracking-widest uppercase transition-all mb-4" value={formData.projectType} onChange={e => setFormData({...formData, projectType: e.target.value})}>
                        <option value="" disabled>CATEGORÍA DEL PROYECTO</option>
                        <option value="arch">Arquitectura</option>
                        <option value="design">Diseño</option>
                        <option value="urban">Urbanismo</option>
                        <option value="struct">Estructura</option>
                      </select>
                      <p className="text-[10px] text-gray-400 italic">Seleccione la categoría que mejor se adapte a su consulta para ayudarnos a dirigirla al especialista adecuado.</p>
                    </div>
                  )}

                  {enquiryStep === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest leading-relaxed">Canal de Revisión</p>
                      <div className="bg-gray-50 p-6 space-y-3">
                        <div className="flex justify-between text-[9px] font-bold tracking-widest text-gray-400 uppercase"><span>Identificar</span><span className="text-black">{formData.name}</span></div>
                        <div className="flex justify-between text-[9px] font-bold tracking-widest text-gray-400 uppercase"><span>Email</span><span className="text-black">{formData.email}</span></div>
                        <div className="flex flex-col text-[9px] font-bold tracking-widest text-gray-400 uppercase border-t border-gray-100 pt-2">
                          <span>Vista Previa del Mensaje</span>
                          <span className="text-black mt-1 line-clamp-3 italic">{formData.message}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 border border-black/5">
                        <Mail className="w-4 h-4 text-black" />
                        <div>
                          <span className="block text-[7px] font-black text-gray-300 tracking-[0.4em] uppercase">Oficina de Correo Electrónico</span>
                          <a href="mailto:projectinfo@dbsdesigner.com" className="text-[10px] font-bold hover:underline">projectinfo@dbsdesigner.com</a>
                        </div>
                      </div>
                    </div>
                  )}

                  {enquiryStep === 4 && (
                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                      <CheckCircle className="w-12 h-12 text-black mb-6" />
                      <h4 className="text-xl font-black uppercase tracking-tighter mb-2">Enviado</h4>
                      <p className="text-gray-400 text-[9px] tracking-widest uppercase">Su consulta ha sido enviada.</p>
                    </div>
                  )}

                  {enquiryStep < 4 && (
                    <div className="mt-12 flex justify-between items-center">
                      {enquiryStep > 1 && (
                        <button type="button" onClick={() => setEnquiryStep(enquiryStep - 1)} className="text-[9px] font-black tracking-widest text-gray-300 hover:text-black transition-colors uppercase">Atrás</button>
                      )}
                      <button type="submit" className="ml-auto bg-black text-white px-8 py-4 text-[10px] font-bold tracking-[0.3em] uppercase hover:bg-neutral-800 transition-all flex items-center gap-4 rounded-sm">
                        {enquiryStep === 3 ? 'Finalizar' : 'Siguiente'}
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`fixed inset-0 bg-neutral-50/10 -z-10 transition-opacity duration-1000 ${stage === 'gallery' ? 'opacity-100' : 'opacity-0'}`}></div>
    </div>
  );
};

export default SectionView;