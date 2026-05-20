import React, { useState } from 'react';
import { LogoDesign } from '../types';
import { Info, Sparkles, Eye, Clipboard, Check, Paintbrush, BookOpen, Quote, ChevronRight } from 'lucide-react';

interface ConceptExplainerProps {
  logo: LogoDesign | null;
}

export default function ConceptExplainer({ logo }: ConceptExplainerProps) {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  if (!logo) return null;

  const copyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 1500);
  };

  return (
    <div className="w-full bg-hp-cloud rounded-xl border border-hp-fog shadow-sm p-6 flex flex-col gap-6">
      {/* Header section with designer symbol */}
      <div className="flex items-center gap-2 pb-4 border-b border-hp-fog">
        <Sparkles className="w-5 h-5 text-hp-blue" />
        <div>
          <h2 className="font-display font-medium text-base text-hp-ink">Identity & Concept Rationale</h2>
          <p className="text-[11px] text-neutral-500 font-mono">INSIGHT & SYMBOLISM ANALYSIS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Designer Quote & Paragraph */}
        <div className="md:col-span-8 flex flex-col gap-4">
          <div className="flex gap-2">
            <Quote className="w-8 h-8 text-hp-blue opacity-20 shrink-0" />
            <h3 className="font-display font-semibold text-hp-ink text-base pt-1">
              {logo.title} Designer Notes
            </h3>
          </div>
          
          <div className="text-xs text-neutral-600 leading-relaxed font-sans whitespace-pre-line pl-10 border-l border-hp-fog">
            {logo.explanation}
          </div>

          <div className="pl-10 mt-2 flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono">
            <BookOpen className="w-3.5 h-3.5 text-neutral-400" /> Suggested Type Pairing: Inter Display / Space Grotesk Bold
          </div>
        </div>

        {/* Color Palette Information panel */}
        <div className="md:col-span-4 bg-white rounded-lg border border-hp-fog p-5 flex flex-col gap-4 shadow-xs">
          <h4 className="font-sans font-bold text-xs text-hp-ink uppercase tracking-wider font-mono flex items-center gap-1.5 border-b border-hp-fog pb-2">
            <Paintbrush className="w-4 h-4 text-hp-blue" /> Generated Palette
          </h4>

          <div className="flex flex-col gap-3">
            {/* Primary Color Card */}
            <div className="flex items-center justify-between gap-2 p-2 bg-hp-cloud rounded border border-hp-fog hover:bg-neutral-50 transition">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded border border-neutral-300 shadow-xs shrink-0"
                  style={{ backgroundColor: logo.primaryColor }}
                ></div>
                <div>
                  <div className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-widest leading-none">Primary</div>
                  <div className="text-xs font-semibold text-hp-ink font-mono mt-1">{logo.primaryColor}</div>
                </div>
              </div>
              <button
                onClick={() => copyColor(logo.primaryColor)}
                className="p-1 px-2 text-[10px] font-mono hover:bg-white border border-transparent hover:border-hp-fog rounded transition"
              >
                {copiedColor === logo.primaryColor ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  'Copy'
                )}
              </button>
            </div>

            {/* Secondary Color Card */}
            <div className="flex items-center justify-between gap-2 p-2 bg-hp-cloud rounded border border-hp-fog hover:bg-neutral-50 transition">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded border border-neutral-300 shadow-xs shrink-0"
                  style={{ backgroundColor: logo.secondaryColor }}
                ></div>
                <div>
                  <div className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-widest leading-none">Secondary</div>
                  <div className="text-xs font-semibold text-hp-ink font-mono mt-1">{logo.secondaryColor}</div>
                </div>
              </div>
              <button
                onClick={() => copyColor(logo.secondaryColor)}
                className="p-1 px-2 text-[10px] font-mono hover:bg-white border border-transparent hover:border-hp-fog rounded transition"
              >
                {copiedColor === logo.secondaryColor ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  'Copy'
                )}
              </button>
            </div>

            {/* Accent Color Card */}
            <div className="flex items-center justify-between gap-2 p-2 bg-hp-cloud rounded border border-hp-fog hover:bg-neutral-50 transition">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded border border-neutral-300 shadow-xs shrink-0"
                  style={{ backgroundColor: logo.accentColor }}
                ></div>
                <div>
                  <div className="text-[10px] font-bold font-mono text-neutral-400 uppercase tracking-widest leading-none">Accent Accent</div>
                  <div className="text-xs font-semibold text-hp-ink font-mono mt-1">{logo.accentColor}</div>
                </div>
              </div>
              <button
                onClick={() => copyColor(logo.accentColor)}
                className="p-1 px-2 text-[10px] font-mono hover:bg-white border border-transparent hover:border-hp-fog rounded transition"
              >
                {copiedColor === logo.accentColor ? (
                  <Check className="w-3 h-3 text-emerald-600" />
                ) : (
                  'Copy'
                )}
              </button>
            </div>
          </div>

          <div className="rounded bg-hp-cloud/60 text-[10px] text-neutral-500 leading-normal p-2.5 mt-1 border border-hp-fog flex gap-1.5 items-start">
            <Info className="w-3.5 h-3.5 text-hp-blue shrink-0 mt-0.5" />
            <span>These colors have been scientifically selected with high-contrast accessibility standards in mind.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
