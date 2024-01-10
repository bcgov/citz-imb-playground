import "./Card.css";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  center?: boolean;
  paddingY?: string;
  paddingX?: string;
};

export const Card = (props: CardProps) => {
  const { children, center, paddingY, paddingX } = props;
  return (
    <div
      style={{
        paddingLeft: paddingX ?? "",
        paddingRight: paddingX ?? "",
        paddingTop: paddingY ?? "",
        paddingBottom: paddingY ?? "",
      }}
      className={`card ${center ? "justifyCenter" : ""}`}
    >
      {children}
    </div>
  );
};
