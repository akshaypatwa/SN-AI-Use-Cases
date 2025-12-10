
import React, { useState, useEffect, useRef } from 'react';
import { 
  Settings, 
  X, 
  User, 
  Database, 
  Server, 
  Brain, 
  CheckCircle2, 
  Plug, 
  Code2,
  Activity,
  Lock,
  Globe,
  FileJson,
  Search,
  ArrowRight,
  Scan,
  Send,
  Binary
} from 'lucide-react';

interface SetupModalProps {
  onClose: () => void;
}

export const SetupModal: React.FC<SetupModalProps> = ({ onClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  // The 6-step flow
  const steps = [
    {
      id: 0,
      label: "User Query",
      status: "Input Received",
      nodeId: 'user',
      payload: {
        type: "interaction",
        source: "workspace_agent",
        query: "Summarize resolution for INC00123",
        timestamp: new Date().toISOString()
      }
    },
    {
      id: 1,
      label: "Context Retrieval",
      status: "Fetching Records...",
      nodeId: 'sn',
      payload: {
        action: "lookup",
        target: "sn_inc_table",
        filters: ["sys_id=INC00123"],
        related_records: ["KB00492", "CHG0021"],
        context_found: true
      }
    },
    {
      id: 2,
      label: "ITaaP Integration",
      status: "Packaging Request...",
      nodeId: 'itaap',
      payload: {
        protocol: "secure_rest",
        encryption: "AES-256",
        headers: { "x-auth": "bearer_token_***" },
        body: {
          prompt: "Summarize...",
          grounding: "Resolution notes content..."
        }
      }
    },
    {
      id: 3,
      label: "MCP Routing",
      status: "Standardizing Protocol...",
      nodeId: 'mcp',
      payload: {
        route: "llm_gateway_v2",
        adapter: "google_gemini_pro",
        mode: "stateless",
        optimization: "true",
        tools: ["rag_search", "summarizer"]
      }
    },
    {
      id: 4,
      label: "GenAI Inference",
      status: "Generating Tokens...",
      nodeId: 'llm',
      payload: {
        model: "gemini-1.5-pro",
        input_tokens: 450,
        output_tokens: 128,
        latency: "240ms",
        finish_reason: "stop",
        safety_ratings: "PASS"
      }
    },
    {
      id: 5,
      label: "Resolution Delivery",
      status: "Rendering Response...",
      nodeId: 'return',
      payload: {
        status: 200,
        display_type: "rich_text",
        content: "The incident was resolved by restarting the service...",
        ui_render: "card_component"
      }
    }
  ];

  // Auto-advance logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 4500); // Slightly slower to allow reading
    return () => clearInterval(interval);
  }, [steps.length]);

  return (
    <div 
      className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="
            bg-[#020617] w-full max-w-7xl h-[90vh] rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] 
            relative animate-scale-in flex flex-col overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* --- DYNAMIC BACKGROUND --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
             {/* Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
            
            {/* Glow Orbs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] mix-blend-screen" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] mix-blend-screen" />
            
            {/* Moving Scanner Line */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-[20%] w-full animate-scan pointer-events-none" />
        </div>

        {/* --- HEADER --- */}
        <div className="relative z-20 px-8 py-5 border-b border-white/5 flex justify-between items-center bg-[#020617]/80 backdrop-blur-md">
            <div className="flex items-center gap-4">
                <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-fuchsia-600 rounded-lg shadow-lg">
                    <Settings size={20} className="text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-white tracking-wide">Enterprise Architecture Simulator</h2>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        System Online
                        <span className="text-slate-600">|</span>
                        <span>Latency: 24ms</span>
                    </div>
                </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                <X size={24} />
            </button>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="relative z-10 flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* LEFT: VISUAL PIPELINE */}
            <div className="flex-[2] relative p-8 flex flex-col">
                
                {/* 3D-ish Platform Look */}
                <div className="absolute inset-x-4 inset-y-8 bg-slate-900/20 border border-white/5 rounded-3xl transform perspective-1000 rotate-x-12" />

                <div className="flex-1 flex items-center justify-center relative">
                    
                    {/* SVG Connector Layer with Arrows */}
                    <svg className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 z-0 pointer-events-none overflow-visible">
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.2" />
                            </linearGradient>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                            <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                                <polygon points="0 0, 6 2, 0 4" fill="#64748b" opacity="0.5" />
                            </marker>
                             <marker id="arrowhead-active" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                                <polygon points="0 0, 6 2, 0 4" fill="#34d399" />
                            </marker>
                        </defs>
                        
                        {/* Static Base Line */}
                        <line x1="120" y1="50" x2="880" y2="50" stroke="#1e293b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                        
                        {/* Arrows between nodes */}
                        <line x1="220" y1="50" x2="280" y2="50" stroke="#334155" strokeWidth="1" markerEnd="url(#arrowhead)" />
                        <line x1="420" y1="50" x2="480" y2="50" stroke="#334155" strokeWidth="1" markerEnd="url(#arrowhead)" />
                        <line x1="620" y1="50" x2="680" y2="50" stroke="#334155" strokeWidth="1" markerEnd="url(#arrowhead)" />
                        
                        {/* Active Packet Animation - Moves entire length */}
                        {activeStep < 5 && (
                             <circle r="4" fill="#fff" filter="url(#glow)">
                                <animateMotion 
                                    dur="4.5s" 
                                    repeatCount="indefinite"
                                    path="M 120 50 L 880 50"
                                    calcMode="linear"
                                />
                            </circle>
                        )}
                        {/* Return Animation */}
                        {activeStep === 5 && (
                             <circle r="4" fill="#10b981" filter="url(#glow)">
                                <animateMotion 
                                    dur="1s" 
                                    repeatCount="indefinite"
                                    path="M 880 50 L 120 50"
                                    calcMode="linear"
                                />
                            </circle>
                        )}

                        {/* Active Segment Highlight based on step */}
                         {/* We can calculate positions approximately based on node index */}
                         {activeStep < 4 && (
                            <line 
                                x1={120 + (activeStep * 190)} 
                                y1="50" 
                                x2={120 + ((activeStep + 1) * 190)} 
                                y2="50" 
                                stroke="#34d399" 
                                strokeWidth="3" 
                                strokeLinecap="round"
                                className="transition-all duration-500 ease-out opacity-80"
                                filter="url(#glow)"
                                markerEnd="url(#arrowhead-active)"
                            />
                         )}
                    </svg>

                    {/* Nodes Container */}
                    <div className="w-full flex justify-between px-16 relative z-10">
                        {[
                            { id: 'user', label: 'User', icon: User, color: 'emerald' },
                            { id: 'sn', label: 'ServiceNow', icon: Database, color: 'indigo' },
                            { id: 'itaap', label: 'ITaaP', icon: Server, color: 'blue' },
                            { id: 'mcp', label: 'MCP', icon: Plug, color: 'orange' },
                            { id: 'llm', label: 'LLM', icon: Brain, color: 'fuchsia' },
                        ].map((node, index) => {
                            const isActive = steps[activeStep].nodeId === node.id || (activeStep === 5 && node.id === 'user');
                            const isReturn = activeStep === 5;
                            
                            // Color mapping for dynamic classes
                            const glowColor = {
                                emerald: 'shadow-emerald-500/50 border-emerald-500 text-emerald-400',
                                indigo: 'shadow-indigo-500/50 border-indigo-500 text-indigo-400',
                                blue: 'shadow-blue-500/50 border-blue-500 text-blue-400',
                                orange: 'shadow-orange-500/50 border-orange-500 text-orange-400',
                                fuchsia: 'shadow-fuchsia-500/50 border-fuchsia-500 text-fuchsia-400',
                            }[node.color];

                            return (
                                <div key={node.id} className="flex flex-col items-center gap-4 relative group">
                                    {/* Status Indicator */}
                                    <div className={`
                                        absolute -top-14 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-[10px] font-bold uppercase tracking-wider transition-all duration-500 flex flex-col items-center gap-1
                                        ${isActive ? 'opacity-100 translate-y-0 text-white border-white/30 shadow-xl' : 'opacity-0 translate-y-4 text-slate-500'}
                                    `}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${isReturn && node.id !== 'user' ? 'bg-slate-500' : 'bg-green-500 animate-pulse'}`}></div>
                                        {isReturn && node.id === 'user' ? 'Result' : 'Processing'}
                                    </div>

                                    {/* Node Icon Circle */}
                                    <div className={`
                                        w-24 h-24 rounded-3xl flex items-center justify-center border-2 transition-all duration-500 relative bg-[#020617]
                                        ${isActive 
                                            ? `${glowColor} scale-110 shadow-[0_0_40px_rgba(0,0,0,0.6)] z-20` 
                                            : 'border-slate-800 text-slate-600 scale-100 z-10 hover:border-slate-700'}
                                    `}>
                                        <node.icon size={36} strokeWidth={1.5} />
                                        
                                        {/* Internal Ping Animation if active */}
                                        {isActive && (
                                            <>
                                                <span className="absolute inset-0 rounded-3xl animate-ping border border-current opacity-20" />
                                                <span className="absolute inset-0 rounded-3xl animate-[pulse_2s_infinite] bg-current opacity-5" />
                                            </>
                                        )}
                                        
                                        {/* Corner Accents */}
                                        <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-current opacity-50 rounded-full" />
                                        <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-current opacity-50 rounded-full" />
                                        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-current opacity-50 rounded-full" />
                                        <div className="absolute bottom-2 right-2 w-1.5 h-1.5 bg-current opacity-50 rounded-full" />
                                    </div>

                                    {/* Label */}
                                    <div className="text-center mt-2">
                                        <div className={`font-bold text-sm tracking-wide transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>{node.label}</div>
                                        <div className="text-[10px] text-slate-600 font-mono mt-0.5 opacity-60">Node: 0{index + 1}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="h-16 mt-8 bg-slate-900/50 rounded-xl border border-white/5 flex items-center px-6 justify-between backdrop-blur">
                     <div className="flex items-center gap-4">
                        <Activity className="text-emerald-500 animate-pulse" size={18} />
                        <span className="text-sm text-slate-300 font-medium">Pipeline Status: <span className="text-emerald-400">{steps[activeStep].status}</span></span>
                     </div>
                     <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
                        <div className="flex items-center gap-2">
                            <Lock size={12} /> Encrypted (TLS 1.3)
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe size={12} /> Region: US-East-1
                        </div>
                     </div>
                </div>
            </div>

            {/* RIGHT: DATA & PAYLOAD */}
            <div className="flex-1 lg:max-w-[450px] bg-[#020617] border-l border-white/10 flex flex-col shadow-2xl relative z-20">
                
                {/* 1. TOP: Live Data Processing Visualizer */}
                <div className="flex-[2] flex flex-col border-b border-white/10 relative overflow-hidden">
                    <div className="px-5 py-3 bg-[#0f172a] border-b border-white/5 flex justify-between items-center z-10 relative">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Scan size={14} className="text-fuchsia-400" /> Live Data Processing
                        </h3>
                        <div className="flex items-center gap-1.5">
                             <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></div>
                             <span className="text-[10px] text-fuchsia-400 font-mono">ACTIVE</span>
                        </div>
                    </div>

                    <div className="flex-1 p-6 relative bg-slate-950/50">
                        {/* Background Animation */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fuchsia-500/10 via-slate-900/0 to-transparent opacity-50 pointer-events-none" />

                        {/* Content Switcher based on Step */}
                        <div className="h-full flex flex-col justify-center">
                            
                            {/* STEP 0: USER */}
                            {activeStep === 0 && (
                                <div className="animate-fade-in-up space-y-4">
                                    <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                        <User size={24} /> <span className="font-bold">User Input</span>
                                    </div>
                                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 text-sm text-white relative">
                                        "Summarize resolution for INC00123"
                                        <div className="absolute -right-2 -bottom-2 bg-emerald-600 text-[10px] px-2 py-0.5 rounded text-white font-mono">TXT</div>
                                    </div>
                                    <div className="flex justify-center">
                                        <ArrowRight className="text-slate-600 animate-pulse rotate-90" />
                                    </div>
                                </div>
                            )}

                             {/* STEP 1: CONTEXT */}
                            {activeStep === 1 && (
                                <div className="animate-fade-in-up space-y-4">
                                    <div className="flex items-center gap-3 text-indigo-400 mb-2">
                                        <Search size={24} /> <span className="font-bold">Lookup</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="bg-indigo-950/30 p-3 rounded-lg border border-indigo-500/30 flex justify-between items-center">
                                            <span className="text-xs text-indigo-200">INC00123</span>
                                            <CheckCircle2 size={14} className="text-emerald-500" />
                                        </div>
                                        <div className="bg-indigo-950/30 p-3 rounded-lg border border-indigo-500/30 flex justify-between items-center opacity-75">
                                            <span className="text-xs text-indigo-200">Related KB Articles</span>
                                            <span className="text-[10px] bg-indigo-500 px-1.5 rounded text-white">2 Found</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 2: ENCRYPTION */}
                            {activeStep === 2 && (
                                <div className="animate-fade-in-up space-y-4">
                                    <div className="flex items-center gap-3 text-blue-400 mb-2">
                                        <Lock size={24} /> <span className="font-bold">Secure Packaging</span>
                                    </div>
                                    <div className="bg-slate-900 p-4 rounded-xl border border-blue-500/30 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                                        <div className="font-mono text-[10px] text-blue-300 space-y-1">
                                            <div>Encrypting payload...</div>
                                            <div className="truncate opacity-50">0x7F2A9C110...</div>
                                            <div className="truncate opacity-50">0xB49201DDA...</div>
                                            <div className="text-emerald-400">Done (AES-256)</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                             {/* STEP 3: MCP */}
                             {activeStep === 3 && (
                                <div className="animate-fade-in-up space-y-4">
                                    <div className="flex items-center gap-3 text-orange-400 mb-2">
                                        <Plug size={24} /> <span className="font-bold">Protocol Adapter</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 bg-slate-900 p-3 rounded border border-slate-700 text-center">
                                            <div className="text-[10px] text-slate-500">Source</div>
                                            <div className="text-xs font-bold text-white">SN JSON</div>
                                        </div>
                                        <ArrowRight size={20} className="text-orange-500" />
                                        <div className="flex-1 bg-orange-950/20 p-3 rounded border border-orange-500/30 text-center shadow-[0_0_15px_rgba(249,115,22,0.1)]">
                                            <div className="text-[10px] text-orange-400">Target</div>
                                            <div className="text-xs font-bold text-white">Gemini API</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* STEP 4: LLM */}
                            {activeStep === 4 && (
                                <div className="animate-fade-in-up space-y-4">
                                    <div className="flex items-center gap-3 text-fuchsia-400 mb-2">
                                        <Brain size={24} /> <span className="font-bold">Inference Stream</span>
                                    </div>
                                    <div className="bg-slate-900 p-4 rounded-xl border border-fuchsia-500/30 min-h-[100px] font-mono text-xs text-fuchsia-200">
                                        <span className="animate-pulse">_</span>
                                        The incident was resolved by restarting the service and clearing the cache...
                                    </div>
                                </div>
                            )}

                             {/* STEP 5: RETURN */}
                             {activeStep === 5 && (
                                <div className="animate-fade-in-up space-y-4">
                                    <div className="flex items-center gap-3 text-emerald-400 mb-2">
                                        <CheckCircle2 size={24} /> <span className="font-bold">Resolution</span>
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-xl border-l-4 border-emerald-500 text-sm text-slate-200">
                                        <p className="font-bold mb-1">Summary Generated</p>
                                        <p className="text-xs opacity-70">Displayed in Workspace Agent.</p>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* 2. BOTTOM: Live Payload (Replaces System Log) */}
                <div className="flex-[3] flex flex-col bg-[#0f172a]/50">
                    <div className="px-5 py-3 bg-[#0f172a] border-b border-white/5 border-t border-white/5 flex justify-between items-center">
                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <FileJson size={14} className="text-blue-400" /> Live Payload
                        </h3>
                        <div className="flex gap-1.5 items-center">
                            <span className="text-[9px] text-slate-500 font-mono">Stream: {steps[activeStep].nodeId.toUpperCase()}</span>
                        </div>
                    </div>
                    
                    <div className="flex-1 p-5 overflow-auto font-mono text-xs text-blue-300 bg-[#020617] relative group">
                        {/* Subtle grid background for code area */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none" />
                        
                        <pre className="relative z-10 transition-all duration-300 animate-fade-in-up">
                            {JSON.stringify(steps[activeStep].payload, null, 2)}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
