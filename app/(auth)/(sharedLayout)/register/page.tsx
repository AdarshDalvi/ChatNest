'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import PhoneNumberInput from '@/app/components/inputs/PhoneInput';
import generateSchema from '@/app/components/inputs/Schema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function RegisterPage() {
    const {
        register,
        setValue,
        control,
        handleSubmit,
        formState: { errors, isSubmitted },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            password: '',
        },
    });

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const router = useRouter();

    const handleFormSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsFormSubmitted(true);
        try {
            const { status } = await axios.post('/api/register', data);
            if (status === 200) {
                toast.success(
                    'Registration successful! Please login to continue.',
                    {
                        duration: 3000,
                        style: {
                            textAlign: 'center',
                        },
                    }
                );
                router.push('/login');
            }
            // }
        } catch (error: any) {
            if (error.response.status === 409) {
                return toast.error(error.response.data);
            }
            toast.error('Something went wrong!');
        } finally {
            setIsFormSubmitted(false);
        }
    };

    return (
        <form
            className="flex flex-col gap-6"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
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
            <Button type="submit" disabled={isFormSubmitted}>
                Register
            </Button>
        </form>
    );
}
