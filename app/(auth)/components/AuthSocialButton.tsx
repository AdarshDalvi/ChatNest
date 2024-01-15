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
            className={`
                w-full 
                bg-white 
                inline-flex border 
                justify-center 
                py-2.5 
                rounded-md  
                transition-colors 
                duration-300 
                hover:bg-gray-200  
                hover:border 
                hover:border-gray-300 
                shadow-[0px_0px_10px_1px_#00000024] `}
        >
            <Icon className="text-3xl" />
        </button>
    );
};

export default AuthSocialButton;
