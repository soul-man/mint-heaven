'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef, Suspense } from 'react'
import Image from 'next/image'
import { useActiveAccount } from "thirdweb/react";
import { MAX_STORED_IMAGES, artStyles, lightingModifiers, samplePrompts } from '../config/aiGeneration.config'
import dynamic from 'next/dynamic'
import { ImageGalleryColumn } from './components/ImageGalleryColumn';
import { GenerationControls } from './components/GenerationControls';
import { GenerationState, StoredImage } from './types';
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

// Dynamically import heavy components
const MintView = dynamic(() => import('./MintView'), {
  loading: () => <div className="w-full h-full flex items-center justify-center">
    <div className="animate-pulse text-blue-400">Loading mint view...</div>
  </div>,
  ssr: false
})

interface AiGenerationSectionProps {
  selectedStyle: string
  setSelectedStyle: (style: string) => void
  selectedColor: string
  setSelectedColor: (color: string) => void
  selectedLighting: string
  setSelectedLighting: (lighting: string) => void
  aiPrompt: string
  setAiPrompt: (prompt: string) => void
  generateFinalPrompt: () => void
  selectedChainId: number
}

export const AiGenerationSection = ({
  selectedStyle,
  setSelectedStyle,
  selectedColor,
  setSelectedColor,
  selectedLighting,
  setSelectedLighting,
  aiPrompt,
  setAiPrompt,
  selectedChainId
}: AiGenerationSectionProps) => {
  // Consolidated state management
  const [generationState, setGenerationState] = useState<GenerationState>({
    isGenerating: false,
    generatedImage: null,
    error: null,
    finalPrompt: ''
  });

  // const [uiState, setUiState] = useState<UIState>({
  //   viewMode: 'single',
  //   currentPage: 0,
  //   isPromptExpanded: false,
  //   isChainSwitching: false
  // });

  const [storedImages, setStoredImages] = useState<StoredImage[]>([]);
  const [selectedStoredImage, setSelectedStoredImage] = useState<StoredImage | null>(null);
  const [useColor, setUseColor] = useState<boolean>(true);
  const activeAccount = useActiveAccount();

  // Add refs and state for scroll functionality
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: true // Always show right button initially
  });

  // useEffect(() => {
  //   if (chain?.id === selectedChainId) {
  //     setUiState(prev => ({ ...prev, isChainSwitching: false }));
  //   }
  // }, [chain?.id, selectedChainId]);

  // Load stored images on component mount
  useEffect(function loadImagesFromLocalStorage() {
    try {
      const stored = localStorage.getItem('mintHeaven_generatedImages');
      if (stored) {
        const parsedImages = JSON.parse(stored) as StoredImage[];
        setStoredImages(parsedImages);

        if (parsedImages.length > 0) {
          const mostRecent = parsedImages[0];
          setGenerationState(prev => ({
            ...prev,
            generatedImage: mostRecent.imageUrl,
            finalPrompt: mostRecent.prompt
          }));
        }
      }
    } catch (err) {
      console.error('Error loading stored images:', err);
    }
  }, []);

  // Store new image in local storage
  const storeGeneratedImage = useCallback((imageUrl: string, prompt: string) => {
    try {
      const newImage: StoredImage = {
        imageUrl,
        prompt,
        timestamp: Date.now()
      };

      setStoredImages(prevImages => {
        const updatedImages = [newImage, ...prevImages].slice(0, MAX_STORED_IMAGES);
        localStorage.setItem('mintHeaven_generatedImages', JSON.stringify(updatedImages));
        return updatedImages;
      });
    } catch (err) {
      console.error('Error storing image:', err);
    }
  }, []);

  const generateImage = useCallback(async () => {
    try {
      setGenerationState(prev => ({ ...prev, isGenerating: true, error: null }));

      const response = await fetch('/api/generate-ai-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: aiPrompt,
          style: selectedStyle,
          color: selectedColor,
          useColor: useColor,
          lighting: selectedLighting,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGenerationState(prev => ({
        ...prev,
        generatedImage: data.imageUrl,
        finalPrompt: data.finalPrompt
      }));
      storeGeneratedImage(data.imageUrl, data.finalPrompt);
    } catch (err) {
      setGenerationState(prev => ({
        ...prev,
        error: err instanceof Error ? err.message : 'Failed to generate image'
      }));
      console.error('Error generating image:', err);
    } finally {
      setGenerationState(prev => ({ ...prev, isGenerating: false }));
    }
  }, [aiPrompt, selectedStyle, selectedColor, selectedLighting, useColor, storeGeneratedImage]);

  const handleCloseMintView = () => {
    setSelectedStoredImage(null);
  };

  // Create a display array that shifts images during generation
  const displayImages = useMemo(() => {
    if (generationState.isGenerating) {
      return [...storedImages];
    }
    return storedImages;
  }, [generationState.isGenerating, storedImages]);

  const getRandomElement = <T,>(array: T[]): T => {
    return array[Math.floor(Math.random() * array.length)];
  };

  const handleRandomPrompt = useCallback(() => {
    // Random prompt
    setAiPrompt(getRandomElement(samplePrompts));

    // Random style
    setSelectedStyle(getRandomElement(artStyles).name);

    // Random lighting
    const randomLighting = getRandomElement(lightingModifiers);
    setSelectedLighting(randomLighting.name.toLowerCase());

    // Random color only if color is enabled
    if (useColor) {
      const hue = Math.floor(Math.random() * 360);
      setSelectedColor(`hsl(${hue}, 70%, 60%)`);
    }
  }, [setAiPrompt, setSelectedStyle, setSelectedLighting, setSelectedColor, useColor]);

  // Check scroll position and update arrow visibility
  const checkScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;

      // Check if there's content to scroll to the right
      const hasMoreContentRight = scrollWidth > clientWidth;

      // Check if we've scrolled to the end
      const isAtRightEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;

      setScrollState({
        canScrollLeft: scrollLeft > 0,
        canScrollRight: hasMoreContentRight && !isAtRightEnd
      });
    }
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [checkScroll]);

  // Additional effect to check scroll state after images are loaded
  useEffect(() => {
    // Wait for the next render cycle to ensure the DOM is updated
    const timeoutId = setTimeout(() => {
      checkScroll();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [displayImages, checkScroll]);

  // Scroll functions
  const scrollGallery = useCallback((direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 320; // Adjust this value to control scroll distance
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  return (
    <div className="w-full h-full">
      {/* Main container with responsive classes */}
      <div className="flex flex-col lg:flex-row gap-3 w-full h-full">
        {/* Left Gallery - Hidden on mobile, 6/12 on tablet, 3/12 on desktop */}
        <div className="hidden lg:block md:w-full lg:w-3/12">
          <ImageGalleryColumn
            images={displayImages}
            startIndex={0}
            count={8}
            isGenerating={generationState.isGenerating}
            onImageSelect={setSelectedStoredImage}
            position="left"
          />
        </div>

        {/* Mobile Gallery - Only visible on mobile, full width horizontal scroll */}
        <div className="block lg:hidden w-full relative">
          {/* Left Arrow */}
          {scrollState.canScrollLeft && (
            <button
              onClick={() => scrollGallery('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black 
                       p-2 rounded-r-lg transition-all duration-200 backdrop-blur-sm"
              aria-label="Scroll left"
            >
              <CaretLeft className="w-6 h-6 text-white/80" weight="bold" />
            </button>
          )}

          {/* Right Arrow - Always show initially or when there's content to scroll */}
          {(scrollState.canScrollRight || displayImages.length > 0) && (
            <button
              onClick={() => scrollGallery('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black 
                       p-2 rounded-l-lg transition-all duration-200 backdrop-blur-sm"
              aria-label="Scroll right"
            >
              <CaretRight className="w-6 h-6 text-white/80" weight="bold" />
            </button>
          )}

          {/* Gallery Container */}
          <div
            ref={scrollContainerRef}
            className="w-full overflow-x-auto scrollbar-hide"
          >
            <div className="flex gap-2 p-2 min-w-min">
              {[...Array(MAX_STORED_IMAGES)].map((_, index) => {
                const image = displayImages[index];
                return (
                  <div
                    key={`mobile-gallery-${index}`}
                    className="w-[150px] flex-shrink-0 aspect-square"
                  >
                    {image ? (
                      <button
                        className="relative w-full h-full cursor-pointer focus:outline-none
                                  focus:ring-2 focus:ring-blue-500 hover:ring-2 hover:ring-blue-500 
                                  rounded-lg overflow-hidden transition-all duration-200"
                        onClick={() => setSelectedStoredImage(image)}
                        aria-label={`Select generated NFT ${index + 1}`}
                      >
                        <Image
                          src={image.imageUrl}
                          alt={`Generated NFT ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                          width={150}
                          height={150}
                        />
                      </button>
                    ) : (
                      <div className="w-full h-full rounded-lg bg-black/20 border-2 border-dashed border-blue-900/20
                                  flex items-center justify-center group transition-all duration-200
                                  hover:bg-blue-900/10 hover:border-blue-900/40">
                        <div className="flex flex-col items-center gap-2 text-center px-3">
                          <span className="text-blue-300/40 text-sm group-hover:text-blue-300/60">Slot {index + 1}</span>
                          <span className="text-blue-300/20 text-xs group-hover:text-blue-300/40">Future NFT</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Controls Panel - Full width on mobile, 12/12 on tablet, 6/12 on desktop */}
        <div className="w-full lg:w-6/12 flex flex-col gap-4 bg-black/20 rounded-lg p-4 md:p-5 border border-blue-900/20">
          {selectedStoredImage ? (
            <MintView
              imageUrl={selectedStoredImage.imageUrl}
              prompt={selectedStoredImage.prompt}
              onClose={handleCloseMintView}
              selectedChainId={selectedChainId}
            />
          ) : (
            <GenerationControls
              onGenerate={generateImage}
              isGenerating={generationState.isGenerating}
              selectedStyle={selectedStyle}
              setSelectedStyle={setSelectedStyle}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedLighting={selectedLighting}
              setSelectedLighting={setSelectedLighting}
              aiPrompt={aiPrompt}
              setAiPrompt={setAiPrompt}
              onRandomPrompt={handleRandomPrompt}
              activeAccount={!!activeAccount}
              useColor={useColor}
              onColorToggle={setUseColor}
            />
          )}

          {generationState.error && (
            <div className="text-red-500 text-sm text-center">
              {generationState.error}
            </div>
          )}
        </div>

        {/* Right Gallery - Hidden on mobile, 6/12 on tablet, 3/12 on desktop */}
        <div className="hidden lg:block md:w-full lg:w-3/12">
          <ImageGalleryColumn
            images={displayImages}
            startIndex={8}
            count={8}
            isGenerating={generationState.isGenerating}
            onImageSelect={setSelectedStoredImage}
            position="right"
          />
        </div>

      </div>
    </div>
  );
} 