import { Project, CategoryGroup, StudioSection } from './types';

// ... (isoContent, designPhilosophy, architectureDescription, etc. se mantienen igual) ...

// NUEVA constante para Home Insight (con el texto tecnológico largo)
export const homeDescription = `
<div class="text-black leading-tight">
  <h2 class="text-3xl md:text-4xl font-light mb-6">Home Insight</h2>
  
  <p class="text-lg md:text-xl font-light mb-6">
    A contemporary home is more than just a habitable space. It is a complex technological system where the building envelope, energy systems, materials, and climate control converge.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    This section is a living technical resource that will grow over time. Here you will find the latest advances, backed by scientific research and real‑world evidence, along with practical tools to make informed decisions. Above all, we will guide you to obtain the key information you need – from analysing your energy consumption and assessing your roof orientation, to calculating the return on investment of a photovoltaic installation or choosing the most efficient systems for your climate control.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    Our goal is to help you identify what your project requires based on your real needs, your budget, and the specific conditions of your home. We will provide clear data, objective comparisons, and a roadmap so you can plan with confidence.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    <strong>How can you improve your home, and what tools do you have to understand the real scope of those improvements?</strong><br />
    Here you will discover practical methods to evaluate each intervention: from energy efficiency simulations to return-on-investment calculators. You will learn to prioritise actions, quantify the impact on your bills and comfort, and avoid decisions based on assumptions.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    As architects, we will continually update this space with new regulations, emerging research, and real-case insights. We want you to understand not only what works, but exactly how you can transform your home and measure the benefit of every step you take.
  </p>

  <p class="text-lg md:text-xl font-light mb-12">
    Let’s build knowledge together, branch by branch.
  </p>
</div>`;

// Descripción para la sección "Plan Your Project" (tecnología y herramientas)
export const technologyDescription = `
<div class="text-black leading-tight">
  <h2 class="text-3xl md:text-4xl font-light mb-6">Plan Your Project</h2>
  
  <p class="text-lg md:text-xl font-light mb-6">
    Here you will find the practical tools and technical resources you need to plan your project with confidence. Explore our interactive solar panel calculator, compare photovoltaic technologies, and access data‑driven insights tailored to your home’s specific characteristics.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    Use the tree below to navigate through Green Energy systems, materials, HVAC, structural systems, and smart home technologies. Each branch contains in‑depth guides, calculators, and up‑to‑date references.
  </p>

  <p class="text-lg md:text-xl font-light mb-12">
    Start by selecting a topic on the left, or go directly to the solar panel designer to calculate your return on investment.
  </p>
</div>`;

// ... (urbanMasterplanningHeaderDescription, projectSupportHeaderDescription, etc. se mantienen) ...

export const CATEGORIES: CategoryGroup[] = [
  // HOME INSIGHT (primer elemento del menú)
  {
    id: 'home',
    name: 'Home Insight',   // ← nombre visible
    description: homeDescription,   // ← texto largo
    imageUrl: '',
    projects: []
  },

  // PLAN YOUR PROJECT (antes TECHNOLOGY)
  {
    id: 'technology',
    name: 'Plan Your Project',
    description: technologyDescription,   // ← texto breve y orientado a herramientas
    imageUrl: '',
    projects: []
  },

  // ... el resto de categorías se mantienen igual (PROJECT_JOURNEY, ARCHITECTURE, etc.)
];
