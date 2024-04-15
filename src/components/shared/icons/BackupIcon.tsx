import React from 'react';

const BackupIcon = ({
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
      <path fill={color} d='M6.08 8.02a6.001 6.001 0 0 1 11.84 0a4.5 4.5 0 0 1 4.053 4.973A6.5 6.5 0 0 0
             10.018 17H6.5a4.5 4.5 0 0 1-.42-8.982M22 16.5a5.5 5.5 0 1 1-11 0a5.5 5.5 0 0 1 11 0m-6 3a.5.5 0 0 0 1
             0v-4.793l1.646 1.647a.5.5 0 0 0 .708-.708l-2.5-2.5a.5.5 0 0 0-.708 0l-2.5 2.5a.5.5 0 0 0 .708.708L16 14.707z' />
    </svg>
  );
};

export default BackupIcon;
