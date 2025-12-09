
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageSquare, 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  Database, 
  Zap, 
  ThumbsUp, 
  ThumbsDown, 
  ArrowRight,
  Send,
  Cpu,
  Activity,
  Layers,
  BarChart3,
  Check,
  Play,
  Pause,
  ChevronRight,
  RotateCcw,
  Code2,
  GitBranch,
  Terminal,
  Network,
  BrainCircuit,
  ArrowLeft
} from 'lucide-react';

interface VirtualAgentSimProps {
  onBack: () => void;
}

// --- Components ---

const Header = ({ onBack }: { onBack: () => void }) => (
  <header className="text-center mb-16 relative z-10">
    <button 
        onClick={onBack}
        className="absolute top-0 left-0 flex items-center gap-2 px-4 py-2 bg-slate-900/80 border border-slate-700 rounded-lg hover:border-emerald-500/50 hover:text-emerald-400 transition-all group z-50"
    >
        <ArrowLeft size={16} />
        <span className="text-sm font-semibold">Back to Overview</span>
    </button>

    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wider uppercase mb-4 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
      <Sparkles size={12} />
      Next-Gen Service Operations
    </div>
    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-2">
      Smart Self-Service: <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200">Virtual Agent + GenAI</span>
    </h1>
    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
      Empowering users with instant, context-aware resolution instructions generated from your Knowledge Base.
    </p>
  </header>
);

const SectionCard = ({ title, icon: Icon, children, className = "" }: any) => (
  <section className={`
    relative bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-8 shadow-2xl overflow-hidden 
    transition-all duration-500 ease-out group
    hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] hover:border-emerald-500/30 hover:-translate-y-1 hover:bg-[#0f172a]/80
    ${className}
  `}>
    {/* Subtle gradient corner accent - intensifies on hover */}
    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none -z-10 transition-opacity duration-700 group-hover:bg-emerald-500/10" />
    
    <div className="flex items-center gap-3 mb-8 border-b border-white/5 pb-4 transition-colors duration-500 group-hover:border-emerald-500/20">
      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 transition-all duration-500 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_15px_rgba(52,211,153,0.3)]">
        <Icon size={20} />
      </div>
      <h2 className="text-xl font-bold text-white tracking-wide transition-colors duration-500 group-hover:text-emerald-50">{title}</h2>
    </div>
    {children}
  </section>
);

// --- Enhanced Pipeline Components ---

const PipelineStep = ({ icon: Icon, title, description, state, stepNum, isLast }: any) => {
  // state: 'idle' | 'active' | 'completed'
  const isActive = state === 'active';
  const isCompleted = state === 'completed';

  return (
    <div className="relative flex-1 group">
       {/* Connector Line (Horizontal for Desktop) */}
       {!isLast && (
         <div className="hidden md:block absolute top-[2.5rem] left-1/2 w-full h-[2px] bg-slate-800 z-0">
           {/* Animated Progress Line */}
           <div 
             className={`h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-700 ease-out
               ${isCompleted ? 'w-full' : isActive ? 'w-1/2' : 'w-0'}
             `} 
           />
           {/* Moving Particle if active */}
           {isActive && (
             <div className="absolute top-1/2 -translate-y-1/2 right-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white] animate-ping" />
           )}
         </div>
       )}

       {/* Card Container */}
       <div 
         className={`
           relative z-10 flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-500 mx-2 h-full
           ${isActive 
             ? 'bg-[#1e293b]/90 border-emerald-400/50 shadow-[0_0_30px_rgba(52,211,153,0.1)] scale-105 translate-y-[-4px]' 
             : isCompleted
               ? 'bg-[#0f172a]/80 border-emerald-500/20'
               : 'bg-[#0f172a]/40 border-slate-800/50 opacity-60'
           }
           backdrop-blur-xl
         `}
       >
         {/* Top "Tech" Accent */}
         {isActive && (
           <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-16 h-[2px] bg-emerald-400 shadow-[0_0_10px_#34d399]" />
         )}

         {/* Icon Container */}
         <div className="relative mb-5">
            {/* Spinning Ring for Active */}
            {isActive && (
              <div className="absolute -inset-3 border-2 border-emerald-500/30 rounded-full border-t-emerald-400 animate-spin" style={{animationDuration: '3s'}} />
            )}
            
            <div 
              className={`
                w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-500 shadow-lg relative z-10
                ${isActive || isCompleted 
                  ? 'bg-gradient-to-br from-emerald-500/20 to-slate-900 text-emerald-400 border border-emerald-500/50' 
                  : 'bg-slate-800/50 text-slate-500 border border-slate-700'}
              `}
            >
              {isCompleted ? <Check size={24} /> : <Icon size={24} />}
            </div>

            {/* Step Number Badge */}
            <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border z-20 ${isActive ? 'bg-emerald-500 text-slate-900 border-emerald-400' : 'bg-slate-800 text-slate-500 border-slate-700'}`}>
              {stepNum}
            </div>
         </div>

         {/* Content */}
         <h3 className={`text-lg font-bold mb-2 transition-colors ${isActive ? 'text-white' : 'text-slate-400'}`}>
           {title}
         </h3>
         <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
           {description}
         </p>

         {/* Active Status Indicator */}
         <div className={`mt-4 h-6 flex items-center justify-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
               <Activity size={10} className="text-emerald-400 animate-pulse" />
               <span className="text-[10px] font-medium text-emerald-400 uppercase tracking-wider">Processing</span>
            </div>
         </div>
       </div>
    </div>
  );
};

const ProcessPipeline = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // Default: Paused

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % 5); // 5 steps to allow a "reset" pause at the end
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % 5);
    setIsPlaying(false); // Pause if manually interacting
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const steps = [
    { 
      icon: MessageSquare, 
      title: "User Inquiry", 
      description: "User asks a question (e.g., \"How do I connect to VPN?\") via Virtual Agent chat." 
    },
    { 
      icon: Search, 
      title: "PI Matching", 
      description: "Predictive Intelligence identifies top relevant KB articles." 
    },
    { 
      icon: Cpu, 
      title: "GenAI Synthesis", 
      description: "LLM extracts specific steps and summarizes content." 
    },
    { 
      icon: CheckCircle2, 
      title: "Delivery", 
      description: "Concise, step-by-step resolution presented to user." 
    }
  ];

  return (
    <div className="relative w-full py-4">
      {/* Visual Pipeline */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-4 relative mb-12">
        {steps.map((step, idx) => {
          // Logic for step state
          let state = 'idle';
          if (currentStep === idx) state = 'active';
          if (currentStep > idx && currentStep < 4) state = 'completed';
          
          return (
            <PipelineStep 
              key={idx} 
              {...step} 
              stepNum={idx + 1}
              state={state}
              isLast={idx === steps.length - 1}
            />
          );
        })}
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className={`
            flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 border
            ${isPlaying 
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20' 
              : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white'
            }
          `}
        >
          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
          {isPlaying ? 'Pause' : 'Auto Play'}
        </button>

        {/* Next Button */}
        <button 
          onClick={handleNext}
          className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 text-slate-900 font-bold text-sm hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95"
        >
          Next Step
          <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>

        {/* Reset Button (Optional but helpful) */}
        <button 
          onClick={handleReset}
          className="p-2.5 rounded-full border border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 hover:bg-slate-800 transition-all"
          title="Reset Flow"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Decorative background visual behind the cards */}
      <div className="absolute top-1/2 left-0 w-full h-24 -translate-y-1/2 bg-emerald-500/5 blur-3xl -z-10 rounded-full"></div>
    </div>
  );
};

// --- Simulator Components ---

const ChatSimulator = ({ step, onStepChange, isPlaying, onPlayChange, onReset }: any) => {
  const [messages, setMessages] = useState<any[]>([{ role: 'bot', text: "Hi! I'm your Virtual Agent. How can I help you today?" }]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackSelected, setFeedbackSelected] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isProcessing, showFeedback, isTyping]);

  // Main State Machine based on Props `step`
  useEffect(() => {
    // Defines what the UI looks like at each step
    const userQuery = "How do I connect to the VPN?";
    let typingInterval: any;

    if (step === 0) {
      // RESET STATE
      setMessages([{ role: 'bot', text: "Hi! I'm your Virtual Agent. How can I help you today?" }]);
      setInputValue("");
      setIsTyping(false);
      setIsProcessing(false);
      setShowFeedback(false);
      setFeedbackSelected(null);
    } 
    else if (step === 1) {
      // TYPING STATE
      setIsTyping(true);
      let charIndex = 0;
      // Fast typing for demo
      typingInterval = setInterval(() => {
        if (charIndex <= userQuery.length) {
          setInputValue(userQuery.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30);
    } 
    else if (step === 2) {
      // SENT / PROCESSING STATE
      clearInterval(typingInterval);
      setInputValue("");
      setIsTyping(false);
      setMessages(prev => {
        // Prevent duplicate user messages if stepping back/forth
        if (prev.some(m => m.role === 'user')) return prev;
        return [...prev, { role: 'user', text: userQuery }];
      });
      setIsProcessing(true);
    } 
    else if (step === 3) {
      // RESPONSE STATE
      setIsProcessing(false);
      setMessages(prev => {
        if (prev.some(m => m.type === 'solution')) return prev;
        return [...prev, { 
          role: 'bot', 
          type: 'solution',
          title: "Connecting to Corporate VPN",
          text: "Based on KB001234, here are the steps to connect:",
          steps: ["Open the Cisco AnyConnect Client.", "Enter 'vpn.company.com' in the address bar.", "Click 'Connect' and enter your SSO credentials.", "Approve the MFA request on your mobile device."]
        }];
      });
    } 
    else if (step === 4) {
      // FEEDBACK PROMPT
      setShowFeedback(true);
    } 
    else if (step === 5) {
      // FEEDBACK GIVEN
      setFeedbackSelected('yes');
    }

    return () => clearInterval(typingInterval);
  }, [step]);

  // Auto-Play Timer Logic
  useEffect(() => {
    let timeout: any;
    if (isPlaying) {
      // Durations for each step before moving to next
      const stepDurations = [
        2000, // Step 0: Idle -> Start Typing
        2000, // Step 1: Typing -> Send
        2500, // Step 2: Processing -> Response
        4000, // Step 3: Reading -> Feedback Prompt
        1500, // Step 4: Prompt -> Select Yes
        2000  // Step 5: Done -> Reset
      ];

      timeout = setTimeout(() => {
        onStepChange((step + 1) % 6);
      }, stepDurations[step] || 2000);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, step, onStepChange]);

  return (
    <div className="w-full relative flex flex-col gap-6">
      <div className="relative bg-[#020617]/60 border border-white/5 rounded-2xl overflow-hidden flex flex-col h-[500px] shadow-2xl">
        {/* Chat Header */}
        <div className="h-14 bg-[#020617]/80 border-b border-white/5 flex items-center px-4 justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30 relative">
              <Bot size={18} className="text-emerald-400" />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#020617] rounded-full flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div>
              <h3 className="text-white font-medium text-sm">Virtual Agent</h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-emerald-500/80 uppercase tracking-wide font-semibold">GenAI Enabled</span>
              </div>
            </div>
          </div>
          <Zap size={16} className="text-emerald-500/50" />
        </div>

        {/* Chat Body */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-gradient-to-b from-transparent to-[#020617]/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] rounded-2xl p-4 shadow-lg ${
                msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-br-sm' 
                  : 'bg-[#1e293b] text-slate-200 border border-slate-700/50 rounded-bl-sm'
              }`}>
                {msg.type === 'solution' ? (
                  <div className="space-y-3">
                     <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wide mb-1 border-b border-white/5 pb-2">
                        <Sparkles size={12} />
                        GenAI Summary
                     </div>
                     <p className="font-semibold text-white">{msg.title}</p>
                     <p className="text-sm text-slate-300">{msg.text}</p>
                     <ul className="space-y-2 mt-2">
                       {msg.steps.map((step: any, sIdx: number) => (
                         <li key={sIdx} className="flex gap-2 text-sm bg-[#020617]/30 p-2.5 rounded border border-white/5">
                           <span className="text-emerald-400 font-bold shrink-0">{sIdx + 1}.</span>
                           <span className="text-slate-300">{step}</span>
                         </li>
                       ))}
                     </ul>
                  </div>
                ) : (
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                )}
              </div>
            </div>
          ))}

          {isProcessing && (
            <div className="flex justify-start animate-in fade-in duration-300">
              <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl rounded-bl-sm p-4 flex items-center gap-3 shadow-lg">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_-0.3s]"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[bounce_1s_infinite_-0.15s]"></div>
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-[bounce_1s_infinite]"></div>
                </div>
                <span className="text-xs text-emerald-400 font-medium tracking-wide">Synthesizing Response...</span>
              </div>
            </div>
          )}

          {showFeedback && (
             <div className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-500">
               <div className="bg-[#1e293b] border border-slate-700/50 rounded-2xl rounded-bl-sm p-3 space-y-2 w-full max-w-[250px] shadow-lg">
                 <p className="text-xs text-slate-400 font-medium">Was this helpful?</p>
                 <div className="flex gap-2">
                   <button 
                    className={`flex-1 py-1.5 rounded border text-xs font-medium transition-all duration-300 flex items-center justify-center gap-1
                      ${feedbackSelected === 'yes' 
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'}`}
                   >
                     <ThumbsUp size={12} /> Yes
                   </button>
                   <button className="flex-1 py-1.5 rounded border border-slate-700 bg-slate-800 text-slate-400 text-xs font-medium flex items-center justify-center gap-1 hover:bg-slate-700 transition-colors">
                     <ThumbsDown size={12} /> No
                   </button>
                 </div>
               </div>
             </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#020617]/80 border-t border-white/5 backdrop-blur-md">
          <div className="relative">
             <input 
               type="text" 
               readOnly
               value={inputValue}
               className="w-full bg-[#0f172a] border border-slate-700/50 rounded-xl py-3 px-4 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 transition-colors shadow-inner"
               placeholder="Type your message..."
             />
             <div className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
               <Send size={16} className={`${inputValue ? 'text-emerald-400' : 'text-slate-600'} transition-colors`} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Live Experience Container with Technical Insights ---

const LiveExperienceSection = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Technical Breakdown Data matched to Simulation Steps
  const technicalSteps = [
    {
      title: "System Initialization",
      icon: Network,
      color: "text-blue-400",
      content: "Session established securely. Natural Language Understanding (NLU) models loaded into memory. User context (Role: Employee, Location: US) retrieved from identity provider."
    },
    {
      title: "Input Ingestion & Analysis",
      icon: Terminal,
      color: "text-purple-400",
      content: "The Virtual Agent chat interface dynamically captures user input variables in real-time, structuring the raw query parameters for downstream analysis."
    },
    {
      title: "Intent Recognition",
      icon: BrainCircuit,
      color: "text-amber-400",
      content: "Predictive Intelligence is invoked to analyze the query. Top-matched Knowledge Base articles are retrieved and securely passed to the external LLM (Gemini 2.5) for context enhancement."
    },
    {
      title: "GenAI Results",
      icon: Cpu,
      color: "text-emerald-400",
      content: "The LLM processes the retrieved articles, extracting specific actionable steps to synthesize a precise and accurate response tailored exactly to the user's question."
    },
    {
      title: "Resolution & Deflection",
      icon: GitBranch,
      color: "text-pink-400",
      content: "User satisfaction is confirmed via feedback. The query is instantly resolved, successfully avoiding the creation of an L1 incident ticket."
    },
    {
      title: "Model Optimization",
      icon: Database,
      color: "text-cyan-400",
      content: "Positive feedback signal received. Interaction metadata tagged and stored in the 'Gold' dataset for future model fine-tuning and regression testing."
    }
  ];

  // Helper component for Icon
  const CurrentIcon = technicalSteps[step].icon;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Left Side: Technical Breakdown & Controls */}
      <div className="w-full lg:w-1/3 pt-4 flex flex-col gap-6">
        <div className="bg-[#1e293b]/40 border border-white/5 rounded-2xl p-6 relative overflow-hidden transition-all duration-500">
           {/* Animated Background Glow based on step color */}
           <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] opacity-20 transition-colors duration-700 pointer-events-none -translate-y-1/2 translate-x-1/2
             ${step === 0 ? 'bg-blue-500' : 
               step === 1 ? 'bg-purple-500' : 
               step === 2 ? 'bg-amber-500' : 
               step === 3 ? 'bg-emerald-500' : 
               step === 4 ? 'bg-pink-500' : 'bg-cyan-500'
             }`} 
           />

           <div className="relative z-10">
             <div className="flex items-center gap-2 mb-6 opacity-50">
               <Code2 size={16} />
               <span className="text-xs font-mono uppercase tracking-widest">Backend Log Stream</span>
             </div>

             {/* Animated Content Switcher */}
             <div key={step} className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className={`w-12 h-12 rounded-xl bg-slate-800/80 border border-white/10 flex items-center justify-center mb-6 shadow-lg ${technicalSteps[step].color}`}>
                  <CurrentIcon size={24} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                  {technicalSteps[step].title}
                </h3>
                
                <div className="h-0.5 w-12 bg-white/10 mb-4 rounded-full">
                  <div className={`h-full rounded-full transition-all duration-1000 w-full ${technicalSteps[step].color.replace('text', 'bg')}`} />
                </div>

                <p className="text-slate-400 leading-relaxed text-sm font-medium">
                  {technicalSteps[step].content}
                </p>

                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>Process ID</span>
                    <span>0x7F{Math.floor(Math.random() * 999)}...</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>Latency</span>
                    <span className={step === 3 ? "text-emerald-400" : ""}>{step === 3 ? "240ms" : "< 10ms"}</span>
                  </div>
                </div>
             </div>
           </div>
        </div>

        {/* Relocated Controls */}
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className={`
              flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 border
              ${isPlaying 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20' 
                : 'bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white'
              }
            `}
          >
            {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            {isPlaying ? 'Pause' : 'Auto Play'}
          </button>

          <button 
            onClick={() => { setStep((prev) => (prev + 1) % 6); if(isPlaying) setIsPlaying(false); }}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 text-slate-900 font-bold text-sm hover:bg-emerald-400 transition-all duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] active:scale-95 whitespace-nowrap"
          >
            Next Step
            <ChevronRight size={18} />
          </button>

          <button 
            onClick={() => { setStep(0); setIsPlaying(false); }}
            className="px-4 py-3 rounded-xl border border-slate-700 text-slate-500 hover:text-slate-300 hover:border-slate-500 hover:bg-slate-800 transition-all"
            title="Reset Simulation"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Right Side: Simulator */}
      <div className="w-full lg:w-2/3">
        <ChatSimulator 
          step={step} 
          onStepChange={setStep} 
          isPlaying={isPlaying} 
          onPlayChange={() => setIsPlaying(!isPlaying)}
          onReset={() => { setStep(0); setIsPlaying(false); }}
        />
      </div>
    </div>
  );
};


const MetricCard = ({ label, value, subtext }: any) => (
  <div className="group bg-[#1e293b]/40 border border-white/5 p-6 rounded-2xl hover:bg-[#1e293b]/60 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-emerald-500/10 transition-colors"></div>
    <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-2">
      <span className="w-1 h-1 rounded-full bg-emerald-500"></span>
      {label}
    </div>
    <div className="text-4xl font-bold text-white mb-2 flex items-baseline gap-1">
      {value}
      <span className="text-emerald-400 text-xl font-normal">+</span>
    </div>
    <p className="text-slate-500 text-sm">{subtext}</p>
  </div>
);

// --- Main App ---

export const VirtualAgentSim: React.FC<VirtualAgentSimProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 pb-20 animate-fade-in">
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" 
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.03) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(16, 185, 129, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      ></div>
      
      {/* Radial Gradient Glow for ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <main className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <Header onBack={onBack} />
        
        {/* Section B: Process Pipeline */}
        <SectionCard title="System Architecture" icon={Layers}>
          <ProcessPipeline />
        </SectionCard>

        {/* Section C: The Simulator */}
        <SectionCard title="Live Experience: Virtual Agent" icon={Activity}>
          <LiveExperienceSection />
        </SectionCard>

        {/* Section D: Metrics */}
        <SectionCard title="Business Impact" icon={BarChart3}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <MetricCard 
              label="Deflection Rate" 
              value="45%" 
              subtext="Reduction in L1 ticket volume"
            />
            <MetricCard 
              label="Resolution Time" 
              value="< 2s" 
              subtext="Vs. 4 hours average wait time"
            />
            <MetricCard 
              label="User Satisfaction" 
              value="30%" 
              subtext="Increase in reported CSAT scores"
            />
          </div>
        </SectionCard>

        <footer className="text-center mt-12 text-slate-600 text-sm border-t border-white/5 pt-8">
          <p className="flex items-center justify-center gap-2">
            <span>© ServiceNow</span>
            <span className="w-1 h-1 rounded-full bg-slate-700"></span>
            <span>GenAI Service Operations Prototype</span>
          </p>
        </footer>
      </main>
    </div>
  );
}
