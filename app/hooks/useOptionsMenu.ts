import { useCallback, useState } from 'react';
import { MenuPosition } from '../(home)/components/OptionsMenu';

const useOptionsMenu = () => {
    const [menuPosition, setMenuPosition] = useState<MenuPosition>();
    const [showOptionsMenu, setShowOptionsMenu] = useState(false);
    const [prevPosition, setPrevPosition] = useState<{
        top: number;
        left: number;
    } | null>(null);

    const toggleOptionsMenu = useCallback(
        (top: number, left: number) => {
            if (prevPosition) {
                if (prevPosition.top === top && prevPosition.left === left) {
                    if (showOptionsMenu) {
                        setShowOptionsMenu(false);
                    } else {
                        setShowOptionsMenu(true);
                    }
                } else {
                    if (showOptionsMenu) {
                        setShowOptionsMenu(false);
                        setMenuPosition((prevMenuPosition) => {
                            return {
                                ...prevMenuPosition,
                                top: top.toString() + 'px',
                                left: left.toString() + 'px',
                            };
                        });
                        setPrevPosition((prevPosition) => ({
                            top: top,
                            left: left,
                        }));
                    } else {
                        setShowOptionsMenu(true);
                        setMenuPosition((prevMenuPosition) => {
                            return {
                                ...prevMenuPosition,
                                top: top.toString() + 'px',
                                left: left.toString() + 'px',
                            };
                        });
                    }
                }
            } else {
                setShowOptionsMenu(true);
                setMenuPosition((prevMenuPosition) => {
                    return {
                        ...prevMenuPosition,
                        top: top.toString() + 'px',
                        left: left.toString() + 'px',
                    };
                });
                setPrevPosition((prevPosition) => ({
                    top: top,
                    left: left,
                }));
            }
        },
        [prevPosition, showOptionsMenu]
    );

    const closeOptionsMenu = () => {
        setShowOptionsMenu(false);
        setPrevPosition(null);
    };

    return {
        showOptionsMenu,
        menuPosition,
        toggleOptionsMenu,
        closeOptionsMenu,
    };
};

export default useOptionsMenu;
