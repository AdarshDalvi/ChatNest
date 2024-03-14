'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import {
    FieldErrors,
    FieldValues,
    Path,
    RegisterOptions,
    UseFormRegister,
    UseFormTrigger,
} from 'react-hook-form';

type SaveButtonProps = RequiredProps & {
    saveButton?: true;
    saveFunction: () => void;
    trigger: UseFormTrigger<FieldValues>;
    disabled: boolean;
};

type WithoutSaveButtonProps = RequiredProps & {
    saveButton?: never;
    disabled: boolean;
};

type RequiredProps = {
    label?: string;
    placeHolder: string;
    maxLength?: number;
    fullWidth?: boolean;
    customWidth?: string;
};

type FormProps<T extends FieldValues> = {
    id: Path<T>;
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    validationSchema: RegisterOptions<T, Path<T>> | undefined | {};
};

type EditInfoInputProps<T extends FieldValues> = FormProps<T> &
    (SaveButtonProps | WithoutSaveButtonProps);

const EditInfoInput = <T extends FieldValues>({
    saveButton,
    id,
    label,
    placeHolder,
    validationSchema,
    errors,
    register,
    maxLength,
    fullWidth = true,
    customWidth,
    ...props
}: EditInfoInputProps<T>) => {
    if (saveButton) {
        const { trigger, saveFunction, disabled } = props as SaveButtonProps;

        const [editable, setEditable] = useState(true);

        const toggleEditMode = () => {
            if (editable) {
                setEditable(false);
            } else {
                setEditable(true);
            }
        };

        const updateInput = async () => {
            const isValid = await trigger(id, { shouldFocus: true });
            if (isValid) {
                setEditable(true);
                if (saveFunction) {
                    saveFunction();
                }
            }
        };

        return (
            <div
                className={clsx(
                    'flex flex-col',
                    fullWidth ? 'w-full' : customWidth
                )}
            >
                {label && (
                    <label htmlFor={id} className="text-cyan-500 text-xl">
                        {label}
                    </label>
                )}
                <div className="relative w-full mt-6">
                    <input
                        autoComplete="off"
                        type="text"
                        id={id}
                        disabled={editable || disabled}
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
                            editable && 'border-none',
                            errors && errors[id] && ' focus:border-red-500'
                        )}
                    />
                    {editable ? (
                        <button
                            onClick={toggleEditMode}
                            disabled={disabled}
                            className="absolute bottom-3.5 midPhones:bottom-2.5  right-0 text-3xl midPhones:text-4xl "
                        >
                            <MdOutlineModeEditOutline />
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={updateInput}
                            disabled={disabled}
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
        const { disabled } = props as WithoutSaveButtonProps;

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
