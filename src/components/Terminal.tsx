import React, { useEffect, useRef, useState } from 'react';
import useCommandHandler from '../hooks/useCommandHandler.tsx';
import TerminalInput from './TerminalInput.tsx';
import TerminalOutput from './TerminalOutput.tsx';
import { Theme } from './Themes.tsx';

interface TerminalProps {
  setTheme: (theme: Theme) => void;
  theme: Theme;
}

const Terminal: React.FC<TerminalProps> = ({ setTheme, theme }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  const { handleCommand, handleTabCompletion } = useCommandHandler(
    input,
    setInput,
    output,
    setOutput,
    commandHistory,
    setCommandHistory,
    historyIndex,
    setHistoryIndex,
    theme,
    setTheme,
  );

  useEffect(() => {
    inputRef.current?.focus();
    handleCommand('welcome');
  }, []);

  return (
    <div
      className={`${theme.bg} ${theme.text} min-h-screen p-4 ${theme.font}`}
      onKeyDown={(e) => {
        if (e.key === 'l' && e.ctrlKey) {
          e.preventDefault();
          setOutput([]);
        }
      }}
      tabIndex={0}
    >
      <TerminalOutput output={output} />
      <TerminalInput
        commandHistory={commandHistory}
        handleCommand={handleCommand}
        handleTabCompletion={handleTabCompletion}
        historyIndex={historyIndex}
        input={input}
        inputRef={inputRef}
        setHistoryIndex={setHistoryIndex}
        setInput={setInput}
        theme={theme}
      />
    </div>
  );
};

export default Terminal;
