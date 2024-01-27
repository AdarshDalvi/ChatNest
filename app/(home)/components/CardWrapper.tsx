import clsx from 'clsx';
import './CardWrapper.css';

interface CardWrapperProps {
    children: React.ReactNode;
    handleClick: () => void;
    selected?: boolean;
    lastElement?: boolean;
}
const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    handleClick,
    selected,
    lastElement,
}) => {
    return (
        <div
            onClick={handleClick}
            className={clsx(
                `
            w-full 
            flex 
            cursor-pointer
            hover:bg-[#324d5b]
            pl-6
            gap-6`,
                selected && 'bg-[#324d5b]',
                lastElement && 'relative last-element'
            )}
        >
            {children}
        </div>
    );
};

export default CardWrapper;
