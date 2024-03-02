import { Dispatch, SetStateAction, useState } from 'react';
import EditableNoImage from '../components/ImageComponents/EditableNoImage';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form';
import { DefaultGroupFormValues } from './NewConversationDrawer';
import InfoImage from '../components/ImageComponents/InfoImage';
import EditInfoInput from '@/app/components/inputs/EditInfoInput';
import createSecureUrl from '@/app/lib/secureUrl';

type NewConversationStepThreeProps = {
    trigger: UseFormTrigger<DefaultGroupFormValues>;
    register: UseFormRegister<DefaultGroupFormValues>;
    setValue: UseFormSetValue<DefaultGroupFormValues>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    saveFunction: () => void;
    errors: FieldErrors<DefaultGroupFormValues>;
    loading: boolean;
};

const NewConversationStepThree: React.FC<NewConversationStepThreeProps> = ({
    trigger,
    register,
    setValue,
    errors,
    loading,
    saveFunction,
    setLoading,
}) => {
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const setGroupImageAndCreate = async () => {
        const isValid = await trigger('name', { shouldFocus: true });
        if (!isValid) return;
        setLoading(true);
        try {
            if (editedImage) {
                const secureUrl = await createSecureUrl(editedImage);
                if (secureUrl) {
                    setValue('image', secureUrl);
                    saveFunction();
                } else {
                    setLoading(false);
                }
            } else {
                saveFunction();
            }
        } catch (error: any) {
            setLoading(false);
            console.log('error uploading image to cloudinary', error);
        }
    };
    return (
        <>
            {editedImage === null ? (
                <EditableNoImage
                    setImage={setEditedImage}
                    defaultImage="/group.png"
                    textOverImage="Add group icon"
                />
            ) : (
                <InfoImage
                    imageSrc={editedImage}
                    fallbackImage="/group.png"
                    overImageText="Change group icon"
                    setImage={setEditedImage}
                />
            )}
            <div className="flex flex-col gap-6 w-full px-8 mt-20">
                <EditInfoInput
                    register={register}
                    label="Group Name"
                    placeHolder="Enter group name"
                    id="name"
                    maxLength={30}
                    validationSchema={{
                        required: 'Group name cannot be empty!',
                    }}
                    errors={errors}
                    loading={loading}
                />
            </div>
            <button
                type="button"
                className="bg-primary px-10 rounded-sm py-2.5 text-2xl mt-8"
                onClick={setGroupImageAndCreate}
            >
                Add
            </button>
        </>
    );
};

export default NewConversationStepThree;
