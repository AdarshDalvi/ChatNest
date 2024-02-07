'use client';

import MultilineInput from '@/app/components/inputs/MultilineInput';
import Image from 'next/image';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { MdClose } from 'react-icons/md';

type ImageInputModalProps = {
    imageSrc: string;
    cancelImageSend: () => void;
    register: UseFormRegister<FieldValues>;
};

const ImageInputModal: React.FC<ImageInputModalProps> = ({
    imageSrc,
    cancelImageSend,
}) => {
    return (
        <div className="fixed w-screen h-screen md:absolute md:w-full md:h-full bg-secondary top-0 left-0  z-50 text-white">
            <div className="flex flex-col w-full h-full relative items-center">
                <MdClose
                    className="text-4xl absolute cursor-pointer midPhones:text-[2.5rem] top-8 midPhones:top-12  right-8 midPhones:right-12 self-end"
                    onClick={cancelImageSend}
                />
                <div className="flex-1 relative flex flex-col justify-center">
                    <Image
                        src={imageSrc}
                        alt="Image-Message"
                        width={500}
                        height={1000}
                        className="smallMobiles:max-h-[350px] object-contain"
                        sizes="100vw"
                    />
                </div>
                {/* <MultilineInput

                /> */}
            </div>
        </div>
    );
};

export default ImageInputModal;
