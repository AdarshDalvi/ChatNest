import useImageUpdate from '@/app/hooks/useImageUpdate';
import useMobileView from '@/app/hooks/useMobileView';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import ImageUpdateModal from './Modals/ImageUpdateModal';
import ImageInput from './ImageInput';

type EditableNoImageProps = {
    textOverImage: string;
    setImage: Dispatch<SetStateAction<string | null>>;
    defaultImage: string;
};

const EditableNoImage: React.FC<EditableNoImageProps> = ({
    defaultImage,
    textOverImage,
    setImage,
}) => {
    const { mobileView } = useMobileView();
    const { inputImage, handleImageChange, cancelUpdate, imageModalRef } =
        useImageUpdate();

    return (
        <>
            <ImageUpdateModal
                imageModalRef={imageModalRef}
                cancelImageUpdate={cancelUpdate}
                image={inputImage}
                fallbackImage="/group.png"
                setImage={setImage}
            />
            <div
                className={clsx(
                    'w-[40%] relative rounded-full max-w-[200px] mt-4 bg-gray-300',
                    mobileView && 'max-w-[180px]'
                )}
            >
                <Image
                    src={defaultImage}
                    height={200}
                    width={200}
                    alt="placeholder group image"
                    className="w-full h-full rounded-full object-cover aspect-square"
                />
                <ImageInput
                    afterChangeFunction={handleImageChange}
                    buttonClassNames="select-none cursor-pointer absolute inset-0 bg-gray-900/60 rounded-full flex flex-col gap-1 items-center justify-center"
                >
                    <BsCameraFill className="text-camIconSize" />
                    <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                        {textOverImage}
                    </p>
                </ImageInput>
            </div>
        </>
    );
};

export default EditableNoImage;
