// EditableNoImage.tsx
import { BsCameraFill } from 'react-icons/bs';
import ImageC from 'next/image';
import clsx from 'clsx';
import useMobileView from '@/app/hooks/useMobileView';
import ImageUpdateModal, {
    ImageUpdateModalOrigin,
} from '../Modal/ImageUpdateModal';
import useImageUpdate from '@/app/hooks/useImageUpdate';
import { Dispatch, SetStateAction } from 'react';

type EditableNoImageProps = {
    imageSrc: string | null;
    imageHoverText: string;
    setImage: Dispatch<SetStateAction<string | null>>;
    defaultImage: string;
    // imageUpdateModalOrigin: ImageUpdateModalOrigin;
};

const EditableNoImage: React.FC<EditableNoImageProps> = ({
    imageSrc,
    imageHoverText,
    setImage,
    defaultImage,
    // imageUpdateModalOrigin,
}) => {
    const { mobileView } = useMobileView();

    const { editedImage, handleImageChange, cancelUpdate } = useImageUpdate();

    return (
        <>
            <ImageUpdateModal
                setImage={setImage}
                image={editedImage}
                cancelUpdate={cancelUpdate}
                // modalOrigin={imageUpdateModalOrigin}
            />
            <div
                className={clsx(
                    'w-[40%] relative rounded-full max-w-[200px] mt-4 bg-gray-300',
                    mobileView && 'max-w-[180px]'
                )}
            >
                <ImageC
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
            </div>
        </>
    );
};

export default EditableNoImage;
