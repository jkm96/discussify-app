import React from 'react';

const ReplyIcon = ({
                      width = 24, height = 24, color = '#ad0d32'
                  }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}>
            <path fill={color}
                  d="M18 8H6V6h12zm0 3H6V9h12zm0 3H6v-2h12zm4-10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14l4 4z"/>
        </svg>
    );
};

export default ReplyIcon;
