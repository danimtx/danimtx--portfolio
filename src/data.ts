import type { Language } from './i18n/LanguageContext';

export interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  architectureHighlight?: string;
  tech: string[];
  image: string;
  gallery: string[];
  link: string;
  github: string;
  apk?: string;
  year: string;
  category?: 'fullstack' | 'backend' | 'mobile' | 'ai' | 'gamedev';
}

export interface Certificate {
  id: number;
  title: string;
  institution?: string;
  year?: string;
  img: string;
}

export interface SkillCategory {
  name: string;
  tag: string;
  description: string;
  skills: { name: string; iconKey: string; level?: string }[];
}

export const personalInfo = {
  name: "DANIEL MANCILLA TEJERINA",
  title: "Systems Engineer | Fullstack & Backend Software Engineer",
  subtitle: "Specialist in Clean Architecture, Microservices, AI Autonomous Agents and Competitive Programming",
  location: "Tarija, Bolivia",
  email: "daniel.mancilla.tx33@gmail.com",
  whatsapp: "+591 71168130",
  whatsappLink: "https://wa.me/59171168130?text=Hello%20Daniel,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect",
  whatsappLinkEs: "https://wa.me/59171168130?text=Hola%20Daniel,%20he%20visto%20tu%20portafolio%20y%20me%20gustar%C3%ADa%20conversar%20contigo",
  linkedin: "https://linkedin.com/in/danimtx",
  github: "https://github.com/danimtx",
  instagram: "https://www.instagram.com/daniel.manci12/",
  cvPdf: "/cv.pdf",
  driveCertificates: "https://drive.google.com/drive/folders/1y2VGjOfiBiBp704HHIUTN_AKefKXuZR6?usp=sharing",
  icpcRisePhoto: "/projects/perfiles/ICPC_2025_RISE.jpg",
  codeforcesProfile: "/projects/perfiles/PerfilCodeForces.png"
};

export const heroRolesEn = [
  "Fullstack Software Engineer",
  "Backend & Clean Architect (.NET / C#)",
  "2x ICPC Regional Finalist (Top 20)",
  "AI Agents & Automation Developer",
  "WebGL & Interactive Creator"
];

export const heroRolesEs = [
  "Ingeniero de Software Fullstack",
  "Arquitecto de Software & Backend (.NET)",
  "2x Finalista Sudamérica ICPC (Top 20)",
  "Desarrollador de Agentes IA & n8n",
  "Creador de Experiencias WebGL"
];

export const heroRoles = heroRolesEn;

export function getSkillCategories(lang: Language): SkillCategory[] {
  if (lang === 'en') {
    return [
      {
        name: "Backend & Systems Architecture",
        tag: "CORE & DISTRIBUTED SYSTEMS",
        description: "Decoupled, modular, and fault-tolerant system design using Clean Architecture, Hexagonal, and Microservices.",
        skills: [
          { name: "C# / .NET Core", iconKey: "csharp" },
          { name: "ASP.NET Core Web API", iconKey: "server" },
          { name: "Clean Architecture & CQRS", iconKey: "architecture" },
          { name: "Python / FastAPI", iconKey: "python" },
          { name: "C++ (Competitive Algorithms)", iconKey: "cpp" },
          { name: "Node.js / Express", iconKey: "node" }
        ]
      },
      {
        name: "Frontend, Mobile & WebGL",
        tag: "INTERFACES & GRAPHICS",
        description: "High-performance reactive interfaces, native mobile applications, and smooth interactive graphics.",
        skills: [
          { name: "React / Vite", iconKey: "react" },
          { name: "React Native / Expo", iconKey: "mobile" },
          { name: "Angular", iconKey: "angular" },
          { name: "TypeScript / JS", iconKey: "ts" },
          { name: "Canvas 2D / WebGL", iconKey: "webgl" },
          { name: "Tailwind CSS / GSAP", iconKey: "css" }
        ]
      },
      {
        name: "AI Agents, Automation & Data",
        tag: "INTELLIGENCE & WORKFLOWS",
        description: "Integration of autonomous LLM reasoning agents, n8n automated pipelines, and polyglot persistence.",
        skills: [
          { name: "Autonomous AI Agents (LLMs)", iconKey: "ai" },
          { name: "n8n Automation Workflows", iconKey: "workflow" },
          { name: "PostgreSQL (PostGIS Geospatial)", iconKey: "postgres" },
          { name: "SQL Server / MySQL", iconKey: "sql" },
          { name: "Docker & Linux", iconKey: "docker" },
          { name: "Unity 3D / Game Logic", iconKey: "unity" }
        ]
      }
    ];
  }

  return [
    {
      name: "Backend & Arquitectura",
      tag: "NÚCLEO Y SISTEMAS DISTRIBUIDOS",
      description: "Diseño desacoplado, modular y escalable con Clean Architecture, Hexagonal y Microservicios.",
      skills: [
        { name: "C# / .NET Core", iconKey: "csharp" },
        { name: "ASP.NET Core Web API", iconKey: "server" },
        { name: "Clean Architecture & CQRS", iconKey: "architecture" },
        { name: "Python / FastAPI", iconKey: "python" },
        { name: "C++ (Algoritmos)", iconKey: "cpp" },
        { name: "Node.js / Express", iconKey: "node" }
      ]
    },
    {
      name: "Frontend, Móvil & 3D",
      tag: "INTERFACES Y EXPERIENCIAS",
      description: "Desarrollo de interfaces reactivas, aplicaciones móviles nativas y experiencias inmersivas WebGL.",
      skills: [
        { name: "React / Vite", iconKey: "react" },
        { name: "React Native / Expo", iconKey: "mobile" },
        { name: "Angular", iconKey: "angular" },
        { name: "TypeScript / JS", iconKey: "ts" },
        { name: "Canvas 2D / WebGL", iconKey: "webgl" },
        { name: "Tailwind CSS / GSAP", iconKey: "css" }
      ]
    },
    {
      name: "IA, Automatización & Datos",
      tag: "INTELIGENCIA Y FLUJOS",
      description: "Integración de modelos LLM, agentes autónomos, flujos n8n y persistencia políglota de alto rendimiento.",
      skills: [
        { name: "Agentes IA (LLMs / Prompt Eng)", iconKey: "ai" },
        { name: "n8n Automation Workflows", iconKey: "workflow" },
        { name: "PostgreSQL (Geoespacial)", iconKey: "postgres" },
        { name: "SQL Server / MySQL", iconKey: "sql" },
        { name: "Docker & Linux", iconKey: "docker" },
        { name: "Unity 3D / Game Logic", iconKey: "unity" }
      ]
    }
  ];
}

export const skillCategories = getSkillCategories('en');

export function getProjects(lang: Language): Project[] {
  if (lang === 'en') {
    return [
      {
        id: 1,
        title: 'Doctemia',
        subtitle: 'Medical E-Learning SaaS Platform',
        description: 'Comprehensive educational SaaS platform tailored for medical institutions, managing the complete lifecycle of course delivery, dynamic evaluations, and real-time certification.\n\nEngineering Highlights:\n• Reactive SPA architecture with real-time exam tracking and grading.\n• Security: Granular Role-Based Access Control (RBAC) middleware and signed JWT tokens.\n• Relational Persistence: Highly normalized PostgreSQL database designed for high student concurrency.',
        architectureHighlight: 'Clean Backend · RBAC Security · PostgreSQL · Real-Time Evaluation',
        tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Tailwind'],
        image: '/projects/Doctemia/home.WebP',
        gallery: [
          '/projects/Doctemia/home.WebP',
          '/projects/Doctemia/admCursos.WebP',
          '/projects/Doctemia/CursosVideo.WebP',
          '/projects/Doctemia/GestionUsuarios.WebP',
          '/projects/Doctemia/PanelAdmClaro.WebP',
          '/projects/Doctemia/registrarExamen.WebP',
          '/projects/Doctemia/CurrsosPremiunAdm.WebP'
        ],
        link: 'https://doctemia-mc.vercel.app/login',
        github: 'https://github.com/Victor30700/doctemia-mc.git',
        year: '2024',
        category: 'fullstack'
      },
      {
        id: 2,
        title: 'Sprinter App',
        subtitle: 'Athletic Telemetry & Computer Vision AI',
        description: 'High-performance athletic biomechanics ecosystem powered by Artificial Intelligence and real-time computer vision.\n\nEngineering Highlights:\n• Hybrid Architecture: Reactive frontend dashboard paired with a low-latency Python/FastAPI compute engine.\n• Computer Vision: Real-time 60 FPS Pose Estimation and biomechanical video trajectory analysis.\n• AI Coach Agent: LLM integration generating personalized biomechanical training diagnostics.',
        architectureHighlight: 'FastAPI Microservice · Pose Estimation · LLM Sports Coach · Video Processing',
        tech: ['React', 'Python', 'FastAPI', 'Computer Vision', 'LLM Agent'],
        image: '/projects/sprinter-app/home.WebP',
        gallery: [
          '/projects/sprinter-app/home.WebP',
          '/projects/sprinter-app/analisisEntrenamiento.WebP',
          '/projects/sprinter-app/analisisVideo.WebP',
          '/projects/sprinter-app/chatBot.WebP',
          '/projects/sprinter-app/graficas.WebP',
          '/projects/sprinter-app/centroRendimiento.WebP',
          '/projects/sprinter-app/historialDeportivo.WebP'
        ],
        link: 'https://app-atleta-vite.vercel.app/home',
        github: 'https://github.com/Victor30700/SprinterApp.git',
        year: '2024',
        category: 'ai'
      },
      {
        id: 3,
        title: 'Hidden Places of Tarija',
        subtitle: 'Tourism Mobile App & Geospatial Engine',
        description: 'Cross-platform mobile exploration application designed for uncovering uncharted trails, local gastronomy, and cultural heritage.\n\nEngineering Highlights:\n• Cross-Platform Mobile: Built with React Native & Expo for 60 FPS native rendering on iOS and Android.\n• Geospatial Engine: High-performance PostgreSQL / PostGIS queries for radius calculations, proximity sorting, and offline routes.\n• Layered Architecture: Strict separation between mobile presentation layer and data services.',
        architectureHighlight: 'React Native (Expo) · PostgreSQL PostGIS · Layered Architecture · Offline Ready',
        tech: ['React Native', 'Expo', 'PostgreSQL', 'Maps API', 'TypeScript'],
        image: '/projects/ruta-frutilla/mapa-mapcn.png',
        gallery: [
          '/projects/ruta-frutilla/mapa-mapcn.png',
          '/projects/ruta-frutilla/modalParada.png',
          '/projects/ruta-frutilla/titulo.png',
          '/projects/ruta-frutilla/animacion de grafica.png'
        ],
        link: '',
        github: 'https://github.com/danimtx',
        year: '2025 - 2026',
        category: 'mobile'
      },
      {
        id: 4,
        title: 'JuezSinga',
        subtitle: 'Virtual Algorithm Online Judge Backend',
        description: 'High-performance virtual judge API for secure sandbox compilation, isolated execution, and real-time algorithmic evaluation (LeetCode/Codeforces style).\n\nEngineering Highlights:\n• Clean Architecture: Total decoupling between Domain, Use Cases, Infrastructure, and API Controllers.\n• Sandboxing & Isolation: Strict CPU time limits ($TL$) and memory boundaries ($ML$) execution.\n• OpenAPI / Swagger: Fully documented contract-first API for seamless client integration.',
        architectureHighlight: 'ASP.NET Core · Clean Architecture · Sandboxing · Swagger OpenAPI',
        tech: ['C#', 'ASP.NET Core', 'Clean Architecture', 'Swagger', 'Algorithms'],
        image: '/projects/JuezSinga/swguerJuezSinga.png',
        gallery: [
          '/projects/JuezSinga/swguerJuezSinga.png'
        ],
        link: '',
        github: 'https://github.com/danimtx/JuezSinga.git',
        year: '2024',
        category: 'backend'
      },
      {
        id: 5,
        title: 'Personal Ecosystem',
        subtitle: 'Enterprise Microservices & CQRS',
        description: 'Distributed enterprise platform designed for modular resource orchestration and multi-tenant management.\n\nEngineering Highlights:\n• Domain-Driven Design (DDD): Rigorous aggregate modeling, domain entities, and domain event dispatching.\n• CQRS with MediatR: Explicit segregation between command write pipelines and optimized query reads.\n• Polyglot Persistence: Hybrid SQL transactional data combined with fast caching layers.',
        architectureHighlight: 'Microservices · DDD · CQRS MediatR · Polyglot Persistence',
        tech: ['Microservices', 'C#', '.NET', 'CQRS', 'React', 'SQL Server'],
        image: '/projects/personal-eco/homeDiseno.WebP',
        gallery: [
          '/projects/personal-eco/homeDiseno.WebP',
          '/projects/personal-eco/homeDiseno2.WebP',
          '/projects/personal-eco/proyectosDiseno.WebP',
          '/projects/personal-eco/swagguerConstructionAPI.WebP',
          '/projects/personal-eco/swagguerUserMangementAPI.WebP'
        ],
        link: '',
        github: 'https://github.com/danimtx',
        year: '2024',
        category: 'backend'
      },
      {
        id: 6,
        title: 'Cybercorp Task Management',
        subtitle: 'IT Operations & Field Support Platform',
        description: 'Internal operations platform built during my engineering tenure at Cybercorp for technical ticket assignment, field logging, and SLA compliance monitoring.\n\nEngineering Highlights:\n• Operational SLA Tracking: Drastic reduction in technician response times via dynamic dashboards.\n• Relational Modeling: Structured SQL Server schema for auditing, role access, and ticket lifecycles.\n• Infrastructure Integration: Network monitoring and hardware surveillance support.',
        architectureHighlight: 'C# / .NET · SQL Server · TCP/IP Networks · Operational SLA Tracking',
        tech: ['C#', '.NET', 'SQL Server', 'JavaScript', 'TCP/IP Networks'],
        image: '/projects/ciber/login.WebP',
        gallery: [
          '/projects/ciber/login.WebP',
          '/projects/ciber/crearInspeccion.WebP',
          '/projects/ciber/listarInspeccion.WebP'
        ],
        link: '',
        github: 'https://github.com/danimtx',
        year: '2024 - 2025',
        category: 'fullstack'
      },
      {
        id: 7,
        title: 'Dino Adventure',
        subtitle: '60 FPS Mobile Action Game',
        description: 'Interactive cultural mobile game for Android that integrates Bolivian geography with exploration and action mechanics.\n\nEngineering Highlights:\n• Mobile Performance: Rigorous memory optimization, texture atlas batching, and collision physics at steady 60 FPS.\n• Code Architecture: SOLID design principles and Finite State Machines (FSM) for AI enemy behaviors.\n• Cultural Gamification: Interactive maps of Tarija, Potosí, La Paz, and Cochabamba.',
        architectureHighlight: 'Unity 3D Engine · C# SOLID · Finite State Machine (FSM) · 60 FPS Mobile Opt',
        tech: ['Unity 3D', 'C#', 'Android', 'Game Physics', 'SOLID'],
        image: '/projects/Dino/DinoMenu - copia.WebP',
        gallery: [
          '/projects/Dino/DinoMenu - copia.WebP',
          '/projects/Dino/DinoCochaGame.WebP',
          '/projects/Dino/LaPazGame.WebP',
          '/projects/Dino/mapaTarija.WebP',
          '/projects/Dino/seleccicionMapaBolivia.WebP',
          '/projects/Dino/DinoPando.WebP',
          '/projects/Dino/gamePotosi.WebP'
        ],
        link: '',
        github: '',
        apk: 'https://drive.google.com/file/d/1pJmCkarRZ0giUA7L-8U7vIruavCPFFw3/view?usp=drive_link',
        year: '2024',
        category: 'gamedev'
      },
      {
        id: 8,
        title: 'Aura Wines',
        subtitle: 'Wine Industry E-Commerce & State Store',
        description: 'Interactive online marketplace tailored for Tarija’s wine heritage, featuring real-time cart state management, responsive catalog filtering, and digital storytelling.',
        architectureHighlight: 'React SPA · Modular CSS · Global State Store',
        tech: ['React', 'CSS Modules', 'State Management', 'UI/UX'],
        image: '/projects/vinos-aura/home.png',
        gallery: [
          '/projects/vinos-aura/home.png',
          '/projects/vinos-aura/carritoCompras.png',
          '/projects/vinos-aura/vinoProdcuto.png',
          '/projects/vinos-aura/pagNosotros.png',
          '/projects/vinos-aura/blog.png'
        ],
        link: '',
        github: '',
        year: '2024',
        category: 'fullstack'
      }
    ];
  }

  return [
    {
      id: 1,
      title: 'Doctemia',
      subtitle: 'Plataforma SaaS E-Learning Médico',
      description: 'Plataforma SaaS educativa especializada en el sector médico, gestionando el ciclo completo de formación, evaluación y certificación en tiempo real.\n\nAspectos de Ingeniería:\n• Arquitectura SPA reactiva con sincronización en tiempo real de exámenes y resultados.\n• Seguridad Perimetral: Middlewares de autorización con control de acceso basado en roles (RBAC) y tokens JWT.\n• Base de Datos Relacional: Esquema optimizado en PostgreSQL para alta concurrencia de alumnos.',
      architectureHighlight: 'Clean Backend · RBAC Security · PostgreSQL · Real-Time Evaluation',
      tech: ['React', 'Node.js', 'PostgreSQL', 'JWT', 'Tailwind'],
      image: '/projects/Doctemia/home.WebP',
      gallery: [
        '/projects/Doctemia/home.WebP',
        '/projects/Doctemia/admCursos.WebP',
        '/projects/Doctemia/CursosVideo.WebP',
        '/projects/Doctemia/GestionUsuarios.WebP',
        '/projects/Doctemia/PanelAdmClaro.WebP',
        '/projects/Doctemia/registrarExamen.WebP',
        '/projects/Doctemia/CurrsosPremiunAdm.WebP'
      ],
      link: 'https://doctemia-mc.vercel.app/login',
      github: 'https://github.com/Victor30700/doctemia-mc.git',
      year: '2024',
      category: 'fullstack'
    },
    {
      id: 2,
      title: 'Sprinter App',
      subtitle: 'Rendimiento Deportivo & Computer Vision IA',
      description: 'Ecosistema de alto rendimiento atlético que fusiona la biomecánica deportiva con Inteligencia Artificial.\n\nAspectos de Ingeniería:\n• Arquitectura Híbrida: Frontend de telemetría deportiva conectado a un backend de cálculo (FastAPI / Python).\n• Computer Vision: Estimación de postura y análisis biomecánico de video (Pose Estimation) a 60 FPS.\n• Agente Entrenador IA: Integración de LLM para generación de diagnósticos deportivos personalizados.',
      architectureHighlight: 'FastAPI Microservice · Pose Estimation · LLM Sports Coach · Video Processing',
      tech: ['React', 'Python', 'FastAPI', 'Computer Vision', 'LLM Agent'],
      image: '/projects/sprinter-app/home.WebP',
      gallery: [
        '/projects/sprinter-app/home.WebP',
        '/projects/sprinter-app/analisisEntrenamiento.WebP',
        '/projects/sprinter-app/analisisVideo.WebP',
        '/projects/sprinter-app/chatBot.WebP',
        '/projects/sprinter-app/graficas.WebP',
        '/projects/sprinter-app/centroRendimiento.WebP',
        '/projects/sprinter-app/historialDeportivo.WebP'
      ],
      link: 'https://app-atleta-vite.vercel.app/home',
      github: 'https://github.com/Victor30700/SprinterApp.git',
      year: '2024',
      category: 'ai'
    },
    {
      id: 3,
      title: 'Lugares Ocultos de Tarija',
      subtitle: 'App Móvil Turística & Geolocalización',
      description: 'Aplicación móvil de turismo y geolocalización orientada al descubrimiento de destinos ocultos, senderos y gastronomía tradicional.\n\nAspectos de Ingeniería:\n• Desarrollo Móvil Multiplataforma: Construido con React Native y Expo para iOS y Android con renderizado nativo fluido.\n• Motor Geoespacial: Consultas optimizadas en PostgreSQL / PostGIS para cálculo de distancias, radios de cercanía y rutas offline.\n• Arquitectura por Capas: Modularidad y separación estricta entre capa de presentación móvil y servicios de datos.',
      architectureHighlight: 'React Native (Expo) · PostgreSQL PostGIS · Layered Architecture · Offline Ready',
      tech: ['React Native', 'Expo', 'PostgreSQL', 'Maps API', 'TypeScript'],
      image: '/projects/ruta-frutilla/mapa-mapcn.png',
      gallery: [
        '/projects/ruta-frutilla/mapa-mapcn.png',
        '/projects/ruta-frutilla/modalParada.png',
        '/projects/ruta-frutilla/titulo.png',
        '/projects/ruta-frutilla/animacion de grafica.png'
      ],
      link: '',
      github: 'https://github.com/danimtx',
      year: '2025 - 2026',
      category: 'mobile'
    },
    {
      id: 4,
      title: 'JuezSinga',
      subtitle: 'Backend Juez Virtual de Algoritmos',
      description: 'API backend de alta fidelidad para la compilación, ejecución aislada y evaluación automática de código y algoritmos (estilo LeetCode / Codeforces).\n\nAspectos de Ingeniería:\n• Clean Architecture: Desacoplamiento total entre Dominio, Casos de Uso, Infraestructura y API Controllers.\n• Sandboxing & Seguridad: Ejecución controlada con límites estrictos de tiempo de CPU ($TL$) y memoria ($ML$).\n• Documentación & Testing: Especificación interactiva OpenAPI/Swagger para integración frontend.',
      architectureHighlight: 'ASP.NET Core · Clean Architecture · Sandboxing · Swagger OpenAPI',
      tech: ['C#', 'ASP.NET Core', 'Clean Architecture', 'Swagger', 'Algorithms'],
      image: '/projects/JuezSinga/swguerJuezSinga.png',
      gallery: [
        '/projects/JuezSinga/swguerJuezSinga.png'
      ],
      link: '',
      github: 'https://github.com/danimtx/JuezSinga.git',
      year: '2024',
      category: 'backend'
    },
    {
      id: 5,
      title: 'Personal Ecosystem',
      subtitle: 'Microservicios Empresariales CQRS',
      description: 'Plataforma empresarial modular bajo una arquitectura de sistemas distribuidos para orquestación de recursos y proyectos.\n\nAspectos de Ingeniería:\n• Domain-Driven Design (DDD): Modelado de agregados, entidades de dominio y eventos de dominio.\n• Patrón CQRS con MediatR: Separación estricta entre flujos de lectura (Queries) y escritura (Commands).\n• Persistencia Políglota: Estrategia híbrida combinando bases SQL (transaccionales ACID) y NoSQL para consultas rápidas.',
      architectureHighlight: 'Microservices · DDD · CQRS MediatR · Polyglot Persistence',
      tech: ['Microservicios', 'C#', '.NET', 'CQRS', 'React', 'SQL Server'],
      image: '/projects/personal-eco/homeDiseno.WebP',
      gallery: [
        '/projects/personal-eco/homeDiseno.WebP',
        '/projects/personal-eco/homeDiseno2.WebP',
        '/projects/personal-eco/proyectosDiseno.WebP',
        '/projects/personal-eco/swagguerConstructionAPI.WebP',
        '/projects/personal-eco/swagguerUserMangementAPI.WebP'
      ],
      link: '',
      github: 'https://github.com/danimtx',
      year: '2024',
      category: 'backend'
    },
    {
      id: 6,
      title: 'Cybercorp Task Management',
      subtitle: 'Sistema de Gestión Operativa & Soporte TI',
      description: 'Sistema interno fullstack diseñado durante mi experiencia en Cybercorp para la asignación, seguimiento de tickets y control operativo del personal técnico.\n\nAspectos de Ingeniería:\n• Control Operativo: Reducción drástica en tiempos de respuesta mediante tableros de estado y métricas de cumplimiento.\n• Modelado Relacional: Base de datos SQL Server estructurada para control de roles, trazabilidad de tickets y auditoría.\n• Integración de Infraestructura: Soporte a redes TCP/IP y sistemas de seguridad CCTV.',
      architectureHighlight: 'C# / .NET · SQL Server · TCP/IP Networks · Operational SLA Tracking',
      tech: ['C#', '.NET', 'SQL Server', 'JavaScript', 'Redes TCP/IP'],
      image: '/projects/ciber/login.WebP',
      gallery: [
        '/projects/ciber/login.WebP',
        '/projects/ciber/crearInspeccion.WebP',
        '/projects/ciber/listarInspeccion.WebP'
      ],
      link: '',
      github: 'https://github.com/danimtx',
      year: '2024 - 2025',
      category: 'fullstack'
    },
    {
      id: 7,
      title: 'Dino Juego',
      subtitle: 'Videojuego Móvil Android 60 FPS',
      description: 'Proyecto de gamificación interactiva para Android que integra geografía boliviana con mecánicas de exploración y acción.\n\nAspectos de Ingeniería:\n• Rendimiento Móvil: Optimización rigurosa de memoria, batching de texturas y física de colisiones a 60 FPS estables.\n• Arquitectura de Código: Principios SOLID y patrones de estado (FSM) para la IA de enemigos (Patrulla, Persecución, Ataque).\n• Gamificación Cultural: Mapas interactivos de Tarija, Potosí, La Paz y Cochabamba.',
      architectureHighlight: 'Unity 3D Engine · C# SOLID · Finite State Machine (FSM) · 60 FPS Mobile Opt',
      tech: ['Unity 3D', 'C#', 'Android', 'Game Physics', 'SOLID'],
      image: '/projects/Dino/DinoMenu - copia.WebP',
      gallery: [
        '/projects/Dino/DinoMenu - copia.WebP',
        '/projects/Dino/DinoCochaGame.WebP',
        '/projects/Dino/LaPazGame.WebP',
        '/projects/Dino/mapaTarija.WebP',
        '/projects/Dino/seleccicionMapaBolivia.WebP',
        '/projects/Dino/DinoPando.WebP',
        '/projects/Dino/gamePotosi.WebP'
      ],
      link: '',
      github: '',
      apk: 'https://drive.google.com/file/d/1pJmCkarRZ0giUA7L-8U7vIruavCPFFw3/view?usp=drive_link',
      year: '2024',
      category: 'gamedev'
    },
    {
      id: 8,
      title: 'Vinos Aura',
      subtitle: 'E-Commerce Enológico & State Management',
      description: 'Tienda virtual especializada en la industria vitivinícola tarijeña, con catálogo interactivo, carrito de compras dinámico y blog enológico integrado.',
      architectureHighlight: 'React SPA · Modular CSS · Global State Store',
      tech: ['React', 'CSS Modules', 'State Management', 'UI/UX'],
      image: '/projects/vinos-aura/home.png',
      gallery: [
        '/projects/vinos-aura/home.png',
        '/projects/vinos-aura/carritoCompras.png',
        '/projects/vinos-aura/vinoProdcuto.png',
        '/projects/vinos-aura/pagNosotros.png',
        '/projects/vinos-aura/blog.png'
      ],
      link: '',
      github: '',
      year: '2024',
      category: 'fullstack'
    }
  ];
}

export const projects = getProjects('en');

export const mainCertificates: Certificate[] = [
  {
    id: 1,
    title: 'ACM-ICPC 2025 South America Regional Finals',
    institution: 'ICPC Global / UPDS (Team RISE)',
    year: '2025',
    img: '/projects/certificados/ICPC-2025.jpeg'
  },
  {
    id: 2,
    title: 'ACM-ICPC 2024 South America Regional Finals',
    institution: 'ICPC Global / UAJMS (Team Dijkstraidos)',
    year: '2024',
    img: '/projects/certificados/ICPC-2024.jpeg'
  },
  {
    id: 3,
    title: 'Inteligencia Artificial y Ciencia de Datos',
    institution: 'Jeju National University (Corea del Sur)',
    year: '2024',
    img: '/projects/certificados/IA-u-jeju.jpeg'
  },
  {
    id: 4,
    title: 'Google I/O Extended Cochabamba',
    institution: 'Google Developer Groups',
    year: '2024',
    img: '/projects/certificados/google-IO.png'
  }
];

export const otherCertificates: Certificate[] = [
  {
    id: 5,
    title: 'CITIC 2024 - Cybersecurity & Digital Infrastructure',
    institution: 'International ICT Congress',
    year: '2024',
    img: '/projects/certificados/citic_2024_ciberceguridad.png'
  },
  {
    id: 6,
    title: 'Applied AI & Automation Engineering',
    institution: 'Universidad Privada Domingo Savio (UPDS)',
    year: '2023',
    img: '/projects/certificados/IA-upds.jpeg'
  },
  {
    id: 7,
    title: 'Scientific Research Methodologies & APA Guidelines',
    institution: 'Universidad Autónoma Juan Misael Saracho',
    year: '2023',
    img: '/projects/certificados/APA-UAJMS.jpeg'
  },
  {
    id: 8,
    title: 'Enterprise Excel & Advanced Data Analytics',
    institution: 'Professional Training Institute',
    year: '2023',
    img: '/projects/certificados/cerfificado_EXEL.png'
  }
];

