import { useState, useCallback } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdOutlineRotate90DegreesCcw } from 'react-icons/md';
import getCroppedImg from '../../../lib/imageCrop';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import createSecureUrl from '@/app/lib/secureUrl';

type ImageUpdateModalProps = {
    imageId: string;
    image: string | null;
    cancelUpdate: () => void;
    setValue: UseFormSetValue<FieldValues>;
};

const ImageUpdateModal: React.FC<ImageUpdateModalProps> = ({
    imageId,
    image,
    cancelUpdate,
    setValue,
}) => {
    if (image === null) {
        return null;
    }

    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1.8);
    const [rotation, setRotation] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null
    );

    const [loading, setLoading] = useState(false);

    const onCropComplete = useCallback(
        (croppedArea: Area, croppedAreaPixelsCustom: Area) => {
            setCroppedAreaPixels(croppedAreaPixelsCustom);
        },
        [croppedAreaPixels]
    );

    const increaseZoom = useCallback(() => {
        if (zoom < 3) setZoom((prevZoom) => prevZoom + 0.1);
    }, [zoom]);

    const decreaseZoom = useCallback(() => {
        if (zoom > 1) setZoom((prevZoom) => prevZoom - 0.1);
    }, [zoom]);

    const rotateImage = useCallback(() => {
        setRotation((prevRotation) => (prevRotation + 90) % 360);
    }, []);

    const saveCroppedImage = useCallback(async () => {
        setLoading(true);
        const loadingToast = toast.loading('Updating image...', {
            position: 'bottom-center',
        });
        try {
            const croppedImageBase64 = await getCroppedImg(
                image,
                croppedAreaPixels!,
                rotation
            );
            if (croppedImageBase64) {
                toast.dismiss(loadingToast);
                toast.success('Image updated!', {
                    position: 'bottom-center',
                    duration: 3000,
                });
                setValue(imageId, croppedImageBase64);
                // const secure_url = await createSecureUrl(croppedImageBase64);
                // toast.dismiss(loadingToast);
                // if (secure_url) {
                //     toast.success('Image updated!', {
                //         position: 'bottom-center',
                //         duration: 3000,
                //     });
                //     setValue(imageId, secure_url);
                // }
            }
        } catch (error: any) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong', { position: 'bottom-center' });
            console.error('Error saving cropped image:', error);
        } finally {
            setLoading(false);
            cancelUpdate();
        }
    }, [image, croppedAreaPixels, rotation]);

    const disabledClasses = 'pointer-events-none cursor-not-allowed';

    return (
        <div
            id="image-update"
            className="fixed top-0 left-0 flex flex-col min-w-[250px] w-screen h-dvh bg-gray-950/75 z-20 items-center justify-center text-white"
        >
            <div className="flex-1 flex flex-col justify-center ">
                <div className="flex items-center py-5 px-4 gap-2 bg-secondary rounded-t-md shadow-[0px_-5px_20px_0px_#00000024]">
                    <p className="text-3xl">Drag the image to adjust</p>
                </div>
                <div className="flex-1 relative min-w-[250px] w-[95vw] midPhones:max-w-[450px] max-h-[350px] shadow-[-5px_0px_20px_0px_#00000024, 5px_0px_20px_0px_#00000024]">
                    <Cropper
                        classes={{
                            containerClassName: clsx(
                                'relative w-full bg-gray-950 ',
                                loading && disabledClasses
                            ),
                            cropAreaClassName: loading ? disabledClasses : '',
                            mediaClassName: loading ? disabledClasses : '',
                        }}
                        aspect={1}
                        crop={crop}
                        zoom={zoom}
                        image={image}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        rotation={rotation}
                        onRotationChange={setRotation}
                        zoomWithScroll={!loading}
                    />
                    <div className="absolute right-5 bottom-6 flex flex-col bg-secondary text-2xl ring-inset ring-1 ring-gray-400">
                        <button
                            type="button"
                            className="py-4 px-3 border-b-[0.5px] border-b-white"
                            onClick={increaseZoom}
                            disabled={loading}
                        >
                            <FaPlus />
                        </button>
                        <button
                            type="button"
                            className="py-4 px-3"
                            onClick={decreaseZoom}
                            disabled={loading}
                        >
                            <FaMinus />
                        </button>
                    </div>
                </div>
                <div className="flex justify-between px-4 py-5 bg-secondary text-2xl rounded-b-md shadow-[0px_5px_20px_0px_#00000024]">
                    <button
                        type="button"
                        className="px-4"
                        onClick={cancelUpdate}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="text-4xl"
                        onClick={rotateImage}
                        disabled={loading}
                    >
                        <MdOutlineRotate90DegreesCcw />
                    </button>
                    <button
                        type="button"
                        className="px-4"
                        onClick={saveCroppedImage}
                        disabled={loading}
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpdateModal;
