import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { LiquidButton } from './ui/LiquidButton';
import logo from '../assets/favicon.png';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

const scrollTo = (href: string) => {
  const id = href.replace('#', '');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
};

export const GlassNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 250) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-4">
      <div className={`mx-auto max-w-7xl transition-all duration-500 ${scrolled ? 'glass-card rounded-full py-2 px-6 sm:px-8' : 'bg-transparent'}`}>
        <div className="flex items-center justify-between">
          <button onClick={() => scrollTo('#hero')} className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center shadow-lg shadow-orchid-primary/50 overflow-hidden">
              <img src={logo} alt="Orchid Lab" className="w-full h-full object-cover" />
            </div>
            <span className="text-foreground font-bold text-xl tracking-tight group-hover:text-orchid-primary transition-colors">Orchid Lab</span>
          </button>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { setIsOpen(false); scrollTo(link.href); }}
                className={`transition-colors text-sm font-medium cursor-pointer ${
                  activeSection === link.href.replace('#', '')
                    ? 'text-orchid-primary'
                    : 'text-foreground/70 hover:text-orchid-primary'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full glass-card hover:bg-orchid-primary/10 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <LiquidButton onClick={() => scrollTo('#contact')} className="px-6 py-2 !rounded-full text-sm">
              Get Started
            </LiquidButton>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-full glass-card hover:bg-orchid-primary/10 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground p-2 cursor-pointer"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-20 left-4 right-4 glass-card rounded-3xl overflow-hidden md:hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => { setIsOpen(false); scrollTo(link.href); }}
                  className={`text-left transition-colors text-lg font-medium cursor-pointer ${
                    activeSection === link.href.replace('#', '')
                      ? 'text-orchid-primary'
                      : 'text-foreground/80 hover:text-orchid-primary'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <div className="pt-4 border-t border-foreground/10">
                <LiquidButton onClick={() => { setIsOpen(false); scrollTo('#contact'); }} className="w-full py-3 rounded-xl">
                  Get Started
                </LiquidButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
