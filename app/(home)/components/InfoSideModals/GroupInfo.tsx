import { Conversation, User } from '@prisma/client';

interface GroupInfoProps {
    chat: Conversation & {
        users: User[];
    };
}

const GroupInfo: React.FC<GroupInfoProps> = ({ chat }) => {
    return (
        <>
            <div></div>
            <div></div>
            <div></div>
        </>
    );
};

export default GroupInfo;
