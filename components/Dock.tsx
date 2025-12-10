
import React, { useState } from 'react';
import { BookOpen, Bot, Settings } from 'lucide-react';

interface DockProps {
  onOpenConcepts: () => void;
  onOpenAgentic: () => void;
  onOpenSetup: () => void;
}

export const Dock: React.FC<DockProps> = ({ onOpenConcepts, onOpenAgentic, onOpenSetup }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const items = [
    { 
        id: 0, 
        label: "GenAI Concepts", 
        icon: BookOpen, 
        color: "text-cyan-400", 
        gradient: "from-cyan-500/20 to-blue-600/5",
        border: "group-hover:border-cyan-400/40",
        shadow: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.15)]",
        onClick: onOpenConcepts 
    },
    { 
        id: 1, 
        label: "Agentic AI", 
        icon: Bot, 
        color: "text-emerald-400", 
        gradient: "from-emerald-500/20 to-teal-600/5",
        border: "group-hover:border-emerald-400/40",
        shadow: "group-hover:shadow-[0_0_20px_rgba(52,211,153,0.15)]",
        onClick: onOpenAgentic 
    },
    { 
        id: 2, 
        label: "Custom Setup", 
        icon: Settings, 
        color: "text-fuchsia-400", 
        gradient: "from-fuchsia-500/20 to-purple-600/5",
        border: "group-hover:border-fuchsia-400/40",
        shadow: "group-hover:shadow-[0_0_20px_rgba(232,121,249,0.15)]",
        onClick: onOpenSetup 
    },
  ];

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 animate-fade-in">
      {/* Dock Container */}
      <div 
        className="
            flex flex-col items-center gap-5 px-3 py-6 rounded-3xl
            bg-[#020617]/40 backdrop-blur-2xl border border-white/5
            shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]
            transition-all duration-500 ease-out
        "
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {items.map((item, index) => {
            const isHovered = hoveredIndex === index;
            const isNeighbor = hoveredIndex !== null && Math.abs(hoveredIndex - index) === 1;
            
            let scale = 1;
            
            if (isHovered) {
                scale = 1.15; // Much subtler scale
            } else if (isNeighbor) {
                scale = 1.05;
            }

            return (
                <button
                    key={item.id}
                    onClick={item.onClick}
                    onMouseEnter={() => setHoveredIndex(index)}
                    className="relative group flex items-center justify-center transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                        transform: `scale(${scale})`,
                    }}
                >
                    {/* Tooltip (Right Side) */}
                    <div 
                        className={`
                            absolute left-full ml-5 px-3 py-1.5 
                            bg-[#0f172a] text-white text-[12px] font-semibold tracking-wide rounded-lg whitespace-nowrap
                            opacity-0 transition-all duration-300 pointer-events-none border border-white/10 shadow-xl
                            ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                        `}
                    >
                        {item.label}
                        {/* Arrow */}
                        <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#0f172a] rotate-45 border-l border-b border-white/10 rounded-bl-[2px]"></div>
                    </div>

                    {/* Icon Container */}
                    <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center
                        bg-gradient-to-br ${item.gradient}
                        border border-white/5 relative overflow-hidden
                        transition-all duration-500 ease-out
                        ${item.border}
                        ${item.shadow}
                        ${isHovered ? 'bg-[#1e293b]/60 border-white/20' : 'bg-[#0f172a]/20'}
                    `}>
                        {/* Icon */}
                        <item.icon 
                            size={22} 
                            className={`
                                ${item.color} 
                                transition-all duration-500 ease-out
                                ${isHovered ? 'brightness-125' : 'opacity-70 grayscale-[0.4]'}
                            `} 
                        />
                        
                        {/* Internal Shine */}
                        <div className={`absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    </div>

                    {/* Active Side Indicator */}
                    <div className={`
                        absolute -left-3 top-1/2 -translate-y-1/2 w-1 bg-white/50 rounded-full
                        transition-all duration-300 ease-out
                        ${isHovered ? 'h-5 opacity-100' : 'h-0 opacity-0'}
                        shadow-[0_0_8px_rgba(255,255,255,0.4)]
                    `} />
                </button>
            );
        })}
      </div>
    </div>
  );
};
