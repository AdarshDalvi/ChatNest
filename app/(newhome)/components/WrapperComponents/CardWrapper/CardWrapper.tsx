import clsx from 'clsx';
import './CardWrapper.scss';

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
                text-xl midPhones:text-2xl
                pl-6
                gap-6`,
                !selected && 'hover:bg-cardHoverColor',
                selected && 'bg-cardFocusColor',
                lastElement && 'relative last-element'
            )}
        >
            {children}
        </div>
    );
};

export default CardWrapper;
