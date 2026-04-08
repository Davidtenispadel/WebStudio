import React, { useState, useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface HeaderProps {
  onNavClick: (section: string) => void;
  onGoHomeClick: () => void;
  isDarkBackground: boolean;
}

const Header: React.FC<HeaderProps> = ({
  onNavClick,
  onGoHomeClick,
  isDarkBackground,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const handleMenuItemClick = (section: string) => {
    onNavClick(section);
    setIsMenuOpen(false);
  };

  const handleDbPlusLogoClick = () => {
    onGoHomeClick();
    if (isMobile) setIsMenuOpen(false);
  };

  // Navigation colors (logo excluded on purpose)
  const navLinkColorClass = isDarkBackground
    ? 'text-white/70 hover:text-white'
    : 'text-gray-500 hover:text-red-600';

  return (
    <>
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/40 backdrop-blur-md border-b border-black/[0.05]">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">

          {/* LOGO — ALWAYS VISIBLE */}
          <div
            className="flex items-center gap-1 cursor-pointer group"
            onClick={handleDbPlusLogoClick}
            aria-label="Go to home page"
          >
            <span className="text-3xl font-light tracking-tighter text-black transition-all group-hover:tracking-normal">
              DB
            </span>
            <span className="text-2xl font-thin text-gray-400 transition-all duration-300 group-hover:scale-125 group-hover:text-red-600">
              +
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-10 text-[12px] tracking-[0.15em] font-light">
            {CATEGORIES.map(
              (category) =>
                category.name !== 'Home' && (
                  <button
                    key={category.id}
                    onClick={() => onNavClick(category.name)}
                    className={`${navLinkColorClass} transition-all hover:scale-105 active:scale-95`}
                    aria-label={`View ${category.name}`}
                  >
                    {category.name}
                  </button>
                )
            )}
          </nav>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </header>

      {/* MOBILE SIDE MENU */}
      <div
        className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-500 ease-in-out md:hidden"
        style={{
          zIndex: 70,
          transform: isMenuOpen && isMobile ? 'translateX(0)' : 'translateX(-100%)',
        }}
      >
        <div className="flex items-center justify-between p-10 border-b border-black/5">
          <div className="flex items-center gap-1">
            <span className="text-4xl font-light tracking-tighter text-black">
              DB
            </span>
            <span className="text-3xl font-thin text-gray-400">+</span>
          </div>
          <button
            onClick={() => setIsMenuOpen(false)}
            className="text-black p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MOBILE NAV */}
        <nav className="flex flex-col p-10 pt-6 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleMenuItemClick(category.name)}
              className="block text-left text-xl font-normal tracking-[0.08em] py-3 px-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors text-black"
              aria-label={`View ${category.name}`}
            >
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity duration-500 md:hidden
          ${isMenuOpen && isMobile ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ zIndex: 60 }}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden={!isMenuOpen}
      />
    </>
  );
};

export default Header;
``
