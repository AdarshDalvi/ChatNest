'use client';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { useNewgroup } from '@/app/hooks/useNewGroup';
import NewGroupStepOne from './NewGroupStepOne';
import NewGroupStepTwo from './NewGroupStepTwo';
import { useState } from 'react';
import './NewGroupChat.scss';

interface NewGroupChatProps {
    users: User[];
}

const NewGroupChat: React.FC<NewGroupChatProps> = ({ users }) => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
        handleSubmit,
        trigger,
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

    return (
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
                    trigger={trigger}
                    setFocus={setFocus}
                />
            )}
        </form>
    );
};

export default NewGroupChat;
