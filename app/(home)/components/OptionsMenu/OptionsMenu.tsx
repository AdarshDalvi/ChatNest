import clsx from 'clsx';
import './OptionsMenu.scss';

export type Option = {
    name: string;
    onClick: () => void;
};

interface OptionsMenuProps {
    className?: string;
    showOptionsMenu: boolean;
    optionsList: Option[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
    showOptionsMenu,
    optionsList,
    className,
}) => {
    return (
        <div
            id="options-menu"
            className={clsx(
                'absolute  bg-searchBoxBg z-50  flex-col py-4 text-base  smallMobiles:text-lg midPhones:text-xl opacity-0 scale-0 transition-all duration-150 ',
                className,
                showOptionsMenu && 'flex opacity-100 scale-100'
            )}
        >
            {optionsList.map((option, index) => (
                <div
                    key={option.name + index}
                    onClick={option.onClick}
                    className="cursor-pointer hover:bg-gray-800  py-4 px-12 text-center w-full"
                >
                    {option.name}
                </div>
            ))}
        </div>
    );
};

export default OptionsMenu;
