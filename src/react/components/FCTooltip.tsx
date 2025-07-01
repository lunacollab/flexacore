import React, { ReactNode, HTMLAttributes } from 'react';

export interface FCTooltipProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  content?: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
  children?: ReactNode;
}

const FCTooltip: React.FC<FCTooltipProps> = ({
  content = '',
  placement = 'top',
  show = false,
  children,
  className = '',
  ...rest
}) => {
  const classes = [
    'fc-tooltip',
    show ? 'fc-tooltip-show' : '',
    className
  ].join(' ');
  return (
    <div className={classes} role="tooltip" {...rest} style={{ display: show ? 'block' : 'none' }}>
      {content}
      {children}
    </div>
  );
};

export default FCTooltip; 