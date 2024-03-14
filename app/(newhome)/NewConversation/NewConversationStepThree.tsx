import { Dispatch, SetStateAction, useState } from 'react';
import EditableNoImage from '../components/ImageComponents/EditableNoImage';
import {
    FieldErrors,
    SubmitHandler,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form';
import { DefaultGroupFormValues } from './NewConversationDrawer';
import InfoImage from '../components/ImageComponents/InfoImage';
import EditInfoInput from '@/app/components/inputs/EditInfoInput';
import createSecureUrl from '@/app/lib/secureUrl';
import toast from 'react-hot-toast';
import getToastPosition from '@/app/lib/getToastPosition';
import axios from 'axios';

type NewConversationStepThreeProps = {
    trigger: UseFormTrigger<DefaultGroupFormValues>;
    register: UseFormRegister<DefaultGroupFormValues>;
    setValue: UseFormSetValue<DefaultGroupFormValues>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    errors: FieldErrors<DefaultGroupFormValues>;
    loading: boolean;
    getValues: UseFormGetValues<DefaultGroupFormValues>;
    setShowNewConversationDrawer: Dispatch<SetStateAction<boolean>>;
};

const NewConversationStepThree: React.FC<NewConversationStepThreeProps> = ({
    trigger,
    register,
    setValue,
    errors,
    loading,
    getValues,
    setLoading,
    setShowNewConversationDrawer,
}) => {
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const toastPosition = getToastPosition();

    const createNewGroup: SubmitHandler<DefaultGroupFormValues> = async (
        data
    ): Promise<boolean> => {
        console.log(data);
        try {
            const response = await axios.post('/api/group-chat', data);
            return true;
        } catch (error: any) {
            console.log('Error creating group', error);
            return false;
        }
    };

    const setGroupImageAndCreate = async () => {
        const isValid = await trigger('name', { shouldFocus: true });
        if (!isValid) return;

        setLoading(true);
        const loadingToast = toast.loading('Creating group...', {
            position: toastPosition,
        });

        try {
            const secureUrl = await createSecureUrl(editedImage);
            if (secureUrl) setValue('image', secureUrl);
            const data = getValues();
            const success = await createNewGroup(data);
            toast.dismiss(loadingToast);
            toast.success('Group created successfully!', {
                position: toastPosition,
            });
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong. Please try again later!', {
                position: toastPosition,
            });
        } finally {
            setLoading(false);
            setShowNewConversationDrawer(false);
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
            <div className="flex flex-col gap-16 w-full px-8 mt-20 ">
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
                    disabled={loading}
                />
                <EditInfoInput
                    register={register}
                    label="Group Description (Optional)"
                    placeHolder="Enter group description"
                    id="groupDescription"
                    maxLength={30}
                    validationSchema={{}}
                    errors={errors}
                    disabled={loading}
                />
            </div>
            <button
                type="button"
                className="bg-primary px-10 rounded-sm py-2.5 text-2xl mt-8"
                onClick={setGroupImageAndCreate}
                disabled={loading}
            >
                Add
            </button>
        </>
    );
};

export default NewConversationStepThree;
