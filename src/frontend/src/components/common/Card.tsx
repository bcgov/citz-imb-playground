import "./Card.css";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export const Card = (props: CardProps) => {
  const { children } = props;
  return <div className="card">{children}</div>;
};
