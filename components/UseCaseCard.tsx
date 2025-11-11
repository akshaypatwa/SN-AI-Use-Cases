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
      className={`showcase-card group ${!isEditMode && 'cursor-pointer'}`}
      style={{ minHeight: `${cardHeight}px` }}
    >
      <div className="relative z-10 p-6 flex flex-col h-full bg-[var(--card-bg)] rounded-[calc(1rem-1px)]">
        {useCase.tag && (
          <div className="absolute top-4 right-4 tag-accent px-3 py-1 text-xs font-bold rounded-full border">
            {useCase.tag}
          </div>
        )}
        <div className="mb-4 pt-4">
          <i className={`fas ${useCase.icon} fa-2x icon-gradient`}></i>
        </div>
        <h3
          className="text-xl font-bold text-white mb-2"
          contentEditable={isEditMode}
          onBlur={(e) => handleBlur('title', e)}
          suppressContentEditableWarning={true}
          style={editStyle}
        >
          {useCase.title}
        </h3>
        <p
          className="text-gray-400 text-base leading-relaxed flex-grow"
          contentEditable={isEditMode}
          onBlur={(e) => handleBlur('description', e)}
          suppressContentEditableWarning={true}
          style={editStyle}
        >
          {useCase.description}
        </p>
         {!isEditMode && (
          <div className="mt-4 text-sm font-semibold text-gray-500 group-hover:text-white transition-colors duration-300 flex items-center">
            Learn More <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition-transform duration-300"></i>
          </div>
        )}
      </div>
    </div>
  );
};