import React, { useState } from 'react';
import { FiTerminal, FiCpu, FiCode, FiLayers, FiCheckCircle } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

interface CommandOutput {
  cmd: string;
  lines: string[];
  badge: string;
  badgeColor: string;
}

const COMMANDS_EN: Record<string, CommandOutput> = {
  'sys --inspect': {
    cmd: 'sys --inspect --verbose',
    badge: 'KERNEL OK',
    badgeColor: '#00f0ff',
    lines: [
      '⚡ [INIT] Daniel Mancilla Tejerina · Systems Engineer (UPDS)',
      '📦 [CORE] Clean Architecture · Hexagonal · Microservices · CQRS MediatR',
      '🚀 [STACK] C# / .NET Core · Python / FastAPI · React · React Native · PostgreSQL',
      '🔒 [STATUS] High Availability · ACID Transactional Resiliency · Zero Breaches',
    ],
  },
  'icpc --stats': {
    cmd: 'icpc --rankings --history',
    badge: 'TOP 20 BOLIVIA',
    badgeColor: '#ffd700',
    lines: [
      '🏆 [ICPC 2025] South America Regional Finalist · Team RISE (UPDS)',
      '🥈 [ICPC 2024] South America Regional Finalist · Team Dijkstraidos (UAJMS)',
      '📊 [PLATFORMS] Codeforces · LeetCode · IEEEXtreme · RPC · AtCoder',
      '⚡ [ALGORITHMS] Graphs · Dynamic Programming · Segment Trees · O((V+E)logV)',
    ],
  },
  'ai --agents': {
    cmd: 'ai-pipeline --agents --workflows',
    badge: 'AUTONOMOUS ACTIVE',
    badgeColor: '#bf00ff',
    lines: [
      '🤖 [AGENTS] Multi-Model Autonomous AI Agents & LLM Orchestration via n8n',
      '🧠 [CONTEXT] Advanced Prompt Engineering & Dynamic Context Injection',
      '👁️ [VISION] Real-Time Computer Vision & Pose Estimation (Sprinter App)',
      '🔗 [PIPELINES] Production-grade automated API workflows with self-healing tools',
    ],
  },
  'arch --validate': {
    cmd: 'arch --validate-rules --domain-first',
    badge: '100% DECOUPLED',
    badgeColor: '#00ff88',
    lines: [
      '🏛️ [DOMAIN] Pure domain entities & business logic isolated from frameworks',
      '🔄 [CQRS] Strict Command (Write) vs Query (Read) pipeline segregation',
      '🛡️ [SECURITY] JWT authentication, RBAC authorization, and infrastructure isolation',
      '🎯 [VERDICT] Inward Dependency Rule: 100% Clean Architecture Compliant',
    ],
  },
};

const COMMANDS_ES: Record<string, CommandOutput> = {
  'sys --inspect': {
    cmd: 'sys --inspect --verbose',
    badge: 'KERNEL OK',
    badgeColor: '#00f0ff',
    lines: [
      '⚡ [INIT] Daniel Mancilla Tejerina · Ingeniero de Sistemas (UPDS)',
      '📦 [CORE] Clean Architecture · Hexagonal · Microservicios · CQRS MediatR',
      '🚀 [STACK] C# / .NET Core · Python / FastAPI · React · React Native · PostgreSQL',
      '🔒 [STATUS] Alta Disponibilidad · Resiliencia Transaccional · 0 Brechas',
    ],
  },
  'icpc --stats': {
    cmd: 'icpc --rankings --history',
    badge: 'TOP 20 BOLIVIA',
    badgeColor: '#ffd700',
    lines: [
      '🏆 [ICPC 2025] Finalista Regional Sudamérica · Equipo RISE (UPDS)',
      '🥈 [ICPC 2024] Finalista Regional Sudamérica · Equipo Dijkstraidos (UAJMS)',
      '📊 [PLATFORMS] Codeforces · LeetCode · IEEEXtreme · RPC · AtCoder',
      '⚡ [ALGORITHMS] Grafos · Programación Dinámica · Árboles Segmentados · O((V+E)logV)',
    ],
  },
  'ai --agents': {
    cmd: 'ai-pipeline --agents --workflows',
    badge: 'AUTONOMOUS ACTIVE',
    badgeColor: '#bf00ff',
    lines: [
      '🤖 [AGENTS] Orquestación de Agentes Autónomos & LLMs con n8n',
      '🧠 [CONTEXT] Prompt Engineering Avanzado & Inyección de Contexto Dinámico',
      '👁️ [VISION] Computer Vision & Pose Estimation en Tiempo Real (Sprinter App)',
      '🔗 [PIPELINES] Integraciones Automatizadas multi-modelo con APIs de producción',
    ],
  },
  'arch --validate': {
    cmd: 'arch --validate-rules --domain-first',
    badge: '100% DECOUPLED',
    badgeColor: '#00ff88',
    lines: [
      '🏛️ [DOMAIN] Entidades puras y reglas de negocio aisladas de frameworks',
      '🔄 [CQRS] Separación estricta de Comandos (Escritura) y Consultas (Lectura)',
      '🛡️ [SECURITY] Autenticación JWT, control RBAC y aislamiento de infraestructura',
      '🎯 [VERDICT] Regla de Dependencia hacia adentro: Compliant con Clean Architecture',
    ],
  },
};

export const HeroKernelTerminal: React.FC = () => {
  const { lang } = useLanguage();
  const [activeCmdKey, setActiveCmdKey] = useState<string>('sys --inspect');
  const commands = lang === 'en' ? COMMANDS_EN : COMMANDS_ES;
  const activeCmd = commands[activeCmdKey] || commands['sys --inspect'];

  return (
    <div className="hero-kernel-wrapper">
      {/* Monograma de Identidad Vectorial SVG DMT */}
      <div className="kernel-monogram-bar">
        <svg className="dmt-monogram-svg" viewBox="0 0 160 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dmt-grad-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#bf00ff" />
            </linearGradient>
            <linearGradient id="dmt-grad-glow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#bf00ff" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Hexágono tecnológico */}
          <polygon
            points="25,5 45,15 45,35 25,45 5,35 5,15"
            stroke="url(#dmt-grad-cyan)"
            strokeWidth="1.8"
            fill="rgba(0, 240, 255, 0.05)"
          />
          {/* Núcleo de datos central */}
          <circle cx="25" cy="25" r="4" fill="#00f0ff" />
          <path d="M25,5 L25,21 M45,35 L28,27 M5,35 L22,27" stroke="url(#dmt-grad-cyan)" strokeWidth="1.2" opacity="0.6" />

          {/* Texto DMT Vectorial de Precisión */}
          <text x="56" y="28" fill="#ffffff" fontFamily="Orbitron, sans-serif" fontSize="18" fontWeight="900" letterSpacing="3">
            DMT
          </text>
          <text x="56" y="40" fill="#00f0ff" fontFamily="JetBrains Mono, monospace" fontSize="7.5" letterSpacing="2">
            SOFTWARE CORE
          </text>
        </svg>

        <div className="kernel-live-pulse">
          <span className="live-pulse-dot" />
          <span className="live-pulse-text">SYSTEM KERNEL: LIVE</span>
        </div>
      </div>

      {/* Ventana de Terminal Cibernética */}
      <div className="terminal-window">
        {/* Barra superior de la ventana */}
        <div className="terminal-header">
          <div className="terminal-traffic-lights">
            <span className="traffic-dot red" />
            <span className="traffic-dot yellow" />
            <span className="traffic-dot green" />
          </div>
          <div className="terminal-title">
            <FiTerminal size={13} style={{ color: '#00f0ff' }} />
            <span>dmt@systems-terminal:~ (v6.12-release)</span>
          </div>
          <div className="terminal-badge" style={{ color: activeCmd.badgeColor, borderColor: activeCmd.badgeColor }}>
            <FiCheckCircle size={12} />
            <span>{activeCmd.badge}</span>
          </div>
        </div>

        {/* Botones de comandos rápidos interactivos */}
        <div className="terminal-actions-bar">
          <button
            type="button"
            className={`terminal-tab-btn ${activeCmdKey === 'sys --inspect' ? 'active' : ''}`}
            onClick={() => setActiveCmdKey('sys --inspect')}
          >
            <FiCpu size={13} />
            <span>sys --inspect</span>
          </button>
          <button
            type="button"
            className={`terminal-tab-btn ${activeCmdKey === 'icpc --stats' ? 'active' : ''}`}
            onClick={() => setActiveCmdKey('icpc --stats')}
          >
            <FiCode size={13} />
            <span>icpc --stats</span>
          </button>
          <button
            type="button"
            className={`terminal-tab-btn ${activeCmdKey === 'ai --agents' ? 'active' : ''}`}
            onClick={() => setActiveCmdKey('ai --agents')}
          >
            <FaRobot size={13} />
            <span>ai --agents</span>
          </button>
          <button
            type="button"
            className={`terminal-tab-btn ${activeCmdKey === 'arch --validate' ? 'active' : ''}`}
            onClick={() => setActiveCmdKey('arch --validate')}
          >
            <FiLayers size={13} />
            <span>arch --validate</span>
          </button>
        </div>

        {/* Pantalla de salida de la terminal */}
        <div className="terminal-screen">
          <div className="terminal-prompt-line">
            <span className="prompt-user">dmt@core</span>
            <span className="prompt-colon">:</span>
            <span className="prompt-path">~/systems</span>
            <span className="prompt-dollar">$</span>
            <span className="prompt-cmd">{activeCmd.cmd}</span>
          </div>

          <div className="terminal-output-body">
            {activeCmd.lines.map((line, idx) => (
              <div key={idx} className="terminal-output-line" style={{ animationDelay: `${idx * 0.08}s` }}>
                {line}
              </div>
            ))}
          </div>

          {/* Cursor parpadeante */}
          <div className="terminal-cursor-line">
            <span className="prompt-user">dmt@core</span>
            <span className="prompt-dollar">$</span>
            <span className="terminal-cursor" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroKernelTerminal;
