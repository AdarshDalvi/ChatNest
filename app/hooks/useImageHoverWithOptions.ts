import { useState } from 'react';

const useImageHoverWithOptions = (showOptionsMenu: boolean) => {
    const [isHovering, setIsHovering] = useState(false);

    const handleImageHover = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (!showOptionsMenu) {
            if (event.type === 'mouseenter') {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        } else {
            setIsHovering(true);
        }
    };

    return { isHovering, handleImageHover, setIsHovering };
};

export default useImageHoverWithOptions;
