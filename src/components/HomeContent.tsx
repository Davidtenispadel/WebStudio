import React from 'react';

export const HomeContent: React.FC = () => {
  return (
    <div 
      className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/your-hero-architecture-bg.jpg')" }}
    >
      {/* Overlay suave de fondo opcional */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />

      {/* Columna lateral izquierda con efecto Vidrio Mate (Frosted Glass) */}
      <aside className="relative z-10 min-h-screen w-full max-w-xl lg:max-w-2xl bg-white/80 backdrop-blur-lg border-r border-white/50 shadow-2xl p-6 sm:p-10 space-y-8 text-gray-900">
        
        {/* Header / Título Principal */}
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Architecture &amp; Building Solutions in Northamptonshire and Surrounding Areas
          </h1>
          <p className="text-lg font-semibold text-gray-800 leading-relaxed">
            Your home should be comfortable, efficient, and ready for the future — not a mystery you have to solve on your own.
          </p>
          <p className="text-base text-gray-700 leading-normal">
            Whether you are planning a new build, adding an extension, tackling a persistent building fault, or trying to make sense of low-carbon heating, the starting point is always the same: understanding what you actually need and what is practical for your property.
          </p>
          
          {/* Botón de Acción / CTA */}
          <div className="pt-2">
            <a 
              href="#contact" 
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium px-6 py-3 rounded-full shadow-md transition-all duration-200"
            >
              Start your project
            </a>
          </div>
        </header>

        <hr className="border-gray-300/80" />

        {/* Sección de Necesidades y Problemas */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Is Your Home Trying to Tell You Something?
          </h2>
          <p className="text-base text-gray-700">
            Houses have a way of letting us know when something isn't working. You might be facing:
          </p>
          <ul className="space-y-3 list-disc pl-5 text-gray-800">
            <li>
              <strong>Space constraints:</strong> A growing family, a cramped layout, or a desperate need for a home office that isn't the dining table.
            </li>
            <li>
              <strong>Thermal drama:</strong> A home that feels like an igloo in January, an oven in August, and leaves you with rising energy bills all year round.
            </li>
            <li>
              <strong>Persistent defects:</strong> Mystery damp patches, water ingress during heavy rain, condensation, or new cracks appearing around doors and windows.
            </li>
            <li>
              <strong>Tech confusion:</strong> Knowing your heating or energy setup needs updating, but feeling unsure whether air source heat pumps, solar PV, battery storage, or traditional systems actually make financial and technical sense for your roof and layout.
            </li>
          </ul>
        </section>

        {/* Sección Enfoque y Soluciones */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            You Don't Need All the Answers Before You Start
          </h2>
          <p className="text-base text-gray-700 leading-relaxed">
            You don't need to have every detail worked out before speaking to an architect. You might simply know that your living space feels small, or that a room is permanently freezing.
          </p>
          <p className="text-base text-gray-700 leading-relaxed">
            Good architecture is about far more than just producing drawings for planning approval — it's about identifying the root cause of a problem, exploring realistic spatial options, and designing spaces that perform as well as they look.
          </p>

          <h3 className="text-lg font-semibold text-gray-900 pt-2">
            How we approach your project:
          </h3>
          <ul className="space-y-2 list-disc pl-5 text-gray-800">
            <li>
              <strong>Spatial &amp; Technical Integration:</strong> Every design balances space, light, structure, and energy efficiency so your home functions seamlessly as a single system.
            </li>
            <li>
              <strong>Coordinated 3D Modeling:</strong> Architectural, structural, and mechanical details are coordinated within an intelligent 3D BIM model before construction begins. This catches design conflicts early and avoids expensive surprises on site.
            </li>
            <li>
              <strong>Balanced Energy &amp; Comfort:</strong> We focus on proper insulation, smart ventilation, and solar control to keep your home warm in winter without overheating in summer.
            </li>
          </ul>
        </section>

        {/* Caza de Herramientas y Calculadoras */}
        <section className="bg-white/60 p-5 rounded-xl space-y-3 border border-white/80 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900">
            Explore Options Before Making Expensive Decisions
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Building technology and energy choices are changing fast. To help you navigate the noise before investing in major works, explore our <strong>Knowledge Hub and Interactive Calculators</strong>.
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Use these free tools to estimate solar PV requirements, explore battery storage sizing, or dive into practical technical guides on materials and building performance. Gather information at your own pace, run the numbers, and understand your choices before committing to a single build or equipment purchase.
          </p>
        </section>

        {/* Zonas Cobertura / SEO */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-gray-900">
            Local Expertise Across Northamptonshire &amp; Surrounding Areas
          </h2>
          <p className="text-base text-gray-700">
            Based in Corby, we work with homeowners, self-builders, and property developers across Northamptonshire and surrounding areas, including:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-sm text-gray-800 font-medium">
            <div className="bg-white/70 p-2.5 rounded-lg border border-gray-200/80 text-center">Corby &amp; Kettering</div>
            <div className="bg-white/70 p-2.5 rounded-lg border border-gray-200/80 text-center">Wellingborough &amp; Rushden</div>
            <div className="bg-white/70 p-2.5 rounded-lg border border-gray-200/80 text-center">Market Harborough &amp; Desborough</div>
            <div className="bg-white/70 p-2.5 rounded-lg border border-gray-200/80 text-center">Oundle, Uppingham &amp; Stamford</div>
          </div>
        </section>

        {/* Footer CTA */}
        <footer className="pt-4 text-center space-y-3 border-t border-gray-300/80">
          <h2 className="text-2xl font-bold text-gray-900">
            Plan with Confidence. Build with Clarity.
          </h2>
          <p className="text-base text-gray-700">
            Whether you are starting from a blank plot, expanding your existing layout, resolving a structural defect, or upgrading your energy systems, let's turn your initial questions into a clear, workable solution.
          </p>
        </footer>

      </aside>
    </div>
  );
};

export default HomeContent;
