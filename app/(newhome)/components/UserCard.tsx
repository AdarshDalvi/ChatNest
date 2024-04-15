import { User } from '@prisma/client';
import CardWrapper from './WrapperComponents/CardWrapper/CardWrapper';
import Avatar from './Avatar';

type CommonCardProps = {
    onCardClick: () => void;
    lastElement?: boolean;
    disabled?: boolean;
};

type CustomCardProps = {
    img: string;
    customInfo: React.ReactNode;
};

type DefaultCardProps = {
    user: User;
};

type UserCardProps = CommonCardProps & (DefaultCardProps | CustomCardProps);

const UserCard: React.FC<UserCardProps> = ({
    onCardClick,
    lastElement,
    disabled,
    ...props
}) => {
    const { img, customInfo } = props as CustomCardProps;
    const { user } = props as DefaultCardProps;

    const cardImage = img ? img : user;

    return (
        <CardWrapper
            handleClick={onCardClick}
            lastElement={lastElement}
            disabled={disabled}
        >
            <div className="py-5">
                <Avatar size="CARD" avatarImg={cardImage} status={false} />
            </div>
            <div className="flex-1 self-stretch flex flex-col items-start justify-center border-t-[0.667px] border-t-cardBorder pr-6">
                {customInfo ? (
                    customInfo
                ) : (
                    <>
                        <p>{user.name}</p>
                        {user.about ? (
                            <p className="text-lg midPhones:text-xl text-gray-400">
                                {user.about}
                            </p>
                        ) : (
                            <p>&nbsp;</p>
                        )}
                    </>
                )}
            </div>
        </CardWrapper>
    );
};

export default UserCard;
