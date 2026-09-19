export interface CuratedProject {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: 'Mobile App' | 'Backend & Cloud' | 'Enterprise Web' | 'Game Dev' | 'Competitive Systems';
  role: string;
  status: 'En Desarrollo' | 'Completado' | 'Versión Beta' | 'Fase 2';
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

export const CURATED_PROJECTS: CuratedProject[] = [
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
    highlights:
      [
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
    highlights:
      [
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
    highlights:
      [
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
    highlights:
      [
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
    highlights:
      [
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
