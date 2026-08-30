import React, { useState, useEffect } from 'react';
import { FiAward, FiCpu, FiExternalLink } from 'react-icons/fi';
import { FaCodeBranch } from 'react-icons/fa';
import { useLanguage } from '../i18n/LanguageContext';

interface Node {
  id: number;
  label: string;
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
  weight: number;
}

const NODES: Node[] = [
  { id: 0, label: 'S (Start)', x: 40, y: 110 },
  { id: 1, label: 'DP-1', x: 130, y: 50 },
  { id: 2, label: 'Graph', x: 130, y: 170 },
  { id: 3, label: 'Tree', x: 230, y: 50 },
  { id: 4, label: 'Dijkstra', x: 230, y: 170 },
  { id: 5, label: 'Target (AC)', x: 330, y: 110 },
];

const EDGES: Edge[] = [
  { from: 0, to: 1, weight: 4 },
  { from: 0, to: 2, weight: 2 },
  { from: 1, to: 3, weight: 5 },
  { from: 1, to: 2, weight: 1 },
  { from: 2, to: 4, weight: 8 },
  { from: 2, to: 3, weight: 6 },
  { from: 3, to: 5, weight: 2 },
  { from: 4, to: 5, weight: 3 },
];

const ALGO_STEPS_EN = [
  { visited: [0], activeEdge: 1, desc: 'Initialization: Source node S with distance 0. Inspecting adjacent frontier.' },
  { visited: [0, 2], activeEdge: 3, desc: 'Relaxing edge (0, 2) with weight 2. Min-Heap extracts node 2.' },
  { visited: [0, 2, 1], activeEdge: 2, desc: 'Relaxing edge (2, 1) weight 1. Shortest path to node 1 updated.' },
  { visited: [0, 2, 1, 3], activeEdge: 6, desc: 'Exploring edge (3, 5) with weight 2 towards the target.' },
  { visited: [0, 2, 1, 3, 5], activeEdge: -1, desc: 'Optimal Path Resolved! Complexity: O((V + E) log V) — Verdict: Accepted (AC).' },
];

const ALGO_STEPS_ES = [
  { visited: [0], activeEdge: 1, desc: 'Inicialización: Nodo fuente S con distancia 0. Explorando adyacentes.' },
  { visited: [0, 2], activeEdge: 3, desc: 'Relajando arista (0, 2) con peso 2. Min-Heap extrae nodo 2.' },
  { visited: [0, 2, 1], activeEdge: 2, desc: 'Relajando arista (2, 1) peso 1. Ruta óptima a nodo 1 actualizada.' },
  { visited: [0, 2, 1, 3], activeEdge: 6, desc: 'Explorando arista (3, 5) con peso 2 hacia el objetivo.' },
  { visited: [0, 2, 1, 3, 5], activeEdge: -1, desc: '¡Solución Óptima Encontrada! Complejidad: O((V + E) log V) — Veredicto: Accepted (AC).' },
];

export const AlgorithmVisualizer: React.FC = () => {
  const { lang } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const [visitedNodes, setVisitedNodes] = useState<number[]>([0]);
  const [activeEdges, setActiveEdges] = useState<number[]>([1]);
  const [isAutoRunning, setIsAutoRunning] = useState(true);

  const algoSteps = lang === 'en' ? ALGO_STEPS_EN : ALGO_STEPS_ES;

  useEffect(() => {
    if (!isAutoRunning) return;
    const timer = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % algoSteps.length;
        setVisitedNodes(algoSteps[next].visited);
        setActiveEdges([algoSteps[next].activeEdge]);
        return next;
      });
    }, 2400);
    return () => clearInterval(timer);
  }, [isAutoRunning, algoSteps]);

  const triggerNextStep = () => {
    setIsAutoRunning(false);
    setActiveStep((prev) => {
      const next = (prev + 1) % algoSteps.length;
      setVisitedNodes(algoSteps[next].visited);
      setActiveEdges([algoSteps[next].activeEdge]);
      return next;
    });
  };

  return (
    <div className="algo-visualizer-card">
      <div className="algo-header">
        <div className="algo-badge-icpc">
          <FiAward size={16} />
          <span>{lang === 'en' ? '2X ACM-ICPC SOUTH AMERICA REGIONAL FINALIST' : 'DOBLE FINALISTA REGIONAL ACM-ICPC SOUTH AMERICA'}</span>
        </div>
        <h3 className="algo-title">{lang === 'en' ? 'High-Performance Algorithmic Engineering' : 'Pensamiento Algorítmico de Alto Rendimiento'}</h3>
        <p className="algo-desc">
          {lang === 'en'
            ? 'Top 20 in Bolivia National Finals 2025 (Team RISE - UPDS) and South America Regional Finalist 2024 (Team Dijkstraidos - UAJMS). Deep mastery of advanced graph theory, dynamic programming, and asymptotic bounds ($O(N \\log N)$, $O(V+E)$).'
            : 'Top 20 en la Final Nacional Bolivia 2025 (Equipo RISE - UPDS) y Finalista Sudamérica 2024 (Equipo Dijkstraidos - UAJMS). Dominio en estructuras de datos avanzadas, optimización de tiempo ($O(N \\log N)$) y memoria.'}
        </p>
      </div>

      <div className="algo-body-grid">
        {/* Grafo SVG Interactivo */}
        <div className="algo-graph-box">
          <div className="algo-graph-header">
            <span className="algo-graph-status">
              <span className="pulse-indicator" /> {lang === 'en' ? 'GRAPH SIMULATOR (DIJKSTRA / SHORTEST PATH)' : 'SIMULADOR DE GRAFO (DIJKSTRA / SHORTEST PATH)'}
            </span>
            <button
              type="button"
              className="algo-step-btn"
              onClick={triggerNextStep}
              aria-label={lang === 'en' ? 'Next algorithm step' : 'Siguiente paso de algoritmo'}
            >
              {lang === 'en' ? 'Next Step ➔' : 'Paso siguiente ➔'}
            </button>
          </div>

          <svg viewBox="0 0 380 220" className="algo-svg">
            {/* Aristas (Edges) */}
            {EDGES.map((edge, idx) => {
              const fromN = NODES[edge.from];
              const toN = NODES[edge.to];
              const isHighlight = activeEdges.includes(idx);
              const isPathUsed = visitedNodes.includes(edge.from) && visitedNodes.includes(edge.to);

              return (
                <g key={`edge-${idx}`}>
                  <line
                    x1={fromN.x}
                    y1={fromN.y}
                    x2={toN.x}
                    y2={toN.y}
                    stroke={isHighlight ? '#00f0ff' : isPathUsed ? '#ffd700' : 'rgba(255,255,255,0.15)'}
                    strokeWidth={isHighlight ? 3 : isPathUsed ? 2 : 1}
                    strokeDasharray={isHighlight ? '6 3' : 'none'}
                    className={isHighlight ? 'algo-edge-active' : ''}
                  />
                  {/* Peso de la arista */}
                  <rect
                    x={(fromN.x + toN.x) / 2 - 8}
                    y={(fromN.y + toN.y) / 2 - 8}
                    width="16"
                    height="16"
                    rx="3"
                    fill="#050510"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.8"
                  />
                  <text
                    x={(fromN.x + toN.x) / 2}
                    y={(fromN.y + toN.y) / 2 + 4}
                    textAnchor="middle"
                    fill="#a0a0b0"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {edge.weight}
                  </text>
                </g>
              );
            })}

            {/* Nodos (Nodes) */}
            {NODES.map((node) => {
              const isVisited = visitedNodes.includes(node.id);
              const isTarget = node.id === 5;
              const isSource = node.id === 0;

              return (
                <g key={`node-${node.id}`} className="algo-node-group">
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isTarget || isSource ? 18 : 15}
                    fill={isVisited ? (isTarget ? '#ffd700' : '#00f0ff') : '#121222'}
                    stroke={isVisited ? '#fff' : 'rgba(255,255,255,0.3)'}
                    strokeWidth={isVisited ? 2.5 : 1}
                    className={isVisited ? 'algo-node-glow' : ''}
                  />
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill={isVisited ? '#000' : '#fff'}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="monospace"
                  >
                    {node.id}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + (node.y > 100 ? 28 : -20)}
                    textAnchor="middle"
                    fill={isVisited ? '#00f0ff' : '#777'}
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Explicación del paso actual */}
          <div className="algo-step-explanation">
            <span className="algo-step-badge">{lang === 'en' ? `STEP ${activeStep + 1}/${algoSteps.length}` : `PASO ${activeStep + 1}/${algoSteps.length}`}</span>
            <p className="algo-step-text">{algoSteps[activeStep].desc}</p>
          </div>
        </div>

        {/* Estadísticas de Competencia */}
        <div className="algo-stats-sidebar">
          <div className="algo-stat-item">
            <div className="algo-stat-label">
              <FiAward className="algo-icon" />
              <span>ACM-ICPC BOLIVIA 2025</span>
            </div>
            <div className="algo-stat-val gold">{lang === 'en' ? 'National Top 20' : 'Top 20 Nacional'}</div>
            <div className="algo-stat-sub">{lang === 'en' ? 'Team RISE · South America Regional Site' : 'Equipo RISE · Sede Regional Sudamericana'}</div>
          </div>

          <div className="algo-stat-item">
            <div className="algo-stat-label">
              <FiCpu className="algo-icon" />
              <span>{lang === 'en' ? 'MASTERED COMPLEXITIES' : 'COMPLEJIDADES DOMINADAS'}</span>
            </div>
            <div className="algo-stat-val cyan">O(1) · O(N log N) · O(V+E)</div>
            <div className="algo-stat-sub">{lang === 'en' ? 'Graphs, Segment Trees, DP, Bit Manipulation, Number Theory' : 'Grafos, Segment Trees, DP, Bits, Teoría de Números'}</div>
          </div>

          <div className="algo-stat-item">
            <div className="algo-stat-label">
              <FaCodeBranch className="algo-icon" />
              <span>{lang === 'en' ? 'TRAINING PLATFORMS' : 'PLATAFORMAS DE ENTRENAMIENTO'}</span>
            </div>
            <div className="algo-platforms-list">
              <span className="algo-pill">Codeforces</span>
              <span className="algo-pill">LeetCode</span>
              <span className="algo-pill">IEEEXtreme 18.0</span>
              <span className="algo-pill">RPC</span>
              <span className="algo-pill">AtCoder</span>
            </div>
          </div>

          <div className="algo-codeforces-link">
            <a
              href="https://github.com/danimtx"
              target="_blank"
              rel="noreferrer"
              className="algo-link-btn"
            >
              <FiExternalLink size={14} /> {lang === 'en' ? 'View Algorithm Repository' : 'Ver Repositorio de Algoritmos'}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;

