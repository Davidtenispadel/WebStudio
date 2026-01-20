
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProjectModal from './components/ProjectModal';
import SectionView from './components/SectionView';
import { CATEGORIES } from './constants';
import { Project, CategoryGroup, StudioSection } from './types'; // Import StudioSection
import { MessageSquare, Send } from 'lucide-react';
import { askStudioAssistant } from './services/geminiService';

const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0); // Start with 'Home'
  const [activeCategory, setActiveCategory] = useState<CategoryGroup>(CATEGORIES[0]); // Start with 'Home'
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setActiveCategory(CATEGORIES[currentCategoryIndex]);
  }, [currentCategoryIndex]);

  // Custom Cursor Logic - only for non-touch devices
  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    if (isTouchDevice) {
      // If it's a touch device, disable custom cursor logic
      const cursor = document.getElementById('custom-cursor');
      if (cursor) cursor.style.display = 'none'; // Ensure it's hidden if JS runs before CSS
      document.body.style.cursor = 'auto'; // Restore default cursor
      return; 
    }

    const cursor = document.getElementById('custom-cursor');
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      const target = e.target as HTMLElement;
      const isInteractive = 
        target.closest('button') || 
        target.closest('a') || 
        target.closest('input') || 
        target.closest('textarea') || 
        target.closest('select') || 
        target.closest('.cursor-pointer') ||
        target.hasAttribute('onClick') ||
        window.getComputedStyle(target).cursor === 'pointer';

      if (isInteractive) {
        cursor.classList.add('active');
      } else {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      // Clean up cursor styles if component unmounts or becomes a touch device
      if (!isTouchDevice) {
        document.body.style.cursor = 'auto';
        if (cursor) cursor.style.display = 'none';
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  const handleNavClick = useCallback((sectionName: string) => {
    const index = CATEGORIES.findIndex(cat => cat.name === sectionName);
    if (index !== -1) {
      setCurrentCategoryIndex(index);
    }
  }, []);

  // New function to go directly to the Home page
  const handleGoHome = useCallback(() => {
    setCurrentCategoryIndex(0); // 'Home' is always the first category
  }, []);

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
    <div className="min-h-screen w-screen bg-white text-black overflow-hidden">
      <Header onNavClick={handleNavClick} onGoHomeClick={handleGoHome} /> {/* Pass handleGoHome */}

      <SectionView 
        category={activeCategory} 
        isActive={true} 
        onProjectClick={setSelectedProject} 
        currentSectionName={activeCategory.name} // Pasa el nombre de la sección actual
      />

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />

      {/* AI Assistant Chat */}
      <div className="fixed bottom-8 right-8 z-[60]">
        {!isChatOpen ? (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all group flex items-center gap-2"
            aria-label="Open AI Assistant Chat"
          >
            <MessageSquare className="w-6 h-6" />
          </button>
        ) : (
          <div className="bg-white w-80 md:w-96 h-[500px] shadow-2xl rounded-2xl flex flex-col border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-black p-4 text-white flex justify-between items-center">
              <span className="text-xs font-bold tracking-widest uppercase">DB+ Assistant</span>
              <button onClick={() => setIsChatOpen(false)} className="text-gray-400 hover:text-white" aria-label="Close Chat">&times;</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll bg-gray-50/50">
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-xl text-xs font-medium leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-br-none' 
                      : 'bg-white border border-gray-100 text-gray-700 shadow-sm rounded-bl-none'
                  }`}>
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
                <input 
                  type="text" 
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Inquiry..."
                  className="w-full pl-4 pr-10 py-2 bg-gray-100 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-black transition-all"
                  aria-label="Chat input"
                />
                <button type="submit" className="absolute right-2 top-2 p-1 text-black" aria-label="Send message">
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;