import { useState } from 'react';
import EditableNoImage from '../components/ImageComponents/EditableNoImage';
import NewConversationStepsWrapper from './components/NewConversationStepsWrapper';

const NewConversationStepThree = () => {
    const [editedImage, setEditedImage] = useState<string | null>(null);
    return (
        <NewConversationStepsWrapper>
            <EditableNoImage
                imageSrc={editedImage}
                setImage={setEditedImage}
                defaultImage="/group.png"
                textOverImage="Add group icon"
            />
        </NewConversationStepsWrapper>
    );
};

export default NewConversationStepThree;
