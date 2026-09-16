import React from 'react';

export const HomeContent: React.FC = () => {
  return (
    <article className="home-content max-w-4xl mx-auto px-4 py-8 space-y-12">
      {/* Hero / Main Introduction */}
      <header className="space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
          Architecture &amp; Building Solutions in Northamptonshire and Surrounding Areas
        </h1>
        <p className="text-xl font-medium text-gray-700 leading-relaxed">
          Your home should be comfortable, efficient, and ready for the future — not a mystery you have to solve on your own.
        </p>
        <p className="text-base text-gray-600 leading-normal">
          Whether you are planning a new build, adding an extension, tackling a persistent building fault, or trying to make sense of low-carbon heating, the starting point is always the same: understanding what you actually need and what is practical for your property.
        </p>
      </header>

      <hr className="border-gray-200" />

      {/* Pain Points / Client Needs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Is Your Home Trying to Tell You Something?
        </h2>
        <p className="text-base text-gray-600">
          Houses have a way of letting us know when something isn't working. You might be facing:
        </p>
        <ul className="space-y-3 list-disc pl-6 text-gray-700">
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

      {/* Solutions & Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          You Don't Need All the Answers Before You Start
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">
          You don't need to have every detail worked out before speaking to an architect. You might simply know that your living space feels small, or that a room is permanently freezing.
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          Good architecture is about far more than just producing drawings for planning approval — it's about identifying the root cause of a problem, exploring realistic spatial options, and designing spaces that perform as well as they look.
        </p>

        <h3 className="text-lg font-semibold text-gray-800 pt-2">
          How we approach your project:
        </h3>
        <ul className="space-y-2 list-disc pl-6 text-gray-700">
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

      {/* Knowledge Hub & Interactive Tools Integration */}
      <section className="bg-gray-50 p-6 rounded-lg space-y-3 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900">
          Explore Options Before Making Expensive Decisions
        </h2>
        <p className="text-base text-gray-600 leading-relaxed">
          Building technology and energy choices are changing fast. To help you navigate the noise before investing in major works, explore our <strong>Knowledge Hub and Interactive Calculators</strong>.
        </p>
        <p className="text-base text-gray-600 leading-relaxed">
          Use these free tools to estimate solar PV requirements, explore battery storage sizing, or dive into practical technical guides on materials and building performance. Gather information at your own pace, run the numbers, and understand your choices before committing to a single build or equipment purchase.
        </p>
      </section>

      {/* SEO & Regional Coverage */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-gray-900">
          Local Expertise Across Northamptonshire &amp; Surrounding Areas
        </h2>
        <p className="text-base text-gray-600">
          Based in Corby, we work with homeowners, self-builders, and property developers across Northamptonshire and surrounding areas, including:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-sm text-gray-700 font-medium">
          <div className="bg-gray-100 p-2 rounded text-center">Corby &amp; Kettering</div>
          <div className="bg-gray-100 p-2 rounded text-center">Wellingborough &amp; Rushden</div>
          <div className="bg-gray-100 p-2 rounded text-center">Market Harborough &amp; Desborough</div>
          <div className="bg-gray-100 p-2 rounded text-center">Oundle, Uppingham &amp; Stamford</div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="pt-6 text-center space-y-3 border-t border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">
          Plan with Confidence. Build with Clarity.
        </h2>
        <p className="text-base text-gray-600 max-w-2xl mx-auto">
          Whether you are starting from a blank plot, expanding your existing layout, resolving a structural defect, or upgrading your energy systems, let's turn your initial questions into a clear, workable solution.
        </p>
      </footer>
    </article>
  );
};

export default HomeContent;
