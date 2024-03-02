import useImageUpdate from '@/app/hooks/useImageUpdate';
import useMobileView from '@/app/hooks/useMobileView';
import clsx from 'clsx';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { BsCameraFill } from 'react-icons/bs';
import ImageUpdateModal from './Modals/ImageUpdateModal';

type EditableNoImageProps = {
    imageSrc: string | null;
    textOverImage: string;
    setImage: Dispatch<SetStateAction<string | null>>;
    defaultImage: string;
};

const EditableNoImage: React.FC<EditableNoImageProps> = ({
    imageSrc,
    defaultImage,
    textOverImage,
    setImage,
}) => {
    const { mobileView } = useMobileView();
    const { editedImage, handleImageChange, cancelUpdate, imageModalRef } =
        useImageUpdate();

    return (
        <>
            <ImageUpdateModal
                imageModalRef={imageModalRef}
                cancelImageUpdate={cancelUpdate}
                image={editedImage}
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
                    src={imageSrc || defaultImage}
                    height={200}
                    width={200}
                    alt="placeholder group image"
                    className="w-full h-full rounded-full object-cover aspect-square"
                />
                <label
                    htmlFor="image"
                    className="select-none cursor-pointer absolute inset-0 bg-secondary/60 rounded-full flex flex-col gap-1 items-center justify-center"
                >
                    <BsCameraFill className="text-camIconSize" />
                    <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                        {textOverImage}
                    </p>
                    <input
                        id="image"
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
            </div>
        </>
    );
};

export default EditableNoImage;
