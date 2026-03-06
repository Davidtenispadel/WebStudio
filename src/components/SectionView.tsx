{isEnquiry ? (
  <div
    className={`max-w-5xl mx-auto transition-opacity duration-1000 ${
      showGalleryItems ? 'opacity-100' : 'opacity-0'
    } relative z-10`}
  >
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
      
      {/* LEFT PANEL — BLACK CONTACT INFORMATION */}
      <div className="lg:col-span-5 flex flex-col gap-12">
        <div className="text-white p-12 space-y-8 rounded-2xl shadow-2xl bg-black border border-white/10 backdrop-blur-md">
          <h3 className="text-4xl font-light tracking-tight mb-4 leading-tight">
            Contact Information
          </h3>

          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2">
                Office
              </p>
              <p className="text-lg font-light leading-tight">
                108 Kestrel Road, Corby,<br />
                Northamptonshire, England
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2">
                Telephone
              </p>
              <p className="text-lg font-light leading-tight">
                +44 07955018937
              </p>
            </div>

            <div>
              <p className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/40 mb-2">
                Email
              </p>
              <p className="text-lg font-light leading-tight">
                <a
                  href="mailto:db@dbsdesigner.com"
                  className="hover:underline text-red-500 transition-all"
                >
                  db@dbsdesigner.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL — GLASS FORM */}
      <div className="lg:col-span-7">
        <form
          onSubmit={handleEnquirySubmit}
          className="space-y-8 p-12 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl"
        >
          {enquiryStep < 4 ? (
            <>
              {/* TWO INPUTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* NAME */}
                <div className="space-y-3">
                  <label
                    htmlFor="name"
                    className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-red-600 transition-colors text-sm font-light text-white placeholder-white/20"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    disabled={isSending}
                  />
                </div>

                {/* EMAIL */}
                <div className="space-y-3">
                  <label
                    htmlFor="email"
                    className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-red-600 transition-colors text-sm font-light text-white placeholder-white/20"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    disabled={isSending}
                  />
                </div>
              </div>

              {/* PROJECT BRIEF */}
              <div className="space-y-3">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60"
                >
                  Project Brief
                </label>
                <textarea
                  id="message"
                  className="w-full bg-white/5 border-b border-white/20 py-4 px-4 focus:outline-none focus:border-red-600 transition-colors min-h-[140px] text-sm font-light resize-none text-white placeholder-white/20 leading-tight"
                  placeholder="Tell us about your architectural vision..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                  disabled={isSending}
                />
              </div>

              {/* ATTACHMENTS */}
              <div className="space-y-4">
                <label className="block text-[10px] font-bold tracking-[0.4em] uppercase text-white/60">
                  Attachments
                </label>

                {/* DROPZONE */}
                <div
                  onClick={() => !isSending && fileInputRef.current?.click()}
                  className={`group cursor-pointer border-2 border-dashed border-white/10 rounded-xl p-8 text-center transition-all bg-white/5 ${
                    isSending ? 'opacity-50 cursor-not-allowed' : 'hover:border-red-600/50'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                    disabled={isSending}
                  />
                  <div className="flex flex-col items-center gap-3">
                    <Upload className="w-8 h-8 text-white/40 group-hover:text-red-500 transition-colors" />
                    <p className="text-xs font-light text-white/60">
                      Click to attach blueprints, photos, or project requirements
                    </p>
                    {formData.files.length > 0 && (
                      <p className="text-xs font-bold text-red-500 mt-2">
                        {formData.files.length} file(s) selected
                      </p>
                    )}
                  </div>
                </div>

                {/* FILE TAGS */}
                {formData.files.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {formData.files.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full border border-white/10"
                      >
                        <Paperclip className="w-3 h-3 text-red-500" />
                        <span className="text-[10px] text-white/80 max-w-[120px] truncate">
                          {file.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => !isSending && removeFile(idx)}
                          className="hover:text-red-500 text-white/40 transition-colors"
                        >
                          <CloseIcon className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={isSending}
                className="flex items-center gap-6 group mt-8 text-black bg-white px-12 py-5 rounded-full hover:bg-red-600 hover:text-white transition-all shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-xs font-bold tracking-[0.4em] uppercase">
                  {isSending ? 'Transmitting...' : 'Submit to db+'}
                </span>

                {isSending ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                )}
              </button>
            </>
          ) : (
            /* SUCCESS SCREEN */
            <div className="py-24 flex flex-col items-center text-center space-y-8 animate-in fade-in zoom-in duration-700">
              <div className="p-6 bg-white rounded-full">
                <CheckCircle className="w-16 h-16 text-red-600" />
              </div>

              <div>
                <h4 className="text-3xl font-light mb-4 text-white leading-tight">
                  Vision Received
                </h4>
                <p className="text-base text-white/60 font-light leading-tight max-w-md">
                  Your project details and documents have been submitted to{' '}
                  <span className="text-red-500">db@dbsdesigner.com</span>. We will review your
                  vision and contact you shortly.
                </p>
              </div>
            </div>
          )}
        </form>
      </div>

    </div>
  </div>
) : null}
