import type { NextApiRequest, NextApiResponse } from 'next';

type GenerateAiImageResponse = {
  success: boolean;
  imageUrl?: string;
  error?: string;
  finalPrompt?: string;
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

// Style prompt modifiers based on art style
const stylePrompts: Record<string, string> = {
  Realistic: "photorealistic, highly detailed, ultra-realistic rendering, professional photography style",
  "3D": "3D rendered, volumetric lighting, octane render, detailed textures, 3D modeling",
  Cartoon: "cartoon style, vibrant colors, clean lines, animated look, stylized illustration",
  Sketch: "hand-drawn, pencil sketch, detailed linework, artistic drawing, sketching technique",
  "Oil Paint": "oil painting style, textured brushstrokes, rich colors, traditional art technique",
  Watercolor: "watercolor effect, soft edges, flowing colors, artistic watercolor technique"
};

// Color prompt modifiers
const colorPrompts: Record<string, string> = {
  Blue: "blue color scheme, cool tones, azure atmosphere",
  Red: "red color scheme, warm tones, crimson atmosphere",
  Green: "green color scheme, natural tones, emerald atmosphere",
  Purple: "purple color scheme, royal tones, amethyst atmosphere",
  Orange: "orange color scheme, sunset tones, amber atmosphere",
  Pink: "pink color scheme, soft tones, rose atmosphere"
};

// Lighting prompt modifiers
const lightingPrompts: Record<string, string> = {
  soft: "soft lighting, gentle shadows, diffused illumination",
  dramatic: "dramatic lighting, strong contrast, dynamic shadows",
  "neon lights": "neon lighting, vibrant glow, cyberpunk atmosphere",
  sunset: "sunset lighting, golden hour, warm directional light",
  studio: "studio lighting setup, professional illumination, controlled environment",
  "natural light": "natural daylight, ambient lighting, organic illumination"
};

interface PromptParams {
  mainPrompt: string;
  style: string;
  color?: string;
  useColor?: boolean;
  lighting: string;
}

const combinePrompts = ({
  mainPrompt,
  style,
  color,
  useColor = true,
  lighting,
}: PromptParams): string => {
  const styleModifier = stylePrompts[style] || '';
  const colorModifier = useColor && color ? colorPrompts[color] || '' : '';
  const lightingModifier = lightingPrompts[lighting] || '';

  const modifiers = [
    styleModifier,
    colorModifier,
    lightingModifier
  ].filter(Boolean).join(', ');

  return `${mainPrompt} ${modifiers}`.replace(/\s+/g, ' ').trim();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GenerateAiImageResponse>
) {

  if (!process.env.HUGGING_FACE_API_KEY) {
    return res.status(500).json({ success: false, error: 'Missing API key' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { prompt, style, color, useColor, lighting } = req.body;

    if (!prompt || !style || !lighting) {
      return res.status(400).json({
        success: false,
        error: 'Required parameters (prompt, style, lighting) are missing',
      });
    }

    // Combine all prompts into one cohesive prompt
    const finalPrompt = combinePrompts({
      mainPrompt: prompt,
      style,
      color,
      useColor,
      lighting
    });
    console.log('Generated final prompt:', finalPrompt);

    // Generate image using Stable Diffusion XL
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGING_FACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: finalPrompt,
          parameters: {
            negative_prompt: "low quality, blurry, distorted, text, watermark, signature, deformed",
            num_inference_steps: 10,
            guidance_scale: 7.5,
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    const imageBuffer = Buffer.from(await response.arrayBuffer());
    const base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;

    return res.status(200).json({
      success: true,
      imageUrl: base64Image,
      finalPrompt
    });

  } catch (error) {
    console.error('Error in generate-ai-image API:', error);
    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate image',
    });
  }
} 