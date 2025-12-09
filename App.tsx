
import React, { useState, useEffect } from 'react';
import { initialUseCases, UseCase } from './data';
import { UseCaseCard } from './components/UseCaseCard';
import { EditPanel } from './components/EditPanel';
import { TerminologyModal } from './components/TerminologyModal';
import { UseCaseDetail } from './components/UseCaseDetail';
import { Background } from './components/Background';

const App: React.FC = () => {
  const [useCases, setUseCases] = useState<UseCase[]>(initialUseCases);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedViews, setSavedViews] = useState<Record<string, UseCase[]>>({});
  const [cardHeight, setCardHeight] = useState(320); // initial height in px
  const [selectedUseCase, setSelectedUseCase] = useState<UseCase | null>(null);

  useEffect(() => {
    try {
      const viewsFromStorage = localStorage.getItem('serviceNowViews');
      if (viewsFromStorage) {
        setSavedViews(JSON.parse(viewsFromStorage));
      }
    } catch (error) {
      console.error("Failed to load views from localStorage", error);
    }
  }, []);

  const updateUseCase = (id: number, field: 'title' | 'description', value: string) => {
    setUseCases(currentUseCases => 
      currentUseCases.map(uc => 
        uc.id === id ? { ...uc, [field]: value } : uc
      )
    );
  };
  
  const saveView = (name: string) => {
    const newSavedViews = { ...savedViews, [name]: useCases };
    setSavedViews(newSavedViews);
    localStorage.setItem('serviceNowViews', JSON.stringify(newSavedViews));
    alert(`View "${name}" saved!`);
  };

  const loadView = (name: string) => {
    if (savedViews[name]) {
      setUseCases(savedViews[name]);
      alert(`View "${name}" loaded!`);
    }
  };

  const deleteView = (name: string) => {
    const { [name]: _, ...remainingViews } = savedViews;
    setSavedViews(remainingViews);
    localStorage.setItem('serviceNowViews', JSON.stringify(remainingViews));
    alert(`View "${name}" deleted!`);
  };
  
  const resetView = () => {
    if(confirm('Are you sure you want to reset all tiles to their default content?')) {
        setUseCases(initialUseCases);
    }
  };

  const handleCardSelect = (useCase: UseCase) => {
    if (!isEditMode) {
      setSelectedUseCase(useCase);
    }
  };

  const handleBackToGrid = () => {
    setSelectedUseCase(null);
  };

  if (selectedUseCase) {
    return <UseCaseDetail useCase={selectedUseCase} onBack={handleBackToGrid} />;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 relative">
      <div className="container mx-auto max-w-7xl relative z-10">
        <header className="page-header text-center my-4 relative animate-fade-in-down">
            <div className="edit-page-button-container">
                {!isEditMode && (
                  <button 
                    onClick={() => setIsEditMode(true)} 
                    className="text-[var(--text-secondary)] hover:text-[var(--accent-start)] transition-colors text-sm font-semibold group p-2 rounded-md hover:bg-white/10"
                    title="Edit Page"
                  >
                    <i className="fas fa-pencil-alt mr-1 opacity-70 group-hover:opacity-100 transition-opacity"></i>
                    Edit Page
                  </button>
                )}
            </div>

            <h1 className="header-title">
                ServiceNow Use Cases
            </h1>
            <p className="header-subtitle">
                Explore powerful capabilities of the <span>ServiceNow platform.</span>
            </p>
        </header>
        
        {isEditMode && (
          <EditPanel 
            onSaveView={saveView}
            onLoadView={loadView}
            onDeleteView={deleteView}
            onResetView={resetView}
            onExit={() => setIsEditMode(false)}
            onChangeHeight={(amount) => setCardHeight(h => Math.max(200, h + amount))}
            savedViews={Object.keys(savedViews)}
          />
        )}

        <main id="use-case-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <div key={useCase.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up opacity-0">
                <UseCaseCard
                useCase={useCase}
                isEditMode={isEditMode}
                updateUseCase={updateUseCase}
                onSelect={handleCardSelect}
                cardHeight={cardHeight}
                isDisabled={index > 2}
                />
            </div>
          ))}
        </main>
        
        <section className="mt-28 mb-12 text-center">
            <div className="glowing-circle-container pressable">
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="demystify-button group relative inline-flex items-center justify-center gap-3 rounded-full bg-[var(--bg-color-base)] px-8 py-4 text-lg font-medium text-[var(--text-primary)] transition-colors"
                >
                    <i className="fas fa-brain text-xl icon-gradient"></i>
                    Demystify GenAI
                </button>
            </div>
        </section>
        
        {isModalOpen && <TerminologyModal onClose={() => setIsModalOpen(false)} />}
        
        <footer className="text-center mt-24 py-6 border-t border-emerald-500/20">
          <p className="text-slate-400">&copy; 2025 ServiceNow Use Case Showcase</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
