import React from 'react';

export interface FCSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  children?: React.ReactNode;
}

export const FCSelect: React.FC<FCSelectProps> = ({
  className = '',
  children,
  ...rest
}) => {
  return (
    <select
      className={['fc-select', className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </select>
  );
}; 