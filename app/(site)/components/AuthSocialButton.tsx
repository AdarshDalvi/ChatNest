import { IconType } from 'react-icons';

interface AuthSocialButtonProps {
    onClick: () => void;
    icon: IconType;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    onClick,
    icon: Icon,
}) => {
    return (
        <button
            onClick={onClick}
            className="w-full bg-white inline-flex justify-center transition-colors hover:bg-gray-300 ring-1 ring-inset ring-gray-300 py-3 rounded-md text-gray-500 shadow-sm "
        >
            <Icon />
        </button>
    );
};

export default AuthSocialButton;
