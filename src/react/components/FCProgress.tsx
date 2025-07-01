import React from 'react';

export interface FCProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  className?: string;
}

export const FCProgress: React.FC<FCProgressProps> = ({
  value,
  max = 100,
  className = '',
  ...rest
}) => {
  const percent = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={['fc-progress', className].filter(Boolean).join(' ')} {...rest}>
      <div className="fc-progress-bar" style={{ width: percent + '%' }} />
    </div>
  );
}; 