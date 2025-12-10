
import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Brain, 
  CheckCircle, 
  Clock, 
  Copy, 
  Database, 
  MousePointer2, 
  Search, 
  Server, 
  Zap, 
  ChevronRight, 
  Layers,
  User,
  AlertTriangle,
  History,
  ShieldAlert,
  ListFilter,
  FileText,
  RefreshCw,
  Play,
  Pause,
  ArrowLeft,
  SkipForward
} from 'lucide-react';

interface Props {
    onBack: () => void;
}

// --- Global Styles for Custom Animations & Theme ---
const globalStyles = `
  /* --- Animations --- */
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.8); opacity: 0.5; }
    100% { transform: scale(1.3); opacity: 0; }
  }
  @keyframes techCornerPulse {
    0%, 100% { opacity: 0.5; border-color: rgba(52, 211, 153, 0.4); }
    50% { opacity: 1; border-color: #34d399; }
  }
  @keyframes grain {
    0%, 100% { transform: translate(0, 0); }
    10% { transform: translate(-5%, -10%); }
    20% { transform: translate(-15%, 5%); }
    30% { transform: translate(7%, -25%); }
    40% { transform: translate(-5%, 25%); }
    50% { transform: translate(-15%, 10%); }
    60% { transform: translate(15%, 0%); }
    70% { transform: translate(0%, 15%); }
    80% { transform: translate(3%, 35%); }
    90% { transform: translate(-10%, 10%); }
  }

  /* --- Backgrounds & Textures --- */
  .bg-noise {
    position: fixed;
    top: -50%;
    left: -50%;
    right: -50%;
    bottom: -50%;
    width: 200%;
    height: 200vh;
    background: transparent url('http://assets.iceable.com/img/noise-transparent.png') repeat 0 0;
    background-repeat: repeat;
    animation: grain 8s steps(10) infinite;
    opacity: 0.03;
    z-index: 0;
    pointer-events: none;
  }
  
  .bg-radial-gradient {
    /* Darker, richer background to make cards pop */
    background: radial-gradient(circle at 50% 0%, #0f172a 0%, #020617 80%, #000000 100%);
  }

  /* --- Advanced Glass Cards (Enhanced Visibility) --- */
  .section-card {
    /* Gradient Body: Lighter top, darker bottom for 3D effect */
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.85) 100%);
    
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    
    /* Defined Borders */
    border: 1px solid rgba(52, 211, 153, 0.1);
    border-top: 1px solid rgba(52, 211, 153, 0.3); /* Highlight top edge */
    
    /* Deep Shadows for Separation */
    box-shadow: 
      0 0 0 1px rgba(0,0,0,0.3), 
      0 25px 50px -12px rgba(0,0,0,0.8),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.05);
      
    position: relative;
    overflow: hidden;
    transition: transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.4s ease, border-color 0.4s ease;
  }
  
  /* Inner Shimmer/Highlight */
  .section-card::after {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0; height: 1px;
    background: linear-gradient(90deg, transparent 0%, rgba(52, 211, 153, 0.5) 50%, transparent 100%);
    opacity: 0.4;
  }

  .section-card:hover {
    transform: translateY(-4px);
    /* Brighter background on hover */
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.85) 0%, rgba(15, 23, 42, 0.95) 100%);
    border-color: rgba(52, 211, 153, 0.4);
    box-shadow: 
      0 35px 70px -15px rgba(0, 0, 0, 0.9), 
      0 0 40px rgba(52, 211, 153, 0.1) inset;
  }
  
  /* --- Tech Corners --- */
  .tech-border-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    border-color: rgba(52, 211, 153, 0.3);
    border-style: solid;
    transition: all 0.4s ease;
    z-index: 20;
    opacity: 0;
  }
  .section-card:hover .tech-border-corner {
    opacity: 1;
    width: 20px;
    height: 20px;
  }
  .tl { top: 0; left: 0; border-width: 2px 0 0 2px; border-top-left-radius: 8px; }
  .tr { top: 0; right: 0; border-width: 2px 2px 0 0; border-top-right-radius: 8px; }
  .bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; border-bottom-left-radius: 8px; }
  .br { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-bottom-right-radius: 8px; }

  /* --- Text & Gradients --- */
  .neon-text {
    text-shadow: 0 0 30px rgba(52, 211, 153, 0.4);
    background: linear-gradient(to right, #34d399, #2dd4bf);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  .step-connector-active {
    background: linear-gradient(90deg, #059669 0%, #34d399 100%);
    box-shadow: 0 0 15px rgba(16, 185, 129, 0.6);
  }
  
  /* --- Form Elements --- */
  .sn-input {
    background-color: rgba(0, 0, 0, 0.3); 
    border: 1px solid rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
    font-size: 0.75rem;
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    width: 100%;
    transition: all 0.2s ease;
  }
  .sn-input:focus {
    border-color: #34d399;
    background-color: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 0 1px rgba(52, 211, 153, 0.3);
    outline: none;
  }
  .sn-label {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #64748b;
    margin-bottom: 0.25rem;
    display: flex;
    justify-content: space-between;
  }
`;

// --- Reusable Tech Card Component ---
const TechCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`section-card rounded-xl ${className}`}>
    <div className="tech-border-corner tl" />
    <div className="tech-border-corner tr" />
    <div className="tech-border-corner bl" />
    <div className="tech-border-corner br" />
    {children}
  </div>
);

// --- Main Component ---
const ServiceNowInfographic: React.FC<Props> = ({ onBack }) => {
  // --- State for Pipeline Animation ---
  const [pipelineStep, setPipelineStep] = useState(0); 
  
  const handleNextPipelineStep = () => {
    setPipelineStep((prev) => (prev + 1) % 4);
  };

  const pipelineSteps = [
    { title: 'Ingest Incidents', icon: Database, desc: 'Continuous ingestion of historical data', sub: 'STEP 01' },
    { title: 'Word Corpus', icon: FileText, desc: 'Build vocabulary & frequency maps', sub: 'STEP 02' },
    { title: 'Cluster Similarities', icon: Layers, desc: 'Group incidents by text distance', sub: 'STEP 03' },
    { title: 'Recommendation', icon: Zap, desc: 'Real-time lookup for new tickets', sub: 'STEP 04' },
  ];

  // --- State for Simulator ---
  const [simState, setSimState] = useState('idle');
  const [cursorPos, setCursorPos] = useState({ top: '85%', left: '90%' });
  const [isPaused, setIsPaused] = useState(true); // Default to Paused for manual control

  // Manual Handlers
  const handleManualPredict = () => {
    setIsPaused(true);
    setSimState('analyzing');
    setCursorPos({ top: '40%', left: '60%' });
  };

  const handleManualApply = () => {
    setIsPaused(true);
    setSimState('applying');
  };

  const handleManualClose = () => {
    setIsPaused(true);
    setSimState('done');
  };

  const handleNextStep = () => {
    setIsPaused(true); // Ensure manual control
    switch (simState) {
        case 'idle':
            setSimState('clickingBtn');
            setCursorPos({ top: '8%', left: '92%' });
            break;
        case 'movingToBtn':
        case 'clickingBtn':
            setSimState('analyzing');
            setCursorPos({ top: '40%', left: '60%' });
            break;
        case 'analyzing':
        case 'processing':
            setSimState('showingModal');
            break;
        case 'showingModal':
            setSimState('applying');
            setCursorPos({ top: '88%', left: '80%' });
            break;
        case 'movingToApply':
        case 'applying':
            setSimState('done');
            break;
        case 'done':
            setSimState('idle');
            setCursorPos({ top: '85%', left: '90%' });
            break;
        default:
            setSimState('idle');
            break;
    }
  };

  // Simulator Logic Loop
  useEffect(() => {
    let timeout: any;
    
    // Auto-advance logic only if NOT paused
    if (!isPaused) {
        const runSimulation = () => {
          switch (simState) {
            case 'idle':
              timeout = setTimeout(() => {
                setSimState('movingToBtn');
                setCursorPos({ top: '8%', left: '92%' }); 
              }, 2000);
              break;
            case 'movingToBtn':
              timeout = setTimeout(() => {
                setSimState('clickingBtn');
              }, 1500);
              break;
            case 'clickingBtn':
              timeout = setTimeout(() => {
                setSimState('analyzing'); // Step 2: Invoke
                setCursorPos({ top: '40%', left: '60%' });
              }, 500);
              break;
            case 'analyzing':
              timeout = setTimeout(() => {
                setSimState('processing'); // Step 3: Match
              }, 1500);
              break;
            case 'processing':
              timeout = setTimeout(() => {
                setSimState('showingModal'); // Step 4: Populate
              }, 1500);
              break;
            case 'showingModal':
              timeout = setTimeout(() => {
                setSimState('movingToApply');
                setCursorPos({ top: '88%', left: '80%' });
              }, 3000); // Wait longer to read
              break;
            case 'movingToApply':
              timeout = setTimeout(() => {
                setSimState('applying');
              }, 1500);
              break;
            case 'applying':
              timeout = setTimeout(() => {
                setSimState('done');
              }, 500);
              break;
            case 'done':
              timeout = setTimeout(() => {
                setSimState('idle');
                setCursorPos({ top: '85%', left: '90%' });
              }, 4000);
              break;
            default:
              break;
          }
        };
        runSimulation();
    } else {
        // Even when paused, ensure smooth transitions for visual states that shouldn't hang
        // (e.g. clicking animation shouldn't freeze mid-click forever, but logic waits)
        if (simState === 'movingToBtn') {
             // Optional: Snap to end of movement if paused? Or just let it sit.
             // Let's just let manual control handle it.
        }
        if (simState === 'analyzing') {
            timeout = setTimeout(() => {
                setSimState('processing');
            }, 1500);
        }
        if (simState === 'processing') {
             timeout = setTimeout(() => {
                setSimState('showingModal');
            }, 1500);
        }
    }

    return () => clearTimeout(timeout);
  }, [simState, isPaused]);

  // Updated Step Logic for 4-Step Process
  const getActiveSimStep = () => {
    if (['idle', 'movingToBtn', 'clickingBtn'].includes(simState)) return 1; // Initiate
    if (['analyzing'].includes(simState)) return 2; // Invoke
    if (['processing'].includes(simState)) return 3; // Analyze/Match
    if (['showingModal', 'movingToApply', 'applying', 'done'].includes(simState)) return 4; // Populate
    return 1;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-radial-gradient text-slate-300 relative flex flex-col gap-10">
      <style>{globalStyles}</style>
      
      {/* --- Advanced Background Layers --- */}
      <div className="bg-noise" />
      <div className="absolute top-0 left-0 w-[800px] h-[600px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-indigo-900/20 blur-[150px] rounded-full pointer-events-none mix-blend-screen" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-teal-900/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen animate-[pulse_8s_infinite]" />

      {/* --- Section A: Header --- */}
      <header className="text-center space-y-4 relative z-10 pt-8 px-6">
        <button 
            onClick={onBack}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-all group z-50"
        >
            <ArrowLeft size={16} />
            <span className="text-sm font-semibold">Back to Overview</span>
        </button>

        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-950/40 backdrop-blur-md shadow-lg mb-2 group cursor-default hover:border-emerald-500/60 transition-colors">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-[0.25em]">System Operational</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Predictive Intelligence
          <span className="block mt-1 neon-text">Similarity Solution</span>
        </h1>
        
        <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed border-t border-white/5 pt-6 mt-4 font-light">
          Accelerate incident resolution by automatically identifying patterns and recommending proven fixes from historical data clusters.
        </p>
      </header>

      {/* --- Section B: Process Pipeline --- */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-6">
        <TechCard className="p-6 md:p-10 overflow-visible">
          
          {/* Centered Header */}
          <div className="flex flex-col items-center justify-center mb-10 relative z-10 text-center">
            <div className="flex items-center gap-3 mb-2">
              <Layers className="text-emerald-400 w-8 h-8" />
              <h2 className="text-3xl font-bold text-white">End-to-End PI Setup</h2>
            </div>
            <p className="text-slate-400 text-sm mb-6">Data transformation pipeline</p>
            
            <button 
              onClick={handleNextPipelineStep}
              className="group flex items-center gap-2 px-6 py-2.5 bg-emerald-600/90 hover:bg-emerald-500 text-white text-xs font-bold rounded-full transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] active:scale-95 uppercase tracking-wider"
            >
              Next Step <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>

          <div className="relative z-10">
            {/* Background Track */}
            <div className="absolute top-[2.5rem] left-0 w-full h-[2px] bg-slate-800" />
            
            {/* Active Progress Track */}
            <div 
              className="absolute top-[2.5rem] left-0 h-[2px] step-connector-active transition-all duration-700 ease-out z-0"
              style={{ width: `${(pipelineStep / (pipelineSteps.length - 1)) * 100}%` }}
            />

            <div className="flex justify-between relative z-10">
              {pipelineSteps.map((step, index) => {
                const isActive = index === pipelineStep;
                const isCompleted = index < pipelineStep;

                return (
                  <div key={index} className="flex flex-col items-center group cursor-pointer w-48" onClick={() => setPipelineStep(index)}>
                    {/* Step Circle */}
                    <div className="relative mb-8">
                      {isActive && <div className="absolute inset-0 rounded-full animate-[pulse-ring_2s_infinite] border border-emerald-500" />}
                      <div 
                        className={`
                          w-20 h-20 rounded-full flex items-center justify-center border-2 transition-all duration-500 relative z-10
                          ${isActive 
                            ? 'bg-emerald-600 border-emerald-400 text-white shadow-[0_0_40px_rgba(16,185,129,0.4)] scale-110' 
                            : isCompleted 
                              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-500' 
                              : 'bg-slate-900 border-slate-800 text-slate-600'}
                        `}
                      >
                        <step.icon size={28} strokeWidth={isActive ? 2 : 1.5} />
                      </div>
                    </div>

                    {/* Step Card */}
                    <div className={`
                      w-full p-4 rounded-lg border transition-all duration-500 flex flex-col items-center text-center
                      ${isActive 
                        ? 'bg-slate-800/80 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)] opacity-100 transform translate-y-0' 
                        : 'bg-slate-900/40 border-slate-800 opacity-60'}
                    `}>
                      <h3 className={`text-sm font-bold mb-2 ${isActive ? 'text-emerald-400' : 'text-white'}`}>{step.title}</h3>
                      <p className="text-[10px] text-slate-400 leading-relaxed mb-3 h-8">{step.desc}</p>
                      <div className={`text-[9px] font-mono font-bold uppercase tracking-widest ${isActive ? 'text-emerald-500' : 'text-slate-600'}`}>{step.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TechCard>
      </section>

      {/* --- Section C: The Simulator --- */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-6">
        <TechCard className="p-0 flex flex-col md:flex-row gap-0 overflow-hidden min-h-[700px]">
          
          {/* Left Panel: Controls */}
          <div className="w-full md:w-1/3 bg-slate-900/30 border-r border-white/5 p-6 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <Activity size={18} />
                 </div>
                 <h2 className="text-2xl font-bold text-white">Live Simulator</h2>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                Observe the automated agent workflow. The system parses the incident context, initiates the similarity engine, and applies the highest confidence resolution.
              </p>
            </div>

            {/* Vertical Steps */}
            <div className="space-y-0 relative">
              <div className="absolute left-[19px] top-6 bottom-6 w-[2px] bg-slate-800 z-0" />
              
              {[
                { id: 1, label: "Initiate Prediction", sub: "Agent Action" },
                { id: 2, label: "Invoke PI Engine", sub: "System Call" },
                { id: 3, label: "Analyze & Match", sub: "Contextual Matching" },
                { id: 4, label: "Populate Results", sub: "UI Update" }
              ].map((step) => {
                const isActive = getActiveSimStep() === step.id;
                const isCompleted = getActiveSimStep() > step.id;
                
                return (
                  <div key={step.id} className="relative z-10 flex items-center gap-5 py-4">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-500 bg-slate-900
                      ${isActive 
                        ? 'border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] scale-110' 
                        : isCompleted
                          ? 'border-emerald-500/50 text-emerald-500 bg-emerald-950/20'
                          : 'border-slate-700 text-slate-600'}
                    `}>
                      {isCompleted ? <CheckCircle size={18} /> : step.id}
                    </div>
                    <div className="flex-1">
                      <div className={`font-bold text-sm transition-colors ${isActive ? 'text-white' : 'text-slate-500'}`}>
                        {step.label}
                      </div>
                      <div className="text-[10px] text-slate-600 font-mono uppercase tracking-wider">{step.sub}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-auto space-y-4">
               {/* Next Step Button (Primary Control) */}
               <button 
                 onClick={handleNextStep}
                 className="w-full flex items-center justify-center gap-2 px-3 py-3 rounded-lg font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
               >
                  <SkipForward size={16} fill="currentColor" /> Next Step
               </button>

               {/* Pause/Play Button (Secondary) */}
               <button 
                 onClick={() => setIsPaused(!isPaused)}
                 className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded border text-[10px] font-bold uppercase tracking-wider transition-all
                   ${isPaused 
                     ? 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700' 
                     : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'}
                 `}
               >
                  {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
                  {isPaused ? "Auto-Play Disabled" : "Auto-Play Running"}
               </button>
            </div>
          </div>

          {/* Right Panel: Advanced Incident Workspace */}
          <div className="w-full md:w-2/3 bg-[#0B1120]/50 relative flex flex-col backdrop-blur-sm">
            
            {/* Virtual Cursor */}
            <div 
              className={`absolute z-50 pointer-events-none transition-all duration-1000 ease-in-out text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.8)] ${isPaused ? 'opacity-50' : 'opacity-100'}`}
              style={{ top: cursorPos.top, left: cursorPos.left, transform: simState.includes('clicking') || simState === 'applying' ? 'scale(0.8) rotate(-10deg)' : 'scale(1) rotate(0deg)' }}
            >
              <MousePointer2 size={32} fill="currentColor" stroke="black" strokeWidth={1} />
            </div>

            {/* Advanced Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-slate-900/60 relative z-10">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <div className="bg-red-500/20 border border-red-500/30 p-1.5 rounded text-red-400">
                    <AlertTriangle size={16} />
                  </div>
                  <h3 className="text-lg font-bold text-white font-mono tracking-tight">INC0012934</h3>
                  <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] font-bold rounded border border-slate-700 uppercase tracking-wide">In Progress</span>
                </div>
                <div className="flex items-center gap-4 text-[10px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1"><Clock size={10} /> Opened: 2h 15m ago</span>
                  <span className="flex items-center gap-1 text-orange-400"><Activity size={10} /> SLA: -15m (Breached)</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button 
                  onClick={handleManualPredict}
                  className={`
                    px-4 py-2 rounded-md border text-[11px] font-bold flex items-center gap-2 transition-all uppercase tracking-wide shadow-lg cursor-pointer z-50
                    ${simState === 'clickingBtn' || simState === 'analyzing' || simState === 'processing'
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                      : 'bg-emerald-950/30 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10 hover:border-emerald-500'}
                  `}
                >
                   {simState === 'analyzing' || simState === 'processing' ? <Zap className="animate-spin" size={14}/> : <Brain size={14} />}
                   {simState === 'analyzing' || simState === 'processing' ? 'Processing...' : 'Get Similar Incidents'}
                </button>
              </div>
            </div>

            {/* Content Area with Sidebar */}
            <div className="flex-1 flex relative z-10">
              
              {/* Main Form */}
              <div className="flex-1 p-6 flex flex-col gap-5 border-r border-white/5">
                
                {/* Tabs */}
                <div className="flex gap-6 border-b border-white/5 pb-0 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <div className="pb-3 text-emerald-400 border-b-2 border-emerald-500 cursor-pointer">Incident Details</div>
                  <div className={`pb-3 cursor-pointer transition-colors ${['applying', 'done'].includes(simState) ? 'text-white border-b-2 border-white/20' : 'hover:text-slate-300'}`}>Resolution Info</div>
                  <div className="pb-3 hover:text-slate-300 cursor-pointer">Related Records (2)</div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <div>
                    <label className="sn-label">Caller <span className="text-orange-400 ml-auto flex items-center gap-1 text-[9px]"><ShieldAlert size={8}/> VIP</span></label>
                    <div className="relative">
                      <div className="sn-input flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white font-bold">AL</div>
                        <span>Abraham Lincoln</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="sn-label">Assigned To</label>
                    <div className="sn-input text-slate-400">Service Desk (L1)</div>
                  </div>
                  
                  <div>
                    <label className="sn-label">Service</label>
                    <div className="sn-input">SAP Financials</div>
                  </div>
                  <div>
                    <label className="sn-label">Configuration Item</label>
                    <div className="sn-input flex items-center justify-between">
                      <span>SAP FinSrv_01</span>
                      <Server size={12} className="text-slate-500"/>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-slate-900/30 p-3 rounded-lg border border-white/5">
                   <div>
                    <label className="sn-label">Impact</label>
                    <div className="text-xs text-red-400 font-bold">1 - High</div>
                  </div>
                  <div>
                    <label className="sn-label">Urgency</label>
                    <div className="text-xs text-red-400 font-bold">1 - High</div>
                  </div>
                  <div>
                    <label className="sn-label">Priority</label>
                    <div className="text-xs text-red-400 font-bold">1 - Critical</div>
                  </div>
                </div>

                <div className="flex-1">
                   <label className="sn-label">Short Description</label>
                   <textarea readOnly className="sn-input h-full resize-none font-medium text-white/90 leading-relaxed" value="Unable to access SAP Financial Server via VPN due to timeout. Users reporting 504 Gateway Time-out errors." />
                </div>
              </div>

              {/* Context Sidebar */}
              <div className="w-48 bg-slate-900/20 p-4 flex flex-col gap-4 text-[10px]">
                <div className="font-bold text-slate-400 uppercase tracking-wider mb-1">Context</div>
                
                <div className="bg-slate-800/50 p-2 rounded border border-white/5">
                  <div className="text-slate-500 mb-1">Recent Changes</div>
                  <div className="text-white font-mono">CHG003921</div>
                  <div className="text-slate-400 mt-1">Firewall Rule Update</div>
                </div>

                <div className="bg-slate-800/50 p-2 rounded border border-white/5">
                  <div className="text-slate-500 mb-1">Affected Users</div>
                  <div className="flex -space-x-1 mt-1">
                    {[1,2,3].map(i => (
                      <div key={i} className={`w-5 h-5 rounded-full bg-slate-700 border border-slate-800 flex items-center justify-center text-[8px]`}>{i}</div>
                    ))}
                    <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[8px] text-slate-400">+12</div>
                  </div>
                </div>
              </div>

              {/* Modal Overlay (AI Results) */}
              <div className={`
                absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-black/60 transition-all duration-500
                ${['showingModal', 'movingToApply', 'applying', 'done'].includes(simState) ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
              `}>
                <div className={`
                  w-[95%] max-w-lg bg-[#0f172a] border border-emerald-500/50 rounded-xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.8)] p-0 overflow-hidden transform transition-all duration-500
                  ${['showingModal', 'movingToApply', 'applying', 'done'].includes(simState) ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}
                `}>
                  {/* Modal Header */}
                  <div className="bg-emerald-950/80 p-4 border-b border-emerald-500/30 flex justify-between items-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-500/10 animate-pulse pointer-events-none" />
                    <h3 className="text-white font-bold flex items-center gap-2 text-sm z-10">
                      <ListFilter className="text-emerald-400 w-4 h-4" /> Predictive Results
                    </h3>
                    <div className="text-[10px] uppercase font-bold text-emerald-400 bg-black/30 px-2 py-1 rounded border border-emerald-500/30 z-10 flex items-center gap-1">
                      <Zap size={10} fill="currentColor" /> Top Match Found
                    </div>
                  </div>
                  
                  {/* Modal Body */}
                  <div className="p-5 space-y-5">
                    {/* Incident Table Section */}
                    <div className="rounded-xl border border-slate-700 bg-slate-950 shadow-2xl overflow-hidden relative group">
                        {/* Header Bar */}
                        <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                                <ListFilter size={14} className="text-emerald-400" /> Similar Incidents Identified
                            </span>
                            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded text-[10px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.2)]">3 High Confidence Matches</span>
                        </div>
                        
                        <div className="w-full">
                          {/* Table Header */}
                          <div className="grid grid-cols-12 gap-4 p-3 bg-slate-900/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-800">
                            <div className="col-span-3">Incident</div>
                            <div className="col-span-7">Description</div>
                            <div className="col-span-2 text-right">Confidence</div>
                          </div>
                          
                          {/* Table Body */}
                          <div className="flex flex-col divide-y divide-slate-800">
                            {/* Result 1 (Best Match) */}
                            <div className="grid grid-cols-12 gap-4 p-3 bg-emerald-500/5 border-l-[3px] border-emerald-500 items-center cursor-pointer transition-all hover:bg-emerald-500/10 relative overflow-hidden">
                              {/* Active Glow Effect */}
                              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                              
                              <div className="col-span-3 text-emerald-400 font-mono text-xs font-bold flex items-center gap-2 relative z-10">
                                <CheckCircle size={14} className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]" /> INC0010234
                              </div>
                              <div className="col-span-7 text-white text-xs font-medium relative z-10">VPN Timeout due to stale cache session</div>
                              <div className="col-span-2 text-right relative z-10">
                                <span className="inline-block bg-emerald-500 text-emerald-950 text-[10px] font-bold px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(16,185,129,0.4)]">95%</span>
                              </div>
                            </div>
                            
                            {/* Result 2 */}
                            <div className="grid grid-cols-12 gap-4 p-3 border-l-[3px] border-transparent items-center hover:bg-white/5 transition-colors">
                              <div className="col-span-3 text-slate-400 font-mono text-xs">INC0009821</div>
                              <div className="col-span-7 text-slate-400 text-xs">SAP Login Failure - Password Reset</div>
                              <div className="col-span-2 text-right text-slate-500 text-xs font-mono">88%</div>
                            </div>
                            
                            {/* Result 3 */}
                            <div className="grid grid-cols-12 gap-4 p-3 border-l-[3px] border-transparent items-center hover:bg-white/5 transition-colors">
                              <div className="col-span-3 text-slate-400 font-mono text-xs">INC0008765</div>
                              <div className="col-span-7 text-slate-400 text-xs">Network Latency US-East Region</div>
                              <div className="col-span-2 text-right text-slate-500 text-xs font-mono">76%</div>
                            </div>
                          </div>
                        </div>
                    </div>

                    {/* Proposed Resolution Panel */}
                    <div className="rounded-lg border border-emerald-500/20 bg-slate-900/80 overflow-hidden">
                      <div className="px-3 py-2 bg-emerald-950/30 border-b border-emerald-500/10 text-[10px] text-emerald-500 uppercase font-bold tracking-wider flex items-center gap-2">
                        <Database size={10} /> Proposed Resolution (From INC0010234)
                      </div>
                      <div className="p-3">
                        <div className="text-slate-300 text-[11px] p-2 rounded bg-black/20 border border-white/5 leading-relaxed font-mono">
                          &gt; Flush User Cache<br/>&gt; Reset Session Tokens<br/>&gt; Notify User
                        </div>
                        
                        <div className="flex gap-3 mt-3">
                          <button 
                            onClick={handleManualClose}
                            className="flex-1 py-2 rounded-md font-bold text-xs transition-all flex items-center justify-center uppercase tracking-wider bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white cursor-pointer z-50"
                          >
                            Close
                          </button>
                          
                          <button 
                            onClick={handleManualApply}
                            className={`
                              flex-[2] py-2 rounded-md font-bold text-xs transition-all flex items-center justify-center gap-2 uppercase tracking-wider cursor-pointer z-50
                              ${simState === 'applying' || simState === 'done'
                                ? 'bg-emerald-600 text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white'}
                            `}
                          >
                             {simState === 'done' ? <CheckCircle size={14}/> : <Copy size={14}/>}
                             {simState === 'done' ? 'Fix Applied' : 'Apply Resolution'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </TechCard>
      </section>

      {/* --- Section D: Metrics --- */}
      <section className="relative z-10 max-w-6xl mx-auto w-full px-6 grid grid-cols-1 md:grid-cols-3 gap-8 pb-12">
        {[
          { title: 'Faster Triage', value: '45%', label: 'Reduction in MTTR', icon: Clock, chart: [40, 60, 30, 80, 50, 90, 20, 60] },
          { title: 'Reduced MTTR', value: '32%', label: 'Faster Resolution', icon: Activity, chart: [20, 40, 60, 50, 70, 40, 80, 30] },
          { title: 'Deflection', value: '15k+', label: 'Incidents Avoided', icon: Server, chart: [50, 30, 70, 40, 60, 80, 50, 90] },
        ].map((metric, index) => (
          <TechCard key={index} className="p-6 group hover:border-emerald-500/40 transition-all duration-300 relative overflow-hidden">
             {/* Chart Background */}
             <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10 group-hover:opacity-20 transition-opacity">
                <div className="flex items-end h-full gap-1 px-4 pb-0">
                  {metric.chart.map((h, i) => (
                    <div key={i} className="flex-1 bg-emerald-500 rounded-t-sm" style={{ height: `${h}%`, opacity: 0.5 + (i/10) }} />
                  ))}
                </div>
             </div>

            <div className="flex justify-between items-start mb-8 relative z-10">
              <div>
                <h3 className="text-slate-500 font-bold mb-1 text-[10px] uppercase tracking-widest">{metric.title}</h3>
                <div className="text-5xl font-bold text-white group-hover:text-emerald-400 transition-colors tracking-tighter">{metric.value}</div>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 border border-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all">
                <metric.icon size={24} />
              </div>
            </div>
            
            <p className="text-xs text-slate-400 relative z-10 font-medium">{metric.label}</p>
          </TechCard>
        ))}
      </section>
    </div>
  );
};

export default ServiceNowInfographic;
