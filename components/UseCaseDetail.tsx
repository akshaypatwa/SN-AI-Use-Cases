import React, { useState, useEffect, useRef } from 'react';
import { UseCase } from '../data';

declare const Chart: any;

interface UseCaseDetailProps {
  useCase: UseCase;
  onBack: () => void;
}

const detailStyles = `
.infographic-header h2 { color: #f1f5f9; }
.infographic-header p { color: #94a3b8; }
.infographic-section { background: rgba(16, 185, 129, 0.05); border: 1px solid rgba(16, 185, 129, 0.2); }
.infographic-section h3 { color: #34d399; }
.infographic-section h4 { color: #f1f5f9; }
.section-subtitle { color: #94a3b8; }
.infographic-section p { color: #94a3b8; }
.stat-highlight { background: #0f172a; }
.stat-number { color: #34d399; }
.stat-label { color: #f1f5f9 !important; }
.flow-card { background-image: linear-gradient(145deg, #0f172a, rgba(16, 185, 129, 0.05)); border: 1px solid rgba(16, 185, 129, 0.2); }
.flow-card.highlight { background-image: linear-gradient(145deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1)); border-color: #34d399; color: #f1f5f9; }
.flow-card p { color: #94a3b8 !important; }
.flow-arrow { color: #34d399; }
.step-list .step-item { background: #0f172a; }
.step-list .step-item div { background: #34d399; color: #020617; }
.step-list .step-item p span { color: #f1f5f9; }
.journey-step .icon-wrapper { background-image: linear-gradient(145deg, #0f172a, rgba(16, 185, 129, 0.1)); border: 1px solid rgba(16, 185, 129, 0.2); color: #34d399; }
.journey-step h4 { color: #f1f5f9; }
.journey-connector { background: rgba(16, 185, 129, 0.2); }
.benefits-grid { }
.benefit-card { background: #0f172a; border: 1px solid rgba(16, 185, 129, 0.2); }
.benefit-card:hover { border-color: #34d399; }
.benefit-card i { color: #34d399; }
.benefit-card h4 { color: #f1f5f9; }
.tab-buttons { border-bottom: 1px solid rgba(16, 185, 129, 0.2); }
.tab-btn { color: #94a3b8; }
.tab-btn:hover { color: #f1f5f9; background-color: rgba(16, 185, 129, 0.05); }
.tab-btn.active { color: #34d399; border-bottom-color: #34d399; }
.example-card { background: #0f172a; border-left: 3px solid #34d399; }
.example-icon { color: #34d399; }
.example-card h4 { color: #f1f5f9; }

/* Keeping the rest of the styles for layout */
:root { 
    --accent-start: #34d399;
    --accent-end: #10b981;
}
.infographic-container { width: 100%; }
.infographic-header { text-align: center; margin-bottom: 3rem; }
.infographic-header h2 { font-size: 2.5rem; font-weight: bold; margin: 0 0 0.5rem 0; border: none; }
.infographic-header p { font-size: 1.1rem; max-width: 60ch; margin: 0 auto; }
.infographic-section { border-radius: 12px; padding: 2rem; margin-bottom: 2rem; }
.infographic-section h3 { font-size: 1.8rem; margin-top: 0; margin-bottom: 1rem; font-weight: bold; }
.infographic-section h4 { font-size: 1.4rem; margin-top: 0; margin-bottom: 0; font-weight: bold; }
.section-subtitle { text-align: center; max-width: 80ch; margin: auto auto 2rem auto; }
.infographic-section p { line-height: 1.7; }
.grid-container { display: grid; grid-template-columns: 1fr; gap: 3rem; align-items: start; }
@media (min-width: 1024px) {
    .grid-container { grid-template-columns: 1fr 1fr; }
    .grid-container.reverse .grid-item:first-child { order: 2; }
}
.grid-item { display: flex; flex-direction: column; gap: 1.5rem; }
.stat-highlight { border-radius: 8px; padding: 1.5rem; text-align: center; }
.stat-number { font-size: 3.5rem; font-weight: 600; display: block; }
.stat-label { font-size: 1.1rem; }
.flow-diagram { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.flow-card { border-radius: 8px; padding: 1rem; width: 100%; text-align: center; }
.flow-card span { font-weight: 600; }
.flow-card p { font-size: 0.9rem; margin-top: 0.25rem; }
.flow-card div { font-size: 2rem; }
.flow-arrow { font-size: 1.5rem; font-weight: bold; }
.chart-container { position: relative; width: 100%; height: 300px; margin-top: 1.5rem; }
.step-list .step-item { display: flex; align-items: center; gap: 1rem; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
.step-list .step-item div { flex-shrink: 0; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.step-list .step-item p { margin: 0; }
.step-list .step-item p span { font-weight: 600; }
.journey-steps-container { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
@media (min-width: 1024px) { .journey-steps-container { flex-direction: row; align-items: flex-start; } }
.journey-step { text-align: center; max-width: 220px; }
.journey-step .icon-wrapper { width: 5rem; height: 5rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; font-size: 2rem; }
.journey-step h4 { margin: 0 0 0.5rem 0; }
.journey-step p { font-size: 0.9rem; line-height: 1.5; }
.journey-connector { display: none; }
@media (min-width: 1024px) { .journey-connector { display: block; flex-grow: 1; height: 2px; margin-top: 2.5rem; } }
.benefits-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.benefit-card { border-radius: 12px; padding: 1.5rem; text-align: center; transition: all 0.3s ease; }
.benefit-card:hover { transform: translateY(-5px); }
.benefit-card i { font-size: 2rem; margin-bottom: 1rem; }
.benefit-card h4 { margin: 0 0 0.5rem 0; }
.benefit-card p { font-size: 0.9rem; }
.tab-container { width: 100%; }
.tab-buttons { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
.tab-btn { padding: 0.75rem 1.5rem; cursor: pointer; background: none; border: none; font-family: 'Poppins', sans-serif; font-size: 1rem; font-weight: 500; border-bottom: 3px solid transparent; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.75rem; }
.tab-content { display: none; flex-direction: column; gap: 1rem; animation: fadeIn 0.4s ease; }
.tab-content.active { display: flex; }
.example-card { display: flex; align-items: flex-start; gap: 1.5rem; padding: 1.5rem; border-radius: 12px; }
.example-icon { font-size: 1.5rem; flex-shrink: 0; width: 2rem; text-align: center; margin-top: 0.25rem; }
.example-card h4 { margin: 0 0 0.5rem 0; }
.example-card p { margin: 0; font-size: 0.95rem; }
`;

const ContentTile: React.FC<{ icon: string; title: string; description: string; onClick: () => void; delay: number; }> = ({ icon, title, description, onClick, delay }) => {
    return (
        <div 
            onClick={onClick} 
            className="rounded-lg border border-emerald-500/20 bg-slate-900/60 p-6 shadow-lg backdrop-filter backdrop-blur-lg cursor-pointer h-full group animate-fade-in-up opacity-0 transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="relative z-10 flex flex-col h-full">
                <div className="mb-4"><i className={`fas ${icon} fa-2x text-emerald-400`}></i></div>
                <h2 className="text-xl font-bold text-slate-100 mb-2">{title}</h2>
                <p className="text-slate-400 flex-grow">{description}</p>
                 <div className="mt-4 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 flex items-center">
                    Open Fullscreen <i className="fas fa-expand ml-2"></i>
                </div>
            </div>
        </div>
    );
};


export const UseCaseDetail: React.FC<UseCaseDetailProps> = ({ useCase, onBack }) => {
  const [modalHtml, setModalHtml] = useState<string | null>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);

  const openModal = (html: string) => setModalHtml(html);
  const closeModal = () => setModalHtml(null);

  const initializeCharts = () => {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color = '#9ca3af';
    Chart.defaults.borderColor = 'hsla(185, 100%, 50%, 0.1)';

    const timeToResolveCtx = document.getElementById('timeToResolveChart') as HTMLCanvasElement;
    if (timeToResolveCtx) {
      new Chart(timeToResolveCtx.getContext('2d')!, {
        type: 'bar',
        data: {
          labels: ['Manual Analysis', 'AI-Assisted Linking'],
          datasets: [{
            label: 'Time to Identify Root Cause (Hours)',
            data: [8.5, 1.2],
            backgroundColor: ['hsla(260, 100%, 70%, 0.5)', 'hsla(185, 100%, 50%, 0.6)'],
            borderColor: ['hsl(260, 100%, 70%)', 'hsl(185, 100%, 50%)'],
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
            backgroundColor: 'hsla(185, 100%, 50%, 0.2)',
            borderColor: 'hsl(185, 100%, 50%)',
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
    const allHtml = useCase.infographicHTML + useCase.architectureHTML;
    if (!allHtml.includes('tab-btn')) return;
    
    // When the component mounts, if the infographic contains tabs, we need to ensure
    // the modal is opened by default to run the tab setup logic.
    // This is a bit of a workaround for the static HTML content.
    if (!modalHtml && allHtml.includes('tab-container')) {
      // openModal(useCase.infographicHTML);
    }
  }, [useCase, modalHtml])

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 animate-fade-in">
      <div className="container mx-auto max-w-7xl">
        <header className="text-center my-12 relative animate-fade-in-down">
            <div className="absolute top-0 left-0">
                <button onClick={onBack} className="bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-lg px-6 py-3 transition-all duration-300 border border-slate-700 hover:border-emerald-500/50"><i className="fas fa-arrow-left mr-2"></i> Back to Showcase</button>
            </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-100 pt-20">SOLUTION</h1>
          <p className="text-lg text-slate-400 mt-2 max-w-3xl mx-auto">{useCase.title}</p>
        </header>
        
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ContentTile 
                icon="fa-chart-pie"
                title="View Infographic"
                description="Explore the phased rollout, benefits, and key performance indicators in a visual format."
                onClick={() => openModal(useCase.infographicHTML)}
                delay={100}
            />
             <ContentTile 
                icon="fa-sitemap"
                title="View Architecture"
                description="Understand the technical implementation, data flows, and system integrations."
                onClick={() => openModal(useCase.architectureHTML)}
                delay={200}
            />
        </main>

        {modalHtml && (
            <div className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={closeModal}>
                <div className="relative rounded-lg border border-emerald-500/20 bg-slate-900/80 shadow-lg backdrop-filter backdrop-blur-lg w-full max-w-6xl h-[95vh] animate-scale-in" onClick={e => e.stopPropagation()}>
                    <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 text-4xl z-10">&times;</button>
                    <div ref={modalBodyRef} className="h-full overflow-y-auto p-8" dangerouslySetInnerHTML={{ __html: modalHtml }} />
                </div>
            </div>
        )}
      </div>
      <style>{detailStyles.replace(/--glow-color/g, '--accent-start')}</style>
    </div>
  );
};