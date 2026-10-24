import React, { createContext, useContext, useState, useEffect } from 'react';

type ArchitecturalMode = 'natural' | 'mono';

interface ThemeContextType {
  mode: ArchitecturalMode;
  toggleMode: () => void;
  setMode: (mode: ArchitecturalMode) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'natural',
  toggleMode: () => {},
  setMode: () => {},
});

export const useArchitecturalTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setModeState] = useState<ArchitecturalMode>('natural');

  useEffect(() => {
    const saved = localStorage.getItem('proliq_arch_mode') as ArchitecturalMode | null;
    if (saved === 'mono' || saved === 'natural') {
      setModeState(saved);
      if (saved === 'mono') {
        document.documentElement.classList.add('mono-mode');
      }
    }
  }, []);

  const setMode = (newMode: ArchitecturalMode) => {
    setModeState(newMode);
    localStorage.setItem('proliq_arch_mode', newMode);
    if (newMode === 'mono') {
      document.documentElement.classList.add('mono-mode');
    } else {
      document.documentElement.classList.remove('mono-mode');
    }
  };

  const toggleMode = () => {
    setMode(mode === 'natural' ? 'mono' : 'natural');
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
