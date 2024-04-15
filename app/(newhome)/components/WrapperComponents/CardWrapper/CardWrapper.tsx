import clsx from 'clsx';
import './CardWrapper.scss';

interface CardWrapperProps {
    children: React.ReactNode;
    handleClick: () => void;
    selected?: boolean;
    lastElement?: boolean;
    disabled?: boolean;
}
const CardWrapper: React.FC<CardWrapperProps> = ({
    children,
    handleClick,
    selected,
    lastElement,
    disabled,
}) => {
    return (
        <button
            disabled={disabled}
            type="button"
            onClick={handleClick}
            className={clsx(
                `
                w-full
                flex
                text-xl midPhones:text-2xl
                pl-6
                gap-6`,
                !selected && 'hover:bg-cardHoverColor',
                selected && 'bg-cardFocusColor',
                lastElement && 'relative last-element',
                disabled && 'cursor-not-allowed'
            )}
        >
            {children}
        </button>
    );
};

export default CardWrapper;
