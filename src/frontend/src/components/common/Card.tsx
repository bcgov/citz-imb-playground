import "./Card.css";
import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  center?: boolean;
  paddingY?: string;
  paddingX?: string;
  height?: string;
};

export const Card = (props: CardProps) => {
  const { children, center, paddingY, paddingX, height } = props;
  return (
    <div
      style={{
        paddingLeft: paddingX ?? "",
        paddingRight: paddingX ?? "",
        paddingTop: paddingY ?? "",
        paddingBottom: paddingY ?? "",
        height: height ?? "",
      }}
      className={`card ${center ? "justifyCenter" : ""}`}
    >
      {children}
    </div>
  );
};
