export const projects = [
  {
    id: 1,
    title: 'Doctemia',
    subtitle: 'Plataforma E-Learning',
    description: 'Plataforma SaaS educativa (E-Learning médico). Ciclo completo de aprendizaje y evaluación.\n\nArquitectura & Highlights:\n• Construido con React y Node.js, maximizando rendimiento.\n• Seguridad Perimetral: Middlewares para interceptar peticiones y validar roles de acceso (RBAC).\n• UX Real-time: Sincronización instantánea de exámenes y resultados.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'JWT'],
    image: '/projects/Doctemia/home.WebP',
    gallery: [
      '/projects/Doctemia/home.WebP',
      '/projects/Doctemia/admCursos.WebP',
      '/projects/Doctemia/CursosVideo.WebP',
      '/projects/Doctemia/GestionUsuarios.WebP',
      '/projects/Doctemia/PanelAdmClaro.WebP'
    ],
    link: 'https://doctemia-mc.vercel.app/login',
    github: 'https://github.com/Victor30700/doctemia-mc.git',
    year: '2024'
  },
  {
    id: 2,
    title: 'Sprinter App',
    subtitle: 'Rendimiento Deportivo y Análisis',
    description: 'Ecosistema de alto rendimiento que fusiona la salud deportiva con Inteligencia Artificial.\n\nHighlights Tecnológicos:\n• Arquitectura Híbrida: Frontend optimizado y un Backend de Cálculo (Python/FastAPI) dedicado a la IA.\n• Visión por Computadora: Análisis biomecánico de video y estimación de postura (Pose Estimation).\n• Generative AI: Implementación de LLM (GPT) como Entrenador Virtual para análisis natural.',
    tech: ['React', 'IA Integration', 'Data Visualization'],
    image: '/projects/sprinter-app/home.WebP',
    gallery: [
      '/projects/sprinter-app/home.WebP',
      '/projects/sprinter-app/analisisEntrenamiento.WebP',
      '/projects/sprinter-app/analisisVideo.WebP',
      '/projects/sprinter-app/chatBot.WebP',
      '/projects/sprinter-app/graficas.WebP'
    ],
    link: 'https://app-atleta-vite.vercel.app/home',
    github: 'https://github.com/Victor30700/SprinterApp.git',
    year: '2024'
  },
  {
    id: 3,
    title: 'Vinos Aura',
    subtitle: 'E-Commerce Enológico',
    description: 'Tienda virtual especializada en vinos con sistema de carrito de compras, visualización de productos y blog integrado.',
    tech: ['React', 'CSS Modules', 'State Management'],
    image: '/projects/vinos-aura/home.png',
    gallery: [
      '/projects/vinos-aura/home.png',
      '/projects/vinos-aura/carritoCompras.png',
      '/projects/vinos-aura/vinoProdcuto.png',
      '/projects/vinos-aura/blog.png'
    ],
    link: 'https://vinos-aura.vercel.app/',
    github: 'https://github.com/danimtx/vinos-aura.git',
    year: '2023'
  },
  {
    id: 4,
    title: 'Ruta de la Frutilla',
    subtitle: 'Turismo y Geolocalización',
    description: 'Aplicación orientada al turismo con mapas interactivos, gestión de paradas y un diseño inmersivo.',
    tech: ['React', 'Maps API', 'UI/UX'],
    image: '/projects/ruta-frutilla/mapa-mapcn.png',
    gallery: [
      '/projects/ruta-frutilla/mapa-mapcn.png',
      '/projects/ruta-frutilla/modalParada.png',
      '/projects/ruta-frutilla/titulo.png',
      '/projects/ruta-frutilla/animacion de grafica.png'
    ],
    link: 'https://ruta-frutilla.vercel.app/',
    github: 'https://github.com/danimtx/ruta-frutilla.git',
    year: '2023'
  },
  {
    id: 5,
    title: 'Dino Juego',
    subtitle: 'Videojuego Móvil Android',
    description: 'Proyecto de gamificación interactiva (Android) que combina geografía y cultura boliviana.\n\nDesafíos Técnicos:\n• Optimización Móvil: Desarrollado en Unity y C# para rendimiento fluido en Android.\n• IA de Enemigos: Gestión avanzada de estados (Patrulla, Persecución, Ataque).\n• Gamificación: Integración de mapas interactivos y mecánicas de exploración (Tarija, Potosí, La Paz).',
    tech: ['Unity 3D', 'C#', 'Android', 'Game Design'],
    image: '/projects/Dino/DinoMenu - copia.WebP',
    gallery: [
      '/projects/Dino/DinoMenu - copia.WebP',
      '/projects/Dino/DinoCochaGame.WebP',
      '/projects/Dino/LaPazGame.WebP',
      '/projects/Dino/mapaTarija.WebP',
      '/projects/Dino/seleccicionMapaBolivia.WebP'
    ],
    link: '',
    github: '',
    apk: '/projects/Dino/Version_0.3_Prueba_Pts.apk',
    year: '2024'
  },
  {
    id: 6,
    title: 'JuezSinga',
    subtitle: 'Juez Virtual Backend',
    description: 'API backend con Arquitectura Limpia para un sistema de Juez Virtual (estilo LeetCode). Documentado con Swagger, maneja la compilación y evaluación de algoritmos.',
    tech: ['C#', 'ASP.NET', 'Clean Architecture', 'Swagger'],
    image: '/projects/JuezSinga/swguerJuezSinga.png',
    gallery: [
      '/projects/JuezSinga/swguerJuezSinga.png'
    ],
    link: '',
    github: 'https://github.com/danimtx/JuezSinga.git',
    year: '2024'
  },
  {
    id: 7,
    title: 'Personal Ecosystem',
    subtitle: 'Microservicios de Gestión',
    description: 'Solución empresarial modular bajo una arquitectura de sistema distribuido para orquestación de recursos.\n\nArquitectura & Highlights:\n• Diseño Desacoplado: Basado en Clean Architecture y Domain-Driven Design (DDD). Patrón CQRS con MediatR para optimizar microservicios.\n• Persistencia Políglota: Estrategia híbrida usando bases SQL (ACID) y NoSQL de alta velocidad.\n• Calidad & Testing: Suite de pruebas robusta (Unitarias e Integración) asegurando estabilidad ante cambios.',
    tech: ['Microservicios', 'C#', '.NET', 'React'],
    image: '/projects/personal-eco/homeDiseno.WebP',
    gallery: [
      '/projects/personal-eco/homeDiseno.WebP',
      '/projects/personal-eco/homeDiseno2.WebP',
      '/projects/personal-eco/proyectosDiseno.WebP',
      '/projects/personal-eco/swagguerConstructionAPI.WebP',
      '/projects/personal-eco/swagguerUserMangementAPI.WebP'
    ],
    link: '',
    github: '',
    year: '2024'
  },
  {
    id: 8,
    title: 'Ciber Sistema',
    subtitle: 'Gestión de Inspecciones',
    description: 'Solución tecnológica para digitalizar la logística de servicios e inspecciones en campo.\n\nAspectos Técnicos:\n• Arquitectura SPA: Interfaz dinámica con React para tiempos de carga instantáneos.\n• Geolocalización: Integración de mapas interactivos y tracking de técnicos.\n• Visualización de Datos: Dashboard administrativo para la toma de decisiones basada en el estado de las tareas.',
    tech: ['React', 'Node.js', 'Security'],
    image: '/projects/ciber/login.WebP',
    gallery: [
      '/projects/ciber/login.WebP',
      '/projects/ciber/crearInspeccion.WebP',
      '/projects/ciber/listarInspeccion.WebP'
    ],
    link: '',
    github: '',
    year: '2024'
  }
];

export const mainCertificates = [
  { id: 1, title: 'ICPC Regional 2025 (Top 20)', img: '/projects/certificados/ICPC-2025.jpeg' },
  { id: 2, title: 'ICPC Regional 2024', img: '/projects/certificados/ICPC-2024.jpeg' },
  { id: 3, title: 'Google I/O Extended', img: '/projects/certificados/google-IO.png' },
  { id: 4, title: 'Ciberseguridad 2024', img: '/projects/certificados/citic_2024_ciberceguridad.png' }
];

export const otherCertificates = [
  { id: 1, title: 'Inteligencia Artificial (UAJMS)', img: '/projects/certificados/IA-u-jeju.jpeg' },
  { id: 2, title: 'Excel Avanzado', img: '/projects/certificados/cerfificado_EXEL.png' },
  { id: 3, title: 'Primeros Auxilios', img: '/projects/certificados/pri-aux-policiaBOL.jpeg' },
  { id: 4, title: 'Inteligencia Artificial (UPDS)', img: '/projects/certificados/IA-upds.jpeg' }
];
