import React from 'react';

const UploadIcon = ({ width = 24, height = 24, color = '#1e97ee' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M9 16v-6H5l7-7l7 7h-4v6zm-4 4v-2h14v2z' />
    </svg>
  );
};

export default UploadIcon;
