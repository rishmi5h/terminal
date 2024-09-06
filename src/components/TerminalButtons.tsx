import React, { useState } from 'react';

interface TerminalButtonsProps {
  theme: string;
}

const TerminalButtons: React.FC<TerminalButtonsProps> = ({ theme }) => {
  const [isHovered, setIsHovered] = useState(false);

  const getButtonStyles = () => {
    switch (theme) {
      case 'windows-cmd':
      case 'windows-powershell':
        return {
          button: 'flex items-center justify-center text-xs',
          container: 'flex justify-end space-x-2',
          shape: 'h-4 w-4 rounded-sm',
        };
      case 'mac-terminal':
        return {
          button: 'flex items-center justify-center',
          container: 'flex justify-start space-x-2',
          shape: 'h-3 w-3 rounded-full',
        };
      default:
        return {
          button: 'flex items-center justify-center text-xs',
          container: 'flex justify-end space-x-2',
          shape: 'h-3 w-3 rounded-full',
        };
    }
  };

  const getButtonColors = () => {
    switch (theme) {
      case 'mac-terminal':
        return ['bg-red-500', 'bg-yellow-500', 'bg-green-500'];
      case 'windows-cmd':
      case 'windows-powershell':
        return ['bg-transparent', 'bg-transparent', 'bg-transparent'];
      case 'ubuntu':
        return ['bg-orange-500', 'bg-orange-300', 'bg-orange-700'];
      default:
        return ['bg-gray-500', 'bg-gray-500', 'bg-gray-500'];
    }
  };

  const getButtonIcons = () => {
    if (theme === 'mac-terminal' && !isHovered) {
      return ['', '', ''];
    }
    switch (theme) {
      case 'windows-cmd':
      case 'windows-powershell':
        return ['−', '□', '×'];
      case 'mac-terminal':
        return ['×', '−', '+'];
      case 'ubuntu':
        return ['', '', ''];
      default:
        return ['×', '□', '−'];
    }
  };

  const getButtonHoverColors = () => {
    if (theme === 'windows-cmd' || theme === 'windows-powershell') {
      return ['hover:bg-gray-700', 'hover:bg-gray-700', 'hover:bg-red-600'];
    }
    return ['', '', ''];
  };

  const [closeColor, minimizeColor, maximizeColor] = getButtonColors();
  const [closeIcon, minimizeIcon, maximizeIcon] = getButtonIcons();
  const [closeHover, minimizeHover, maximizeHover] = getButtonHoverColors();
  const { button, container, shape } = getButtonStyles();

  return (
    <div
      className={`mb-2 ${container}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`${shape} ${minimizeColor} ${button} ${minimizeHover}`}>
        {minimizeIcon}
      </div>
      <div className={`${shape} ${maximizeColor} ${button} ${maximizeHover}`}>
        {maximizeIcon}
      </div>
      <div className={`${shape} ${closeColor} ${button} ${closeHover}`}>
        {closeIcon}
      </div>
    </div>
  );
};

export default TerminalButtons;
