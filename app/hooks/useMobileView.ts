import { useEffect, useState } from 'react';

const useMobileView = () => {
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
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
