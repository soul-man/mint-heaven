'use client'

import React, { useCallback } from 'react';
import { ColorSelectorProps } from '../types';

export const ColorSelector = ({
  selected,
  onChange,
  colorOptions,
  enabled = true,
  onToggle
}: ColorSelectorProps) => {
  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const hue = parseInt(e.target.value);
    const color = `hsl(${hue}, 70%, 60%)`; // Less saturated, slightly lighter
    onChange(color);
  }, [onChange]);

  // Create a gradient that matches HSL hue values exactly
  const gradientStyle = {
    background: `linear-gradient(to right,
      hsl(0, 70%, 60%),     /* Red */
      hsl(60, 70%, 60%),    /* Yellow */
      hsl(120, 70%, 60%),   /* Green */
      hsl(180, 70%, 60%),   /* Cyan */
      hsl(240, 70%, 60%),   /* Blue */
      hsl(300, 70%, 60%),   /* Purple */
      hsl(360, 70%, 60%)    /* Back to red */
    )`
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="useColorToggle"
            checked={enabled}
            onChange={(e) => onToggle(e.target.checked)}
            className="w-5 h-5 rounded-md border-gray-300 text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
          />
          <span className="text-md text-white">Use Main Color</span>
        </div>
        {selected.startsWith('hsl') && (
          <span className="text-xs text-white/80 font-mono">{selected}</span>
        )}
      </div>

      <div className={`flex items-center gap-3 transition-opacity duration-200 ${enabled ? 'opacity-100' : 'opacity-50'}`}>
        {/* Selected color indicator */}
        <div
          className="w-10 h-10 rounded-lg flex-shrink-0"
          style={{ backgroundColor: selected }}
        />

        <div className="relative w-full h-10 rounded-lg overflow-hidden">
          {/* Color slider track background */}
          <div className="absolute inset-0 rounded-lg" style={gradientStyle} />

          {/* Slider input */}
          <input
            type="range"
            min="0"
            max="360"
            value={selected.startsWith('hsl') ? parseInt(selected.split(',')[0].slice(4)) : 0}
            onChange={handleSliderChange}
            disabled={!enabled}
            className="absolute inset-0 w-full h-2 top-1/2 -translate-y-1/2 opacity-0 cursor-pointer disabled:cursor-not-allowed"
            style={{
              WebkitAppearance: 'none',
              appearance: 'none'
            }}
          />

          {/* Slider thumb with arrows */}
          <div
            className="absolute top-1/2 -translate-y-1/2 flex items-center pointer-events-none"
            style={{
              left: selected.startsWith('hsl')
                ? `${(parseInt(selected.split(',')[0].slice(4)) / 360) * 100}%`
                : '0%',
              transform: 'translateX(-50%) translateY(-50%)'
            }}
          >
            {/* Left Arrow */}
            <div className="text-white/80 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-lg"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </div>

            {/* Slider thumb line */}
            <div className="w-1 h-8 bg-white rounded-full shadow-lg" />

            {/* Right Arrow */}
            <div className="text-white/80 ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-lg"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 