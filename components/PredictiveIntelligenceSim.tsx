
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

  // Presentation Mode State
  const [presentationStep, setPresentationStep] = useState(0);

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
        // Target the "Apply Changes" button in the centered modal (approx)
        setCursorPos({ top: '60%', left: '58%' });
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
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-800 text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 animate-fade-in">

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
          background: #020617; /* Darker bg for pop */
          backdrop-filter: blur(24px);
          border: 1px solid rgba(16, 185, 129, 0.3);
          box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.7); /* Deep shadow for 3D */
          /* transform: perspective(1000px) rotateX(1deg); Removed based on user feedback to stop hover effects, keeping shadow */
        }
        
        .neon-glow {
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.2);
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
        /* ServiceNow PRO (Polaris) Styles */
        .sn-input {
          background: #ffffff;
          border: 1px solid #acbdc9;
          color: #1e293b;
          font-size: 0.8rem;
          height: 34px;
          padding: 0 0.75rem;
          border-radius: 4px;
          width: 100%;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }
        .sn-input:focus {
          outline: none;
          border-color: #032d42; /* Polaris Navy */
          box-shadow: 0 0 0 1px #032d42;
        }
        .sn-input-ro {
            background-color: #f1f5f9;
            border-color: #cbd5e1;
            color: #475569;
            cursor: default;
        }
        .sn-label {
          font-size: 0.75rem;
          color: #475569;
          font-weight: 600;
          margin-bottom: 6px;
          display: block;
        }
        .sn-highlight {
            background-color: #ecfdf5 !important; /* Emerald 50 */
            border-color: #10b981 !important; /* Emerald 500 */
            color: #064e3b !important;
            font-weight: 700;
        }
      `}</style>

      {/* --- DYNAMIC BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-slate-900"></div>
        {/* Slightly darker base for the whole page to make the white simulator pop */}
        <div className="absolute inset-0 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)] opacity-20"></div>
      </div>

      {/* --- HEADER (Fixed) --- */}
      <header className="fixed top-0 left-0 right-0 z-50 pt-6 px-8 flex justify-between items-start pointer-events-none">
        <button
          onClick={onBack}
          className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 text-slate-300 transition-all group backdrop-blur-md"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-semibold">Back</span>
        </button>

        <div className="text-center pointer-events-auto">
          <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full bg-slate-800/80 border border-emerald-500/30 text-emerald-400 text-[10px] font-semibold tracking-widest uppercase shadow-lg backdrop-blur-md">
            <Sparkles size={10} /> Next-Gen Service Management
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white drop-shadow-md">
            Predictive Intelligence
          </h1>
        </div>

        <div className="w-24"></div> {/* Spacer for center alignment */}
      </header>

      {/* --- MAIN PRESENTATION CONTAINER --- */}
      <main className="relative z-10 w-full h-screen flex flex-col justify-center items-center px-8 pt-20 pb-24 overflow-hidden">

        {/* STEP 0: END-TO-END PI SETUP */}
        {presentationStep === 0 && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-6xl">
            <div className="glass-panel rounded-3xl p-12 border-emerald-500/10">
              <div className="mb-12 text-center">
                <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3 mb-2">
                  <Layers className="text-emerald-400" size={32} /> End-to-End PI Setup
                </h2>
                <p className="text-slate-400 text-lg">Data transformation pipeline</p>
              </div>

              <div className="relative pt-12">
                {/* Connecting Line - Centered with Icons (pt-12 is 48px, icon center is 40px -> 88px total) */}
                <div className="absolute left-6 right-6 top-[88px] h-1 bg-slate-700 hidden lg:block rounded-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-emerald-500/50 animate-pulse"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
                  {[
                    {
                      title: "Analyze Records",
                      icon: <Database size={24} />,
                      desc: "Collects matching historical data and analyzes clustering patterns.",
                      step: "01",
                    },
                    {
                      title: "Create Model",
                      icon: <FileText size={24} />,
                      desc: "Groups similar texts and categories for faster results generation for accurate predictions.",
                      step: "02",
                    },
                    {
                      title: "Train Logic",
                      icon: <RefreshCw size={24} />,
                      desc: "Continuously trains the model based on data and predictions for accuracy improvement.",
                      step: "03",
                    },
                    {
                      title: "Runtime Predict",
                      icon: <Zap size={24} />,
                      desc: "Apply recommendations in real-time to auto-populate critical fields.",
                      step: "04",
                    }
                  ].map((item, idx) => {
                    const isActive = pipelineStep === idx;
                    return (
                      <div key={idx} className="relative group text-center cursor-pointer" onClick={() => setPipelineStep(idx)}>
                        {/* Timeline Node */}
                        <div className={`mx-auto w-20 h-20 rounded-full border-4 flex items-center justify-center z-10 relative transition-all duration-500
                              ${isActive
                            ? 'bg-emerald-500 border-emerald-200 shadow-[0_0_25px_#10b981] scale-110 text-slate-900'
                            : 'bg-slate-900 border-slate-700 text-slate-500 group-hover:border-slate-500'}
                            `}>
                          {item.icon}
                        </div>

                        {/* Card Content */}
                        <div className={`mt-10 p-6 rounded-xl border transition-all duration-500 min-h-[180px] flex flex-col items-center justify-start
                              ${isActive
                            ? 'bg-[#0f172a] border-emerald-500 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.3)]'
                            : 'bg-slate-900/40 border-slate-800/50 hover:bg-slate-800/60'}
                            `}>
                          <div className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-2 ${isActive ? 'text-emerald-500' : 'text-slate-600'}`}>
                            Step {item.step}
                          </div>
                          <h3 className={`text-lg font-bold mb-3 transition-colors duration-500 ${isActive ? 'text-white' : 'text-slate-200'}`}>
                            {item.title}
                          </h3>
                          <p className={`text-xs leading-relaxed transition-colors duration-500 ${isActive ? 'text-slate-300' : 'text-slate-500'}`}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Manual Step Control for PI Setup */}
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setPipelineStep((prev) => (prev + 1) % 4)}
                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center gap-2 group"
                  >
                    Next Phase <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: INTELLIGENT AUTOMATION (Holographic Card) */}
        {presentationStep === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full max-w-6xl">
            <div className="glass-panel rounded-3xl p-1 overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
              <div className="relative bg-slate-950/80 rounded-[22px] p-8 md:p-12">
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

                  {/* Holographic Card Visual */}
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
          </div>
        )}

        {/* STEP 2: PROCESS SIMULATOR (LIGHT MODE REDESIGN) */}
        {presentationStep === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full max-w-7xl">
            <div className="glass-panel rounded-3xl p-8 border-emerald-500/20 neon-glow">
              <div className="flex flex-col lg:flex-row gap-12">

                {/* Left: Instruction / Context (Stays Dark for contrast) */}
                <div className="lg:w-1/3 flex flex-col justify-center">
                  <h2 className="text-2xl font-bold text-white mb-4">Process Simulator</h2>
                  <div className="flex flex-col gap-3 mb-6">
                    <h3 className="text-lg text-emerald-400">Workflow Automation</h3>
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
                        NEXT
                      </button>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="space-y-2 text-sm">
                    <div className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${simStep === 1 || simStep === 2 ? 'bg-emerald-900/30 border-emerald-500/50 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">1</div>
                      <span>Initiate Prediction</span>
                    </div>
                    <div className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${simStep === 3 ? 'bg-emerald-900/30 border-emerald-500/50 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">2</div>
                      <span>AI Analysis</span>
                    </div>
                    <div className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${simStep >= 4 ? 'bg-emerald-900/30 border-emerald-500/50 text-white' : 'bg-slate-900/30 border-slate-800 text-slate-500'}`}>
                      <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-slate-700">3</div>
                      <span>Apply Recommendations</span>
                    </div>
                  </div>
                </div>

                {/* Right: The MOCK MODERN INTERFACE - LIGHT MODE */}
                <div className="lg:w-2/3 relative">
                  {/* Separate Module Window Container */}
                  <div className="bg-[#f4f5f7] rounded-lg shadow-2xl overflow-hidden font-sans border border-slate-400/50 min-h-[500px] relative flex flex-col w-full text-slate-800 transform transition-all hover:scale-[1.01] duration-500">

                    {/* --- VIRTUAL CURSOR --- */}
                    {showCursor && (
                      <div
                        className="absolute z-[100] pointer-events-none cursor-transition flex flex-col items-center justify-center"
                        style={{
                          top: cursorPos.top,
                          left: cursorPos.left,
                          transform: 'translate(-50%, -50%)'
                        }}
                      >
                        {clickEffect && (
                          <div className="absolute w-8 h-8 rounded-full border-2 border-emerald-500/50 animate-ping opacity-75"></div>
                        )}
                        <MousePointer2
                          size={32}
                          className="text-slate-900 drop-shadow-xl fill-white stroke-2"
                          style={{ transform: 'rotate(-15deg)' }}
                        />
                      </div>
                    )}

                    {/* 1. Header/Toolbar (Polaris Style) */}
                    <div className="bg-[#1a2234] border-b border-slate-900 px-4 py-2 flex items-center justify-between shadow-sm flex-shrink-0">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-white">
                          <div className="font-bold text-lg tracking-tight">Incident</div>
                          <div className="text-slate-400 text-sm">/</div>
                          <div className="font-medium text-slate-200 text-sm">{formState.number}</div>
                        </div>
                        <span className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">New</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-xs font-semibold text-slate-200 transition-colors">Update</button>
                        {/* PREDICT BUTTON (Top Right) */}
                        <button
                          onClick={handlePredictClick}
                          className={`px-3 py-1 border rounded text-xs font-bold transition-all flex items-center gap-1.5 ${isAnalyzing ? 'bg-white text-[#1a2234] border-white' : 'bg-transparent border-white/30 text-white hover:bg-white/10'}`}
                        >
                          {isAnalyzing ? <RefreshCw size={12} className="animate-spin" /> : <Brain size={12} />}
                          {isAnalyzing ? 'Solving...' : 'Predict'}
                        </button>
                      </div>
                    </div>

                    {/* 2. Tab Bar */}
                    <div className="bg-white border-b border-slate-200 px-4 pt-3 flex items-center gap-4 flex-shrink-0 text-xs font-semibold text-slate-500">
                      <div className="border-b-2 border-emerald-600 text-slate-900 pb-2 px-1">Incident</div>
                      <div className="hover:text-slate-800 cursor-pointer pb-2 px-1">Notes</div>
                      <div className="hover:text-slate-800 cursor-pointer pb-2 px-1">Related Records</div>
                      <div className="hover:text-slate-800 cursor-pointer pb-2 px-1">Resolution Information</div>
                    </div>

                    {/* 3. Form Body */}
                    <div className="p-6 bg-[#f4f5f7] flex-grow relative overflow-hidden">

                      {/* Card for Fields */}
                      <div className="bg-white border border-slate-200 shadow-sm rounded-md p-6">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-4">
                          <div className="space-y-4">
                            <div>
                              <span className="sn-label">Number</span>
                              <input type="text" readOnly value={formState.number} className="sn-input sn-input-ro" />
                            </div>
                            <div>
                              <span className="sn-label">Caller <span className="text-red-500">*</span></span>
                              <div className="relative">
                                <input type="text" readOnly value={formState.caller} className="sn-input" />
                                <Search size={14} className="absolute right-2.5 top-2.5 text-slate-400" />
                              </div>
                            </div>
                            <div>
                              <span className="sn-label">Category</span>
                              <input
                                type="text"
                                readOnly
                                value={formState.category}
                                placeholder="-- None --"
                                className={`sn-input ${formState.category ? 'sn-highlight' : ''} ${highlightUpdates ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}
                              />
                            </div>
                          </div>
                          <div className="space-y-4">
                            <div>
                              <span className="sn-label">Impact</span>
                              <input
                                type="text"
                                readOnly
                                value={formState.impact}
                                className={`sn-input ${formState.impact.includes('High') ? 'sn-highlight' : ''} ${highlightUpdates ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}
                              />
                            </div>
                            <div>
                              <span className="sn-label">Urgency</span>
                              <input
                                type="text"
                                readOnly
                                value={formState.urgency}
                                className={`sn-input ${formState.urgency.includes('High') ? 'sn-highlight' : ''} ${highlightUpdates ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}
                              />
                            </div>
                            <div>
                              <span className="sn-label">Configuration Item</span>
                              <div className="relative">
                                <input
                                  type="text"
                                  readOnly
                                  value={formState.ci}
                                  placeholder=""
                                  className={`sn-input pr-8 ${formState.ci ? 'sn-highlight' : ''} ${highlightUpdates ? 'ring-2 ring-emerald-500 ring-offset-1' : ''}`}
                                />
                                <Search size={14} className="absolute right-2.5 top-2.5 text-slate-400" />
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="sn-label">Short description <span className="text-red-500">*</span></span>
                          <input type="text" value={formState.shortDescription} readOnly className="sn-input" />
                        </div>
                      </div>

                      {/* 4. PREDICTION TOAST / MODAL (Modernized) */}
                      {isAnalyzing && (
                        <div className="absolute inset-x-0 bottom-6 flex justify-center z-20">
                          <div className="bg-[#1a2234] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5">
                            <RefreshCw size={18} className="animate-spin text-emerald-400" />
                            <span className="font-semibold text-sm tracking-wide">Predictive Intelligence is analyzing...</span>
                          </div>
                        </div>
                      )}

                      {showModal && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/20 backdrop-blur-[2px] animate-in fade-in duration-200">
                          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-[400px] overflow-hidden font-sans transform transition-all animate-in zoom-in-95 slide-in-from-bottom-2 duration-300">
                            {/* Header */}
                            <div className="bg-[#1a2234] px-6 py-4 flex justify-between items-center border-b border-slate-900">
                              <div className="flex items-center gap-2.5">
                                <div className="p-1.5 bg-emerald-500/20 rounded-md border border-emerald-500/30">
                                  <Sparkles size={16} className="text-emerald-400" />
                                </div>
                                <div>
                                  <h3 className="text-sm font-bold text-white tracking-wide">AI RECOMMENDATIONS</h3>
                                  <p className="text-[10px] text-slate-400">Based on historical incident data</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-xs text-slate-400 uppercase font-semibold">Confidence</div>
                                <div className="text-xl font-black text-emerald-400">{predictions.confidence}</div>
                              </div>
                            </div>

                            {/* Body */}
                            <div className="p-6 bg-slate-50/50 space-y-4">
                              <div className="space-y-3">
                                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60">
                                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Field</span>
                                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Predicted Value</span>
                                </div>
                                {[
                                  { label: "Category", val: predictions.category, icon: <Layers size={14} className="text-slate-400" /> },
                                  { label: "Configuration Item", val: predictions.ci, icon: <Database size={14} className="text-slate-400" /> },
                                  { label: "Impact", val: predictions.impact, highlight: true, icon: <AlertCircle size={14} className={predictions.impact.includes('High') ? "text-red-500" : "text-slate-400"} /> },
                                  { label: "Urgency", val: predictions.urgency, highlight: true, icon: <AlertCircle size={14} className={predictions.urgency.includes('High') ? "text-red-500" : "text-slate-400"} /> },
                                ].map((f, i) => (
                                  <div key={i} className="flex justify-between items-center group">
                                    <div className="flex items-center gap-2">
                                      {f.icon}
                                      <span className="text-sm font-medium text-slate-600">{f.label}</span>
                                    </div>
                                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${f.highlight ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'text-slate-800 bg-white border border-slate-200'}`}>
                                      {f.val}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-white border-t border-slate-100 flex justify-end gap-3">
                              <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-lg transition-colors"
                              >
                                Dismiss
                              </button>
                              <button
                                onClick={handleSave}
                                className="px-5 py-2 text-xs font-bold bg-[#1a2234] hover:bg-[#2c3b55] text-white rounded-lg shadow-lg shadow-slate-900/20 flex items-center gap-2 transition-all transform hover:scale-105 active:scale-95"
                              >
                                <CheckCircle2 size={14} className="text-emerald-400" />
                                Apply Changes
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: MEASURABLE IMPACT */}
        {presentationStep === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 w-full max-w-6xl">
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
          </div>
        )}
      </main>

      {/* --- FIXED BOTTOM NAVIGATION --- */}
      <footer className="fixed bottom-8 left-0 right-0 z-50 p-6 flex justify-center items-center pointer-events-none">
        <div className="pointer-events-auto bg-slate-900/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl px-12 py-5 flex items-center gap-10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] hover:scale-105 transition-transform duration-300">
          {/* Previous Button */}
          <button
            onClick={() => setPresentationStep(prev => Math.max(0, prev - 1))}
            disabled={presentationStep === 0}
            className={`flex items-center gap-3 text-base font-bold transition-colors ${presentationStep === 0 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-300 hover:text-white'}`}
          >
            <ArrowLeft size={20} /> Previous
          </button>

          {/* Step Indicators */}
          <div className="flex items-center gap-4">
            {[0, 1, 2, 3].map((step) => (
              <div
                key={step}
                className={`transition-all duration-300 rounded-full ${presentationStep === step ? 'w-4 h-4 bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'w-3 h-3 bg-slate-700'}`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={() => setPresentationStep(prev => Math.min(3, prev + 1))}
            disabled={presentationStep === 3}
            className={`flex items-center gap-3 text-base font-bold transition-colors ${presentationStep === 3 ? 'text-slate-600 cursor-not-allowed' : 'text-emerald-400 hover:text-emerald-300'}`}
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </footer>
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
