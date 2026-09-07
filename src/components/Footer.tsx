import React from 'react';

// Sitewide footer. Purpose: give every page a consistent, crawlable NAP
// (Name, Address, Phone) block for local SEO / Google Business Profile
// matching, plus a couple of internal links with descriptive anchor text.
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
            DB+ Design &amp; Management — architectural design, BIM and planning services for extensions,
            new builds and full residential projects.
          </p>
        </div>

        <div>
          <p className="text-white font-medium mb-3 tracking-wide uppercase text-xs">Contact</p>
          <address className="not-italic leading-relaxed text-white/60">
            David Bonilla‑Saavedra
            <br />
            108 Kestrel Road
            <br />
            Corby, Northamptonshire
            <br />
            NN17 5FP, United Kingdom
            <br />
            <a href="tel:+4407955018937" className="hover:text-white underline">
              +44 07955 018937
            </a>
            <br />
            <a href="mailto:david@dbsdesigner.com" className="hover:text-white underline">
              david@dbsdesigner.com
            </a>
          </address>
        </div>

        <div>
          <p className="text-white font-medium mb-3 tracking-wide uppercase text-xs">Registration</p>
          <ul className="space-y-2 text-white/60">
            <li>
              RIBA Chartered Member —{' '}
              <a
                href="https://members.architecture.com/custom/bespoke/directory/dir_details.asp?id=279877&type=I&dir=3"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                verify on RIBA directory
              </a>
            </li>
            <li>
              ARB Registered Architect No. 083457B —{' '}
              <a
                href="https://architects-register.org.uk/Architect/083457B?filterId=Architect"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white"
              >
                verify on the Architects Register
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        © {year} DB+ Design &amp; Management. Serving Corby, Kettering, Wellingborough and surrounding
        Northamptonshire.
      </div>
    </footer>
  );
};

export default Footer;
