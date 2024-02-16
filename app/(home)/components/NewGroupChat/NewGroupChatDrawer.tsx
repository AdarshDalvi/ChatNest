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
        watch,
        setValue,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            image: '/group.png',
            members: [],
        },
    });
    const [loading, setLoading] = useState(false);

    const { currentStepIndex, navigateTo } = useNewgroup();

    const groupImage = watch('image');

    const addNewGroup: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
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
                        imageSrc={groupImage}
                        register={register}
                        errors={errors}
                        loading={loading}
                        setValue={setValue}
                    />
                )}
            </form>
        </DrawerWrapper>
    );
};

export default NewGroupChatDrawer;
