import React from 'react';
import { ChevronRight, MapPin } from 'lucide-react';

interface SiteOverviewProps {
  onNavigate: (path: string) => void;
}

// Full index of every section on the site, each with a one-line summary so
// a visitor can see what's inside before clicking through. Paths must match
// src/routes.ts (SECTION_TO_PATH) — update here if a route changes.
const SITE_INDEX = [
  {
    title: 'Home Insight',
    path: '/home-insight',
    description: 'Technical guides and free calculators on home energy systems — solar, batteries, wind and more.',
  },
  {
    title: 'Project Journey',
    path: '/project-journey',
    description: 'What working with DB+ actually looks like, from first sketch to planning approval.',
  },
  {
    title: 'Architecture',
    path: '/architecture',
    description: 'Extensions, new builds and full architectural design for homes of any size.',
  },
  {
    title: 'Design & Management',
    path: '/design-management',
    description: 'BIM-led design coordination and project management from concept to completion.',
  },
  {
    title: 'Masterplanning + Urban',
    path: '/masterplanning-urban',
    description: 'Site layout, feasibility studies and masterplanning for larger or multi-plot sites.',
  },
  {
    title: 'MEP & Structure',
    path: '/mep-structure',
    description: 'Mechanical, electrical, plumbing and structural design, including energy systems.',
  },
  {
    title: 'Project Support',
    path: '/project-support',
    description: 'Planning applications, Building Regulations and on-site technical support.',
  },
  {
    title: 'Behind DB+',
    path: '/behind-db',
    description: "The practice's background, credentials and approach.",
  },
  {
    title: 'Contact',
    path: '/enquiry',
    description: 'Tell us about your project and get in touch directly.',
  },
];

// Reuses images already published elsewhere on the site (project photos and
// the team photo), so nothing new needs uploading for this gallery.
const GALLERY_IMAGES = [
  {
    url: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934375/House_Extension_1_msdczt.png',
    alt: 'House extension project by DB+',
  },
  {
    url: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769253155/Semi-detached_hosue_cw3nxk.png',
    alt: 'Detached and semi-detached houses designed by DB+',
  },
  {
    url: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769428801/Polcie_Station_o79qbe.png',
    alt: 'Police station project by DB+',
  },
  {
    url: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769242331/Enhance_the_realism_bsvkpa.png',
    alt: 'Community centre project by DB+',
  },
  {
    url: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726361/Edif_Edimar_1_tzg8su.png',
    alt: 'Office building project by DB+',
  },
  {
    url: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768676962/08-07-31_14_vypbmt.jpg',
    alt: 'Nursery project by DB+',
  },
];

const SHOWREEL_VIDEO_URL =
  'https://res.cloudinary.com/dwealmbfi/video/upload/v1771095957/Gen-3_Alpha_Turbo_1476360428_usando_el_sketch_de_Cropped_-_scketch_1_M_5_jjwom8.mp4';

const MAP_EMBED_SRC =
  'https://www.google.com/maps?q=108+Kestrel+Road,+Corby,+Northamptonshire,+NN17+5FP,+UK&output=embed';

const SiteOverview: React.FC<SiteOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">Before you dive in</p>
        <h2 className="text-2xl md:text-3xl font-light mb-4">Take a look around DB+</h2>
        <p className="text-white/70 max-w-2xl mb-12">
          A short overview of where we are, what our work looks like, and everything you'll find on this
          site — so you can jump straight to the part you need.
        </p>

        {/* Map + showreel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <div className="aspect-video w-full">
              <iframe
                title="DB+ office location — 108 Kestrel Road, Corby"
                src={MAP_EMBED_SRC}
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="p-4 flex items-start gap-2 text-sm text-white/70">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-red-500" />
              <span>108 Kestrel Road, Corby, Northamptonshire, NN17 5FP — serving Corby and roughly a 20‑mile radius.</span>
            </div>
          </div>

          <div className="rounded-xl overflow-hidden border border-white/10 bg-white/5">
            <div className="aspect-video w-full bg-black">
              <video
                src={SHOWREEL_VIDEO_URL}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <div className="p-4 text-sm text-white/70">A visual introduction to how DB+ works.</div>
          </div>
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-16">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.url} className="aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
              <img src={img.url} alt={img.alt} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* Site index */}
        <h2 className="text-2xl md:text-3xl font-light mb-8">What's on this site</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SITE_INDEX.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              className="text-left bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-600 rounded-xl p-5 transition-all group"
            >
              <h3 className="font-semibold mb-2 flex items-center justify-between text-white">
                {item.title}
                <ChevronRight className="w-4 h-4 text-white/30 group-hover:text-red-500 transition-colors" />
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SiteOverview;
