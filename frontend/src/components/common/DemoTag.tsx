import React from 'react';

interface DemoTagProps {
  label?: string;
  className?: string;
  tooltip?: string;
}

export const DemoTag: React.FC<DemoTagProps> = ({
  label = 'DEMO',
  className = '',
  tooltip = 'Simulated mock value for Milestone 1 frontend preview',
}) => {
  return (
    <span
      title={tooltip}
      className={`inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono font-semibold tracking-widest uppercase rounded border bg-amber-500/10 text-amber-300 border-amber-500/30 select-none cursor-help ${className}`}
    >
      {label}
    </span>
  );
};
