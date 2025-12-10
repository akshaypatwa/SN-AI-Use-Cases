
import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Database, 
  Bot, 
  Search, 
  X,
  ArrowRight,
  FileText,
  Binary,
  Library,
  MessageSquare,
  Wrench,
  Zap,
  BookOpen,
  User,
  Plug,
  Cable,
  Network,
  ArrowLeft,
  Share2
} from 'lucide-react';

interface TerminologyModalProps {
  onClose: () => void;
}

// Simple Glossary Card
const GlossaryCard = ({ icon: Icon, title, analogy, description }: any) => (
  <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all hover:-translate-y-1">
    <div className="flex items-start gap-4 mb-3">
        <div className="p-3 bg-slate-700/50 rounded-xl text-indigo-400 shrink-0">
            <Icon size={24} />
        </div>
        <div>
            <h4 className="font-bold text-white text-lg">{title}</h4>
            <span className="text-xs text-indigo-300 bg-indigo-500/10 px-2 py-1 rounded border border-indigo-500/20 uppercase tracking-wide font-bold mt-1 inline-block">
                Analogy: {analogy}
            </span>
        </div>
    </div>
    <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
  </div>
);

export const TerminologyModal: React.FC<TerminologyModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'llm' | 'vectors' | 'rag' | 'mcp' | 'agent'>('llm');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top of content when tab changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  const tabs = [
    { id: 'llm', label: 'LLM', sub: 'The Brain', icon: Brain, color: 'text-pink-400', border: 'border-pink-500', bg: 'bg-pink-500/10' },
    { id: 'vectors', label: 'Embeddings', sub: 'The Translator', icon: Binary, color: 'text-cyan-400', border: 'border-cyan-500', bg: 'bg-cyan-500/10' },
    { id: 'rag', label: 'RAG', sub: 'The Library', icon: Library, color: 'text-indigo-400', border: 'border-indigo-500', bg: 'bg-indigo-500/10' },
    { id: 'mcp', label: 'MCP', sub: 'The Adapter', icon: Plug, color: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-500/10' },
    { id: 'agent', label: 'Agent', sub: 'The Worker', icon: Bot, color: 'text-emerald-400', border: 'border-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0b0f19] animate-fade-in flex flex-col">
      {/* Scrollable Container for whole page */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto w-full h-full scroll-smooth"
      >
        <div className="w-full min-h-screen flex flex-col">
          
          {/* Sticky Navigation Header */}
          <div className="sticky top-0 z-40 bg-[#0b0f19]/90 backdrop-blur-xl border-b border-white/5 px-4 md:px-8 py-4 flex items-center justify-between shadow-lg">
             <button 
               onClick={onClose} 
               className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors bg-slate-800/50 hover:bg-slate-800 px-4 py-2 rounded-lg border border-transparent hover:border-slate-600 group"
             >
               <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform"/> <span className="font-semibold hidden sm:inline">Back to Dashboard</span>
               <span className="font-semibold sm:hidden">Back</span>
             </button>
             <div className="text-white font-bold flex items-center gap-2">
               <BookOpen size={18} className="text-indigo-400"/> GenAI Concepts
             </div>
             <div className="w-24 hidden md:block"></div> {/* Spacer */}
          </div>

          {/* Main Content Container */}
          <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-12">
              
              {/* Hero Title */}
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                      How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Actually Works</span>
                  </h2>
                  <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                      Complex AI concepts explained simply using real-world analogies. Click a topic below to explore.
                  </p>
              </div>

              {/* Tab Navigation (Scrollable on mobile) */}
              <div className="mb-12 sticky top-20 z-30 bg-[#0b0f19]/95 backdrop-blur py-4 -mx-4 px-4 md:mx-0 md:px-0 border-b border-white/5 md:border-none md:bg-transparent md:static">
                  <div className="overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex gap-4 md:justify-center min-w-max px-2">
                        {tabs.map((tab) => (
                            <button 
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`
                                    flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all w-32 h-28 md:w-36 md:h-32 group relative overflow-hidden
                                    ${activeTab === tab.id 
                                        ? `${tab.bg} ${tab.border} shadow-[0_0_20px_rgba(0,0,0,0.3)]` 
                                        : 'bg-slate-900 border-slate-800 hover:bg-slate-800 hover:border-slate-700'}
                                `}
                            >
                                <tab.icon size={28} className={`mb-3 transition-colors relative z-10 ${activeTab === tab.id ? tab.color : 'text-slate-500 group-hover:text-slate-300'}`} />
                                <div className={`font-black text-base md:text-lg relative z-10 ${activeTab === tab.id ? 'text-white' : 'text-slate-400'}`}>{tab.label}</div>
                                <div className={`text-[10px] font-medium uppercase tracking-wider relative z-10 ${activeTab === tab.id ? tab.color : 'text-slate-600'}`}>{tab.sub}</div>
                                
                                {/* Active Glow Background */}
                                {activeTab === tab.id && (
                                    <div className={`absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none`} />
                                )}
                            </button>
                        ))}
                    </div>
                  </div>
              </div>

              {/* Active Content Area */}
              <div className="animate-fade-in min-h-[500px]">
                  
                  {/* TAB 1: LLM */}
                  {activeTab === 'llm' && (
                      <div className="space-y-12 animate-fade-in-up">
                          <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-900/40 p-8 md:p-12 rounded-3xl border border-white/5">
                              <div className="flex-1">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold uppercase tracking-wider mb-6">
                                      The Brain
                                  </div>
                                  <h3 className="text-3xl font-bold text-white mb-6">LLM (Large Language Model)</h3>
                                  <p className="text-slate-300 text-xl leading-relaxed mb-6">
                                      Think of an LLM like a <span className="text-pink-400 font-bold">Brilliant Professor</span> who has read every book in the public library.
                                  </p>
                                  <ul className="space-y-4 text-slate-400">
                                      <li className="flex items-start gap-3">
                                          <CheckCircle2Icon className="text-emerald-500 mt-1 shrink-0" />
                                          <span>Can write poems, code, and summarize history perfectly.</span>
                                      </li>
                                      <li className="flex items-start gap-3">
                                          <XCircleIcon className="text-red-500 mt-1 shrink-0" />
                                          <span>But... <strong>it doesn't know your secrets.</strong> It has never read your company's private emails or documents.</span>
                                      </li>
                                  </ul>
                              </div>
                              <div className="w-full lg:w-1/2">
                                  <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 relative overflow-hidden">
                                      <div className="absolute top-0 right-0 p-3 bg-red-500/10 text-red-400 text-xs font-bold rounded-bl-xl border-l border-b border-red-500/20">
                                          LIMITATION
                                      </div>
                                      <div className="space-y-6">
                                          <div className="flex gap-4 items-start">
                                              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white shrink-0"><User size={20}/></div>
                                              <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-none border border-slate-700">
                                                  <p className="text-sm text-slate-300">"What is the status of Project Apollo?"</p>
                                              </div>
                                          </div>
                                          <div className="flex gap-4 items-start justify-end">
                                              <div className="bg-pink-950/30 p-4 rounded-2xl rounded-tr-none border border-pink-500/30 text-right">
                                                  <p className="text-sm text-pink-200">"I don't know what Project Apollo is. I only know public information."</p>
                                                  <p className="text-xs text-red-400 mt-2 flex items-center justify-end gap-1"><Zap size={10}/> Data Cutoff</p>
                                              </div>
                                              <div className="w-10 h-10 rounded-full bg-pink-600 flex items-center justify-center text-white shrink-0"><Brain size={20}/></div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* TAB 2: EMBEDDINGS */}
                  {activeTab === 'vectors' && (
                      <div className="space-y-12 animate-fade-in-up">
                          <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-900/40 p-8 md:p-12 rounded-3xl border border-white/5">
                               <div className="flex-1">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-6">
                                      The Translator
                                  </div>
                                  <h3 className="text-3xl font-bold text-white mb-6">Embeddings</h3>
                                  <p className="text-slate-300 text-xl leading-relaxed mb-6">
                                      Computers don't understand English. They only understand math. Embeddings is a process that translates words into <span className="text-cyan-400 font-bold">Lists of Numbers (Vectors)</span>.
                                  </p>
                                  <div className="bg-cyan-900/10 border border-cyan-500/20 p-6 rounded-xl">
                                      <h4 className="text-cyan-400 font-bold mb-2">Why is this useful?</h4>
                                      <p className="text-slate-400">
                                          It allows the AI to understand <strong>meaning</strong>, not just keywords. It knows that "King" - "Man" + "Woman" = "Queen", just by doing math on the numbers.
                                      </p>
                                  </div>
                              </div>
                              <div className="w-full lg:w-1/2">
                                  <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col gap-6">
                                      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-700">
                                          <div className="flex items-center gap-3">
                                              <span className="text-2xl">🍎</span>
                                              <span className="font-bold text-white">Apple</span>
                                          </div>
                                          <ArrowRight className="text-slate-600"/>
                                          <div className="font-mono text-xs text-cyan-400 bg-cyan-950/50 px-3 py-1.5 rounded border border-cyan-500/30">
                                              [0.9, 0.1, 0.2]
                                          </div>
                                      </div>
                                      <div className="flex items-center justify-between p-4 bg-slate-900 rounded-xl border border-slate-700">
                                          <div className="flex items-center gap-3">
                                              <span className="text-2xl">🍌</span>
                                              <span className="font-bold text-white">Banana</span>
                                          </div>
                                          <ArrowRight className="text-slate-600"/>
                                          <div className="font-mono text-xs text-cyan-400 bg-cyan-950/50 px-3 py-1.5 rounded border border-cyan-500/30">
                                              [0.8, 0.2, 0.1]
                                          </div>
                                      </div>
                                      <div className="flex items-center justify-center gap-2 text-slate-500 text-sm mt-2">
                                          <Zap size={14} className="text-yellow-400"/>
                                          The math shows these are 95% similar (Both are fruits)
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* TAB 3: RAG */}
                  {activeTab === 'rag' && (
                      <div className="space-y-12 animate-fade-in-up">
                          <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-900/40 p-8 md:p-12 rounded-3xl border border-white/5">
                               <div className="flex-1">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-6">
                                      The Library
                                  </div>
                                  <h3 className="text-3xl font-bold text-white mb-6">RAG (Retrieval Augmented Generation)</h3>
                                  <p className="text-slate-300 text-xl leading-relaxed mb-6">
                                      RAG is like giving the Professor (LLM) an <span className="text-indigo-400 font-bold">Open Book Test</span>.
                                  </p>
                                  <p className="text-slate-400 leading-relaxed">
                                      Instead of forcing the AI to memorize your data, we just <strong>search for the answer</strong> in your files first, paste that text into the prompt, and tell the AI: "Use this text to answer the question."
                                  </p>
                              </div>
                              <div className="w-full lg:w-1/2">
                                  <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 relative">
                                      {/* Simplified RAG Flow */}
                                      <div className="space-y-4">
                                          <div className="flex items-center gap-4">
                                              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">1</div>
                                              <div className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800 text-sm text-slate-300">
                                                  User asks: "Fix VPN"
                                              </div>
                                          </div>
                                          
                                          <div className="h-6 w-0.5 bg-slate-700 ml-4"></div>

                                          <div className="flex items-center gap-4">
                                              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">2</div>
                                              <div className="flex-1 bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/30 text-sm text-indigo-300 flex items-center gap-3">
                                                  <Search size={16}/> System finds "VPN_Manual.pdf"
                                              </div>
                                          </div>

                                          <div className="h-6 w-0.5 bg-slate-700 ml-4"></div>

                                          <div className="flex items-center gap-4">
                                              <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white font-bold">3</div>
                                              <div className="flex-1 bg-pink-900/20 p-3 rounded-lg border border-pink-500/30 text-sm text-pink-200">
                                                  AI reads PDF & answers: "Go to Settings &gt; Network..."
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* TAB 4: MCP - SIMPLIFIED */}
                  {activeTab === 'mcp' && (
                      <div className="space-y-12 animate-fade-in-up">
                          <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-900/40 p-8 md:p-12 rounded-3xl border border-white/5">
                               <div className="flex-1">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-6">
                                      The Universal Adapter
                                  </div>
                                  <h3 className="text-3xl font-bold text-white mb-6">MCP (Model Context Protocol)</h3>
                                  <p className="text-slate-300 text-xl leading-relaxed mb-6">
                                      Connecting AI to data used to be messy—like trying to plug a European plug into a US outlet. You needed custom code for everything.
                                  </p>
                                  <p className="text-slate-400 leading-relaxed mb-6">
                                      <strong>MCP is like a USB port.</strong> It's a standard socket. Now, any AI can plug into any app (Slack, Drive, GitHub) instantly without custom wiring.
                                  </p>
                              </div>
                              
                              {/* Simplified Diagram: Old vs New */}
                              <div className="w-full lg:w-1/2 flex flex-col gap-6">
                                  {/* The Old Way */}
                                  <div className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 opacity-60">
                                      <div className="text-xs text-red-400 font-bold uppercase mb-2">The Old Way (Messy)</div>
                                      <div className="flex justify-between items-center text-slate-600">
                                          <Brain size={24} />
                                          <div className="flex-1 mx-4 h-px bg-slate-700 relative">
                                              <div className="absolute inset-0 flex items-center justify-center">
                                                  <span className="bg-slate-900 px-2 text-[10px]">Custom Code Spaghetti</span>
                                              </div>
                                          </div>
                                          <Database size={24} />
                                      </div>
                                  </div>

                                  {/* The New Way (MCP) */}
                                  <div className="bg-slate-950 p-6 rounded-2xl border border-orange-500/30 shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                                      <div className="text-xs text-orange-400 font-bold uppercase mb-4">The MCP Way (Clean)</div>
                                      <div className="flex items-center justify-between">
                                          <div className="flex flex-col items-center gap-2">
                                              <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center text-white border border-slate-600">
                                                  <Brain size={24} />
                                              </div>
                                              <span className="text-xs font-bold text-slate-400">AI</span>
                                          </div>

                                          <div className="flex-1 h-1 bg-slate-700 mx-2 relative">
                                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                                                  <Plug size={10} /> MCP
                                              </div>
                                          </div>

                                          <div className="flex flex-col gap-2">
                                              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded border border-slate-700 text-xs text-slate-300">
                                                  <img src="https://cdn.simpleicons.org/slack/white" className="w-3 h-3 opacity-70" alt=""/> Slack
                                              </div>
                                              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded border border-slate-700 text-xs text-slate-300">
                                                  <img src="https://cdn.simpleicons.org/googledrive/white" className="w-3 h-3 opacity-70" alt=""/> Drive
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}

                  {/* TAB 5: AGENT */}
                  {activeTab === 'agent' && (
                      <div className="space-y-12 animate-fade-in-up">
                           <div className="flex flex-col lg:flex-row gap-12 items-center bg-slate-900/40 p-8 md:p-12 rounded-3xl border border-white/5">
                               <div className="flex-1">
                                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                                      The Autonomous Worker
                                  </div>
                                  <h3 className="text-3xl font-bold text-white mb-6">AI Agent</h3>
                                  <p className="text-slate-300 text-xl leading-relaxed mb-6">
                                      Standard AI just <span className="italic">talks</span>. An Agent can <span className="text-emerald-400 font-bold">do things</span>.
                                  </p>
                                  <p className="text-slate-400 leading-relaxed mb-6">
                                      Think of an Agent like a smart intern. If you say "Book a meeting", it doesn't just write a poem about meetings. It actually opens your Calendar, checks availability, and sends the invite.
                                  </p>
                              </div>
                              <div className="w-full lg:w-1/2">
                                  <div className="bg-slate-950 p-8 rounded-2xl border border-slate-800 flex flex-col items-center justify-center gap-6">
                                      <div className="text-center w-full">
                                          <div className="bg-slate-800 inline-block px-4 py-2 rounded-full text-xs text-white mb-2 shadow-lg">User: "Reset my password"</div>
                                          <div className="w-0.5 h-6 bg-slate-700 mx-auto"></div>
                                      </div>

                                      {/* The Agent Loop */}
                                      <div className="w-full bg-emerald-950/20 border border-emerald-500/30 rounded-xl p-4 relative overflow-hidden">
                                          <div className="flex justify-between items-center text-center relative z-10">
                                              <div className="flex flex-col items-center gap-1">
                                                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/50"><Brain size={18}/></div>
                                                  <span className="text-[10px] text-emerald-300 font-bold">1. PLAN</span>
                                              </div>
                                              <ArrowRight size={16} className="text-emerald-700"/>
                                              <div className="flex flex-col items-center gap-1">
                                                  <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(16,185,129,0.5)]"><Wrench size={18}/></div>
                                                  <span className="text-[10px] text-emerald-300 font-bold">2. ACT</span>
                                              </div>
                                              <ArrowRight size={16} className="text-emerald-700"/>
                                              <div className="flex flex-col items-center gap-1">
                                                  <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/50"><MessageSquare size={18}/></div>
                                                  <span className="text-[10px] text-emerald-300 font-bold">3. REPLY</span>
                                              </div>
                                          </div>
                                          <div className="mt-4 text-center">
                                              <div className="inline-block bg-black/40 text-emerald-400 text-[10px] font-mono px-2 py-1 rounded border border-emerald-500/20">
                                                  &gt; System.resetPassword(user_id)
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  )}
              </div>

              {/* Bottom Glossary (Quick Reference) */}
              <div className="mt-20 pt-12 border-t border-white/5">
                  <h3 className="text-slate-500 uppercase tracking-widest text-xs font-bold mb-6 text-center">Quick Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <GlossaryCard icon={Brain} title="LLM" analogy="The Brain" description="Smart but forgetful. Needs facts." />
                      <GlossaryCard icon={Binary} title="Embeddings" analogy="Translator" description="Turns words into numbers." />
                      <GlossaryCard icon={Library} title="RAG" analogy="Cheat Sheet" description="Look up answers first." />
                      <GlossaryCard icon={Plug} title="MCP" analogy="USB Adapter" description="Standard plug for data." />
                      <GlossaryCard icon={Bot} title="Agent" analogy="The Worker" description="Uses tools to do tasks." />
                  </div>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components for specific usage
const CheckCircle2Icon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
);
const XCircleIcon = ({className}: {className?: string}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
);
