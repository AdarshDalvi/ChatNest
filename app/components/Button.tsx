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
            py-2.5
            text-[1.2rem]
            rounded
            text-center`,
                fullWidth && 'w-full',
                disabled && 'bg-opacity-50 cursor-default pointer-events-none',
                iconButton
                    ? 'text-stone-900 bg-white transition-colors hover:bg-gray-300 ring-1 ring-inset ring-gray-400'
                    : 'text-white bg-whatsappColor hover:bg-emerald-500'
            )}
        >
            {children}
        </button>
    );
}

export default Button;
