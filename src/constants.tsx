import { Project, CategoryGroup, StudioSection } from './types';

/* ──────────────────────────────────────────────────────────────── */
/*  TEXT BLOCKS                                                     */
/* ──────────────────────────────────────────────────────────────── */

export const isoContent = `
<div class="text-black leading-tight">

  <h3 class="text-xl md:text-2xl font-bold">ISO 19650: Collaborative Work, Clear Information Management, and Fewer Surprises</h3>

  <p class="text-lg md:text-xl font-light pt-6">
    We apply the principles of ISO 19650, the international standard developed in the UK for managing information in BIM‑based projects.<br/>
    For experienced clients, ISO 19650 is familiar territory. But for those who are not aware of it, the benefits are simple and tangible:
  </p>

  <ul class="space-y-1 text-lg md:text-xl font-light pt-6">
    <li>• <span class="font-bold">Everyone works in unison:</span> all teams share the same organised and up‑to‑date information, eliminating misunderstandings.</li>
    <li>• <span class="font-bold">Fewer errors and last‑minute changes:</span> issues are detected early, before construction.</li>
    <li>• <span class="font-bold">Reduced unexpected costs:</span> avoiding mistakes and rework minimises budget deviations.</li>
    <li>• <span class="font-bold">Clear communication and full transparency:</span> clients always know what is happening and why.</li>
    <li>• <span class="font-bold">Better coordination:</span> architects, engineers and contractors collaborate under a unified framework.</li>
  </ul>

  <p class="text-lg md:text-xl font-light italic pt-6">
    ISO 19650 is mandatory in public‑sector projects and highly advantageous in private developments, bringing structure and efficiency to all stakeholders.
  </p>
</div>
`;

export const designPhilosophy = `
<div class="text-black leading-tight">

  <p class="text-lg md:text-xl font-light">
    At DB+ Design & Management, we combine a clear architectural vision, close client collaboration, and a rigorous end‑to‑end design process.
  </p>

  <p class="text-lg md:text-xl font-light pt-6">
    We listen carefully, translate real needs into precise design solutions, and maintain continuous dialogue to ensure alignment with client goals and project context.
  </p>

  <p class="text-lg md:text-xl font-light pt-6">
    Our workflow covers concept development, design refinement, technical coordination, permit documentation, construction detailing, and on‑site support.
  </p>

</div>
`;

export const architectureDescription = `
<div class="text-black leading-tight">

  <p class="text-lg md:text-xl font-light">
    You know what you want: a new home, an extension, or the perfect building for your business.<br/><br/>
    You have ideas, images, references… but the more you explore, the more doubts appear.<br/><br/>
    What would your ideal space really look like?<br/>
    How would it feel to live or work in it?<br/><br/>
    It’s completely normal.<br/><br/>
    The perfect design doesn’t appear out of nowhere — <span class="font-bold">it’s discovered.</span>
  </p>

  <p class="text-xl md:text-2xl font-bold pt-10 text-center">
    That’s where we come in
  </p><br/>

  <p class="text-lg md:text-xl font-light">
    Tell us your needs, your tastes, your lifestyle.<br/>
    We turn all of that into <span class="font-bold">a clear, solid concept tailored just for you.</span>
  </p>

  <p class="text-lg md:text-xl font-light pt-6">
    When the idea is well‑defined, everything else flows naturally.<br/>
    From that moment, bringing it to life becomes almost effortless.
  </p>

  <p class="text-xl md:text-2xl font-bold pt-10 text-center">
    Stop overthinking.<br/>
    Start imagining with us.<br/>
    Your ideal project begins here.
  </p>

  <p class="text-lg md:text-xl font-light pt-10">
    DB+ is a full‑service architecture practice delivering projects from initial concept to full realisation through BIM technology.
  </p>

</div>
`;

/* ──────────────────────────────────────────────────────────────── */
/*  CATEGORY LIST                                                   */
/*  (Project Journey inserted after HOME)                         */
/* ──────────────────────────────────────────────────────────────── */

export const CATEGORIES: CategoryGroup[] = [

  /* HOME */
  {
    id: 'home',
    name: StudioSection.HOME,
    description: `Turning ideas into reality, your vision is our purpose...`,
    imageUrl: '',   // ← vacío para evitar imagen no deseada
    projects: [],
  },

  /* PROJECT JOURNEY (NUEVA) */
  {
    id: 'project_journey',
    name: StudioSection.PROJECT_JOURNEY,
    description: "",
    imageUrl: "",
    projects: []
  },

  /* ARCHITECTURE */
  {
    id: 'arch',
    name: StudioSection.ARCHITECTURE,
    description: architectureDescription,
    // sin imageUrl para evitar imagen duplicada
    projects: [
      {
        id: 'a8',
        title: 'House Extension',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934375/House_Extension_1_msdczt.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Una extensión de vivienda que envuelve la estructura existente...',
        additionalImages: [
          'https://res.cloudinary.com/.../Proposal_Section_1.jpg',
          'https://res.cloudinary.com/.../Proposal_3d.jpg'
        ]
      },
      {
        id: 'a4',
        title: 'Detached & Semidetached Houses',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Semi-detached_house.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Proyectos residenciales enfocados en viviendas unifamiliares...',
        additionalImages: [
          'https://res.cloudinary.com/.../Adosadas.png'
        ]
      },
      {
        id: 'a9',
        title: 'Residential Apartment Block',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/.../Apartment_Block.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Un bloque residencial optimizado para densidad urbana...',
        additionalImages: ['https://res.cloudinary.com/.../Apartment_Block_2.png']
      },
      {
        id: 'a1',
        title: 'Police Station',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/.../Police_Station.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Una instalación de seguridad contemporánea con rigor funcional...',
        additionalImages: [
          'https://res.cloudinary.com/.../Police_Station_4.png'
        ],
      },
      {
        id: 'a11',
        title: 'Community Centre',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/.../Community_Centre.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Centro comunitario con espacios flexibles y diseño contemporáneo.',
        useAiInsight: false,
        additionalImages: ['https://res.cloudinary.com/.../centro_civico.png']
      },
      {
        id: 'a10',
        title: 'Office Building',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Office_Building.png',
        category: StudioSection.ARCHITECTURE,
        description:'Edificio de oficinas moderno con diseño limpio...',
        additionalImages:['https://res.cloudinary.com/.../Office_Building_2.png']
      },
      {
        id: 'a5',
        title: 'Nursery',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Nursery.png',
        category: StudioSection.ARCHITECTURE,
        description:'Guardería con luz natural y espacios adaptables.',
        additionalImages:['https://res.cloudinary.com/.../Interior_nursery.png']
      },
    ]
  },

  /* DESIGN & MANAGEMENT */
  {
    id: 'design',
    name: StudioSection.DESIGN,
    description: designPhilosophy,
    projects: [
      {
        id: 'd1',
        title: '',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Irsham.png',
        category: StudioSection.DESIGN
      },
      {
        id: 'd2',
        title: 'Modern Architectural Vision',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Vision.png',
        category: StudioSection.DESIGN
      },
      {
        id: 'd4',
        title: '',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Police_Station_2.png',
        category: StudioSection.DESIGN
      }
    ]
  },

  /* URBANISM */
  {
    id: 'urban',
    name: StudioSection.URBANISM,
    description: `
      <div class="text-black leading-tight">
        <p class="text-lg md:text-xl font-light">
          We shape urban spaces with strategic planning and design...
        </p>
      </div>
    `,
    projects: [
      {
        id: 'u3',
        title: 'Urbanisation Project A',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../Urbanisation3.png',
        category: StudioSection.URBANISM,
        description:'Planificación y desarrollo urbano integral...',
        additionalImages:[
          'https://res.cloudinary.com/.../Urbanisation02.png',
          'https://res.cloudinary.com/.../Paviment.png'
        ]
      },
      {
        id: 'u6',
        title: 'Transformer Substation & Urban Park',
        location: '',
        year: '',
        imageUrl:'https://res.cloudinary.com/.../transformer.png',
        category: StudioSection.URBANISM,
        description:'Integración paisajística de subestación eléctrica...',
        additionalImages:[
          'https://res.cloudinary.com/.../Gemini_Park.png'
        ]
      },
      {
        id: 'u8',
        title:'Urbanisation Project C & Sanitation Profiles',
        location:'',
        year:'',
        imageUrl:'https://res.cloudinary.com/.../Urbanisation01.png',
        category:StudioSection.URBANISM,
        description:'Diseño urbano centrado en estética y funcionalidad...',
        additionalImages:[
          'https://res.cloudinary.com/.../sanitation_1.jpg'
        ]
      }
    ]
  },

  /* MEP & STRUCTURE */
  {
    id: 'struct',
    name: StudioSection.STRUCTURE,
    description: `
      <div class="text-black leading-tight">
        <p class="text-lg md:text-xl font-light">
          Delivering building systems through the calculation and design of all required installations.
        </p>
      </div>
    `,
    projects: [
      { id: 's4', title:'Solar thermal panels', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Designer_2.png', category: StudioSection.STRUCTURE },
      { id: 's6', title:'Water supply calculation', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Water.png', category: StudioSection.STRUCTURE },
      { id: 's7', title:'Foul drainage system', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Foul_Drainage.png', category: StudioSection.STRUCTURE },
      { id: 's8', title:'HVAC', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../HVAC.png', category: StudioSection.STRUCTURE },
      { id: 's9', title:'PV Systems', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Electricity.png', category: StudioSection.STRUCTURE },
      { id: 's10', title:'Thermal Load', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../thermal_load.png', category: StudioSection.STRUCTURE },
      { id: 's11', title:'Fire Safety Systems', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Fire_safe.png', category: StudioSection.STRUCTURE },
      { id: 's12', title:'Sound Insulation Analysis', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../sound_insulation.png', category: StudioSection.STRUCTURE },
      { id: 's5', title:'Complete Structural Calculations', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Structure.png', category: StudioSection.STRUCTURE }
    ]
  },

  /* PROJECT SUPPORT */
  {
    id: 'support',
    name: StudioSection.PROJECT_SUPPORT,
    description: `
      <div class="text-black leading-tight">
        <p class="text-lg md:text-xl font-light">
          Through companies such as Sir Robert McAlpine, Astraseal and Littleman Contracts...
        </p>
      </div>
    `,
    projects: [
      { id:'ps1', title:'Elizabeth Tower', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Elizabeth_Tower.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps4', title:'U.S. Embassy London', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Embassy.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps5', title:'Battersea Power Station', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Battersea.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps6', title:'Bloomberg Building', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Bloomberg.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps7', title:'Victoria Gate', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Victoria_Gate.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps8', title:"Chetham's Concert Hall", location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Chetham.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps9', title:'London Fruit & Wool Exchange', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Fruit_Wool.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps10', title:'110 Liverpool Square', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Liverpool_Square.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps11', title:'Chasse Farm Hospital', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Chase_Farm.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps12', title:'Victoria Square', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Victoria_Square.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps3', title:'Wimbledon Court No.1', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Wimbledon_1.png', category: StudioSection.PROJECT_SUPPORT },
      { id:'ps2', title:'University of Cambridge', location:'', year:'', imageUrl:'https://res.cloudinary.com/.../Cambridge.png', category: StudioSection.PROJECT_SUPPORT }
    ]
  },

  /* BEHIND DB */
  {
    id: 'behinddb',
    name: StudioSection.BEHIND_DB,
    description: `
      <div class="text-black leading-tight">
        <p class="text-lg md:text-xl font-light">Meet the vision behind DB+ Studio.</p>
      </div>
    `,
    imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770747614/David_B_cytcwp.jpg',
    projects: []
  },

  /* ENQUIRY */
  {
    id: 'enquiry',
    name: StudioSection.ENQUIRY,
    description: "",
    projects: []
  }
];

/* ──────────────────────────────────────────────────────────────── */
/*  FILTERED SERVICES LIST                                          */
/* ──────────────────────────────────────────────────────────────── */

export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter(
  cat =>
    ![
      StudioSection.HOME,
      StudioSection.ENQUIRY,
      StudioSection.BEHIND_DB
    ].includes(cat.name as StudioSection)
);
