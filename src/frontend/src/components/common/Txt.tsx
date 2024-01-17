import React, { ReactNode } from 'react';

type TxtProps = {
  children: ReactNode;
  size?: 's' | 'm' | 'l';
  bold?: boolean;
};

export const Txt = (props: TxtProps) => {
  const { children, size = 'm', bold = false } = props;

  // Text Size className:
  const sizeClass = size === 's' ? 'textSmall' : size === 'l' ? 'textLarge' : '';

  return <p className={`${sizeClass} ${bold ? 'bold' : ''}`}>{children}</p>;
};
