import React from 'react';

const TimerIcon = ({
                       width = 15,
                       height = 20,
                       color = '#1eebc2',
                       className = 'absolute h-6 w-6 text-fountain-500',
                     }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg"
         width={width}
         height={height}
         viewBox={'0 0 24 24'}>

        <g fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="8.5"/>
            <path strokeLinecap="round"
                  d="M5 2.804A6 6 0 0 0 2.804 5M19 2.804A6 6 0 0 1 21.196 5M12 6.5v5.25c0 .138.112.25.25.25h4.25"/>
        </g>
    </svg>
)
    ;
};

export default TimerIcon;
