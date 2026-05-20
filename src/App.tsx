import React, { useState } from 'react';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';
import Sidebar from './components/Sidebar';
import LogoStage from './components/LogoStage';
import ConceptExplainer from './components/ConceptExplainer';
import { CompanyInfo, LogoDesign, AnimationSettings } from './types';
import { Info, Sparkles, Cpu, Flame, LayoutGrid, Award, Settings, ExternalLink } from 'lucide-react';

const INITIAL_INFO: CompanyInfo = {
  companyName: "Alpha Tech",
  industry: "Green Technology",
  description: "A sustainable energy tech brand showing geometric mountain paths merging with electronic clean wings.",
  style: "minimalist",
  accentColor: "#024ad8"
};

const DEFAULT_LOGO_MOCKUP: LogoDesign = {
  title: "Alpha Growth Horizon",
  tagline: "Eco-friendly geometric paths guiding professional technology.",
  explanation: "The logo combines sharp architectural precision with organic forward motion. The inner upward triangles reflect progressive growth and technological structures, while the curved orbits symbolize planetary sustainability. Space Grotesk typography anchors the identity, conveying reliability, and modern technological approachability.",
  primaryColor: "#024ad8",
  secondaryColor: "#1a1a1a",
  accentColor: "#ff5050",
  suggestedAnimationType: "sketch-draw",
  rawSvg: `<svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
  <circle cx="250" cy="200" r="100" stroke="#024ad8" stroke-width="4" fill="none" opacity="0.15" />
  <circle cx="250" cy="200" r="60" stroke="#ff5050" stroke-width="2" stroke-dasharray="5,5" fill="none" opacity="0.6" />
  <path d="M190,260 L250,140 L310,260 Z" fill="none" stroke="#1a1a1a" stroke-width="6" stroke-linejoin="round" />
  <path d="M250,140 L250,260" fill="none" stroke="#024ad8" stroke-width="3" stroke-dasharray="8,4" />
  <path d="M160,200 Q250,290 340,200" fill="none" stroke="#024ad8" stroke-width="4" stroke-linecap="round" />
  <text x="250" y="380" font-size="34" font-weight="bold" font-family="'Space Grotesk', sans-serif" fill="#1a1a1a" text-anchor="middle">ALPHA TECH</text>
  <text x="250" y="415" font-size="13" font-weight="normal" font-family="sans-serif" fill="#636363" letter-spacing="4" text-anchor="middle">GREEN INNOVATION</text>
</svg>`,
  vectorElements: [
    {
      type: 'circle',
      id: 'outer-orbit',
      animationGroup: 'background',
      props: { cx: 250, cy: 200, r: 100, stroke: '#024ad8', strokeWidth: 4, fill: 'none', opacity: 0.15 }
    },
    {
      type: 'circle',
      id: 'inner-dashed-orbit',
      animationGroup: 'background',
      props: { cx: 250, cy: 200, r: 60, stroke: '#ff5050', strokeWidth: 2, strokeDasharray: '5,5', fill: 'none', opacity: 0.6 }
    },
    {
      type: 'path',
      id: 'mountain-structure',
      animationGroup: 'main-graphic',
      props: { d: 'M190,260 L250,140 L310,260 Z', fill: 'none', stroke: '#1a1a1a', strokeWidth: 6 }
    },
    {
      type: 'path',
      id: 'vertical-beam',
      animationGroup: 'accent-accent',
      props: { d: 'M250,140 L250,260', fill: 'none', stroke: '#024ad8', strokeWidth: 3, strokeDasharray: '8,4' }
    },
    {
      type: 'path',
      id: 'sustainability-swoosh',
      animationGroup: 'accent-accent',
      props: { d: 'M160,200 Q250,290 340,200', fill: 'none', stroke: '#024ad8', strokeWidth: 4 }
    },
    {
      type: 'text',
      id: 'main-title-text',
      animationGroup: 'brand-text',
      props: { x: 250, y: 380, fill: '#1a1a1a', fontSize: 34, fontWeight: 'bold', fontFamily: 'Space Grotesk', textAnchor: 'middle', textContent: 'ALPHA TECH' }
    },
    {
      type: 'text',
      id: 'sub-category-tagline',
      animationGroup: 'sub-text',
      props: { x: 250, y: 415, fill: '#636363', fontSize: 13, fontWeight: 'normal', fontFamily: 'Inter', textAnchor: 'middle', textContent: 'GREEN INNOVATION' }
    }
  ]
};

export default function App() {
  const [logo, setLogo] = useState<LogoDesign | null>(DEFAULT_LOGO_MOCKUP);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<CompanyInfo>(INITIAL_INFO);

  const [settings, setSettings] = useState<AnimationSettings>({
    speedMultiplier: 1.0,
    playbackMode: 'once',
    key: 1
  });

  // Handle preset clicks from nav header
  const handleQuickPreset = (desc: string, name: string, ind: string, style: any) => {
    setInfo({
      companyName: name,
      industry: ind,
      description: desc,
      style: style,
      accentColor: "#024ad8"
    });
  };

  const handleGenerateLogo = async (params: CompanyInfo) => {
    setLoading(true);
    setError(null);
    setInfo(params);

    try {
      const response = await fetch('/api/generate-logo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to connect to the generator engine.');
      }

      const lData: LogoDesign = await response.json();
      
      // Perform validation checks on structural keys received from backend
      if (!lData.title || !lData.vectorElements || !Array.isArray(lData.vectorElements)) {
        throw new Error("Generative engine returned incomplete design packets. Please try again.");
      }

      setLogo(lData);
      // Trigger instant animated reload
      setSettings(prev => ({ ...prev, key: prev.key + 1 }));
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected issue occurred while drafting details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-hp-ink flex flex-col font-sans selection:bg-hp-blue-bright/10">
      {/* Top Header Navigation Strip */}
      <MainHeader onQuickPreset={handleQuickPreset} />

      {/* Main Interactive App Dashboard Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-8 relative">
        {/* Sleek Chevron background elements mirroring corporate branding */}
        <div className="hidden xl:block absolute -left-12 top-24 w-1 bg-hp-blue transform -skew-x-12 h-64 opacity-20 pointer-events-none"></div>
        <div className="hidden xl:block absolute -right-12 top-24 w-1 bg-hp-blue transform -skew-x-12 h-64 opacity-20 pointer-events-none"></div>

        {/* Hero Section Banner */}
        <div className="w-full bg-white rounded-xl border border-hp-fog p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-xs">
          {/* Accent chevrons as decorative slashes layered into layout borders */}
          <div className="absolute top-0 right-0 h-full w-24 bg-hp-blue/5 transform -skew-x-12 pointer-events-none"></div>
          
          <div className="z-10 max-w-2xl">
            <div className="flex items-center gap-1 mb-2">
              <span className="text-[10px] text-hp-blue font-mono font-bold tracking-widest uppercase bg-hp-blue/10 px-2.5 py-1 rounded">
                AI Custom Vectors
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">· SECURE SERVER-SIDE ENGINE</span>
            </div>
            <h2 className="font-display font-medium text-2xl lg:text-3xl tracking-tight text-hp-ink leading-tight">
              Design Brand Vectors Powered by Gemini AI
            </h2>
            <p className="text-xs md:text-sm text-neutral-500 mt-2 leading-relaxed">
              Describe your core concept or company and choose a stylistic layout. Vector Dynamo will interpret your symbolic motifs and create an animated, layered vector logo tailored perfectly to your brand identity.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <div className="flex flex-col text-right font-mono text-[10px] text-neutral-500 hidden sm:block">
              <span>FORMAT: COMPLIANT SVG</span>
              <span>ENGINE: GEMINI 3.5</span>
            </div>
            <Award className="w-10 h-10 text-hp-blue shrink-0 hidden sm:block animate-bounce" />
          </div>
        </div>

        {/* Error Notification Toast Frame */}
        {error && (
          <div className="p-4 bg-hp-blue/10 border-l-4 border-hp-blue rounded-r text-xs text-hp-ink flex flex-col gap-2 font-sans">
            <div className="flex items-center gap-2 font-bold font-mono text-hp-blue-deep uppercase">
              <Info className="w-4 h-4 shrink-0" /> Generative Error Highlighted:
            </div>
            <p className="leading-relaxed">{error}</p>
            <div className="mt-1 text-[11px] text-neutral-600 flex items-center gap-1.5 leading-normal">
              <span>ProTip: Double-check that your Gemini API Key is entered in the AI Studio <strong>Settings &gt; Secrets</strong> panel under <strong>GEMINI_API_KEY</strong>.</span>
            </div>
          </div>
        )}

        {/* Grid Area linking Form Input and Canvas State */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Controls column */}
          <section className="lg:col-span-5 w-full">
            <Sidebar onGenerate={handleGenerateLogo} loading={loading} initialInfo={info} />
          </section>

          {/* Interactive Logo Stage Column */}
          <section className="lg:col-span-7 w-full flex flex-col gap-6">
            <LogoStage
              logo={logo}
              loading={loading}
              settings={settings}
              onChangeSettings={setSettings}
            />
          </section>
        </div>

        {/* Explainer analysis panel */}
        {logo && !loading && (
          <section className="w-full">
            <ConceptExplainer logo={logo} />
          </section>
        )}
      </main>

      {/* Structured Multi-Column Navy Slab Footer Section */}
      <MainFooter />
    </div>
  );
}
