import React, { ReactNode, HTMLAttributes } from 'react';

export interface FCDropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  label?: string;
  open?: boolean;
  onToggle?: (open: boolean) => void;
  children?: ReactNode;
}

const FCDropdown: React.FC<FCDropdownProps> = ({
  label = 'Dropdown',
  open = false,
  onToggle,
  children,
  className = '',
  ...rest
}) => {
  const classes = [
    'fc-dropdown',
    open ? 'fc-dropdown-open' : '',
    className
  ].join(' ');
  return (
    <div className={classes} {...rest}>
      <button
        className="fc-dropdown-toggle fc-btn"
        type="button"
        aria-expanded={open}
        onClick={() => onToggle && onToggle(!open)}
      >
        {label}
        <span className="fc-dropdown-arrow"></span>
      </button>
      <div className={['fc-dropdown-menu', open ? 'fc-dropdown-menu-show' : ''].join(' ')}>
        {children}
      </div>
    </div>
  );
};

export default FCDropdown; 