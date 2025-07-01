import React, { InputHTMLAttributes } from 'react';

export interface FCSwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
}

const FCSwitch: React.FC<FCSwitchProps> = ({
  checked = false,
  disabled = false,
  label = '',
  onChange,
  className = '',
  ...rest
}) => {
  const classes = [
    'fc-switch',
    disabled ? 'fc-switch-disabled' : '',
    className
  ].join(' ');
  return (
    <label className={classes}>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={e => onChange && onChange(e.target.checked)}
        {...rest}
      />
      <span className="fc-switch-slider"></span>
      {label && <span className="fc-switch-label">{label}</span>}
    </label>
  );
};

export default FCSwitch; 