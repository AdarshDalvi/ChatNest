import EditableNoImage from '@/app/(newhome)/components/ImageComponents/EditableNoImage';
import InfoImage from '@/app/(newhome)/components/ImageComponents/InfoImage';
import { useState } from 'react';
import ViewOnlyImage from '../../components/ViewOnlyImage';
import SaveCancelButtons from '@/app/(home)/components/ImageComponents/SaveCancelButtons';

type GroupIconSectionProps = {
    isCurrentUserAdmin: boolean;
    initialGroupIcon: string | null;
};

const GroupIconSection: React.FC<GroupIconSectionProps> = ({
    isCurrentUserAdmin,
    initialGroupIcon,
}) => {
    const [conversationImage, setConversationImage] = useState<string | null>(
        initialGroupIcon
    );

    return (
        <>
            {isCurrentUserAdmin ? (
                conversationImage === null ? (
                    <EditableNoImage
                        defaultImage="/group.png"
                        textOverImage="ADD GROUP ICON"
                        setImage={setConversationImage}
                    />
                ) : (
                    <InfoImage
                        fallbackImage="/group.png"
                        imageSrc={conversationImage}
                        overImageText="CHANGE GROUP ICON"
                        setImage={setConversationImage}
                    />
                )
            ) : (
                <ViewOnlyImage
                    imageSrc={conversationImage}
                    fallbackImage="/group.png"
                    isGroup
                />
            )}
            {isCurrentUserAdmin && conversationImage !== initialGroupIcon && (
                <SaveCancelButtons
                    saveUpdate={() => {}}
                    cancelUpdate={() =>
                        setConversationImage((prevImage) => initialGroupIcon)
                    }
                />
            )}
        </>
    );
};

export default GroupIconSection;
