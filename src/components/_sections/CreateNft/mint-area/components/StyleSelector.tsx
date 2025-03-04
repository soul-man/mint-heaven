'use client'

import React from 'react';
import { StyleSelectorProps } from '../types';

export const StyleSelector = ({
  selected,
  onChange,
  styles
}: StyleSelectorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-md text-white">Style</span>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {styles.map((style) => (
          <button
            key={style.name}
            onClick={() => onChange(style.name)}
            className={`
              p-2 rounded-lg transition-all duration-200
              flex flex-col items-center gap-1 border-2
              ${selected === style.name
                ? 'bg-blue-900/30 text-white border-blue-500 border-dashed'
                : 'bg-black/20 text-blue-300/60 border-blue-600/10 border-solid hover:text-blue-300 hover:bg-blue-900/20'
              }
            `}
          >
            {style.icon}
            <span className="text-xs font-medium">{style.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}; 