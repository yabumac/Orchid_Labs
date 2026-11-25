import { useState, useEffect } from 'react';
import {
  Search,
  Code,
  Globe,
  Palette,
  Bot,
  Cpu,
  Music,
  Book,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Laptop,
  CheckCircle,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAction: (id: string) => void;
}

const SEARCH_ITEMS = [
  {
    category: 'Capabilities & Services',
    items: [
      { id: 'services', title: 'Autonomous AI Agents', desc: 'Custom reasoning models & task automations', icon: Bot, badge: 'Popular' },
      { id: 'services', title: 'Full-Stack Software Architecture', desc: 'Scalable distributed systems & microservices', icon: Code },
      { id: 'services', title: 'High-Performance Web Apps', desc: 'Next.js, Vite & React 19 web experiences', icon: Globe },
      { id: 'services', title: 'UI/UX & Product Design', desc: 'Design systems, prototyping & micro-interactions', icon: Palette },
      { id: 'services', title: 'Spatial Audio & Sound Design', desc: 'Bespoke mixing, audio branding & soundscapes', icon: Music },
      { id: 'services', title: 'Digital Books & Interactive Reading', desc: 'Editorial typography & digital publishing', icon: Book },
    ],
  },
  {
    category: 'Navigation & Sections',
    items: [
      { id: 'hero', title: 'Hero & 3D Kinetic Sculpture', desc: 'Live parametric ring WebGL experience', icon: Sparkles },
      { id: 'stats', title: 'Orchid Performance Metrics', desc: '150+ projects, 99.8% uptime benchmarks', icon: CheckCircle },
      { id: 'interactive-lab', title: 'The Interactive Studio Lab', desc: 'Live agent simulations & sound visualizer', icon: Laptop, badge: 'Interactive' },
      { id: 'testimonials', title: 'Client Endorsements & Case Studies', desc: 'Trusted by over 80+ forward-thinking teams', icon: Globe },
      { id: 'contact', title: 'Book a Consultation / Start Project', desc: 'Get in touch with Orchid Labs engineering', icon: ArrowRight },
    ],
  },
];

export const SearchDialog = ({ open, onOpenChange, onSelectAction }: SearchDialogProps) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  const filteredCategories = SEARCH_ITEMS.map((cat) => ({
    ...cat,
    items: cat.items.filter(
      (item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.desc.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((cat) => cat.items.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[620px] p-0 overflow-hidden border border-border/70 shadow-2xl bg-background/95 backdrop-blur-xl">
        <DialogHeader className="sr-only">
          <DialogTitle>Search Orchid Labs</DialogTitle>
        </DialogHeader>

        {/* Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-border/60">
          <Search className="w-5 h-5 text-muted-foreground mr-3 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search capabilities, labs, case studies, or press ↵ to jump..."
            className="w-full bg-transparent text-sm sm:text-base outline-none placeholder:text-muted-foreground/60 text-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted border border-border/80 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-[360px] overflow-y-auto p-2 space-y-4">
          {filteredCategories.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No results found for &ldquo;<span className="text-foreground font-medium">{query}</span>&rdquo;
            </div>
          ) : (
            filteredCategories.map((group) => (
              <div key={group.category}>
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {group.category}
                </div>
                <div className="space-y-1 mt-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.title}
                        onClick={() => {
                          onSelectAction(item.id);
                          onOpenChange(false);
                          setQuery('');
                        }}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-muted/80 text-left transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground truncate flex items-center gap-2">
                              {item.title}
                              {item.badge && (
                                <span className="px-1.5 py-0.2 text-[10px] font-semibold rounded-full bg-orchid-primary/15 text-orchid-primary">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">{item.desc}</div>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="px-4 py-2.5 bg-muted/40 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span>Navigation: <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px]">↑</kbd> <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px]">↓</kbd></span>
            <span>Select: <kbd className="px-1.5 py-0.5 bg-background rounded border text-[10px]">↵</kbd></span>
          </div>
          <span className="font-mono text-orchid-secondary">Orchid Labs Search v2.5</span>
        </div>
      </DialogContent>
    </Dialog>
  );
};
