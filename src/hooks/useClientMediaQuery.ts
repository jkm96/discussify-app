import {useEffect, useState} from 'react';

const useClientMediaQuery = (query:any) => {
    const [isClient, setIsClient] = useState(false);
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        setIsClient(true);

        const handleResize = () => {
            const mediaQuery = window.matchMedia(query);
            setMatches(mediaQuery.matches);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [query]);

    return { isClient, matches };
};

export default useClientMediaQuery;
