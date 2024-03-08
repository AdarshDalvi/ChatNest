import Avatar from '@/app/(newhome)/components/Avatar';
import { User } from '@prisma/client';

type GroupMemberCardProps = {
    user: User;
    onCardClick: () => void;
    isAdmin: boolean;
};
const GroupMemberCard: React.FC<GroupMemberCardProps> = ({
    user,
    onCardClick,
    isAdmin,
}) => {
    return (
        <button className="w-full flex gap-6 hover:bg-cardHoverColor px-4">
            <div className="py-5">
                <Avatar avatarImg={user} size="HEADER" status={false} />
            </div>
            <div className="flex-1 flex flex-col self-stretch justify-center items-start text-xl midPhones:text-2xl">
                <div className="flex w-full justify-between items-center">
                    <p>{user.name}</p>
                    {isAdmin === true && (
                        <p className="text-base bg-cardFocusColor text-cyan-400 px-3 py-1 rounded-sm ">
                            Group Admin
                        </p>
                    )}
                </div>
                {user.about ? (
                    <p className="text-placeHolderColor text-start max-w-[140px] smallMobiles:max-w-[160px] midPhones:max-w-[250px] truncate">
                        {user.about}
                    </p>
                ) : (
                    <>&nbsp;</>
                )}
            </div>
        </button>
    );
};

export default GroupMemberCard;
