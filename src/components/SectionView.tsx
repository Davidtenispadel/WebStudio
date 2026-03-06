{isEnquiry && (
  <div className="relative z-20">
    {/* CONTENEDOR DOS COLUMNAS */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
      
      {/* COLUMNA IZQUIERDA — TARJETA NEGRA */}
      <aside className="bg-black/95 text-white rounded-2xl p-8 md:p-10 shadow-2xl border border-white/5">
        <h3 className="text-3xl md:text-4xl font-light leading-tight">Contact<br/>Information</h3>

        <div className="mt-8 space-y-6 text-white/80">
          <div>
            <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">Office</div>
            <div className="mt-2 text-base leading-6">
              108 Kestrel Road, Corby,<br/>Northamptonshire, England
            </div>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">Telephone</div>
            <div className="mt-2 text-base">+44 07955018937</div>
          </div>

          <div>
            <div className="text-[11px] tracking-[0.25em] text-white/50 uppercase">Email</div>
            <a
              href="mailto:db@dbsdesigner.com"
              className="mt-2 inline-block text-base text-red-500 hover:text-red-400 underline underline-offset-4"
            >
              db@dbsdesigner.com
            </a>
          </div>
        </div>
      </aside>

      {/* COLUMNA DERECHA — PANEL GRIS OSCURO TRANSLÚCIDO */}
      <section className="bg-neutral-800/70 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 shadow-2xl text-white">
        <form onSubmit={handleEnquirySubmit} className="space-y-6">

          {/* FILA: NAME + EMAIL */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="John Doe"
                className="w-full bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="john@example.com"
                className="w-full bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* PROJECT BRIEF */}
          <div>
            <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-2">
              Project Brief
            </label>
            <textarea
              required
              placeholder="Tell us about your architectural vision..."
              className="w-full h-44 bg-neutral-700/60 border border-white/15 rounded-md px-4 py-3 outline-none placeholder-white/40 focus:ring-2 focus:ring-white/20"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          {/* ATTACHMENTS */}
          <div>
            <label className="block text-[11px] tracking-[0.25em] text-white/70 uppercase mb-3">
              Attachments
            </label>

            {/* DROPZONE/SELECTOR */}
            <div
              className="rounded-xl bg-neutral-700/50 border border-white/15 p-5 md:p-6 text-white/70"
            >
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-3 py-8 hover:bg-white/5 rounded-lg transition"
              >
                {/* Ícono simple de upload (usando SVG para no depender de lucide aquí) */}
                <svg width="28" height="28" viewBox="0 0 24 24" className="opacity-80">
                  <path fill="currentColor" d="M12 16V8m0 0l-3 3m3-3l3 3M6 20h12a2 2 0 0 0 2-2v-3a1 1 0 1 0-2 0v3H6v-3a1 1 0 1 0-2 0v3a2 2 0 0 0 2 2Z"/>
                </svg>
                <span className="text-sm">Click to attach blueprints, photos, or project requirements</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />

              {/* Lista de archivos */}
              {formData.files.length > 0 && (
                <div className="mt-4 space-y-2">
                  {formData.files.map((file, idx) => (
                    <div
                      key={`${file.name}-${idx}`}
                      className="flex items-center justify-between bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm"
                    >
                      <span className="truncate max-w-[16rem]">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-300 hover:text-red-400"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SUBMIT */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSending}
              className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full hover:bg-white/90 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSending ? 'Sending…' : 'SUBMIT TO DB+  →'}
            </button>
          </div>

          {/* SUCCESS */}
          {enquiryStep === 4 && (
            <div className="flex items-center gap-3 text-base text-green-400">
              <span>Thank you — your enquiry has been sent.</span>
            </div>
          )}
        </form>
      </section>
    </div>
  </div>
)}
