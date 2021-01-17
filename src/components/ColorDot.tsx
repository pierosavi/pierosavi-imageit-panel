import React from 'react';

// Can be used to display current color
export const ColorDot = (props: { color: string }) => {
  return (
    <div
      style={{
        height: '10px',
        width: '10px',
        backgroundColor: props.color,
        borderRadius: '50%',
        display: 'inline-block',
      }}
    ></div>
  );
};
