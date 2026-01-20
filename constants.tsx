
import { Project, CategoryGroup, StudioSection } from './types';

export const CATEGORIES: CategoryGroup[] = [
  {
    id: 'home',
    name: StudioSection.HOME,
    description: "DB+ es un estudio de arquitectura y diseño visionario, comprometido con la creación de espacios excepcionales que resuenan con propósito, belleza e innovación. Integramos una lógica formal rigurosa con experiencias centradas en el ser humano y una gestión ambiental responsable. Exploramos el diálogo entre la forma y la función, la luz y la sombra, para dar vida a proyectos que no solo se construyen, sino que también inspiran y perduran.",
    imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768935843/Police_Station_3_rp9gk4.png', // IMAGEN MOVIDA AQUÍ DESDE 'Modular Living Concept'
    projects: [] // No hay proyectos de galería en la página Home
  },
  {
    id: 'about-us',
    name: StudioSection.ABOUT_US,
    description: "En DB+, creemos que la arquitectura y el diseño van más allá de la estética; son una fusión de ingenio, funcionalidad y un profundo respeto por el entorno. Nuestro estudio se especializa en crear soluciones innovadoras que abordan los desafíos de hoy y se anticipan a las necesidades del mañana, transformando visiones en realidades construidas.",
    imageUrl: 'https://images.unsplash.com/photo-1577701729094-1a9d18e11a3b?auto=format&fit=crop&q=80&w=1200', // Imagen destacada para la página Acerca de Nosotros
    projects: [] // No hay proyectos de galería aquí
  },
  {
    id: 'arch',
    name: StudioSection.ARCHITECTURE,
    description: "Desarrollo de soluciones arquitectónicas que equilibran la lógica formal rigurosa con experiencias espaciales centradas en el ser humano y la gestión ambiental.",
    projects: [
      {
        id: 'a1',
        title: 'Police Station',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768642239/Comisaria_pbvk66.jpg', 
        category: StudioSection.ARCHITECTURE,
        description: 'Una instalación de seguridad contemporánea que integra una vibrante presencia cívica con rigor funcional, caracterizada por sus elementos icónicos de fachada roja y una organización espacial precisa.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768642740/Police_Station_4_s0qdrs.png'
        ]
      },
      {
        id: 'a4', 
        title: 'Detached & Semidetached Houses',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768675585/detached_house_vniopk.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Proyectos residenciales enfocados en espacios de vida modernos para viviendas unifamiliares y adosadas, combinando comodidad con principios de diseño contemporáneo.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768675615/Semi-detached_hosue_cw3nxk.png'
        ]
      },
      {
        id: 'a5', // Nuevo ID para Nursery
        title: 'Nursery',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768676962/08-07-31_14_vypbmt.jpg', 
        category: StudioSection.ARCHITECTURE,
        description: 'Diseño para una guardería vibrante, creando entornos nutritivos y estimulantes para el desarrollo de la primera infancia con un enfoque en la luz natural y espacios adaptables.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768724382/Interior_int2_j7x72k.png'
        ]
      },
      {
        id: 'a6', 
        title: 'Office Building',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726361/Edif_Edimar_1_tzg8su.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Un diseño de edificio de oficinas moderno, que optimiza la eficiencia espacial y fomenta un entorno de trabajo productivo con soluciones arquitectónicas innovadoras y características sostenibles.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768726518/Edificio_EDIMAR_45_cooijm.jpg'
        ]
      },
      {
        id: 'a8', // Nuevo proyecto: Wraparound House Extension
        title: 'House Extension',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934375/House_Extension_1_msdczt.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Una extensión de vivienda que envuelve la estructura existente, creando espacios fluidos y luminosos que se integran armoniosamente con el entorno exterior, redefiniendo la vida moderna.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934375/House_Extension_1_msdczt.png', // Primera imagen adicional (la misma que la principal)
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934572/PHOTO-2026-01-20-15-08-45-2_n2j93c.jpg' // NUEVA IMAGEN ADICIONAL
        ]
      },
      {
        id: 'a7', // Nuevo ID para Residential Building
        title: 'Residential Building',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768729189/120_Plurifamiliar_house_p44qfg.png', 
        category: StudioSection.ARCHITECTURE,
        description: 'Un edificio residencial multifamiliar diseñado con un enfoque en la vida comunitaria, comodidades modernas y la integración en el paisaje urbano.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768731448/120_Plurifamiliar_house_2_ur0hav.png'
        ]
      }
    ]
  },
  {
    id: 'design',
    name: StudioSection.DESIGN,
    description: "Diseño industrial y espacial enfocado en la innovación de materiales y la creación de entornos altamente funcionales y estéticamente cohesivos.",
    projects: [
      {
        id: 'd1',
        title: 'Kinetic Workspace',
        location: 'New York, NY',
        year: '2023',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768851322/House_Extension_i8awqi.png', // IMAGEN MOVIDA AQUI (La "anterior")
        category: StudioSection.DESIGN
      },
      {
        id: 'd2',
        title: 'Modular Living Concept',
        location: 'Berlin, DE',
        year: '2021',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768935843/Police_Station_3_rp9gk4.png', 
        category: StudioSection.DESIGN
      },
      {
        id: 'd3', // NUEVO PROYECTO
        title: 'Abstract Design Study',
        location: 'Studio DB+',
        year: '2024',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768934572/PHOTO-2026-01-20-15-08-45-2_n2j93c.jpg', // NUEVA IMAGEN PARA DISEÑO
        category: StudioSection.DESIGN,
        description: 'Una exploración de las formas, texturas y la luz en un entorno abstracto, demostrando principios fundamentales de diseño.'
      },
      {
        id: 'd4', // Nuevo proyecto: Irchester Road Recovery
        title: 'Irchester Road Recovery',
        location: 'Irchester, UK',
        year: '2020',
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768940290/Irsham_dumpx3.png', // Imagen proporcionada por el usuario
        category: StudioSection.DESIGN,
        description: 'Visualización de un proyecto de recuperación vial, enfocado en la infraestructura y el diseño del paisaje urbano para una integración armoniosa.'
      }
    ]
  },
  {
    id: 'urban',
    name: StudioSection.URBANISM,
    description: "Uso del suelo en la planificación maestra, desarrollo urbano y distribución de redes de servicios, con experiencia en análisis de perfiles, dimensionamiento de redes e integración con sistemas de infraestructura existentes.",
    projects: [
      {
        id: 'u3', // Nuevo ID para Urbanisation
        title: 'Urbanisation',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768755870/Urbanisation3_w24ins.png', 
        category: StudioSection.URBANISM,
        description: 'Planificación y desarrollo urbano integral, centrándose en el crecimiento sostenible, los espacios públicos y la infraestructura eficiente para crear comunidades vibrantes.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768756304/Urbanisation01_aj7q3o.png'
        ]
      }
    ]
  },
  {
    id: 'struct',
    name: StudioSection.STRUCTURE,
    description: "Amplio conocimiento de los sistemas estructurales para anticipar los requisitos espaciales, predimensionar elementos clave y garantizar diseños válidos y precisos desde el principio, evitando la incertidumbre o imprecisión durante el proceso de diseño.",
    projects: [
      {
        id: 's1',
        title: 'Exoskeleton Stadium',
        location: 'London, UK',
        year: '2023',
        imageUrl: 'https://images.unsplash.com/photo-1503387762-592dea58ef21?auto=format&fit=crop&q=80&w=1200',
        category: StudioSection.STRUCTURE
      },
      {
        id: 's2',
        title: 'Tensile Bridge Span',
        location: 'Oslo, NO',
        year: '2024',
        imageUrl: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&q=80&w=1200',
        category: StudioSection.STRUCTURE
      },
      {
        id: 's3', 
        title: 'Concrete Structure',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768758420/Structure_xyqhqp.png', 
        category: StudioSection.STRUCTURE,
        description: 'Diseños estructurales de hormigón innovadores que enfatizan la durabilidad, la integración estética y las técnicas de construcción avanzadas para varios tipos de edificios.'
      }
    ]
  },
  {
    id: 'support', // ID único para Project Support
    name: StudioSection.PROJECT_SUPPORT,
    description: "A través de empresas como Sir Robert McAlpine — dentro de sus Departamentos de Logística e Ingeniería, o Littleman Contract, hemos proporcionado soporte técnico en los siguientes proyectos.",
    projects: [
      {
        id: 'ps1',
        title: 'Elisabeth Tower',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768648397/Elisabeth_Tower_xfw0ya.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Soporte técnico para una torre emblemática, asegurando la integridad estructural y la eficiencia logística desde el concepto hasta la finalización.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768648057/Elisabeth_Tower_oqgdhq.png'
        ]
      },
      {
        id: 'ps2', // Nuevo ID para Bloomberg
        title: 'Bloomberg',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768649349/Bloomberg_cbyvac.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Proporcionó soporte de proyecto para una importante sede corporativa, centrándose en la integración de sistemas complejos y la coordinación del diseño.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768668856/Bloomberg_2_dxkflf.jpg'
        ]
      },
      {
        id: 'ps3', // Nuevo ID para Battersea Power Station
        title: 'Battersea Power Station',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768649981/Battersea_Power_Station_mphsuo.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Soporte integral del proyecto para la icónica remodelación de la Central Eléctrica de Battersea, cubriendo logística, ingeniería e implementación de diseño.'
      },
      {
        id: 'ps4', // Nuevo ID para Wimbledon Court 1
        title: 'Wimbledon Court 1',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768650457/Wimbledon_Court_1-2_pp2ft6.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Soporte arquitectónico y logístico para la instalación de la Pista 1 de Wimbledon, asegurando una operación y mantenimiento sin problemas.',
        additionalImages: [
          'https://res.cloudinary.com/dwealmbfi/image/upload/v1768650449/Wimbledon_Court_1_n21un7.png'
        ]
      },
      {
        id: 'ps5', // Nuevo ID para New EEUU London Embassy
        title: 'New EEUU London Embassy',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768668065/EEUU_Londond_Emabassy_apyxqf.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Experiencia técnica y asistencia en la gestión de proyectos para la construcción de la nueva Embajada de EE. UU. en Londres, centrándose en la seguridad y los requisitos arquitectónicos sofisticados.'
      },
      {
        id: 'ps6', // Nuevo ID para 100 Liverpool Square
        title: '100 Liverpool Square',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768669590/110_Liverpool_Square_g8ndux.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Proporcionó soporte de proyecto para el desarrollo en 100 Liverpool Square, asegurando el cumplimiento de los requisitos estructurales y estéticos para un espacio comercial moderno.'
      },
      {
        id: 'ps7', // Nuevo ID para Victoria Gate
        title: 'Victoria Gate',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768671039/Victoria_Gate_hhox8n.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Asistió en el desarrollo comercial de Victoria Gate, contribuyendo a la realización de un vibrante destino de comercio minorista y ocio.'
      },
      {
        id: 'ps8', // Nuevo ID para London Fruit & Wool Exchange
        title: 'London Fruit & Wool Exchange',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768671589/London_Fruit_Wool_Exchange._London_l95tke.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Soporte de proyecto para la remodelación de London Fruit & Wool Exchange, equilibrando la preservación histórica con las demandas comerciales modernas.'
      },
      {
        id: 'ps9', // Nuevo ID para Chetham\'s Concert Hall, Manchester
        title: "Chetham's Concert Hall, Manchester",
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768672417/Chetham_s_Concert_Hall_Manachester_nmeifd.png', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Proporcionó soporte de proyecto para la Sala de Conciertos de Chetham en Manchester, centrándose en la integración del diseño acústico y el refuerzo estructural para un lugar musical de primer nivel.'
      },
      {
        id: 'ps10', // Nuevo ID para Chase Farm Hospital
        title: 'Chase Farm Hospital',
        location: '', 
        year: '', 
        imageUrl: 'https://res.cloudinary.com/dwealmbfi/image/upload/v1768672929/Chase_Farm_Hospital_do7epf.jpg', 
        category: StudioSection.PROJECT_SUPPORT,
        description: 'Apoyó el desarrollo del Hospital Chase Farm, asegurando un diseño funcional óptimo y la supervisión de la construcción para una instalación de atención médica moderna.'
      }
    ]
  },
  {
    id: 'enquiry',
    name: StudioSection.ENQUIRY,
    description: "Conéctese con nuestro equipo de diseño a través del portal proporcionado.",
    projects: []
  }
];

// Se crea una lista de las categorías de trabajo principales para ser usada en la sección "About Us"
export const CORE_SERVICE_CATEGORIES = CATEGORIES.filter(cat => 
  ![StudioSection.HOME, StudioSection.ABOUT_US, StudioSection.ENQUIRY].includes(cat.name as StudioSection)
);
