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
  <h2 class="text-3xl md:text-4xl font-light mb-6">Technology</h2>
  
  <p class="text-lg md:text-xl font-light mb-6">
    A contemporary home is more than just a habitable space. It is a complex technological system where the building envelope, energy systems, materials, and climate control converge.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    This section is a living technical resource that will grow over time. Here you will find the latest advances, verified by scientific papers and real‑world evidence, along with practical tools to make informed decisions. Whether you need to choose materials, compare photovoltaic systems, or calculate exact savings, you will get clear, data‑driven answers.
  </p>

  <p class="text-lg md:text-xl font-light mb-6">
    As an architect, I will continuously update this space with new regulations, emerging research, and real‑case insights. My goal is to help you understand not only what works, but exactly how much you can save, and why.
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
  // TECHNOLOGY
  {
    id: 'technology',
    name: StudioSection.TECHNOLOGY,
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
  // ARCHITECTURE (el resto igual, no se modifica)
  // ... (omitido por brevedad, mantenlo igual)
  // Asegúrate de mantener todas las categorías originales.
];

// export const CORE_SERVICE_CATEGORIES ... (sin cambios)
