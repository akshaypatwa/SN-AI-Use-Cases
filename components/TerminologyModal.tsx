import React from 'react';

interface TerminologyModalProps {
  onClose: () => void;
}

const modalContentHTML = `
    <header class="infographic-header animate-fade-in-down">
        <h2>Core GenAI Concepts</h2>
        <p>A high-level guide to the key components of modern AI systems.</p>
    </header>
    <div class="concept-grid animate-fade-in-up" style="animation-delay: 100ms;">
        <div class="concept-card">
            <i class="fas fa-brain"></i><h3>Large Language Model (LLM)</h3>
            <p>An AI model trained on vast amounts of text data to understand and generate human-like language. It's the core engine for tasks like summarization, translation, and answering general questions.</p>
        </div>
        <div class="concept-card">
            <i class="fas fa-file-import"></i><h3>Retrieval-Augmented Generation (RAG)</h3>
            <p>A technique that enhances an LLM by connecting it to a private knowledge base (like your company's documents). It retrieves relevant information first, then uses the LLM to generate an answer based on that specific context.</p>
        </div>
        <div class="concept-card">
            <i class="fas fa-robot"></i><h3>Agentic AI</h3>
            <p>An advanced AI system that can do more than just talk. It acts as an orchestrator that can understand a user's goal, create a plan, and use various "tools" (like RAG or APIs) to complete multi-step tasks autonomously.</p>
        </div>
        <div class="concept-card">
            <i class="fas fa-database"></i><h3>Vector Database</h3>
            <p>A specialized database designed to store and search for information based on its meaning and context, not just keywords. It's the core technology that makes the "retrieval" part of RAG fast and effective.</p>
        </div>
        <div class="concept-card">
            <i class="fas fa-server"></i><h3>Compute Infrastructure (MCP Servers)</h3>
            <p>The powerful, scalable server hardware required to run these demanding AI models. This foundational layer provides the processing power needed for training and real-time responses.</p>
        </div>
    </div>

    <header class="infographic-header animate-fade-in-up" style="margin-top: 4rem; margin-bottom: 2rem; animation-delay: 200ms;">
        <h2>How They Connect: A Visual Flow</h2>
    </header>
    <div class="tech-flow-diagram animate-fade-in-up" style="animation-delay: 300ms;">
        <div class="flow-node user-input"><i class="fas fa-user"></i><span>User Input</span></div>
        <div class="flow-arrow-down"></div>
        <div class="flow-node agentic-ai"><i class="fas fa-robot"></i><span>Agentic AI (The Orchestrator)</span><p>Decides which tool to use</p></div>
        <div class="flow-arrow-down"></div>
        <div class="tools-branch">
            <div class="branch-line-down"></div>
            <div class="branch-line-across"></div>
            <div class="tool-endpoints">
                <div class="endpoint">
                    <div class="branch-line-down-short"></div>
                    <div class="flow-node tool"><i class="fas fa-brain"></i><span>Tool: LLM</span><p>General Q&A</p></div>
                </div>
                <div class="endpoint">
                    <div class="branch-line-down-short"></div>
                    <div class="flow-node tool"><i class="fas fa-file-import"></i><span>Tool: RAG</span><p>Knowledge Q&A</p></div>
                    <div class="flow-arrow-down-small"></div>
                    <div class="flow-node-small"><i class="fas fa-database"></i><span>Uses Vector DB</span></div>
                </div>
                <div class="endpoint">
                    <div class="branch-line-down-short"></div>
                    <div class="flow-node tool"><i class="fas fa-plug"></i><span>Tool: API Call</span><p>Take Action</p></div>
                </div>
            </div>
        </div>
        <div class="flow-node foundation"><i class="fas fa-server"></i><span>Foundation: Compute Infrastructure (MCP Servers)</span></div>
    </div>
`;

const modalStyles = `
    .infographic-header { text-align: center; margin-bottom: 3rem; }
    .infographic-header h2 { font-size: 2.5rem; color: #fff; margin: 0 0 0.5rem 0; border: none; font-weight: bold; }
    .infographic-header p { font-size: 1.1rem; color: #9ca3af; max-width: 60ch; margin: 0 auto; }
    .concept-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 1.5rem; padding: 1rem 0; }
    .concept-card { background: rgba(36, 41, 51, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 1rem; }
    .concept-card i { font-size: 2.5rem; color: var(--accent-start); }
    .concept-card h3 { font-size: 1.5rem; font-weight: 600; color: #fff; margin: 0; }
    .concept-card p { font-size: 0.95rem; color: #9ca3af; line-height: 1.6; margin: 0; }
    .tech-flow-diagram { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; margin-top: 1rem; padding: 2rem; background: hsla(185, 100%, 50%, 0.03); border: 1px solid hsla(185, 100%, 50%, 0.1); border-radius: 12px; }
    .flow-node { background: rgba(36, 41, 51, 0.9); border: 1px solid hsla(185, 100%, 50%, 0.2); border-radius: 10px; padding: 1rem 1.5rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; min-width: 250px; z-index: 1; }
    .flow-node i { font-size: 1.5rem; }
    .flow-node span { font-weight: 600; color: #fff; }
    .flow-node p { font-size: 0.9rem; color: #9ca3af; margin: 0; }
    .flow-node.user-input { border-color: var(--accent-end); }
    .flow-node.user-input i { color: var(--accent-end); }
    .flow-node.agentic-ai { border-color: var(--accent-start); }
    .flow-node.agentic-ai i { color: var(--accent-start); }
    .flow-node.foundation { border-style: dashed; width: 80%; margin-top: 2rem; }
    .flow-arrow-down { font-size: 1.5rem; color: #9ca3af; padding: 0.5rem 0; }
    .flow-arrow-down::before { content: '\\2193'; }
    .tools-branch { position: relative; width: 100%; display: flex; justify-content: center; padding: 1rem 0; margin-top: 1rem; }
    .branch-line-down { width: 2px; height: 2rem; background: #9ca3af; position: absolute; top: 0; left: 50%; transform: translateX(-50%); }
    .branch-line-across { width: 80%; max-width: 600px; height: 2px; background: #9ca3af; position: absolute; top: 2rem; left: 50%; transform: translateX(-50%); }
    .tool-endpoints { display: flex; justify-content: space-around; width: 100%; margin-top: 2rem; gap: 1rem; flex-wrap: wrap; }
    .endpoint { position: relative; padding-top: 2rem; display: flex; flex-direction: column; align-items: center; }
    .branch-line-down-short { width: 2px; height: 2rem; background: #9ca3af; position: absolute; top: 0; left: 50%; transform: translateX(-50%); }
    .flow-node.tool { min-width: 180px; }
    .flow-arrow-down-small { font-size: 1.2rem; color: #9ca3af; }
    .flow-arrow-down-small::before { content: '\\2193'; }
    .flow-node-small { background: rgba(36, 41, 51, 0.8); border: 1px solid hsla(185, 100%, 50%, 0.1); border-radius: 8px; padding: 0.5rem 1rem; text-align: center; display: flex; align-items: center; gap: 0.5rem; }
    .flow-node-small i { font-size: 0.9rem; color: #9ca3af; }
    .flow-node-small span { font-size: 0.9rem; font-weight: 500; color: #e5e7eb; }
`;

export const TerminologyModal: React.FC<TerminologyModalProps> = ({ onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="glass-card rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-8 relative animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{modalStyles}</style>
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-4xl transition-colors z-10"
          aria-label="Close"
        >&times;</button>
        <div dangerouslySetInnerHTML={{ __html: modalContentHTML }} />
      </div>
    </div>
  );
};