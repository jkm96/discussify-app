import React from 'react';

const BookmarkIcon = ({
                      width = 24, height = 24, color = '#686062'
                  }) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={width}
            height={height}
            viewBox={'0 0 24 24'}>
            <path fill="currentColor" d="M5 21V5q0-.825.588-1.412T7 3h10q.825 0 1.413.588T19 5v16l-7-3z"/>
        </svg>
    );
};

export default BookmarkIcon;
