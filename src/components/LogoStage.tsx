import React, { useState, useEffect } from 'react';
import { LogoDesign, VectorElement, AnimationSettings } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  RotateCcw,
  Copy,
  Download,
  Inspect,
  Eye,
  Settings,
  Flame,
  Gauge,
  Check,
  CodeXml,
  Compass
} from 'lucide-react';

interface LogoStageProps {
  logo: LogoDesign | null;
  loading: boolean;
  settings: AnimationSettings;
  onChangeSettings: (newSettings: AnimationSettings) => void;
}

export default function LogoStage({ logo, loading, settings, onChangeSettings }: LogoStageProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'interactive' | 'raw-code'>('interactive');
  const [hoveredElement, setHoveredElement] = useState<VectorElement | null>(null);
  const [activeAnimStyle, setActiveAnimStyle] = useState<string>('');

  // Settle default AI style on initial logo load
  useEffect(() => {
    if (logo) {
      setActiveAnimStyle(logo.suggestedAnimationType);
    }
  }, [logo]);

  if (loading) {
    return (
      <div className="w-full bg-[#fcfcfc] rounded-xl border border-hp-fog shadow-sm h-[480px] flex flex-col items-center justify-center p-8 select-none relative overflow-hidden">
        {/* Decorative HP Sharp Blue Slash Background Panels */}
        <div className="absolute top-0 left-0 w-24 h-full bg-hp-blue/5 transform -skew-x-21 -translate-x-12 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-24 h-full bg-hp-blue/5 transform -skew-x-21 translate-x-12 pointer-events-none"></div>

        <div className="w-16 h-16 relative flex items-center justify-center">
          <div className="absolute inset-0 border-4 border-hp-blue/10 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-hp-blue border-t-transparent rounded-full animate-spin"></div>
          <Compass className="w-6 h-6 text-hp-blue animate-pulse" />
        </div>

        <div className="text-center mt-6 z-10">
          <h3 className="font-display font-semibold text-hp-ink text-base">Synthesizing Creative Directions</h3>
          <p className="text-xs text-neutral-500 font-mono mt-1 max-w-sm mx-auto leading-relaxed animate-pulse">
            Formulating professional vector curves, balancing golden ratios, and rendering modular interactive SVG animations...
          </p>
        </div>

        {/* Dynamic Mock Loading Progress Bar */}
        <div className="w-64 bg-hp-fog h-1.5 rounded-full mt-6 overflow-hidden">
          <div className="bg-hp-blue h-full rounded-full animate-loading-bar" style={{ width: '80%' }}></div>
        </div>
      </div>
    );
  }

  if (!logo) {
    return (
      <div className="w-full bg-hp-cloud rounded-xl border border-hp-fog p-8 h-[480px] flex flex-col items-center justify-center text-center select-none relative overflow-hidden">
        {/* Sleek architectural visual styling background slashes */}
        <div className="absolute -left-12 top-0 h-full w-4 bg-hp-blue transform -skew-x-12 opacity-10"></div>
        <div className="absolute -right-12 top-0 h-full w-4 bg-hp-blue transform -skew-x-12 opacity-10"></div>

        <div className="p-4 bg-white rounded-full border border-hp-fog shadow-sm text-neutral-400 mb-4 animate-bounce">
          <CodeXml className="w-8 h-8 text-hp-blue" />
        </div>
        <h3 className="font-display font-medium text-hp-ink text-lg">No Logo Generative Content Ready</h3>
        <p className="text-xs text-neutral-500 max-w-sm mt-1 leading-relaxed">
          Fill in your brand parameters on the left and select <strong className="text-hp-ink font-semibold">&quot;Design Logo Concept&quot;</strong>. Google Gemini will instantly invent custom vector layers and fluid motion trajectories.
        </p>
      </div>
    );
  }

  // Trigger remount to replay animations
  const handleReplay = () => {
    onChangeSettings({
      ...settings,
      key: settings.key + 1
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(logo.rawSvg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadSvgFile = () => {
    const element = document.createElement("a");
    const file = new Blob([logo.rawSvg], { type: 'image/svg+xml' });
    element.href = URL.createObjectURL(file);
    element.download = `${logo.title.toLowerCase().replace(/\s+/g, "_")}_logo.svg`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Maps custom groups to delay ratios and multipliers
  const getAnimationProps = (group: string) => {
    const baseMultiplier = 1 / settings.speedMultiplier;
    let delay = 0;
    
    switch (group) {
      case 'background':
        delay = 0;
        break;
      case 'main-graphic':
        delay = 0.3;
        break;
      case 'accent-accent':
        delay = 0.8;
        break;
      case 'brand-text':
        delay = 1.1;
        break;
      case 'sub-text':
        delay = 1.4;
        break;
      default:
        delay = 0.5;
    }

    const duration = 1.2 * baseMultiplier;

    // Determine initial state and animated state based on chosen active animation style
    let initialConfig: any = {};
    let animateConfig: any = {};
    let transitionConfig: any = {
      delay: delay * baseMultiplier,
      duration,
      ease: [0.16, 1, 0.3, 1], // Custom cubic-bezier for a smooth responsive curve
    };

    const style = activeAnimStyle || logo.suggestedAnimationType;

    if (style === 'sketch-draw') {
      initialConfig = { pathLength: 0, opacity: 0, fillOpacity: 0 };
      animateConfig = { pathLength: 1, opacity: 1, fillOpacity: 1 };
      transitionConfig = {
        ...transitionConfig,
        fillOpacity: { delay: (delay + 0.6) * baseMultiplier, duration: 0.8 }
      };
    } else if (style === 'scale-pop') {
      initialConfig = { scale: 0, opacity: 0, transformOrigin: 'center' };
      animateConfig = { scale: 1, opacity: 1 };
      transitionConfig = {
        ...transitionConfig,
        type: 'spring',
        stiffness: 140,
        damping: 14,
      };
    } else if (style === 'rotate-reveal') {
      initialConfig = { rotate: -120, scale: 0.5, opacity: 0, transformOrigin: 'center' };
      animateConfig = { rotate: 0, scale: 1, opacity: 1 };
      transitionConfig = {
        ...transitionConfig,
        type: 'spring',
        stiffness: 100,
        damping: 12,
      };
    } else if (style === 'morph-elastic') {
      initialConfig = { scaleX: 0, scaleY: 0, opacity: 0, transformOrigin: 'center' };
      animateConfig = { scaleX: 1, scaleY: 1, opacity: 1 };
      transitionConfig = {
        ...transitionConfig,
        type: 'spring',
        stiffness: 160,
        damping: 10,
      };
    } else {
      // slide-fade (Standard)
      initialConfig = { y: 30, opacity: 0 };
      animateConfig = { y: 0, opacity: 1 };
    }

    // Configure infinity custom repeats if continuous loop is active
    if (settings.playbackMode === 'infinite') {
      animateConfig = {
        ...animateConfig,
        transition: {
          ...transitionConfig,
          repeat: Infinity,
          repeatType: 'reverse',
          repeatDelay: 0.5
        }
      };
    } else if (settings.playbackMode === 'loop') {
      animateConfig = {
        ...animateConfig,
        transition: {
          ...transitionConfig,
          repeat: Infinity,
          repeatType: 'loop',
          repeatDelay: 1.5
        }
      };
    } else {
      animateConfig = {
        ...animateConfig,
        transition: transitionConfig
      };
    }

    return { initial: initialConfig, animate: animateConfig };
  };

  return (
    <div className="w-full flex flex-col gap-4 select-none">
      {/* Top Title Strip & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 border border-hp-fog rounded-xl">
        <div>
          <span className="text-[10px] text-hp-blue font-mono font-bold uppercase tracking-wider bg-hp-blue/10 px-2 py-0.5 rounded">
            Design Outcome
          </span>
          <h2 className="font-display font-semibold text-hp-ink text-base mt-1.5 flex items-center gap-1.5">
            {logo.title}
          </h2>
          <p className="text-xs text-neutral-500 font-sans italic">&ldquo;{logo.tagline}&rdquo;</p>
        </div>

        {/* Presentation tabs */}
        <div className="flex bg-hp-cloud p-1 rounded-lg border border-hp-fog self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1 text-xs rounded font-sans transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'interactive'
                ? 'bg-white shadow-sm text-hp-ink font-semibold'
                : 'text-neutral-500 hover:text-hp-ink'
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Interactive Playback
          </button>
          <button
            onClick={() => setActiveTab('raw-code')}
            className={`px-3 py-1 text-xs rounded font-sans transition-all flex items-center gap-1 cursor-pointer ${
              activeTab === 'raw-code'
                ? 'bg-white shadow-sm text-hp-ink font-semibold'
                : 'text-neutral-500 hover:text-hp-ink'
            }`}
          >
            <CodeXml className="w-3.5 h-3.5" /> SVG Code
          </button>
        </div>
      </div>

      {/* Main Canvas & Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Canvas stage Area */}
        <div className="lg:col-span-8 bg-white border border-hp-fog rounded-xl overflow-hidden shadow-sm flex flex-col items-center justify-center p-6 relative min-h-[440px]">
          {/* Slashes background behind vector logo */}
          <div className="absolute top-0 left-0 w-16 h-full bg-hp-cloud transform -skew-x-12 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-16 h-full bg-hp-cloud transform -skew-x-12 pointer-events-none"></div>

          {activeTab === 'interactive' ? (
            <div className="w-full max-w-[360px] aspect-square relative z-10 flex items-center justify-center bg-transparent rounded-lg p-2">
              <AnimatePresence mode="popLayout">
                <svg
                  key={settings.key}
                  viewBox="0 0 500 500"
                  className="w-full h-full drop-shadow-sm select-none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {logo.vectorElements.map((el, i) => {
                    const anim = getAnimationProps(el.animationGroup);

                    // Core styling parameters derived from API or model output
                    const baseStyle = {
                      cursor: 'pointer',
                      transition: 'stroke 0.2s, stroke-width 0.2s, transform 0.2s',
                    };

                    const isHovered = hoveredElement?.id === el.id;

                    const elementClass = isHovered 
                      ? "stroke-hp-blue stroke-[3px] scale-[1.01] origin-center shadow-lg" 
                      : "";

                    const strokeColor = isHovered ? '#024ad8' : (el.props.stroke || 'none');
                    const strokeWidthValue = isHovered ? (el.props.strokeWidth ? el.props.strokeWidth + 1.5 : 2.5) : (el.props.strokeWidth || 0);

                    // Dynamic element rendering
                    if (el.type === 'path') {
                      return (
                        <motion.path
                          key={`${el.id}-${i}`}
                          d={el.props.d || ''}
                          fill={el.props.fill || 'none'}
                          stroke={strokeColor}
                          strokeWidth={strokeWidthValue}
                          strokeDasharray={el.props.strokeDasharray || undefined}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          transform={el.props.transform && el.props.transform !== 'none' ? el.props.transform : undefined}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={baseStyle}
                        />
                      );
                    }

                    if (el.type === 'circle') {
                      return (
                        <motion.circle
                          key={`${el.id}-${i}`}
                          cx={el.props.cx !== undefined ? el.props.cx : 250}
                          cy={el.props.cy !== undefined ? el.props.cy : 250}
                          r={el.props.r !== undefined ? el.props.r : 20}
                          fill={el.props.fill || 'none'}
                          stroke={strokeColor}
                          strokeWidth={strokeWidthValue}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          transform={el.props.transform && el.props.transform !== 'none' ? el.props.transform : undefined}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={baseStyle}
                        />
                      );
                    }

                    if (el.type === 'rect') {
                      return (
                        <motion.rect
                          key={`${el.id}-${i}`}
                          x={el.props.x !== undefined ? el.props.x : 0}
                          y={el.props.y !== undefined ? el.props.y : 0}
                          width={el.props.width !== undefined ? el.props.width : 50}
                          height={el.props.height !== undefined ? el.props.height : 50}
                          fill={el.props.fill || 'none'}
                          stroke={strokeColor}
                          strokeWidth={strokeWidthValue}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          transform={el.props.transform && el.props.transform !== 'none' ? el.props.transform : undefined}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={baseStyle}
                        />
                      );
                    }

                    if (el.type === 'polygon') {
                      return (
                        <motion.polygon
                          key={`${el.id}-${i}`}
                          points={el.props.points || ''}
                          fill={el.props.fill || 'none'}
                          stroke={strokeColor}
                          strokeWidth={strokeWidthValue}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          transform={el.props.transform && el.props.transform !== 'none' ? el.props.transform : undefined}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={baseStyle}
                        />
                      );
                    }

                    if (el.type === 'ellipse') {
                      return (
                        <motion.ellipse
                          key={`${el.id}-${i}`}
                          cx={el.props.cx !== undefined ? el.props.cx : 250}
                          cy={el.props.cy !== undefined ? el.props.cy : 250}
                          rx={el.props.rx !== undefined ? el.props.rx : 20}
                          ry={el.props.ry !== undefined ? el.props.ry : 10}
                          fill={el.props.fill || 'none'}
                          stroke={strokeColor}
                          strokeWidth={strokeWidthValue}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          transform={el.props.transform && el.props.transform !== 'none' ? el.props.transform : undefined}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={baseStyle}
                        />
                      );
                    }

                    if (el.type === 'text') {
                      return (
                        <motion.text
                          key={`${el.id}-${i}`}
                          x={el.props.x !== undefined ? el.props.x : 250}
                          y={el.props.y !== undefined ? el.props.y : 250}
                          fill={el.props.fill || '#1a1a1a'}
                          stroke={strokeColor}
                          strokeWidth={strokeWidthValue}
                          fontSize={el.props.fontSize || 16}
                          fontWeight={el.props.fontWeight || 'normal'}
                          fontFamily={el.props.fontFamily || 'sans-serif'}
                          textAnchor={el.props.textAnchor || 'middle'}
                          transform={el.props.transform && el.props.transform !== 'none' ? el.props.transform : undefined}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={{
                            ...baseStyle,
                            fontFamily: el.props.fontFamily || 'Inter, var(--font-sans)',
                          }}
                        >
                          {el.props.textContent || ''}
                        </motion.text>
                      );
                    }

                    if (el.type === 'line') {
                      return (
                        <motion.line
                          key={`${el.id}-${i}`}
                          x1={el.props.x || 0}
                          y1={el.props.y || 0}
                          x2={el.props.width || 0} // Using width as x2 fallback
                          y2={el.props.height || 0} // Using height as y2 fallback
                          stroke={strokeColor || '#1a1a1a'}
                          strokeWidth={strokeWidthValue || 1}
                          opacity={el.props.opacity !== undefined ? el.props.opacity : 1}
                          initial={anim.initial}
                          animate={anim.animate}
                          onMouseEnter={() => setFormFactor(el)}
                          onMouseLeave={() => setHoveredElement(null)}
                          className={elementClass}
                          style={baseStyle}
                        />
                      );
                    }

                    return null;
                  })}
                </svg>
              </AnimatePresence>
            </div>
          ) : (
            <div className="w-full h-full font-mono text-[10px] text-hp-ink bg-hp-cloud border border-hp-fog rounded p-4 overflow-y-auto max-h-[380px] leading-relaxed relative z-10 selection:bg-hp-blue-bright/10">
              <pre className="whitespace-pre-wrap select-text">{logo.rawSvg}</pre>
            </div>
          )}

          {/* Interactive Live Element inspect Banner inside canvas */}
          {activeTab === 'interactive' && (
            <div className="absolute bottom-4 left-4 right-4 bg-hp-ink/90 text-white p-3 rounded-lg flex items-center justify-between text-[11px] font-mono select-none z-20 shadow">
              {hoveredElement ? (
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-hp-blue-bright font-bold">
                    <Inspect className="w-3.5 h-3.5" /> INSPECTOR:
                  </span>
                  <span>ID: <strong className="text-white font-semibold">{hoveredElement.id}</strong></span>
                  <span className="text-neutral-400">|</span>
                  <span>Group: <strong className="text-emerald-400 font-semibold">{hoveredElement.animationGroup}</strong></span>
                </div>
              ) : (
                <span className="text-neutral-400 flex items-center gap-1.5 font-sans">
                  <Inspect className="w-3.5 h-3.5 text-hp-blue-bright animate-pulse" /> Hover elements on the canvas above to inspect paths and layers context
                </span>
              )}
              {hoveredElement && (
                <span className="text-neutral-400 font-normal">
                  Type: {hoveredElement.type.toUpperCase()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Animation & Action Controls Sidebar */}
        <div className="lg:col-span-4 bg-[#fcfcfc] border border-hp-fog rounded-xl p-5 flex flex-col justify-between max-w-full overflow-hidden">
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-bold text-xs text-hp-ink tracking-wide uppercase font-mono flex items-center gap-1.5">
              <Settings className="w-3.5 h-3.5 text-hp-blue" /> Motion Controls
            </h3>

            {/* Animation Style Overrides */}
            <div>
              <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-widest font-mono mb-2">
                Active Physics Style
              </label>
              <div className="flex flex-col gap-1.5">
                {[
                  { value: 'sketch-draw', label: 'Outline Sketch' },
                  { value: 'scale-pop', label: 'Bouncy Scale Pop' },
                  { value: 'slide-fade', label: 'Slide Stagger' },
                  { value: 'rotate-reveal', label: 'Orbit Rotator' },
                  { value: 'morph-elastic', label: 'Elastic Shift' }
                ].map(item => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveAnimStyle(item.value);
                      handleReplay();
                    }}
                    className={`text-xs text-left px-3 py-2 rounded border cursor-pointer flex justify-between items-center transition-all ${
                      activeAnimStyle === item.value
                        ? 'border-hp-blue bg-hp-blue/5 text-hp-blue font-semibold scale-[1.01]'
                        : 'border-hp-fog bg-white text-hp-ink hover:bg-neutral-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {activeAnimStyle === item.value && <Flame className="w-3.5 h-3.5 text-hp-blue animate-pulse" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Speeds HUD Selection */}
            <div>
              <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-widest font-mono mb-2">
                Playback Speed Multiplier
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { value: 0.5, label: '0.5x' },
                  { value: 1.0, label: '1.0x' },
                  { value: 1.5, label: '1.5x' },
                  { value: 2.0, label: '2.0x' }
                ].map(v => (
                  <button
                    key={v.value}
                    onClick={() => {
                      onChangeSettings({ ...settings, speedMultiplier: v.value });
                    }}
                    className={`py-1.5 text-xs text-center rounded border font-mono cursor-pointer transition ${
                      settings.speedMultiplier === v.value
                        ? 'bg-hp-ink text-white font-bold border-hp-ink'
                        : 'bg-white text-neutral-600 border-hp-fog hover:bg-neutral-50'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Playback Mode (Continuous vs Once) */}
            <div>
              <label className="block text-[10px] font-semibold text-neutral-500 uppercase tracking-widest font-mono mb-2">
                Loop Trajectory
              </label>
              <select
                value={settings.playbackMode}
                onChange={e => {
                  onChangeSettings({ ...settings, playbackMode: e.target.value as any });
                }}
                className="w-full px-3 py-2 text-xs bg-white text-hp-ink border border-hp-steel rounded focus:border-hp-blue focus:outline-none transition font-sans"
              >
                <option value="once">Animate Once (On Load / Play)</option>
                <option value="infinite">Infinity Reverse (continuous)</option>
                <option value="loop">Standard Continuous Repeat</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            {/* Quick Actions Triggers */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleReplay}
                className="py-2 px-3 text-xs border border-hp-blue text-hp-blue font-mono font-bold uppercase tracking-wider rounded bg-white hover:bg-hp-blue/5 transition flex items-center justify-center gap-1 ml-auto w-full cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay
              </button>
              <button
                onClick={downloadSvgFile}
                className="py-2 px-3 text-xs bg-hp-blue hover:bg-hp-blue-bright text-white font-mono font-bold uppercase tracking-wider rounded shadow transition flex items-center justify-center gap-1 mr-auto w-full cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" /> Download
              </button>
            </div>

            <button
              onClick={copyToClipboard}
              className={`w-full py-2.5 text-xs font-mono font-bold uppercase tracking-widest rounded transition flex items-center justify-center gap-1.5 cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-hp-cloud text-hp-ink hover:bg-hp-fog border border-hp-fog'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Copied SVG XML!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Raw SVG Code
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function setFormFactor(el: VectorElement) {
    setHoveredElement(el);
  }
}
