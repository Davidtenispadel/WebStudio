
import React, { useState, useEffect } from 'react';
import { StudioSection } from '../types';
import { X, Menu } from 'lucide-react';
import { CATEGORIES } from '../constants'; // Import CATEGORIES to get section names

interface HeaderProps {
  onNavClick: (section: string) => void;
  onGoHomeClick: () => void; // Prop for going to Home
}

const Header: React.FC<HeaderProps> = ({ onNavClick, onGoHomeClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Tailwind's 'md' breakpoint is 768px

  useEffect(() => {
    const handleResize = () => {
      const currentIsMobile = window.innerWidth < 768;
      setIsMobile(currentIsMobile);
      if (!currentIsMobile && isMenuOpen) { // Close menu if resized to desktop
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleMenuItemClick = (section: string) => {
    onNavClick(section);
    setIsMenuOpen(false); // Close menu after selection
  };

  const handleDbPlusLogoClick = () => {
    if (isMobile) {
      onNavClick(StudioSection.ABOUT_US); // Navigate to About Us on mobile DB+ click
      setIsMenuOpen(false); // Ensure menu is closed if it was open
    } else {
      onGoHomeClick(); // Go to Home section on desktop DB+ click
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-black/[0.03]">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div 
            className="flex items-center gap-1 cursor-pointer group"
            onClick={handleDbPlusLogoClick} // Dynamic click handler for DB+ logo
            aria-label={isMobile ? "Go to About Us page" : "Go to home page"}
          >
            <span className="text-3xl font-light tracking-tighter transition-all group-hover:tracking-normal">DB</span>
            <span className="text-2xl font-thin text-gray-300 transition-transform group-hover:scale-125">+</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10 text-[12px] tracking-[0.15em] font-light text-gray-400">
            {Object.values(StudioSection).map((section) => (
              // Exclude 'Home' from desktop nav as it's handled by DB+ logo
              section !== StudioSection.HOME && (
                <button 
                  key={section}
                  onClick={() => onNavClick(section)}
                  className="hover:text-black transition-all hover:scale-105 active:text-black"
                  aria-label={`View ${section} projects`}
                >
                  {section}
                </button>
              )
            ))}
          </nav>

          <button 
            className="md:hidden flex flex-col gap-1.5 p-2" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu on mobile button click (hamburguer icon)
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </header>

      {/* Mobile/Side Menu (hidden on desktop) */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-[70] transform transition-transform duration-500 ease-in-out md:hidden
          ${isMenuOpen && isMobile ? 'translate-x-0' : 'translate-x-[-100%]'}
        `}
      >
        <div className="flex items-center justify-between p-10 border-b border-black/5">
          <div 
            className="flex items-center gap-1 group" // No click handler on the menu header DB+
          >
            <span className="text-4xl font-light tracking-tighter">DB</span>
            <span className="text-3xl font-thin text-gray-300">+</span>
          </div>
          <button onClick={() => setIsMenuOpen(false)} className="text-black p-2 hover:bg-gray-100 rounded-full transition-colors" aria-label="Close menu">
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex flex-col p-10 pt-6 gap-4">
          {CATEGORIES.map((category) => ( // Use CATEGORIES to include Home and About Us
            <button 
              key={category.id}
              onClick={() => handleMenuItemClick(category.name)}
              className="block text-left text-xl font-normal tracking-[0.08em] py-3 px-2 rounded-lg hover:bg-gray-50 transition-colors text-black"
              aria-label={`View ${category.name} page`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay (hidden on desktop) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity duration-500 md:hidden
          ${isMenuOpen && isMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      ></div>
    </>
  );
};

export default Header;