'use client';

import clsx from 'clsx';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { useState } from 'react';
type InputProps = {
    id: string;
    label?: string;
    type: 'text' | 'password';
    disabled?: boolean;
    validationSchema: object;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    placeHolder?: string;
    passwordToggle?: boolean;
};

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    validationSchema,
    register,
    errors,
    placeHolder,
    passwordToggle = false,
}) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const passwordToggleStyle =
        'absolute text-stone-700 cursor-pointer text-xl md:text-2xl right-6 top-1/2 -translate-y-1/2';
    return (
        <div className="flex flex-col w-full ">
            {label && <label htmlFor={id}>{label}</label>}
            <div className="w-full relative">
                <input
                    id={id}
                    type={
                        !passwordToggle
                            ? type
                            : passwordVisibility
                            ? 'input'
                            : 'password'
                    }
                    {...register(id, validationSchema)}
                    autoComplete={id}
                    disabled={disabled}
                    placeholder={placeHolder}
                    className={clsx(
                        `form-input 
                    w-full
                    border-solid 
                    border 
                    rounded-lg
                    py-3.5 
                    text-gray-900 
                    shadow-sm ring-1 
                    ring-inset 
                    px-4 
                    sm:text-[1.4rem]
                    focus:ring-1 
                    focus:ring-inset 
                    focus:ring-cyan-500`,
                        errors[id] && 'focus:ring-red-500',
                        disabled && 'opacity-50 cursor-default'
                    )}
                />
                {passwordToggle &&
                    (passwordVisibility ? (
                        <MdVisibility
                            className={passwordToggleStyle}
                            onClick={() => setPasswordVisibility(false)}
                        />
                    ) : (
                        <MdVisibilityOff
                            className={passwordToggleStyle}
                            onClick={() => setPasswordVisibility(true)}
                        />
                    ))}
            </div>
            {errors[id] && errors[id]?.message && (
                <span className="text-red-500 text-lg mt-1.5">
                    {errors[id]?.message?.toString()}
                </span>
            )}
        </div>
    );
};

export default Input;
