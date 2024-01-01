'use client';

import clsx from 'clsx';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
type InputProps = {
    id: string;
    label?: string;
    type: 'text' | 'password';
    disabled?: boolean;
    required: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    placeHolder?: string;
};

const Input: React.FC<InputProps> = ({
    id,
    label,
    type,
    disabled,
    required,
    register,
    errors,
    placeHolder,
}) => {
    return (
        <div className="flex flex-col">
            {label && <label htmlFor={id}>{label}</label>}
            <input
                id={id}
                type={type}
                {...register(id, { required })}
                autoComplete={id}
                disabled={disabled}
                placeholder={placeHolder}
                className={clsx(
                    `form-input 
                    border-solid 
                    border 
                    rounded-md 
                    py-3 
                    text-gray-900 
                    shadow-sm ring-1 
                    ring-inset 
                    px-4 
                    sm:text-[1.4rem]
                    focus:ring-1 
                    focus:ring-inset 
                    focus:ring-emerald-600`,
                    errors[id] && 'focus:ring-red-500',
                    disabled && 'opacity-50 cursor-default'
                )}
            />
        </div>
    );
};

export default Input;
