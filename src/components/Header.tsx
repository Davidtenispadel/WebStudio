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
  
  // Referencia para el sonido
  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  // Inicializar sonido (volumen muy bajo)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      clickSoundRef.current = new Audio('https://res.cloudinary.com/dwealmbfi/video/upload/v1777554320/dragon-studio-notification-click-sound-455421_onilfm.mp3');
      clickSoundRef.current.volume = 0.08; // Volumen muy bajo (8%)
      clickSoundRef.current.preload = 'auto';
    }
  }, []);

  const playClickSound = () => {
    if (clickSoundRef.current) {
      const soundClone = clickSoundRef.current.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.08;
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

  const navLinkColorClass = isDarkBackground
    ? 'text-white/70 hover:text-white'
    : 'text-gray-500 hover:text-red-600';

  return (
    <>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 w-full bg-white/40 backdrop-blur-md border-b border-black/[0.05]"
        style={{ zIndex: 9999 }}
      >
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          {/* LOGO */}
          <div
            className="flex items-center gap-1 cursor-pointer select-none active:scale-95 transition-transform duration-75"
            onClick={handleDbPlusLogoClick}
            aria-label="Go to home page"
          >
            <span className="text-3xl font-light tracking-tighter text-black">
              DB
            </span>
            <span className="text-2xl font-thin text-gray-400">+</span>
          </div>

          {/* DESKTOP NAV */}
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

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden p-2 active:scale-90 transition-transform duration-75"
            onClick={handleMenuButtonClick}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6 text-black" />
          </button>
        </div>
      </header>

      {/* MOBILE SIDE MENU - RADICAL FIX PARA IPHONE PRO MAX */}
      <div
        className="fixed top-0 left-0 w-80 bg-white shadow-xl transition-transform duration-500 ease-in-out md:hidden"
        style={{
          zIndex: 10000,
          transform: isMenuOpen && isMobile
            ? 'translateX(0)'
            : 'translateX(-100%)',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '250px',
          paddingTop: 'env(safe-area-inset-top, 20px)',
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
            onClick={handleCloseMenuClick}
            className="p-2 rounded-full hover:bg-gray-100 active:scale-90 transition-all duration-75"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* MOBILE NAV - PADDING INFERIOR MASIVO */}
        <nav className="flex flex-col p-10 pt-6 gap-4" style={{ paddingBottom: '300px' }}>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => handleMenuItemClick(category.name)}
              className="text-left text-xl tracking-[0.08em] py-3 px-2 hover:text-red-600 active:scale-105 active:bg-gray-50 transition-all duration-75 rounded-lg"
              style={{
                WebkitTapHighlightColor: 'rgba(0,0,0,0.05)',
              }}
            >
              {category.name}
            </button>
          ))}
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
