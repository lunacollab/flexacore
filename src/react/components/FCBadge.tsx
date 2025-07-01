import React from 'react';

export interface FCBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
  children?: React.ReactNode;
}

export const FCBadge: React.FC<FCBadgeProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...rest
}) => {
  return (
    <span className={['fc-badge', `fc-badge-${variant}`, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </span>
  );
}; 