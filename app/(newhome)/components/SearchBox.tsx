'use client';

import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { MdOutlineClear } from 'react-icons/md';

interface SearchBoxProps {
    placeholder: string;
    searchText: string;
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
    clearSearchText: () => void;
    disabled?: boolean;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    placeholder,
    searchText,
    handleChange,
    clearSearchText,
    disabled,
}) => {
    return (
        <div className="relative w-full px-4 ">
            <input
                disabled={disabled}
                name="searchText"
                type="text"
                className={clsx(
                    `
                    autofill:bg-searchBoxBg
                    w-full 
                    text-xl
                    midPhones:text-2xl
                    bg-searchBoxBg
                    py-3
                    focus:outline-none
                    pl-4
                    pr-12
                    rounded-xl
                    placeholder:text-placeHolderColor
                    `,
                    disabled && 'cursor-not-allowed'
                )}
                placeholder={placeholder}
                value={searchText}
                onChange={handleChange}
            />
            {searchText && (
                <MdOutlineClear
                    className="absolute text-3xl right-7 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={clearSearchText}
                />
            )}
        </div>
    );
};

export default SearchBox;
