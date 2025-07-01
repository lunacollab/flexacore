import React from 'react';

export interface FCTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

export const FCTextarea: React.FC<FCTextareaProps> = ({
  className = '',
  ...rest
}) => {
  return (
    <textarea
      className={['fc-textarea', className].filter(Boolean).join(' ')}
      {...rest}
    />
  );
}; 