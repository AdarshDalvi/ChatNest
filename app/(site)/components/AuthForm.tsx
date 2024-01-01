'use client';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';

type Variant = 'LOGIN' | 'REGISTER';

function AuthForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            loginId: '',
            password: '',
        },
    });
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submitForm: SubmitHandler<FieldValues> = (data) => {
        setIsSubmitted(true);
        console.log(data);
    };

    const setAuthMode = () => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else setVariant('LOGIN');
    };
    return (
        <div className="flex flex-col w-2/3">
            <form
                onSubmit={handleSubmit(submitForm)}
                className="flex flex-col gap-6 "
            >
                {variant === 'REGISTER' && (
                    <Input
                        id="name"
                        register={register}
                        errors={errors}
                        required={true}
                        type="text"
                        placeHolder="Name"
                        disabled={isSubmitted}
                    />
                )}
                <Input
                    id="loginId"
                    register={register}
                    errors={errors}
                    required={true}
                    type="text"
                    placeHolder="Email or Phone Number"
                    disabled={isSubmitted}
                />
                <Input
                    id="password"
                    register={register}
                    errors={errors}
                    required={true}
                    type="password"
                    placeHolder="Password"
                    disabled={isSubmitted}
                />
                <Button
                    children={variant === 'LOGIN' ? 'Sign In' : 'Register'}
                    type="submit"
                    disabled={isSubmitted}
                />
            </form>
            <p id="text-between" className="my-6">
                {/* psuedo elements and related styles are written in global.cs because of lengthy code */}
                Or continue with
            </p>
            <div className="flex gap-2">
                <AuthSocialButton
                    icon={BsGithub}
                    onClick={() => console.log('hi')}
                />
                <AuthSocialButton
                    icon={BsGoogle}
                    onClick={() => console.log('hi')}
                />
            </div>
            <div className="flex justify-center mt-8 mb-6 text-lg gap-2">
                <p>
                    {variant === 'LOGIN'
                        ? `Don't have an account?`
                        : 'Already have an account?'}
                </p>
                <p
                    onClick={setAuthMode}
                    className="underline cursor-pointer transition-colors hover:text-blue-500"
                >
                    {variant === 'LOGIN' ? 'Create an account' : 'Sign in '}
                </p>
            </div>
        </div>
    );
}

export default AuthForm;
