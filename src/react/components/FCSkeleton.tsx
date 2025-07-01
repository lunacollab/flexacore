import React from 'react';

export interface FCSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
}

export const FCSkeleton: React.FC<FCSkeletonProps> = ({
  width,
  height,
  circle = false,
  className = '',
  style,
  ...rest
}) => {
  const styles: React.CSSProperties = {
    width,
    height,
    borderRadius: circle ? '50%' : undefined,
    ...style
  };
  return (
    <div className={['fc-skeleton', className].filter(Boolean).join(' ')} style={styles} {...rest} />
  );
}; 