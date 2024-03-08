import { Conversation, User } from '@prisma/client';
import DrawerWrapper from '../WrapperComponents/Drawer/DrawerWrapper';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { MdClear } from 'react-icons/md';
import InfoWrapper from '../WrapperComponents/InfoWrapper';
import { useSession } from 'next-auth/react';
import InfoImage from '../ImageComponents/InfoImage';
import EditableNoImage from '../ImageComponents/EditableNoImage';

interface GroupInfoDrawerProps {
    chat: Conversation & {
        users: User[];
    };
    showGroupInfoDrawer: boolean;
    setShowGroupInfoDrawer: Dispatch<SetStateAction<boolean>>;
}

const GroupInfoDrawer: React.FC<GroupInfoDrawerProps> = ({
    chat,
    showGroupInfoDrawer,
    setShowGroupInfoDrawer,
}) => {
    const closeGroupInfoDrawer = () => {
        setShowGroupInfoDrawer(false);
    };

    const session = useSession();

    const currentUser = useMemo(() => {
        return session.data?.user;
    }, [session.data?.user]);

    console.log(currentUser);

    const isCurrentUserAdmin = useMemo(() => {
        if (!currentUser) return false;
        const isAdmin = chat.adminsIds.some(
            (adminUserId) => adminUserId === currentUser.id
        );
        return isAdmin;
    }, [currentUser]);

    const [conversationImage, setChatImage] = useState<string | null>(
        chat.image
    );

    return (
        <DrawerWrapper
            drawerHeading="Group Info"
            drawerOrigin="origin-right"
            showDrawer={showGroupInfoDrawer}
            closeDrawer={closeGroupInfoDrawer}
            icon={MdClear}
        >
            <InfoWrapper>
                {isCurrentUserAdmin ? (
                    chat.image === null ? (
                        <EditableNoImage
                            defaultImage="/group.png"
                            imageHoverText="ADD GROUP ICON"
                            imageSrc={conversationImage}
                            setImage={setChatImage}
                        />
                    ) : (
                        <InfoImage
                            defaultImage="/group.png"
                            imageSrc={conversationImage}
                            hoverElementText="CHANGE GROUP ICON"
                            setImage={setChatImage}
                        />
                    )
                ) : (
                    <div>hix</div>
                )}
            </InfoWrapper>
        </DrawerWrapper>
    );
};

export default GroupInfoDrawer;
