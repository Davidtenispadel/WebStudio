import { Project, CategoryGroup, StudioSection } from './types';

export const designPhilosophy = `<div class="space-y-4 text-black">
  <p class="text-lg md:text-xl font-light leading-relaxed">
    <span class="text-xl md:text-2xl font-bold">DB+ Design</span> is our clear vision, meaningful spatial experience, close client collaboration, sustainable thinking, and a rigorous end‑to‑end design process that ensures every project is coherent, functional, and expressive from concept to completion.
  </p>

  <div class="space-y-0">
    <h3 class="text-xl md:text-2xl font-bold">Vision</h3>
    <p class="text-lg md:text-xl font-light leading-relaxed">We define a strong guiding idea that sets the tone for the entire project, ensuring clarity, consistency, and purposeful design decisions at every stage</p>
  </div>

  <div class="space-y-0">
    <h3 class="text-xl md:text-2xl font-bold">Experience</h3>
    <p class="text-lg md:text-xl font-light leading-relaxed">We craft spaces that feel alive shaped through light, materials, proportion, movement, and atmosphere to enhance how users inhabit and perceive their environment</p>
  </div>

  <div class="space-y-0">
    <h3 class="text-xl md:text-2xl font-bold">Close Client Collaboration</h3>
    <p class="text-lg md:text-xl font-light leading-relaxed">We listen carefully, translate needs into precise solutions, and maintain ongoing dialogue throughout the process so the final result truly reflects the client’s goals</p>
  </div>

  <div class="space-y-0">
    <h3 class="text-xl md:text-2xl font-bold">Sustainable Design</h3>
    <p class="text-lg md:text-xl font-light leading-relaxed">We integrate passive strategies, efficient energy use, responsible materials, and long‑term performance criteria from the earliest design steps to create resilient, future‑proof architecture</p>
  </div>

  <div class="space-y-0">
    <h3 class="text-xl md:text-2xl font-bold">How We Work</h3>
    <p class="text-lg md:text-xl font-light leading-relaxed">Our workflow moves through concept development, design refinement, technical coordination, permit documentation, construction detailing, and site support, ensuring quality, feasibility, and full alignment with the original design intent</p>
  </div>
</div>`;

export const designFocusAreas = `We craft functional, visually compelling environments that reflect your vision.

<span class="text-xl font-bold">Focus areas:</span>
• <span class="text-xl font-bold">Lighting</span> – Interior and exterior strategies to enhance atmosphere and usability.
• <span class="text-xl font-bold">Materials</span> – Selected for durability, aesthetics, and sustainability.
• <span class="text-xl font-bold">Client focused Solutions</span> – Spaces designed to meet your needs while optimising comfort and flow.`;

export const architectureDescription = `<span class="text-xl md:text-2xl font-bold">DB+</span> is a full-service architecture and design studio, delivering <strong>projects from initial concept to full realisation</strong> using BIM technology. We combine <strong>innovation, functionality, and sustainability</strong> to create buildings that inspire and endure.

<span class="text-xl font-bold">What we offer:</span>
• <span class="text-xl font-bold">Extensions & Renovations</span> – Improve comfort, flow, and aesthetics with partial or full refurbishments.
• <span class="text-xl font-bold">New Build Projects</span> – Single-family homes, multi-family developments, and residential blocks.
• <span class="text-xl font-bold">All Building Types</span> – Tailored solutions for any building, ensuring compliance, performance, and long-term quality.`;

export const urbanMasterplanningHeaderDescription = 'Key Urban Projects and Planning.';

export const projectSupportHeaderDescription = 'Specialized Technical Support for Complex Projects.';

export const CATEGORIES: CategoryGroup[] = [
  {
    id: 'home',
    name: StudioSection.HOME,
    description: `Turning ideas into reality, your vision is our purpose...`,
    imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769428801/Polcie_Station_o79qbe.png', 
    projects: [] 
  },
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
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934375/House_Extension_1_msdczt.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Una extensión de vivienda que envuelve la estructura existente, creando espacios fluidos y luminos que se integran armoniosamente con el entorno exterior, redefiniendo la vida moderna.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256227/Proposal_Section_1_eukhba.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256234/Proposal_3d_u184de.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934572/PHOTO-2026-01-20-15-08-45-2_n2j93c.jpg', 
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769254262/Kitchen_4_qsxvpt.jpg', 
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769254262/Kitchen_4_qsxvpt.jpg', 
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256248/Elevation1_xbskva.png',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769256264/Plan_View1_bxocj1.png'
        ]
      },
      {
        id: 'a4', 
        title: 'Detached & Semidetached Houses',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769253155/Semi-detached_hosue_cw3nxk.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Proyectos residenciales enfocados en espacios de vida modernos para viviendas unifamiliares y adosadas, combinando comodidad con principios de diseño contemporáneo.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770298809/Adosadas_mhjmwn.png'
        ]
      },
      {
        id: 'a9',
        title: 'Residential Apartment Block',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768729189/120_Plurifamiliar_house_p44qfg.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Un bloque de apartamentos residenciales diseñado para optimizar la densidad urbana y proporcionar espacios de vida modernos y funcionales.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768731448/120_Plurifamiliar_house_2_ur0hav.png'
        ]
      },
      {
        id: 'a1',
        title: 'Police Station',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769428801/Polcie_Station_o79qbe.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Una instalación de seguridad contemporánea que integra una vibrante presencia cívica con rigor funcional, caracterizada por sus elementos icónicos de fachada roja y una organización espacial precisa.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768642740/Police_Station_4_s0qdrs.png'
        ]
      },
      {
        id: 'a11',
        title: 'Community Centre',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769242331/Enhance_the_realism_bsvkpa.png',
        category: StudioSection.ARCHITECTURE,
        description: 'A modern, multifunctional building with flexible spaces that can adapt to different group sizes and a wide range of activities, designed with good acoustic performance and equipped with the essential services to support community use.',
        useAiInsight: false,
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769246925/centro_civico_1_ysdssk.png'
        ]
      },
      {
        id: 'a10',
        title: 'Office Building',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726361/Edif_Edimar_1_tzg8su.png',
        category: StudioSection.ARCHITECTURE,
        description: 'Un edificio de oficinas moderno que destaca por su diseño funcional y eficiencia espacial, integrando espacios de trabajo contemporáneos con una presencia urbana distintiva.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726518/Edificio_EDIMAR_45_cooijm.jpg'
        ]
      },
      {
        id: 'a5', 
        title: 'Nursery',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768676962/08-07-31_14_vypbmt.jpg', 
        category: StudioSection.ARCHITECTURE,
        description: 'Diseño para una guardería vibrante, creando entornos nutritivos y stimuantes para el desarrollo de la primera infancia con un enfoque en la luz natural y espacios adaptables.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768724382/Interior_int2_j7x72k.png'
        ]
      }
    ]
  },
  {
    id: 'design',
    name: StudioSection.DESIGN,
    description: designPhilosophy,
    projects: [
      {
        id: 'd1',
        title: 'Kinetic Workspace',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768851322/House_Extension_i8awqi.png', 
        category: StudioSection.DESIGN
      },
      {
        id: 'd2',
        title: 'Modern Architectural Vision', 
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769246925/centro_civico_1_ysdssk.png', 
        category: StudioSection.DESIGN
      },
      {
        id: 'd3',
        title: 'Irsham',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768940290/Irsham_dumpx3.png',
        category: StudioSection.DESIGN
      },
      {
        id: 'd4',
        title: 'Design Study I',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768935843/Police_Station_3_rp9gk4.png',
        category: StudioSection.DESIGN
      },
      {
        id: 'd5',
        title: 'Design Study II',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769696194/Police_Station_2_p4fw4q.png',
        category: StudioSection.DESIGN
      }
    ]
  },
  {
    id: 'urban',
    name: StudioSection.URBANISM,
    description: `We shape urban spaces with strategic planning and design, balancing function, sustainability, and community needs

<span class="text-xl font-bold">Our approach:</span>
• <span class="text-xl font-bold">Masterplanning</span> – Land use, public spaces, green networks, infrastructure, and sustainable strategies
• <span class="text-xl font-bold">Urban Design</span> – From concept to execution, creating cohesive, adaptable, and functional developments
• <span class="text-xl font-bold">Infrastructure coordination</span> – integration of water, energy, telecoms and mobility with work sequencing
• <span class="text-xl font-bold">Sustainability & Community</span> – Integrating environmental, social, and functional considerations`,
    imageUrl: undefined, // Removed the main image for the category
    projects: [
      {
        id: 'u3', 
        title: 'Urbanisation Project A',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768755870/Urbanisation3_w24ins.png', 
        category: StudioSection.URBANISM,
        description: 'Planificación y desarrollo urbano integral con múltiples vistas y enfoques, incluyendo pavimentos y diseño paisajístico.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770443971/Urbanisation02_z4mn6s.png', // Moved from u5
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770442038/Paviment_1_p5gdl4.png', // Moved from u4
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770451143/Ducts_z8oncn.png' // New image added here
        ]
      },
      {
        id: 'u6', 
        title: 'Transformer Substation & Urban Park',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770444850/transformer_substation_agnlzu.png',
        category: StudioSection.URBANISM,
        description: 'Diseño e integración paisajística de una subestación transformadora, minimizando su impacto visual en el entorno urbano y rural, complementado con la creación de un parque urbano con elementos de diseño sostenible y espacios multifuncionales para la comunidad.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770407387/Gemini_Generated_Image_jo8e2fjo8e2fjo8e_1_y4hvfn.png' // This image remains here
        ]
      },
      {
        id: 'u8', // New project ID
        title: 'Urbanisation Project C & Sanitation Profiles',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770445675/Urbanisation01_aj7q3o.png',
        category: StudioSection.URBANISM,
        description: 'Diseño urbano con enfoque en la estética y funcionalidad de espacios públicos, incluyendo perfiles detallados para sistemas de saneamiento urbano.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770447568/urban_sanitation_profiles_gtsapv.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770448383/urban_sanitation_profiles_2_ujmjpm.jpg'
        ]
      }
    ]
  },
  {
    id: 'struct',
    name: StudioSection.STRUCTURE,
    description: `Delivering building systems through the calculation and design of all required installations

<span class="text-xl font-bold">Our approach:</span>
• <span class="text-xl font-bold">Building Services Design</span> – HVAC, plumbing, drainage, fire protection, electrical systems, lighting, and low‑voltage networks, developed from concept through detailed design.
• <span class="text-xl font-bold">MEP Coordination</span> – Spatial planning, clash‑free routing, equipment integration, and construction‑ready layouts aligned with architectural and structural requirements.
• <span class="text-xl font-bold">Systems Integration</span> – Harmonising mechanical, electrical, and public‑health services with energy strategies, smart‑building technologies, and operational needs.
• <span class="text-xl font-bold">Structural Pre‑Design</span> – Preliminary sizing of elements, load assessments, feasibility studies, and coordination with structural engineers to ensure safe, buildable, and cost‑efficient solutions.`,
    projects: [
      {
        id: 's4', 
        title: 'Solar thermal panels',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770139360/Designer_2_botwja.png',
        category: StudioSection.STRUCTURE,
        description: 'Our work spans the full spectrum of building‑services engineering and structural pre‑design. The images below highlight the variety of calculations, analyses, and coordinated models we produce, demonstrating the technical depth and precision behind our integrated design approach',
      },
      {
        id: 's6',
        title: 'Water supply calculation',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770140156/Water_u4ztb0.png',
        category: StudioSection.STRUCTURE,
        description: 'Technical calculation and modeling for domestic and commercial water supply systems, ensuring efficiency and regulatory compliance.'
      },
      {
        id: 's7',
        title: 'Foul drainage system',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770140488/Foul_Drainage_System_kybrun.png',
        category: StudioSection.STRUCTURE,
        description: 'Design and sizing of foul water management networks, focusing on flow optimization and environmental safety standards.'
      },
      {
        id: 's8',
        title: 'HVAC',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770140867/HVAC_dnnhqd.png',
        category: StudioSection.STRUCTURE,
        description: 'Comprehensive design and modeling of Heating, Ventilation, and Air Conditioning (HVAC) systems, prioritizing thermal comfort and energy efficiency.'
      },
      {
        id: 's9',
        title: 'PV Systems',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770141242/Electricity_dql4qm.png',
        category: StudioSection.STRUCTURE,
        description: 'Design and implementation of Photovoltaic (PV) systems for sustainable energy generation. We specialize in solar array positioning, energy yield calculations, and integration with building electrical infrastructures.'
      },
      {
        id: 's10',
        title: 'Thermal Load',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770141835/thermal_load_dnffmx.png',
        category: StudioSection.STRUCTURE,
        description: 'Technical analysis and calculation of thermal energy transfer within building environments. We provide detailed simulation of heat gains and losses to determine the precise capacity required for heating and cooling systems.'
      },
      {
        id: 's11',
        title: 'Fire Safety Systems',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770142197/Fire_safe_Systems_naspne.png',
        category: StudioSection.STRUCTURE,
        description: 'Specialized design of integrated fire protection and safety systems. We provide technical planning for detection, alarm, and suppression infrastructures, ensuring full regulatory compliance and maximum occupant safety.'
      },
      {
        id: 's12',
        title: 'Sound Insulation Analysis',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1770143323/sound_insulation_Analisys_g3fg9i.png',
        category: StudioSection.STRUCTURE,
        description: 'Comprehensive acoustic modeling and sound insulation analysis. We evaluate airborne and impact sound transmission to ensure interior comfort and compliance with noise reduction standards - Subject To Engineer Approval -'
      },
      {
        id: 's5', 
        title: 'Complete Structural Calculations – Subject to Engineer Approval',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769257170/Structure_dvq57l.png',
        category: StudioSection.STRUCTURE,
        description: 'Development of preliminary structural schemes and sizing pre-calculations for architectural projects. Our analysis provides the baseline for stability and material optimization, facilitating a smooth transition to final engineering validation.'
      }
    ]
  },
  {
    id: 'support', 
    name: StudioSection.PROJECT_SUPPORT,
    description: "Through companies such as Sir Robert McAlpine (Logistics & Engineering), Astraseal and Littleman Contracts, the practice has provided precise technical support across a diverse portfolio, specifying mobile and fixed cranes for material delivery, siting goods and personnel hoists, and preparing all necessary project documentation for windows and curtain wall systems",
    projects: [
      {
        id: 'ps1',
        title: 'Elizabeth Tower',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768648397/Elisabeth_Tower_xfw0ya.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        additionalImages: [ 
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769798570/WP_20170721_13_54_24_Pro_tkmlws.jpg'
        ]
      },
      {
        id: 'ps4', 
        title: 'U.S. Embassy London',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768668065/EEUU_Londond_Emabassy_apyxqf.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Detailed architectural and structural support for the U.S. Embassy in London, focusing on security and design integrity.'
      },
      {
        id: 'ps5', 
        title: 'Battersea Power Station',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769799148/Battersea_Power_Station_mphsuo.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Comprehensive project support for the iconic Battersea Power Station redevelopment, ensuring historical preservation and modern functionality.'
      },
      {
        id: 'ps6', 
        title: 'Bloomberg Building, London',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769799811/Bloomberg_cbyvac.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Architectural and technical support for the Bloomberg European Headquarters, a landmark project in sustainable office design.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768668856/Bloomberg_2_dxkflf.jpg'
        ]
      },
      {
        id: 'ps7', 
        title: 'Victoria Gate',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769801088/Victoria_Gate_hhox8n.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Project support for Victoria Gate, a significant retail and leisure development known for its intricate architectural facade.'
      },
      {
        id: 'ps8', 
        title: "Chetham's Concert Hall, Manchester",
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769801515/Chetham_s_Concert_Hall_Manachester_nmeifd.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: "Technical project support for Chetham's Concert Hall, Manchester, focusing on acoustics and structural integration within a historic setting."
      },
      {
        id: 'ps9', 
        title: 'London Fruit & Wool Exchange, London',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769802571/London_Fruit_Wool_Exchange._London_l95tke.png',
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Project support for the redevelopment of the historic London Fruit & Wool Exchange, integrating modern design with heritage preservation.'
      },
      {
        id: 'ps10', 
        title: '110 Liverpool Square, London',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768669590/110_Liverpool_Square_g8ndux.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Architectural support for the commercial development at 110 Liverpool Square, London, focusing on contemporary office spaces and urban integration.'
      },
      {
        id: 'ps11', 
        title: 'Chasse Farm Hospital',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768672929/Chase_Farm_Hospital_do7epf.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Structural and BIM support for Chase Farm Hospital, contributing to the modernization of healthcare infrastructure.'
      },
      {
        id: 'ps12', 
        title: 'Victoria Square, Birmingham',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769804578/Victoria_Square._Birmingham_sji346.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Project support for the urban revitalization of Victoria Square in Birmingham, enhancing public spaces and civic engagement.'
      },
      {
        id: 'ps3',
        title: 'Wimbledon Court No. 1',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768650449/Wimbledon_Court_1_n21un7.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Specialized support for the renovation and technical upgrades of Wimbledon Court No. 1.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768650457/Wimbledon_Court_1-2_pp2ft6.jpg',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769784896/Wimbledom_4_gkvyjb.png'
        ]
      },
      {
        id: 'ps2',
        title: 'University of Cambridge',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769695638/Portfolio_David_Bonilla-page-009_m21ffp.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Technical project support and high-precision modeling for the University of Cambridge, ensuring architectural integrity.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769696561/University_of_Cambridge_2_gtx09z.png',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769696573/University_of_Cambridge_3_euj3sq.png',
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1769696585/University_of_Cambridge_6_epzmqk.png'
        ]
      }
    ]
  },
  {
    id: 'behinddb',
    name: StudioSection.BEHIND_DB,
    description: 'Meet the vision behind DB+ Studio, where architectural clarity meets technical excellence. Founder and Lead Architect David Bonilla combines design expertise with advanced technical training to guide DB+ from concept to execution. He is qualified as an Architect at Master’s level (EQF 7 / RQF 7), is registered with ARB and RIBA, and holds a UK Master’s in BIM Management from Middlesex University. His training also qualifies him to develop all required MEP systems for any type of building, produce structural calculations used for structural pre‑design, and provide specialised input in urban planning. This multidisciplinary foundation enables him to deliver clear, efficient and well‑coordinated solutions that align design intent with technical performance and client goals',
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

export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter(cat => 
  ![StudioSection.HOME, StudioSection.ENQUIRY, StudioSection.BEHIND_DB].includes(cat.name as StudioSection)
);