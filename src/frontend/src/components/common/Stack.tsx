import "./Stack.css";
import React, { ReactNode } from "react";

type StackProps = {
  children: ReactNode;
  direction?: "row" | "column";
  gap?: string;
  center?: boolean;
};

export const Stack = (props: StackProps) => {
  const { children, direction = "column", gap = "5px", center = false } = props;

  // Stack Direction className:
  const directionClass =
    direction === "row" ? "directionRow" : "directionColumn";

  return (
    <div
      style={{ gap }}
      className={`stack ${directionClass} ${center ? "alignCenter" : ""}`}
    >
      {children}
    </div>
  );
};
