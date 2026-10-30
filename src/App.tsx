import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import {
  Code, Globe, Palette, Bot, Cpu, Music, Book, Layout, Lightbulb,
  ArrowRight, CheckCircle2, Mail, MessageSquare, Twitter, Linkedin,
  Github, Star, ChevronRight, MapPin, Phone, Send, Sparkles,
  Quote, GraduationCap
} from 'lucide-react';
import { GlassNavbar } from './components/GlassNavbar';
import { GlassCard } from './components/GlassCard';
import { Toaster } from './components/ui/sonner';
import { MultilingualWelcome } from './components/MultilingualWelcome';
import { Typewriter } from './components/Typewriter';
import { LiquidBackground } from './components/LiquidBackground';
import { LiquidButton } from './components/ui/LiquidButton';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from './components/ui/form';
import logo from './assets/favicon.png';

const services = [
  { title: "Software Development", desc: "Custom scalable solutions engineered for performance, reliability, and long-term growth.", icon: Code },
  { title: "Web Development", desc: "High-performance responsive sites that captivate audiences and drive measurable results.", icon: Globe },
  { title: "UI/UX Design", desc: "Intuitive, beautiful interfaces crafted through research-driven design thinking.", icon: Palette },
  { title: "Bot Development", desc: "Automated conversation agents that streamline communication and enhance support.", icon: Bot },
  { title: "AI Agents", desc: "Intelligent adaptive systems that learn, reason, and solve complex problems autonomously.", icon: Cpu },
  { title: "Music Production", desc: "Professional audio production, mixing, and sound design for digital and broadcast media.", icon: Music },
  { title: "Digital Books", desc: "End-to-end e-book creation and publishing for modern authors and forward-thinking brands.", icon: Book },
  { title: "Course Development", desc: "AI-assisted curriculum design and course creation for impactful digital learning.", icon: GraduationCap },
  { title: "Book UI Design", desc: "Bespoke publication interface design for digital and physical reading experiences.", icon: Layout },
  { title: "Tech Consulting", desc: "Strategic technology guidance covering architecture, transformation, and innovation.", icon: Lightbulb },
];

const stats = [
  { label: "Projects Delivered", value: "150+" },
  { label: "Happy Clients", value: "80+" },
  { label: "Years Experience", value: "10+" },
  { label: "Awards Won", value: "12" },
];

const testimonials = [
  { name: "Sarah Johnson", role: "CEO, TechVentures", content: "Orchid Lab completely transformed our digital infrastructure. Their team delivered a platform that exceeded every expectation—scalable, beautiful, and intuitive." },
  { name: "Marcus Chen", role: "CTO, DataFlow Systems", content: "The AI agents Orchid Lab built for us have revolutionized our customer support. Intelligent, responsive, and remarkably adaptive to our needs." },
  { name: "Elena Rodriguez", role: "Creative Director, PixelPerfect", content: "Working with Orchid Lab on our brand redesign was a dream. Their UI/UX team brought a level of creativity and precision that truly set us apart." },
  { name: "James Wilson", role: "Founder, LearnSphere", content: "Our digital course platform went from concept to launch seamlessly. Orchid Lab understood our vision and made it a reality with incredible speed." },
  { name: "Aisha Patel", role: "Head of Product, CloudScale", content: "Professional, innovative, and deeply collaborative. Orchid Lab doesn't just deliver projects—they build lasting partnerships that drive real results." },
];

const values = [
  { label: "Innovation Driven", icon: Sparkles },
  { label: "User Centric", icon: CheckCircle2 },
  { label: "Future Ready", icon: Cpu },
  { label: "AI Integrated", icon: Bot },
];

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactForm = z.infer<typeof contactSchema>;

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  return [ref, visible] as const;
}

const RevealSection = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AnimatedCounter = ({ target, suffix = "" }: { target: string; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target);

  useEffect(() => {
    const duration = 1400;
    const steps = 45;
    const increment = numericTarget / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [numericTarget]);

  return <>{count}{suffix}</>;
};

const Hero = () => (
  <section id="hero" className="relative min-h-[90vh] flex items-center pt-28 pb-12 px-4 sm:px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card text-orchid-secondary text-sm font-medium mb-5">
          <span className="flex h-1.5 w-1.5 rounded-full bg-orchid-secondary" />
          <Typewriter text="Innovating the Future" delay={0.08} />
        </div>
        <div className="text-[clamp(2rem,6vw,4.25rem)] font-bold leading-[1.1] mb-4">
          <span className="block h-[1.2em]"><MultilingualWelcome /></span>
          <span className="block mt-1">to <span className="liquid-text">Orchid Lab</span></span>
        </div>
        <p className="text-base sm:text-lg text-muted-foreground mb-7 max-w-lg leading-relaxed">
          Where creativity meets cutting-edge technology. We build intelligent systems, beautiful experiences, and digital masterpieces.
        </p>
        <div className="flex flex-wrap gap-3">
          <LiquidButton variant="primary" onClick={() => scrollTo('services')}>
            Explore Our Work <ArrowRight className="ml-2 w-5 h-5" />
          </LiquidButton>
          <LiquidButton variant="glass" onClick={() => scrollTo('contact')}>
            Get in Touch
          </LiquidButton>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="relative hidden sm:block"
      >
        <div className="absolute inset-0 bg-orchid-primary/[0.15] blur-[80px] rounded-full" />
        <div className="relative glass-card-strong rounded-[32px] p-1.5 aspect-[4/3] overflow-hidden group">
          <img
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/24139871-1b1b-452a-9391-20ffbeacbe6a/orchid-labs-hero-a074bb8c-1783273034116.webp"
            alt="Orchid Lab Hero"
            className="w-full h-full object-cover rounded-[28px] transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2.5">
            <div className="flex -space-x-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-black/40 bg-gradient-to-br from-orchid-primary to-orchid-accent" />
              ))}
            </div>
            <span className="text-white/80 text-sm font-medium">Trusted by 80+ clients</span>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
);

const Stats = () => (
  <section id="stats" className="py-16 sm:py-18 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
      {stats.map((stat, i) => (
        <RevealSection key={i} delay={i * 60}>
          <div className="text-center p-5 sm:p-6 glass-card rounded-2xl">
            <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold liquid-text mb-1">
              <AnimatedCounter target={stat.value.replace('+', '')} suffix={stat.value.includes('+') ? '+' : ''} />
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground font-semibold uppercase tracking-widest">{stat.label}</div>
          </div>
        </RevealSection>
      ))}
    </div>
  </section>
);

const Services = () => {
  const [ref, visible] = useReveal(0.05);
  return (
    <section id="services" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-orchid-secondary mb-3">What We Do</span>
            <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-tight">Our <span className="liquid-text">Expertise</span></h2>
          </div>
        </RevealSection>
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={i}
                className={`reveal ${visible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <GlassCard className="h-full flex flex-col items-start p-4 sm:p-5">
                  <div className="w-10 h-10 rounded-xl bg-orchid-primary/15 flex items-center justify-center text-orchid-primary mb-3 group-hover:bg-orchid-primary/25 transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold mb-1.5 leading-snug">{service.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </GlassCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-20 sm:py-28 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-14 items-center">
      <RevealSection>
        <div className="relative">
          <div className="absolute -inset-3 bg-gradient-to-br from-orchid-primary/20 via-orchid-secondary/10 to-orchid-accent/15 rounded-[32px] blur-2xl" />
          <div className="relative glass-card-strong rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Team working"
              className="w-full aspect-[4/3] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 glass-card rounded-xl px-3.5 py-2.5 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-orchid-secondary shrink-0" />
              <span className="text-xs sm:text-sm font-medium">10+ years of innovation</span>
            </div>
          </div>
        </div>
      </RevealSection>
      <RevealSection delay={80}>
        <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-orchid-secondary mb-3">About Us</span>
        <h2 className="text-[clamp(1.5rem,4vw,2.75rem)] font-bold mb-4 leading-tight">Crafting the <span className="liquid-text">Future</span> Together</h2>
        <p className="text-muted-foreground text-sm sm:text-base mb-6 leading-relaxed">
          Orchid Lab is a multidisciplinary collective of creators, engineers, and visionaries dedicated to pushing the boundaries of what's possible in the digital realm. From AI-driven platforms to exquisite design, we partner with forward-thinking brands to build the future.
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div key={v.label} className="flex items-center gap-2.5 p-2.5 rounded-xl bg-orchid-primary/[0.06] border border-orchid-primary/[0.08]">
                <Icon className="w-4 h-4 text-orchid-secondary shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">{v.label}</span>
              </div>
            );
          })}
        </div>
        <LiquidButton variant="glass" onClick={() => scrollTo('contact')}>
          Let's Work Together <ChevronRight className="ml-1 w-4 h-4" />
        </LiquidButton>
      </RevealSection>
    </div>
  </section>
);

const Testimonials = () => {
  const [ref, visible] = useReveal(0.05);
  return (
    <section id="testimonials" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-orchid-secondary mb-3">Client Stories</span>
            <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-tight">What Our <span className="liquid-text">Clients Say</span></h2>
          </div>
        </RevealSection>
        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`reveal ${visible ? 'visible' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <GlassCard className="h-full flex flex-col p-5 sm:p-6">
                <Quote className="w-6 h-6 text-orchid-primary/25 mb-3 shrink-0" />
                <p className="text-muted-foreground leading-relaxed mb-5 flex-1 text-sm sm:text-[15px]">&ldquo;{t.content}&rdquo;</p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="w-3.5 h-3.5 fill-orchid-secondary text-orchid-secondary" />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-3.5 border-t border-foreground/[0.06]">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orchid-primary to-orchid-accent flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm truncate">{t.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{t.role}</div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => (
  <section id="cta" className="py-20 sm:py-28 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">
      <RevealSection>
        <div className="relative overflow-hidden glass-card-strong rounded-3xl sm:rounded-[36px] p-8 sm:p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-orchid-primary/[0.07] via-transparent to-orchid-accent/[0.07] pointer-events-none" />
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-orchid-secondary/[0.08] rounded-full blur-[100px]" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orchid-accent/[0.08] rounded-full blur-[100px]" />
          <div className="relative z-10">
            <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-bold mb-3 sm:mb-4 leading-tight">
              Ready to Build <span className="liquid-text">Something Great?</span>
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg mb-7 sm:mb-8 max-w-xl mx-auto">
              Whether you have a specific project in mind or just want to explore the possibilities, we're here to bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <LiquidButton variant="primary" onClick={() => scrollTo('contact')}>
                <MessageSquare className="mr-2 w-5 h-5" /> Start a Project
              </LiquidButton>
              <LiquidButton variant="glass" onClick={() => window.location.href = 'mailto:hello@orchidlab.com'}>
                <Mail className="mr-2 w-5 h-5" /> hello@orchidlab.com
              </LiquidButton>
            </div>
          </div>
        </div>
      </RevealSection>
    </div>
  </section>
);

const Contact = () => {
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = (data: ContactForm) => {
    toast.success('Message sent successfully!', {
      description: `Thanks ${data.name}, we'll be in touch within 24 hours.`,
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <RevealSection>
          <div className="text-center mb-14 sm:mb-18">
            <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-orchid-secondary mb-3">Get in Touch</span>
            <h2 className="text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-tight">Let's <span className="liquid-text">Connect</span></h2>
          </div>
        </RevealSection>
        <div className="grid lg:grid-cols-5 gap-6 sm:gap-10 max-lg:max-w-2xl mx-auto">
          <RevealSection className="lg:col-span-2 space-y-5">
            <div className="glass-card-strong rounded-2xl p-5 sm:p-7">
              <h3 className="text-lg font-bold mb-5">Contact Info</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@orchidlab.com", href: "mailto:hello@orchidlab.com" },
                  { icon: Phone, label: "Phone", value: "+1 (234) 567-890", href: "tel:+1234567890" },
                  { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-orchid-primary/15 flex items-center justify-center text-orchid-primary shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{item.label}</div>
                        {item.href
                          ? <a href={item.href} className="font-medium text-sm hover:text-orchid-primary transition-colors truncate block">{item.value}</a>
                          : <div className="font-medium text-sm truncate">{item.value}</div>
                        }
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="glass-card-strong rounded-2xl p-5 sm:p-7">
              <h3 className="text-lg font-bold mb-3">Follow Us</h3>
              <p className="text-sm text-muted-foreground mb-4">Stay connected for the latest in tech and design.</p>
              <div className="flex gap-2.5">
                {[Twitter, Linkedin, Github].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-lg glass-card flex items-center justify-center text-muted-foreground hover:text-orchid-primary hover:border-orchid-primary/25 transition-all">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </RevealSection>
          <RevealSection delay={80} className="lg:col-span-3">
            <div className="glass-card-strong rounded-2xl p-5 sm:p-7 md:p-9">
              <h3 className="text-lg font-bold mb-1">Send a Message</h3>
              <p className="text-sm text-muted-foreground mb-5">Fill out the form and we'll respond within 24 hours.</p>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField control={form.control} name="name" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl><Input placeholder="Your name" {...field} className="h-10 sm:h-11" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl><Input placeholder="your@email.com" type="email" {...field} className="h-10 sm:h-11" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>
                  <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl><Input placeholder="What's this about?" {...field} className="h-10 sm:h-11" /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl><Textarea placeholder="Tell us about your project..." className="min-h-[120px] resize-none" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <Button type="submit" className="w-full h-11 bg-orchid-primary hover:bg-orchid-primary/90 text-white rounded-xl font-semibold gap-2 cursor-pointer transition-all active:scale-[0.98]">
                    <Send className="w-4 h-4" /> Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};

const FooterSection = () => (
  <footer className="py-12 sm:py-14 px-4 sm:px-6 border-t border-foreground/[0.04]">
    <div className="max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10">
        <div className="sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg overflow-hidden">
              <img src={logo} alt="Orchid Lab" className="w-full h-full object-cover" />
            </div>
            <span className="text-foreground font-bold text-lg">Orchid Lab</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            A full-service creative and technology company crafting intelligent systems, beautiful experiences, and digital masterpieces.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-xs mb-4 uppercase tracking-widest text-muted-foreground">Quick Links</h4>
          <ul className="space-y-2.5">
            {['Services', 'About', 'Testimonials', 'Contact'].map((link) => (
              <li key={link}>
                <a href={`#${link.toLowerCase()}`} className="text-sm text-muted-foreground hover:text-orchid-primary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-xs mb-4 uppercase tracking-widest text-muted-foreground">Services</h4>
          <ul className="space-y-2.5">
            {['Software Dev', 'Web Dev', 'UI/UX Design', 'AI & Bots'].map((link) => (
              <li key={link}>
                <a href="#services" className="text-sm text-muted-foreground hover:text-orchid-primary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-xs mb-4 uppercase tracking-widest text-muted-foreground">Connect</h4>
          <ul className="space-y-2.5">
            <li><a href="mailto:hello@orchidlab.com" className="text-sm text-muted-foreground hover:text-orchid-primary transition-colors">hello@orchidlab.com</a></li>
            {['Twitter / X', 'LinkedIn', 'GitHub'].map((link) => (
              <li key={link}>
                <a href="#" className="text-sm text-muted-foreground hover:text-orchid-primary transition-colors">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="pt-6 border-t border-foreground/[0.04] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-foreground/35">&copy; 2025 Orchid Lab. All rights reserved.</p>
        <div className="flex gap-5">
          {[Twitter, Linkedin, Github].map((Icon, i) => (
            <a key={i} href="#" className="text-foreground/35 hover:text-orchid-primary transition-colors"><Icon className="w-4 h-4" /></a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orchid-primary/30 overflow-x-hidden">
        <LiquidBackground />
        <GlassNavbar />
        <Toaster position="bottom-right" />
        <main className="relative z-0">
          <Hero />
          <Stats />
          <Services />
          <About />
          <Testimonials />
          <CTA />
          <Contact />
        </main>
        <FooterSection />
      </div>
    </ThemeProvider>
  );
}

export default App;
