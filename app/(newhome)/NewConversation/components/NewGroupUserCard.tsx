import { User } from '@prisma/client';
import { FaCheck } from 'react-icons/fa6';
import CardWrapper from '../../components/WrapperComponents/CardWrapper/CardWrapper';
import Avatar from '../../components/Avatar';

interface NewGroupUserCardProps {
    user: User;
    onClick: () => void;
    lastElement: boolean;
    selected: boolean;
}

const NewGroupUserCard: React.FC<NewGroupUserCardProps> = ({
    user,
    onClick,
    lastElement,
    selected,
}) => {
    return (
        <CardWrapper handleClick={onClick} lastElement={lastElement}>
            <div className="py-6 relative">
                <Avatar avatarImg={user} status={false} size="CARD" />
                {selected && (
                    <div className="bg-green-500 absolute -right-2 ring-2 ring-secondary bottom-9 midPhones:bottom-10 p-1 rounded-full">
                        <FaCheck className="text-xl text-secondary" />
                    </div>
                )}
            </div>
            <div className="flex-1 flex flex-col pr-6 justify-center border-t-[0.667px] border-cardBorder hover:border-none text-xl midPhones:text-2xl">
                <p>{user.name}</p>
                <p>&nbsp;</p>
            </div>
        </CardWrapper>
    );
};

export default NewGroupUserCard;
