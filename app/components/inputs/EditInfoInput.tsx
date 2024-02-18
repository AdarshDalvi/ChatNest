'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import {
    FieldErrors,
    FieldValues,
    RegisterOptions,
    UseFormRegister,
    UseFormSetFocus,
    UseFormTrigger,
} from 'react-hook-form';

type SaveButtonProps = RequiredProps & {
    saveButton: true;
    saveFunction: () => void;
    trigger: UseFormTrigger<FieldValues>;
    setFocus: UseFormSetFocus<FieldValues>;
    loading: boolean;
};

type WithoutSaveButtonProps = RequiredProps & {
    saveButton?: never;
    loading: boolean;
};

type RequiredProps = {
    id: string;
    label: string;
    placeHolder: string;
    maxLength?: number;
    validationSchema: RegisterOptions<FieldValues, string> | undefined | {};
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
};

type EditInfoInputProps = SaveButtonProps | WithoutSaveButtonProps;

const EditInfoInput = ({ saveButton, ...props }: EditInfoInputProps) => {
    const {
        id,
        label,
        errors,
        register,
        placeHolder,
        maxLength,
        validationSchema,
    } = props as RequiredProps;

    if (saveButton) {
        const { setFocus, trigger, saveFunction, loading } =
            props as SaveButtonProps;

        const [disabled, setDisabled] = useState(true);

        const toggleEditMode = () => {
            if (disabled) {
                setDisabled(false);
                setFocus(id);
            } else {
                setDisabled(true);
            }
        };

        const updateInput = async () => {
            const isValid = await trigger(id, { shouldFocus: true });
            if (isValid) {
                setDisabled(true);
                if (saveFunction) {
                    saveFunction();
                }
            }
        };

        return (
            <div className="w-full flex flex-col">
                <label htmlFor={id} className="text-cyan-500 text-xl">
                    {label}
                </label>
                <div className="relative w-full mt-6">
                    <input
                        autoComplete="off"
                        type="text"
                        id={id}
                        disabled={disabled || loading}
                        {...register(id, validationSchema ?? {})}
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
                            errors && errors[id] && ' focus:border-red-500'
                        )}
                    />
                    {disabled ? (
                        <button
                            onClick={toggleEditMode}
                            disabled={loading}
                            className="absolute bottom-3.5 midPhones:bottom-2.5  cursor-pointer right-0 text-3xl midPhones:text-4xl "
                        >
                            <MdOutlineModeEditOutline />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={updateInput}
                            disabled={loading}
                            className="absolute bottom-3.5 midPhones:bottom-2.5   cursor-pointer right-0 text-3xl midPhones:text-4xl"
                        >
                            <FaCheck />
                        </button>
                    )}
                </div>
                {errors && errors[id]?.message && (
                    <p className="text-red-500 mt-2 text-lg">
                        {errors[id]?.message?.toString()}
                    </p>
                )}
            </div>
        );
    } else {
        const { loading } = props as WithoutSaveButtonProps;

        return (
            <div className="w-full flex flex-col">
                <label htmlFor={id} className="text-cyan-500 text-xl">
                    {label}
                </label>
                <div className="relative w-full mt-6">
                    <input
                        autoComplete="off"
                        type="text"
                        id={id}
                        disabled={loading}
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
                            errors && errors[id] && 'focus:border-red-500'
                        )}
                    />
                </div>
                {errors && errors[id]?.message && (
                    <p className="text-red-500 mt-2 text-lg">
                        {errors[id]?.message?.toString()}
                    </p>
                )}
            </div>
        );
    }
};

export default EditInfoInput;
