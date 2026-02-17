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
  <p class="text-lg md:text-xl font-light">DB+ is a full‑service architecture practice and design studio delivering projects from initial concept to full realisation through BIM technology. We combine innovation, functionality, and sustainability to create buildings that inspire and endure.</p>

  <p class="text-xl font-bold pt-6">What we offer</p>
  
  <div class="pt-6">
    <div class="pb-6">
      <p class="text-lg font-bold">• Extensions & Renovations</p>
      <p class="text-base font-light">Enhance comfort, improve spatial flow, and elevate aesthetics through partial or full refurbishments.</p>
    </div>

    <div class="pb-6">
      <p class="text-lg font-bold">• New Build Projects</p>
      <p class="text-base font-light">From single‑family homes to multi‑unit developments, we design efficient, contemporary, and future‑ready residential buildings.</p>
    </div>

    <div>
      <p class="text-lg font-bold">• All Building Types</p>
      <p class="text-base font-light">We provide tailored architectural solutions for any building, ensuring full compliance, optimal performance, and long‑term durability.</p>
    </div>
  </div>
</div>`;

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
        title: '',
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768940290/Irsham_dumpx3.png', 
        category: StudioSection.DESIGN
      },
      {
        id: 'd2',
        title: 'Modern Architectural Vision', 
        location: '',
        year: '',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1769246957/Edit_the_previous_im_f8flks.png', 
        category: StudioSection.DESIGN
      },
      {
        id: 'd4',
        title: '',
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
    imageUrl: undefined, 
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
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770443971/Urbanisation02_z4mn6s.png', 
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770442038/Paviment_1_p5gdl4.png', 
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770451143/Ducts_z8oncn.png' 
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
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1770407387/Gemini_Generated_Image_jo8e2fjo8e2fjo8e_1_y4hvfn.png' 
        ]
      },
      {
        id: 'u8', 
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
        description: 'Technical analysis and calculation of thermal energy transfer within building environments. We provide detailed simulation of heat gains and losses to determine the capacity required for heating and cooling systems.'
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
    description: `<div class="text-black leading-tight">
  <p class="text-lg md:text-xl font-light">Through companies such as Sir Robert McAlpine (Logistics & Engineering), Astraseal and Littleman Contracts, the practice has provided precise technical support across a diverse portfolio.</p>
  <p class="text-lg md:text-xl font-light pt-6">We specify mobile and fixed cranes for material delivery, site goods and personnel hoists, and prepare all necessary project documentation for windows and curtain wall systems.</p>
</div>`,
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
    description: `<div class="text-black leading-tight">
  <p class="text-lg md:text-xl font-light">Meet the vision behind DB+ Studio, where architectural clarity meets technical excellence.</p>
  <p class="text-lg md:text-xl font-light pt-6">Founder and Lead Architect David Bonilla combines design expertise with advanced technical training to guide DB+ from concept to execution. He is qualified as an Architect at Master’s level (EQF 7 / RQF 7), is registered with ARB and RIBA, and holds a UK Master’s in BIM Management from Middlesex University.</p>
  <p class="text-lg md:text-xl font-light pt-6">His training also qualifies him to develop all required MEP systems for any type of building, produce structural calculations used for structural pre‑design, and provide specialised input in urban planning. This multidisciplinary foundation enables him to deliver clear, efficient and well‑coordinated solutions that align design intent with technical performance and client goals.</p>
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

export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter(cat => 
  ![StudioSection.HOME, StudioSection.ENQUIRY, StudioSection.BEHIND_DB].includes(cat.name as StudioSection)
);
