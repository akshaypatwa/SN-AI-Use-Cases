import React, { useRef } from 'react';
import { UseCase } from '../data';

interface UseCaseCardProps {
  useCase: UseCase;
  isEditMode: boolean;
  updateUseCase: (id: number, field: 'title' | 'description', value: string) => void;
  onSelect: (useCase: UseCase) => void;
  cardHeight: number;
}

export const UseCaseCard: React.FC<UseCaseCardProps> = ({ useCase, isEditMode, updateUseCase, onSelect, cardHeight }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleBlur = (field: 'title' | 'description', e: React.FocusEvent<HTMLHeadingElement | HTMLParagraphElement>) => {
    updateUseCase(useCase.id, field, e.currentTarget.innerText);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isEditMode && (e.target as HTMLElement).isContentEditable) {
      return;
    }
    onSelect(useCase);
  }
  
  const editStyle: React.CSSProperties = isEditMode ? {
      cursor: 'text',
      outline: 'none',
      borderRadius: '4px',
      padding: '0.25rem',
      animation: 'pulse-glow 2s infinite ease-in-out'
  } : {};

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      className={`group rounded-lg border border-emerald-500/20 bg-slate-900/60 p-6 shadow-lg backdrop-filter backdrop-blur-lg transition-all duration-300 hover:border-emerald-500/40 hover:shadow-emerald-500/10 ${!isEditMode && 'cursor-pointer'}`}
      style={{ minHeight: `${cardHeight}px` }}
    >
      <div className="relative z-10 flex flex-col h-full">
        {useCase.tag && (
          <div className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 px-3 py-1 text-xs font-bold rounded-full border border-emerald-500/20">
            {useCase.tag}
          </div>
        )}
        <div className="mb-4 pt-4">
          <i className={`fas ${useCase.icon} fa-2x text-emerald-400`}></i>
        </div>
        <h3
          className="text-xl font-bold text-slate-100 mb-2"
          contentEditable={isEditMode}
          onBlur={(e) => handleBlur('title', e)}
          suppressContentEditableWarning={true}
          style={editStyle}
        >
          {useCase.title}
        </h3>
        <p
          className="text-slate-400 text-base leading-relaxed flex-grow"
          contentEditable={isEditMode}
          onBlur={(e) => handleBlur('description', e)}
          suppressContentEditableWarning={true}
          style={editStyle}
        >
          {useCase.description}
        </p>
         {!isEditMode && (
          <div className="mt-4 text-sm font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 flex items-center">
            Learn More <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </div>
        )}
      </div>
    </div>
  );
};