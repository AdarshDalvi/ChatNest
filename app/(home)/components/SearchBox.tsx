'use client';

import {
    FieldValues,
    UseFormRegister,
    UseFormResetField,
    UseFormWatch,
} from 'react-hook-form';

import { MdOutlineClear } from 'react-icons/md';

interface SearchBoxProps {
    id: string;
    placeholder: string;
    resetField: UseFormResetField<FieldValues>;
    register: UseFormRegister<FieldValues>;
    watchForm: UseFormWatch<FieldValues>;
}

const SearchBox: React.FC<SearchBoxProps> = ({
    id,
    placeholder,
    resetField,
    watchForm,
    register,
}) => {
    const searchText = watchForm(id);

    const clearSearchBox = () => {
        resetField(id);
    };

    return (
        <form className="relative w-full px-4 ">
            <input
                id={id}
                type="text"
                className="
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
                            "
                placeholder={placeholder}
                {...register(id)}
            />
            {searchText && (
                <MdOutlineClear
                    className="absolute text-3xl right-7 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={clearSearchBox}
                />
            )}
        </form>
    );
};

export default SearchBox;
