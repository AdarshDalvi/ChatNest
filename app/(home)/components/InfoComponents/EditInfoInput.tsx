'use client';

import clsx from 'clsx';
import { InputHTMLAttributes, useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import {
    FieldErrors,
    FieldValues,
    RegisterOptions,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
} from 'react-hook-form';

interface EditInfoInputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    defaultValue?: string | undefined;
    placeHolder: string;
    maxLength?: number;
    validationSchema?: RegisterOptions<FieldValues, string> | undefined;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const EditInfoInput: React.FC<EditInfoInputProps> = ({
    id,
    label,
    defaultValue,
    placeHolder,
    maxLength,
    register,
    validationSchema,
    errors,

    ...rest
}) => {
    const [disabled, setDisabled] = useState(true);

    return (
        <div className="w-full flex flex-col gap-6">
            <label htmlFor={id} className="text-cyan-500 text-xl">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    id={id}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    placeholder={placeHolder}
                    type="text"
                    maxLength={maxLength}
                    {...rest}
                    {...register(id, validationSchema)}
                    className={clsx(
                        `
                        w-full 
                        outline-none 
                        bg-secondary  
                        border-b-2 
                        border-b-gray-400
                        text-2xl
                        midPhones:text-[1.7rem]
                        pb-2.5
                        pr-12
                        focus:border-cyan-500`,
                        disabled && 'border-none',
                        errors && 'border-red-500'
                    )}
                />
                {disabled ? (
                    <MdOutlineModeEditOutline
                        onClick={() => setDisabled(false)}
                        className="absolute bottom-3.5 midPhones:bottom-2.5  cursor-pointer right-0 text-3xl midPhones:text-4xl font-extralight"
                    />
                ) : (
                    <button type="submit">
                        <FaCheck
                            className="absolute bottom-3.5 midPhones:bottom-2.5   cursor-pointer right-0 text-3xl midPhones:text-4xl font-extralight"
                            onClick={() => setDisabled(true)}
                        />
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditInfoInput;
