import React from 'react';

export interface FCModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const FCModal: React.FC<FCModalProps> = ({
  open,
  onClose,
  className = '',
  children,
  ...rest
}) => {
  React.useEffect(() => {
    if (open) {
      document.body.classList.add('fc-modal-open');
    } else {
      document.body.classList.remove('fc-modal-open');
    }
    return () => {
      document.body.classList.remove('fc-modal-open');
    };
  }, [open]);

  return (
    <div
      className={[
        'fc-modal',
        open ? 'fc-modal-active' : '',
        className
      ].filter(Boolean).join(' ')}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      onClick={e => {
        if (e.target === e.currentTarget && onClose) onClose();
      }}
      {...rest}
    >
      <div className="fc-modal-content">
        {children}
        <button className="fc-modal-close" onClick={onClose} type="button" aria-label="Đóng">×</button>
      </div>
    </div>
  );
}; 