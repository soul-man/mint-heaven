'use client'

import React from 'react';
import { MagicWand } from "@phosphor-icons/react";
import { PromptInputProps } from '../types';

export const PromptInput = ({
  value,
  onChange,
  onRandomPrompt,
  isGenerating
}: PromptInputProps) => {
  return (
    <div className="relative flex-grow mt-2">
      <textarea
        className="w-full h-full min-h-[120px] px-3.5 pr-10 py-3 bg-black/30 border border-blue-900/40 rounded-lg 
          focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none
          text-md text-blue-200 placeholder-blue-200/40"
        placeholder="Describe the image you want to create..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isGenerating}
      />
      <button
        onClick={onRandomPrompt}
        className="absolute right-3 top-3 p-1.5 rounded-lg 
          bg-blue-900/20 hover:bg-blue-900/30 
          text-blue-300/60 hover:text-blue-300 
          transition-all duration-200"
        title="Generate random prompt"
        disabled={isGenerating}
      >
        <MagicWand className="w-6 h-6" weight="duotone" />
      </button>
    </div>

  );
}; 