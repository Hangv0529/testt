import React from 'react';
import { Cpu, Palette, Sparkles, ExternalLink, HelpCircle } from 'lucide-react';

interface MainHeaderProps {
  onQuickPreset: (presetDesc: string, name: string, ind: string, style: any) => void;
}

export default function MainHeader({ onQuickPreset }: MainHeaderProps) {
  return (
    <header className="w-full flex flex-col border-b border-hp-fog bg-white select-none">
      {/* Upper Utility Strip */}
      <div className="w-full bg-hp-ink text-white text-xs py-2 px-4 md:px-8 flex justify-between items-center font-mono tracking-wide">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-hp-blue-bright">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            GEMINI ENGINE COMPATIBLE
          </span>
          <span className="hidden sm:inline text-neutral-400">|</span>
          <span className="hidden sm:inline text-neutral-400">CRAFT LEVEL: VECTOR PRO</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-neutral-300">
          <span className="hover:text-white cursor-pointer transition flex items-center gap-1">
            <Palette className="w-3 w-3" /> System Style Guide
          </span>
          <a
            href="https://ai.studio/build"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition flex items-center gap-0.5"
          >
            AI Studio <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>

      {/* Primary Navigation Row */}
      <div className="w-full h-16 px-4 md:px-8 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Logo Glyph Inspired by Parallel Sharp Slashes */}
          <div className="flex items-center gap-1">
            <div className="w-2.5 h-8 bg-hp-blue transform -skew-x-12 inline-block"></div>
            <div className="w-2.5 h-8 bg-hp-blue transform -skew-x-12 inline-block"></div>
          </div>
          <div>
            <h1 className="font-display font-bold text-lg tracking-tight text-hp-ink flex items-center gap-1.5 leading-none">
              VECTOR DYNAMO
            </h1>
            <p className="text-[10px] text-neutral-500 font-mono tracking-widest mt-0.5">LOGO GENERATOR & ANIMATOR</p>
          </div>
        </div>

        {/* Dynamic Preset Chips */}
        <div className="hidden lg:flex items-center gap-2">
          <span className="text-xs text-neutral-500 font-medium mr-2 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-hp-blue" /> Quick Presets:
          </span>
          <button
            onClick={() => onQuickPreset(
              "A futuristic cybernetic leaf emblem representing eco-friendly data tech.",
              "EcoByte",
              "Green Technology",
              "futuristic"
            )}
            className="text-xs bg-hp-cloud hover:bg-hp-fog border border-hp-fog rounded px-2.5 py-1 text-hp-ink font-sans transition-all cursor-pointer"
          >
            Tech Eco
          </button>
          <button
            onClick={() => onQuickPreset(
              "An elegant, high-class intertwined monogram with standard geometry and fine lines.",
              "Vesper Living",
              "Real Estate & Luxury",
              "minimalist"
            )}
            className="text-xs bg-hp-cloud hover:bg-hp-fog border border-hp-fog rounded px-2.5 py-1 text-hp-ink font-sans transition-all cursor-pointer"
          >
            Luxury Monogram
          </button>
          <button
            onClick={() => onQuickPreset(
              "A vibrant, retro 80s arcade badge structure featuring geometric wings and speed trails.",
              "Neon Pulse",
              "Entertainment & Gaming",
              "retro"
            )}
            className="text-xs bg-hp-cloud hover:bg-hp-fog border border-hp-fog rounded px-2.5 py-1 text-hp-ink font-sans transition-all cursor-pointer"
          >
            Retro Gaming
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-hp-blue-bright/10 text-hp-blue py-1 px-3 rounded text-xs font-mono font-bold flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 animate-spin-slow" /> v2.5 Stable
          </div>
        </div>
      </div>
    </header>
  );
}
