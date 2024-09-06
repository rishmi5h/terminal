import React from 'react';

interface TerminalOutputProps {
  output: string[];
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({ output }) => {
  return (
    <div className="mb-4 whitespace-pre-wrap">
      {output.map((line, index) =>
        line === '---LINE_BREAK---' ? (
          <div className="h-4" key={index}></div>
        ) : (
          <div key={index}>{line}</div>
        ),
      )}
    </div>
  );
};

export default TerminalOutput;
