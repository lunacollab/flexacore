import React, { ReactNode, HTMLAttributes } from 'react';

export interface FCCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  header?: ReactNode;
  footer?: ReactNode;
  title?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  border?: boolean;
  shadow?: boolean;
  showHeader?: boolean;
  showFooter?: boolean;
}

const FCCard: React.FC<FCCardProps> = ({
  header,
  footer,
  title,
  variant = 'light',
  border = true,
  shadow = false,
  showHeader = false,
  showFooter = false,
  className = '',
  children,
  ...rest
}) => {
  const classes = [
    'fc-card',
    `fc-card-${variant}`,
    border ? 'fc-card-border' : '',
    shadow ? 'fc-card-shadow' : '',
    className
  ].join(' ');
  return (
    <div className={classes} {...rest}>
      {(header || showHeader) && (
        <div className="fc-card-header">
          {title && <h5 className="fc-card-title">{title}</h5>}
          {header}
        </div>
      )}
      <div className="fc-card-body">{children}</div>
      {(footer || showFooter) && (
        <div className="fc-card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default FCCard; 