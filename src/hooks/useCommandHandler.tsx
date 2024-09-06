import { commandResponses } from '../components/CommandResponses.tsx';
import { commands } from '../components/Commands.tsx';
import { specialCommands } from '../components/SpeicalCommands.tsx';
import { Theme, themes } from '../components/Themes.tsx';

const useCommandHandler = (
  input: string,
  setInput: React.Dispatch<React.SetStateAction<string>>,
  output: string[],
  setOutput: React.Dispatch<React.SetStateAction<string[]>>,
  commandHistory: string[],
  setCommandHistory: React.Dispatch<React.SetStateAction<string[]>>,
  historyIndex: number,
  setHistoryIndex: React.Dispatch<React.SetStateAction<number>>,
  theme: Theme,
  setTheme: (theme: Theme) => void,
) => {
  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rishmi5h/' },
    { name: 'GitHub', url: 'https://github.com/rishmi5h' },
    { name: 'Twitter', url: 'https://twitter.com/rishmi5h' },
    { name: 'LeetCode', url: 'https://leetcode.com/rishmi5h/' },
  ];

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
      case 'about':
      case 'skills':
      case 'projects':
      case 'email':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          ...commandResponses[
            cmd.toLowerCase() as keyof typeof commandResponses
          ],
        ]);
        if (cmd.toLowerCase() === 'email') {
          window.location.href = 'mailto:mail@rishmi5h.com';
        }
        break;
      case 'help':
        setOutput([
          ...output,
          `${getPrompt()}${command}`,
          'Available commands:',
          ...Object.entries(commands).map(([cmd, desc]) => `  ${cmd}: ${desc}`),
          '---LINE_BREAK---', // Special marker for line break
          ...Object.entries(specialCommands).map(
            ([cmd, desc]) => `  ${cmd}: ${desc}`,
          ),
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
        if (args.length > 0) {
          const index = Number.parseInt(args[0]) - 1;
          if (index >= 0 && index < socialLinks.length) {
            const platform = socialLinks[index];
            setOutput([
              ...output,
              `${getPrompt()}${command}`,
              `Opening ${platform.name} profile...`,
            ]);
            window.open(platform.url, '_blank');
          } else {
            setOutput([
              ...output,
              `${getPrompt()}${command}`,
              `Invalid option: ${args[0]}`,
              'Please choose a number between 1 and ' + socialLinks.length,
            ]);
          }
        } else {
          setOutput([
            ...output,
            `${getPrompt()}${command}`,
            'My Social Media Links:',
            ...socialLinks.map(
              (platform, index) =>
                `${index + 1}. ${platform.name}: ${platform.url}`,
            ),
            '',
            'To open a specific profile, use: socials <number>',
            'eg: socials 1 opens LinkedIn',
          ]);
        }
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

  const handleTabCompletion = () => {
    const [cmd, ...args] = input.trim().split(' ');
    const commandNames = Object.keys(commands);

    if (cmd.toLowerCase() === 'theme' && args.length === 1) {
      // Handle theme completion
      const themeNames = Object.keys(themes);
      const matchingThemes = themeNames.filter((theme) =>
        theme.startsWith(args[0].toLowerCase()),
      );

      if (matchingThemes.length === 1) {
        setInput(`theme ${matchingThemes[0]}`);
      } else if (matchingThemes.length > 1) {
        setOutput([
          ...output,
          `${getPrompt()}${input}`,
          'Possible theme completions:',
          ...matchingThemes,
        ]);
      }
    } else {
      // Handle regular command completion
      const matchingCommands = commandNames.filter((command) =>
        command.startsWith(cmd.toLowerCase()),
      );

      if (matchingCommands.length === 1) {
        setInput(matchingCommands[0]);
      } else if (matchingCommands.length > 1) {
        setOutput([
          ...output,
          `${getPrompt()}${input}`,
          'Possible completions:',
          ...matchingCommands,
        ]);
      }
    }
  };

  return { handleCommand, handleTabCompletion };
};

export default useCommandHandler;
