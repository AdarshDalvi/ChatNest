'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import EditInfoInput from './EditInfoInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MultilineInput from '@/app/components/inputs/MultilineInput';

import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { Option } from '../OptionsMenu/OptionsMenu';
import InfoWrapper from '../WrapperComponents/InfoWrapper';
import InfoImage from '../InfoImage';

interface ProfileProps {
    currentUser: User;
}

const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
    const optionsList: Option[] = [
        {
            name: 'View Photo',
            onClick: () => {},
        },
        { name: 'Change Photo', onClick: () => {} },
        { name: 'Remove Photo', onClick: () => {} },
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        setFocus,
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name,
        },
    });
    const [aboutDisabled, setAboutDisabled] = useState(true);

    const updateProfile: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <InfoWrapper className="gap-20">
            <InfoImage
                imageSrc={currentUser.image}
                hoverElementText="change profile photo"
                optionsList={optionsList}
            />
            <form
                className="flex-1 flex flex-col overflow-y-auto w-full gap-12 px-12"
                onSubmit={handleSubmit(updateProfile)}
            >
                <EditInfoInput
                    id="name"
                    label="Your Name"
                    placeHolder="Name"
                    maxLength={25}
                    register={register}
                    validationSchema={{ required: 'Name cannot be empty!' }}
                    errors={errors}
                    saveFunction={() => handleSubmit(updateProfile)()}
                    trigger={trigger}
                    setFocus={setFocus}
                />

                <div className="w-full flex flex-col gap-6">
                    <label htmlFor="about" className="text-cyan-500 text-xl">
                        About
                    </label>
                    <div
                        className={clsx(
                            'flex gap-1   pb-2.5 items-start',
                            !aboutDisabled &&
                                'border-b-gray-400 border-b-2 focus-within:border-cyan-500'
                        )}
                    >
                        <MultilineInput
                            id="about"
                            register={register}
                            placeHolder="Add About"
                            className="w-full
                                bg-secondary
                                text-2xl
                                midPhones:text-[1.7rem]
                                pr-1
                                "
                            maxLength={130}
                            disabled={aboutDisabled}
                        />
                        {aboutDisabled ? (
                            <MdOutlineModeEditOutline
                                className="cursor-pointer text-3xl midPhones:text-4xl"
                                onClick={() => setAboutDisabled(false)}
                            />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit(updateProfile)}
                            >
                                <FaCheck
                                    onClick={() => setAboutDisabled(true)}
                                    className="cursor-pointer text-3xl midPhones:text-4xl"
                                />
                            </button>
                        )}
                    </div>
                </div>
            </form>
        </InfoWrapper>
    );
};

export default Profile;
