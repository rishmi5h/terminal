import React from 'react';

export type Theme = {
  bg: string;
  font: string;
  text: string;
};

export const themes: Record<string, Theme> = {
  default: {
    bg: 'bg-black',
    font: 'font-mono',
    text: 'text-green-500',
  },
  'mac-terminal': {
    bg: 'bg-black',
    font: 'font-mono',
    text: 'text-white',
  },
  ubuntu: {
    bg: 'bg-purple-900',
    font: 'font-ubuntu',
    text: 'text-orange-200',
  },
  'windows-cmd': {
    bg: 'bg-black',
    font: 'font-consolas',
    text: 'text-gray-300',
  },
  'windows-powershell': {
    bg: 'bg-blue-900',
    font: 'font-segoe-ui',
    text: 'text-gray-100',
  },
};

interface ThemesProps {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

export function Themes({ currentTheme, setTheme }: ThemesProps) {
  return (
    <div className="mb-2 flex flex-wrap">
      {Object.entries(themes).map(([name, theme]) => (
        <button
          className={`mb-2 mr-2 rounded px-2 py-1 text-xs ${theme.bg} ${theme.text} ${
            currentTheme === theme ? 'ring-2 ring-current' : ''
          }`}
          key={name}
          onClick={() => setTheme(theme)}
          title={name}
        >
          {name.charAt(0).toUpperCase()}
        </button>
      ))}
    </div>
  );
}
