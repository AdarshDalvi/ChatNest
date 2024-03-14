import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FullConversationType } from '../types/conversation';
import { User } from '@prisma/client';

const useOtherUser = (
    conversation: FullConversationType | { members: User[] }
) => {
    const session = useSession();
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user.email;

        const otherUser = conversation.members.filter(
            (user) => user.email !== currentUserEmail
        );
        return otherUser;
    }, [session.data?.user.email, conversation.members]);

    return otherUser[0];
};

export default useOtherUser;
