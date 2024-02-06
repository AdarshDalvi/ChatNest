import clsx from 'clsx';

export type Option = {
    name: string;
    onClick: () => void;
};

export type MenuPosition = {
    top?: string;
    left?: string;
};

interface OptionsMenuProps {
    position: 'absolute' | 'fixed';
    positionCordinates?: MenuPosition;
    showOptionsMenu: boolean;
    optionsList: Option[];
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
    position,
    positionCordinates,
    showOptionsMenu,
    optionsList,
}) => {
    return (
        <div
            className={clsx(
                'bg-searchBoxBg z-50 flex-col py-4 min-w-40',
                position,
                showOptionsMenu ? 'flex' : 'hidden'
            )}
            style={positionCordinates}
        >
            {optionsList.map((option, index) => (
                <div
                    key={option.name + index}
                    onClick={option.onClick}
                    className="cursor-pointer hover:bg-gray-800 text-xl py-4 px-12 text-center"
                >
                    {option.name}
                </div>
            ))}
        </div>
    );
};

export default OptionsMenu;
