import { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
  loop?: boolean;
}

export const Typewriter: React.FC<TypewriterProps> = ({ 
  text, 
  delay = 0, 
  speed = 0.05, 
  className = "",
  loop = true
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let frameId = 0;
    let isActive = true;
    let lastFrameTime = 0;
    let accumulatedTime = 0;
    let charIndex = 0;

    const tick = (timestamp: number) => {
      if (!isActive) return;

      if (!lastFrameTime) {
        lastFrameTime = timestamp;
      }

      const delta = timestamp - lastFrameTime;
      lastFrameTime = timestamp;
      accumulatedTime += delta;
      const stepDuration = speed * 1000;

      while (charIndex < text.length && accumulatedTime >= stepDuration) {
        accumulatedTime -= stepDuration;
        charIndex += 1;
      }

      setDisplayedText(text.slice(0, charIndex));

      if (charIndex < text.length) {
        frameId = window.requestAnimationFrame(tick);
      } else if (loop) {
        window.setTimeout(() => {
          if (!isActive) return;
          setDisplayedText("");
          setStarted(false);
          window.setTimeout(() => {
            if (isActive) setStarted(true);
          }, 120);
        }, 1200);
      }
    };

    frameId = window.requestAnimationFrame(tick);

    return () => {
      isActive = false;
      window.cancelAnimationFrame(frameId);
    };
  }, [started, text, speed, loop]);

  return (
    <span className={className}>
      {displayedText}
      <span className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle animate-caret-blink" />
    </span>
  );
};
