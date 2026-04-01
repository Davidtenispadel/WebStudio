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

  <p class="text-lg md:text-xl font-light pt-6">We listen carefully, translate real needs into precise design solutions, and maintain continuous dialogue to ensure that the final outcome reflects both the client’s goals and the project’s technical and urban context.</p>

  <p class="text-lg md:text-xl font-light pt-6">Our workflow covers concept development, design refinement, technical coordination, permit documentation, construction detailing, and on‑site support ensuring feasibility and full alignment with the original design intent.</p>
</div>`;

export const architectureDescription = `<div class="text-black leading-tight">
  <p class="text-lg md:text-xl font-light">
    You know what you want: a new home, an extension, or the perfect building for your business.<br/><br/>
    You have ideas, images, references… but the more you look, the more doubts appear.<br/><br/>
    What would your ideal space really look like? How would it feel to live or work in it? It’s completely normal.<br/><br/>
    The perfect design doesn’t appear out of nowhere, <span class="font-bold">it’s discovered.</span>
  </p>

  <p class="text-xl md:text-2xl font-bold pt-10 text-center">
    That’s where we come in
  </p>
  <br/>

  <p class="text-lg md:text-xl font-light">
    Tell us your needs, your tastes, your lifestyle.<br/>
    We’ll turn all of that into <span class="font-bold">a clear, solid concept tailored just for you</span>.
  </p>

  <p class="text-lg md:text-xl font-light pt-6">
    Because the beginning is the most critical stage:<br/>
    when the idea is well‑defined, everything else flows naturally.<br/>
    From that point on, bringing it to life is almost effortless.
  </p>

  <p class="text-xl md:text-2xl font-bold pt-10 text-center">
    Stop overthinking<br/>
    Start imagining with us<br/>
    Your ideal project begins here
  </p>
  <br/><br/>

  <p class="text-lg md:text-xl font-light pt-6">DB+ is a full‑service architecture practice and design studio delivering projects from initial concept to full realisation through BIM technology. We combine innovation, functionality, and sustainability to create buildings that inspire and endure.</p>

  <p class="text-xl font-bold pt-6">What we offer</p>
  
  <div class="pt-6">
    <div class="pb-6">
      <p class="text-xl font-bold">• Extensions & Renovations</p>
      <p class="text-lg md:text-xl font-light">Enhance comfort, improve spatial flow, and elevate aesthetics through partial or full refurbishments.</p>
    </div>

    <div class="pb-6">
      <p class="text-xl font-bold">• New Build Projects</p>
      <p class="text-lg md:text-xl font-light">From single‑family homes to multi‑unit developments, we design efficient, contemporary, and future‑ready residential buildings.</p>
    </div>

    <div>
      <p class="text-xl font-bold">• All Building Types</p>
      <p class="text-lg md:text-xl font-light">We provide tailored architectural solutions for any building, ensuring full compliance, optimal performance, and long‑term durability.</p>
    </div>
  </div>
</div>`;

export const urbanMasterplanningHeaderDescription = 'Key Urban Projects and Planning.';
export const projectSupportHeaderDescription = 'Specialized Technical Support for Complex Projects.';

/*  
|--------------------------------------------------------------------------
| ⭐ AQUI ESTÁ LA NUEVA PESTAÑA PROJECT JOURNEY (justo después de HOME)
|--------------------------------------------------------------------------
*/

export const CATEGORIES: CategoryGroup[] = [
  {
    id: 'home',
    name: StudioSection.HOME,
    description: `Turning ideas into reality, your vision is our purpose...`,
    imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769428801/Polcie_Station_o79qbe.png',
    projects: []
  },

  /* ⭐ NUEVA SECCIÓN PROJECT JOURNEY ⭐ */
  {
    id: 'project_journey',
    name: StudioSection.PROJECT_JOURNEY,
    description: "",
    imageUrl: "",
    projects: []
  },

  {
    id: 'arch',
    name: StudioSection.ARCHITECTURE,
    description: architectureDescription,
    projects: [
      /* ... todos tus proyectos (sin cambios) ... */
    ]
  },

  /* ... resto de secciones (Design, Urban, Structure, etc.) ... */

  {
    id: 'behinddb',
    name: StudioSection.BEHIND_DB,
    description: `<div class="text-black leading-tight">
      <p class="text-lg md:text-xl font-light">Meet the vision behind DB+ Studio...</p>
    </div>`,
    imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770747614/David_B_cytcwp.jpg',
    projects: []
  },
  {
    id: 'enquiry',
    name: StudioSection.ENQUIRY,
    description: "",
    projects: []
  }
];

/* Filtrado de categorías para otros usos */
export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter(
  cat => ![
    StudioSection.HOME,
    StudioSection.ENQUIRY,
    StudioSection.BEHIND_DB
  ].includes(cat.name as StudioSection)
);
