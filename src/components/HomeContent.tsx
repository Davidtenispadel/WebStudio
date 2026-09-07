import React from 'react';
import { ChevronRight } from 'lucide-react';

interface HomeContentProps {
  onNavigate: (path: string) => void;
}

// NOTE ON ROUTES: the five paths below (/architecture, /design-management,
// /mep-structure, /masterplanning-urban, /project-support) are taken from
// the site's generated page filenames. Please confirm they match the exact
// strings in src/routes.ts (SECTION_TO_PATH) before deploying — if any
// differ, just update the `path` value on that card below.
const SERVICES = [
  {
    title: 'Architecture',
    path: '/architecture',
    description:
      'Extensions, new builds and full architectural design, from concept sketches through to planning-ready drawings.',
  },
  {
    title: 'Design & Management',
    path: '/design-management',
    description:
      'BIM-led design coordination and project management that keeps your build on programme and on budget.',
  },
  {
    title: 'Masterplanning & Urban',
    path: '/masterplanning-urban',
    description:
      'Site layout, feasibility studies and masterplanning for larger residential and mixed-use sites.',
  },
  {
    title: 'MEP & Structure',
    path: '/mep-structure',
    description:
      'Mechanical, electrical, plumbing and structural design — including solar, battery storage and heat pump integration.',
  },
  {
    title: 'Project Support',
    path: '/project-support',
    description:
      'Planning applications, Building Regulations submissions and on-site support through to completion.',
  },
];

const HomeContent: React.FC<HomeContentProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white text-black">
      {/* ============================================================ */}
      {/* INTRO / WHO WE ARE */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-light mb-6">
          Architectural design for Corby, Kettering, Wellingborough and the surrounding area
        </h2>
        <div className="space-y-4 text-base md:text-lg text-gray-700 leading-relaxed max-w-3xl">
          <p>
            DB+ Design &amp; Management is a full-service architecture practice based in Corby,
            Northamptonshire. We design house extensions, loft conversions, new-build homes and larger
            residential projects for homeowners, self-builders and small developers, taking a project from
            an early feasibility sketch through to a Building Regulations-ready technical package.
          </p>
          <p>
            Every project is led by a RIBA Chartered, ARB-registered architect and delivered using a
            BIM-led workflow, which means your drawings, structural information and MEP (mechanical,
            electrical and plumbing) coordination all sit in one consistent 3D model — reducing the design
            clashes and late-stage surprises that typically add cost and delay to a build.
          </p>
          <p>
            We work across Corby and within roughly a 20-mile radius, including{' '}
            <strong>Kettering</strong>, <strong>Wellingborough</strong>, <strong>Rushden</strong>,{' '}
            <strong>Desborough</strong>, <strong>Market Harborough</strong>, <strong>Oundle</strong>,{' '}
            <strong>Uppingham</strong> and <strong>Stamford</strong>. If you're planning an extension, a
            new build, or need help navigating planning permission and Building Regulations anywhere in
            this area, we can help.
          </p>
          <p>
            Beyond traditional architecture, we also build free, in‑depth tools to help decide which
            technology systems belong in a project — useful whether you're a homeowner client, a fellow
            architect, or an installer sizing up a job. We started with electricity generation and storage:
            solar panel layout and output, and battery chemistry, sizing and location. Each tool goes beyond
            a rough estimate — it works through the real constraints (roof size, orientation, tariffs,
            battery weight and placement rules) and gives a projected payback period, so you can see whether
            a given system genuinely pays for itself before committing to it. Our{' '}
            <button
              onClick={() => onNavigate('/solar-calculator')}
              className="text-red-600 underline hover:text-red-700"
            >
              solar panel calculator
            </button>{' '}
            and{' '}
            <button
              onClick={() => onNavigate('/batteries')}
              className="text-red-600 underline hover:text-red-700"
            >
              battery storage guide
            </button>{' '}
            are the first two — more will follow as we cover the rest of what a modern home's technical
            systems need.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SERVICES GRID */}
      {/* ============================================================ */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <h2 className="text-2xl md:text-3xl font-light mb-10">What we do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <button
                key={service.path}
                onClick={() => onNavigate(service.path)}
                className="text-left bg-white rounded-xl p-6 border border-gray-200 hover:border-red-600 hover:shadow-lg transition-all group"
              >
                <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                  {service.title}
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 transition-colors" />
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOUNDER BIO — E-E-A-T */}
      {/* ============================================================ */}
      <section className="max-w-5xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <h2 className="text-2xl md:text-3xl font-light mb-8">Who's behind DB+</h2>
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="flex-1">
            <p className="text-lg font-semibold mb-1">David Bonilla‑Saavedra</p>
            <p className="text-sm text-gray-500 mb-4">
              RIBA Chartered Member · ARB Registered Architect No. 083457B
            </p>
            <div className="space-y-3 text-gray-700 leading-relaxed">
              <p>
                David founded DB+ to bring a technically rigorous, BIM-first approach to residential
                architecture in Northamptonshire — the kind of detailed coordination usually reserved for
                larger commercial projects, applied to house extensions and new builds.
              </p>
              <p>
                His registration can be checked directly on the official registers:{' '}
                <a
                  href="https://members.architecture.com/custom/bespoke/directory/dir_details.asp?id=279877&type=I&dir=3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 underline hover:text-red-700"
                >
                  RIBA Chartered Members directory
                </a>{' '}
                and the{' '}
                <a
                  href="https://architects-register.org.uk/Architect/083457B?filterId=Architect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 underline hover:text-red-700"
                >
                  Architects Registration Board (ARB) public register
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeContent;
