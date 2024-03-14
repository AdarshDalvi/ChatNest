import clsx from 'clsx';
import React from 'react';

type LabelledOption = {
    name: string;
    onClick: () => void;
};

type CustomOption = {
    jsxElement: React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
    >;
};

export type Option = LabelledOption | CustomOption;

interface OptionsMenuProps {
    className?: string;
    showOptionsMenu: boolean;
    optionsList: Option[];
    textPosition?: string;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({
    optionsList,
    showOptionsMenu,
    className,
    textPosition = 'text-center',
}) => {
    return (
        <div
            className={clsx(
                'absolute  bg-searchBoxBg z-50  flex-col py-4 text-base  smallMobiles:text-lg midPhones:text-xl opacity-0 scale-0 transition-all duration-150',
                className,
                showOptionsMenu && 'flex opacity-100 scale-100'
            )}
        >
            {optionsList.map((option, index) => {
                const isJsxElement = 'jsxElement' in option;
                return isJsxElement ? (
                    React.cloneElement(option.jsxElement, { key: index })
                ) : (
                    <div
                        key={index}
                        onClick={option.onClick}
                        className={clsx(
                            'cursor-pointer hover:bg-gray-800 py-4 px-12  w-full',
                            textPosition
                        )}
                    >
                        {option.name}
                    </div>
                );
            })}
        </div>
    );
};

export default OptionsMenu;
