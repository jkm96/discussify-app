import React from 'react';

const WebAppIcon = ({
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
      <path fill={color} d='M22 17h-4v-7h4m1-2h-6a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h6a1 1 0 0
             0 1-1V9a1 1 0 0 0-1-1M4 6h18V4H4a2 2 0 0 0-2 2v11H0v3h14v-3H4z' />
    </svg>
  );
};

export default WebAppIcon;
