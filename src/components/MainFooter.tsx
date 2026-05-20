import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Github, Sparkles, Layers, Sliders, Play } from 'lucide-react';

export default function MainFooter() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "How does Vector Dynamo generate actual animated logos?",
      a: "Our app uses the powerful Gemini-3.5-Flash model on the server to design a distinct, high-quality vector geometry outline based on your company story. It returns both a raw responsive SVG code block and an array of individual geometric path entries. This structured format allows our client-side engine to hook directly into Framer Motion, applying independent, staggered, fluid animations to each path segment."
    },
    {
      q: "Can I customize the animation patterns beyond the AI recommendations?",
      a: "Yes! While Gemini automatically analyzes your industry to recommend the perfect movement type (e.g. Sketch Drawing for art, Elastic Morphing for startups, or Scale Pop for consumer products), you can fully override this. Use the control HUD below the preview canvas to adjust animation style presets, speed multipliers, and trigger continuous loops or manual resets."
    },
    {
      q: "Can I copy the SVG or export it to design tools?",
      a: "Absolutely. Once the logo is generated, we provide a structured clipboard copy utility for the full vector XML string, and an immediate download trigger to capture your custom Logo as a file. It is standard vector code ready to be dragged directly into tools like Figma, Illustrator, or Sketch."
    },
    {
      q: "Are these logos unique to my inputs?",
      a: "Yes. By feeding your precise company description, intended color palette, and chosen thematic style mode into our server-side system instruction prompt, Gemini invents a custom configuration of paths, fonts, and angles tailormade for your brand story, rather than pulling from fixed template files."
    }
  ];

  return (
    <footer className="w-full bg-hp-ink text-white select-none pt-12 mt-12 border-t border-hp-fog">
      {/* Testimonial & Value Statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-neutral-800">
        <div className="lg:col-span-4 flex flex-col justify-center">
          <div className="flex items-center gap-1 mb-4">
            <div className="w-2.5 h-6 bg-hp-blue-bright transform -skew-x-12 inline-block"></div>
            <div className="w-2.5 h-6 bg-hp-blue-bright transform -skew-x-12 inline-block"></div>
          </div>
          <h3 className="font-display font-medium text-2xl tracking-tight text-white mb-2">
            Why Vector Animation Matters
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Standard flat image logos lack dynamic presence in modern digital media. An animated svg captures instant attention inside loading screens, nav bars, mobile intros, and email signatures.
          </p>
        </div>

        {/* Feature grid */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <div className="p-2 bg-hp-blue/20 text-hp-blue-bright w-max rounded-md mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-sans font-semibold text-sm mb-1 text-white">Gemini Design Brain</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Synthesizes custom visual icons, layout scales, and conceptual palettes directly matching the company description.
            </p>
          </div>

          <div className="p-5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <div className="p-2 bg-hp-blue/20 text-hp-blue-bright w-max rounded-md mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-sans font-semibold text-sm mb-1 text-white">Element-by-Element Vector Split</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Parses elements into background accent, main graphic focus, fine highlight, and brand typography layers.
            </p>
          </div>

          <div className="p-5 bg-neutral-900/50 rounded-xl border border-neutral-800">
            <div className="p-3 bg-hp-blue/20 text-hp-blue-bright w-max rounded-md mb-2">
              <Sliders className="w-4 h-4" />
            </div>
            <h4 className="font-sans font-semibold text-sm mb-1 text-white">Interactive Frame Physics</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Provides control over speeds (0.5x to 2x), playback loops, styling presets, and hover element inspection.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Dropdown Sections */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h3 className="font-display font-medium text-xl text-center text-white mb-6 flex items-center justify-center gap-2">
          <HelpCircle className="w-5 h-5 text-hp-blue-bright" /> Frequently Asked Questions
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-neutral-800 rounded-lg overflow-hidden bg-neutral-950 transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 text-left font-sans font-medium text-sm text-neutral-200 hover:text-white transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-hp-blue-bright" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-neutral-900 pt-3 bg-neutral-900/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Fine-print / HP-like credit strip */}
      <div className="w-full bg-black py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 font-sans gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-widest text-[9px] text-neutral-400">VECTOR DYNAMO UNIT</span>
            <span>© 2026. Designed using Google Gemini for developer ecosystems.</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Statement</span>
            <span>·</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Use</span>
            <span>·</span>
            <span className="hover:text-neutral-300 cursor-pointer">SVG Validation System</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
