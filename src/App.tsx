import React, { useState } from 'react';
import Terminal from './components/Terminal.tsx';
import { Theme, themes } from './components/Themes.tsx';

function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme as keyof typeof themes]
      ? themes[savedTheme as keyof typeof themes]
      : themes.default;
  });

  return <Terminal theme={theme} setTheme={setTheme} />;
}

export default App;
