import React from 'react';

const MemoriesIcon = ({
                        width = 24,
                        height = 24,
                        color = '#1eebc2',
                        className = 'absolute h-6 w-6 text-fountain-500',
                      }) => {
  return (
    <svg
      className={className}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}>
      <path fill={color} d='M3 7V5h2V4a2 2 0 0 1 2-2h6v7l2.5-1.5L18 9V2h1c1.05 0 2 .95 2 2v16c0
            1.05-.95 2-2 2H7c-1.05 0-2-.95-2-2v-1H3v-2h2v-4H3v-2h2V7zm4 4H5v2h2zm0-4V5H5v2zm0 12v-2H5v2z' />
    </svg>
  );
};

export default MemoriesIcon;
