
import React, { useState, useEffect, useRef } from 'react';
import { UseCase } from '../data';
import { PredictiveIntelligenceSim } from './PredictiveIntelligenceSim';
import ServiceNowInfographic from './ServiceNowInfographic';

declare const Chart: any;

interface UseCaseDetailProps {
  useCase: UseCase;
  onBack: () => void;
}

const detailStyles = `
.infographic-container { width: 100%; }
.infographic-header { text-align: center; margin-bottom: 3rem; }
.infographic-header h2 { font-size: 2.5rem; font-weight: bold; color: var(--text-primary); margin: 0 0 0.5rem 0; border: none; }
.infographic-header p { font-size: 1.1rem; color: var(--text-secondary); max-width: 60ch; margin: 0 auto; }
.infographic-section { background: var(--section-bg); border: 1px solid var(--section-border); border-radius: 12px; padding: 2rem; margin-bottom: 2rem; }
.infographic-section h3 { font-size: 1.8rem; color: var(--accent-start); margin-top: 0; margin-bottom: 1rem; font-weight: bold; }
.infographic-section h4 { font-size: 1.4rem; color: var(--text-primary); margin-top: 0; margin-bottom: 0; font-weight: bold; }
.section-subtitle { text-align: center; max-width: 80ch; margin: auto auto 2rem auto; color: var(--text-secondary); }
.infographic-section p { color: var(--text-secondary); line-height: 1.7; }
.grid-container { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start; }
@media (min-width: 1024px) {
    .grid-container { grid-template-columns: 1fr 1fr; }
    .grid-container.reverse .grid-item:first-child { order: 2; }
}
.grid-item { display: flex; flex-direction: column; gap: 1.5rem; }
.stat-highlight { background: var(--bg-color-base); border-radius: 8px; padding: 1.5rem; text-align: center; }
.stat-number { font-size: 3.5rem; font-weight: 600; color: var(--accent-start); display: block; }
.stat-label { color: var(--text-primary) !important; font-size: 1.1rem; }
.flow-diagram { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.flow-card { background-image: linear-gradient(145deg, var(--card-bg), hsla(170, 80%, 45%, 0.05)); border: 1px solid var(--section-border); border-radius: 8px; padding: 1rem; width: 100%; text-align: center; }
.flow-card.highlight { background-image: linear-gradient(145deg, hsla(170, 80%, 45%, 0.2), hsla(170, 80%, 45%, 0.1)); border-color: var(--accent-start); color: var(--text-primary); }
.flow-card span { font-weight: 600; }
.flow-card p { font-size: 0.9rem; color: var(--text-secondary) !important; margin-top: 0.25rem; }
.flow-card div { font-size: 2rem; }
.flow-arrow { color: var(--accent-start); font-size: 1.5rem; font-weight: bold; }
.chart-container { position: relative; width: 100%; height: 300px; margin-top: 1.5rem; }
.step-list .step-item { display: flex; align-items: center; gap: 1rem; background: var(--card-bg); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 1px solid var(--section-border); }
.step-list .step-item div { flex-shrink: 0; background: var(--accent-start); color: #111317; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.step-list .step-item p { margin: 0; }
.step-list .step-item p span { font-weight: 600; color: var(--text-primary); }
.journey-steps-container { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
@media (min-width: 1024px) { .journey-steps-container { flex-direction: row; align-items: flex-start; } }
.journey-step { text-align: center; max-width: 220px; }
.journey-step .icon-wrapper { width: 5rem; height: 5rem; border-radius: 50%; background-image: linear-gradient(145deg, var(--card-bg), hsla(170, 80%, 45%, 0.1)); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; border: 1px solid var(--section-border); font-size: 2rem; color: var(--accent-start); }
.journey-step h4 { margin: 0 0 0.5rem 0; color: var(--text-primary); }
.journey-step p { font-size: 0.9rem; line-height: 1.5; }
.journey-connector { display: none; }
@media (min-width: 1024px) { .journey-connector { display: block; flex-grow: 1; height: 2px; background: var(--section-border); margin-top: 2.5rem; } }
.benefits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.benefit-card { background: var(--card-bg); border: 1px solid var(--section-border); border-radius: 12px; padding: 1.5rem; text-align: center; transition: all 0.3s ease; }
.benefit-card:hover { transform: translateY(-5px); border-color: var(--accent-start); }
.benefit-card i { font-size: 2rem; color: var(--accent-start); margin-bottom: 1rem; }
.benefit-card h4 { color: var(--text-primary); margin: 0 0 0.5rem 0; }
.benefit-card p { font-size: 0.9rem; }
.tab-container { width: 100%; }
.tab-buttons { display: flex; gap: 0.5rem; border-bottom: 1px solid var(--section-border); margin-bottom: 1.5rem; }
.tab-btn { padding: 0.75rem 1.5rem; cursor: pointer; background: none; border: none; color: var(--text-secondary); font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 500; border-bottom: 3px solid transparent; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.75rem; }
.tab-btn:hover { color: var(--text-primary); background-color: var(--section-bg); }
.tab-btn.active { color: var(--accent-start); border-bottom-color: var(--accent-start); }
.tab-content { display: none; flex-direction: column; gap: 1rem; animation: fadeIn 0.4s ease; }
.tab-content.active { display: flex; }
.example-card { display: flex; align-items: flex-start; gap: 1.5rem; background: var(--card-bg); padding: 1.5rem; border-radius: 12px; border-left: 3px solid var(--accent-start); border-top: 1px solid var(--section-border); border-right: 1px solid var(--section-border); border-bottom: 1px solid var(--section-border); }
.example-icon { font-size: 1.5rem; color: var(--accent-start); flex-shrink: 0; width: 2rem; text-align: center; margin-top: 0.25rem; }
.example-card h4 { color: var(--text-primary); margin: 0 0 0.5rem 0; }
.example-card p { margin: 0; font-size: 0.95rem; }
`;

const ContentTile: React.FC<{ icon: string; title: string; description: string; onClick: () => void; delay: number; }> = ({ icon, title, description, onClick, delay }) => {
    return (
        <div 
            onClick={onClick} 
            className="showcase-card rounded-2xl cursor-pointer h-full group animate-fade-in-up opacity-0"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="relative z-10 p-6 flex flex-col h-full bg-[var(--card-bg)] rounded-[calc(1rem-1px)]">
                <div className="mb-4"><i className={`fas ${icon} fa-2x`} style={{color: 'var(--accent-start)'}}></i></div>
                <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">{title}</h2>
                <p className="text-[var(--text-secondary)] flex-grow">{description}</p>
                 <div className="mt-4 text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center">
                    Open Fullscreen <i className="fas fa-expand ml-2"></i>
                </div>
            </div>
        </div>
    );
};


export const UseCaseDetail: React.FC<UseCaseDetailProps> = ({ useCase, onBack }) => {
  const [modalHtml, setModalHtml] = useState<string | null>(null);
  const [showSim, setShowSim] = useState(false);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const openModal = (html: string) => setModalHtml(html);
  const closeModal = () => setModalHtml(null);

  const initializeCharts = () => {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.borderColor = 'hsla(170, 80%, 45%, 0.1)';

    const timeToResolveCtx = document.getElementById('timeToResolveChart') as HTMLCanvasElement;
    if (timeToResolveCtx) {
      new Chart(timeToResolveCtx.getContext('2d')!, {
        type: 'bar',
        data: {
          labels: ['Manual Analysis', 'AI-Assisted Linking'],
          datasets: [{
            label: 'Time to Identify Root Cause (Hours)',
            data: [8.5, 1.2],
            backgroundColor: ['hsla(80, 70%, 55%, 0.6)', 'hsla(170, 80%, 45%, 0.6)'],
            borderColor: ['hsl(80, 70%, 55%)', 'hsl(170, 80%, 45%)'],
            borderWidth: 1
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, title: { display: true, text: 'Hours' } } }, plugins: { legend: { display: false } } }
      });
    }

    const recurringIncidentsCtx = document.getElementById('recurringIncidentsChart') as HTMLCanvasElement;
    if (recurringIncidentsCtx) {
      new Chart(recurringIncidentsCtx.getContext('2d')!, {
        type: 'line',
        data: {
          labels: ['Q1', 'Q2 (AI Deployed)', 'Q3', 'Q4', 'Next Q1', 'Next Q2'],
          datasets: [{
            label: 'Recurring Incident Volume',
            data: [120, 110, 75, 50, 42, 35],
            fill: true,
            backgroundColor: 'hsla(170, 80%, 45%, 0.2)',
            borderColor: 'hsl(170, 80%, 45%)',
            tension: 0.3
          }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, position: 'bottom' } }, scales: { y: { beginAtZero: true, title: { display: true, text: 'Number of Incidents' } } } }
      });
    }
  };

  const setupTabs = () => {
    if (!modalBodyRef.current) return;
    const tabButtons = modalBodyRef.current.querySelectorAll('.tab-btn');
    const tabContents = modalBodyRef.current.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetId = (button as HTMLElement).dataset.target;
        if (!targetId) return;

        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        button.classList.add('active');
        modalBodyRef.current?.querySelector(`#${targetId}`)?.classList.add('active');
      });
    });
  };

  useEffect(() => {
    if (modalHtml) {
      // Use a timeout to ensure the DOM is painted before trying to find the canvas elements
      const timer = setTimeout(() => {
        initializeCharts();
        setupTabs();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [modalHtml]);
  
  // This effect ensures that the logic in UseCase 2 infographicHTML works correctly
  useEffect(() => {
    const allHtml = useCase.infographicHTML + useCase.architectureHTML + (useCase.solutionFlowHTML || '');
    if (!allHtml.includes('tab-btn')) return;
    
    // When the component mounts, if the infographic contains tabs, we need to ensure
    // the modal is opened by default to run the tab setup logic.
    // This is a bit of a workaround for the static HTML content.
    if (!modalHtml && allHtml.includes('tab-container')) {
      // openModal(useCase.infographicHTML);
    }
  }, [useCase, modalHtml]);

  if (showSim) {
      if (useCase.id === 101) {
          return <ServiceNowInfographic onBack={() => setShowSim(false)} />;
      }
      return <PredictiveIntelligenceSim onBack={() => setShowSim(false)} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center my-12 relative animate-fade-in-down">
            <div className="absolute top-0 left-0">
                <button onClick={onBack} className="glass-card font-semibold rounded-lg px-6 py-3 transition-all duration-300 hover:border-[var(--accent-start)]/50 hover:text-[var(--text-primary)] pressable"><i className="fas fa-arrow-left mr-2"></i> Back to Showcase</button>
            </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] pt-20">SOLUTION</h1>
          <p className="text-lg text-[var(--text-secondary)] mt-2 max-w-3xl mx-auto">{useCase.title}</p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
             <ContentTile 
                icon="fa-project-diagram"
                title="Solution and Flow"
                description="Detailed breakdown of the solution steps, logic, and decision flow."
                onClick={() => setShowSim(true)}
                delay={100}
            />
            <ContentTile 
                icon="fa-chart-pie"
                title="View Infographic"
                description="Explore the phased rollout, benefits, and key performance indicators in a visual format."
                onClick={() => openModal(useCase.infographicHTML)}
                delay={200}
            />
             <ContentTile 
                icon="fa-sitemap"
                title="View Architecture"
                description="Understand the technical implementation, data flows, and system integrations."
                onClick={() => openModal(useCase.architectureHTML)}
                delay={300}
            />
        </main>

        {modalHtml && (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={closeModal}>
                <div className="relative glass-card rounded-2xl w-full max-w-6xl h-[95vh] animate-scale-in" onClick={e => e.stopPropagation()}>
                    <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-white text-4xl z-10">&times;</button>
                    <div ref={modalBodyRef} className="h-full overflow-y-auto p-8" dangerouslySetInnerHTML={{ __html: modalHtml }} />
                </div>
            </div>
        )}
      </div>
      <style>{detailStyles}</style>
    </div>
  );
};
