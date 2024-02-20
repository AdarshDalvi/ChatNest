'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { useNewgroup } from '@/app/hooks/useNewGroup';
import NewGroupStepOne from './NewGroupStepOne';
import NewGroupStepTwo from './NewGroupStepTwo';
import { Dispatch, SetStateAction, useState } from 'react';
import './NewGroupChatDrawer.scss';
import DrawerWrapper from '../WrapperComponents/Drawer/DrawerWrapper';
import { MdClear } from 'react-icons/md';
import { IconType } from 'react-icons';
import { IoArrowBack } from 'react-icons/io5';
import axios from 'axios';
import toast, { ToastPosition } from 'react-hot-toast';
import useMobileView from '@/app/hooks/useMobileView';
import { useRouter } from 'next/navigation';

interface NewGroupChatDrawerProps {
    users: User[];
    showNewGroupChatDrawer: boolean;
    setShowNewGroupChatDrawer: Dispatch<SetStateAction<boolean>>;
}

const NewGroupChatDrawer: React.FC<NewGroupChatDrawerProps> = ({
    users,
    setShowNewGroupChatDrawer,
    showNewGroupChatDrawer,
}) => {
    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
        reset,
        trigger,
        getValues,
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            image: null,
            members: [],
        },
    });
    const [loading, setLoading] = useState(false);

    const { currentStepIndex, navigateTo } = useNewgroup();
    const { mobileView } = useMobileView();
    const router = useRouter();

    const toastPosition: ToastPosition = mobileView
        ? 'bottom-center'
        : 'bottom-left';

    const addNewGroup: SubmitHandler<FieldValues> = async (data) => {
        const loadingToast = toast.loading('Creating new group...', {
            position: toastPosition,
        });
        try {
            const response = await axios.post('/api/group-chat', data);
            console.log(response);
            toast.dismiss(loadingToast);
            toast.success('Group created successfully!', {
                position: toastPosition,
                duration: 3000,
            });
            router.refresh();
            setShowNewGroupChatDrawer(false);
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong!');
            console.log('Error creating group', error);
        } finally {
            setLoading(false);
        }
    };

    const closeGroupChatDrawer = () => {
        reset();
        setShowNewGroupChatDrawer(false);
    };

    const navigateToStepOne = () => {
        navigateTo(0);
    };

    const isStepOne: boolean = currentStepIndex === 0;

    const subHeading = isStepOne ? 'Add group members' : 'Change members';

    const icon: IconType = isStepOne ? MdClear : IoArrowBack;

    return (
        <DrawerWrapper
            drawerHeading="New Group Chat"
            subHeading={subHeading}
            drawerOrigin="origin-left"
            iconRight={isStepOne}
            icon={icon}
            showDrawer={showNewGroupChatDrawer}
            closeDrawer={isStepOne ? closeGroupChatDrawer : navigateToStepOne}
        >
            <form
                onSubmit={handleSubmit(addNewGroup)}
                className="flex-1 flex flex-col overflow-y-auto items-center w-full bg-secondary py-6 gap-4 relative"
            >
                {currentStepIndex === 0 ? (
                    <NewGroupStepOne
                        id="search-box"
                        users={users}
                        setValue={setValue}
                        navigateToNextStep={navigateTo}
                        getValues={getValues}
                    />
                ) : (
                    <NewGroupStepTwo
                        register={register}
                        errors={errors}
                        loading={loading}
                        setValue={setValue}
                        saveFunction={handleSubmit(addNewGroup)}
                        setLoading={setLoading}
                        trigger={trigger}
                    />
                )}
            </form>
        </DrawerWrapper>
    );
};

export default NewGroupChatDrawer;
