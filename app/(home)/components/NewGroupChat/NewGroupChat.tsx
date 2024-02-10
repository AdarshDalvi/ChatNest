'use client';

import { FieldValues, useForm } from 'react-hook-form';
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
    const { register, watch, setValue } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            members: [],
        },
    });
    const [loading, setLoading] = useState(false);

    const { currentStepIndex, navigateTo, steps, step } = useNewgroup([
        <NewGroupStepOne id="search-box" users={users} setValue={setValue} />,
        <NewGroupStepTwo />,
    ]);
    return (
        <form className="flex-1 flex flex-col overflow-y-auto bg-secondary py-6">
            {step}
        </form>
    );
};

export default NewGroupChat;
