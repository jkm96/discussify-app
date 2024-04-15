import React from 'react';

const DownloadIcon = ({
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
      <path fill={color} d='m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-8 4v-5h2v3h12v-3h2v5z' />
    </svg>
  );
};

export default DownloadIcon;
