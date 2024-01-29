import './styles.css';
import { Nav } from 'components/common';
import React, { ReactNode } from 'react';

type PageLayoutProps = {
  children: ReactNode;
};

export const PageLayout = (props: PageLayoutProps) => {
  const { children } = props;
  return (
    <div className="grid">
      <div className="nav">
        <Nav />
      </div>
      <div className="page">{children}</div>
    </div>
  );
};
