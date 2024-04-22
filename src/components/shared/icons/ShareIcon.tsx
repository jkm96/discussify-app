import React from 'react';

const ShareIcon = ({
                      width = 24, height = 24, color = '#ad0d32'
                  }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}>
            <path fill={color}
                  d="M18 22q-1.25 0-2.125-.875T15 19q0-.175.025-.363t.075-.337l-7.05-4.1q-.425.375-.95.588T6 15q-1.25 0-2.125-.875T3 12t.875-2.125T6 9q.575
                  0 1.1.213t.95.587l7.05-4.1q-.05-.15-.075-.337T15 5q0-1.25.875-2.125T18 2t2.125.875T21 5t-.875 2.125T18 8q-.575 0-1.1-.212t-.95-.588L8.9
                  11.3q.05.15.075.338T9 12t-.025.363t-.075.337l7.05 4.1q.425-.375.95-.587T18 16q1.25 0 2.125.875T21 19t-.875 2.125T18 22"/>
        </svg>
    );
};

export default ShareIcon;
