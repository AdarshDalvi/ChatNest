import clsx from 'clsx';

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type: 'submit' | 'button';
    fullWidth?: boolean;
    disabled?: boolean;
};

function Button({ children, onClick, type, fullWidth, disabled }: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={clsx(
                `
            text-white
            bg-whatsappColor
            py-2.5
            text-[1.2rem]
            rounded
            hover:bg-emerald-500
        `,
                fullWidth && 'w-full',
                disabled && 'bg-opacity-5 cursor-default'
            )}
        >
            {children}
        </button>
    );
}

export default Button;
