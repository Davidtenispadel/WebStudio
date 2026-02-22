
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProjectModal from './components/ProjectModal';
import SectionView from './components/SectionView';
import VideoBackground from './components/VideoBackground';
import { CATEGORIES } from './constants';
import { Project, CategoryGroup, StudioSection } from './types';
import { MessageSquare, Send } from 'lucide-react';
import { askStudioAssistant } from './services/geminiService';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<CategoryGroup>(CATEGORIES[0]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [videoUrl, setVideoUrl] = useState<string | null>("https://res.cloudinary.com/dwealmbfi/video/upload/v1771095957/Gen-3_Alpha_Turbo_1476360428_usando_el_sketch_de_Cropped_-_scketch_1_M_5_jjwom8.mp4");

  const isHome = activeCategory.name === StudioSection.HOME;

  useEffect(() => {
    setActiveCategory(CATEGORIES[currentCategoryIndex]);
  }, [currentCategoryIndex]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button') || target.closest('a') || target.closest('input') || target.closest('textarea') || target.closest('select') || target.closest('.cursor-pointer');
      if (isInteractive) {
        cursor.classList.add('active');
      } else {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  const handleNavClick = useCallback((sectionName: string) => {
    const index = CATEGORIES.findIndex(cat => cat.name === sectionName);
    if (index !== -1) {
      setCurrentCategoryIndex(index);
    }
  }, []);

  const handleGoHome = useCallback(() => {
    setCurrentCategoryIndex(0);
  }, []);

  const handleProjectCardClick = useCallback((project: Project) => {
    if (activeCategory.name !== StudioSection.STRUCTURE) {
      setSelectedProject(project);
    }
  }, [activeCategory.name]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatMessage('');
    setIsTyping(true);
    const response = await askStudioAssistant(userMsg);
    setChatHistory(prev => [...prev, { role: 'assistant', text: response || '' }]);
    setIsTyping(false);
  };

  return (
    <div className={`min-h-screen w-screen transition-colors duration-700 ${isHome ? 'bg-transparent' : 'bg-white'} text-black overflow-hidden relative z-0`}>
      {/* Hidden H1 for SEO Visibility in Corby UK 20-mile radius */}
      <h1 className="sr-only">DB+ Architecture Corby | Expert Design, BIM & Planning Services NN18 NN17</h1>
      
      {isHome && <VideoBackground videoUrl={videoUrl} onVideoLoaded={setVideoUrl} />}
      
      <div className="relative z-10">
        <Header onNavClick={handleNavClick} onGoHomeClick={handleGoHome} />

        <SectionView 
          category={activeCategory} 
          onProjectClick={handleProjectCardClick}
          isActive={true} 
          currentSectionName={activeCategory.name}
        />

        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />

        <div className="fixed bottom-8 right-8" style={{ zIndex: 60 }}>
          {!isChatOpen ? (
            <button 
              onClick={() => setIsChatOpen(true)}
              className="bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-6 h-6" />
            </button>
          ) : (
            <div className="bg-white/90 backdrop-blur-xl w-80 md:w-96 shadow-2xl rounded-2xl flex flex-col border border-white/20 overflow-hidden" style={{ height: '500px' }}>
              <div className="bg-black p-4 text-white flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest uppercase">DB+ Assistant</span>
                <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white">&times;</button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll bg-gray-50/50">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`p-3 rounded-xl text-xs font-medium leading-relaxed ${msg.role === 'user' ? 'bg-black text-white rounded-br-none' : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-none'}`} style={{ maxWidth: '80%' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 p-3 rounded-xl shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-100 bg-white">
                <div className="relative">
                  <input type="text" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} placeholder="Enquire about services..." className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-black" />
                  <button type="submit" className="absolute right-2 top-2 p-1 text-black">
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
