import React from 'react';

const TextIcon = ({ width = 24, height = 24, color = '#1e97ee' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M6 5.25C6 4.56 6.56 4 7.25 4h17.5c.69 0 1.25.56 1.25 1.25v3.5a1.25 1.25 0
         1 1-2.5 0V6.5h-6.25v19h1.5a1.25 1.25 0 1 1 0 2.5h-5.5a1.25 1.25 0 1 1 0-2.5h1.5v-19H8.5v2.25a1.25 1.25
          0 1 1-2.5 0z' />
    </svg>
  );
};

export default TextIcon;
