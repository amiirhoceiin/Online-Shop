// src/context/ThemeContext.js
import { createContext, useState, useEffect } from "react";

export const themecontext = createContext();

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.body.className = mode;
  }, [mode]);

  const changeMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <themecontext.Provider value={{ mode, changeMode }}>
      {children}
    </themecontext.Provider>
  );
}