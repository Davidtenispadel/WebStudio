import { Project, CategoryGroup, StudioSection } from './types';

export const isoContent = `
<div class="text-black leading-tight">
  <div>
    <h3 class="text-xl md:text-2xl font-bold">ISO 19650: Collaborative Work, Clear Information Management, and Fewer Surprises</h3>
    <p class="text-lg md:text-xl font-light pt-6">
      We apply the principles of ISO 19650, the international standard developed in the UK for managing information in BIM‑based projects.<br/>
      For experienced clients, ISO 19650 is familiar territory. But for those who are not aware of it, the benefits are simple and tangible:
    </p>
  </div>
  
  <ul class="space-y-1 text-lg md:text-xl font-light pt-6">
    <li>• <span class="font-bold">Everyone works in unison:</span> all teams share the same organised and up‑to‑date information, eliminating misunderstandings and inconsistencies.</li>
    <li>• <span class="font-bold">Fewer errors and last‑minute changes:</span> issues are detected early, long before reaching construction.</li>
    <li>• <span class="font-bold">Reduced unexpected costs:</span> by avoiding mistakes and rework, the project experiences fewer surprises and budget deviations.</li>
    <li>• <span class="font-bold">Clear communication and full transparency:</span> clients always know what is happening, why, and with what information.</li>
    <li>• <span class="font-bold">Better coordination across all disciplines:</span> architects, engineers, and contractors collaborate through a unified framework.</li>
  </ul>

  <div>
    <p class="text-lg md:text-xl font-bold pt-6">This standard promotes:</p>
    <ul class="space-y-0.5 text-lg md:text-xl font-light pt-2">
      <li>• Shared responsibility among all project participants</li>
      <li>• Early detection and resolution of issues</li>
      <li>• Genuine multidisciplinary coordination</li>
      <li>• Reduced risks and minimised cost overruns</li>
      <li>• Transparency and traceability at every stage</li>
    </ul>
  </div>

  <p class="text-lg md:text-xl font-light italic pt-6">
    ISO 19650 is mandatory in public‑sector projects and highly advantageous in private developments, bringing structure, efficiency, and a stronger collaborative culture across all stakeholders.
  </p>
</div>`;

export const designPhilosophy = `<div class="text-black leading-tight">
  <p class="text-lg md:text-xl font-light">At DB+ Design & Management, we combine a clear architectural vision, close client collaboration, and a rigorous end‑to‑end design process. Every project is developed with coherence, functionality, and quality from concept to completion.</p>

  <p class="text-lg md:text-xl font-light pt-6">We listen carefully, translate real needs into precise design solutions, and maintain continuous dialogue to ensure that the final outcome reflects both the client's goals and the project's technical and urban context.</p>

  <p class="text-lg md:text-xl font-light pt-6">Our workflow covers concept development, design refinement, technical coordination, permit documentation, construction detailing, and on‑site support ensuring feasibility and full alignment with the original design intent.</p>
</div>`;

export const architectureDescription = `<div class="text-black leading-tight">
  <p class="text-lg md:text-xl font-light pt-6">DB+ is a full‑service architecture practice and design studio delivering projects from initial concept to full realisation through BIM technology in Corby, Kettering & Northampton, serving homes and businesses across Northamptonshire and the surrounding villages.</p>

  <p class="text-xl font-bold pt-6">What we offer</p>
  
  <div class="pt-6">
    <div class="pb-6">
      <p class="text-lg font-bold">• Extensions & Renovations</p>
      <p class="text-base font-light">More comfort. Better flow. A home that feels renewed. Whether a partial refresh or full refurbishment, we help you love where you live across Corby, Kettering, Wellingborough, Market Harborough and beyond.</p>
    </div>

    <div class="pb-6">
      <p class="text-lg font-bold">• Planning Applications</p>
      <p class="text-base font-light">Do you need planning permission for your extension or new build? We prepare and submit planning applications to North Northamptonshire Council, advise on permitted development rights, and manage approvals from start to finish. Based in Corby, we know the local planning policies across Northamptonshire and the surrounding area including villages where rules differ from towns.</p>
    </div>

     <div class="pb-6">
      <p class="text-lg font-bold">• New Build Projects</p>
      <p class="text-base font-light">From single‑family homes to multi‑unit developments. Contemporary, efficient, and ready for the future – designed around how you'll actually use them.</p>
    </div>

    <div>
      <p class="text-lg font-bold">• All Building Types</p>
      <p class="text-base font-light">Tailored architectural solutions for any building. Full compliance, optimal performance, long‑term durability – and a space that works for you.</p>
    </div>
  </div>
</div>`;

export const technologyDescription = `
<div class="text-black leading-tight">
  <h2 class="text-3xl md:text-4xl font-light mb-6">Plan Your Project</h2>
  
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

export const urbanMasterplanningHeaderDescription = 'Key Urban Projects and Planning.';

export const projectSupportHeaderDescription = 'Specialized Technical Support for Complex Projects.';

export const CATEGORIES: CategoryGroup[] = [
  // HOME
  {
    id: 'home',
    name: StudioSection.HOME,
    description: `Turning ideas into reality, your vision is our purpose...`,
    imageUrl: '',
    projects: []
  },

  // TECHNOLOGY (Plan Your Project)
  {
    id: 'technology',
    name: 'Plan Your Project',   // ← Nombre visible en el menú
    description: technologyDescription,
    imageUrl: '',
    projects: []
  },

  // PROJECT JOURNEY
  {
    id: 'project_journey',
    name: StudioSection.PROJECT_JOURNEY,
    description: '',
    imageUrl: '',
    projects: []
  },

  // ARCHITECTURE
  {
    id: 'arch',
    name: StudioSection.ARCHITECTURE,
    description: architectureDescription,
    imageUrl: '',
    projects: [ /* ... mantén tus proyectos existentes ... */ ]
  },

  // DESIGN
  {
    id: 'design',
    name: StudioSection.DESIGN,
    description: designPhilosophy,
    imageUrl: '',
    projects: [ /* ... mantén tus proyectos ... */ ]
  },

  // URBANISM
  {
    id: 'urban',
    name: StudioSection.URBANISM,
    description: `<div class="text-black leading-tight">
      <p class="text-lg md:text-xl font-light">We shape urban spaces with strategic planning and design, balancing function, sustainability, and community needs</p>
      <p class="text-xl font-bold pt-6">Our approach:</p>
      <ul class="pt-6 space-y-3 text-base md:text-lg font-light">
        <li>• <span class="font-bold">Masterplanning</span> – Land use, public spaces, green networks, infrastructure, and sustainable strategies</li>
        <li>• <span class="font-bold">Urban Design</span> – From concept to execution, creating cohesive, adaptable, and functional developments</li>
        <li>• <span class="font-bold">Infrastructure coordination</span> – integration of water, energy, telecoms and mobility with work sequencing</li>
        <li>• <span class="font-bold">Sustainability & Community</span> – Integrating environmental, social, and functional considerations</li>
      </ul>
    </div>`,
    imageUrl: '',
    projects: [ /* ... mantén tus proyectos ... */ ]
  },

  // STRUCTURE
  {
    id: 'struct',
    name: StudioSection.STRUCTURE,
    description: `<div class="text-black leading-tight">
      <p class="text-lg md:text-xl font-light">Delivering building systems through the calculation and design of all required installations</p>
      <p class="text-xl font-bold pt-6">Our approach:</p>
      <ul class="pt-6 space-y-2 text-base md:text-lg font-light">
        <li>• <span class="font-bold">Building Services Design</span> – HVAC, plumbing, drainage, fire protection, electrical systems, lighting, and low‑voltage networks, developed from concept through detailed design.</li>
        <li>• <span class="font-bold">MEP Coordination</span> – Spatial planning, clash‑free routing, equipment integration, and construction‑ready layouts aligned with architectural and structural requirements.</li>
        <li>• <span class="font-bold">Systems Integration</span> – Harmonising mechanical, electrical, and public‑health services with energy strategies, smart‑building technologies, and operational needs.</li>
        <li>• <span class="font-bold">Structural Pre‑Design</span> – Preliminary sizing of elements, load assessments, feasibility studies, and coordination with structural engineers to ensure safe, buildable, and cost‑efficient solutions.</li>
      </ul>
    </div>`,
    imageUrl: '',
    projects: [ /* ... mantén tus proyectos ... */ ]
  },

  // PROJECT SUPPORT
  {
    id: 'support',
    name: StudioSection.PROJECT_SUPPORT,
    description: `<div class="text-black leading-tight">
      <p class="text-lg md:text-xl font-light">Through companies such as Sir Robert McAlpine (Logistics & Engineering), Astraseal and Littleman Contracts, the practice has provided precise technical support across a diverse portfolio.</p>
      <p class="text-lg md:text-xl font-light pt-6">We specify mobile and fixed cranes for material delivery, site goods and personnel hoists, and prepare all necessary project documentation for windows and curtain wall systems.</p>
    </div>`,
    imageUrl: '',
    projects: [ /* ... mantén tus proyectos ... */ ]
  },

  // BEHIND DB
  {
    id: 'behinddb',
    name: StudioSection.BEHIND_DB,
    description: `<div class="text-black leading-tight">
      <p class="text-lg md:text-xl font-light">Meet the vision behind DB+ Studio – where architectural clarity meets technical excellence.</p>
      <p class="text-lg md:text-xl font-light pt-6">Founder and Lead Architect David Bonilla doesn't just design buildings. He bridges the gap between creative vision and technical reality. Qualified as an Architect at Master's level (EQF 7 / RQF 7), registered with ARB and RIBA, and holding a UK Master's in BIM Management from Middlesex University, David brings both depth and breadth to every project.</p>
      <p class="text-lg md:text-xl font-light pt-6">That multidisciplinary foundation means he can develop MEP systems for any building type, produce structural pre‑design calculations, and offer specialised urban planning input – all in‑house. The result? Clear, efficient, well‑coordinated solutions where design intent, technical performance, and your goals move forward together.</p>
    </div>`,
    imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770747614/David_B_cytcwp.jpg',
    projects: []
  },

  // ENQUIRY
  {
    id: 'enquiry',
    name: StudioSection.ENQUIRY,
    description: '',
    imageUrl: '',
    projects: []
  }
];

export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter(cat => 
  ![StudioSection.HOME, StudioSection.ENQUIRY, StudioSection.BEHIND_DB].includes(cat.name as StudioSection)
);
