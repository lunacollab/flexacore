import React from 'react';

export interface FCStep {
  key: string;
  label: string;
  content?: React.ReactNode;
}

export interface FCStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: FCStep[];
  activeStep: string;
  onStepChange: (key: string) => void;
  className?: string;
}

export const FCStepper: React.FC<FCStepperProps> = ({
  steps,
  activeStep,
  onStepChange,
  className = '',
  ...rest
}) => {
  return (
    <div className={['fc-stepper', className].filter(Boolean).join(' ')} {...rest}>
      <div className="fc-stepper-list">
        {steps.map((step, idx) => (
          <button
            key={step.key}
            className={['fc-step', activeStep === step.key ? 'fc-step-active' : '', idx === 0 ? 'fc-step-first' : '', idx === steps.length - 1 ? 'fc-step-last' : ''].filter(Boolean).join(' ')}
            onClick={() => onStepChange(step.key)}
            type="button"
          >
            {step.label}
          </button>
        ))}
      </div>
      <div className="fc-stepper-content">
        {steps.find(step => step.key === activeStep)?.content}
      </div>
    </div>
  );
}; 