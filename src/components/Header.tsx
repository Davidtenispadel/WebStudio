      {/* MOBILE SIDE MENU - FIX RADICAL PARA PRO MAX */}
      <div
        className="fixed top-0 left-0 w-80 bg-white shadow-xl transition-transform duration-500 ease-in-out md:hidden"
        style={{
          zIndex: 10000,
          transform: isMenuOpen && isMobile && !isDesktop
            ? 'translateX(0)'
            : 'translateX(-100%)',
          height: '100vh',
          overflowY: 'auto',
          overflowX: 'hidden',
          WebkitOverflowScrolling: 'touch',
          paddingBottom: '200px',
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
        <nav className="flex flex-col p-10 pt-6 gap-4" style={{ paddingBottom: '250px' }}>
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
