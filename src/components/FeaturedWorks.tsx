import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ArrowRight, Sparkles, Layers, Cpu, Globe, Music, Book } from 'lucide-react';

interface Project {
  title: string;
  category: 'ai' | 'web3d' | 'editorial' | 'audio';
  categoryLabel: string;
  description: string;
  stats: string;
  tags: string[];
  image: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    title: 'Aether Flow: Autonomous Reasoning Copilot',
    category: 'ai',
    categoryLabel: 'Cognitive AI',
    description: 'Enterprise multi-agent system executing recursive reasoning, autonomous code analysis, and live customer resolution pipelines.',
    stats: '12ms Latency • 99.4% Accuracy',
    tags: ['Python', 'Multi-Agent', 'Vector RAG', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Veloce: Kinetic Spatial Commerce Platform',
    category: 'web3d',
    categoryLabel: '3D & Web Architecture',
    description: 'Sub-second headless digital flagship powered by Three.js interactive 3D product visualizers and globally cached edge routes.',
    stats: '0.28s FCP • +184% Conversions',
    tags: ['React 19', 'Three.js', 'WebGL', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Lumina Reader: Editorial Digital Monograph',
    category: 'editorial',
    categoryLabel: 'Digital Books & UI',
    description: 'Bespoke publication interface featuring fluid editorial typography, adaptive hyphenation, and tactile interactive reading experiences.',
    stats: '45k Readers • Design Award Winner',
    tags: ['Editorial UI', 'Typography', 'ePub Engine'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1000',
  },
  {
    title: 'Harmonic Studio: Spatial Audio Synthesizer',
    category: 'audio',
    categoryLabel: 'Audio Engineering',
    description: 'Web Audio API generative synthesizer producing procedural soundscapes, binaural 3D acoustics, and sonic branding kits.',
    stats: '96kHz Fidelity • Real-time DSP',
    tags: ['Web Audio API', 'DSP', 'Sound Design', 'Dolby Atmos'],
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1000',
  },
];

export const FeaturedWorks = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'web3d' | 'editorial' | 'audio'>('all');

  const filteredProjects = activeFilter === 'all'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section id="works" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/70 text-xs font-mono uppercase tracking-wider text-orchid-secondary mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Engineered with <span className="liquid-text">High Precision</span>
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-muted/80 backdrop-blur-md border border-border/80">
            {[
              { id: 'all', label: 'All Works' },
              { id: 'ai', label: 'AI & Agents' },
              { id: 'web3d', label: '3D & Web' },
              { id: 'editorial', label: 'Publishing' },
              { id: 'audio', label: 'Audio Lab' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setActiveFilter(f.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === f.id
                    ? 'bg-foreground text-background shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="group relative rounded-3xl bg-card border border-border/80 overflow-hidden shadow-lg hover:shadow-2xl hover:border-orchid-primary/40 transition-all duration-500 flex flex-col"
              >
                {/* Image preview with dark gradient */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />

                  {/* Category Pill Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-border/70 text-xs font-medium text-foreground">
                      {project.categoryLabel}
                    </span>
                  </div>

                  {/* Live Stats Badge */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-md border border-emerald-500/30 text-emerald-500 text-xs font-mono font-medium">
                      {project.stats}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-orchid-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-2.5">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech stack tag pills */}
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-muted text-muted-foreground border border-border/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-foreground group-hover:text-background transition-all shrink-0 ml-3">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
