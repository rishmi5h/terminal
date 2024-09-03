import React from 'react';

export type Theme = {
  bg: string;
  input: string;
  text: string;
};

export const themes: Record<string, Theme> = {
  blue: {
    bg: 'bg-blue-900',
    input: 'bg-blue-800 text-blue-200',
    text: 'text-blue-200',
  },
  'blue-matrix': {
    bg: 'bg-black',
    input: 'bg-blue-900 text-blue-200',
    text: 'text-blue-400',
  },
  dark: {
    bg: 'bg-gray-800',
    input: 'bg-gray-700 text-gray-200',
    text: 'text-gray-200',
  },
  default: {
    bg: 'bg-black',
    input: 'bg-black text-green-500',
    text: 'text-green-500',
  },
  espresso: {
    bg: 'bg-gray-900',
    input: 'bg-gray-800 text-amber-100',
    text: 'text-amber-200',
  },
  'green-goblin': {
    bg: 'bg-green-900',
    input: 'bg-green-800 text-green-200',
    text: 'text-green-300',
  },
  light: {
    bg: 'bg-white',
    input: 'bg-gray-100 text-black',
    text: 'text-black',
  },
  ubuntu: {
    bg: 'bg-purple-900',
    input: 'bg-purple-800 text-orange-100',
    text: 'text-orange-200',
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
