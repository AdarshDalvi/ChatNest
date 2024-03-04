import { FullMessageType } from '@/app/types/conversation';
import clsx from 'clsx';
import Image from 'next/image';
import { format } from 'date-fns';
import { TbChecks } from 'react-icons/tb';

interface ImageTextProps {
    message: FullMessageType;
    isOwn: boolean;
    seenList: (string | null)[];
}

const ImageText: React.FC<ImageTextProps> = ({ message, isOwn, seenList }) => {
    const imageWidth = message.image!.width;
    const imageHeight = message.image!.height;
    const imageSrc = message.image!.src;

    const imageCaption = message.image?.caption;

    const landscapeImageStyles =
        'max-w-[330px] max-h-[183px] md:max-w-[350px] md:max-h-[203px]';

    const portraitImageStyles =
        'max-w-[240px] max-h-[280px] md:max-w-[280px] md:max-h-[350px]';

    return (
        <div className="relative p-[3px] flex flex-col ">
            <div
                className={clsx(
                    'relative cursor-pointer',
                    imageWidth > imageHeight
                        ? landscapeImageStyles
                        : portraitImageStyles
                )}
            >
                <Image
                    src={imageSrc}
                    width={imageWidth}
                    height={imageHeight}
                    alt="message-image"
                    className={clsx(
                        'rounded-lg w-full h-full max-midPhones:object-cover ',
                        imageWidth > imageHeight
                            ? landscapeImageStyles
                            : portraitImageStyles
                    )}
                />
            </div>

            {imageCaption && (
                <p
                    className={clsx(
                        'px-2 text-[14px] pt-2.5 pb-3',
                        `w-[${imageWidth}]`,
                        imageWidth > imageHeight
                            ? 'max-w-[330px] md:max-w-[350px]'
                            : 'max-w-[240px] md:max-w-[260px]'
                    )}
                >
                    {imageCaption}
                </p>
            )}
            <div
                className={clsx(
                    'absolute flex gap-2',
                    imageCaption
                        ? 'right-2 bottom-0 text-gray-400'
                        : 'right-3 bottom-2'
                )}
            >
                <p className="text-base midPhones:text-lg">
                    {format(new Date(message.createdAt), 'p')}
                </p>
                {isOwn && (
                    <TbChecks
                        className={clsx(
                            'text-[1.7rem]',
                            seenList.length > 0
                                ? 'text-cyan-400'
                                : 'text-gray-400'
                        )}
                    />
                )}
            </div>
        </div>
    );
};

export default ImageText;
