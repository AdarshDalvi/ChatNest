import { useState } from 'react';

const useImageHover = () => {
    const [isHovering, setIsHovering] = useState(false);

    const handleImageHover = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.type === 'mouseenter') {
            setIsHovering(true);
        } else {
            setIsHovering(false);
        }
    };

    return { isHovering, handleImageHover, setIsHovering };
};

export default useImageHover;
