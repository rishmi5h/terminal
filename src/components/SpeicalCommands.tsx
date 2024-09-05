import React from 'react';

export const specialCommands = {
  'Ctrl + l': 'Clear the terminal',
  Tab: 'Autocomplete command',
  'Up Arrow': 'Cycle through command history',
};

export const handleSpecialCommands = (
  e: React.KeyboardEvent<HTMLInputElement>,
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  commandHistory: string[],
  historyIndex: number,
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  setOutput: React.Dispatch<React.SetStateAction<string[]>>,
  handleTabCompletion: () => void,
) => {
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex]);
    } else if (historyIndex === 0) {
      setHistoryIndex(-1);
      setInput('');
    }
  } else if (e.key === 'Tab') {
    e.preventDefault();
    handleTabCompletion();
  } else if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault();
    setOutput([]);
  }
};
