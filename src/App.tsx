import React, { useEffect, useState } from 'react';
import Terminal from './components/Terminal.tsx';
import { getDefaultTheme, Theme, themes } from './components/Themes.tsx';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes[savedTheme as keyof typeof themes]) {
      return themes[savedTheme as keyof typeof themes];
    }
    const defaultTheme = getDefaultTheme();
    return themes[defaultTheme];
  });

  useEffect(() => {
    const currentThemeName = Object.keys(themes).find(
      (key) => themes[key as keyof typeof themes] === theme,
    );
    if (currentThemeName) {
      localStorage.setItem('theme', currentThemeName);
    }
  }, [theme]);

  useEffect(() => {
    const currentThemeName = Object.keys(themes).find(
      (key) => themes[key as keyof typeof themes] === theme,
    );
    document.title = `Rishabh Mishra | ${currentThemeName || 'Default'}`;
  }, [theme]);

  return <Terminal theme={theme} setTheme={setTheme} />;
}

export default App;
