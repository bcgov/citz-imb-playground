import "./Button.css";
import React, { ReactNode } from "react";

type ButtonProps = {
  color?: "blue" | "grey";
  size?: "s" | "m" | "l";
  onClick: Function;
  children: ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { color = "grey", size = "m", onClick, children } = props;

  // Background color className:
  const backgroundColor =
    color === "blue"
      ? "backgroundLightBlue"
      : color === "grey"
      ? "backgroundLightGrey"
      : "";

  // Size className:
  const sizeClass =
    size === "s" ? "textSmall" : size === "l" ? "textLarge" : "";

  return (
    <button
      className={`${backgroundColor} ${sizeClass}`}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
