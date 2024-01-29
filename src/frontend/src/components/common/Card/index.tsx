import './styles.css';
import React, { ReactNode } from 'react';

type CardProps = {
  children: ReactNode;
  center?: boolean;
  paddingY?: string;
  paddingX?: string;
  height?: string;
  color?: string;
  className?: string;
};

export const Card = (props: CardProps) => {
  const { children, className, center, paddingY, paddingX, height, color } = props;
  return (
    <div
      style={{
        paddingLeft: paddingX ?? '',
        paddingRight: paddingX ?? '',
        paddingTop: paddingY ?? '',
        paddingBottom: paddingY ?? '',
        height: height ?? '',
        backgroundColor: color ?? '',
      }}
      className={`${className ?? ''} card ${center ? 'justifyCenter' : ''}`}
    >
      {children}
    </div>
  );
};
