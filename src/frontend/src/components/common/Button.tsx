import "./Button.css";
import React, { ReactNode } from "react";

type ButtonProps = {
  color?: "blue" | "grey";
  onClick: Function;
  children: ReactNode;
};

export const Button = (props: ButtonProps) => {
  const { color = "grey", onClick, children } = props;

  // Background color className:
  const backgroundColor =
    color === "blue"
      ? "backgroundLightBlue"
      : color === "grey"
      ? "backgroundLightGrey"
      : "";

  return (
    <button className={`${backgroundColor}`} onClick={() => onClick()}>
      {children}
    </button>
  );
};
