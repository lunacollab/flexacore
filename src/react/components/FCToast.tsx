import React, { useEffect } from 'react';

export interface FCToastProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'info' | 'success' | 'warning' | 'danger';
  message: string;
  duration?: number;
  onClose?: () => void;
  className?: string;
}

export const FCToast: React.FC<FCToastProps> = ({
  type = 'info',
  message,
  duration = 3000,
  onClose,
  className = '',
  ...rest
}) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  return (
    <div className={['fc-toast', `fc-toast-${type}`, className].filter(Boolean).join(' ')} {...rest}>
      {message}
      <button className="fc-toast-close" onClick={onClose} aria-label="Đóng">×</button>
    </div>
  );
}; 