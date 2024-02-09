'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import EditInfoInput from './EditInfoInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MultilineInput from '@/app/components/inputs/MultilineInput';

import { MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import OptionsMenu, { Option } from '../OptionsMenu';
import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import useImageHover from '@/app/hooks/useImageHover';
import useClickOutside from '@/app/hooks/useClickOutside';
import InfoWrapper from '../WrapperComponents/InfoWrapper';

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
    } = useForm();
    const [aboutDisabled, setAboutDisabled] = useState(true);

    const {
        showOptionsMenu,
        menuPosition,
        toggleOptionsMenu,
        closeOptionsMenu,
    } = useOptionsMenu();

    const { isHovering, handleImageHover, setIsHovering } =
        useImageHover(showOptionsMenu);
    const imageDivRef = useClickOutside(() => {
        setIsHovering(false);
        closeOptionsMenu();
    });

    const updateProfile: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    return (
        <InfoWrapper className="gap-20">
            <OptionsMenu
                position="fixed"
                positionCordinates={menuPosition}
                showOptionsMenu={showOptionsMenu}
                optionsList={optionsList}
            />
            <div
                ref={imageDivRef}
                className="w-[40%] max-w-[200px]  relative rounded-full overflow-hidden cursor-pointer"
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageHover}
            >
                <Image
                    alt="Profile Picture"
                    src={currentUser.image || '/user.png'}
                    width={200}
                    height={200}
                    className="bg-gray-300"
                />

                <div
                    className={clsx(
                        `absolute select-none cursor-pointer justify-center items-center inset-0 rounded-full bg-secondary z-10 bg-opacity-50 gap-1`,
                        isHovering ? 'flex flex-col' : 'hidden'
                    )}
                    onClick={(event) =>
                        toggleOptionsMenu(
                            event.clientY + 15,
                            event.clientX + 10
                        )
                    }
                >
                    <BsCameraFill className="text-camIconSize " />
                    <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                        Change profile picture
                    </p>
                </div>
            </div>
            <form
                className="flex-1 flex flex-col overflow-y-auto w-full gap-12 px-12"
                onSubmit={handleSubmit(updateProfile)}
            >
                <EditInfoInput
                    id="name"
                    label="Your Name"
                    defaultValue={currentUser.name ?? ''}
                    placeHolder="Name"
                    maxLength={25}
                    register={register}
                    validationSchema={{ required: 'Name cannot be empty!' }}
                    errors={errors}
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
