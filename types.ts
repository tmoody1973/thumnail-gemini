export interface GeneratedImage {
  url: string;
  prompt: string;
  timestamp: number;
}

export enum ArtStyle {
  REALISTIC = 'Cinematic, hyper-realistic, 8k resolution, professional photography',
  ILLUSTRATION = 'Vector art, flat illustration, clean lines, vibrant colors, minimalist',
  VINTAGE = 'Vintage paper texture, retro typography, faded colors, historical feel, 1950s poster style',
  NEON = 'Cyberpunk, neon lights, dark background, glowing elements, futuristic',
  MINIMAL = 'Minimalist, negative space, bold typography, simple geometric shapes, clean',
  GRUNGE = 'Grunge texture, distressed aesthetic, bold contrast, edgy, rock and roll style'
}

export const ASPECT_RATIOS = [
  { label: 'Square (1:1)', value: '1:1' },
  { label: 'Portrait (3:4)', value: '3:4' },
  { label: 'Landscape (16:9)', value: '16:9' },
];