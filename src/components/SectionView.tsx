      {/* MAIN CONTENT */}
      <div className={`h-full w-full overflow-y-auto custom-scroll px-10 pb-48 transition-opacity duration-800 ${stage === "gallery" ? "opacity-100" : "opacity-0 pointer-events-none"}`} style={{ paddingTop: "120px" }}>
        <div className="max-w-7xl mx-auto">
          {isEnquiry ? (
            // ... (el formulario enquiry se mantiene igual)
            <div className="max-w-7xl mx-auto relative z-[50]">
              {/* ... (todo el formulario enquiry sin cambios) ... */}
            </div>
          ) : isBehindDBSection ? (
            <div className={`max-w-6xl mx-auto relative z-10 text-black pt-20 transition-opacity duration-800 ${showGalleryItems ? "opacity-100" : "opacity-0"}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                <div className="md:col-span-1 p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                  <div className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify text-white" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                </div>
                <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/10">
                  <img src={displayedCategory.imageUrl} alt={displayedCategory.name} className="w-full h-auto object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className={`max-w-6xl mx-auto relative z-10 pt-20 transition-opacity duration-800 ${showGalleryItems ? "opacity-100" : "opacity-0"}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start w-full">
                  <div className="md:col-span-1 p-8 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                    <div className="text-base md:text-lg lg:text-xl font-light leading-tight text-justify text-white" dangerouslySetInnerHTML={{ __html: displayedCategory.description }} />
                  </div>
                  {displayedCategory.imageUrl && (
                    <div className="md:col-span-1 w-full overflow-hidden shadow-2xl rounded-2xl border border-white/10">
                      <img src={displayedCategory.imageUrl} alt={displayedCategory.name} className="w-full h-auto object-cover" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
              {!isHomeSection && !isEnquiry && !isBehindDBSection && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
                  {displayedCategory.projects.map((project) => (<ProjectCard key={project.id} project={project} onClick={onProjectClick} currentSectionName={currentSectionName} />))}
                </div>
              )}
              {isDesignSection && (
                <div className="flex flex-col gap-24 mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="p-10 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
                    <div className="text-white leading-tight" dangerouslySetInnerHTML={{ __html: isoContent }} />
                  </div>
                  <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black/20">
                    <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1771155566/Gemini_Generated_Image_867rii867rii867r_czfvu7.png" alt="Design & Management Vision" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                </div>
              )}
              {isUrbanSection && (
                <div className="mt-32 mb-16 max-w-5xl mx-auto">
                  <div className="w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black/20">
                    <img src="https://res.cloudinary.com/dwealmbfi/image/upload/v1770138676/dibujo_limpio_profesional_1_i078jd.png" alt="Urban Masterplanning Drawing" className="w-full h-auto object-cover" loading="lazy" />
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
