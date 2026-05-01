import React, { useState, useEffect, useRef } from 'react';
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
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const [isLandscape, setIsLandscape] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; target: string | null }>({ x: 0, y: 0, target: null });

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

  // Manejo táctil para efecto hover mientras se desliza
  const handleTouchStart = (section: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      target: section,
    };
    setActiveButton(section);
  };

  const handleTouchMove = (section: string, e: React.TouchEvent) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const isInside = touch.clientX >= rect.left && touch.clientX <= rect.right &&
                     touch.clientY >= rect.top && touch.clientY <= rect.bottom;
    
    if (isInside) {
      setActiveButton(section);
    } else {
      setActiveButton(null);
    }
  };

  const handleTouchEnd = (section: string, e: React.TouchEvent) => {
    const touch = e.changedTouches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const isInside = touch.clientX >= rect.left && touch.clientX <= rect.right &&
                     touch.clientY >= rect.top && touch.clientY <= rect.bottom;
    
    if (isInside && activeButton === section) {
      handleMenuItemClick(section);
    }
    setActiveButton(null);
  };

  const navLinkColorClass = isDarkBackground
    ? 'text-white/70 hover:text-white'
    : 'text-gray-500 hover:text-red-600';

  // Aumentar ancho del menú
  const menuWidth = isLandscape ? '65%' : '85%';
  const menuMaxWidth = isLandscape ? '280px' : '340px';
  const buttonPadding = isLandscape ? 'py-2' : 'py-3';
  const buttonTextSize = isLandscape ? 'text-sm' : 'text-base';
  const buttonGap = isLandscape ? 'gap-1' : 'gap-2';
  const logoSize = isLandscape ? 'text-xl' : 'text-2xl';
  const logoSymbolSize = isLandscape ? 'text-base' : 'text-xl';
  const containerPadding = isLandscape ? 'p-3' : 'p-4';
  const navPadding = isLandscape ? 'p-3 pt-2' : 'p-4 pt-3';

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

          <nav className="hidden md:flex items-center gap-10 text-[12px] tracking-[0.15em] font-light">
            {CATEGORIES.map(
              (category) =>
                category.name !== 'Home' && (
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

      {/* MOBILE SIDE MENU - MÁS ANCHO + EFECTO TÁCTIL NATURAL */}
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
          minWidth: '240px',
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
            className="p-1.5 rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-75"
            aria-label="Close menu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className={`flex flex-col ${navPadding} ${buttonGap}`}>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleMenuItemClick(category.name)}
              onTouchStart={(e) => handleTouchStart(category.name, e)}
              onTouchMove={(e) => handleTouchMove(category.name, e)}
              onTouchEnd={(e) => handleTouchEnd(category.name, e)}
              className={`text-left ${buttonTextSize} tracking-[0.03em] ${buttonPadding} px-3 hover:text-red-600 transition-all duration-75 rounded-lg ${
                activeButton === category.name
                  ? 'bg-red-50 text-red-600 scale-105'
                  : 'bg-transparent'
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
