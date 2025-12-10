
import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Cpu, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Layers, 
  Search,
  ArrowLeft,
  ChevronRight,
  Activity,
  Sparkles,
  RefreshCw,
  FileText,
  Database,
  Play,
  Pause,
  MousePointer2,
  XCircle,
  Lightbulb,
  Save,
  SkipForward,
  AlertCircle
} from 'lucide-react';

interface Props {
    onBack: () => void;
}

export const PredictiveIntelligenceSim: React.FC<Props> = ({ onBack }) => {
  // --- STATE MANAGEMENT ---
  const initialFormState = {
    number: 'INC0012934',
    caller: 'Abraham Lincoln',
    shortDescription: 'Unable to access SAP Financial Server via VPN due to timeout',
    category: '',
    impact: '3 - Low',
    urgency: '3 - Low',
    ci: ''
  };

  const [formState, setFormState] = useState(initialFormState);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  // Highlight state for updated fields
  const [highlightUpdates, setHighlightUpdates] = useState(false);
  
  // Simulation State
  const [isAutoPlay, setIsAutoPlay] = useState(false); // Default to Paused
  const [simStep, setSimStep] = useState(0);
  const [cursorPos, setCursorPos] = useState({ top: '60%', left: '50%' });
  const [showCursor, setShowCursor] = useState(true);
  const [clickEffect, setClickEffect] = useState(false);

  // Process Pipeline Animation State
  const [pipelineStep, setPipelineStep] = useState(0);

  // The AI predicted values
  const predictions = {
    impact: '1 - High',
    urgency: '1 - High',
    ci: 'SAP FinSrv_01',
    category: 'Software',
    confidence: '96.4%'
  };

  const handleNextPipelineStep = () => {
    setPipelineStep((prev) => (prev + 1) % 4);
  };

  // --- SIMULATION LOOP ---
  useEffect(() => {
    // Always show cursor when simulation is active (manual or auto)
    setShowCursor(true);

    let timeout: any;
    
    // Helper to schedule next step if auto-play is on
    const scheduleNext = (delay: number, nextStep: number) => {
      if (isAutoPlay) {
        timeout = setTimeout(() => {
          setSimStep(nextStep);
        }, delay);
      }
    };

    switch (simStep) {
      case 0: // Start / Reset
        if (simStep === 0) {
            setFormState(initialFormState);
            setShowModal(false);
            setIsAnalyzing(false);
            setHighlightUpdates(false);
            setCursorPos({ top: '60%', left: '50%' }); // Center start
        }
        scheduleNext(2000, 1);
        break;

      case 1: // Move to Predict Button
        setCursorPos({ top: '28px', left: 'calc(100% - 60px)' }); // Target Predict Button
        scheduleNext(2500, 2);
        break;

      case 2: // Click Predict
        setClickEffect(true);
        setTimeout(() => setClickEffect(false), 300);
        handlePredictClick(); // Trigger Logic
        scheduleNext(1000, 3);
        break;

      case 3: // Wait for Analysis
        // Analysis takes 2500ms in handlePredictClick
        scheduleNext(3000, 4); 
        break;

      case 4: // Modal is open, Move to Apply Button
        setCursorPos({ top: 'calc(50% + 130px)', left: 'calc(50% + 130px)' }); 
        scheduleNext(3000, 5); // Increased time to read modal
        break;

      case 5: // Click Apply
        setClickEffect(true);
        setTimeout(() => setClickEffect(false), 300);
        handleSave(); // Trigger Save Logic
        scheduleNext(1000, 6);
        break;

      case 6: // Observe Result
        setCursorPos({ top: '90%', left: '90%' }); // Move away
        scheduleNext(6000, 0); // Loop back to start
        break;

      default:
        break;
    }

    return () => clearTimeout(timeout);
  }, [simStep, isAutoPlay]);


  const handlePredictClick = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowModal(true);
    }, 2500); // Slower analysis simulation
  };

  const handleSave = () => {
    setFormState(prev => ({
      ...prev,
      impact: predictions.impact,
      urgency: predictions.urgency,
      ci: predictions.ci,
      category: predictions.category
    }));
    setShowModal(false);
    
    // Trigger highlight animation
    setHighlightUpdates(true);
    setTimeout(() => setHighlightUpdates(false), 2000);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
    if (!isAutoPlay && simStep === 0) setSimStep(1); // Start if at beginning
  };

  const handleManualNext = () => {
    setIsAutoPlay(false); // Stop auto-play if interacting manually
    setSimStep((prev) => (prev + 1) % 7);
  };

  // Helper class for the update highlight effect
  const highlightClass = highlightUpdates 
    ? 'ring-2 ring-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.5)] !bg-emerald-500/20 scale-[1.02]' 
    : '';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020617] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 animate-fade-in">
      
      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(500%); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        @keyframes flow {
          0% { stroke-dashoffset: 20; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-scan { animation: scanline 2s linear infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .bg-grid-pattern {
          background-image: linear-gradient(to right, #10b9811a 1px, transparent 1px),
                            linear-gradient(to bottom, #10b9811a 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .glass-panel {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16, 185, 129, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
        }
        .neon-glow {
          box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        }
        /* Cursor Transition */
        .cursor-transition {
          transition: top 1s cubic-bezier(0.22, 1, 0.36, 1), left 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        /* Modern Dark Input Styles */
        .modern-input {
          background: #0f172a; /* Slate 900 */
          border: 1px solid #334155; /* Slate 700 */
          color: #e2e8f0; /* Slate 200 */
          font-size: 0.8rem;
          padding: 0.5rem 0.75rem;
          border-radius: 6px;
          width: 100%;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modern-input:focus {
          outline: none;
          border-color: #10b981; /* Emerald 500 */
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.2);
        }
        .modern-label {
          font-size: 0.75rem;
          color: #94a3b8; /* Slate 400 */
          font-weight: 600;
          margin-bottom: 4px;
          display: block;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>

      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-[128px]"></div>
      </div>

      {/* --- HEADER SECTION --- */}
      <header className="relative z-10 pt-8 pb-12 px-6 text-center overflow-hidden">
        <button 
            onClick={onBack}
            className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-all group z-50"
        >
            <ArrowLeft size={16} />
            <span className="text-sm font-semibold">Back to Overview</span>
        </button>

        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-widest uppercase shadow-[0_0_15px_rgba(16,185,129,0.2)] animate-float">
          <Sparkles size={12} /> Next-Gen Service Management
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-emerald-100 to-emerald-600 drop-shadow-sm">
          Predictive <br className="md:hidden"/> Intelligence
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Transform incident management with <span className="text-emerald-400 font-semibold border-b border-emerald-500/30 pb-0.5">AI-driven classification</span>.
        </p>
      </header>

      {/* --- SECTION 1: END-TO-END PROCESSING (Full Width) --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <div className="glass-panel rounded-3xl p-8 md:p-10 border-emerald-500/10">
            <div className="mb-10 text-center relative">
                <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                    <Layers className="text-emerald-400" /> End-to-End PI Setup
                </h2>
                <p className="text-slate-400 text-sm mt-1 mb-4">Data transformation pipeline</p>
                
                <button 
                    onClick={handleNextPipelineStep}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all transform active:scale-95"
                >
                    Next Step <ChevronRight size={14} />
                </button>
            </div>

            <div className="relative">
              {/* Connecting Line (Horizontal for LG, Vertical for SM) */}
              <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-800 lg:w-auto lg:h-0.5 lg:left-12 lg:right-12 lg:top-8 lg:bottom-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/30 animate-pulse"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative">
              {[
                { 
                  title: "Analyze Records", 
                  icon: <Database size={20}/>, 
                  desc: "System identifies data clusters & quality", 
                  step: "01",
                },
                { 
                  title: "Create Model", 
                  icon: <FileText size={20}/>, 
                  desc: "Select fields and define solution scope", 
                  step: "02",
                },
                { 
                  title: "Train Logic", 
                  icon: <RefreshCw size={20}/>, 
                  desc: "Feed historical data to tune accuracy", 
                  step: "03",
                },
                { 
                  title: "Runtime Predict", 
                  icon: <Zap size={20}/>, 
                  desc: "Apply recommendations in real-time", 
                  step: "04",
                }
              ].map((item, idx) => {
                const isActive = pipelineStep === idx;
                return (
                  <div key={idx} className="relative pl-16 lg:pl-0 lg:pt-20 group text-left lg:text-center">
                    {/* Timeline Node */}
                    <div className={`absolute left-0 top-2 lg:left-1/2 lg:-translate-x-1/2 lg:top-0 w-16 h-16 rounded-full border-4 flex items-center justify-center z-10 transition-all duration-500
                      ${isActive 
                        ? 'bg-emerald-500 border-emerald-900 scale-110 shadow-[0_0_15px_#10b981]' 
                        : 'bg-slate-800 border-[#020617] scale-100'}
                    `}>
                      <div className={`transition-colors duration-500 ${isActive ? 'text-slate-900' : 'text-slate-400'}`}>
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Card Content */}
                    <div className={`border rounded-xl p-4 transition-all duration-500 h-full
                      ${isActive 
                        ? 'bg-slate-800 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]' 
                        : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/60'}
                    `}>
                        <h3 className={`text-base font-bold transition-colors duration-500 ${isActive ? 'text-emerald-400' : 'text-white'}`}>
                        {item.title}
                        </h3>
                        <p className={`text-xs mt-1 leading-snug transition-colors duration-500 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.desc}
                        </p>
                        <div className={`text-[10px] font-mono font-bold mt-2 transition-colors duration-500 ${isActive ? 'text-emerald-500' : 'text-slate-700'}`}>
                            STEP {item.step}
                        </div>
                    </div>
                  </div>
                );
              })}
              </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 2: INTELLIGENT AUTOMATION (Full Width) --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="glass-panel rounded-3xl p-1 overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
            <div className="relative bg-slate-950/80 rounded-[22px] p-8 md:p-12">
              {/* Background Decoration */}
              <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>

              <div className="flex flex-col lg:flex-row items-center gap-12">
                  <div className="flex-1">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
                        <Activity className="text-emerald-500" size={32} />
                        Intelligent Automation
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                        Stop manual triage. The <span className="text-white font-medium">Predictive Intelligence Classification Solution</span> reads the Incident Short Description and automatically predicts:
                        </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {['Impact & Urgency', 'Assignment Group', 'Service Category', 'Configuration Item'].map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                                <CheckCircle2 size={16} />
                            </div>
                            <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </ul>
                  </div>

                  {/* Holographic Card Visual - Larger */}
                  <div className="relative h-64 w-full lg:w-80 perspective-1000 shrink-0 hidden sm:block">
                    <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 to-slate-800 rounded-2xl border border-slate-700 shadow-2xl flex flex-col items-center justify-center transform rotate-y-12 rotate-x-6 group-hover:rotate-y-6 group-hover:rotate-x-3 transition-transform duration-700">
                        <Brain size={64} className="text-emerald-500 mb-4 animate-pulse" />
                        <div className="text-center">
                        <div className="text-sm text-emerald-500 font-mono mb-2">FIELDS AUTOMATED</div>
                        <div className="text-6xl font-bold text-white tracking-widest">4<span className="text-2xl text-slate-500">/4</span></div>
                        </div>
                        <div className="absolute inset-0 w-full h-1 bg-emerald-500/50 blur-sm animate-scan opacity-20"></div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 3: PROCESS SIMULATOR --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-32">
        <div className="glass-panel rounded-3xl p-8 md:p-12 border-emerald-500/20 neon-glow">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left: Instruction / Context */}
            <div className="lg:w-1/3 space-y-8 flex flex-col justify-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Process Simulator</h2>
                <div className="flex flex-col gap-3 mb-4">
                  <h3 className="text-xl text-emerald-400">Workflow Automation</h3>
                  <div className="flex items-center gap-2">
                      {/* AUTO-PLAY TOGGLE */}
                      <button 
                        onClick={toggleAutoPlay}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border transition-all ${isAutoPlay ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/50' : 'bg-slate-800 text-slate-400 border-slate-600'}`}
                      >
                        {isAutoPlay ? <Pause size={14} /> : <Play size={14} />}
                        {isAutoPlay ? 'RUNNING' : 'PAUSED'}
                      </button>
                      
                      {/* MANUAL NEXT STEP */}
                      <button 
                        onClick={handleManualNext}
                        disabled={isAnalyzing}
                        className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-bold border border-slate-600 transition-all ${isAnalyzing ? 'opacity-50 cursor-not-allowed bg-slate-800 text-slate-500' : 'bg-slate-800 text-white hover:bg-slate-700 hover:border-slate-500 active:scale-95'}`}
                      >
                        <SkipForward size={14} />
                        NEXT STEP
                      </button>
                  </div>
                </div>
                
                <p className="text-slate-400 leading-relaxed mb-6">
                  Watch the automated agent workflow. The system reads the incident, the agent initiates prediction, and recommendations are applied in seconds.
                </p>

                {/* Status Indicator */}
                <div className="space-y-3">
                  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${simStep === 1 || simStep === 2 ? 'bg-emerald-900/30 border-emerald-500/50 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">1</div>
                    <span className="text-sm">Initiate Prediction</span>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${simStep === 3 ? 'bg-emerald-900/30 border-emerald-500/50 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">2</div>
                    <span className="text-sm">AI Analysis (Quality & Pattern)</span>
                  </div>
                  <div className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${simStep >= 4 ? 'bg-emerald-900/30 border-emerald-500/50 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>
                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">3</div>
                    <span className="text-sm">Apply Recommendations</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: The MOCK MODERN INTERFACE */}
            <div className="lg:w-2/3 relative">
              
              {/* --- MODERN UI CONTAINER --- */}
              <div className="bg-[#0f172a] rounded-xl shadow-2xl overflow-hidden font-sans border border-slate-700 text-slate-100 min-h-[650px] relative flex flex-col">
                
                {/* --- VIRTUAL CURSOR --- */}
                {showCursor && (
                  <div 
                    className="absolute z-50 pointer-events-none cursor-transition flex flex-col items-center justify-center"
                    style={{ 
                      top: cursorPos.top, 
                      left: cursorPos.left,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {/* Ripple Effect on Click */}
                    {clickEffect && (
                      <div className="absolute w-8 h-8 rounded-full border-2 border-emerald-400 animate-ping opacity-75"></div>
                    )}
                    {/* Cursor Icon */}
                    <MousePointer2 
                      size={32} 
                      className="text-white drop-shadow-lg fill-emerald-500" 
                      style={{ transform: 'rotate(-15deg)' }}
                    />
                  </div>
                )}

                {/* 1. Header/Toolbar */}
                <div className="bg-slate-900 border-b border-slate-700 px-4 py-3 flex items-center justify-between shadow-sm flex-shrink-0">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-slate-300">
                      <div className="p-1.5 bg-red-500/10 rounded text-red-400"><Activity size={14}/></div>
                      <div className="font-bold text-lg">{formState.number}</div>
                    </div>
                    <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30">New</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="px-4 py-1.5 bg-slate-800 border border-slate-600 rounded-md text-xs font-semibold text-slate-300 transition-colors">Update</button>
                    {/* PREDICT BUTTON (Top Right) */}
                    <button 
                      onClick={handlePredictClick}
                      className={`px-4 py-1.5 border rounded-md text-xs font-bold transition-all flex items-center gap-1.5 ${isAnalyzing ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white'}`}
                    >
                      {isAnalyzing ? <RefreshCw size={14} className="animate-spin"/> : <Brain size={14} />} 
                      {isAnalyzing ? 'Processing...' : 'Predict'}
                    </button>
                  </div>
                </div>

                {/* 2. Tab Bar */}
                <div className="bg-slate-900/50 border-b border-slate-700 px-4 pt-3 flex items-center gap-1 flex-shrink-0">
                  <div className="bg-[#0f172a] border-t border-l border-r border-slate-700 px-4 py-2 text-xs font-bold text-white rounded-t-md -mb-[1px] relative z-10 border-t-emerald-500">Incident</div>
                  <div className="px-4 py-2 text-xs text-slate-500 transition-colors">Notes</div>
                  <div className="px-4 py-2 text-xs text-slate-500 transition-colors">Related Records</div>
                </div>

                {/* 3. Form Body */}
                <div className="p-8 bg-[#0f172a] flex-grow relative">
                  
                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-6">
                    
                    {/* Left Column */}
                    <div className="space-y-5">
                      <div>
                        <span className="modern-label">Number</span>
                        <input type="text" readOnly value={formState.number} className="modern-input opacity-70 cursor-not-allowed" />
                      </div>
                      <div>
                        <span className="modern-label text-emerald-400">Caller *</span>
                        <div className="relative">
                          <input type="text" readOnly value={formState.caller} className="modern-input pr-8" />
                          <Search size={14} className="absolute right-3 top-2.5 text-slate-500" />
                        </div>
                      </div>
                      <div>
                        <span className="modern-label">Category</span>
                        <input 
                            type="text" 
                            readOnly 
                            value={formState.category} 
                            placeholder="-- None --" 
                            className={`modern-input transition-all duration-500 ${formState.category ? 'font-semibold text-emerald-400 bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : ''} ${highlightClass}`} 
                        />
                      </div>
                      <div>
                        <span className="modern-label">Configuration Item</span>
                        <div className="relative">
                          <input 
                            type="text" 
                            readOnly 
                            value={formState.ci} 
                            placeholder="" 
                            className={`modern-input pr-8 transition-all duration-500 ${formState.ci ? 'font-semibold text-emerald-400 bg-emerald-950/30 border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : ''} ${highlightClass}`} 
                          />
                          <Search size={14} className="absolute right-3 top-2.5 text-slate-500" />
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-5">
                      <div>
                        <span className="modern-label">State</span>
                        <select className="modern-input" disabled><option>New</option></select>
                      </div>
                      <div>
                        <span className="modern-label">Impact</span>
                        <input 
                            type="text" 
                            readOnly 
                            value={formState.impact} 
                            className={`modern-input transition-all duration-500 ${formState.impact.includes('High') ? 'font-bold text-red-400 bg-red-950/30 border-red-500/50' : ''} ${highlightClass}`} 
                        />
                      </div>
                      <div>
                        <span className="modern-label">Urgency</span>
                        <input 
                            type="text" 
                            readOnly 
                            value={formState.urgency} 
                            className={`modern-input transition-all duration-500 ${formState.urgency.includes('High') ? 'font-bold text-red-400 bg-red-950/30 border-red-500/50' : ''} ${highlightClass}`} 
                        />
                      </div>
                      <div>
                        <span className="modern-label">Priority</span>
                        <input 
                            type="text" 
                            readOnly 
                            value={formState.impact.includes('High') ? '1 - Critical' : '-- Calculation Pending --'} 
                            className={`modern-input transition-all duration-500 ${formState.impact.includes('High') ? 'font-bold text-red-400 bg-red-950/30 border-red-500/50' : 'text-slate-500'} ${highlightClass}`} 
                        />
                      </div>
                    </div>
                  </div>

                  {/* Full Width Field */}
                  <div className="mt-4">
                    <span className="modern-label text-emerald-400">Short description *</span>
                    <input type="text" value={formState.shortDescription} readOnly className="modern-input font-medium text-white" />
                  </div>

                  {/* --- OVERLAYS --- */}

                  {/* 1. Loading Overlay */}
                  {isAnalyzing && (
                    <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-3 animate-pulse">
                        <Brain size={24} />
                        <span className="tracking-widest text-sm">ANALYZING PATTERNS...</span>
                      </div>
                      <div className="w-48 h-1 bg-slate-800 rounded overflow-hidden">
                        <div className="h-full bg-emerald-500 w-1/2 animate-[float_1s_infinite] shadow-[0_0_10px_#10b981]"></div>
                      </div>
                    </div>
                  )}

                  {/* 2. PREDICTION MODAL */}
                  {showModal && (
                    <div className="absolute inset-0 z-30 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
                      <div className="bg-slate-900 border border-emerald-500/50 rounded-xl shadow-2xl w-full max-w-sm overflow-hidden text-slate-100 relative">
                        {/* Glow effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
                        
                        {/* Modal Header */}
                        <div className="bg-slate-800/50 px-4 py-3 border-b border-slate-700 flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Sparkles size={14} className="text-emerald-400" />
                            <span className="font-bold text-xs tracking-wide">PREDICTIVE INTELLIGENCE</span>
                          </div>
                          <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors"><XCircle size={16} /></button>
                        </div>
                        
                        {/* Modal Body - COMPACTED */}
                        <div className="p-4 space-y-3">
                          {/* Confidence Banner */}
                          <div className="flex items-center justify-between bg-emerald-950/40 px-3 py-2 rounded border border-emerald-500/20">
                            <div className="flex items-center gap-2">
                                <Lightbulb size={14} className="text-yellow-400" />
                                <span className="text-[10px] text-emerald-200 font-semibold uppercase tracking-wider">Confidence Score</span>
                            </div>
                            <span className="text-sm font-black text-emerald-400">{predictions.confidence}</span>
                          </div>

                          {/* Grid Layout for Fields */}
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-800/30 p-2.5 rounded border border-slate-700/50">
                              <span className="text-[10px] text-slate-400 uppercase block mb-1">Category</span>
                              <span className="text-sm font-semibold text-white block truncate">{predictions.category}</span>
                            </div>
                            
                            <div className="bg-slate-800/30 p-2.5 rounded border border-slate-700/50">
                              <span className="text-[10px] text-slate-400 uppercase block mb-1">Configuration Item</span>
                              <span className="text-sm font-semibold text-white block truncate">{predictions.ci}</span>
                            </div>
                            
                            <div className="bg-slate-800/30 p-2.5 rounded border border-slate-700/50">
                              <span className="text-[10px] text-slate-400 uppercase block mb-1">Impact</span>
                              <div className="flex items-center gap-1.5 text-red-400">
                                <AlertCircle size={12} />
                                <span className="text-xs font-bold uppercase">{predictions.impact}</span>
                              </div>
                            </div>

                             <div className="bg-slate-800/30 p-2.5 rounded border border-slate-700/50">
                              <span className="text-[10px] text-slate-400 uppercase block mb-1">Urgency</span>
                              <div className="flex items-center gap-1.5 text-red-400">
                                <AlertCircle size={12} />
                                <span className="text-xs font-bold uppercase">{predictions.urgency}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-4 py-3 bg-slate-800/50 border-t border-slate-700 flex justify-end gap-3">
                          <button 
                            onClick={() => setShowModal(false)}
                            className="px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-700 rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                          <button 
                            onClick={handleSave}
                            className="px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white rounded-md shadow-[0_0_15px_rgba(16,185,129,0.3)] flex items-center gap-2 transition-all transform hover:scale-105"
                          >
                            <Save size={14} /> Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
              {/* --- END MODERN UI CONTAINER --- */}

            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: METRICS & BENEFITS --- */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">Measurable Impact</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            value="50%" 
            label="Faster Triage" 
            sub="Reduction in ticket routing time"
            chart={[40, 65, 55, 80, 75, 90]}
            color="emerald"
          />
          <StatCard 
            value="85%" 
            label="Prediction Accuracy" 
            sub="Improvement over manual entry"
            chart={[60, 70, 75, 82, 85, 88]}
            color="teal"
          />
          <StatCard 
            value="ROI" 
            label="Operational Savings" 
            sub="Fewer reassignments & SLA breaches"
            chart={[20, 35, 45, 60, 80, 95]}
            color="indigo"
          />
        </div>
      </section>

    </div>
  );
};

// --- Modernized Sub-Components ---

const StatCard: React.FC<any> = ({ value, label, sub, chart, color }) => {
  // Simple sparkline visualizer
  const max = Math.max(...chart);
  
  return (
    <div className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-transform duration-300">
      <div className="flex justify-between items-start mb-6">
        <div>
          <div className={`text-4xl font-black mb-1 bg-clip-text text-transparent bg-gradient-to-r from-white to-${color}-400`}>
            {value}
          </div>
          <div className="text-lg font-bold text-white">{label}</div>
        </div>
        <div className={`p-3 rounded-xl bg-${color}-500/10 text-${color}-400`}>
          <TrendingUp size={24} />
        </div>
      </div>
      
      {/* Sparkline Chart */}
      <div className="h-16 flex items-end gap-2 mb-4 opacity-50 group-hover:opacity-100 transition-opacity">
        {chart.map((h: number, i: number) => (
          <div 
            key={i} 
            className={`flex-1 bg-${color}-500 rounded-t-sm transition-all duration-500 ease-out`}
            style={{ height: `${(h / max) * 100}%` }}
          ></div>
        ))}
      </div>
      
      <p className="text-sm text-slate-400 border-t border-slate-700/50 pt-4">
        {sub}
      </p>
    </div>
  );
};
