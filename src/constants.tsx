import { Project, CategoryGroup, StudioSection } from './types';

export const isoContent = `... (sin cambios) ...`;

export const designPhilosophy = `... (sin cambios) ...`;

export const architectureDescription = `... (sin cambios) ...`;

export const urbanMasterplanningHeaderDescription = 'Key Urban Projects and Planning.';
export const projectSupportHeaderDescription = 'Specialized Technical Support for Complex Projects.';

/*  
|--------------------------------------------------------------------------
|  ⭐ CATEGORIES COMPLETO + PROJECT JOURNEY AÑADIDO
|--------------------------------------------------------------------------
*/

export const CATEGORIES: CategoryGroup[] = [
  /* ⭐ HOME ⭐ */
  {
    id: 'home',
    name: StudioSection.HOME,
    description: `Turning ideas into reality, your vision is our purpose...`,
    imageUrl:
      'https://res.cloudinary.com/dwealmbfi/image/upload/v1769428801/Polcie_Station_o79qbe.png',
    projects: [],
  },

  /* ⭐ NUEVA SECCIÓN: PROJECT JOURNEY ⭐ */
  {
    id: 'project_journey',
    name: StudioSection.PROJECT_JOURNEY,
    description: "",
    imageUrl: "",
    projects: []
  },

  /* ⭐ ARCHITECTURE ⭐ */
  {
    id: 'arch',
    name: StudioSection.ARCHITECTURE,
    description: architectureDescription,
    projects: [
      {
        id: 'a8',
        title: 'House Extension',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934375/House_Extension_1_msdczt.png',
        category: StudioSection.ARCHITECTURE,
        description:
          'Una extensión de vivienda que envuelve la estructura existente, creando espacios fluidos y luminos que se integran armoniosamente con el entorno exterior, redefiniendo la vida moderna.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256227/Proposal_Section_1_eukhba.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256234/Proposal_3d_u184de.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934572/PHOTO-2026-01-20-15-08-45-2_n2j93c.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769254262/Kitchen_4_qsxvpt.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769254262/Kitchen_4_qsxvpt.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256248/Elevation1_xbskva.png',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256264/Plan_View1_bxocj1.png',
        ],
      },
      {
        id: 'a4',
        title: 'Detached &amp; Semidetached Houses',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769253155/Semi-detached_hosue_cw3nxk.png',
        category: StudioSection.ARCHITECTURE,
        description:
          'Proyectos residenciales enfocados en espacios de vida modernos para viviendas unifamiliares y adosadas, combinando comodidad con principios de diseño contemporáneo.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770298809/Adosadas_mhjmwn.png',
        ],
      },
      {
        id: 'a9',
        title: 'Residential Apartment Block',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768729189/120_Plurifamiliar_house_p44qfg.png',
        category: StudioSection.ARCHITECTURE,
        description:
          'Un bloque de apartamentos residenciales diseñado para optimizar la densidad urbana y proporcionar espacios de vida modernos y funcionales.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768731448/120_Plurifamiliar_house_2_ur0hav.png',
        ],
      },
      {
        id: 'a1',
        title: 'Police Station',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769428801/Polcie_Station_o79qbe.png',
        category: StudioSection.ARCHITECTURE,
        description:
          'Una instalación de seguridad contemporánea que integra una vibrante presencia cívica con rigor funcional, caracterizada por sus elementos icónicos de fachada roja y una organización espacial precisa.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768642740/Police_Station_4_s0qdrs.png',
        ],
      },
      {
        id: 'a11',
        title: 'Community Centre',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769242331/Enhance_the_realism_bsvkpa.png',
        category: StudioSection.ARCHITECTURE,
        description:
          'A modern, multifunctional building with flexible spaces that can adapt to different group sizes and a wide range of activities, designed with good acoustic performance and equipped with the essential services to support community use.',
        useAiInsight: false,
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769246925/centro_civico_1_ysdssk.png',
        ],
      },
      {
        id: 'a10',
        title: 'Office Building',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726361/Edif_Edimar_1_tzg8su.png',
        category: StudioSection.ARCHITECTURE,
        description:
          'Un edificio de oficinas moderno que destaca por su diseño funcional y eficiencia espacial, integrando espacios de trabajo contemporáneos con una presencia urbana distintiva.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726518/Edificio_EDIMAR_45_cooijm.jpg',
        ],
      },
      {
        id: 'a5',
        title: 'Nursery',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768676962/08-07-31_14_vypbmt.jpg',
        category: StudioSection.ARCHITECTURE,
        description:
          'Diseño para una guardería vibrante, creando entornos nutritivos y stimuantes para el desarrollo de la primera infancia con un enfoque en la luz natural y espacios adaptables.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768724382/Interior_int2_j7x72k.png',
        ],
      },
    ],
  },

  /* ⭐ DESIGN ⭐ */
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
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768940290/Irsham_dumpx3.png',
        category: StudioSection.DESIGN,
      },
      {
        id: 'd2',
        title: 'Modern Architectural Vision',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769246957/Edit_the_previous_im_f8flks.png',
        category: StudioSection.DESIGN,
      },
      {
        id: 'd4',
        title: '',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769696194/Police_Station_2_p4fw4q.png',
        category: StudioSection.DESIGN,
      },
    ],
  },

  /* ⭐ URBANISM ⭐ */
  {
    id: 'urban',
    name: StudioSection.URBANISM,
    description: `... (sin cambios) ...`,
    imageUrl: undefined,
    projects: [
      {
        id: 'u3',
        title: 'Urbanisation Project A',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768755870/Urbanisation3_w24ins.png',
        category: StudioSection.URBANISM,
        description:
          'Planificación y desarrollo urbano integral con múltiples vistas y enfoques, incluyendo pavimentos y diseño paisajístico.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770443971/Urbanisation02_z4mn6s.png',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770442038/Paviment_1_p5gdl4.png',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770451143/Ducts_z8oncn.png',
        ],
      },
      {
        id: 'u6',
        title: 'Transformer Substation & Urban Park',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770444850/transformer_substation_agnlzu.png',
        category: StudioSection.URBANISM,
        description:
          'Diseño e integración paisajística de una subestación transformadora, minimizando su impacto visual en el entorno urbano y rural...',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770407387/Gemini_Generated_Image_jo8e2fjo8e2fjo8e_1_y4hvfn.png',
        ], 
      },
      {
        id: 'u8',
        title: 'Urbanisation Project C & Sanitation Profiles',
        location: '',
        year: '',
        imageUrl:
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770445675/Urbanisation01_aj7q3o.png',
        category: StudioSection.URBANISM,
        description:
          'Diseño urbano con enfoque en la estética y funcionalidad de espacios públicos...',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770447568/urban_sanitation_profiles_gtsapv.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770448383/urban_sanitation_profiles_2_ujmjpm.jpg',
        ],
      },
    ],
  },

  /* ⭐ MEP & STRUCTURE ⭐ */
  {
    id: 'struct',
    name: StudioSection.STRUCTURE,
    description: `... (sin cambios) ...`,
    projects: [
      { id: 's4', title: 'Solar thermal panels', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770139360/Designer_2_botwja.png', category: StudioSection.STRUCTURE },
      { id: 's6', title: 'Water supply calculation', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770140156/Water_u4ztb0.png', category: StudioSection.STRUCTURE },
      { id: 's7', title: 'Foul drainage system', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770140488/Foul_Drainage_System_kybrun.png', category: StudioSection.STRUCTURE },
      { id: 's8', title: 'HVAC', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770140867/HVAC_dnnhqd.png', category: StudioSection.STRUCTURE },
      { id: 's9', title: 'PV Systems', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770141242/Electricity_dql4qm.png', category: StudioSection.STRUCTURE },
      { id: 's10', title: 'Thermal Load', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770141835/thermal_load_dnffmx.png', category: StudioSection.STRUCTURE },
      { id: 's11', title: 'Fire Safety Systems', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770142197/Fire_safe_Systems_naspne.png', category: StudioSection.STRUCTURE },
      { id: 's12', title: 'Sound Insulation Analysis', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770143323/sound_insulation_Analisys_g3fg9i.png', category: StudioSection.STRUCTURE },
      { id: 's5', title: 'Complete Structural Calculations – Subject to Engineer Approval', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769257170/Structure_dvq57l.png', category: StudioSection.STRUCTURE },
    ],
  },

  /* ⭐ PROJECT SUPPORT ⭐ */
  {
    id: 'support',
    name: StudioSection.PROJECT_SUPPORT,
    description: `... (sin cambios) ...`,
    projects: [
      { id: 'ps1', title: 'Elizabeth Tower', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768648397/Elisabeth_Tower_xfw0ya.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps4', title: 'U.S. Embassy London', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768668065/EEUU_Londond_Emabassy_apyxqf.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps5', title: 'Battersea Power Station', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769799148/Battersea_Power_Station_mphsuo.png', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps6', title: 'Bloomberg Building, London', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769799811/Bloomberg_cbyvac.png', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps7', title: 'Victoria Gate', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769801088/Victoria_Gate_hhox8n.png', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps8', title: "Chetham's Concert Hall, Manchester", location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769801515/Chetham_s_Concert_Hall_Manachester_nmeifd.png', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps9', title: 'London Fruit & Wool Exchange, London', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769802571/London_Fruit_Wool_Exchange._London_l95tke.png', category: StudioSection.PROJECT_SUPPORT }, 
      { id: 'ps10', title: '110 Liverpool Square, London', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768669590/110_Liverpool_Square_g8ndux.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps11', title: 'Chasse Farm Hospital', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768672929/Chase_Farm_Hospital_do7epf.jpg', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps12', title: 'Victoria Square, Birmingham', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769804578/Victoria_Square._Birmingham_sji346.png', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps3', title: 'Wimbledon Court No. 1', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768650449/Wimbledon_Court_1_n21un7.png', category: StudioSection.PROJECT_SUPPORT },
      { id: 'ps2', title: 'University of Cambridge', location: '', year: '', imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769695638/Portfolio_David_Bonilla-page-009_m21ffp.jpg', category: StudioSection.PROJECT_SUPPORT },
    ],
  },

  /* ⭐ BEHIND DB ⭐ */
  {
    id: 'behinddb',
    name: StudioSection.BEHIND_DB,
    description: `...`,
    imageUrl:
      'https://res.cloudinary.com/dwealmbfi/image/upload/v1770747614/David_B_cytcwp.jpg',
    projects: [],
  },

  /* ⭐ ENQUIRY ⭐ */
  {
    id: 'enquiry',
    name: StudioSection.ENQUIRY,
    description: "",
    projects: [],
  },
];

/* Filtrado para servicios principales */
export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter((cat) =>
  ![
    StudioSection.HOME,
    StudioSection.ENQUIRY,
    StudioSection.BEHIND_DB,
  ].includes(cat.name as StudioSection)
);
