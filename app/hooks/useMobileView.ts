import { useEffect, useState } from 'react';

const useMobileView = (width: number = 768) => {
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < width) {
                setMobileView(true);
            } else {
                setMobileView(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { mobileView };
};

export default useMobileView;
