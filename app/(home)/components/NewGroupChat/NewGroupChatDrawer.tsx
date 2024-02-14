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
        setFocus,
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            image: '/user.png',
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
        setShowNewGroupChatDrawer(false);
    };

    return (
        <DrawerWrapper
            drawerHeading="New Group Chat"
            drawerOrigin="origin-left"
            iconRight
            icon={MdClear}
            showDrawer={showNewGroupChatDrawer}
            closeDrawer={closeGroupChatDrawer}
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
                    />
                ) : (
                    <NewGroupStepTwo
                        imageSrc={groupImage}
                        register={register}
                        errors={errors}
                        loading={loading}
                    />
                )}
            </form>
        </DrawerWrapper>
    );
};

export default NewGroupChatDrawer;
