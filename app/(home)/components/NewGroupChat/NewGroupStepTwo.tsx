'use client';

import { Option } from '../OptionsMenu/OptionsMenu';
import InfoImage from '../ImageComponents/InfoImage';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import EditInfoInput from '../../../components/inputs/EditInfoInput';
import EditableNoImage from '../ImageComponents/EditableNoImage';
import useImageUpdate from '@/app/hooks/useImageUpdate';
import ImageUpdateModal from '../Modal/ImageUpdateModal';

interface NewGroupStepTwoProps {
    imageSrc: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    loading: boolean;
    setValue: UseFormSetValue<FieldValues>;
}

const NewGroupStepTwo: React.FC<NewGroupStepTwoProps> = ({
    imageSrc,
    register,
    errors,
    loading,
    setValue,
}) => {
    const optionsList: Option[] = [
        {
            name: 'View Photo',
            onClick: () => {},
        },
        {
            jsxElement: (
                <label htmlFor="image-btn" className="cursor-pointer">
                    Change Photo
                    <input
                        id="image-btn"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        multiple={false}
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0] || null;
                            handleImageChange(file);
                        }}
                    />
                </label>
            ),
        },
        {
            name: 'Remove Photo',
            onClick: () => {},
        },
    ];

    const { editedImage, handleImageChange, cancelUpdate } = useImageUpdate();

    return (
        <>
            <ImageUpdateModal
                imageId={'image'}
                setValue={setValue}
                image={editedImage}
                cancelUpdate={cancelUpdate}
            />
            {imageSrc === null ? (
                <EditableNoImage
                    id="image"
                    imageSrc={imageSrc}
                    imageHoverText="Add group icon"
                    setValue={setValue}
                    defaultImage="/group.png"
                />
            ) : (
                <InfoImage
                    imageSrc={imageSrc}
                    optionsList={optionsList}
                    hoverElementText="CHANGE GROUP ICON"
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
                type="submit"
                className="bg-primary px-10 rounded-sm py-2.5 text-2xl mt-8"
            >
                Add
            </button>
        </>
    );
};

export default NewGroupStepTwo;
