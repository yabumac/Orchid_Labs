import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot,
  Play,
  RotateCcw,
  CheckCircle2,
  Cpu,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  Zap,
  Terminal,
  Activity,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const InteractiveStudioLab = () => {
  const [activeTab, setActiveTab] = useState<'agent' | 'audio' | 'benchmark'>('agent');

  // Agent Lab State
  const [agentRunning, setAgentRunning] = useState(false);
  const [agentStep, setAgentStep] = useState(0);
  const [selectedTask, setSelectedTask] = useState('agent-dispatch');

  const AGENT_TASKS = {
    'agent-dispatch': {
      title: 'Autonomous Multi-Agent Workflow',
      desc: 'Orchestrating 4 specialized agents across memory, web verification & code synthesis',
      steps: [
        { label: 'Initializing cognitive runtime & context window', time: '12ms', status: 'done' },
        { label: 'Querying vector embeddings & memory recall', time: '34ms', status: 'done' },
        { label: 'Executing parallel tool calling: Web retrieval & Code analysis', time: '82ms', status: 'running' },
        { label: 'Synthesizing output with zero-shot validation', time: '110ms', status: 'pending' },
        { label: 'Pipeline verified: Output ready for production delivery', time: '135ms', status: 'pending' },
      ],
    },
    'latency-optimize': {
      title: 'Real-Time Edge Latency Tuning',
      desc: 'Benchmarking global CDN edge functions & caching warm-starts',
      steps: [
        { label: 'Probing global edge nodes (US-East, EU-Central, AP-South)', time: '8ms', status: 'done' },
        { label: 'Warm-start cache verification: 100% hit rate', time: '15ms', status: 'done' },
        { label: 'Optimizing serialized payloads & state hydration', time: '22ms', status: 'running' },
        { label: 'Global TTFB confirmed: 14ms average', time: '38ms', status: 'pending' },
      ],
    },
  };

  // Audio Lab State
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioFreq, setAudioFreq] = useState<number[]>([40, 65, 80, 50, 95, 75, 60, 85, 90, 45, 70, 55]);

  useEffect(() => {
    let interval: any;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setAudioFreq(Array.from({ length: 12 }, () => Math.floor(Math.random() * 75) + 25));
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  const runAgentSimulation = () => {
    if (agentRunning) return;
    setAgentRunning(true);
    setAgentStep(0);

    const timer1 = setTimeout(() => setAgentStep(1), 600);
    const timer2 = setTimeout(() => setAgentStep(2), 1300);
    const timer3 = setTimeout(() => setAgentStep(3), 2000);
    const timer4 = setTimeout(() => {
      setAgentStep(4);
      setAgentRunning(false);
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  };

  return (
    <section id="interactive-lab" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orchid-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/70 text-xs font-mono uppercase tracking-wider text-orchid-secondary mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Orchid Lab Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Test Our Technology <span className="liquid-text">In Real-Time</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Experience the interactive tools and architectural speed that define Orchid Labs.
            Test our autonomous agent dispatcher, explore spatial soundwaves, and benchmark edge performance.
          </p>
        </div>

        {/* Tab Switcher Pills */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-full bg-muted/80 backdrop-blur-md border border-border/80 shadow-md">
            {[
              { id: 'agent', label: 'AI Agent Runtime', icon: Bot },
              { id: 'audio', label: 'Spatial Sound Lab', icon: Volume2 },
              { id: 'benchmark', label: 'Architecture Benchmarks', icon: Gauge },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-foreground text-background shadow-md'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Workspace Container */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-card/80 backdrop-blur-xl border border-border/80 shadow-2xl overflow-hidden">
          {/* Top terminal bar */}
          <div className="px-6 py-3.5 border-b border-border/70 bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">orchid-lab-cluster // v2.5.0-live</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cluster Online</span>
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            {/* TAB 1: AI AGENT RUNTIME */}
            {activeTab === 'agent' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Autonomous Multi-Agent Dispatcher</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Simulate high-throughput autonomous agent orchestration with sub-100ms reasoning.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={runAgentSimulation}
                      disabled={agentRunning}
                      className="px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer disabled:opacity-50"
                    >
                      {agentRunning ? (
                        <>
                          <Activity className="w-4 h-4 animate-spin text-orchid-primary" />
                          <span>Dispatching...</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" />
                          <span>Run Agent Pipeline</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Simulated Steps Progress */}
                <div className="rounded-2xl bg-muted/50 border border-border/60 p-5 space-y-3 font-mono text-xs">
                  {AGENT_TASKS['agent-dispatch'].steps.map((s, idx) => {
                    const isPassed = agentStep >= idx;
                    const isCurrent = agentStep === idx && agentRunning;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                          isPassed
                            ? 'bg-background border border-border/80 text-foreground shadow-xs'
                            : 'opacity-40 text-muted-foreground'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {isPassed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-border/80 shrink-0" />
                          )}
                          <span className={isCurrent ? 'text-orchid-primary font-bold' : ''}>
                            {s.label}
                          </span>
                        </div>
                        <span className="text-[11px] text-muted-foreground">{s.time}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Performance Highlights */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <div className="text-xs text-muted-foreground font-mono">TOKEN THROUGHPUT</div>
                    <div className="text-xl font-bold text-foreground mt-1">185 t/s</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <div className="text-xs text-muted-foreground font-mono">STEP LATENCY</div>
                    <div className="text-xl font-bold text-emerald-500 mt-1">18ms</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <div className="text-xs text-muted-foreground font-mono">ZERO-SHOT ACCURACY</div>
                    <div className="text-xl font-bold text-foreground mt-1">99.4%</div>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <div className="text-xs text-muted-foreground font-mono">CONCURRENCY</div>
                    <div className="text-xl font-bold text-orchid-primary mt-1">10,000+</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SPATIAL AUDIO LAB */}
            {activeTab === 'audio' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">Spatial Audio Synthesizer & Sound Waves</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Live interactive 12-band harmonic frequency visualizer crafted for bespoke media & sound branding.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
                  >
                    {isPlayingAudio ? (
                      <>
                        <VolumeX className="w-4 h-4" />
                        <span>Mute Oscillator</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4" />
                        <span>Start Frequency Wave</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 12-Band Frequency Equalizer Visualization */}
                <div className="h-48 sm:h-56 rounded-2xl bg-muted/40 border border-border/60 p-6 flex items-end justify-between gap-2 sm:gap-4 overflow-hidden relative">
                  {audioFreq.map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-orchid-primary via-orchid-secondary to-orchid-accent"
                      animate={{ height: `${isPlayingAudio ? height : 15}%` }}
                      transition={{ duration: 0.12, ease: 'easeOut' }}
                    />
                  ))}
                  {!isPlayingAudio && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-xs">
                      <span className="text-xs font-mono text-muted-foreground px-4 py-2 rounded-full bg-background border border-border">
                        Click &ldquo;Start Frequency Wave&rdquo; to simulate live sonic spectrum
                      </span>
                    </div>
                  )}
                </div>

                {/* Sound Engineering Parameters */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <span className="text-xs font-mono text-muted-foreground">SAMPLE RATE</span>
                    <div className="text-lg font-bold text-foreground mt-1">96 kHz / 32-bit Float</div>
                    <span className="text-[11px] text-muted-foreground">Pristine broadcast fidelity</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <span className="text-xs font-mono text-muted-foreground">SPATIAL CHANNELS</span>
                    <div className="text-lg font-bold text-orchid-primary mt-1">7.1.4 Dolby Atmos Ready</div>
                    <span className="text-[11px] text-muted-foreground">Binaural 3D head-tracking</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-muted/30 border border-border/60">
                    <span className="text-xs font-mono text-muted-foreground">SOUND DESIGN SUITE</span>
                    <div className="text-lg font-bold text-foreground mt-1">Custom DSP Plugins</div>
                    <span className="text-[11px] text-muted-foreground">Real-time procedural audio</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: BENCHMARK COMPARISONS */}
            {activeTab === 'benchmark' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-foreground">Orchid High-Performance Architecture</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Real-world benchmarks comparing Orchid Labs next-gen stack against conventional monoliths.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { metric: 'Global Time to First Byte (TTFB)', orchid: '12ms', legacy: '180ms', speedup: '15x faster' },
                    { metric: 'First Contentful Paint (FCP)', orchid: '0.28s', legacy: '1.95s', speedup: '7x faster' },
                    { metric: 'Cold Start Latency', orchid: '0ms (Edge Warm)', legacy: '650ms', speedup: 'Zero Cold Start' },
                    { metric: 'Lighthouse Performance Score', orchid: '100 / 100', legacy: '68 / 100', speedup: '+32 pts' },
                  ].map((row) => (
                    <div key={row.metric} className="p-4 rounded-2xl bg-muted/30 border border-border/60 space-y-2">
                      <div className="flex justify-between items-center text-xs font-medium text-foreground">
                        <span>{row.metric}</span>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 font-mono font-bold text-[11px]">
                          {row.speedup}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-1">
                        <div className="p-2.5 rounded-xl bg-background border border-emerald-500/30">
                          <span className="text-[10px] font-mono text-emerald-500 uppercase font-bold">Orchid Labs Engine</span>
                          <div className="text-sm sm:text-base font-bold text-foreground">{row.orchid}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/60 border border-border/40">
                          <span className="text-[10px] font-mono text-muted-foreground uppercase">Conventional Stack</span>
                          <div className="text-sm sm:text-base font-medium text-muted-foreground">{row.legacy}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
