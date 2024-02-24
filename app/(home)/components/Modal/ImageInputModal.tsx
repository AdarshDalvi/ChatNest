'use client';

import MultilineInput from '@/app/components/inputs/MultilineInput';
import Image from 'next/image';
import { FieldValues, UseFormRegister, UseFormReset } from 'react-hook-form';
import { MdClose } from 'react-icons/md';
import { Image as ImageInterface } from '@prisma/client';
import clsx from 'clsx';
import InputSubmitButton from '../../conversations/conversationId/components/FormComponents/SubmitButton';

type ImageInputModalProps = {
    image: ImageInterface;
    cancelImageSend: () => void;
    register: UseFormRegister<FieldValues>;
    sendImageMessage: () => void;
    loading: boolean;
};

const ImageInputModal: React.FC<ImageInputModalProps> = ({
    image,
    cancelImageSend,
    register,
    sendImageMessage,
    loading,
}) => {
    return (
        <form
            onSubmit={sendImageMessage}
            className="fixed w-screen h-screen md:absolute md:w-full md:h-full bg-secondary top-0 left-0  z-20 text-white"
        >
            <div className="flex flex-col w-full h-full relative items-center">
                <MdClose
                    className={clsx(
                        'text-4xl z-50 absolute cursor-pointer midPhones:text-[2.5rem] top-8 midPhones:top-12  right-8 midPhones:right-12 self-end',
                        loading === true &&
                            'pointer-events-none cursor-not-allowed'
                    )}
                    onClick={cancelImageSend}
                />
                <div className="flex-1 relative flex flex-col justify-center">
                    <Image
                        src={image.src}
                        alt="Image-Message"
                        width={image.width}
                        height={image.height}
                        className="w-full max-w-[350px] max-h-[350px] md:max-w-[450px] md:max-h-[400px] object-contain"
                    />
                </div>
                <div className="absolute bottom-3 px-2 flex w-full items-center gap-2 z-50">
                    <div
                        className="flex-1 flex items-center bg-[#3c535e]  py-4 px-6 rounded-[2.2rem]
                        text-2xl"
                    >
                        <MultilineInput
                            id="caption"
                            shouldReset
                            placeHolder="Add a caption..."
                            register={register}
                            maxLength={1024}
                            className="flex-1 text-inherit bg-inherit pr-1"
                            disabled={loading}
                        />
                    </div>
                    <InputSubmitButton disabled={loading} />
                </div>
            </div>
        </form>
    );
};

export default ImageInputModal;
