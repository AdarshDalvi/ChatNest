import { Dispatch, SetStateAction, useRef } from 'react';
import ImageUpdateModal from './Modals/ImageUpdateModal';
import useImageUpdate from '@/app/hooks/useImageUpdate';
import clsx from 'clsx';
import useMobileView from '@/app/hooks/useMobileView';
import Image from 'next/image';
import { BsCameraFill } from 'react-icons/bs';
import OptionsMenu, { Option } from '../OptionsMenu';
import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import ImageInput from './ImageInput';
import ImageViewModal from './Modals/ImageViewModal';
import useModalDialog from '@/app/hooks/useModalDialog';
// import openUserGallery from '@/app/lib/openUserGallery';
// import ImageInput, { ImageInputRef } from './ImageInput';

type InfoImageProps = {
    imageSrc: string;
    setImage: Dispatch<SetStateAction<string | null>>;
    fallbackImage: string;
    overImageText: string;
};
const InfoImage: React.FC<InfoImageProps> = ({
    imageSrc,
    fallbackImage,
    overImageText,
    setImage,
}) => {
    const { imageModalRef, inputImage, handleImageChange, cancelUpdate } =
        useImageUpdate();
    const { mobileView } = useMobileView();
    const { ref, toggleOptionsMenu, showOptionsMenu, closeOptionsMenu } =
        useOptionsMenu();

    const updateInfoImage = (file: File | null) => {
        closeOptionsMenu();
        handleImageChange(file);
    };

    const optionsList: Option[] = [
        {
            name: 'View Photo',
            onClick: () => {
                openDialog();
                closeOptionsMenu();
            },
        },
        {
            jsxElement: (
                <ImageInput
                    afterChangeFunction={updateInfoImage}
                    buttonClassNames="hover:bg-gray-800 py-4 px-12 text-center w-full"
                >
                    Change Photo
                </ImageInput>
            ),
        },
        {
            name: 'Remove Photo',
            onClick: () => {},
        },
    ];

    const [modalDialogRef, openDialog, closeDialog] = useModalDialog();

    return (
        <>
            <ImageViewModal
                imageModalRef={modalDialogRef}
                image={imageSrc}
                closeModal={closeDialog}
            />
            <ImageUpdateModal
                image={inputImage}
                cancelImageUpdate={cancelUpdate}
                fallbackImage="/group.png"
                imageModalRef={imageModalRef}
                setImage={setImage}
            />
            <div
                ref={ref}
                className={clsx(
                    'w-[40%] relative rounded-full max-w-[200px] mt-4 bg-gray-300',
                    mobileView && 'max-w-[180px]'
                )}
            >
                <OptionsMenu
                    showOptionsMenu={showOptionsMenu}
                    className={clsx(
                        'top-[60%] left-1/2 -translate-x-1/2 min-w-64 origin-top',
                        mobileView && 'max-w-[130px] '
                    )}
                    optionsList={optionsList}
                />
                <Image
                    alt="icon"
                    src={imageSrc || fallbackImage}
                    width={200}
                    height={200}
                    className="w-full h-full rounded-full object-cover aspect-square"
                />
                <button
                    type="button"
                    onClick={toggleOptionsMenu}
                    className="select-none cursor-pointer absolute inset-0 bg-gray-900/60 rounded-full flex flex-col gap-1 items-center justify-center"
                >
                    <BsCameraFill className="text-camIconSize" />
                    <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                        {overImageText}
                    </p>
                </button>
            </div>
        </>
    );
};

export default InfoImage;
