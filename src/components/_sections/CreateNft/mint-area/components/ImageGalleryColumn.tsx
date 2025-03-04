'use client'

import React from 'react';
import Image from 'next/image';
import { ImageGalleryColumnProps } from '../types';

export const ImageGalleryColumn = ({
  images,
  startIndex,
  count,
  isGenerating,
  onImageSelect,
  position
}: ImageGalleryColumnProps) => {
  return (
    <div className="w-full flex flex-wrap gap-2 content-start h-full">
      {[...Array(count)].map((_, index) => {
        const imageIndex = startIndex + index;
        const displayIndex = isGenerating ? imageIndex - 1 : imageIndex;
        const hasImage = images[displayIndex];

        return (
          <div
            key={`gallery-${index}`}
            className="w-[calc(50%-0.25rem)] md:w-[calc(12.5%-0.5rem)] lg:w-[calc(50%-0.25rem)] aspect-square"
          >
            {index === 0 && isGenerating && position === 'left' ? (
              <div className="w-full h-full rounded-lg bg-blue-900/20 border-2 border-dashed border-blue-500/40
                           flex items-center justify-center transition-all duration-200">
                <div className="flex flex-col items-center gap-3 text-center px-3">
                  <div className="w-6 h-6 border-2 border-blue-300/50 border-t-transparent rounded-full animate-spin" />
                  <span className="text-blue-300/60 text-sm">Generating...</span>
                </div>
              </div>
            ) : hasImage ? (
              <button
                className="relative w-full h-full cursor-pointer focus:outline-none
                          focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-500 
                          rounded-lg overflow-hidden transition-all duration-200"
                onClick={() => onImageSelect(images[displayIndex])}
                aria-label={`Select generated NFT ${imageIndex + 1}`}
              >
                <Image
                  src={images[displayIndex].imageUrl}
                  alt={`Generated NFT ${imageIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 150px, (max-width: 1024px) 200px, 250px"
                  className="object-cover rounded-lg"
                  priority={index < 4} // Prioritize loading first 4 images
                />
              </button>
            ) : (
              <div className="w-full h-full rounded-lg bg-black/20 border-2 border-dashed border-blue-900/20
                           flex items-center justify-center group transition-all duration-200
                           hover:bg-blue-900/10 hover:border-blue-900/40">
                <div className="flex flex-col items-center gap-2 text-center px-3">
                  <span className="text-blue-300/40 text-sm group-hover:text-blue-300/60">Slot {imageIndex + 1}</span>
                  <span className="text-blue-300/20 text-xs group-hover:text-blue-300/40">Future NFT</span>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}; 