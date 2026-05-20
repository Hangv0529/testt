import React, { useState } from 'react';
import { CompanyInfo } from '../types';
import { Sparkles, ArrowRight, Palette, Layers, Eye, Cpu, AlignLeft } from 'lucide-react';

interface SidebarProps {
  onGenerate: (info: CompanyInfo) => void;
  loading: boolean;
  initialInfo: CompanyInfo;
}

const STYLES = [
  { value: 'minimalist', label: 'Minimalist', desc: 'Clean paths, heavy negative space, modern line alignment.' },
  { value: 'geometric', label: 'Geometric', desc: 'Symmetrical grids, golden ratios, precise interlocking vectors.' },
  { value: 'retro', label: 'Retro Badge', desc: 'Vintage warm colors, circular border texturing, nostalgia.' },
  { value: 'futuristic', label: 'Futuristic', desc: 'Velocity slashes, sleek sharp corners, cybernetic layout.' },
  { value: 'organic', label: 'Organic', desc: 'Humanistic curves, flowing drops/leafs, natural energy.' },
  { value: 'corporate', label: 'Trust Corporate', desc: 'Solid shields, reliable corporate curves, monograms.' },
];

const COLORS = [
  { value: 'ai', label: 'AI Discretion', hex: 'bg-gradient-to-r from-violet-500 to-indigo-500' },
  { value: '#024ad8', label: 'Electric Blue', hex: 'bg-[#024ad8]' },
  { value: '#0d9488', label: 'Ocean Teal', hex: 'bg-[#0d9488]' },
  { value: '#f97316', label: 'Coral Sunset', hex: 'bg-[#f97316]' },
  { value: '#a855f7', label: 'Cyber Neon Purple', hex: 'bg-[#a855f7]' },
  { value: '#eab308', label: 'Royal Amber', hex: 'bg-[#eab308]' },
];

export default function Sidebar({ onGenerate, loading, initialInfo }: SidebarProps) {
  const [form, setForm] = useState<CompanyInfo>(initialInfo);

  React.useEffect(() => {
    setForm(initialInfo);
  }, [initialInfo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.companyName.trim()) return;
    onGenerate(form);
  };

  const handlePresetText = (desc: string, label: string) => {
    setForm(prev => ({
      ...prev,
      description: desc,
      companyName: prev.companyName || label
    }));
  };

  return (
    <div className="w-full bg-white rounded-xl border border-hp-fog shadow-sm p-6 flex flex-col gap-6">
      <div className="flex items-center gap-2 pb-4 border-b border-hp-fog">
        <Sparkles className="w-5 h-5 text-hp-blue" />
        <div>
          <h2 className="font-display font-medium text-base text-hp-ink">Brand Parameters</h2>
          <p className="text-[11px] text-neutral-500 font-mono">DESCRIBE YOUR VISION</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Company Name */}
        <div>
          <label className="block text-xs font-semibold text-hp-ink tracking-wide mb-1.5 uppercase font-mono">
            Company Name *
          </label>
          <input
            type="text"
            required
            value={form.companyName}
            onChange={e => setForm(prev => ({ ...prev, companyName: e.target.value }))}
            placeholder="e.g. Apex Aero"
            className="w-full px-3 py-2.5 text-xs bg-white text-hp-ink border border-hp-steel rounded focus:border-hp-blue focus:outline-none transition-all placeholder:text-neutral-400 font-sans"
          />
        </div>

        {/* Industry */}
        <div>
          <label className="block text-xs font-semibold text-hp-ink tracking-wide mb-1.5 uppercase font-mono">
            Industry / Domain
          </label>
          <input
            type="text"
            value={form.industry}
            onChange={e => setForm(prev => ({ ...prev, industry: e.target.value }))}
            placeholder="e.g. Clean Energy, Software, Organic Coffee"
            className="w-full px-3 py-2.5 text-xs bg-white text-hp-ink border border-hp-steel rounded focus:border-hp-blue focus:outline-none transition-all placeholder:text-neutral-400 font-sans"
          />
        </div>

        {/* Description & Core Idea */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-xs font-semibold text-hp-ink tracking-wide uppercase font-mono">
              Logo Concept & Symbols
            </label>
            <span className="text-[10px] text-hp-blue-bright font-medium hover:underline cursor-pointer" onClick={() => handlePresetText("An abstract shield carrying an elegant infinity symbol wrapped in clean geometric circuits.", "Infinity Shield")}>
              Insert Template
            </span>
          </div>
          <textarea
            rows={4}
            value={form.description}
            onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe any particular shapes or core ideas (e.g. 'A dynamic eagle swooping down' or 'The stylized letter M with mountain contours under three stars')."
            className="w-full px-3 py-2.5 text-xs bg-white text-hp-ink border border-hp-steel rounded focus:border-hp-blue focus:outline-none transition-all placeholder:text-neutral-400 resize-none leading-relaxed font-sans"
          />
        </div>

        {/* Style Selector */}
        <div>
          <label className="block text-xs font-semibold text-hp-ink tracking-wide mb-2 uppercase font-mono">
            Design Language Preset
          </label>
          <div className="grid grid-cols-2 gap-2">
            {STYLES.map(st => (
              <button
                key={st.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, style: st.value as any }))}
                className={`p-2.5 text-left border rounded transition-all cursor-pointer ${
                  form.style === st.value
                    ? 'border-hp-blue bg-hp-blue/5 shadow-sm'
                    : 'border-hp-fog bg-hp-cloud hover:bg-hp-fog'
                }`}
              >
                <div className="font-sans font-semibold text-xs text-hp-ink">{st.label}</div>
                <div className="text-[10px] text-neutral-500 leading-tight mt-0.5 line-clamp-2">{st.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette Choice */}
        <div>
          <label className="block text-xs font-semibold text-hp-ink tracking-wide mb-2 uppercase font-mono">
            Accent Brand Color Tone
          </label>
          <div className="flex flex-wrap gap-2">
            {COLORS.map(col => (
              <button
                key={col.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, accentColor: col.value }))}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs rounded border cursor-pointer transition-all ${
                  form.accentColor === col.value
                    ? 'border-hp-blue bg-hp-blue/5 font-semibold text-hp-blue'
                    : 'border-hp-fog bg-hp-cloud text-hp-ink'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${col.hex} border border-neutral-300`}></span>
                <span className="text-[11px] font-sans">{col.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Generate Button with interactive CSS indicators */}
        <button
          type="submit"
          disabled={loading || !form.companyName.trim()}
          className={`w-full h-11 rounded font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer select-none ${
            loading || !form.companyName.trim()
              ? 'bg-hp-steel text-white cursor-not-allowed'
              : 'bg-hp-blue text-white hover:bg-hp-blue-bright active:bg-hp-blue-deep'
          }`}
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Drafting Guidelines...</span>
            </>
          ) : (
            <>
              <Cpu className="w-4 h-4 animate-pulse" />
              <span>Design Logo Concept</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Suggestion hints footer block */}
      <div className="rounded bg-hp-cloud p-3.5 border border-hp-fog mt-2">
        <h4 className="font-sans font-bold text-[11px] text-hp-ink flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-hp-blue" />
          Prototyping Tips:
        </h4>
        <p className="text-[10px] text-neutral-500 leading-normal mt-1">
          For mono-symbol initials, select <strong className="text-hp-ink font-semibold">Geometric</strong> or <strong className="text-hp-ink font-semibold">Minimalist</strong>. For illustrative stories, write descriptive keywords like &quot;globe waves&quot; or &quot;rocket vector line&quot;.
        </p>
      </div>
    </div>
  );
}
