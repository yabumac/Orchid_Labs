import { type ReactNode } from 'react';

interface LiquidButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'glass';
}

export const LiquidButton = ({
  children,
  onClick,
  className = "",
  variant = "primary"
}: LiquidButtonProps) => {
  const baseClasses = "relative group overflow-hidden px-7 py-3.5 rounded-2xl transition-all duration-150 font-semibold flex items-center justify-center gap-2 active:scale-[0.98]";
  const variantClasses = variant === 'primary'
    ? "bg-orchid-primary text-white shadow-lg shadow-orchid-primary/25 hover:shadow-orchid-primary/35"
    : "glass-card text-foreground hover:text-orchid-primary";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-tr from-orchid-secondary via-orchid-accent to-orchid-primary opacity-0 group-hover:opacity-15 transition-opacity duration-150 pointer-events-none" />
    </button>
  );
};
