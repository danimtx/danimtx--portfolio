import React, { useState } from 'react';
import { FaShieldAlt, FaLayerGroup, FaCogs, FaDatabase, FaProjectDiagram, FaRobot } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

type ArchMode = 'clean' | 'cqrs' | 'ai';

interface LayerInfo {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  description: string;
  components: string[];
  principle: string;
}

const CLEAN_LAYERS_EN: LayerInfo[] = [
  {
    id: 'frameworks',
    name: '1. Drivers & Frameworks',
    subtitle: 'Infrastructure, Web API, UI & Persistence',
    color: '#bf00ff',
    description: 'External layer housing frameworks (.NET / ASP.NET Core, React), databases (PostgreSQL, SQL Server), external tools, and Docker containers.',
    components: ['ASP.NET Core Web API', 'Entity Framework Core', 'PostgreSQL / SQL Server', 'Docker Containers', 'React / Expo Frontends'],
    principle: 'Infrastructure is a replaceable implementation detail depending strictly on inward abstractions.'
  },
  {
    id: 'adapters',
    name: '2. Interface Adapters',
    subtitle: 'Controllers, Gateways & CQRS Handlers',
    color: '#00f0ff',
    description: 'Converts and translates data between formats convenient for the web/DB and the data structures required by Use Cases.',
    components: ['API Controllers / Endpoints', 'MediatR Request Handlers', 'Repository Implementations', 'JWT Auth Middleware', 'DTO Mappers'],
    principle: 'Decouples business logic from delivery transport protocols (HTTP, gRPC, WebSockets).'
  },
  {
    id: 'usecases',
    name: '3. Application Core (Use Cases)',
    subtitle: 'Business Flow Orchestration',
    color: '#00ff88',
    description: 'Contains application-specific business rules. Orchestrates operations through segregated Commands and Queries (CQRS).',
    components: ['Use Cases / Interactors', 'MediatR Commands & Queries', 'Repository Interfaces', 'Business Validation Rules', 'Domain Event Handlers'],
    principle: 'Defines WHAT the system does without depending on HOW data is persisted.'
  },
  {
    id: 'domain',
    name: '4. Domain Layer (Pure Core)',
    subtitle: 'Entities, Value Objects & Enterprise Logic',
    color: '#ffd700',
    description: 'The heartbeat of the software. Encapsulates critical enterprise business rules completely independent of any external framework or third-party library.',
    components: ['Domain Entities & Aggregates', 'Value Objects', 'Domain Events & Exceptions', 'Pure Business Algorithms', 'Specifications'],
    principle: 'Zero external dependencies. Mathematical stability and maximum testability.'
  }
];

const CLEAN_LAYERS_ES: LayerInfo[] = [
  {
    id: 'frameworks',
    name: '1. Drivers & Frameworks',
    subtitle: 'Infraestructura, Web API, UI & Persistencia',
    color: '#bf00ff',
    description: 'Capa externa donde residen los frameworks (.NET / ASP.NET Core, React), bases de datos (PostgreSQL, SQL Server), herramientas externas y contenedores Docker.',
    components: ['ASP.NET Core Web API', 'Entity Framework Core', 'PostgreSQL / SQL Server', 'Docker Containers', 'React / Expo Frontends'],
    principle: 'La infraestructura es un detalle sustituible que depende de las abstracciones internas.'
  },
  {
    id: 'adapters',
    name: '2. Interface Adapters',
    subtitle: 'Controladores, Gateways & Handlers CQRS',
    color: '#00f0ff',
    description: 'Transforma y traduce los datos entre el formato conveniente para la web/BD y las estructuras requeridas por los Casos de Uso.',
    components: ['API Controllers / Endpoints', 'MediatR Request Handlers', 'Repository Implementations', 'JWT Authentication Middleware', 'DTO Mappers'],
    principle: 'Desacopla la lógica de negocio del protocolo de transporte (HTTP, gRPC, WebSockets).'
  },
  {
    id: 'usecases',
    name: '3. Application Core (Casos de Uso)',
    subtitle: 'Orquestación de Flujos de Negocio',
    color: '#00ff88',
    description: 'Contiene las reglas de negocio específicas de la aplicación. Orquesta la ejecución de operaciones mediante comandos y consultas (CQRS).',
    components: ['Use Cases / Interactors', 'MediatR Commands & Queries', 'Interfaces de Repositorios', 'Business Validation Rules', 'Domain Event Handlers'],
    principle: 'Define QUÉ hace el sistema sin depender de CÓMO se almacenan los datos.'
  },
  {
    id: 'domain',
    name: '4. Domain Layer (Núcleo Puro)',
    subtitle: 'Entidades, Value Objects & Lógica Empresarial',
    color: '#ffd700',
    description: 'El corazón del software. Modelos y entidades que encapsulan las reglas críticas de negocio independientes de cualquier framework o librería externa.',
    components: ['Domain Entities & Aggregates', 'Value Objects', 'Domain Events & Exceptions', 'Pure Business Algorithms', 'Specifications'],
    principle: 'Cero dependencias externas. Estabilidad matemática y máxima testeabilidad.'
  }
];

const CQRS_NODES_EN = [
  { id: 'client', title: 'Clients & Apps', desc: 'React SPAs, React Native mobile apps, and external microservices issuing requests.', color: '#00f0ff' },
  { id: 'mediatr', title: 'MediatR Bus & Gateway', desc: 'In-memory dispatcher and decoupled messaging bus routing commands and queries.', color: '#bf00ff' },
  { id: 'command', title: 'Command Pipeline (Write)', desc: 'Transactional state mutations with FluentValidation rules and domain event dispatch.', color: '#ff0055' },
  { id: 'query', title: 'Query Pipeline (Read)', desc: 'Ultra-fast optimized reads utilizing Dapper / EF Core No-Tracking projections.', color: '#00ff88' },
  { id: 'store', title: 'Polyglot Persistence', desc: 'Transactional PostgreSQL + Distributed in-memory cache for instant throughput.', color: '#ffd700' },
];

const CQRS_NODES_ES = [
  { id: 'client', title: 'Clientes & Apps', desc: 'SPA React, Apps Móviles React Native y Microservicios externos que emiten solicitudes.', color: '#00f0ff' },
  { id: 'mediatr', title: 'MediatR Bus & Gateway', desc: 'Despachador en memoria y bus de mensajería desacoplada que enruta comandos y consultas.', color: '#bf00ff' },
  { id: 'command', title: 'Command Pipeline (Write)', desc: 'Mutaciones de estado transaccionales con validación FluentValidation y reglas de dominio.', color: '#ff0055' },
  { id: 'query', title: 'Query Pipeline (Read)', desc: 'Lecturas de ultra alto rendimiento optimizadas con proyecciones Dapper / EF Core No-Tracking.', color: '#00ff88' },
  { id: 'store', title: 'Persistencia Híbrida', desc: 'PostgreSQL transaccional + Cache distribuido en memoria para rendimiento instantáneo.', color: '#ffd700' },
];

const AI_PIPELINE_EN = [
  { id: 'trigger', step: '01. INPUT / TRIGGER', title: 'Event Trigger & Context Injection', desc: 'Webhook ingestion, audio, or video processing with dynamic vector retrieval and context enrichment.', color: '#00f0ff' },
  { id: 'orchestrator', step: '02. N8N ENGINE', title: 'Workflow Orchestration (n8n)', desc: 'Automated pipelines managing multi-step control flow, self-healing retries, and conditional branching.', color: '#bf00ff' },
  { id: 'reasoning', step: '03. LLM CORE', title: 'Multi-Agent Reasoning Core', desc: 'Large language models executing complex task decomposition, chain-of-thought, and dynamic tool selection.', color: '#ffd700' },
  { id: 'execution', step: '04. ACTION / OUTPUT', title: 'Tool Calling & Structured Output', desc: 'Executing database mutations, generating athletic biomechanical diagnostics, or voice responses.', color: '#00ff88' },
];

const AI_PIPELINE_ES = [
  { id: 'trigger', step: '01. INPUT / TRIGGER', title: 'Event Trigger & Context Injection', desc: 'Recepción de webhook, audio o video con enriquecimiento dinámico de contexto y vectorización.', color: '#00f0ff' },
  { id: 'orchestrator', step: '02. N8N ENGINE', title: 'Workflow Orchestration (n8n)', desc: 'Flujos automatizados que gestionan control de flujo, reintentos y bifurcación condicional.', color: '#bf00ff' },
  { id: 'reasoning', step: '03. LLM CORE', title: 'Multi-Agent Reasoning Core', desc: 'Modelos de lenguaje ejecutando descomposición de tareas complejas y selección de herramientas.', color: '#ffd700' },
  { id: 'execution', step: '04. ACTION / OUTPUT', title: 'Tool Calling & Structured Output', desc: 'Llamada a APIs de bases de datos, generación de diagnósticos deportivos o respuestas de voz.', color: '#00ff88' },
];

export const ArchitectureSchematic: React.FC = () => {
  const { lang } = useLanguage();
  const [archMode, setArchMode] = useState<ArchMode>('clean');

  const cleanLayers = lang === 'en' ? CLEAN_LAYERS_EN : CLEAN_LAYERS_ES;
  const cqrsNodes = lang === 'en' ? CQRS_NODES_EN : CQRS_NODES_ES;
  const aiPipeline = lang === 'en' ? AI_PIPELINE_EN : AI_PIPELINE_ES;

  const [selectedLayerIndex, setSelectedLayerIndex] = useState<number>(0);
  const [selectedCqrsIndex, setSelectedCqrsIndex] = useState<number>(1);
  const [selectedAiIndex, setSelectedAiIndex] = useState<number>(2);

  const selectedCleanLayer = cleanLayers[selectedLayerIndex] || cleanLayers[0];
  const selectedCqrsNode = cqrsNodes[selectedCqrsIndex] || cqrsNodes[0];
  const selectedAiStep = aiPipeline[selectedAiIndex] || aiPipeline[0];

  return (
    <div className="arch-schematic-wrapper">
      {/* Selector de Modo Arquitectónico */}
      <div className="arch-mode-selector-bar">
        <button
          type="button"
          className={`arch-mode-btn ${archMode === 'clean' ? 'active' : ''}`}
          onClick={() => setArchMode('clean')}
        >
          <FaLayerGroup size={14} />
          <span>{lang === 'en' ? 'Clean Architecture (Hexagonal)' : 'Clean Architecture (Hexagonal)'}</span>
        </button>
        <button
          type="button"
          className={`arch-mode-btn ${archMode === 'cqrs' ? 'active' : ''}`}
          onClick={() => setArchMode('cqrs')}
        >
          <FaProjectDiagram size={14} />
          <span>{lang === 'en' ? 'Microservices CQRS & MediatR' : 'Microservicios CQRS & MediatR'}</span>
        </button>
        <button
          type="button"
          className={`arch-mode-btn ${archMode === 'ai' ? 'active' : ''}`}
          onClick={() => setArchMode('ai')}
        >
          <FaRobot size={14} />
          <span>{lang === 'en' ? 'AI Agent Pipeline (n8n)' : 'Pipeline Agentes IA (n8n)'}</span>
        </button>
      </div>

      {/* Header descriptivo */}
      <div className="arch-header" style={{ marginTop: '2rem' }}>
        <div className="arch-eyebrow">
          <FaShieldAlt size={14} />
          <span>
            {archMode === 'clean' && (lang === 'en' ? 'PURE SOFTWARE DESIGN & DEPENDENCY INVERSION' : 'DISEÑO DE SOFTWARE PURO & REGLA DE DEPENDENCIAS')}
            {archMode === 'cqrs' && (lang === 'en' ? 'CQRS PATTERN · COMMAND & QUERY SEGREGATION' : 'PATRÓN CQRS · SEGREGACIÓN DE COMANDOS Y CONSULTAS')}
            {archMode === 'ai' && (lang === 'en' ? 'AUTONOMOUS AI AGENTS & LLM ORCHESTRATION' : 'ORQUESTACIÓN DE AGENTES AUTÓNOMOS DE IA & LLMS')}
          </span>
        </div>
        <h3 className="arch-title">
          {archMode === 'clean' && (lang === 'en' ? 'Concentric Clean Architecture Engine' : 'Esquema de Clean Architecture Concéntrica')}
          {archMode === 'cqrs' && (lang === 'en' ? 'Decoupled Command & Query Pipeline' : 'Flujo Desacoplado de Comandos & Consultas')}
          {archMode === 'ai' && (lang === 'en' ? 'Autonomous AI Agents & n8n Architecture' : 'Arquitectura de Agentes Inteligentes & n8n')}
        </h3>
        <p className="arch-subtitle">
          {archMode === 'clean' && (lang === 'en' ? 'Decoupled into 4 concentric layers: Domain Core remains 100% isolated from external frameworks and database drivers.' : 'Estructuración desacoplada en 4 capas concéntricas: el Dominio permanece 100% aislado de frameworks y bases de datos.')}
          {archMode === 'cqrs' && (lang === 'en' ? 'Strict isolation between transactional state-mutating commands and hyper-optimized asynchronous read queries.' : 'Separación estricta entre operaciones de mutación transaccional y consultas de lectura rápida optimizada.')}
          {archMode === 'ai' && (lang === 'en' ? 'Seamless integration of multi-agent reasoning, context injection, dynamic guardrails, and deterministic tool execution.' : 'Integración de pipelines autónomos con inyección de contexto, orquestación de workflows y ejecución de herramientas.')}
        </p>
      </div>

      {/* MODO 1: CLEAN ARCHITECTURE */}
      {archMode === 'clean' && (
        <div className="arch-content-grid">
          <div className="arch-svg-container">
            <svg viewBox="0 0 400 400" className="arch-svg" aria-label="Diagrama de capas concéntricas de Clean Architecture">
              <defs>
                <radialGradient id="grad-center" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffd700" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#ffd700" stopOpacity="0.08" />
                </radialGradient>
              </defs>

              <circle
                cx="200" cy="200" r="180"
                className={`arch-ring ring-frameworks ${selectedLayerIndex === 0 ? 'active' : ''}`}
                onClick={() => setSelectedLayerIndex(0)}
              />
              <circle
                cx="200" cy="200" r="135"
                className={`arch-ring ring-adapters ${selectedLayerIndex === 1 ? 'active' : ''}`}
                onClick={() => setSelectedLayerIndex(1)}
              />
              <circle
                cx="200" cy="200" r="90"
                className={`arch-ring ring-usecases ${selectedLayerIndex === 2 ? 'active' : ''}`}
                onClick={() => setSelectedLayerIndex(2)}
              />
              <circle
                cx="200" cy="200" r="48"
                className={`arch-ring ring-domain ${selectedLayerIndex === 3 ? 'active' : ''}`}
                onClick={() => setSelectedLayerIndex(3)}
              />

              <text x="200" y="32" textAnchor="middle" className="arch-svg-label">FRAMEWORKS & DRIVERS</text>
              <text x="200" y="78" textAnchor="middle" className="arch-svg-label">INTERFACE ADAPTERS (CQRS)</text>
              <text x="200" y="122" textAnchor="middle" className="arch-svg-label">USE CASES (APP)</text>
              <text x="200" y="196" textAnchor="middle" className="arch-svg-domain-label">DOMAIN</text>
              <text x="200" y="210" textAnchor="middle" className="arch-svg-domain-sub">CORE</text>

              <path d="M 200,45 L 200,140" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
            </svg>
            <div className="arch-interactive-hint">
              <span>● {lang === 'en' ? 'Click any layer to inspect its architectural purpose' : 'Haz clic en cualquier capa para inspeccionar su rol'}</span>
            </div>
          </div>

          <div className="arch-details-panel">
            <div className="arch-layer-badge" style={{ borderColor: selectedCleanLayer.color, color: selectedCleanLayer.color }}>
              <FaShieldAlt size={13} />
              <span>{selectedCleanLayer.name}</span>
            </div>
            <h4 className="arch-layer-title" style={{ color: selectedCleanLayer.color }}>{selectedCleanLayer.subtitle}</h4>
            <p className="arch-layer-desc">{selectedCleanLayer.description}</p>
            <div className="arch-components-block">
              <div className="arch-block-label">
                <FaCogs size={13} />
                <span>{lang === 'en' ? 'APPLIED COMPONENTS & PATTERNS' : 'COMPONENTES Y PATRONES APLICADOS'}</span>
              </div>
              <div className="arch-tags-list">
                {selectedCleanLayer.components.map((comp) => (
                  <span key={comp} className="arch-pill-tag">{comp}</span>
                ))}
              </div>
            </div>
            <div className="arch-principle-card">
              <div className="arch-principle-label">
                <FaDatabase size={12} />
                <span>{lang === 'en' ? 'ARCHITECTURAL PRINCIPLE' : 'PRINCIPIO ARQUITECTÓNICO'}</span>
              </div>
              <p className="arch-principle-text">"{selectedCleanLayer.principle}"</p>
            </div>
          </div>
        </div>
      )}

      {/* MODO 2: MICROSERVICIOS CQRS & MEDIATR */}
      {archMode === 'cqrs' && (
        <div className="arch-cqrs-view">
          <div className="arch-cqrs-flow-grid">
            {cqrsNodes.map((node, idx) => (
              <div
                key={node.id}
                className={`arch-cqrs-card ${selectedCqrsIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedCqrsIndex(idx)}
                style={{ borderColor: selectedCqrsIndex === idx ? node.color : undefined }}
              >
                <div className="cqrs-card-header" style={{ color: node.color }}>
                  <span className="cqrs-dot" style={{ background: node.color }} />
                  <h4>{node.title}</h4>
                </div>
                <p>{node.desc}</p>
              </div>
            ))}
          </div>

          <div className="arch-principle-card" style={{ marginTop: '2rem', borderLeftColor: selectedCqrsNode.color }}>
            <div className="arch-principle-label" style={{ color: selectedCqrsNode.color }}>
              <span>{lang === 'en' ? `TECHNICAL DEEP DIVE: ${selectedCqrsNode.title.toUpperCase()}` : `DETALLES TÉCNICOS: ${selectedCqrsNode.title.toUpperCase()}`}</span>
            </div>
            <p className="arch-principle-text">
              {lang === 'en' 
                ? 'Ensures zero contention between heavy write transactions and millions of concurrent reads via async projections and dedicated handlers.'
                : 'Garantiza cero bloqueo entre transacciones de escritura pesada y millones de lecturas concurrentes con proyecciones asíncronas.'}
            </p>
          </div>
        </div>
      )}

      {/* MODO 3: PIPELINE AGENTES IA */}
      {archMode === 'ai' && (
        <div className="arch-ai-view">
          <div className="arch-ai-steps-list">
            {aiPipeline.map((step, idx) => (
              <div
                key={step.id}
                className={`arch-ai-step-card ${selectedAiIndex === idx ? 'active' : ''}`}
                onClick={() => setSelectedAiIndex(idx)}
                style={{ borderLeftColor: step.color }}
              >
                <div className="ai-step-badge" style={{ color: step.color }}>{step.step}</div>
                <h4 style={{ color: selectedAiIndex === idx ? '#fff' : '#ccc' }}>{step.title}</h4>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="arch-principle-card" style={{ marginTop: '2rem', borderLeftColor: selectedAiStep.color }}>
            <div className="arch-principle-label" style={{ color: selectedAiStep.color }}>
              <span>{lang === 'en' ? `AGENT PIPELINE: ${selectedAiStep.step}` : `ARQUITECTURA DE AGENTES: ${selectedAiStep.step}`}</span>
            </div>
            <p className="arch-principle-text">
              {lang === 'en'
                ? 'Dynamic prompt injection, safety guardrails, and deterministic tool calls to automate mission-critical workflows with zero hallucinations.'
                : 'Inyección dinámica de prompts, guardrails de seguridad y llamadas estructuradas a herramientas para automatizar procesos complejos sin fallos de alucinación.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureSchematic;

