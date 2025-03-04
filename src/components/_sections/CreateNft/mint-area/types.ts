import { type } from "os";

export interface StoredImage {
  imageUrl: string;
  prompt: string;
  timestamp: number;
}

export interface GenerationState {
  isGenerating: boolean;
  generatedImage: string | null;
  error: string | null;
  finalPrompt: string;
}

export interface UIState {
  viewMode: 'single' | 'grid';
  currentPage: number;
  isPromptExpanded: boolean;
  isChainSwitching: boolean;
}

export interface StyleSelectorProps {
  selected: string;
  onChange: (style: string) => void;
  styles: Array<{
    name: string;
    icon: React.ReactNode;
    description: string;
    examples: string[];
  }>;
}

export interface LightingSelectorProps {
  selected: string;
  onChange: (lighting: string) => void;
  lightingOptions: Array<{
    name: string;
    icon: React.ReactNode;
    description: string;
  }>;
}

export interface ColorSelectorProps {
  selected: string;
  onChange: (color: string) => void;
  colorOptions: Array<{
    name: string;
    value: string;
  }>;
  enabled?: boolean;
  onToggle: (enabled: boolean) => void;
}

export interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  onRandomPrompt: () => void;
  isGenerating: boolean;
}

export interface ImageGalleryColumnProps {
  images: StoredImage[];
  startIndex: number;
  count: number;
  isGenerating: boolean;
  onImageSelect: (image: StoredImage) => void;
  position: 'left' | 'right';
}

export interface GenerationControlsProps {
  onGenerate: () => void;
  isGenerating: boolean;
  selectedStyle: string;
  setSelectedStyle: (style: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedLighting: string;
  setSelectedLighting: (lighting: string) => void;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  onRandomPrompt: () => void;
  activeAccount: boolean;
  useColor: boolean;
  onColorToggle: (enabled: boolean) => void;
} 