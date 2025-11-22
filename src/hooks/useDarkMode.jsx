import { useState, useEffect } from 'react';

// Hook personalizat pentru gestionarea temei (Dark/Light Mode)
export const useDarkMode = () => {
  // Inițializăm starea temei, căutând o valoare salvată în localStorage
  // Dacă nu există, folosim preferința sistemului de operare
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Funcție pentru a comuta între teme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Efect care rulează ori de câte ori starea `theme` se schimbă
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Eliminăm clasa temei anterioare
    const oldTheme = theme === 'light' ? 'dark' : 'light';
    root.classList.remove(oldTheme);
    
    // Adăugăm clasa temei curente pe elementul <html>
    root.classList.add(theme);
    
    // Salvăm preferința utilizatorului în localStorage pentru persistență
    window.localStorage.setItem('theme', theme);

  }, [theme]); // Dependența: efectul se re-execută doar dacă `theme` se schimbă

  return [theme, toggleTheme];
};
