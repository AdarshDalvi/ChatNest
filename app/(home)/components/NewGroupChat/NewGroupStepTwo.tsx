'use client';

import InfoImage from '../ImageComponents/InfoImage';
import {
    FieldErrors,
    FieldValues,
    UseFormGetValues,
    UseFormRegister,
    UseFormSetValue,
    UseFormTrigger,
} from 'react-hook-form';
import EditInfoInput from '../../../components/inputs/EditInfoInput';
import EditableNoImage from '../ImageComponents/EditableNoImage';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import createSecureUrl from '@/app/lib/secureUrl';

interface NewGroupStepTwoProps {
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    loading: boolean;
    setValue: UseFormSetValue<FieldValues>;
    saveFunction: () => void;
    setLoading: Dispatch<SetStateAction<boolean>>;
    trigger: UseFormTrigger<FieldValues>;
}

const NewGroupStepTwo: React.FC<NewGroupStepTwoProps> = ({
    register,
    errors,
    loading,
    setValue,
    saveFunction,
    setLoading,
    trigger,
}) => {
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const setGroupImageAndCreate = useCallback(async () => {
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
    }, [editedImage]);

    return (
        <>
            {editedImage === null ? (
                <EditableNoImage
                    imageSrc={editedImage}
                    imageHoverText="Add group icon"
                    defaultImage="/group.png"
                    setImage={setEditedImage}
                />
            ) : (
                <InfoImage
                    imageSrc={editedImage}
                    hoverElementText="CHANGE GROUP ICON"
                    setImage={setEditedImage}
                    defaultImage="/group.png"
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

export default NewGroupStepTwo;
