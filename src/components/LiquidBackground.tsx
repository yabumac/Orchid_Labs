import { useTheme } from 'next-themes';

export const LiquidBackground = () => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Base Canvas Color */}
      <div
        className={`absolute inset-0 transition-colors duration-700 ${
          isDark ? 'bg-[#090a0f]' : 'bg-[#fafafa]'
        }`}
      />

      {/* Subtle Architectural Grid / Dot Pattern */}
      <div
        className={`absolute inset-0 opacity-[0.25] dark:opacity-[0.18] transition-opacity duration-700 ${
          isDark
            ? 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]'
            : 'bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:32px_32px]'
        }`}
      />

      {/* Subtle Atmospheric Light Orbs */}
      <div
        className={`absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] rounded-full blur-[140px] transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-br from-orchid-primary/15 via-orchid-secondary/10 to-transparent'
            : 'bg-gradient-to-br from-orchid-primary/10 via-sky-300/15 to-transparent'
        }`}
      />

      <div
        className={`absolute bottom-[-15%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[150px] transition-colors duration-700 ${
          isDark
            ? 'bg-gradient-to-tr from-cyan-500/10 via-orchid-accent/12 to-transparent'
            : 'bg-gradient-to-tr from-purple-200/20 via-orchid-secondary/10 to-transparent'
        }`}
      />

      {/* Edge Vignette */}
      <div
        className={`absolute inset-0 ${
          isDark
            ? 'bg-[radial-gradient(circle_at_center,transparent_40%,rgba(9,10,15,0.7)_100%)]'
            : 'bg-[radial-gradient(circle_at_center,transparent_50%,rgba(250,250,250,0.6)_100%)]'
        }`}
      />
    </div>
  );
};
