import React from 'react';

const PrintIcon = ({
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
      <path fill={color} d='M18 7H6V3h12zm0 5.5q.425 0 .713-.288T19 11.5q0-.425-.288-.712T18
            10.5q-.425 0-.712.288T17 11.5q0 .425.288.713T18 12.5M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5
             8h14q1.275 0 2.138.863T22 11v6h-4z' />
    </svg>
  );
};

export default PrintIcon;
