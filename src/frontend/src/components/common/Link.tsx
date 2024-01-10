import React from "react";

type LinkProps = {
  children: string;
  url?: string; // Uses children if not specified;
  size?: "s" | "m" | "l";
  bold?: boolean;
};

export const Link = (props: LinkProps) => {
  const { children, size = "m", bold = false, url } = props;

  // Text Size className:
  const sizeClass =
    size === "s" ? "textSmall" : size === "l" ? "textLarge" : "";

  return (
    <a href={url ?? children} className={`${sizeClass} ${bold ? "bold" : ""}`}>
      {children}
    </a>
  );
};
