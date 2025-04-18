import React from 'react';

const BGColorIcon = ({ width = 24, height = 24, color = '#b20ca9' }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <g fill='none'>
        <path d='M24 0v24H0V0zM12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036c-.01-.003-.019
                0-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z' />
        <path fill={color} d='M21.129 4.012a1.5 1.5 0 0 1-.141 2.117l-16 14a1.5 1.5 0 0 1-1.976-2.258l16-14a1.5 1.5 0
                 0 1 2.117.141m0 6.375a1.5 1.5 0 0 1-.141 2.117l-8.715 7.625a1.5 1.5 0 0 1-1.975-2.258l8.714-7.625a1.5 1.5 0
                  0 1 2.117.141m0 5.875a1.5 1.5 0 0 1-.03 2.01l-.111.107l-2 1.75a1.5 1.5 0 0 1-2.086-2.151l.11-.107l2-1.75a1.5
                  1.5 0 0 1 2.117.141m-7.286-12.25a1.5 1.5 0 0 1-.14 2.117l-8.715 7.625a1.5 1.5 0 0 1-1.976-2.258l8.715-7.625a1.5
                   1.5 0 0 1 2.116.141m-6.286 0a1.5 1.5 0 0 1-.03 2.01l-.11.107l-2.43 2.125a1.5 1.5 0 0
                   1-2.085-2.151l.11-.107l2.429-2.125a1.5 1.5 0 0 1 2.116.141' />
      </g>
    </svg>

  );
};

export default BGColorIcon;