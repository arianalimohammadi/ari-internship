import React from 'react';

const CustomSliderArrow = ({ className, style, onClick, direction }) => (
  <button
    className={className}
    style={{
      ...style,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "gray",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
      cursor: "pointer",
      zIndex: 1,
    }}
    onClick={onClick}
  >
    {direction === "prev" ? "◀" : "▶"}
  </button>
);

export const PrevArrow = (props) => <CustomSliderArrow {...props} direction="prev" />;
export const NextArrow = (props) => <CustomSliderArrow {...props} direction="next" />;
