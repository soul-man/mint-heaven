'use client'

import React from 'react';
import { GenerationControlsProps } from '../types';
import { StyleSelector } from './StyleSelector';
import { LightingSelector } from './LightingSelector';
import { ColorSelector } from './ColorSelector';
import { PromptInput } from './PromptInput';
import LoginButton from '@/components/buttons/LoginButton';
import { artStyles, colorOptions, lightingModifiers } from '../../config/aiGeneration.config';

export const GenerationControls = ({
  onGenerate,
  isGenerating,
  selectedStyle,
  setSelectedStyle,
  selectedColor,
  setSelectedColor,
  selectedLighting,
  setSelectedLighting,
  aiPrompt,
  setAiPrompt,
  onRandomPrompt,
  activeAccount,
  useColor,
  onColorToggle
}: GenerationControlsProps) => {
  return (
    <div className="flex flex-col gap-4 md:gap-4">

      <StyleSelector
        selected={selectedStyle}
        onChange={setSelectedStyle}
        styles={artStyles}
      />

      <LightingSelector
        selected={selectedLighting}
        onChange={setSelectedLighting}
        lightingOptions={lightingModifiers}
      />

      <ColorSelector
        selected={selectedColor}
        onChange={setSelectedColor}
        colorOptions={colorOptions}
        enabled={useColor}
        onToggle={onColorToggle}
      />

      <PromptInput
        value={aiPrompt}
        onChange={setAiPrompt}
        onRandomPrompt={onRandomPrompt}
        isGenerating={isGenerating}
      />

      <div>
        {!activeAccount ? (
          <div className="flex items-center justify-center">
            <LoginButton />
          </div>
        ) : (
          <button
            onClick={onGenerate}
            disabled={isGenerating || !selectedStyle || !aiPrompt}
            className={`
              w-full py-3 md:py-4 px-4 rounded-lg
              flex items-center justify-center gap-3
              font-medium text-white text-lg md:text-xl
              transition-all duration-200
              active:scale-[0.98]
              ${isGenerating || !selectedStyle || !aiPrompt
                ? 'bg-blue-900/20 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 active:bg-blue-700'
              }
            `}
          >
            <span className="relative top-[1px]">
              {isGenerating ? 'Generating...' : 'Generate Image'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}; 