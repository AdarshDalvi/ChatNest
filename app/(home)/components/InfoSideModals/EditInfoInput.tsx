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
    UseFormSetError,
    UseFormSetFocus,
    UseFormTrigger,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import useMobileView from '@/app/hooks/useMobileView';

interface EditInfoInputProps {
    id: string;
    label: string;
    placeHolder: string;
    maxLength?: number;
    validationSchema?: RegisterOptions<FieldValues, string> | undefined;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    saveFunction?: () => void;
    trigger: UseFormTrigger<FieldValues>;
    setFocus: UseFormSetFocus<FieldValues>;
}

const EditInfoInput: React.FC<EditInfoInputProps> = ({
    id,
    label,
    placeHolder,
    maxLength,
    register,
    validationSchema,
    errors,
    saveFunction,
    trigger,
    setFocus,
}) => {
    const [disabled, setDisabled] = useState(true);
    const { mobileView } = useMobileView();

    const toggleEditMode = () => {
        if (disabled) {
            setFocus(id);
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    const updateInput = async () => {
        const isValid = await trigger(id, { shouldFocus: true });
        toast.remove();
        if (!isValid) {
            toast.error(`${errors[id]?.message?.toString()}`, {
                position: mobileView ? 'bottom-center' : 'bottom-left',
            });
        } else {
            setDisabled(true);
            if (saveFunction) {
                saveFunction();
            }
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            <label htmlFor={id} className="text-cyan-500 text-xl">
                {label}
            </label>
            <div className="relative w-full">
                <input
                    autoComplete="off"
                    type="text"
                    id={id}
                    disabled={disabled}
                    {...register(id, validationSchema)}
                    placeholder={placeHolder}
                    maxLength={maxLength}
                    className={clsx(
                        `
                        w-full
                        bg-secondary
                        outline-none
                        text-2xl
                        midPhones:text-[1.7rem]
                        pb-2.5
                        border-b-2
                        border-b-gray-400
                        focus:border-cyan-500`,
                        disabled && 'border-none',
                        errors && errors[id] && 'focus:border-red-500'
                    )}
                />
                {disabled ? (
                    <MdOutlineModeEditOutline
                        onClick={toggleEditMode}
                        className="absolute bottom-3.5 midPhones:bottom-2.5  cursor-pointer right-0 text-3xl midPhones:text-4xl font-extralight"
                    />
                ) : (
                    <button type="button" onClick={updateInput}>
                        <FaCheck className="absolute bottom-3.5 midPhones:bottom-2.5   cursor-pointer right-0 text-3xl midPhones:text-4xl font-extralight" />
                    </button>
                )}
            </div>
        </div>
    );
};

export default EditInfoInput;
