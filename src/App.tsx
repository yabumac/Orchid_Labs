import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Code,
  Globe,
  Palette,
  Bot,
  Cpu,
  Music,
  Book,
  Layout,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  Mail,
  MessageSquare,
  Twitter,
  Linkedin,
  Github,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Send,
  Sparkles,
  Quote,
  GraduationCap,
  Play,
  Zap,
  ShieldCheck,
  Layers,
  Search,
  ExternalLink,
} from 'lucide-react';

import { GlassNavbar } from './components/GlassNavbar';
import { Toaster } from './components/ui/sonner';
import { LiquidBackground } from './components/LiquidBackground';
import { KineticSculpture } from './components/3d/KineticSculpture';
import { InteractiveStudioLab } from './components/InteractiveStudioLab';
import { FeaturedWorks } from './components/FeaturedWorks';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import logo from './assets/favicon.png';

// --- DATA STRUCTURES ---

const services = [
  {
    title: 'Autonomous AI Agents',
    category: 'Cognitive Systems',
    desc: 'Self-improving agentic workflows, memory consolidation, and autonomous multi-agent task execution.',
    icon: Bot,
    highlights: ['Multi-agent orchestration', 'Vector RAG integration', 'Sub-50ms reasoning'],
  },
  {
    title: 'Scalable Software Engineering',
    category: 'Core Engineering',
    desc: 'Distributed backends engineered for massive concurrency, strict fault tolerance, and zero downtime.',
    icon: Code,
    highlights: ['Microservice architecture', 'Real-time telemetry', 'High-throughput APIs'],
  },
  {
    title: 'Modern Web & 3D Platforms',
    category: 'Spatial Web',
    desc: 'Ultra-fast web platforms infused with interactive WebGL, Three.js 3D kinetic visuals, and sub-second FCP.',
    icon: Globe,
    highlights: ['Three.js & WebGL', 'React 19 & Next.js', 'Sub-0.3s Core Web Vitals'],
  },
  {
    title: 'UI/UX & Design Systems',
    category: 'Product Craft',
    desc: 'Bespoke design tokens, design systems, and fluid micro-interactions built through research-driven craft.',
    icon: Palette,
    highlights: ['Enterprise design systems', 'Motion choreography', 'Accessible WCAG AAA'],
  },
  {
    title: 'Intelligent Bot Workflows',
    category: 'Automation',
    desc: 'Context-aware conversation agents that streamline operations, handle complex queries, and integrate with CRM.',
    icon: Cpu,
    highlights: ['24/7 autonomous copilot', 'Custom tool calling', 'Enterprise security'],
  },
  {
    title: 'Music & Spatial Sound Design',
    category: 'Audio Engineering',
    desc: 'Audio synthesis, Dolby Atmos spatial soundscapes, procedural audio, and sonic identity for digital media.',
    icon: Music,
    highlights: ['96kHz / 32-bit float', 'Spatial binaural mixing', 'Web Audio DSP'],
  },
  {
    title: 'Digital Books & Publishing',
    category: 'Editorial Systems',
    desc: 'End-to-end interactive digital monographs and e-book publishing engineered for high-typography reading.',
    icon: Book,
    highlights: ['Tactile page layout', 'Adaptive hyphenation', 'Multi-device responsive'],
  },
  {
    title: 'AI Course Curriculum Design',
    category: 'EdTech & Learning',
    desc: 'Interactive digital learning platforms and AI-assisted pedagogy for impactful executive education.',
    icon: GraduationCap,
    highlights: ['Dynamic learning paths', 'Interactive quizzes', 'Adaptive student pacing'],
  },
  {
    title: 'Book UI & Publication Design',
    category: 'Editorial UI',
    desc: 'Bespoke publication interface architecture for both tactile digital and luxury print presentations.',
    icon: Layout,
    highlights: ['Golden-ratio grids', 'Custom typography systems', 'Fluid layout engine'],
  },
  {
    title: 'Strategic Tech Consulting',
    category: 'Advisory',
    desc: 'Fractional CTO guidance, architectural audits, AI roadmaps, and digital transformation for executives.',
    icon: Lightbulb,
    highlights: ['Architectural reviews', 'AI integration roadmap', 'Tech debt remediation'],
  },
];

const stats = [
  { label: 'Projects Shipped', value: '150', suffix: '+', note: 'Global deployments' },
  { label: 'Enterprise Clients', value: '80', suffix: '+', note: 'Worldwide partners' },
  { label: 'Edge Latency', value: '12', suffix: 'ms', note: 'Global average TTFB' },
  { label: 'Uptime Reliability', value: '99.98', suffix: '%', note: 'Production SLA' },
];

const partnerLogos = [
  { name: 'GoDaddy', label: 'GoDaddy' },
  { name: 'BONOBOS', label: 'BONOBOS' },
  { name: 'STRIPE', label: 'Stripe' },
  { name: 'HUCKBERRY', label: 'Huckberry' },
  { name: 'VERCEL', label: 'Vercel' },
  { name: 'LINEAR', label: 'Linear' },
  { name: 'SUPABASE', label: 'Supabase' },
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechVentures',
    company: 'TechVentures Global',
    content: 'Orchid Labs completely transformed our digital infrastructure. Their team delivered a platform that exceeded every expectation—scalable, beautiful, and remarkably fast.',
    stats: '+240% Speed Increase',
  },
  {
    name: 'Marcus Chen',
    role: 'CTO, DataFlow Systems',
    company: 'DataFlow Cloud',
    content: 'The autonomous AI agent workflows Orchid Labs built for us have revolutionized customer operations. Intelligent, responsive, and adaptive with zero downtime.',
    stats: '12ms Response Latency',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Creative Director, PixelPerfect',
    company: 'PixelPerfect Media',
    content: 'Working with Orchid Labs was a masterclass in craft. Their 3D web interfaces and typography elevated our brand perception into a category of its own.',
    stats: 'Awwwards Site of the Day',
  },
  {
    name: 'James Wilson',
    role: 'Founder, LearnSphere',
    company: 'LearnSphere Digital',
    content: 'Our interactive curriculum platform went from concept to 50k active students effortlessly. Orchid Labs understood our vision and engineered it with surgical precision.',
    stats: '50k+ Active Students',
  },
  {
    name: 'Aisha Patel',
    role: 'Head of Product, CloudScale',
    company: 'CloudScale Networks',
    content: 'Professional, innovative, and deeply collaborative. Orchid Labs does not just ship software—they establish an architectural foundation that scales for years.',
    stats: '99.99% Reliability',
  },
];

const values = [
  { title: 'Autonomous Intelligence', desc: 'Engineering systems that learn, adapt, and reason independently with strict guardrails.', icon: Bot },
  { title: 'Radical Craft', desc: 'Relentless attention to pixel precision, typographic rhythm, and tactile micro-motion.', icon: Sparkles },
  { title: 'Zero-Latency Core', desc: 'Edge-distributed microservices and optimized rendering that respond in milliseconds.', icon: Zap },
  { title: 'Uncompromising Security', desc: 'Bank-grade encryption, immutable audit trails, and strict data privacy compliance.', icon: ShieldCheck },
];

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  service: z.string().min(1, 'Please select a service'),
  budget: z.string().min(1, 'Please select a budget range'),
  timeline: z.string().min(1, 'Please select a timeline'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactForm = z.infer<typeof contactSchema>;

const scrollTo = (id: string) => {
  const el = document.getElementById(id.replace('#', ''));
  el?.scrollIntoView({ behavior: 'smooth' });
};

// --- ANIMATED COUNTER ---

const AnimatedCounter = ({ target, suffix = '' }: { target: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseFloat(target);

  useEffect(() => {
    const isDecimal = target.includes('.');
    const duration = 1200;
    const steps = 40;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [numericTarget, target]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

// --- HERO SECTION ---

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[95vh] flex items-center pt-28 pb-16 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Bold Editorial Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 sm:space-y-7 z-10"
          >
            {/* Category / Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-muted/80 backdrop-blur-md border border-border/80 text-foreground text-xs font-mono uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-orchid-primary animate-pulse" />
              <span>Orchid Labs // Next-Gen Studio</span>
            </div>

            {/* Main Headline (Inspired by Spree Commerce bold confident style) */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.08]">
              An open-architecture engineering studio giving you{' '}
              <span className="liquid-text">full control & radical intelligence.</span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              We architect custom autonomous AI agents, ultra-fast 3D web platforms, bespoke publication interfaces, and spatial audio systems for forward-thinking enterprises.
            </p>

            {/* Action CTA Pills Group */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Primary Pill Button */}
              <button
                onClick={() => scrollTo('contact')}
                className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Secondary Demo Button */}
              <button
                onClick={() => scrollTo('interactive-lab')}
                className="px-6 py-3 rounded-full bg-muted/70 hover:bg-muted border border-border/80 text-foreground font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer group"
              >
                <Play className="w-3.5 h-3.5 fill-orchid-secondary text-orchid-secondary group-hover:scale-110 transition-transform" />
                <span>See interactive demo</span>
              </button>
            </div>

            {/* Social Proof / Partner Brand Bar */}
            <div className="pt-6 sm:pt-8 border-t border-border/60">
              <div className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground mb-4">
                TRUSTED BY VISIONARY TEAMS & BRANDS WORLDWIDE
              </div>
              <div className="flex flex-wrap items-center gap-6 sm:gap-8 opacity-75 dark:opacity-60">
                {partnerLogos.map((brand) => (
                  <span
                    key={brand.name}
                    className="font-bold text-sm tracking-widest text-foreground/80 hover:text-orchid-primary transition-colors cursor-default"
                  >
                    {brand.name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live Interactive 3D Parametric Ring + Overlaid Spree-style Release Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            {/* 3D WebGL Canvas Component */}
            <div className="w-full relative">
              <KineticSculpture />

              {/* Overlaid Floating Release Badge Card (Direct Reference to Spree 5 Card in video!) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                onClick={() => scrollTo('interactive-lab')}
                className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 p-4 sm:p-5 rounded-2xl bg-background/90 backdrop-blur-xl border border-border/80 shadow-2xl hover:border-orchid-primary/50 transition-all cursor-pointer group max-w-[240px] sm:max-w-[270px]"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight liquid-text leading-none">
                    2.5
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="font-bold text-sm text-foreground group-hover:text-orchid-primary transition-colors leading-snug">
                  Orchid 2.5
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  Autonomous Agent Engine & Kinetic 3D Architecture
                </div>
                <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] font-semibold text-foreground group-hover:text-orchid-primary transition-colors">
                  <span>Explore Sandbox</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- STATS BAR ---

const Stats = () => (
  <section id="stats" className="py-12 sm:py-16 px-4 sm:px-6 border-y border-border/60 bg-muted/20">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-4 sm:p-6 rounded-2xl bg-card/60 backdrop-blur-md border border-border/60">
            <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight liquid-text mb-1">
              <AnimatedCounter target={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-xs sm:text-sm font-bold text-foreground mt-1">{stat.label}</div>
            <div className="text-[11px] text-muted-foreground font-mono mt-0.5">{stat.note}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- SERVICES & CAPABILITIES MATRIX ---

const Services = () => {
  return (
    <section id="services" className="py-24 sm:py-32 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/70 text-xs font-mono uppercase tracking-wider text-orchid-secondary mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
              Engineered for <span className="liquid-text">Radical Performance</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md leading-relaxed">
            From cognitive multi-agent orchestration to spatial 3D interfaces, our multidisciplinary collective covers the entire spectrum of modern digital innovation.
          </p>
        </div>

        {/* 10 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-6 sm:p-7 rounded-3xl bg-card/70 backdrop-blur-lg border border-border/70 hover:border-orchid-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-orchid-primary/10 text-orchid-primary flex items-center justify-center group-hover:bg-orchid-primary group-hover:text-white transition-all shadow-xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground px-2.5 py-1 rounded-full bg-muted border border-border/60">
                      {service.category}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-orchid-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                {/* Highlights */}
                <div className="pt-4 border-t border-border/60 space-y-1.5">
                  {service.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orchid-secondary shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- ABOUT SECTION ---

const About = () => (
  <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 border-t border-border/60 bg-muted/10 relative">
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: Philosophy & Values */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/70 text-xs font-mono uppercase tracking-wider text-orchid-secondary">
            <Layers className="w-3.5 h-3.5" />
            <span>Our Philosophy</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight">
            Crafting the <span className="liquid-text">Next Frontier</span> of Digital Reality
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Orchid Labs operates at the intersection of cognitive AI engineering, high-craft aesthetics, and distributed systems. We do not build generic templates—we architect bespoke digital flagships that give founders and enterprises total technological autonomy.
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-4">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="p-4 rounded-2xl bg-card border border-border/60 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-orchid-primary/10 text-orchid-primary flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-foreground">{v.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="pt-2">
            <button
              onClick={() => scrollTo('contact')}
              className="px-6 py-3 rounded-full bg-foreground text-background font-semibold text-sm inline-flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <span>Partner with Our Collective</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Studio Imagery / Editorial Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-card group">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=900"
              alt="Orchid Labs Studio"
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-background/85 backdrop-blur-xl border border-border/80">
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-mono font-bold text-foreground">Orchid Collective // San Francisco</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Engineers, sound designers, AI researchers, and editorial typographers operating globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- TESTIMONIALS SECTION ---

const Testimonials = () => (
  <section id="testimonials" className="py-24 sm:py-32 px-4 sm:px-6 relative">
    <div className="max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/70 text-xs font-mono uppercase tracking-wider text-orchid-secondary mb-3">
          <Quote className="w-3.5 h-3.5" />
          <span>Proven Impact</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
          Trusted by <span className="liquid-text">World-Class Teams</span>
        </h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Read how Orchid Labs empowers enterprises to ship category-defining digital experiences.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="p-6 sm:p-7 rounded-3xl bg-card/70 backdrop-blur-lg border border-border/70 hover:border-orchid-primary/40 transition-all duration-300 flex flex-col justify-between shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/15 text-emerald-500">
                  {t.stats}
                </span>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6">
                &ldquo;{t.content}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orchid-primary to-orchid-accent flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs">
                {t.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-sm text-foreground">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- INTERACTIVE CONTACT & ESTIMATOR SECTION ---

const Contact = () => {
  const [selectedService, setSelectedService] = useState('Autonomous AI Agents');
  const [selectedBudget, setSelectedBudget] = useState('$25k - $50k');
  const [selectedTimeline, setSelectedTimeline] = useState('1 - 3 Months');

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      service: 'Autonomous AI Agents',
      budget: '$25k - $50k',
      timeline: '1 - 3 Months',
      message: '',
    },
  });

  const onSubmit = (data: ContactForm) => {
    toast.success('Consultation request received!', {
      description: `Thank you ${data.name}. Our engineering partner will respond within 24 hours.`,
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-4 sm:px-6 border-t border-border/60 bg-muted/15 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted/80 border border-border/70 text-xs font-mono uppercase tracking-wider text-orchid-secondary mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a Project</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            Let&rsquo;s Engineer <span className="liquid-text">Your Vision</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Select your project parameters below to get an instant scope estimate and initiate consultation.
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-3xl bg-card/90 backdrop-blur-2xl border border-border/80 shadow-2xl p-6 sm:p-10 md:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Parameter 1: Service Type Selection Pills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  1. What service do you require?
                </label>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Autonomous AI Agents',
                    '3D & Web Platform',
                    'Software Architecture',
                    'UI/UX Design Systems',
                    'Spatial Audio',
                    'Digital Publishing',
                  ].map((s) => {
                    const isSelected = selectedService === s;
                    return (
                      <button
                        type="button"
                        key={s}
                        onClick={() => {
                          setSelectedService(s);
                          form.setValue('service', s);
                        }}
                        className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-foreground text-background border-foreground shadow-xs'
                            : 'bg-muted/60 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Parameter 2: Budget Tier Selection Pills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  2. Anticipated Budget Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {['$15k - $30k', '$30k - $60k', '$60k - $120k', '$120k+ Enterprise'].map((b) => {
                    const isSelected = selectedBudget === b;
                    return (
                      <button
                        type="button"
                        key={b}
                        onClick={() => {
                          setSelectedBudget(b);
                          form.setValue('budget', b);
                        }}
                        className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-foreground text-background border-foreground shadow-xs'
                            : 'bg-muted/60 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {b}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Parameter 3: Timeline Pills */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  3. Timeline Target
                </label>
                <div className="flex flex-wrap gap-2">
                  {['< 1 Month (Sprint)', '1 - 3 Months', '3 - 6 Months', 'Ongoing Retainer'].map((t) => {
                    const isSelected = selectedTimeline === t;
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => {
                          setSelectedTimeline(t);
                          form.setValue('timeline', t);
                        }}
                        className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                          isSelected
                            ? 'bg-foreground text-background border-foreground shadow-xs'
                            : 'bg-muted/60 border-border text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid sm:grid-cols-2 gap-5 pt-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">Your Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Elena Vance" {...field} className="rounded-xl h-11 bg-muted/40 border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-medium">Work Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="elena@company.com" type="email" {...field} className="rounded-xl h-11 bg-muted/40 border-border" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-medium">Project Brief & Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about the architecture, key requirements, and expected launch date..."
                        className="rounded-xl min-h-[120px] bg-muted/40 border-border resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full py-4 rounded-full bg-foreground text-background font-semibold text-sm hover:opacity-90 active:scale-[0.99] transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Engineering</span>
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER SECTION ---

const FooterSection = () => (
  <footer className="py-16 px-4 sm:px-6 border-t border-border/60 bg-background text-foreground">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-14">
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl overflow-hidden bg-gradient-to-br from-orchid-primary to-orchid-accent flex items-center justify-center p-0.5">
              <img src={logo} alt="Orchid Labs" className="w-full h-full object-cover rounded-lg" />
            </div>
            <span className="font-bold text-lg tracking-tight">Orchid Labs</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-muted text-muted-foreground border border-border">
              v2.5
            </span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
            A full-service multidisciplinary technology & design collective crafting autonomous systems, spatial 3D web platforms, and digital masterpieces.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono text-muted-foreground">All Core Systems Operational</span>
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
            Capabilities
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-foreground transition-colors">Autonomous AI Agents</a></li>
            <li><a href="#services" className="hover:text-foreground transition-colors">Software Engineering</a></li>
            <li><a href="#services" className="hover:text-foreground transition-colors">3D & Web Platforms</a></li>
            <li><a href="#services" className="hover:text-foreground transition-colors">UI/UX Design Systems</a></li>
            <li><a href="#services" className="hover:text-foreground transition-colors">Spatial Audio Studio</a></li>
          </ul>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
            Exploration
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#interactive-lab" className="hover:text-foreground transition-colors">Interactive Sandbox</a></li>
            <li><a href="#works" className="hover:text-foreground transition-colors">Selected Works</a></li>
            <li><a href="#about" className="hover:text-foreground transition-colors">Our Collective</a></li>
            <li><a href="#testimonials" className="hover:text-foreground transition-colors">Client Endorsements</a></li>
            <li><a href="#contact" className="hover:text-foreground transition-colors">Book Consultation</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4 className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4 font-semibold">
            Direct Line
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:hello@orchidlabs.com" className="hover:text-foreground transition-colors">hello@orchidlabs.com</a></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub Repository</a></li>
            <li><a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Twitter / X</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a></li>
          </ul>
        </div>
      </div>

      <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <div>&copy; {new Date().getFullYear()} Orchid Labs Collective. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="#hero" className="hover:text-foreground transition-colors">Security Architecture</a>
          <a href="#hero" className="hover:text-foreground transition-colors">Back to Top ↑</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- MAIN APPLICATION ---

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orchid-primary/30 selection:text-foreground overflow-x-hidden">
        <LiquidBackground />
        <GlassNavbar />
        <Toaster position="bottom-right" richColors />
        <main className="relative z-0">
          <Hero />
          <Stats />
          <FeaturedWorks />
          <InteractiveStudioLab />
          <Services />
          <About />
          <Testimonials />
          <Contact />
        </main>
        <FooterSection />
      </div>
    </ThemeProvider>
  );
}

export default App;
