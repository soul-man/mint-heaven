'use client'

import React from 'react';
import { LightingSelectorProps } from '../types';

export const LightingSelector = ({
  selected,
  onChange,
  lightingOptions
}: LightingSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-md text-white">Lighting</span>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {lightingOptions.map((lighting) => (
          <button
            key={lighting.name}
            onClick={() => onChange(lighting.name.toLowerCase())}
            className={`
              p-2 rounded-lg transition-all duration-200
              flex flex-col items-center gap-1
              group relative border-2
              ${selected === lighting.name.toLowerCase()
                ? 'bg-blue-900/30 text-white border-blue-500 border-dashed'
                : 'bg-black/20 text-blue-300/60 border-blue-600/10 border-solid hover:text-blue-300 hover:bg-blue-900/20'
              }
            `}
            title={lighting.description}
          >
            {lighting.icon}
            <span className="text-[10px] font-medium">{lighting.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 