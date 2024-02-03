'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import AuthSocialButton from '../components/AuthSocialButton';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import clsx from 'clsx';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const router = useRouter();

    let pageTitle = '';
    let isLoginPage = pathname === '/login';

    if (isLoginPage) {
        pageTitle = 'Log In to Your Account';
    } else {
        pageTitle = 'Register for a New Account';
    }

    const changeAuthMode = () => {
        if (isLoginPage) {
            router.push('/register');
        } else {
            router.push('/login');
        }
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

    return (
        <main className="flex flex-col w-full min-h-full justify-center items-center bg-gradient-to-b from-cyan-500 to-blue-500 pb-8">
            <div
                className={clsx(
                    `w-[95%] smallMobiles:w-[90%] midPhones:[w-85%] max-w-[450px] flex flex-col items-center rounded-lg  shadow-[0px_0px_20px_10px_#00000024] bg-white py-8`,
                    isFormSubmitted && 'pointer-events-none'
                )}
            >
                <Image
                    src="/logochat.png"
                    height={52}
                    width={52}
                    alt="Logo"
                    className="drop-shadow-xl"
                    priority={true}
                />
                <h2 className="my-4  text-center font-black bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    {pageTitle}
                </h2>
                <div className="flex flex-col w-[85%] smallMobiles:w-[80%] midPhones:w-[75%]">
                    {children}
                    <p id="text-between" className="my-6 text-center">
                        Or continue with
                    </p>
                    <div className="flex gap-2">
                        <AuthSocialButton
                            icon={FcGoogle}
                            onClick={() => socialLogin('google')}
                        />
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialLogin('github')}
                        />
                    </div>
                    <div className="flex flex-row  gap-2 text-center justify-center mt-8 mb-6   text-lg md:text-xl">
                        <p>
                            {pathname === '/login'
                                ? `Don't have an account?`
                                : 'Already have an account?'}
                        </p>
                        <p
                            onClick={changeAuthMode}
                            className="underline cursor-pointer transition-colors text-cyan-500"
                        >
                            {pathname === '/login'
                                ? 'Create an account'
                                : 'Login'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
