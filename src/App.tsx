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
          `$ ${command}`,
          "Hi, I'm Rishabh Mishra!",
          "I'm a Software Engineer with a passion for AI and Machine Learning.",
          'I have 3 years of experience in Software Development.',
          'Type "skills" to see my technical expertise.',
        ]);
        break;
      case 'skills':
        setOutput([
          ...output,
          `$ ${command}`,
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
          `$ ${command}`,
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
          'Type "contact" to see how to reach me for collaborations.',
        ]);
        break;
      case 'contact':
        setOutput([
          ...output,
          `$ ${command}`,
          'Contact Information:',
          'Email: mail@rishmi5h.com',
          'LinkedIn: https://www.linkedin.com/in/rishmi5h/',
          'GitHub: https://github.com/rishmi5h',
          'Twitter: https://twitter.com/rishmi5h',
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
      case 'gui':
        setOutput([
          ...output,
          `$ ${command}`,
          'Opening portfolio website in a new tab...',
        ]);
        window.open('https://rishmi5h.com', '_blank');
        break;
      default:
        setOutput([
          ...output,
          `$ ${command}`,
          `Command not recognized: ${cmd}`,
          'Type "help" to see available commands.',
        ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput('');
  };

  return (
    <div className={`${theme.bg} ${theme.text} min-h-screen p-4 font-mono`}>
      <div className="mb-4 whitespace-pre-wrap">
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
