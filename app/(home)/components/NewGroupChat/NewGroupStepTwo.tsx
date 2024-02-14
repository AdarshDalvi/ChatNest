'use client';

import { Option } from '../OptionsMenu/OptionsMenu';
import InfoImage from '../InfoImage';
import {
    FieldErrors,
    FieldValues,
    SubmitHandler,
    UseFormHandleSubmit,
    UseFormRegister,
    UseFormSetFocus,
    UseFormTrigger,
} from 'react-hook-form';
import MultilineInput from '@/app/components/inputs/MultilineInput';
import EditInfoInput from '../InfoSideModals/EditInfoInput';

interface NewGroupStepTwoProps {
    imageSrc: string;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    trigger: UseFormTrigger<FieldValues>;
    setFocus: UseFormSetFocus<FieldValues>;
}

const NewGroupStepTwo: React.FC<NewGroupStepTwoProps> = ({
    imageSrc,
    register,
    errors,
    trigger,
    setFocus,
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
            <InfoImage
                imageSrc={imageSrc}
                optionsList={optionsList}
                hoverElementText="CHANGE GROUP ICON"
            />
            <div className="flex flex-col gap-6 w-full px-8 mt-20">
                <EditInfoInput
                    register={register}
                    label="Group Name"
                    placeHolder="Enter group name"
                    id="name"
                    errors={errors}
                    validationSchema={{ required: 'Group name is required' }}
                    setFocus={setFocus}
                    trigger={trigger}
                />
            </div>
            <div className="flex">
                <button type="submit">save</button>
            </div>
        </>
    );
};

export default NewGroupStepTwo;
