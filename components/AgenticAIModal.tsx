
import React from 'react';
import { Bot, Brain, Database, Wrench, ArrowRight, CheckCircle2, RefreshCw, X } from 'lucide-react';

interface AgenticAIModalProps {
  onClose: () => void;
}

export const AgenticAIModal: React.FC<AgenticAIModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="
            bg-[#0f172a] w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl border border-emerald-500/20 shadow-2xl 
            relative animate-scale-in flex flex-col
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 border-b border-white/5 bg-gradient-to-r from-emerald-950/30 to-slate-900 flex justify-between items-start">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400">
                        <Bot size={24} />
                    </div>
                    <h2 className="text-3xl font-bold text-white">Agentic AI Workflows</h2>
                </div>
                <p className="text-slate-400 max-w-2xl">
                    Unlike standard chatbots that just "predict text", Agentic AI creates a plan, uses tools, and iterates to solve complex problems autonomously.
                </p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                <X size={24} />
            </button>
        </div>

        {/* Body */}
        <div className="p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-5">
            
            {/* Infographic Container */}
            <div className="relative py-12 px-4 max-w-4xl mx-auto">
                
                {/* Connecting Lines (Background) */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-700 to-transparent -translate-y-1/2 z-0 hidden lg:block" />
                
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
                    
                    {/* Step 1: Perception */}
                    <div className="group relative">
                        <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:border-emerald-400 hover:shadow-emerald-500/20 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-blue-400 ring-4 ring-blue-500/10">
                                <Brain size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">1. Perception</h3>
                            <p className="text-sm text-slate-400">The agent analyzes the user's goal (e.g., "Fix the VPN issue") and breaks it down into required sub-tasks.</p>
                        </div>
                        <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-slate-600">
                            <ArrowRight size={24} />
                        </div>
                    </div>

                    {/* Step 2: Planning */}
                    <div className="group relative">
                        <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:border-purple-400 hover:shadow-purple-500/20 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 text-purple-400 ring-4 ring-purple-500/10">
                                <Database size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">2. Reasoning</h3>
                            <p className="text-sm text-slate-400">It checks its memory (Vector DB) for similar past incidents and formulates a multi-step execution plan.</p>
                        </div>
                         <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-slate-600">
                            <ArrowRight size={24} />
                        </div>
                    </div>

                    {/* Step 3: Tool Use */}
                    <div className="group relative">
                        <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:border-orange-400 hover:shadow-orange-500/20 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 text-orange-400 ring-4 ring-orange-500/10">
                                <Wrench size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">3. Action</h3>
                            <p className="text-sm text-slate-400">It calls external APIs (ServiceNow, Okta, Active Directory) to fetch data or perform changes.</p>
                        </div>
                         <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 text-slate-600">
                            <ArrowRight size={24} />
                        </div>
                    </div>

                    {/* Step 4: Verification */}
                    <div className="group relative">
                        <div className="bg-[#1e293b] border border-slate-700 p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:border-emerald-400 hover:shadow-emerald-500/20 h-full flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4 text-emerald-400 ring-4 ring-emerald-500/10">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">4. Result</h3>
                            <p className="text-sm text-slate-400">The agent verifies if the action succeeded. If not, it loops back to replan. If yes, it responds to the user.</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Example Section */}
            <div className="mt-12 bg-slate-900/50 border border-white/5 rounded-2xl p-6 md:p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <RefreshCw className="text-emerald-400" /> Real-World Example: "My Account is Locked"
                </h3>
                <div className="space-y-4 font-mono text-sm">
                    <div className="flex gap-4">
                        <div className="min-w-[100px] text-blue-400 font-bold text-right">User:</div>
                        <div className="text-slate-300">"I can't log in to Salesforce."</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="min-w-[100px] text-emerald-400 font-bold text-right">Agent (Think):</div>
                        <div className="text-slate-400 italic">User is reporting a login issue. I should check their account status first.</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="min-w-[100px] text-orange-400 font-bold text-right">Tool:</div>
                        <div className="text-orange-200 bg-orange-950/30 px-2 rounded border border-orange-500/20">Call ActiveDirectory.getUserStatus(user_id)</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="min-w-[100px] text-purple-400 font-bold text-right">Observation:</div>
                        <div className="text-slate-400">Status: "Locked (Too many attempts)"</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="min-w-[100px] text-emerald-400 font-bold text-right">Agent (Plan):</div>
                        <div className="text-slate-400 italic">Account is locked. I need to verify identity before unlocking.</div>
                    </div>
                    <div className="flex gap-4">
                        <div className="min-w-[100px] text-emerald-400 font-bold text-right">Agent (Act):</div>
                        <div className="text-slate-300">"It looks like your account is locked. I've sent a 2FA push to your phone. Please approve it so I can unlock your account."</div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
