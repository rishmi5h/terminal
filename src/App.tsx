import React, { useEffect, useRef, useState } from 'react';
import { Theme, themes } from './components/Themes.tsx';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>(themes.default);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    handleCommand('welcome');
  }, []);

  const commands = {
    clear: 'Clears the terminal',
    date: 'Shows the current date and time',
    echo: 'Repeats the input',
    help: 'Shows this help message',
    theme: 'Changes the color theme (usage: theme <name>)',
    welcome: 'Shows the welcome message',
  };

  const handleCommand = (command: string) => {
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd.toLowerCase()) {
      case 'welcome':
        setOutput([
          'Welcome to the React Terminal!',
          'Type "help" to see available commands.',
          '',
        ]);
        break;
      case 'help':
        setOutput([
          ...output,
          `$ ${command}`,
          'Available commands:',
          ...Object.entries(commands).map(([cmd, desc]) => `  ${cmd}: ${desc}`),
        ]);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'echo':
        setOutput([...output, `$ ${command}`, args.join(' ')]);
        break;
      case 'date':
        setOutput([...output, `$ ${command}`, new Date().toString()]);
        break;
      case 'theme':
        if (args.length === 0) {
          setOutput([
            ...output,
            `$ ${command}`,
            'Available themes:',
            ...Object.keys(themes).map((t) => `  ${t}`),
          ]);
        } else {
          const newTheme = themes[args[0] as keyof typeof themes];
          if (newTheme) {
            setTheme(newTheme);
            setOutput([
              ...output,
              `$ ${command}`,
              `Theme changed to ${args[0]}`,
            ]);
          } else {
            setOutput([
              ...output,
              `$ ${command}`,
              `Theme not found: ${args[0]}`,
            ]);
          }
        }
        break;
      default:
        setOutput([
          ...output,
          `$ ${command}`,
          `Command not recognized: ${cmd}`,
        ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className={`${theme.bg} ${theme.text} h-screen p-4 font-mono`}>
      <div className="mb-4">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      <form className="flex" onSubmit={handleSubmit}>
        <span>$&nbsp;</span>
        <input
          className={`flex-grow ${theme.bg} ${theme.text} outline-none`}
          onChange={(e) => setInput(e.target.value)}
          ref={inputRef}
          type="text"
          value={input}
        />
      </form>
    </div>
  );
}

export default App;
