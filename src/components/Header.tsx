import React, { useState, useEffect, useRef } from 'react';
import { X, Menu } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { StudioSection } from '../types';

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
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio('https://res.cloudinary.com/dwealmbfi/video/upload/v1777554320/dragon-studio-notification-click-sound-455421_onilfm.mp3');
      clickSoundRef.current.volume = 0.04;
      clickSoundRef.current.preload = 'auto';
    }
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      const soundClone = clickSoundRef.current.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.04;
      soundClone.play().catch(() => {});
    }
  };

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
    playClickSound();
    onNavClick(section);
    setIsMenuOpen(false);
    setActiveButton(null);
  };

  const handleMenuButtonClick = () => {
    playClickSound();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenuClick = () => {
    playClickSound();
    setIsMenuOpen(false);
  };

  const handleOverlayClick = () => {
    playClickSound();
    setIsMenuOpen(false);
  };

  const handleDbPlusLogoClick = () => {
    playClickSound();
    onGoHomeClick();
    if (isMobile) setIsMenuOpen(false);
  };

  const handleTouchStart = (section: string) => {
    setActiveButton(section);
  };

  const handleTouchEnd = (section: string) => {
    if (activeButton === section) {
      handleMenuItemClick(section);
    }
    setActiveButton(null);
  };

  const navLinkColorClass = isDarkBackground
    ? 'text-white/70 hover:text-white'
    : 'text-gray-500 hover:text-red-600';

  // Menú estrecho: 35% en vertical, 45% en horizontal
  const menuWidth = isLandscape ? '45%' : '35%';
  const menuMaxWidth = isLandscape ? '260px' : '220px';
  const minWidth = '180px';
  const buttonPadding = isLandscape ? 'py-1.5' : 'py-2';
  const buttonTextSize = isLandscape ? 'text-xs' : 'text-sm';
  const buttonGap = isLandscape ? 'gap-0.5' : 'gap-1';
  const logoSize = isLandscape ? 'text-base' : 'text-lg';
  const logoSymbolSize = isLandscape ? 'text-xs' : 'text-sm';
  const containerPadding = isLandscape ? 'p-2' : 'p-3';
  const navPadding = isLandscape ? 'p-2 pt-1' : 'p-3 pt-2';

  return (
    <>
      <header
        className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md border-b border-black/[0.05]"
        style={{ zIndex: 9999 }}
      >
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div
            className="flex items-center gap-1 cursor-pointer select-none active:scale-95 transition-transform duration-75"
            onClick={handleDbPlusLogoClick}
            aria-label="Go to home page"
          >
            <span className="text-3xl font-light tracking-tighter text-black">DB</span>
            <span className="text-2xl font-thin text-gray-400">+</span>
          </div>

          {/* DESKTOP NAV - Technology al principio */}
          <nav className="hidden md:flex items-center gap-10 text-[12px] tracking-[0.15em] font-light">
            {/* Technology primero */}
            <button
              onClick={() => {
                playClickSound();
                onNavClick(StudioSection.HOUSE_TECHNOLOGY);
              }}
              className={`${navLinkColorClass} transition-all hover:scale-105 active:scale-95`}
            >
              Technology
            </button>
            {/* El resto de categorías */}
            {CATEGORIES.map(
              (category) =>
                category.name !== 'Home' && category.name !== 'Technology' && (
                  <button
                    key={category.id}
                    onClick={() => {
                      playClickSound();
                      onNavClick(category.name);
                    }}
                    className={`${navLinkColorClass} transition-all hover:scale-105 active:scale-95`}
                  >
                    {category.name}
                  </button>
                )
            )}
          </nav>

          <button
            className="md:hidden p-2 active:scale-90 transition-transform duration-75"
            onClick={handleMenuButtonClick}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </header>

      {/* MOBILE SIDE MENU */}
      <div
        className="fixed top-0 left-0 bg-white shadow-xl transition-transform duration-500 ease-in-out md:hidden"
        style={{
          zIndex: 10000,
          transform: isMenuOpen && isMobile
            ? 'translateX(0)'
            : 'translateX(-100%)',
          top: 0,
          left: 0,
          right: 'auto',
          bottom: 0,
          width: menuWidth,
          maxWidth: menuMaxWidth,
          minWidth: minWidth,
          backgroundColor: 'white',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <div className={`flex items-center justify-between border-b border-black/5 ${containerPadding}`}>
          <div className="flex items-center gap-1">
            <span className={`${logoSize} font-light tracking-tighter text-black`}>DB</span>
            <span className={`${logoSymbolSize} font-thin text-gray-400`}>+</span>
          </div>
          <button
            onClick={handleCloseMenuClick}
            className="p-1 rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-75"
            aria-label="Close menu"
          >
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* MOBILE NAV - Technology al principio */}
        <nav className={`flex flex-col ${navPadding} ${buttonGap}`}>
          {/* Technology primero */}
          <button
            onClick={() => handleMenuItemClick(StudioSection.HOUSE_TECHNOLOGY)}
            onTouchStart={() => handleTouchStart(StudioSection.HOUSE_TECHNOLOGY)}
            onTouchEnd={() => handleTouchEnd(StudioSection.HOUSE_TECHNOLOGY)}
            className={`text-left ${buttonTextSize} font-bold tracking-[0.03em] ${buttonPadding} px-2 transition-all duration-75 rounded-md bg-white text-black ${
              activeButton === StudioSection.HOUSE_TECHNOLOGY ? 'scale-105 bg-white' : 'scale-100 bg-white'
            }`}
            style={{
              WebkitTapHighlightColor: 'rgba(0,0,0,0)',
              touchAction: 'pan-y',
              userSelect: 'none',
            }}
          >
            Technology
          </button>
          
          {/* El resto de categorías */}
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleMenuItemClick(category.name)}
              onTouchStart={() => handleTouchStart(category.name)}
              onTouchEnd={() => handleTouchEnd(category.name)}
              className={`text-left ${buttonTextSize} font-bold tracking-[0.03em] ${buttonPadding} px-2 transition-all duration-75 rounded-md bg-white text-black ${
                activeButton === category.name ? 'scale-105 bg-white' : 'scale-100 bg-white'
              }`}
              style={{
                WebkitTapHighlightColor: 'rgba(0,0,0,0)',
                touchAction: 'pan-y',
                userSelect: 'none',
              }}
            >
              {category.name}
            </button>
          ))}
          <div style={{ height: isLandscape ? 15 : 25 }} />
        </nav>
      </div>

      {/* MOBILE OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/50 transition-opacity md:hidden ${
          isMenuOpen && isMobile
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9000 }}
        onClick={handleOverlayClick}
        aria-hidden={!isMenuOpen}
      />
    </>
  );
};

export default Header;
