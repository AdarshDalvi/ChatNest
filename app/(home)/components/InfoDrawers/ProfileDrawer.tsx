'use client';

import { User } from '@prisma/client';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';
import EditInfoInput from '../../../components/inputs/EditInfoInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import MultilineInput from '@/app/components/inputs/MultilineInput';

import { MdOutlineModeEditOutline } from 'react-icons/md';
import { Option } from '../OptionsMenu/OptionsMenu';
import InfoWrapper from '../WrapperComponents/InfoWrapper';
import InfoImage from '../ImageComponents/InfoImage';
import DrawerWrapper from '../WrapperComponents/Drawer/DrawerWrapper';

import { FaCheck } from 'react-icons/fa6';
import { IoArrowBack } from 'react-icons/io5';
import EditableNoImage from '../ImageComponents/EditableNoImage';

interface ProfileDrawerProps {
    currentUser: User;
    showProfileDrawer: boolean;
    setShowProfileDrawer: Dispatch<SetStateAction<boolean>>;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
    currentUser,
    showProfileDrawer,
    setShowProfileDrawer,
}) => {
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
        reset,
        watch,
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name || '',
            image: currentUser.image,
            about: currentUser.about || '',
        },
    });
    const [aboutDisabled, setAboutDisabled] = useState(true);

    const updateProfile: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
    };

    const image = watch('image');

    const closeProfileDrawer = () => {
        reset();
        setAboutDisabled(true);
        setShowProfileDrawer(false);
    };

    return (
        <DrawerWrapper
            drawerHeading="Profile"
            icon={IoArrowBack}
            drawerOrigin="origin-left"
            closeDrawer={closeProfileDrawer}
            showDrawer={showProfileDrawer}
        >
            {showProfileDrawer && (
                <InfoWrapper className="gap-20">
                    {image === null ? (
                        <EditableNoImage
                            id="image"
                            imageHoverText="Add profile photo"
                            imageSrc={image}
                            setValue={setValue}
                            defaultImage="/user.png"
                        />
                    ) : (
                        <InfoImage
                            imageSrc={image}
                            hoverElementText="change profile photo"
                            optionsList={optionsList}
                        />
                    )}
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
                            validationSchema={{
                                required: 'Name cannot be empty!',
                            }}
                            errors={errors}
                            saveButton
                            saveFunction={() => handleSubmit(updateProfile)()}
                            trigger={trigger}
                            setFocus={setFocus}
                        />

                        <div className="w-full flex flex-col gap-6">
                            <label
                                htmlFor="about"
                                className="text-cyan-500 text-xl"
                            >
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
                                            onClick={() =>
                                                setAboutDisabled(true)
                                            }
                                            className="cursor-pointer text-3xl midPhones:text-4xl"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                    </form>
                </InfoWrapper>
            )}
        </DrawerWrapper>
    );
};

export default ProfileDrawer;
