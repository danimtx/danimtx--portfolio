export type Language = 'en' | 'es';

export interface Translations {
  // Navigation
  navHome: string;
  navSkills: string;
  navProjects: string;
  navCertificates: string;
  navContact: string;

  // Hero Section
  heroKernelLive: string;
  heroBio: string;
  heroAchievementIcpc: string;
  heroAchievementArch: string;
  heroAchievementAi: string;
  heroBtnCv: string;
  heroBtnContact: string;

  // Core / Skills Section
  coreHeading: string;
  corePhaseBadge: string;
  coreBioP1: string;
  coreBioP2: string;

  // Systems Section
  systemsHeading: string;
  systemsPhaseBadge: string;

  // Achievements / ICPC Section
  achievementsHeading: string;
  achievementsPhaseBadge: string;
  achievementsCertTitle: string;
  achievementsTrainingTitle: string;
  achievementsDriveBtn: string;

  // Contact Section
  contactPhaseBadge: string;
  contactHeading: string;
  contactStatus: string;
  contactDesc: string;
  contactEmailLabel: string;
  contactWhatsappLabel: string;
  contactBtnCv: string;
}

export const DICTIONARY: Record<Language, Translations> = {
  en: {
    // Navigation
    navHome: 'Home',
    navSkills: 'Skills',
    navProjects: 'Systems',
    navCertificates: 'Achievements',
    navContact: 'Contact',

    // Hero Section
    heroKernelLive: 'SYSTEM KERNEL: ONLINE · TARIJA, BOLIVIA / GLOBAL',
    heroBio: 'Systems Engineer specialized in designing robust Clean Architectures (Hexagonal, Microservices, CQRS), autonomous AI Agent workflows, and high-performance algorithmic solutions.',
    heroAchievementIcpc: 'Top 20 ACM-ICPC Bolivia · 2x South America Finalist',
    heroAchievementArch: 'Clean Architecture, CQRS & DDD (.NET / C# / Python)',
    heroAchievementAi: 'Autonomous AI Agents & n8n Automation',
    heroBtnCv: 'Download Resume',
    heroBtnContact: "Let's Talk",

    // Core / Skills Section
    coreHeading: 'CORE',
    corePhaseBadge: 'PHASE 02 // TECH REACTOR & ARCHITECTURE',
    coreBioP1: 'Systems Engineering Graduate (UPDS) with rigorous analytical training, 2x Regional Finalist in ACM-ICPC South America Finals (2024 & 2025, Top 20 Bolivia), and hands-on experience designing decoupled, high-concurrency enterprise systems.',
    coreBioP2: 'I fuse modern architectural rigor (Clean Architecture, CQRS, Microservices) with cutting-edge Generative AI Agents, autonomous n8n workflows, and interactive WebGL experiences.',

    // Systems Section
    systemsHeading: 'SYSTEMS',
    systemsPhaseBadge: 'PHASE 03 // SYSTEMS IN ORBIT & PRODUCTION',

    // Achievements / ICPC Section
    achievementsHeading: 'AWARDS',
    achievementsPhaseBadge: 'PHASE 04 // ALGORITHMIC MATRIX & CERTIFICATIONS',
    achievementsCertTitle: 'International Recognitions & Certifications',
    achievementsTrainingTitle: 'Continuous Education & Specializations',
    achievementsDriveBtn: 'View All Certifications on Google Drive',

    // Contact Section
    contactPhaseBadge: 'PHASE 05 // QUANTUM LINK & DIRECT CONTACT',
    contactHeading: "Let's Build Something Great",
    contactStatus: 'DIRECT CHANNEL OPEN · TARIJA, BOLIVIA / REMOTE',
    contactDesc: 'Looking for a Systems Engineer capable of architecting scalable, clean software systems, optimizing algorithms, or deploying production-grade AI Agents? Reach out directly.',
    contactEmailLabel: 'Email:',
    contactWhatsappLabel: 'WhatsApp:',
    contactBtnCv: 'Download Curriculum Vitae (PDF)',
  },
  es: {
    // Navigation
    navHome: 'Inicio',
    navSkills: 'Skills',
    navProjects: 'Sistemas',
    navCertificates: 'Logros',
    navContact: 'Contacto',

    // Hero Section
    heroKernelLive: 'SISTEMA KERNEL: ONLINE · TARIJA, BOLIVIA / GLOBAL',
    heroBio: 'Ingeniero de Sistemas orientado a diseñar arquitecturas limpias y robustas (Clean Architecture, Hexagonal, Microservicios), flujos inteligentes con Agentes de IA y soluciones de alto rendimiento algorítmico.',
    heroAchievementIcpc: 'Top 20 ACM-ICPC Bolivia · 2x Finalista Sudamérica',
    heroAchievementArch: 'Clean Architecture, CQRS & DDD (.NET / C# / Python)',
    heroAchievementAi: 'Agentes Autónomos de IA & Automatización n8n',
    heroBtnCv: 'Descargar CV',
    heroBtnContact: 'Hablemos',

    // Core / Skills Section
    coreHeading: 'NÚCLEO',
    corePhaseBadge: 'FASE 02 // REACTOR TECNOLÓGICO & ARQUITECTURA',
    coreBioP1: 'Soy Egresado de Ingeniería de Sistemas (UPDS) con sólida formación analítica, doble finalista regional en ACM-ICPC South America Finals (2024 y 2025, Top 20 Bolivia) y experiencia en el diseño de arquitecturas empresariales desacopladas y de alta concurrencia.',
    coreBioP2: 'Combino el rigor de los patrones arquitectónicos modernos (Clean Architecture, CQRS, Microservicios) con la vanguardia tecnológica de Agentes de IA generativa, flujos autónomos en n8n y experiencias interactivas WebGL.',

    // Systems Section
    systemsHeading: 'SISTEMAS',
    systemsPhaseBadge: 'FASE 03 // SISTEMAS EN ÓRBITA & PRODUCCIÓN',

    // Achievements / ICPC Section
    achievementsHeading: 'LOGROS',
    achievementsPhaseBadge: 'FASE 04 // CINTURÓN ALGORÍTMICO & CERTIFICACIONES',
    achievementsCertTitle: 'Certificaciones & Reconocimientos Internacionales',
    achievementsTrainingTitle: 'Formación Continua',
    achievementsDriveBtn: 'Ver Todos Mis Certificados en Google Drive',

    // Contact Section
    contactPhaseBadge: 'FASE 05 // ENLACE & COMUNICACIÓN DIRECTA',
    contactHeading: '¿Iniciamos Misión?',
    contactStatus: 'CANAL DIRECTO ABIERTO · TARIJA, BOLIVIA / REMOTO',
    contactDesc: 'Si buscas un Ingeniero de Sistemas capacitado para diseñar arquitecturas de software limpias y escalables, optimizar rendimiento algorítmico o integrar Agentes de IA en tus productos, hablemos.',
    contactEmailLabel: 'Email:',
    contactWhatsappLabel: 'WhatsApp:',
    contactBtnCv: 'Descargar Curriculum Vitae (PDF)',
  },
};
