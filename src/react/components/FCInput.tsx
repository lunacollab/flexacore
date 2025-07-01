import React from 'react';

export interface FCInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const FCInput: React.FC<FCInputProps> = ({
  className = '',
  ...rest
}) => {
  return (
    <input
      className={['fc-input', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}; 