import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Github,
  Sun,
  Moon,
  ChevronDown,
  Plus,
  ArrowRight,
  Code,
  Globe,
  Palette,
  Bot,
  Music,
  Book,
  Sparkles,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import logo from '../assets/favicon.png';
import { SearchDialog } from './SearchDialog';

interface NavDropdownItem {
  title: string;
  desc: string;
  icon: any;
  href: string;
  badge?: string;
}

interface NavSection {
  name: string;
  items: NavDropdownItem[];
}

const NAV_MENUS: Record<string, NavDropdownItem[]> = {
  Capabilities: [
    { title: 'AI & Autonomous Agents', desc: 'Self-improving agent workflows and cognitive engines', icon: Bot, href: '#services', badge: 'Next-Gen' },
    { title: 'Software Engineering', desc: 'Scalable cloud backends and high-concurrency systems', icon: Code, href: '#services' },
    { title: 'Modern Web Architecture', desc: 'Ultra-fast React 19, Three.js, and interactive frontends', icon: Globe, href: '#services' },
    { title: 'UI/UX & Product Design', desc: 'Pixel-perfect digital products and design systems', icon: Palette, href: '#services' },
    { title: 'Music & Spatial Audio', desc: 'Audio engineering, sonic branding, and synthesis', icon: Music, href: '#services' },
    { title: 'Digital Books & Publishing', desc: 'High-craft digital literature and publication design', icon: Book, href: '#services' },
  ],
  Solutions: [
    { title: 'Enterprise Modernization', desc: 'Migrate legacy architectures to modern serverless infrastructure', icon: Sparkles, href: '#about' },
    { title: 'AI Agent Automations', desc: 'Deploy 24/7 intelligent operational copilots for business', icon: Bot, href: '#interactive-lab' },
    { title: 'Interactive Web & 3D', desc: 'Elevate brand presence with WebGL and spatial interaction', icon: Globe, href: '#hero' },
  ],
  Studio: [
    { title: 'The Interactive Lab', desc: 'Hands-on interactive agent and sound visualizers', icon: Sparkles, href: '#interactive-lab', badge: 'Live Demo' },
    { title: 'About Our Collective', desc: 'Engineers, designers, and researchers pushing limits', icon: Code, href: '#about' },
    { title: 'Client Stories & Proof', desc: 'Proven impact for over 80+ companies worldwide', icon: Globe, href: '#testimonials' },
  ],
};

const scrollTo = (href: string) => {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export const GlassNavbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2.5 sm:py-3.5' : 'py-4 sm:py-5'
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between transition-all duration-300 px-4 sm:px-6 py-2.5 rounded-full ${
              scrolled
                ? 'bg-background/85 backdrop-blur-xl border border-border/70 shadow-lg shadow-black/5 dark:shadow-black/30'
                : 'bg-background/60 backdrop-blur-md border border-border/40'
            }`}
          >
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => scrollTo('#hero')}
                className="flex items-center gap-2.5 group cursor-pointer text-left"
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden border border-amber-400/25 bg-[#071a25] flex items-center justify-center p-0.5 shadow-sm group-hover:scale-105 transition-transform">
                  <img src={logo} alt="Orchid Labs" className="w-full h-full object-contain" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base sm:text-lg tracking-tight text-foreground group-hover:text-orchid-primary transition-colors">
                    Orchid Labs
                  </span>
                  <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border/60">
                    v2.5
                  </span>
                </div>
              </button>

              {/* Center Navigation Items with Spree-like pill style & dropdowns */}
              <div className="hidden lg:flex items-center gap-1">
                {Object.keys(NAV_MENUS).map((menuName) => {
                  const isOpen = activeMenu === menuName;
                  return (
                    <div
                      key={menuName}
                      className="relative"
                      onMouseEnter={() => setActiveMenu(menuName)}
                    >
                      <button
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer border ${
                          isOpen
                            ? 'bg-muted border-border text-foreground'
                            : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border/60'
                        }`}
                      >
                        <span>{menuName}</span>
                        <Plus
                          className={`w-3 h-3 text-muted-foreground/70 transition-transform duration-200 ${
                            isOpen ? 'rotate-45 text-foreground' : ''
                          }`}
                        />
                      </button>

                      {/* Dropdown Flyout Card */}
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 6, scale: 0.98 }}
                            transition={{ duration: 0.16, ease: 'easeOut' }}
                            className="absolute top-full left-0 mt-3 w-80 sm:w-96 rounded-2xl bg-background/95 backdrop-blur-2xl border border-border/80 shadow-2xl p-2.5 z-50"
                          >
                            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 py-1.5 mb-1">
                              {menuName} Overview
                            </div>
                            <div className="space-y-1">
                              {NAV_MENUS[menuName].map((item) => {
                                const Icon = item.icon;
                                return (
                                  <button
                                    key={item.title}
                                    onClick={() => {
                                      scrollTo(item.href);
                                      setActiveMenu(null);
                                    }}
                                    className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-muted/70 text-left transition-colors group cursor-pointer"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-orchid-primary/10 text-orchid-primary flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-orchid-primary group-hover:text-white transition-colors">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-semibold text-foreground group-hover:text-orchid-primary transition-colors">
                                          {item.title}
                                        </span>
                                        {item.badge && (
                                          <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-orchid-secondary/15 text-orchid-secondary">
                                            {item.badge}
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                        {item.desc}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}

                <button
                  onClick={() => scrollTo('#contact')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Right: Search Pill, Github Pill, Theme Toggle, Primary Pill CTA */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Spree-like Search bar pill */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 hover:bg-muted border border-border/60 text-muted-foreground hover:text-foreground text-xs transition-colors cursor-pointer group"
                title="Search (⌘K)"
              >
                <Search className="w-3.5 h-3.5 group-hover:text-orchid-primary transition-colors" />
                <span className="hidden md:inline font-normal">Search...</span>
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.2 text-[10px] font-mono text-muted-foreground/80 bg-background rounded border border-border/60">
                  ⌘K
                </kbd>
              </button>

              {/* GitHub Star Pill (Inspired by Spree's 12k Github counter pill) */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted/40 hover:bg-muted border border-border/60 text-xs font-medium text-muted-foreground hover:text-foreground transition-all cursor-pointer group"
                title="View on GitHub"
              >
                <Github className="w-3.5 h-3.5 group-hover:text-foreground transition-colors" />
                <span className="font-semibold text-foreground text-[11px]">★ 4.9k</span>
              </a>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-transparent hover:border-border/60"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
              </button>

              {/* Primary High-Impact Pill CTA Button */}
              <button
                onClick={() => scrollTo('#contact')}
                className="hidden md:inline-flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-full bg-foreground text-background text-xs font-semibold hover:opacity-90 active:scale-95 transition-all shadow-sm cursor-pointer"
              >
                <span>Get started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-muted text-foreground transition-colors cursor-pointer"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-18 z-40 p-4 lg:hidden"
          >
            <div className="rounded-3xl bg-background/95 backdrop-blur-2xl border border-border shadow-2xl p-6 space-y-6">
              <div className="space-y-4">
                {Object.keys(NAV_MENUS).map((cat) => (
                  <div key={cat} className="space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-orchid-secondary">
                      {cat}
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {NAV_MENUS[cat].map((item) => (
                        <button
                          key={item.title}
                          onClick={() => {
                            scrollTo(item.href);
                            setMobileMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl text-left hover:bg-muted text-sm font-medium text-foreground cursor-pointer"
                        >
                          <item.icon className="w-4 h-4 text-orchid-primary" />
                          <span>{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <button
                  onClick={() => {
                    scrollTo('#contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-full bg-foreground text-background font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  Start a Project <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Command Palette / Search Dialog */}
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectAction={(id) => scrollTo(`#${id}`)}
      />
    </>
  );
};
