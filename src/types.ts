export interface VectorProps {
  d?: string;
  cx?: number;
  cy?: number;
  r?: number;
  rx?: number;
  ry?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDasharray?: string;
  textContent?: string;
  fontSize?: number;
  fontWeight?: string;
  fontFamily?: string;
  textAnchor?: string;
  transform?: string;
  opacity?: number;
}

export interface VectorElement {
  type: 'path' | 'circle' | 'rect' | 'polygon' | 'ellipse' | 'text' | 'line';
  id: string;
  animationGroup: 'background' | 'main-graphic' | 'accent-accent' | 'brand-text' | 'sub-text';
  props: VectorProps;
}

export interface LogoDesign {
  title: string;
  tagline: string;
  explanation: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  suggestedAnimationType: 'sketch-draw' | 'scale-pop' | 'slide-fade' | 'rotate-reveal' | 'morph-elastic';
  rawSvg: string;
  vectorElements: VectorElement[];
}

export interface CompanyInfo {
  companyName: string;
  industry: string;
  description: string;
  style: 'minimalist' | 'geometric' | 'retro' | 'futuristic' | 'organic' | 'corporate';
  accentColor: string;
}

export interface AnimationSettings {
  speedMultiplier: number; // e.g. 1 (normal), 0.5 (slow), 1.5 (fast)
  playbackMode: 'once' | 'loop' | 'infinite';
  key: number; // triggers clean remount to restart animation
}
