import clsx from 'clsx';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: 'submit' | 'button';
    fullWidth?: boolean;
    disabled?: boolean;
    iconButton?: boolean;
};

function Button({
    children,
    onClick,
    type = 'button',
    fullWidth,
    disabled,
    iconButton,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                `
            flex
            gap-2.5
            justify-center
            py-3
            text-[1.2rem]
            rounded-lg
            text-center`,
                fullWidth && 'w-full',
                disabled && 'bg-opacity-50 cursor-default pointer-events-none',
                iconButton
                    ? `bg-white 
                        transition-colors 
                        duration-300 
                        shadow-[0px_0px_10px_1px_#00000024] 
                        hover:bg-gray-200 
                        hover:border 
                        hover:border-gray-300 
                        hover: border-[0.5px]`
                    : 'text-white bg-black hover:bg-slate-800'
            )}
        >
            {children}
        </button>
    );
}

export default Button;
