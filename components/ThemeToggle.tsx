import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import type { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center px-3 rounded-lg bg-slate-900/80 border border-slate-700 text-slate-300 hover:text-white transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={theme}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute"
        >
          {theme === 'light' ? <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" /> : <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </motion.div>
      </AnimatePresence>
    </button>
  );
};