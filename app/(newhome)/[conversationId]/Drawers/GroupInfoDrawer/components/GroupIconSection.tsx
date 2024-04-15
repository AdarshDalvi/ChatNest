import EditableNoImage from '@/app/(newhome)/components/ImageComponents/EditableNoImage';
import InfoImage from '@/app/(newhome)/components/ImageComponents/InfoImage';
import { Dispatch, SetStateAction, useState } from 'react';
import ViewOnlyImage from '../../components/ViewOnlyImage';
import SaveCancelButtons from '@/app/(newhome)/components/SaveCancelButtons';

type GroupIconSectionProps = {
    isCurrentUserAdmin: boolean;
    initialGroupIcon: string | null;
    updateGroupIcon: (
        updatedImage: string,
        afterUpdateFunction: Dispatch<SetStateAction<string | null>>
    ) => void;
    loading: boolean;
};

const GroupIconSection: React.FC<GroupIconSectionProps> = ({
    isCurrentUserAdmin,
    initialGroupIcon,
    updateGroupIcon,
    loading,
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
                    loading={loading}
                    saveUpdate={() =>
                        updateGroupIcon(
                            conversationImage!,
                            setConversationImage
                        )
                    }
                    cancelUpdate={() =>
                        setConversationImage((prevImage) => initialGroupIcon)
                    }
                />
            )}
        </>
    );
};

export default GroupIconSection;
