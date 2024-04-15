import React from 'react';

const BackArrowIcon = ({ width = 24, height = 24, color = '#ffffff' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M21 11H6.414l5.293-5.293l-1.414-1.414L2.586 12l7.707 7.707l1.414-1.414L6.414 13H21z' />
    </svg>
  );
};

export default BackArrowIcon;
