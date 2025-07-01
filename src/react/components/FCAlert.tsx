import React from 'react';

export interface FCAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
  dismissible?: boolean;
}

export const FCAlert: React.FC<FCAlertProps> = ({
  variant = 'primary',
  className = '',
  children,
  onClose,
  dismissible = false,
  ...rest
}) => {
  return (
    <div className={['fc-alert', `fc-alert-${variant}`, dismissible ? 'fc-alert-dismissible' : '', className].filter(Boolean).join(' ')} {...rest}>
      {children}
      {dismissible && (
        <button className="fc-alert-close" onClick={onClose} aria-label="Đóng">×</button>
      )}
    </div>
  );
}; 