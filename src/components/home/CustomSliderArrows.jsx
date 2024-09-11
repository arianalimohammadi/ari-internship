import React from 'react';

const CustomSliderArrow = ({ className, style, onClick, direction }) => (
  <button
    className={className}
    style={{
      ...style,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      zIndex: 2, // Ensure it stays above other elements
      padding: 0,
      position: 'absolute', // Use absolute positioning to align properly
      top: '50%', // Center vertically
      transform: 'translateY(-50%)', // Adjust for the button height
      left: direction === 'prev' ? '-20px' : 'auto', // Position the left arrow
      right: direction === 'next' ? '-20px' : 'auto', // Position the right arrow
    }}
    onClick={onClick}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="black"
      width="24px"
      height="24px"
      style={{
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <path
        d={
          direction === 'prev'
            ? 'M15.41 16.58L10.83 12l4.58-4.58L14 6l-6 6 6 6z'
            : 'M8.59 16.58L13.17 12 8.59 7.41 10 6l6 6-6 6z'
        }
      />
    </svg>
  </button>
);

export const PrevArrow = (props) => <CustomSliderArrow {...props} direction="prev" />;
export const NextArrow = (props) => <CustomSliderArrow {...props} direction="next" />;
