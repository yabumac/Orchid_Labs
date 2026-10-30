import { useTheme } from 'next-themes';

export const LiquidBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 transition-colors duration-700 ${isDark ? 'bg-black' : 'bg-slate-50'}`} />

      <div className={`absolute inset-0 animate-liquid opacity-40 ${isDark ? 'bg-gradient-to-br from-orchid-primary/25 via-black to-orchid-accent/25' : 'bg-gradient-to-br from-orchid-primary/15 via-white to-orchid-accent/15'}`} />

      <div className={`absolute -top-[15%] -left-[10%] w-[70%] h-[70%] ${isDark ? 'bg-orchid-primary/25' : 'bg-orchid-primary/15'} rounded-[40%] blur-[100px] blob-1 gpu`} />
      <div className={`absolute -bottom-[20%] -right-[15%] w-[80%] h-[80%] ${isDark ? 'bg-orchid-secondary/15' : 'bg-orchid-secondary/10'} rounded-[30%] blur-[120px] blob-2 gpu`} />
      <div className={`absolute top-[25%] right-[10%] w-[50%] h-[50%] ${isDark ? 'bg-orchid-accent/15' : 'bg-orchid-accent/10'} rounded-[50%] blur-[90px] blob-3 gpu`} />

      <div className={`absolute inset-0 ${isDark ? 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)]' : 'bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.3)_100%)]'}`} />
    </div>
  );
};
