import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import Image from 'next/image';
import OptionsMenu, { Option } from './OptionsMenu/OptionsMenu';
import { BsCameraFill } from 'react-icons/bs';
import useMobileView from '@/app/hooks/useMobileView';
import clsx from 'clsx';

interface InfoImageProps {
    optionsList: Option[];
    imageSrc: string | null | undefined;
    hoverElementText: string;
}

const InfoImage: React.FC<InfoImageProps> = ({
    optionsList,
    imageSrc,
    hoverElementText,
}) => {
    const {
        ref,
        isHovering,
        handleImageHover,
        showOptionsMenu,
        toggleOptionsMenu,
    } = useOptionsMenu();

    const { mobileView } = useMobileView();

    return (
        <div
            ref={ref}
            onMouseEnter={!mobileView ? handleImageHover : undefined}
            onMouseLeave={!mobileView ? handleImageHover : undefined}
            className={clsx(
                'w-[40%]   relative    mt-4',
                !mobileView ? 'max-w-[200px] cursor-pointer' : 'max-w-[180px]'
            )}
        >
            <Image
                alt="Profile Picture"
                src={imageSrc || '/user.png'}
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
                        <BsCameraFill className="text-camIconSize " />
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
    );
};

export default InfoImage;
