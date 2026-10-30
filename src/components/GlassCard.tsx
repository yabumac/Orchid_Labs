interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard = ({ children, className = '' }: GlassCardProps) => (
  <div className={`glass-card group p-5 sm:p-6 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-orchid-primary/5 ${className}`}>
    {children}
  </div>
);
