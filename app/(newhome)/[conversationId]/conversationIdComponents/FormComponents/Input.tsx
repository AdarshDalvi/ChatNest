'use client';

import { FaImage } from 'react-icons/fa6';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import InputSubmitButton from './SubmitButton';
import MultilineInput from '@/app/components/inputs/MultilineInput';
import ImageInput from '@/app/(newhome)/components/ImageComponents/ImageInput';

interface ConversationScreenInputProps {
    id: string;
    handleImageChange: (file: File | null) => void;
    register: UseFormRegister<FieldValues>;
    sendTextOnEnter: () => void;
}

const ConversationScreenInput: React.FC<ConversationScreenInputProps> = ({
    id,
    register,
    handleImageChange,
    sendTextOnEnter,
}) => {
    return (
        <main className="flex z-10 gap-1.5 midPhones:gap-2 text-white">
            <div className="flex-1 flex items-center bg-[#3c535e] px-5 py-4 relative rounded-[2.2rem] text-2xl">
                <MultilineInput
                    id={id}
                    validationSchema={{ required: true }}
                    placeHolder="Type a message"
                    register={register}
                    maxHeight={100}
                    shouldReset
                    style={{ scrollbarGutter: 'stable' }}
                    className="bg-inherit text-inherit flex-1 mr-1.5 ml-2.5 pr-1"
                    onEnterEvent={sendTextOnEnter}
                />
                <ImageInput
                    afterChangeFunction={handleImageChange}
                    buttonClassNames="self-end mb-0.5 midPhones:mb-1 text-3xl text-placeHolderColor"
                >
                    <FaImage />
                </ImageInput>
            </div>
            <InputSubmitButton />
        </main>
    );
};

export default ConversationScreenInput;
