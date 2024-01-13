'use client';
import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import generateSchema from '@/app/components/inputs/Schema';
import { useRouter } from 'next/navigation';
import PhoneNumberInput from '@/app/components/inputs/PhoneInput';
import { MdEmail, MdPhone } from 'react-icons/md';

type Variant = 'LOGIN' | 'REGISTER';
type LoginWith = 'NONE' | 'EMAIL' | 'PHONE';

function AuthForm() {
    const {
        register,
        setValue,
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitted },
    } = useForm<FieldValues>();

    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [loginWith, setLoginWith] = useState<LoginWith>('NONE');

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const session = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.status === 'authenticated') {
            router.push('/home');
        }
    }, [session?.status, router]);

    const submitForm: SubmitHandler<FieldValues> = async (data) => {
        setIsFormSubmitted(true);
        if (variant === 'REGISTER') {
            try {
                const { status } = await axios.post('/api/register', data);
                if (status === 200) {
                    toast.success('Registration Successful');
                    const callback = await signIn('credentials', {
                        loginId: data.email,
                        password: data.password,
                    });
                    if (callback?.ok) {
                        router.push('/home');
                    }
                }
            } catch (error) {
                toast.error('Something went wrong!');
            } finally {
                setIsFormSubmitted(false);
            }
        }
        if (variant === 'LOGIN') {
            try {
                const callback = await signIn('credentials', {
                    ...data,
                    redirect: false,
                });
                if (callback?.ok && !callback?.error) {
                    toast.success('Logged in successfully!');
                    router.push('/home');
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
        }
    };

    const setAuthMode = () => {
        reset();
        if (variant === 'LOGIN') {
            setVariant('REGISTER');
        } else setVariant('LOGIN');
    };

    const setLoginMethod = () => {
        reset();
        if (loginWith === 'EMAIL') {
            setLoginWith('PHONE');
        } else setLoginWith('EMAIL');
    };

    const socialLogin = async (action: string) => {
        setIsFormSubmitted(true);
        try {
            const callback = await signIn(action, { redirect: false });
            if (callback?.ok && !callback?.error)
                toast.success('Logged in successfully!');
            if (callback?.error) {
                toast.error('Invalid Credentials, please try again!', {
                    duration: 4000,
                });
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setIsFormSubmitted(false);
        }
    };

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

    const renderRegistrationForm = () => (
        <>
            <Input
                id="name"
                register={register}
                errors={errors}
                type="text"
                placeHolder="Name"
                disabled={isFormSubmitted}
                validationSchema={generateSchema({
                    fieldName: 'Name',
                    minLength: 3,
                })}
            />
            <Input
                id="email"
                register={register}
                errors={errors}
                validationSchema={generateSchema({
                    fieldName: 'Email',
                    minLength: 3,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
                type="text"
                placeHolder="Email"
                disabled={isFormSubmitted}
            />
            <PhoneNumberInput
                control={control}
                setValue={setValue}
                id="phone"
                errors={errors}
                isSubmitted={isSubmitted}
                disabled={isFormSubmitted}
            />
        </>
    );

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

    return (
        <>
            <h2 className="my-4 text-center">
                {variant === 'LOGIN'
                    ? 'Login to Your Account'
                    : 'Register for a New Account'}
            </h2>
            <div className="flex flex-col w-[85%] smallMobiles:w-[80%] midPhones:w-[75%] md:w-2/3">
                <form
                    onSubmit={handleSubmit(submitForm)}
                    className="flex flex-col gap-6"
                >
                    {variant === 'REGISTER' ? (
                        renderRegistrationForm()
                    ) : (
                        <>
                            {loginWith !== 'NONE' && (
                                <Button
                                    children={'Switch Login Method'}
                                    onClick={setLoginMethod}
                                    iconButton
                                />
                            )}
                            {renderLoginForm()}
                        </>
                    )}
                    {(loginWith !== 'NONE' || variant === 'REGISTER') && (
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
                                children={
                                    variant === 'LOGIN' ? 'Sign in' : 'Register'
                                }
                                type="submit"
                                disabled={isFormSubmitted}
                            />
                        </>
                    )}
                </form>
                <p id="text-between" className="my-6 text-center">
                    Or continue with
                </p>
                <div className="flex gap-2">
                    <AuthSocialButton
                        icon={BsGithub}
                        onClick={() => socialLogin('github')}
                    />
                    <AuthSocialButton
                        icon={BsGoogle}
                        onClick={() => socialLogin('google')}
                    />
                </div>
                <div className="flex flex-col midPhones:flex-row text-center justify-center mt-8 mb-6  midPhones:gap-2 text-lg md:text-xl">
                    <p>
                        {variant === 'LOGIN'
                            ? `Don't have an account?`
                            : 'Already have an account?'}
                    </p>
                    <p
                        onClick={setAuthMode}
                        className="underline cursor-pointer transition-colors hover:text-blue-500"
                    >
                        {variant === 'LOGIN' ? 'Create an account' : 'Login'}
                    </p>
                </div>
            </div>
        </>
    );
}

export default AuthForm;
