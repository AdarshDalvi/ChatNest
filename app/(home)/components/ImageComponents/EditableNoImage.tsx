// EditableNoImage.tsx
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsCameraFill } from 'react-icons/bs';
import ImageC from 'next/image';
import clsx from 'clsx';
import useImageHover from '@/app/hooks/useImageHover';
import useMobileView from '@/app/hooks/useMobileView';
import ImageUpdateModal from '../Modal/ImageUpdateModal';
import { FieldValues, UseFormSetValue } from 'react-hook-form';

type EditableNoImageProps = {
    id: string;
    imageSrc: string;
    imageHoverText: string;
    setValue: UseFormSetValue<FieldValues>;
};

const EditableNoImage: React.FC<EditableNoImageProps> = ({
    id,
    imageSrc,
    imageHoverText,
    setValue,
}) => {
    const { mobileView } = useMobileView();
    const { isHovering, handleImageHover } = useImageHover();
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const handleImageChange = async (file: File | null) => {
        if (!file) {
            toast.error('No image selected!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const image = new Image();
            image.onload = () => {
                setEditedImage(image.src);
            };
            image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const cancelUpdate = () => {
        setEditedImage(null);
    };

    return (
        <>
            <ImageUpdateModal
                imageId={id}
                setValue={setValue}
                image={editedImage}
                cancelUpdate={cancelUpdate}
            />
            <div
                className={clsx(
                    'w-[40%] relative rounded-full max-w-[200px] mt-4 bg-gray-200',
                    mobileView && 'max-w-[180px]'
                )}
                onMouseEnter={handleImageHover}
                onMouseLeave={handleImageHover}
            >
                <ImageC
                    src={imageSrc}
                    height={200}
                    width={200}
                    alt="placeholder group image"
                    className="w-full h-full rounded-full object-cover aspect-square"
                />
                {isHovering && (
                    <label
                        htmlFor={id}
                        className="select-none cursor-pointer absolute inset-0 bg-secondary/60 rounded-full flex flex-col gap-1 items-center justify-center"
                    >
                        <BsCameraFill className="text-camIconSize" />
                        <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                            {imageHoverText}
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
                )}
            </div>
        </>
    );
};

export default EditableNoImage;
