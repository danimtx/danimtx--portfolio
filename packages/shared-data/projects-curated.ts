export interface CuratedProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  role: string;
  status: string;
  description: string;
  challenge: string;
  solution: string;
  highlights: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  featuredImage: string;
  galleryImages: string[];
  links?: {
    github?: string;
    demo?: string;
    apk?: string;
    swagger?: string;
  };
}

export interface CuratedExperience {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export interface CuratedAward {
  id: string;
  title: string;
  organization: string;
  period: string;
  rank: string;
  description: string;
  scope: string;
  certificateUrl?: string;
}

/* =========================================================================
   PROYECTOS CURADOS (ESPAÑOL)
   ========================================================================= */
export const CURATED_PROJECTS_ES: CuratedProject[] = [
  {
    id: 'lugares-ocultos-tarija',
    number: '01',
    title: 'Lugares Ocultos de Tarija',
    subtitle: 'App Móvil Offline-First para Rutas Rurales, Cascadas y Gastronomía Local',
    category: 'Mobile App',
    role: 'Creador & Arquitecto Fullstack Mobile',
    status: 'En Desarrollo',
    description:
      'Aplicación móvil diseñada para descubrir y navegar senderos, cascadas, miradores y gastronomía tradicional que no figuran en Google Maps, con navegación y descarga de rutas 100% offline.',
    challenge:
      'La falta de cobertura móvil en zonas montañosas y rurales impide a los visitantes orientarse de forma segura, sumado a la nula cartografía digital de atractivos naturales vírgenes.',
    solution:
      'Arquitectura offline-first en React Native y Expo SDK 54 con MapLibre GL y teselas vectoriales abiertas, sincronización con Supabase (PostgreSQL + PostGIS), gamificación cultural "Pasaporte Chapaco" y botón de emergencia SOS.',
    highlights: [
      'Navegación y mapas vectoriales con funcionamiento 100% offline mediante caché local.',
      'Sistema de gamificación cultural "Pasaporte Chapaco" con sellos, logros y estadísticas de exploración.',
      'Módulo de seguridad SOS con coordenadas de emergencia y hojas de advertencias ecológicas.',
      'Arquitectura escalable bajo Feature-Sliced Design (FSD) y Atomic Design orientada a expansión nacional en Bolivia.'
    ],
    techStack: [
      'React Native',
      'Expo SDK 54',
      'Expo Router',
      'MapLibre GL',
      'Supabase',
      'PostgreSQL / PostGIS',
      'TypeScript'
    ],
    metrics: [
      { label: 'Mapas', value: '100% Offline' },
      { label: 'Alcance', value: 'Tarija & Bolivia' },
      { label: 'Distribución', value: 'Google Play Store' }
    ],
    featuredImage: '/projects/ruta-frutilla/mapa-mapcn.png',
    galleryImages: [
      '/projects/ruta-frutilla/mapa-mapcn.png',
      '/projects/ruta-frutilla/modalParada.png',
      '/projects/ruta-frutilla/animacion de grafica.png'
    ],
    links: {
      demo: '#'
    }
  },
  {
    id: 'cybercorp-task-management',
    number: '02',
    title: 'Cybercorp Task Management',
    subtitle: 'Plataforma Operativa de Cuadrillas Técnicas y Gestión de Servicios en Vivo',
    category: 'Enterprise Web',
    role: 'Desarrollador Fullstack (Prácticas Profesionales)',
    status: 'Completado',
    description:
      'Sistema interno para la coordinación en tiempo real de cuadrillas de técnicos de telecomunicaciones y videovigilancia CCTV, unificando órdenes de servicio, presupuestos y clientes.',
    challenge:
      'La asignación manual de servicios y el seguimiento en papel provocaban retrasos en la respuesta, desorden en las cotizaciones y falta de visibilidad del estado de los trabajos en campo.',
    solution:
      'Desarrollo de una plataforma web en React con Firebase (Firestore en tiempo real y Auth), integrando geolocalización en mapas para asignación de rutas y buscador centralizado de historiales de clientes.',
    highlights: [
      'Monitoreo del ciclo de vida de tickets de soporte en tiempo real (Pendiente, En Ruta, En Progreso, Completado).',
      'Mapeo geográfico de técnicos y órdenes de servicio para optimizar desplazamientos en la ciudad.',
      'Buscador instantáneo de clientes con histórico consolidado de visitas, cotizaciones e inspecciones.',
      'Sustitución total de reportes manuales en papel por un flujo digital verificable.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Firebase Firestore',
      'Firebase Auth',
      'Maps API',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Trazabilidad', value: 'Tiempo Real' },
      { label: 'Reportes en papel', value: '0%' },
      { label: 'Área', value: 'Redes & CCTV' }
    ],
    featuredImage: '/projects/ciber/listarInspeccion.WebP',
    galleryImages: [
      '/projects/ciber/listarInspeccion.WebP',
      '/projects/ciber/crearInspeccion.WebP',
      '/projects/ciber/login.WebP'
    ],
    links: {
      demo: '#'
    }
  },
  {
    id: 'construction-microservices-erp',
    number: '03',
    title: 'Construction Cost & Resource ERP',
    subtitle: 'Arquitectura de Microservicios para Presupuestación Paramétrica y Control de Obras',
    category: 'Backend & Cloud',
    role: 'Arquitecto Backend & Líder Técnico',
    status: 'Completado',
    description:
      'Plataforma empresarial para constructoras que calcula costos paramétricos de edificación (materiales, mano de obra, rendimientos e impuestos) desglosados desde ítems aislados hasta obras completas.',
    challenge:
      'Calcular presupuestos precisos de obra con fórmulas complejas de rendimiento y permitir que el sistema creciera con nuevos módulos empresariales sin acoplar ni comprometer el núcleo de cálculo.',
    solution:
      'Diseño de arquitectura de microservicios con Clean Architecture en .NET (C# / ASP.NET Core), implementando un API Gateway perimetral, servicios independientes de Construcción y Usuarios, y autenticación JWT con RBAC.',
    highlights: [
      'Motor de cotización paramétrica desglosado por materiales, mano de obra, cargas sociales, impuestos y utilidad.',
      'Arquitectura distribuida en microservicios (.NET 10 Web API + API Gateway) lista para escalar sin acoplamiento.',
      'Generación automatizada de reportes ejecutivos de costo y balance de avance de obra.',
      'Liderazgo de equipo: diseño de contratos OpenAPI/Swagger y delegación de tareas a desarrolladores frontend y backend.'
    ],
    techStack: [
      'C# / .NET 10',
      'ASP.NET Core',
      'Clean Architecture',
      'Microservicios',
      'API Gateway',
      'Swagger / OpenAPI',
      'PostgreSQL',
      'React'
    ],
    metrics: [
      { label: 'Arquitectura', value: 'Microservicios' },
      { label: 'Framework', value: '.NET 10' },
      { label: 'Contratos', value: 'OpenAPI' }
    ],
    featuredImage: '/projects/personal-eco/swagguerConstructionAPI.WebP',
    galleryImages: [
      '/projects/personal-eco/swagguerConstructionAPI.WebP',
      '/projects/personal-eco/swagguerUserMangementAPI.WebP',
      '/projects/personal-eco/homeDiseno.WebP'
    ],
    links: {
      swagger: '#'
    }
  },
  {
    id: 'dino-juego-edtech',
    number: '04',
    title: 'Dino Juego ("Di No")',
    subtitle: 'Videojuego Educativo y Cultural para Concurso Nacional Juvenil en Android',
    category: 'Game Dev',
    role: 'Desarrollador de Videojuegos & Lógica (Equipo EZ)',
    status: 'Completado',
    description:
      'Videojuego de plataformas 2D/3D con mensaje social enfocado en la prevención de adicciones y la no discriminación, ambientado en diversas regiones y departamentos de Bolivia.',
    challenge:
      'Desarrollar una experiencia interactiva atractiva para jóvenes que transmita valores de concientización social, garantizando un rendimiento óptimo y estable en dispositivos móviles con recursos limitados.',
    solution:
      'Programación orientada a objetos modular con principios SOLID en C# y Unity Engine, optimizando la gestión de memoria y colisiones para alcanzar 60 FPS estables en Android.',
    highlights: [
      'Niveles temáticos y mapas regionales inspirados en Tarija, Potosí, La Paz, Cochabamba y Pando.',
      'Mecánica lúdica basada en el lema "Di No": toma de decisiones y desafíos educativos.',
      'Optimización exhaustiva para asegurar jugabilidad a 60 FPS en una amplia variedad de smartphones Android.',
      'Clasificación a la segunda fase nacional eliminatoria del concurso.'
    ],
    techStack: [
      'Unity Engine',
      'C#',
      'SOLID Principles',
      'Android SDK / APK',
      'Mobile Optimization'
    ],
    metrics: [
      { label: 'Rendimiento', value: '60 FPS' },
      { label: 'Fase Concurso', value: '2da Ronda Nacional' },
      { label: 'Plataforma', value: 'Android APK' }
    ],
    featuredImage: '/projects/Dino/DinoCochaGame.WebP',
    galleryImages: [
      '/projects/Dino/DinoCochaGame.WebP',
      '/projects/Dino/mapaTarija.WebP',
      '/projects/Dino/seleccicionMapaBolivia.WebP'
    ],
    links: {
      apk: '#'
    }
  },
  {
    id: 'juez-singa-competitive',
    number: '05',
    title: 'JuezSinga',
    subtitle: 'Infraestructura de Juez Virtual para Universidades & Simulación ICPC',
    category: 'Competitive Systems',
    role: 'Creador & Arquitecto de Infraestructura',
    status: 'En Desarrollo',
    description:
      'Plataforma privada de evaluación de código algorítmico diseñada para universidades, campamentos y torneos cerrados, permitiendo simular estrictamente las condiciones de competencias oficiales del ICPC.',
    challenge:
      'Las plataformas públicas no permiten que facultades universitarias administren bancos de problemas privados con infraestructura propia, gestión de cuentas por equipos ni reglas locales de competencia.',
    solution:
      'Integración del motor sandboxed Judge0 CE para evaluación aislada y segura de código (C++, Python, Java) con control de límites TLE/MLE, backend en ASP.NET Core y simulación de scoreboard con freeze.',
    highlights: [
      'Motor de ejecución seguro en sandbox (Judge0 CE) con métricas rigurosas de tiempo de CPU y memoria.',
      'Modo Torneo ICPC: cuentas de equipo, penalizaciones por fallos y congelamiento configurable de la tabla de posiciones.',
      'Gestor de problemas privado para cátedras universitarias y entrenamientos cerrados.',
      'Arquitectura robusta en C# y .NET 9 con proyección de frontend moderno en React.'
    ],
    techStack: [
      'C# / ASP.NET Core',
      '.NET 9 / .NET 10',
      'Judge0 CE',
      'Docker & Sandboxing',
      'PostgreSQL',
      'React'
    ],
    metrics: [
      { label: 'Motor Sandboxed', value: 'Judge0 CE' },
      { label: 'Reglamento', value: 'Estilo ICPC' },
      { label: 'Lenguajes', value: 'C++, Python, Java' }
    ],
    featuredImage: '/projects/JuezSinga/swguerJuezSinga.png',
    galleryImages: [
      '/projects/JuezSinga/swguerJuezSinga.png'
    ],
    links: {
      swagger: '#'
    }
  }
];

/* =========================================================================
   CURATED PROJECTS (ENGLISH)
   ========================================================================= */
export const CURATED_PROJECTS_EN: CuratedProject[] = [
  {
    id: 'lugares-ocultos-tarija',
    number: '01',
    title: 'Hidden Gems of Tarija',
    subtitle: 'Offline-First Mobile App for Rural Trails, Waterfalls & Local Gastronomy',
    category: 'Mobile App',
    role: 'Creator & Fullstack Mobile Architect',
    status: 'Active Development',
    description:
      'Cross-platform mobile application designed to discover and navigate rural trails, waterfalls, natural pools, viewpoints, and traditional gastronomy omitted from Google Maps, with 100% offline route downloads.',
    challenge:
      'Total lack of mobile network coverage in mountain and rural regions prevents hikers from navigating safely, compounded by zero existing digital mapping of virgin natural attractions.',
    solution:
      'Offline-first architecture built in React Native and Expo SDK 54 with MapLibre GL open vector tiles, Supabase synchronization (PostgreSQL + PostGIS), cultural gamification ("Pasaporte Chapaco"), and an emergency SOS coordinate trigger.',
    highlights: [
      'Vector map navigation with 100% offline functionality via local caching.',
      'Cultural gamification system ("Pasaporte Chapaco") with exploration stamps, levels, and stats.',
      'Emergency SOS module with GPS coordinates and community ecological warnings.',
      'Feature-Sliced Design (FSD) and Atomic Design structure built for nationwide expansion in Bolivia.'
    ],
    techStack: [
      'React Native',
      'Expo SDK 54',
      'Expo Router',
      'MapLibre GL',
      'Supabase',
      'PostgreSQL / PostGIS',
      'TypeScript'
    ],
    metrics: [
      { label: 'Maps', value: '100% Offline' },
      { label: 'Scope', value: 'Tarija & Bolivia' },
      { label: 'Release', value: 'Google Play Store' }
    ],
    featuredImage: '/projects/ruta-frutilla/mapa-mapcn.png',
    galleryImages: [
      '/projects/ruta-frutilla/mapa-mapcn.png',
      '/projects/ruta-frutilla/modalParada.png',
      '/projects/ruta-frutilla/animacion de grafica.png'
    ],
    links: {
      demo: '#'
    }
  },
  {
    id: 'cybercorp-task-management',
    number: '02',
    title: 'Cybercorp Task Management',
    subtitle: 'Field Crew Operations Portal & Real-Time Service Tracking System',
    category: 'Enterprise Web',
    role: 'Fullstack Developer (Professional Internship)',
    status: 'Completed',
    description:
      'Internal operational platform for real-time dispatch and tracking of technical crews handling CCTV surveillance and telecommunications network deployments, centralizing work orders and client budgets.',
    challenge:
      'Manual dispatching and paper-based tracking caused response bottlenecks, misorganized client quotes, and zero real-time operational visibility into field technician statuses.',
    solution:
      'Built a responsive web platform in React with Firebase (real-time Firestore and Auth), incorporating interactive map geolocation for technician assignments and centralized client record lookups.',
    highlights: [
      'Real-time support ticket lifecycle tracking (Pending, En Route, In Progress, Completed).',
      'Geographical dispatch mapping for technicians to minimize urban transit time.',
      'Instant customer directory with consolidated history of visits, estimates, and inspections.',
      'Complete replacement of paper logs with an auditable, real-time digital workflow.'
    ],
    techStack: [
      'React',
      'TypeScript',
      'Firebase Firestore',
      'Firebase Auth',
      'Maps API',
      'Tailwind CSS'
    ],
    metrics: [
      { label: 'Tracking', value: 'Real-Time' },
      { label: 'Paper Logs', value: '0%' },
      { label: 'Domain', value: 'Networks & CCTV' }
    ],
    featuredImage: '/projects/ciber/listarInspeccion.WebP',
    galleryImages: [
      '/projects/ciber/listarInspeccion.WebP',
      '/projects/ciber/crearInspeccion.WebP',
      '/projects/ciber/login.WebP'
    ],
    links: {
      demo: '#'
    }
  },
  {
    id: 'construction-microservices-erp',
    number: '03',
    title: 'Construction Cost & Resource ERP',
    subtitle: 'Microservices Architecture for Parametric Budgeting & Job-Site Control',
    category: 'Backend & Cloud',
    role: 'Backend Architect & Tech Lead',
    status: 'Completed',
    description:
      'Enterprise platform for general contractors that calculates parametric building costs (materials, labor yields, overhead, and taxes) broken down from discrete work items to complete projects.',
    challenge:
      'Calculating rigorous construction budgets with complex yield formulas while allowing seamless modular growth without coupling or compromising the core calculation engine.',
    solution:
      'Architected a distributed microservices platform following Clean Architecture in .NET (C# / ASP.NET Core), featuring a perimeter API Gateway, independent Construction and User services, and JWT RBAC authentication.',
    highlights: [
      'Parametric quotation engine broken down by materials, labor, social benefits, taxes, and utility margins.',
      'Distributed microservices architecture (.NET 10 Web API + API Gateway) designed for zero coupling.',
      'Automated executive cost reporting and real-time project progress balance sheets.',
      'Technical leadership: OpenAPI/Swagger contract design and task delegation across frontend and backend engineers.'
    ],
    techStack: [
      'C# / .NET 10',
      'ASP.NET Core',
      'Clean Architecture',
      'Microservices',
      'API Gateway',
      'Swagger / OpenAPI',
      'PostgreSQL',
      'React'
    ],
    metrics: [
      { label: 'Architecture', value: 'Microservices' },
      { label: 'Framework', value: '.NET 10' },
      { label: 'Contracts', value: 'OpenAPI' }
    ],
    featuredImage: '/projects/personal-eco/swagguerConstructionAPI.WebP',
    galleryImages: [
      '/projects/personal-eco/swagguerConstructionAPI.WebP',
      '/projects/personal-eco/swagguerUserMangementAPI.WebP',
      '/projects/personal-eco/homeDiseno.WebP'
    ],
    links: {
      swagger: '#'
    }
  },
  {
    id: 'dino-juego-edtech',
    number: '04',
    title: 'Dino Game ("Di No")',
    subtitle: 'Educational & Cultural Video Game for National Youth Competition on Android',
    category: 'Game Dev',
    role: 'Game & Logic Developer (EZ Team)',
    status: 'Completed',
    description:
      '2D/3D platformer game carrying a strong social message focused on substance abuse prevention and anti-discrimination, set across regional Bolivian landscapes.',
    challenge:
      'Developing an engaging interactive experience for teenagers conveying social awareness, while ensuring rock-solid performance on low-spec mobile hardware.',
    solution:
      'Modular object-oriented development applying SOLID principles in C# and Unity Engine, optimizing memory allocations and physics colliders to achieve a stable 60 FPS on Android.',
    highlights: [
      'Thematic regional levels inspired by Tarija, Potosí, La Paz, Cochabamba, and Pando.',
      'Interactive mechanics centered on positive decision-making and educational challenges.',
      'Exhaustive profiling ensuring smooth 60 FPS gameplay across diverse Android devices.',
      'Qualified to the second national elimination stage in the national competition.'
    ],
    techStack: [
      'Unity Engine',
      'C#',
      'SOLID Principles',
      'Android SDK / APK',
      'Mobile Optimization'
    ],
    metrics: [
      { label: 'Performance', value: '60 FPS' },
      { label: 'Contest Stage', value: '2nd National Round' },
      { label: 'Platform', value: 'Android APK' }
    ],
    featuredImage: '/projects/Dino/DinoCochaGame.WebP',
    galleryImages: [
      '/projects/Dino/DinoCochaGame.WebP',
      '/projects/Dino/mapaTarija.WebP',
      '/projects/Dino/seleccicionMapaBolivia.WebP'
    ],
    links: {
      apk: '#'
    }
  },
  {
    id: 'juez-singa-competitive',
    number: '05',
    title: 'JuezSinga',
    subtitle: 'Virtual Online Judge Infrastructure for Universities & ICPC Simulation',
    category: 'Competitive Systems',
    role: 'Creator & Infrastructure Architect',
    status: 'Active Development',
    description:
      'Private algorithmic contest judge designed for universities, training camps, and closed collegiate tournaments, accurately simulating official ACM-ICPC contest conditions.',
    challenge:
      'Public platforms prevent academic departments from hosting private problem banks with on-premise infrastructure, team-based account management, or local competition rules.',
    solution:
      'Integrated the Judge0 CE sandboxed execution engine for safe code evaluation (C++, Python, Java) with strict TLE/MLE boundaries, ASP.NET Core backend, and frozen scoreboard simulation.',
    highlights: [
      'Sandboxed code evaluation (Judge0 CE) with rigorous CPU time and memory benchmarking.',
      'Official ICPC contest mode: team credentials, penalty tracking, and configurable scoreboard freeze.',
      'Private problem setter module for university faculties and collegiate team practice.',
      'High-performance backend in C# / .NET 9 with planned reactive frontend in React.'
    ],
    techStack: [
      'C# / ASP.NET Core',
      '.NET 9 / .NET 10',
      'Judge0 CE',
      'Docker & Sandboxing',
      'PostgreSQL',
      'React'
    ],
    metrics: [
      { label: 'Sandbox Engine', value: 'Judge0 CE' },
      { label: 'Rule Set', value: 'ICPC Standard' },
      { label: 'Languages', value: 'C++, Python, Java' }
    ],
    featuredImage: '/projects/JuezSinga/swguerJuezSinga.png',
    galleryImages: [
      '/projects/JuezSinga/swguerJuezSinga.png'
    ],
    links: {
      swagger: '#'
    }
  }
];

/* Default alias for backward compatibility */
export const CURATED_PROJECTS: CuratedProject[] = CURATED_PROJECTS_ES;


/* =========================================================================
   EXPERIENCIA LABORAL Y PROFESIONAL (ESPAÑOL)
   ========================================================================= */
export const CURATED_EXPERIENCE_ES: CuratedExperience[] = [
  {
    id: 'lugares-ocultos',
    role: 'Desarrollador Fullstack & Móvil',
    company: 'Lugares Ocultos de Tarija',
    type: 'Autónomo / Startup',
    period: 'Dic. 2025 - Actualidad · 10 meses',
    location: 'Tarija, Bolivia · En remoto',
    bullets: [
      'Diseño end-to-end e implementación de una aplicación móvil turística en React Native (Expo) para el mapeo inteligente de destinos, rutas y recomendaciones gastronómicas.',
      'Modelado y optimización de base de datos relacional en PostgreSQL para consultas geoespaciales y almacenamiento eficiente de contenido multimedia.',
      'Implementación de arquitectura por capas para garantizar modularidad, navegación offline sin conexión y proyección nacional en Bolivia.'
    ],
    stack: [
      'React Native',
      'Expo SDK 54',
      'PostgreSQL',
      'Supabase',
      'MapLibre GL',
      'PostGIS',
      'FSD Architecture'
    ]
  },
  {
    id: 'ted',
    role: 'Técnico de Información Computarizada',
    company: 'Tribunal Electoral Departamental de Tarija',
    type: 'Funcionario Temporal',
    period: 'Ago. 2025 · 1 mes',
    location: 'Tarija, Bolivia · Presencial',
    bullets: [
      'Administración y operación del sistema de información computarizado para la validación de datos durante las Elecciones Nacionales 2025 (ODS N 424/2025).',
      'Verificación de datos electorales en tiempo real, determinando estados de habilitación y resolviendo discrepancias en el registro de votantes.',
      'Soporte técnico de primer nivel para la orientación ciudadana y derivación de casos especiales según normativa electoral.'
    ],
    stack: [
      'Validación en Tiempo Real',
      'Operación de Bases de Datos',
      'Respuesta a Incidentes',
      'Sistemas Electorales'
    ]
  },
  {
    id: 'cybercorp',
    role: 'Desarrollador de Software & Soporte TI (Prácticas)',
    company: 'CYBERCORP S.R.L.',
    type: 'Contrato de Formación / Prácticas',
    period: 'Ene. 2025 - Feb. 2025 · 2 meses',
    location: 'Tarija, Bolivia · Presencial',
    bullets: [
      'Diseño e implementación de un sistema interno fullstack para la asignación, seguimiento y control de estado de tareas del personal técnico, optimizando los tiempos de respuesta y visibilidad operativa.',
      'Modelado y administración de base de datos en Firebase para gestión de usuarios, roles, órdenes de trabajo y métricas de cumplimiento.',
      'Planificación e instalación de infraestructura de videovigilancia CCTV y cámaras de seguridad IP con configuración de red, direccionamiento IP y acceso remoto seguro.'
    ],
    stack: [
      'React',
      'Firebase Firestore',
      'Tailwind CSS',
      'C# / .NET',
      'Redes IP & CCTV'
    ]
  }
];

/* =========================================================================
   PROFESSIONAL EXPERIENCE (ENGLISH)
   ========================================================================= */
export const CURATED_EXPERIENCE_EN: CuratedExperience[] = [
  {
    id: 'lugares-ocultos',
    role: 'Fullstack & Mobile Developer',
    company: 'Lugares Ocultos de Tarija',
    type: 'Self-employed / Startup',
    period: 'Dec. 2025 - Present · 10 mos',
    location: 'Tarija, Bolivia · Remote',
    bullets: [
      'End-to-end design and implementation of a tourism mobile application in React Native (Expo) for intelligent mapping of destinations, trails, and culinary spots.',
      'Relational database modeling and optimization in PostgreSQL for geospatial queries and efficient media content storage.',
      'Layered architecture implementation guaranteeing modularity, offline caching resilience, and nationwide scalability across Bolivia.'
    ],
    stack: [
      'React Native',
      'Expo SDK 54',
      'PostgreSQL',
      'Supabase',
      'MapLibre GL',
      'PostGIS',
      'FSD Architecture'
    ]
  },
  {
    id: 'ted',
    role: 'Computerized Information Systems Technician',
    company: 'Tribunal Electoral Departamental de Tarija',
    type: 'Temporary Official',
    period: 'Aug. 2025 · 1 mo',
    location: 'Tarija, Bolivia · On-site',
    bullets: [
      'Administered and operated the computerized information system for data validation during the 2025 National Elections (ODS N 424/2025).',
      'Real-time verification of electoral records, determining voter eligibility status and resolving database discrepancies under high scrutiny.',
      'First-level technical support for citizen guidance and referral of special regulatory cases according to electoral law.'
    ],
    stack: [
      'Real-Time Validation',
      'Database Operations',
      'Incident Response',
      'Electoral Systems'
    ]
  },
  {
    id: 'cybercorp',
    role: 'Software Developer & IT Support (Internship)',
    company: 'CYBERCORP S.R.L.',
    type: 'Internship / Apprenticeship',
    period: 'Jan. 2025 - Feb. 2025 · 2 mos',
    location: 'Tarija, Bolivia · On-site',
    bullets: [
      'Designed and implemented an internal fullstack system for task assignment, tracking, and status monitoring for technical staff, optimizing response times and operations.',
      'Modeled and administered the NoSQL database in Firebase for user control, roles, work orders, and support compliance metrics.',
      'Planned and installed CCTV video surveillance infrastructure and IP security cameras with local network configuration, IP addressing, and secure remote access.'
    ],
    stack: [
      'React',
      'Firebase Firestore',
      'Tailwind CSS',
      'C# / .NET',
      'IP Networks & CCTV'
    ]
  }
];

/* Default alias for backward compatibility */
export const CURATED_EXPERIENCES: CuratedExperience[] = CURATED_EXPERIENCE_ES;


/* =========================================================================
   LOGROS COMPETITIVOS & PREMIOS (ACM-ICPC & IEEEXtreme)
   ========================================================================= */
export const CURATED_AWARDS_ES: CuratedAward[] = [
  {
    id: 'icpc-2025',
    title: 'ACM-ICPC Finalista Regional Sudamérica',
    organization: 'ICPC (International Collegiate Programming Contest)',
    period: '2025',
    rank: 'Top 20 Bolivia',
    description:
      'Clasificación a la Final Regional de Sudamérica como parte del Equipo RISE (UPDS Tarija). Resolución de problemas algorítmicos complejos bajo presión en C++.',
    scope: 'Regional Sudamérica',
    certificateUrl: '/certificados/ICPC-2025.webp'
  },
  {
    id: 'ieeextreme-18',
    title: 'IEEEXtreme 18.0 Programming Competition',
    organization: 'IEEE (Institute of Electrical and Electronics Engineers)',
    period: 'Octubre 2024',
    rank: 'Top 6 Bolivia (+19,000 participantes globales)',
    description:
      'Competencia mundial virtual de 24 horas continuas de programación y algoritmos avanzados en equipo.',
    scope: 'Mundial / Bolivia',
    certificateUrl: '/certificados/ieee18.png'
  },
  {
    id: 'icpc-2024',
    title: 'ACM-ICPC Finalista Regional Sudamérica',
    organization: 'ICPC (International Collegiate Programming Contest)',
    period: '2024',
    rank: 'Finalista Regional',
    description:
      'Participación destacada en la fase eliminatoria sudamericana representando a la Universidad Autónoma Juan Misael Saracho (Equipo Dijkstraidos).',
    scope: 'Regional Sudamérica'
  }
];

export const CURATED_AWARDS_EN: CuratedAward[] = [
  {
    id: 'icpc-2025',
    title: 'ACM-ICPC South America Regional Finalist',
    organization: 'ICPC (International Collegiate Programming Contest)',
    period: '2025',
    rank: 'Top 20 Bolivia',
    description:
      'Qualified to the South America Regional Finals representing RISE Team (UPDS Tarija). Competitive algorithmic problem solving in C++ under tight contest time limits.',
    scope: 'South America Regional',
    certificateUrl: '/certificados/ICPC-2025.webp'
  },
  {
    id: 'ieeextreme-18',
    title: 'IEEEXtreme 18.0 Programming Competition',
    organization: 'IEEE (Institute of Electrical and Electronics Engineers)',
    period: 'October 2024',
    rank: 'Top 6 Bolivia (+19,000 global participants)',
    description:
      'Worldwide 24-hour non-stop team programming challenge solving complex algorithmic problems.',
    scope: 'Global / Bolivia',
    certificateUrl: '/certificados/ieee18.png'
  },
  {
    id: 'icpc-2024',
    title: 'ACM-ICPC South America Regional Finalist',
    organization: 'ICPC (International Collegiate Programming Contest)',
    period: '2024',
    rank: 'Regional Finalist',
    description:
      'Regional qualifier performance representing Juan Misael Saracho Autonomous University (Dijkstraidos Team).',
    scope: 'South America Regional'
  }
];

export const CURATED_AWARDS: CuratedAward[] = CURATED_AWARDS_ES;
