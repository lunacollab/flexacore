import React from 'react';

export interface FCFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const FCForm: React.FC<FCFormProps> = ({
  onSubmit,
  className = '',
  children,
  ...rest
}) => {
  return (
    <form
      className={['fc-form', className].filter(Boolean).join(' ')}
      onSubmit={onSubmit}
      {...rest}
    >
      {children}
    </form>
  );
}; 