'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import PhoneNumberInput from '@/app/components/inputs/PhoneInput';
import generateSchema from '@/app/components/inputs/Schema';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { MdEmail, MdPhone } from 'react-icons/md';

type LoginWith = 'NONE' | 'EMAIL' | 'PHONE';

export default function page() {
    const {
        register,
        setValue,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted },
    } = useForm<FieldValues>({
        defaultValues: {
            loginId: '',
            password: '',
        },
    });

    const [loginWith, setLoginWith] = useState<LoginWith>('NONE');

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const router = useRouter();

    const renderLoginOptions = () => (
        <>
            <Button
                children={
                    <>
                        <MdEmail className="text-2xl text-gray-700 mt-0.5" />
                        <p>Email Login</p>
                    </>
                }
                iconButton
                onClick={() => setLoginWith('EMAIL')}
            />
            <Button
                children={
                    <>
                        <MdPhone className="text-xl text-gray-700 mt-0.5" />
                        <p>Phone Login</p>
                    </>
                }
                onClick={() => setLoginWith('PHONE')}
                iconButton
            />
        </>
    );

    const setLoginMethod = () => {
        reset();
        if (loginWith === 'EMAIL') {
            setLoginWith('PHONE');
        } else setLoginWith('EMAIL');
    };

    const renderLoginForm = () => {
        if (loginWith === 'NONE') {
            return renderLoginOptions();
        } else if (loginWith === 'EMAIL') {
            return (
                <Input
                    id="loginId"
                    register={register}
                    errors={errors}
                    validationSchema={generateSchema({
                        fieldName: 'Email',
                        minLength: 3,
                        pattern:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    })}
                    type="text"
                    placeHolder="Email"
                    disabled={isFormSubmitted}
                />
            );
        }
        return (
            <PhoneNumberInput
                control={control}
                setValue={setValue}
                id="loginId"
                errors={errors}
                isSubmitted={isSubmitted}
                disabled={isFormSubmitted}
            />
        );
    };

    const onSubmitForm: SubmitHandler<FieldValues> = async (data) => {
        setIsFormSubmitted(true);
        try {
            const callback = await signIn('credentials', {
                ...data,
                redirect: false,
            });
            if (callback?.ok && !callback?.error) {
                toast.success('Logged in successfully!');
                router.push('/chats');
            }
            if (callback?.error) {
                toast.error(callback.error, {
                    duration: 4000,
                    style: { textAlign: 'center' },
                });
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setIsFormSubmitted(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col gap-6"
        >
            {loginWith !== 'NONE' && (
                <Button
                    children={'Switch Login Method'}
                    onClick={setLoginMethod}
                    iconButton
                />
            )}
            {renderLoginForm()}
            {loginWith !== 'NONE' && (
                <>
                    <Input
                        id="password"
                        register={register}
                        errors={errors}
                        validationSchema={generateSchema({
                            fieldName: 'Password',
                            minLength: 8,
                            pattern:
                                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])(?!.*\s).{8,}$/,
                        })}
                        type="password"
                        placeHolder="Password"
                        disabled={isFormSubmitted}
                        passwordToggle
                    />
                    <Button
                        children="Login"
                        type="submit"
                        disabled={isFormSubmitted}
                    />
                </>
            )}
        </form>
    );
}
