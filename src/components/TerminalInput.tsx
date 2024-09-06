import React from 'react';
import { handleSpecialCommands } from './SpeicalCommands.tsx';
import { Theme, themes } from './Themes.tsx';

interface TerminalInputProps {
  commandHistory: string[];
  handleCommand: (command: string) => void;
  handleTabCompletion: () => void;
  historyIndex: number;
  input: string;
  inputRef: React.RefObject<HTMLInputElement>;
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  theme: Theme;
}

const TerminalInput: React.FC<TerminalInputProps> = ({
  commandHistory,
  handleCommand,
  handleTabCompletion,
  historyIndex,
  input,
  inputRef,
  setHistoryIndex,
  setInput,
  theme,
}) => {
  const getPrompt = () => {
    const currentThemeName = Object.keys(themes).find(
      (key) => themes[key as keyof typeof themes] === theme,
    );
    switch (currentThemeName) {
      case 'mac-terminal':
        return 'rishmi5h@macbook ~ % ';
      case 'windows-cmd':
        return String.raw`C:\Users\rishmi5h> `;
      case 'windows-powershell':
        return String.raw`PS C:\Users\rishmi5h> `;
      case 'ubuntu':
        return 'rishmi5h@ubuntu:~$ ';
      default:
        return '$ ';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    handleSpecialCommands(
      e,
      input,
      setInput,
      commandHistory,
      historyIndex,
      setHistoryIndex,
      () => {},
      handleTabCompletion,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap items-center">
        <span className="mb-2 mr-2 sm:mb-0">{getPrompt()}</span>
        <input
          className={`flex-grow ${theme.bg} ${theme.text} min-w-[200px] outline-none`}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          type="text"
          value={input}
        />
      </div>
    </form>
  );
};

export default TerminalInput;
