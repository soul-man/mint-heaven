import { Camera, PaintBrush, Pencil, Drop, Cube, Sun, Sparkle, Lightning, CloudMoon, Flashlight, CloudSun } from "@phosphor-icons/react"
import React from 'react'

export const IMAGES_PER_PAGE = 5;
export const MAX_STORED_IMAGES = 16;

export const artStyles = [
  {
    name: "Realistic",
    icon: <Camera weight="duotone" className="w-7 h-7" />,
    description: "Photorealistic designs",
    examples: ["photorealistic digital art", "hyperrealistic illustration", "realistic detailed composition"]
  },
  {
    name: "3D",
    icon: <Cube weight="duotone" className="w-7 h-7" />,
    description: "3D rendered artwork",
    examples: [
      "3D rendered scene",
      "3D digital sculpture",
      "3D character model"
    ]
  },
  {
    name: "Cartoon",
    icon: <PaintBrush weight="duotone" className="w-7 h-7" />,
    description: "Cartoon style artwork",
    examples: [
      "cartoon character design",
      "animated style illustration",
      "cartoon scene"
    ]
  },
  {
    name: "Sketch",
    icon: <Pencil weight="duotone" className="w-7 h-7" />,
    description: "Hand-drawn style",
    examples: [
      "pencil sketch artwork",
      "detailed drawing",
      "line art illustration"
    ]
  },
  {
    name: "Paint",
    icon: <PaintBrush weight="duotone" className="w-7 h-7" />,
    description: "Oil painting style",
    examples: [
      "digital oil painting",
      "oil paint texture",
      "painterly style artwork"
    ]
  },
  {
    name: "Retro",
    icon: <Drop weight="duotone" className="w-7 h-7" />,
    description: "Retro effects",
    examples: [
      "retro illustration",
      "soft retro color design",
      "retro texture art"
    ]
  }
];

export const colorOptions = [
  { name: "Blue", value: "bg-blue-500" },
  { name: "Red", value: "bg-red-500" },
  { name: "Green", value: "bg-green-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Pink", value: "bg-pink-500" }
];

export const lightingModifiers = [
  {
    name: "Soft",
    icon: <CloudSun weight="duotone" className="w-6 h-6" />,
    description: "Gentle, diffused lighting",
  },
  {
    name: "Dramatic",
    icon: <Flashlight weight="duotone" className="w-6 h-6" />,
    description: "High contrast, moody lighting",
  },
  {
    name: "Neon",
    icon: <Lightning weight="duotone" className="w-6 h-6" />,
    description: "Vibrant, glowing effects",
  },
  {
    name: "Sunset",
    icon: <Sun weight="duotone" className="w-6 h-6" />,
    description: "Warm, golden hour lighting",
  },
  {
    name: "Studio",
    icon: <Sparkle weight="duotone" className="w-6 h-6" />,
    description: "Professional, controlled lighting",
  },
  {
    name: "Natural",
    icon: <CloudMoon weight="duotone" className="w-6 h-6" />,
    description: "Ambient, environmental lighting",
  }
];

export const samplePrompts = [
  "A majestic dragon soaring through clouds",
  "A mystical forest with glowing mushrooms",
  "An ancient temple hidden in mountains",
  "A futuristic cityscape with flying vehicles",
  "A peaceful koi pond with lotus flowers",
  "A cosmic space whale swimming among stars",
  "A magical crystal cave with gems",
  "An enchanted garden with fairy lights",
  "A steampunk mechanical butterfly",
  "A floating island with waterfalls",
  "A mythical phoenix rising from flames",
  "An underwater city with coral towers",
  "A robotic companion in a meadow",
  "A time-traveling train in motion",
  "A wise owl perched on ancient books"
]; 