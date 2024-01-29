import './styles.css';
import React, { ReactNode } from 'react';

type StackProps = {
  children: ReactNode;
  direction?: 'row' | 'column';
  gap?: string;
  center?: boolean;
  minWidth?: string;
};

export const Stack = (props: StackProps) => {
  const { children, direction = 'column', gap = '5px', center = false, minWidth } = props;

  // Stack Direction className:
  const directionClass = direction === 'row' ? 'directionRow' : 'directionColumn';

  return (
    <div
      style={{ gap, minWidth }}
      className={`stack ${directionClass} ${center ? 'alignCenter' : ''}`}
    >
      {children}
    </div>
  );
};
