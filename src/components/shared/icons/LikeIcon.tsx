import React from 'react';

export function LikeIcon({width = 24, height = 24, color = '#ffffff'}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height}  viewBox={'0 0 24 24'}>
            <g fill="none">
                <path fill="currentColor"
                      d="m15 10l-.493-.082A.5.5 0 0 0 15 10.5zM4 10v-.5a.5.5 0 0 0-.5.5zm16.522 2.392l.49.098zM6
                      20.5h11.36v-1H6zm12.56-11H15v1h3.56zm-3.067.582l.806-4.835l-.986-.165l-.806 4.836zM14.82 3.5h-.213v1h.213zm-3.126
                       1.559L9.178 8.832l.832.555l2.515-3.774zM7.93 9.5H4v1h3.93zM3.5 10v8h1v-8zm16.312 8.49l1.2-6l-.98-.196l-1.2 6zM9.178
                        8.832A1.5 1.5 0 0 1 7.93 9.5v1a2.5 2.5 0 0 0 2.08-1.113zm7.121-3.585A1.5 1.5 0 0 0 14.82 3.5v1a.5.5 0 0
                        1 .494.582zM18.56 10.5a1.5 1.5 0 0 1 1.471 1.794l.98.196a2.5 2.5 0 0 0-2.45-2.99zm-1.2 10a2.5 2.5 0 0 0
                        2.452-2.01l-.98-.196A1.5 1.5 0 0 1 17.36 19.5zm-2.754-17a3.5 3.5 0 0 0-2.913 1.559l.832.554a2.5 2.5 0 0 1
                         2.08-1.113zM6 19.5A1.5 1.5 0 0 1 4.5 18h-1A2.5 2.5 0 0 0 6 20.5z"/>
                <path stroke="currentColor" d="M8 10v10"/>
            </g>
        </svg>
    );
}

export function LikedIcon({width = 24, height = 24, color = '#ffffff'}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={'0 0 24 24'}>
            <path fill="currentColor"
                  d="M23 10a2 2 0 0 0-2-2h-6.32l.96-4.57c.02-.1.03-.21.03-.32c0-.41-.17-.79-.44-1.06L14.17 1L7.59 7.58C7.22 7.95 7 8.45 7 9v10a2 2 0 0 0
              2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73zM1 21h4V9H1z"/>
        </svg>
    );
}

export function TimerIcon({width = 24, height = 24, color = '#ffffff'}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg"
             width={width}
             height={height}
             viewBox={'0 0 24 24'}>

            <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"/>
                <path d="M12 7v5l3 3"/>
            </g>
        </svg>
    );
}


export function PeopleIcon({width = 24, height = 24, color = '#ffffff'}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={'0 0 24 24'}>
            <path fill="currentColor"
                  d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3s1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8
              5S5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5m8
              0c-.29 0-.62.02-.97.05c.02.01.03.03.04.04c1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5"/>
        </svg>
    );
}

export function CommentIcon({width = 24, height = 24, color = '#ffffff'}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={'0 0 24 24'}>
            <path fill="currentColor" d="M22 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14l4 4z"/>
        </svg>
    );
}

export function EyeIcon({width = 24, height = 24, color = '#fff'}) {
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox={'0 0 24 24'}>
            <path fill="currentColor"
                  d="M12 9a3 3 0 0 1 3 3a3 3 0 0 1-3 3a3 3 0 0 1-3-3a3 3 0 0 1 3-3m0-4.5c5 0 9.27 3.11 11 7.5c-1.73 4.39-6 7.5-11 7.5S2.73
              16.39 1 12c1.73-4.39 6-7.5 11-7.5M3.18 12a9.821 9.821 0 0 0 17.64 0a9.821 9.821 0 0 0-17.64 0"/>
        </svg>
    );
}