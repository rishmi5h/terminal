import React, { useEffect, useRef, useState } from 'react';
import { commands } from './components/Commands.tsx';
import { Theme, themes } from './components/Themes.tsx';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme && themes[savedTheme as keyof typeof themes]
      ? themes[savedTheme as keyof typeof themes]
      : themes.default;
  });
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    handleCommand('welcome');
  }, []);

  useEffect(() => {
    const currentThemeName = Object.keys(themes).find(
      (key) => themes[key as keyof typeof themes] === theme,
    );
    if (currentThemeName) {
      localStorage.setItem('theme', currentThemeName);
    }
  }, [theme]);

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

  const handleCommand = (command: string) => {
    const [cmd, ...args] = command.trim().split(' ');

    switch (cmd.toLowerCase()) {
      case 'welcome':
        setOutput([
          'Welcome to My Terminal Portfolio!',
          'Type "help" to see available commands.',
          '',
        ]);
        break;
      case 'about':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          "Hi, I'm Rishabh Mishra!",
          "I'm a Software Engineer who likes to build stuff.",
          'I have 3 years of experience in Software Development.',
          'Type "skills" to see my technical expertise.',
        ]);
        break;
      case 'skills':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          'My Technical Skills:',
          '- Programming Languages: Java, JavaScript, TypeScript, Python, SQL',
          '- Frameworks & Libraries: React, Next.js, Tailwind CSS, Node.js, Spring Boot, Express.js',
          '- Tools: Git, Docker, Kubernetes, Jenkins, Airflow, AWS',
          '- Other: Kafka, Oracle DB, PostgreSQL, Redis',
        ]);
        break;
      case 'projects':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          'My Notable Projects:',
          '1. [Project Name 1]',
          '   Description: [Brief description]',
          '   Technologies: [Tech stack used]',
          '   Link: [Project link if available]',
          '',
          '2. [Project Name 2]',
          '   Description: [Brief description]',
          '   Technologies: [Tech stack used]',
          '   Link: [Project link if available]',
          '',
          'Type "socials" to see my social media profiles for more information.',
        ]);
        break;
      case 'email':
        setOutput([...output, `${getPrompt()}${command}`, 'mail@rishmi5h.com']);
        window.location.href = 'mailto:mail@rishmi5h.com';
        break;
      case 'help':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          'Available commands:',
          ...Object.entries(commands).map(([cmd, desc]) => `  ${cmd}: ${desc}`),
        ]);
        break;
      case 'clear':
        setOutput([]);
        break;
      case 'theme':
        if (args.length === 0) {
          setOutput([
            ...output,
            `${getPrompt()}${command}`,
            'Available themes:',
            ...Object.keys(themes).map((t) => `  ${t}`),
            'Usage: theme <name>',
          ]);
        } else {
          const newTheme = themes[args[0] as keyof typeof themes];
          if (newTheme) {
            setTheme(newTheme);
            setOutput([
              ...output,
              `${getPrompt()}${command}`,
              `Theme changed to ${args[0]}`,
            ]);
          } else {
            setOutput([
              ...output,
              `${getPrompt()}${command}`,
              `Theme not found: ${args[0]}`,
              'Type "theme" without arguments to see available themes.',
            ]);
          }
        }
        break;
      case 'gui':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          'Opening portfolio website in a new tab...',
        ]);
        window.open('https://rishmi5h.com', '_blank');
        break;
      case 'socials':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          'My Social Media Links:',
          '- LinkedIn: https://www.linkedin.com/in/rishmi5h/',
          '- GitHub: https://github.com/rishmi5h',
          '- Twitter: https://twitter.com/rishmi5h',
          '- LeetCode: https://leetcode.com/rishmi5h/',
          // Add or remove social media links as needed
        ]);
        break;
      default:
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          `Command not recognized: ${cmd}`,
          'Type "help" to see available commands.',
        ]);
    }

    // Add the command to history
    if (command.trim() !== '') {
      setCommandHistory((prev) => [command, ...prev]);
    }
    setHistoryIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    }
  };

  return (
    <div className={`${theme.bg} ${theme.text} min-h-screen p-4 font-mono`}>
      <div className="mb-4 whitespace-pre-wrap">
        {output.map((line, index) => (
          <div key={index}>
            {line.startsWith('mailto:') ? (
              <a
                href={line}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {line}
              </a>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
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
    </div>
  );
}

export default App;
