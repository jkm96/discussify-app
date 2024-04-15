import React from 'react';

const TrashIcon = ({ width = 24, height = 24, color = '#da1028' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3zm0 5h2v9H9zm4 0h2v9h-2z' />
    </svg>
  );
};

export default TrashIcon;
