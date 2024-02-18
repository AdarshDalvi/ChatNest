import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import Image from 'next/image';
import OptionsMenu, { Option } from '../OptionsMenu/OptionsMenu';
import { BsCameraFill } from 'react-icons/bs';
import useMobileView from '@/app/hooks/useMobileView';
import clsx from 'clsx';
import useImageUpdate from '@/app/hooks/useImageUpdate';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import ImageUpdateModal from '../Modal/ImageUpdateModal';
import { Dispatch, SetStateAction } from 'react';

interface InfoImageProps {
    setImage: Dispatch<SetStateAction<string | null>>;
    imageSrc: string | null;
    hoverElementText: string;
    defaultImage: string;
}

const InfoImage: React.FC<InfoImageProps> = ({
    setImage,
    imageSrc,
    hoverElementText,
    defaultImage,
}) => {
    const { editedImage, handleImageChange, cancelUpdate } = useImageUpdate();
    const optionsList: Option[] = [
        {
            name: 'View Photo',
            onClick: () => {},
        },
        {
            jsxElement: (
                <label htmlFor="image-btn" className="cursor-pointer">
                    Change Photo
                    <input
                        id="image-btn"
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        multiple={false}
                        className="hidden"
                        onChange={(event) => {
                            const file = event.target.files?.[0] || null;
                            toggleOptionsMenu();
                            handleImageChange(file);
                        }}
                    />
                </label>
            ),
        },
        {
            name: 'Remove Photo',
            onClick: () => {},
        },
    ];
    const {
        ref,
        isHovering,
        handleImageHover,
        showOptionsMenu,
        toggleOptionsMenu,
    } = useOptionsMenu();

    const { mobileView } = useMobileView();

    return (
        <>
            <ImageUpdateModal
                setImage={setImage}
                image={editedImage}
                cancelUpdate={cancelUpdate}
            />
            <div
                ref={ref}
                onMouseEnter={!mobileView ? handleImageHover : undefined}
                onMouseLeave={!mobileView ? handleImageHover : undefined}
                className={clsx(
                    'w-[40%]   relative    mt-4',
                    !mobileView
                        ? 'max-w-[200px] cursor-pointer'
                        : 'max-w-[180px]'
                )}
            >
                <Image
                    alt="Profile Picture"
                    src={imageSrc || defaultImage}
                    width={mobileView ? 180 : 200}
                    height={mobileView ? 180 : 200}
                    className={clsx(
                        'bg-gray-300  rounded-full',
                        mobileView && 'cursor-pointer'
                    )}
                />
                <OptionsMenu
                    showOptionsMenu={showOptionsMenu}
                    optionsList={optionsList}
                    className={clsx(
                        !mobileView
                            ? 'top-[60%] left-1/2 -translate-x-1/2 min-w-60 origin-top'
                            : 'top-[85%] right-[30%] smallMobiles:right-[26%]  min-w-[150px] origin-top-right'
                    )}
                />
                {!mobileView ? (
                    isHovering && (
                        <div
                            onClick={toggleOptionsMenu}
                            className="select-none absolute inset-0 bg-secondary bg-opacity-50 rounded-full flex flex-col items-center justify-center z-20"
                        >
                            <BsCameraFill className="midPhones:text-3xl md:text-4xl" />
                            <p className="text-sm smallMobiles:text-base midPhones:text-xl uppercase text-center">
                                {hoverElementText}
                            </p>
                        </div>
                    )
                ) : (
                    <button
                        type="button"
                        onClick={toggleOptionsMenu}
                        className="absolute bottom-[6%] -right-[2%] p-3  smallMobiles:p-4 rounded-full bg-primary cursor-pointer"
                    >
                        <BsCameraFill className="text-3xl smallMobiles:text-4xl" />
                    </button>
                )}
            </div>
        </>
    );
};

export default InfoImage;
