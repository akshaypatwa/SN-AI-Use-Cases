import React from 'react';

export const Background = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="pattern-rectangles"
            x="0"
            y="0"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect
              x="0"
              y="0"
              width="30"
              height="30"
              fill="rgba(16, 185, 129, 0.05)"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#pattern-rectangles)" />
        <rect width="100%" height="100%" fill="url(#pattern-rectangles)" transform="rotate(90)" />
        <rect width="100%" height="100%" fill="url(#pattern-rectangles)" transform="rotate(180)" />
        <rect width="100%" height="100%" fill="url(#pattern-rectangles)" transform="rotate(270)" />
        <rect width="100%" height="100%" fill="radial-gradient(ellipse 80% 80% at 50% -20%, rgba(16, 185, 129, 0.3), rgba(255, 255, 255, 0))"/>
      </svg>
    </div>
  );
};
