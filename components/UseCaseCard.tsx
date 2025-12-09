
import React, { useRef } from 'react';
import { UseCase } from '../data';

interface UseCaseCardProps {
  useCase: UseCase;
  isEditMode: boolean;
  updateUseCase: (id: number, field: 'title' | 'description', value: string) => void;
  onSelect: (useCase: UseCase) => void;
  cardHeight: number;
  isDisabled?: boolean;
}

export const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, isEditMode, updateUseCase, onSelect, cardHeight, isDisabled }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleBlur = (field: 'title' | 'description', e: React.FocusEvent<HTMLHeadingElement | HTMLParagraphElement>) => {
    updateUseCase(useCase.id, field, e.currentTarget.innerText);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Removed the disabled check to allow clicking
    if (isEditMode && (e.target as HTMLElement).isContentEditable) {
      return;
    }
    onSelect(useCase);
  }
  
  const editStyle: React.CSSProperties = isEditMode && !isDisabled ? {
      cursor: 'text',
      outline: 'none',
      borderRadius: '4px',
      padding: '0.25rem',
      animation: 'pulse-glow 2s infinite ease-in-out'
  } : {};

<<<<<<< HEAD
  const isEditable = isEditMode && !isDisabled;

  // Extracted content to reuse in both enabled and disabled states
  const CardContent = (
    <>
      <i className={`card-bg-icon fas ${useCase.icon}`}></i>
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Only show the regular tag if NOT disabled */}
        {!isDisabled && useCase.tag && (
          <div className="absolute top-4 right-4 tag-accent px-3 py-1 text-xs font-bold rounded-full border z-10">
            {useCase.tag}
          </div>
        )}
        
        <div className="mb-4 pt-4">
          <i className={`fas ${useCase.icon} fa-2x text-emerald-400`}></i>
        </div>
        <h3
          className="text-xl font-bold text-[var(--text-primary)] mb-2"
          contentEditable={isEditable}
          onBlur={(e) => handleBlur('title', e)}
          suppressContentEditableWarning={true}
          style={editStyle}
        >
          {useCase.title}
        </h3>
        <p
          className="text-[var(--text-secondary)] text-base leading-relaxed flex-grow"
          contentEditable={isEditable}
          onBlur={(e) => handleBlur('description', e)}
          suppressContentEditableWarning={true}
          style={editStyle}
        >
          {useCase.description}
        </p>
         {!isEditMode && (
          <div className="mt-4 text-sm font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300 flex items-center">
            Learn More <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </div>
        )}
      </div>
    </>
  );

  // If Disabled: Render a wrapper to allow the "Coming Soon" tag to be colored (not grayscale)
  if (isDisabled) {
    return (
      <div 
        className="relative h-full cursor-pointer group" 
        style={{ minHeight: `${cardHeight}px` }}
        onClick={handleClick}
      >
        {/* The Card Background (Grayscale) */}
        <div className="showcase-card h-full grayscale brightness-90 select-none flex flex-col relative overflow-hidden transition-transform duration-300 group-hover:translate-y-[-5px]">
           {CardContent}
        </div>
        
        {/* The Colored Overlay Tag */}
        <div className="absolute top-5 right-5 z-20 pointer-events-none">
            <span className="flex items-center gap-2 bg-slate-950/90 border border-emerald-500/40 text-emerald-400 px-4 py-1.5 text-xs font-bold tracking-wide rounded-full shadow-[0_0_15px_rgba(16,185,129,0.15)] backdrop-blur-md">
                <i className="fas fa-clock text-[10px]"></i> Coming Soon
            </span>
        </div>
      </div>
    );
  }

  // If Enabled: Render standard interactive card
  return (
    <div 
      ref={cardRef}
      onClick={handleClick}
      className={`showcase-card group ${!isEditMode && 'cursor-pointer'}`}
      style={{ minHeight: `${cardHeight}px` }}
    >
      {CardContent}
    </div>
  );
};
