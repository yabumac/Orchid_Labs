import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const languages = [
  { text: "Welcome", lang: "English" },
  { text: "Bienvenido", lang: "Spanish" },
  { text: "أهلاً و سهلاً", lang: "Arabic" },
  { text: "欢迎", lang: "Chinese" },
  { text: "እንኳን ደህና መጡ", lang: "Amharic" },
  { text: "Bienvenue", lang: "French" },
  { text: "Willkommen", lang: "German" },
  { text: "Benvenuto", lang: "Italian" },
  { text: "Välkommen", lang: "Swedish" },
  { text: "환영합니다", lang: "Korean" },
];

export const MultilingualWelcome = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % languages.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-[1.2em] relative flex items-center justify-start overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          style={{ willChange: "transform, opacity" }}
          className="absolute left-0 inline-block font-bold"
        >
          {languages[index].text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
