import React, { useState } from 'react';

interface EditPanelProps {
  onSaveView: (name: string) => void;
  onLoadView: (name: string) => void;
  onDeleteView: (name: string) => void;
  onResetView: () => void;
  onExit: () => void;
  onChangeHeight: (amount: number) => void;
  savedViews: string[];
}

export const EditPanel: React.FC<EditPanelProps> = ({
  onSaveView,
  onLoadView,
  onDeleteView,
  onResetView,
  onExit,
  onChangeHeight,
  savedViews,
}) => {
  const [viewName, setViewName] = useState('');
  const [selectedView, setSelectedView] = useState('');

  const handleSave = () => {
    if (!viewName) {
      alert('Please enter a name for the view.');
      return;
    }
    onSaveView(viewName);
    setViewName('');
  };
  
  const handleLoad = () => {
    if(!selectedView) {
      alert('Please select a view to load.');
      return;
    }
    onLoadView(selectedView);
  }
  
  const handleDelete = () => {
    if(!selectedView) {
      alert('Please select a view to delete.');
      return;
    }
    if(confirm(`Are you sure you want to delete the view "${selectedView}"?`)) {
        onDeleteView(selectedView);
        setSelectedView('');
    }
  }

  const buttonBaseStyle = "pressable font-bold py-2 px-4 rounded-lg transition-all duration-300 flex-shrink-0 flex items-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed";
  const inputBaseStyle = "bg-black/30 text-white rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 border border-white/10 transition-all duration-300";

  return (
    <div className="glass-card p-6 rounded-2xl mb-12 shadow-2xl animate-fade-in-down">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center"><i className="fas fa-pencil-alt mr-3 icon-gradient"></i> Edit Mode</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
        {/* Save View */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            id="view-name-input"
            placeholder="Enter new view name..."
            value={viewName}
            onChange={(e) => setViewName(e.target.value)}
            className={`${inputBaseStyle} focus:ring-[var(--accent-start)]`}
          />
          <button onClick={handleSave} title="Save current view" className={`${buttonBaseStyle} btn-accent`}><i className="fas fa-save"></i></button>
        </div>
        
        {/* Load/Delete View */}
        <div className="flex items-center space-x-2">
          <select 
            id="saved-views-select"
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className={`${inputBaseStyle} focus:ring-[var(--accent-end)]`}
          >
            <option value="">Load a saved view...</option>
            {savedViews.map(name => <option key={name} value={name}>{name}</option>)}
          </select>
          <button onClick={handleLoad} disabled={!selectedView} title="Load the selected view" className={`${buttonBaseStyle} bg-blue-600 hover:bg-blue-500 text-white`}><i className="fas fa-download"></i></button>
          <button onClick={handleDelete} disabled={!selectedView} title="Delete the selected view" className={`${buttonBaseStyle} bg-red-600 hover:bg-red-500 text-white`}><i className="fas fa-trash"></i></button>
        </div>
        
        {/* Card Height */}
        <div className="flex items-center justify-center space-x-4">
            <span className="text-white font-semibold">Card Height:</span>
            <button onClick={() => onChangeHeight(-20)} className={`${buttonBaseStyle} bg-slate-700 hover:bg-slate-600 text-white font-bold w-10 h-10 rounded-full transition-colors`} title="Decrease card height">-</button>
            <button onClick={() => onChangeHeight(20)} className={`${buttonBaseStyle} bg-slate-700 hover:bg-slate-600 text-white font-bold w-10 h-10 rounded-full transition-colors`} title="Increase card height">+</button>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-between items-center gap-4">
        <button onClick={onResetView} title="Reset all tiles to their default content" className={`${buttonBaseStyle} bg-amber-600 hover:bg-amber-500 text-white`}><i className="fas fa-undo"></i> Reset to Default</button>
        <button onClick={onExit} className={`${buttonBaseStyle} bg-slate-600 hover:bg-slate-500 text-white`}>Exit Edit Mode <i className="fas fa-times"></i></button>
      </div>
    </div>
  );
};