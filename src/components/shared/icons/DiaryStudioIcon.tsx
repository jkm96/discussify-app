import React from 'react';

const DiaryStudioIcon = ({ width = 24, height = 24, color = '#ffffff' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M25 6a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7a1 1 0 0 1
            1-1h8V4a1 1 0 1 1 2 0v2zm-3.905 15l3.771 6.498a1 1 0 0 1-1.731 1.004L18.782 21H17v6.95a1 1 0
            1 1-2 0V21h-1.782l-4.352 7.502a1.003 1.003 0 0 1-1.368.363a1 1 0 0 1-.363-1.367L10.906 21H9a1 1 0
            1 1 0-2h14a1 1 0 1 1 0 2z' />
    </svg>
  );
};

export default DiaryStudioIcon;
