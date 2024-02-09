import { User } from '@prisma/client';
import CardWrapper from '../../WrapperComponents/CardWrapper/CardWrapper';

interface NewGroupUserCardProps {
    user: User;
    onClick: () => void;
}

const NewGroupUserCard: React.FC<NewGroupUserCardProps> = ({
    user,
    onClick,
}) => {
    return (
        <CardWrapper handleClick={onClick}>
            <div>{user.name}</div>
        </CardWrapper>
    );
};

export default NewGroupUserCard;
