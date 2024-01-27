'use client';

import Avatar from '@/app/(home)/components/Avatar';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import CardWrapper from '../../components/CardWrapper';

interface UserCardProps {
    user: User;
    lastElement: boolean;
}

const UserCard: React.FC<UserCardProps> = ({ user, lastElement }) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.post('/api/new-conversation', {
                userId: user.id,
            });
            router.push(`/chats/${data.id}`);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    }, [user, router]);

    return (
        <CardWrapper handleClick={handleClick} lastElement={lastElement}>
            <div className="py-6">
                <Avatar user={user} status={true} />
            </div>
            <div className="flex-1 flex flex-col pr-6 justify-center border-t-[0.667px] border-cardBorder hover:border-none text-xl midPhones:text-2xl">
                <p>{user.name}</p>
                <p>&nbsp;</p>
            </div>
        </CardWrapper>
    );
};

export default UserCard;
