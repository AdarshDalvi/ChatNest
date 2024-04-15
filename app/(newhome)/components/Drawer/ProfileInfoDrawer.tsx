import {
    Dispatch,
    SetStateAction,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import capitalizeString from '@/app/lib/capitaliseString';
import createSecureUrl from '@/app/lib/secureUrl';
import { User } from '@prisma/client';

import Drawer from './Drawer';
import DrawerChildrenWrapper from './DrawerChildrenWrapper';
import EditableNoImage from '../ImageComponents/EditableNoImage';
import InfoImage from '../ImageComponents/InfoImage';
import SaveCancelButtons from '../SaveCancelButtons';
import EditInfoInput from '@/app/components/inputs/EditInfoInput';
import MultilineInput from '@/app/components/inputs/MultilineInput';

import axios from 'axios';
import clsx from 'clsx';

import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { MdClear, MdOutlineModeEditOutline } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa6';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/lib/pusher';
import useToast from '@/app/hooks/useToast';

type ProfileInfoDrawerProps = {
    currentUser: User;
    showProfileDrawer: boolean;
    setShowProfileDrawer: Dispatch<SetStateAction<boolean>>;
    setCurrentUser: Dispatch<SetStateAction<User>>;
};
const ProfileInfoDrawer: React.FC<ProfileInfoDrawerProps> = ({
    currentUser,
    showProfileDrawer,
    setShowProfileDrawer,
    setCurrentUser,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        trigger,
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            name: currentUser?.name || '',
            image: currentUser?.image,
            about: currentUser?.about || '',
        },
    });

    const session = useSession();

    const pusherKey = useMemo(() => {
        return session.data?.user.email;
    }, [session.data?.user.email]);

    const [aboutDisabled, setAboutDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [userImage, setUserImage] = useState<string | null>(
        currentUser?.image
    );

    useEffect(() => {
        if (!pusherKey) {
            return;
        }
        const updateProfileHandler = (currentUpdatedUser: User) => {
            setCurrentUser((prevData) => {
                return {
                    ...currentUser,
                    name: currentUpdatedUser.name,
                    image: currentUpdatedUser.image,
                    about: currentUpdatedUser.about,
                };
            });

            setValue('name', currentUpdatedUser.name);
            setValue('image', currentUpdatedUser.image);
            setValue('about', currentUpdatedUser.about);
        };

        pusherClient.subscribe(pusherKey);
        pusherClient.bind('profile:update', updateProfileHandler);

        return () => {
            if (pusherKey) {
                pusherClient.unsubscribe(pusherKey);

                pusherClient.unbind('profile:update', updateProfileHandler);
            }
        };
    }, [pusherKey]);

    const toastPosition = useToast();

    const closeProfileDrawer = () => {
        setValue('name', currentUser.name);
        setValue('image', currentUser.image);
        setValue('about', currentUser.about);
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
                    setUserImage(secureUrl); // Update userImage state with the new image
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
                    toast.success(`${capitalizeString(key)} updated!`, {
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
        <Drawer
            closeDrawer={closeProfileDrawer}
            drawerHeading="Profile info"
            drawerOrigin="origin-left"
            icon={MdClear}
            showDrawer={showProfileDrawer}
            disabled={loading}
        >
            {showProfileDrawer && (
                <DrawerChildrenWrapper>
                    {userImage === null ? (
                        <EditableNoImage
                            textOverImage="Add profile photo"
                            setImage={setUserImage}
                            defaultImage="/user.png"
                        />
                    ) : (
                        <InfoImage
                            imageSrc={userImage}
                            overImageText="change profile photo"
                            setImage={setUserImage}
                            fallbackImage="/user.png"
                        />
                    )}
                    {currentUser.image !== userImage && (
                        <SaveCancelButtons
                            loading={loading}
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
                            disabled={loading}
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
                </DrawerChildrenWrapper>
            )}
        </Drawer>
    );
};

export default ProfileInfoDrawer;
