'use client';

import { Option } from '../OptionsMenu/OptionsMenu';
import InfoImage from '../ImageComponents/InfoImage';
import {
    FieldErrors,
    FieldValues,
    UseFormRegister,
    UseFormSetValue,
} from 'react-hook-form';
import EditInfoInput from '../InfoDrawers/EditInfoInput';
import NoImage from '../ImageComponents/NoImage';

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
            onClick: () => {
                console.log('hi');
            },
        },
        {
            name: 'Change Photo',
            onClick: () => {
                console.log('hi');
            },
        },
        {
            name: 'Remove Photo',
            onClick: () => {
                console.log('hi');
            },
        },
    ];

    return (
        <>
            {imageSrc === '/group.png' ? (
                <NoImage
                    id="image"
                    imageSrc={imageSrc}
                    editableImage
                    imageChangeFunction={() => {}}
                    imageHoverText="Add group icon"
                    setValue={setValue}
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
