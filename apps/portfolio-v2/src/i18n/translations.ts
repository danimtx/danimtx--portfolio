export interface TranslatedProject {
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

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  location: string;
  bullets: string[];
  stack: string[];
}

export const translations = {
  en: {
    nav: {
      role: 'Systems & Software Engineer',
      home: 'Home',
      experience: 'Experience',
      services: 'Services',
      projects: 'Projects',
      icpc: 'ICPC & Awards',
      process: 'Process',
      cv: 'CV (EN)',
      talk: "Let's Talk"
    },
    hero: {
      greeting: "Hey 👋 I'm danimtx",
      title1: 'Software Engineer &',
      title2: 'System Architect',
      description: 'Systems Engineer specialized in robust microservices with .NET 10, offline-first mobile apps with React Native, and high-level algorithmic problem solving as a 2x ACM-ICPC Regional Finalist.',
      ctaWork: "Let's Work Together",
      ctaProjects: 'Explore Projects',
      stackLabel: 'Core Stack:',
      metric1Value: '2x',
      metric1Label: 'ACM-ICPC South America Finalist',
      metric2Value: 'Top 6',
      metric2Label: 'IEEEXtreme 18.0 Bolivia (+19k Global)',
      metric3Value: '5+',
      metric3Label: 'Key Production Projects Delivered',
      metric4Value: '3+',
      metric4Label: 'Years Building Scalable Software',
      photoBadgeTitle: 'danimtx // Stealth Core',
      photoBadgeSub: 'Feline Precision & Algorithmic Focus'
    },
    intro: {
      availability: 'Available for projects & full-time roles',
      p1: 'Welcome to my portfolio! I am ',
      boldName: 'danimtx (Daniel Mancilla)',
      p2: ', a software engineer passionate about ',
      boldArch: 'clean architecture and distributed systems',
      p3: '. I combine algorithmic rigor forged in ACM-ICPC with real production solutions: from scalable microservices with .NET to offline-first mobile apps with React Native.',
      linkText: 'Explore professional trajectory'
    },
    experience: {
      tag: 'Career & Trajectory',
      title: 'Professional Experience',
      description: 'Proven track record designing offline-first mobile systems, mission-critical electoral validation architectures, and field operations enterprise software.',
      items: [
        {
          id: 'lugares-ocultos',
          role: 'Fullstack & Mobile Developer',
          company: 'Lugares Ocultos de Tarija',
          type: 'Self-employed / Startup',
          period: 'Dec. 2025 - Present · Active',
          location: 'Tarija, Bolivia · Remote',
          bullets: [
            'End-to-end design and implementation of a tourism mobile application in React Native (Expo) for intelligent mapping of destinations, trails, and culinary spots.',
            'Relational database modeling and optimization in PostgreSQL for geospatial queries and efficient media content storage.',
            'Layered architecture implementation guaranteeing modularity, offline caching resilience, and nationwide scalability across Bolivia.'
          ],
          stack: ['React Native', 'Expo SDK 54', 'PostgreSQL', 'Supabase', 'MapLibre GL', 'PostGIS', 'FSD']
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
          stack: ['Real-Time Validation', 'Database Operations', 'Incident Response', 'Electoral Systems']
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
          stack: ['React', 'Firebase Firestore', 'Tailwind CSS', 'C# / .NET', 'IP Networks & CCTV']
        }
      ]
    },
    services: {
      tag: 'Capabilities & Expertise',
      title: 'My Core Areas of Expertise',
      description: 'I design and build end-to-end software solutions: from mathematical data modeling and microservices to responsive mobile interfaces with rock-solid performance.',
      activeBadge: 'Active Specialization',
      techLabel: 'Key Technologies:',
      items: [
        {
          id: 'mobile',
          number: '01',
          title: 'Mobile Apps & Offline-First Systems',
          shortDesc: 'Reactive mobile applications with 100% offline navigation, geospatial queries, and resilient cloud sync.',
          fullDesc: 'End-to-end mobile engineering with React Native and Expo SDK 54. Specialized in offline-first caching, vector tile rendering (MapLibre GL / OpenStreetMap), PostGIS spatial schemas, and background synchronization via Supabase.',
          tech: ['React Native', 'Expo SDK 54', 'MapLibre GL', 'Supabase', 'PostGIS', 'FSD Architecture'],
          metrics: ['100% Offline Navigation', '60 FPS Smooth UI', 'Geospatial Querying'],
          previewImage: '/projects/ruta-frutilla/mapa-mapcn.png',
          previewTitle: 'Hidden Gems of Tarija — Mobile Architecture'
        },
        {
          id: 'backend',
          number: '02',
          title: 'Backend Architecture & Microservices',
          shortDesc: 'Distributed systems built in C# .NET 10 adhering to Clean Architecture, API Gateways, and OpenAPI standards.',
          fullDesc: 'Designing enterprise backend architectures built for decoupling and continuous modular expansion. Implementing Clean Architecture, CQRS patterns, perimeter JWT authentication with RBAC, relational data modeling in PostgreSQL and SQL Server, and YARP/Ocelot API Gateways.',
          tech: ['C# / .NET 10', 'ASP.NET Core Web API', 'Clean Architecture', 'Microservices', 'PostgreSQL', 'Swagger'],
          metrics: ['High Concurrency', 'OpenAPI Contracts', 'Optimized Relational DB'],
          previewImage: '/projects/personal-eco/swagguerConstructionAPI.WebP',
          previewTitle: 'Construction Cost ERP — Microservices API Gateway'
        },
        {
          id: 'frontend',
          number: '03',
          title: 'Modern Frontend & High-Performance UI',
          shortDesc: 'Modern web applications built with React, TypeScript, and Tailwind CSS with editorial design and speed.',
          fullDesc: 'Crafting high-precision interfaces with distinctive visual hierarchy and measurable Core Web Vitals performance. Real-time dashboards with WebSockets and Firebase, field operations portals, and fully accessible cross-device layouts.',
          tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Firebase Firestore', 'Vite', 'Responsive UX'],
          metrics: ['Lighthouse 95+', 'Real-Time Sync', 'Modular Components'],
          previewImage: '/projects/ciber/listarInspeccion.WebP',
          previewTitle: 'Cybercorp Task Management — Field Operations Portal'
        },
        {
          id: 'competitive',
          number: '04',
          title: 'Evaluation Engines & Algorithmic Design',
          shortDesc: 'Integration of sandboxed code runners (Judge0 CE) and solving high-complexity algorithmic challenges.',
          fullDesc: 'Proven analytical thinking backed by 2 consecutive regional finals appearances in the ACM-ICPC. Architecture of automated, sandboxed code evaluators running inside isolated Docker containers with strict CPU, memory, and time limit controls.',
          tech: ['Judge0 CE', 'Docker Sandboxing', 'C++', 'Python', 'Graphs & Flows', 'ICPC Simulation'],
          metrics: ['2x South America Finalist', 'Docker Isolation', 'Scoreboard with Freeze'],
          previewImage: '/projects/JuezSinga/swguerJuezSinga.png',
          previewTitle: 'JuezSinga — Sandboxed Evaluation Engine'
        }
      ]
    },
    projects: {
      tag: 'Curated Key Projects',
      title: 'Engineering & Architecture Showcase',
      description: '100% verified technical work: projects featuring clean architecture, solved engineering challenges, and measurable results.',
      filters: [
        { id: 'all', label: 'All Projects (5)' },
        { id: 'mobile', label: 'Mobile & Offline-First' },
        { id: 'backend', label: 'Backend & Microservices' },
        { id: 'enterprise', label: 'Web & Operations' },
        { id: 'game', label: 'Game Dev' },
        { id: 'competitive', label: 'Competitive Systems' }
      ],
      labels: {
        challenge: 'The Challenge:',
        solution: 'Technical Solution:',
        highlights: 'Key Technical Highlights:',
        role: 'Role:',
        techStack: 'Key Technologies:'
      },
      items: [
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
          galleryImages: ['/projects/ruta-frutilla/mapa-mapcn.png']
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
            'Real-time support ticket lifecycle tracking (Pending, In Transit, In Progress, Completed).',
            'Geographic technician mapping to optimize field service dispatch across the city.',
            'Instant client search with unified history of previous inspections, quotes, and CCTV diagrams.',
            'Complete elimination of paper reports in favor of a traceable digital audit trail.'
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
            { label: 'Traceability', value: 'Real-Time' },
            { label: 'Paper Reports', value: '0%' },
            { label: 'Domain', value: 'Networks & CCTV' }
          ],
          featuredImage: '/projects/ciber/listarInspeccion.WebP',
          galleryImages: ['/projects/ciber/listarInspeccion.WebP']
        },
        {
          id: 'construction-microservices-erp',
          number: '03',
          title: 'Construction Cost & Resource ERP',
          subtitle: 'Microservices Cloud Architecture for Parametric Quotations & Job Tracking',
          category: 'Backend & Cloud',
          role: 'Backend Architect & Tech Lead',
          status: 'Completed',
          description:
            'Enterprise software for construction firms calculating parametric building costs (raw materials, labor rates, equipment yields, taxes, and profit margins) from isolated structural components to complete housing projects.',
          challenge:
            'Calculating complex unit pricing formulas under dynamic inflation and ensuring the platform could scale with future enterprise modules (inventory, payroll) without coupling or breaking the core engine.',
          solution:
            'Architected a distributed microservices ecosystem following Clean Architecture in C# .NET 10, featuring a perimeter API Gateway, independent Construction and User services, and JWT authentication with RBAC.',
          highlights: [
            'Parametric estimation engine broken down into raw materials, labor, social charges, taxes, and profit.',
            'Modular microservices architecture (.NET 10 Web API + API Gateway) engineered for independent scaling.',
            'Automated generation of executive cost breakdowns and project progress balances.',
            'Tech leadership: designed OpenAPI/Swagger specifications and coordinated backlog with frontend and backend peers.'
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
            { label: 'Runtime', value: '.NET 10' },
            { label: 'Contracts', value: 'OpenAPI' }
          ],
          featuredImage: '/projects/personal-eco/swagguerConstructionAPI.WebP',
          galleryImages: ['/projects/personal-eco/swagguerConstructionAPI.WebP']
        },
        {
          id: 'dino-juego-edtech',
          number: '04',
          title: 'Dino Game ("Di No")',
          subtitle: 'Educational & Cultural Video Game for National Youth Competition on Android',
          category: 'Game Dev',
          role: 'Game & Physics Logic Developer (EZ Team)',
          status: 'Completed',
          description:
            '2D/3D platformer game with a social awareness message focused on substance prevention and anti-discrimination (pun on "Dino" -> "Di No" / "Say No"), taking players through Bolivia\'s distinct cultural regions.',
          challenge:
            'Creating an engaging interactive experience for youth conveying social awareness values, while guaranteeing rock-solid stability and high framerates across entry-level Android devices.',
          solution:
            'Modular Object-Oriented Architecture using SOLID principles in C# and Unity Engine, optimizing draw calls, texture atlases, and collision physics for a locked 60 FPS performance.',
          highlights: [
            'Thematic regional levels inspired by Tarija, Potosí, La Paz, Cochabamba, and Pando.',
            'Engaging game mechanics revolving around the "Say No" theme: interactive decisions and cultural trivia.',
            'Thorough profiling and memory management ensuring 60 FPS on lower-tier Android smartphones.',
            'Successfully qualified past the preliminary cut to the national 2nd round selection.'
          ],
          techStack: [
            'Unity Engine',
            'C#',
            'SOLID Principles',
            'Android SDK / APK',
            'Mobile Optimization'
          ],
          metrics: [
            { label: 'Performance', value: '60 FPS Locked' },
            { label: 'Contest Stage', value: 'National Finals' },
            { label: 'Platform', value: 'Android APK' }
          ],
          featuredImage: '/projects/Dino/DinoCochaGame.WebP',
          galleryImages: ['/projects/Dino/DinoCochaGame.WebP']
        },
        {
          id: 'juez-singa-competitive',
          number: '05',
          title: 'JuezSinga',
          subtitle: 'Virtual Online Judge Infrastructure for Universities & ICPC Contest Simulation',
          category: 'Competitive Systems',
          role: 'Creator & Infrastructure Architect',
          status: 'Active Development',
          description:
            'Private algorithmic code evaluation platform tailored for universities, training camps, and collegiate contests, providing strict simulation of official ACM-ICPC competitive rules.',
          challenge:
            'Public platforms do not allow academic institutions to host private problem repositories, run on-premise servers, manage team-based contest accounts, or simulate ICPC freeze scoreboards.',
          solution:
            'Integrated the Judge0 CE sandboxed execution engine for safe, isolated multi-language code evaluation (C++, Python, Java) with strict TLE/MLE limits, ASP.NET Core backend, and live freeze scoreboards.',
          highlights: [
            'Sandboxed execution engine (Judge0 CE) with rigorous measurement of CPU time and memory consumption.',
            'ICPC Contest Mode: team credentials, penalty tracking for incorrect submissions, and scoreboard freezing.',
            'Private problem repository management for university professors and competitive programming clubs.',
            'Engineered in C# .NET 9 with planned upgrade to .NET 10 and modern React user interface.'
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
            { label: 'Ruleset', value: 'ICPC Standard' },
            { label: 'Languages', value: 'C++, Python, Java' }
          ],
          featuredImage: '/projects/JuezSinga/swguerJuezSinga.png',
          galleryImages: ['/projects/JuezSinga/swguerJuezSinga.png']
        }
      ]
    },
    icpc: {
      tag: 'Elite Algorithmic Problem Solving',
      title: 'ACM-ICPC & Global Competitions',
      description: 'The International Collegiate Programming Contest (ICPC) and IEEEXtreme are the premier algorithmic arenas in the software industry.',
      headline: 'Solving high-complexity algorithmic challenges under strict time and resource constraints',
      body: 'As a competitive programmer and team lead, I have designed and implemented high-performance C++ solutions covering combinatorial optimization, graph theory, dynamic programming, number theory, and computational geometry.',
      card1Team: 'ICPC 2025 · RISE Team (UPDS Tarija)',
      card1Rank: 'Top 20 Bolivia',
      card1Sub: 'Qualification to the South America Regional Finals',
      card2Team: 'ICPC 2024 · Dijkstraidos (UAJMS)',
      card2Rank: 'Regional Finalist',
      card2Sub: 'South American Regional Site Finalist',
      certTitle: 'Official ICPC Certificate',
      certStatus: 'Verified',
      certDesc: 'Official certification issued by the global ICPC executive board certifying qualification to the South American Regional Finals in 2025.',
      certIeeeTitle: 'IEEEXtreme 18.0 Certificate',
      certIeeeStatus: 'Top 6 Bolivia',
      certIeeeDesc: 'Worldwide virtual 24-hour competitive programming contest with +19,000 global participants. Team RICE ranked Top 6 in Bolivia.',
      trainingTitle: 'Continuous Competitive Training',
      trainingDesc: 'Ongoing problem solving on global algorithmic platforms including Codeforces, AtCoder, LeetCode, and international competitions such as IEEEXtreme (18.0).',
      tags: ['Graphs & Flows', 'Dynamic Programming', 'Advanced Data Structures', 'C++ STL', 'IEEEXtreme 18.0', 'Codeforces']
    },
    process: {
      tag: 'Engineering Methodology',
      title: 'My Engineering Process',
      description: 'A structured, professional approach that guarantees maintainable architectures, stellar production performance, and timeline predictability.',
      steps: [
        {
          number: '01',
          title: 'Domain & Discovery',
          desc: 'Deep exploration of business logic, data models, and user journeys before writing a single line of code.'
        },
        {
          number: '02',
          title: 'Clean Architecture',
          desc: 'Decoupled system design using Clean Architecture and microservices, establishing strict OpenAPI/Swagger contracts.'
        },
        {
          number: '03',
          title: 'Modular Development',
          desc: 'Implementation using cutting-edge stacks (.NET 10, React Native, React 19) applying SOLID principles and strong typing.'
        },
        {
          number: '04',
          title: 'Rigorous Optimization',
          desc: 'Latency profiling, memory footprint control, offline caching strategies, and locked 60 FPS rendering.'
        },
        {
          number: '05',
          title: 'Delivery & Deployment',
          desc: 'CI/CD automation, Docker containerization, and production-ready deployments with cloud scalability.'
        }
      ]
    },
    footer: {
      tag: 'Ready for your next challenge?',
      title: "Let's build reliable, scalable software with real-world impact.",
      emailBtn: 'Send an Email',
      cvBtn: 'Download Full CV (EN)',
      emailLabel: 'Email Address',
      phoneLabel: 'Phone / WhatsApp',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      rights: '© 2026 danimtx (Daniel Mancilla Tejerina) · All rights reserved.',
      location: 'Tarija, Bolivia — Global Remote Availability'
    }
  },
  es: {
    nav: {
      role: 'Ingeniero de Sistemas & Software',
      home: 'Inicio',
      experience: 'Experiencia',
      services: 'Servicios',
      projects: 'Proyectos',
      icpc: 'ICPC & Logros',
      process: 'Proceso',
      cv: 'CV (ES)',
      talk: 'Hablemos'
    },
    hero: {
      greeting: 'Hey 👋 Soy danimtx',
      title1: 'Software Engineer &',
      title2: 'System Architect',
      description: 'Ingeniero de Sistemas especializado en microservicios robustos con .NET 10, aplicaciones móviles offline-first con React Native y resolución algorítmica de alto nivel como 2x Finalista Regional del ACM-ICPC.',
      ctaWork: 'Trabajemos Juntos',
      ctaProjects: 'Explorar Proyectos',
      stackLabel: 'Stack Principal:',
      metric1Value: '2x',
      metric1Label: 'Finalista Regional ACM-ICPC',
      metric2Value: 'Top 6',
      metric2Label: 'IEEEXtreme 18.0 Bolivia (+19k Global)',
      metric3Value: '5+',
      metric3Label: 'Proyectos Web & Móvil en Producción',
      metric4Value: '3+',
      metric4Label: 'Años Construyendo Software',
      photoBadgeTitle: 'danimtx // Stealth Core',
      photoBadgeSub: 'Precisión Felina & Enfoque Algorítmico'
    },
    intro: {
      availability: 'Disponible para proyectos & empleo',
      p1: '¡Bienvenido a mi portafolio! Soy ',
      boldName: 'danimtx (Daniel Mancilla)',
      p2: ', ingeniero de software apasionado por la ',
      boldArch: 'arquitectura limpia y los sistemas distribuidos',
      p3: '. Combino rigor algorítmico forjado en el ICPC con soluciones reales en producción: desde microservicios escalables con .NET hasta apps móviles offline-first con React Native.',
      linkText: 'Conoce mi trayectoria profesional'
    },
    experience: {
      tag: 'Trayectoria Profesional',
      title: 'Experiencia Laboral',
      description: 'Historial comprobado en desarrollo móvil offline-first, sistemas electorales de misión crítica y plataformas operativas empresariales en tiempo real.',
      items: [
        {
          id: 'lugares-ocultos',
          role: 'Desarrollador Fullstack & Móvil',
          company: 'Lugares Ocultos de Tarija',
          type: 'Autónomo / Startup',
          period: 'Dic. 2025 - Actualidad · Activo',
          location: 'Tarija, Bolivia · En remoto',
          bullets: [
            'Diseño end-to-end e implementación de una aplicación móvil turística en React Native (Expo) para el mapeo inteligente de destinos, rutas y recomendaciones gastronómicas.',
            'Modelado y optimización de base de datos relacional en PostgreSQL para consultas geoespaciales y almacenamiento eficiente de contenido multimedia.',
            'Implementación de arquitectura por capas para garantizar modularidad, navegación offline sin conexión y proyección nacional en Bolivia.'
          ],
          stack: ['React Native', 'Expo SDK 54', 'PostgreSQL', 'Supabase', 'MapLibre GL', 'PostGIS', 'FSD']
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
          stack: ['Validación en Tiempo Real', 'Operación de Bases de Datos', 'Respuesta a Incidentes', 'Sistemas Electorales']
        },
        {
          id: 'cybercorp',
          role: 'Desarrollador de Software & Soporte TI (Prácticas)',
          company: 'CYBERCORP S.R.L.',
          type: 'Contrato de Formación / Prácticas',
          period: 'Ene. 2025 - Feb. 2025 · 2 meses',
          location: 'Tarija, Bolivia · Presencial',
          bullets: [
            'Diseño e implementación de un sistema interno fullstack para la asignación, seguimiento y control de estado de tareas del personal técnico, optimizando los tiempos de respuesta y la gestión operativa.',
            'Modelado y administración de la base de datos no relacional en Firebase para el control de usuarios, roles, órdenes de trabajo y métricas de soporte.',
            'Planificación e instalación de infraestructura de videovigilancia y cámaras de seguridad IP/CCTV con configuración de red local, direccionamiento IP y acceso remoto seguro.'
          ],
          stack: ['React', 'Firebase Firestore', 'Tailwind CSS', 'C# / .NET', 'Redes IP & CCTV']
        }
      ]
    },
    services: {
      tag: 'Capacidades & Especialidades',
      title: 'Mis Áreas de Especialización',
      description: 'Desarrollo soluciones de software integrales: desde el modelado matemático de datos y microservicios hasta interfaces móviles con rendimiento impecable.',
      activeBadge: 'Especialidad Activa',
      techLabel: 'Tecnologías Clave:',
      items: [
        {
          id: 'mobile',
          number: '01',
          title: 'Mobile Apps & Offline-First Systems',
          shortDesc: 'Aplicaciones móviles reactivas con soporte 100% offline, geolocalización y sincronización en la nube.',
          fullDesc: 'Diseño e implemento aplicaciones móviles multiplataforma de grado de producción utilizando React Native y Expo SDK 54. Especializado en experiencias offline-first con almacenamiento local, mapas vectoriales (MapLibre GL / OpenStreetMap), esquemas espaciales PostGIS y sincronización resiliente con Supabase.',
          tech: ['React Native', 'Expo SDK 54', 'MapLibre GL', 'Supabase', 'PostGIS', 'FSD Architecture'],
          metrics: ['100% Navegación Offline', '60 FPS UI Fluida', 'Geocoding & Tracking'],
          previewImage: '/projects/ruta-frutilla/mapa-mapcn.png',
          previewTitle: 'Lugares Ocultos de Tarija — Mobile Architecture'
        },
        {
          id: 'backend',
          number: '02',
          title: 'Backend Architecture & Microservicios',
          shortDesc: 'Sistemas distribuidos en C# .NET 10 bajo Clean Architecture, API Gateways y contratos OpenAPI.',
          fullDesc: 'Construcción de arquitecturas backend robustas orientadas al desacoplamiento y crecimiento continuo. Implementación de Clean Architecture, patrones CQRS, autenticación perimetral JWT con RBAC, diseño de bases de datos relacionales en PostgreSQL y SQL Server, y orquestación con API Gateway.',
          tech: ['C# / .NET 10', 'ASP.NET Core Web API', 'Clean Architecture', 'Microservicios', 'PostgreSQL', 'Swagger'],
          metrics: ['Alta Concurrencia', 'Contratos OpenAPI', 'Bases de Datos Optimizadas'],
          previewImage: '/projects/personal-eco/swagguerConstructionAPI.WebP',
          previewTitle: 'Construction Cost ERP — Microservices API Gateway'
        },
        {
          id: 'frontend',
          number: '03',
          title: 'Frontend Moderno & Interfaces de Alto Impacto',
          shortDesc: 'Aplicaciones web modernas con React, TypeScript y Tailwind CSS con enfoque editorial y rendimiento.',
          fullDesc: 'Desarrollo de interfaces web con tipografía precisa, jerarquía visual sólida y rendimiento medible. Conexión en tiempo real con WebSockets y Firebase, paneles operativos de campo y diseño adaptable de ultra-alta fidelidad sin depender de plantillas genéricas.',
          tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Firebase Firestore', 'Vite', 'Responsive UX'],
          metrics: ['Lighthouse 95+', 'Tiempo Real', 'Componentes Modulares'],
          previewImage: '/projects/ciber/listarInspeccion.WebP',
          previewTitle: 'Cybercorp Task Management — Panel Operativo de Campo'
        },
        {
          id: 'competitive',
          number: '04',
          title: 'Infraestructura de Evaluación & Algoritmia',
          shortDesc: 'Integración de motores sandboxed (Judge0 CE) y resolución algorítmica de problemas de alta complejidad.',
          fullDesc: 'Capacidad comprobada en pensamiento lógico y algorítmico gracias a 2 clasificaciones consecutivas a las Finales Regionales del ACM-ICPC. Arquitectura de evaluadores automáticos de código en entornos aislados de Docker con control de CPU, memoria y límites de tiempo.',
          tech: ['Judge0 CE', 'Docker Sandboxing', 'C++', 'Python', 'Algoritmos & Grafos', 'Simulación ICPC'],
          metrics: ['2x Finalista Sudamericano', 'Aislamiento Docker', 'Scoreboard con Freeze'],
          previewImage: '/projects/JuezSinga/swguerJuezSinga.png',
          previewTitle: 'JuezSinga — Motor de Evaluación Sandboxed'
        }
      ]
    },
    projects: {
      tag: 'Proyectos Clave Seleccionados',
      title: 'Trabajo de Ingeniería & Arquitectura',
      description: 'Información 100% verídica: proyectos con arquitectura limpia, retos técnicos resueltos y resultados medibles.',
      filters: [
        { id: 'all', label: 'Todos los Proyectos (5)' },
        { id: 'mobile', label: 'Mobile & Offline-First' },
        { id: 'backend', label: 'Backend & Microservicios' },
        { id: 'enterprise', label: 'Web & Operaciones' },
        { id: 'game', label: 'Game Dev' },
        { id: 'competitive', label: 'Sistemas Competitivos' }
      ],
      labels: {
        challenge: 'El Reto:',
        solution: 'Solución Técnica:',
        highlights: 'Aspectos Técnicos Destacados:',
        role: 'Rol:',
        techStack: 'Tecnologías Clave:'
      },
      items: [
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
          galleryImages: ['/projects/ruta-frutilla/mapa-mapcn.png']
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
          galleryImages: ['/projects/ciber/listarInspeccion.WebP']
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
          galleryImages: ['/projects/personal-eco/swagguerConstructionAPI.WebP']
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
          galleryImages: ['/projects/Dino/DinoCochaGame.WebP']
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
          galleryImages: ['/projects/JuezSinga/swguerJuezSinga.png']
        }
      ]
    },
    icpc: {
      tag: 'Pensamiento Algorítmico de Élite',
      title: 'ACM-ICPC & Competencias Globales',
      description: 'El International Collegiate Programming Contest (ICPC) e IEEEXtreme son los escenarios de algoritmia más exigentes de la industria.',
      headline: 'Resolución de problemas de alta complejidad bajo presión de tiempo y recursos',
      body: 'Como competidor y capitán de equipo, he diseñado e implementado soluciones en C++ para problemas de optimización combinatoria, grafos avanzados, programación dinámica, teoría de números y geometría computacional.',
      card1Team: 'ICPC 2025 · Equipo RISE (UPDS Tarija)',
      card1Rank: 'Top 20 Bolivia',
      card1Sub: 'Clasificación a la Final Regional Sudamericana',
      card2Team: 'ICPC 2024 · Dijkstraidos (UAJMS)',
      card2Rank: 'Finalista Regional',
      card2Sub: 'Sede Regional Sudamericana (UAJMS)',
      certTitle: 'Certificado Oficial ICPC',
      certStatus: 'Verificado',
      certDesc: 'Certificación oficial otorgada por la dirección global del ICPC tras clasificar a la fase regional sudamericana en 2025.',
      certIeeeTitle: 'Certificado IEEEXtreme 18.0',
      certIeeeStatus: 'Top 6 Bolivia',
      certIeeeDesc: 'Competencia mundial de programación competitiva de 24 horas con más de 19,000 participantes globales. Equipo RICE clasificado en el Top 6 de Bolivia.',
      trainingTitle: 'Entrenamiento Continuo',
      trainingDesc: 'Participación constante en plataformas de algoritmia competitiva como Codeforces, AtCoder, LeetCode y competencias internacionales como IEEEXtreme (18.0).',
      tags: ['Grafos & Flujos', 'Programación Dinámica', 'Estructuras de Datos Avanzadas', 'C++ STL', 'IEEEXtreme 18.0', 'Codeforces']
    },
    process: {
      tag: 'Metodología de Trabajo',
      title: 'Mi Proceso de Ingeniería',
      description: 'Un enfoque estructurado que garantiza código mantenible, rendimiento en producción y cero sorpresas en los plazos.',
      steps: [
        {
          number: '01',
          title: 'Análisis & Dominio',
          desc: 'Comprensión profunda de las reglas de negocio, modelos relacionales y flujos de usuario antes de tirar una sola línea de código.'
        },
        {
          number: '02',
          title: 'Arquitectura Limpia',
          desc: 'Diseño desacoplado bajo Clean Architecture y Microservicios, definiendo contratos de API sólidos (OpenAPI/Swagger).'
        },
        {
          number: '03',
          title: 'Desarrollo Modular',
          desc: 'Construcción con tecnologías modernas (.NET 10, React Native, React 19) aplicando principios SOLID y código tipado.'
        },
        {
          number: '04',
          title: 'Optimización Rigurosa',
          desc: 'Pruebas de latencia, gestión de memoria, caching offline y renderizado a 60 FPS estables.'
        },
        {
          number: '05',
          title: 'Despliegue & Monitoreo',
          desc: 'Integración continua, Dockerización de servicios y entrega lista para producción y escalabilidad en la nube.'
        }
      ]
    },
    footer: {
      tag: '¿Hablamos de tu próximo reto?',
      title: 'Construyamos software sólido, escalable y con impacto real.',
      emailBtn: 'Enviar un Correo',
      cvBtn: 'Descargar CV Completo (ES)',
      emailLabel: 'Correo Electrónico',
      phoneLabel: 'Teléfono / WhatsApp',
      githubLabel: 'GitHub',
      linkedinLabel: 'LinkedIn',
      rights: '© 2026 danimtx (Daniel Mancilla Tejerina) · Todos los derechos reservados.',
      location: 'Tarija, Bolivia — Conexión Global Remota'
    }
  }
};
