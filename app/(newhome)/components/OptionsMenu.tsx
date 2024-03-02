import clsx from 'clsx';

type LabelledOption = {
    name: string;
    onClick: () => void;
};

type CustomOption = {
    jsxElement: React.ReactNode;
};

export type Option = LabelledOption | CustomOption;

interface OptionsMenuProps {
    className?: string;
    showOptionsMenu: boolean;
    optionsList: Option[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
    optionsList,
    showOptionsMenu,
    className,
}) => {
    return (
        <div
            className={clsx(
                'absolute  bg-searchBoxBg z-50  flex-col py-4 text-base  smallMobiles:text-lg midPhones:text-xl opacity-0 scale-0 transition-all duration-150',
                className,
                showOptionsMenu && 'flex opacity-100 scale-100'
            )}
        >
            {optionsList.map((option, index) => (
                <div
                    key={index}
                    onClick={'name' in option ? option.onClick : undefined}
                    className="cursor-pointer hover:bg-gray-800 py-4 px-12 text-center w-full"
                >
                    {'name' in option ? option.name : option.jsxElement}
                </div>
            ))}
        </div>
    );
};

export default OptionsMenu;
