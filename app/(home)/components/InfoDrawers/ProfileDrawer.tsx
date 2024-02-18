'use client';

import React, { useCallback, useState } from 'react';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { Dispatch, SetStateAction } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import MultilineInput from '@/app/components/inputs/MultilineInput';
import { MdOutlineModeEditOutline } from 'react-icons/md';
import InfoWrapper from '../WrapperComponents/InfoWrapper';
import InfoImage from '../ImageComponents/InfoImage';
import DrawerWrapper from '../WrapperComponents/Drawer/DrawerWrapper';
import { FaCheck } from 'react-icons/fa6';
import { IoArrowBack } from 'react-icons/io5';
import EditableNoImage from '../ImageComponents/EditableNoImage';
import axios from 'axios';
import createSecureUrl from '@/app/lib/secureUrl';
import toast, { ToastPosition } from 'react-hot-toast';
import EditInfoInput from '@/app/components/inputs/EditInfoInput';
import SaveCancelButtons from '../ImageComponents/SaveCancelButtons';
import useMobileView from '@/app/hooks/useMobileView';

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
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        trigger,
        setFocus,
        reset,
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser.name || '',
            image: currentUser.image,
            about: currentUser.about || '',
        },
    });

    const [aboutDisabled, setAboutDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userImage, setUserImage] = useState<string | null>(
        currentUser.image
    );
    const { mobileView } = useMobileView();

    const toastPosition: ToastPosition = mobileView
        ? 'bottom-center'
        : 'bottom-left';

    const closeProfileDrawer = () => {
        reset();
        setAboutDisabled(true);
        setShowProfileDrawer(false);
    };

    const undoEditImage = () => {
        setUserImage(currentUser.image);
    };

    const updateProfile = async (data: FieldValues): Promise<boolean> => {
        try {
            const response = await axios.post('/api/profile', data);
            return response.status === 200;
        } catch (error: any) {
            console.log(error);
            return false;
        }
    };

    const updateImage = useCallback(async () => {
        setLoading(true);
        const loadingToast = toast.loading('Updating image...', {
            position: toastPosition,
        });
        try {
            const secureUrl = await createSecureUrl(userImage!);
            if (secureUrl) {
                setValue('image', secureUrl);
                const data = getValues();
                const success = await updateProfile(data);
                toast.dismiss(loadingToast);
                if (success) {
                    toast.success('Image updated!', {
                        position: toastPosition,
                    });
                }
            }
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong!', { position: toastPosition });
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [userImage]);

    const capitaliseString = (value: string): string => {
        const updatedString = value.charAt(0).toUpperCase() + value.slice(1);
        return updatedString;
    };

    const updateInputFields = async (key: 'name' | 'about') => {
        if (key === 'about') {
            setAboutDisabled(true);
        }

        const updatedFieldValue = getValues(key);
        if (currentUser[key] !== updatedFieldValue) {
            setLoading(true);
            try {
                const data = getValues();
                const success = await updateProfile(data);
                if (success) {
                    toast.success(`${capitaliseString(key)} updated!`, {
                        position: toastPosition,
                    });
                }
            } catch (error: any) {
                toast.error('Something went wrong!', {
                    position: toastPosition,
                });
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
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
                <InfoWrapper>
                    {userImage === null ? (
                        <EditableNoImage
                            imageHoverText="Add profile photo"
                            imageSrc={userImage}
                            setImage={setUserImage}
                            defaultImage="/user.png"
                        />
                    ) : (
                        <InfoImage
                            imageSrc={userImage}
                            hoverElementText="change profile photo"
                            setImage={setUserImage}
                            defaultImage="/user.png"
                        />
                    )}
                    {currentUser.image !== userImage && (
                        <SaveCancelButtons
                            cancelUpdate={undoEditImage}
                            saveUpdate={updateImage}
                        />
                    )}
                    <form
                        className="flex-1 flex flex-col overflow-y-auto w-full gap-12 px-12 mt-20"
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
                            saveFunction={() => updateInputFields('name')}
                            trigger={trigger}
                            setFocus={setFocus}
                            loading={loading}
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
                                    'flex gap-1 pb-2.5 items-start',
                                    !aboutDisabled &&
                                        'border-b-gray-400 border-b-2 focus-within:border-cyan-500'
                                )}
                            >
                                <MultilineInput
                                    id="about"
                                    register={register}
                                    placeHolder="Add About"
                                    className="w-full bg-secondary text-2xl midPhones:text-[1.7rem] pr-1"
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
                                        onClick={() =>
                                            updateInputFields('about')
                                        }
                                    >
                                        <FaCheck className="cursor-pointer text-3xl midPhones:text-4xl" />
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
