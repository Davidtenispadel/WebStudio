import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 bg-black text-white/70 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">

        <div>
          <div className="flex items-center gap-1 mb-3">
            <span className="text-xl font-light tracking-tighter text-white">DB</span>
            <span className="text-lg font-thin text-white/50">+</span>
          </div>

          <p className="text-white/60 leading-relaxed">
            DB+ Design & Management — architectural design, BIM and planning
            services for extensions, new builds and full residential projects.
          </p>
        </div>

        <div>
          <p className="text-white font-medium mb-3 tracking-wide uppercase text-xs">
            Contact
          </p>

          <address className="not-italic leading-relaxed text-white/60">
            108 Kestrel Road
            <br />
            Corby, Northamptonshire
            <br />
            NN17 5FP, United Kingdom
            <br />
            <a
              href="mailto:db@dbsdesigner.com"
              className="hover:text-white underline"
            >
              db@dbsdesigner.com
            </a>
          </address>
        </div>

        <div>
          <p className="text-white font-medium mb-3 tracking-wide uppercase text-xs">
            Professional Registration
          </p>

          <div className="flex items-center gap-6 mb-4">

            <a
              href="https://members.architecture.com/custom/bespoke/directory/dir_details.asp?id=279877&type=I&dir=3"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="RIBA Chartered Member"
            >
              <img
                src="/riba_logo_white.svg"
                alt="RIBA Chartered Member"
                className="h-16 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>

            <a
              href="https://architects-register.org.uk/Architect/083457B?filterId=Architect"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ARB Registered Architect"
            >
              <img
                src="/arb-2-083157B.png"
                alt="ARB Registered Architect"
                className="h-18 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </a>

          </div>

          <div className="text-white/60 space-y-1">
            <p>RIBA Chartered Member</p>
            <p>ARB Registered Architect No. 083457B</p>
          </div>
        </div>

      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {year} DB+ Design & Management. Serving Corby, Kettering,
        Wellingborough and surrounding Northamptonshire.
      </div>
    </footer>
  );
};

export default Footer;
