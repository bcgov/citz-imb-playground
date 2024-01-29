import React from 'react';

type IconProps = {
  className?: string;
};

export const DownArrowIcon = (props: IconProps) => {
  const { className = '' } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      height="15px"
      width="15px"
      className={className}
    >
      <path d="m31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1l-128.6 128.7c-7.8 7.8-20.5 7.8-28.3 0l-128.6-128.7c-12.6-12.6-3.7-34.1 14.1-34.1z" />
    </svg>
  );
};
