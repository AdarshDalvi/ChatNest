'use client';

import Avatar from '@/app/(home)/components/Avatar';
import { User } from '@prisma/client';
import axios from 'axios';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import CardWrapper from '../../components/WrapperComponents/CardWrapper/CardWrapper';
import useConversation from '@/app/hooks/useConversation';

interface UserCardProps {
    user: User;
    lastElement: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, lastElement }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { updateSelectedPage, updateConversationId } = useConversation();

    const handleClick = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post('/api/single-chat', {
                userId: user.id,
            });
            updateConversationId(data.id);
            updateSelectedPage('CHATS');
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <CardWrapper handleClick={handleClick} lastElement={lastElement}>
            <div className="py-6">
                <Avatar avatarImg={user} status={true} size="CARD" />
            </div>
            <div className="flex-1 flex flex-col pr-6 justify-center border-t-[0.667px] border-cardBorder hover:border-none text-xl midPhones:text-2xl">
                <p>{user.name}</p>
                <p>&nbsp;</p>
            </div>
        </CardWrapper>
    );
};

export default UserCard;
