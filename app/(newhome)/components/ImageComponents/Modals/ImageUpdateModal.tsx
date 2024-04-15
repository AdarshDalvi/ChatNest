'use client';

import React, {
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useState,
} from 'react';

import ModalWrapper, {
    ModalDialgRef,
} from '../../WrapperComponents/ModalWrapper';

import Cropper, { Area } from 'react-easy-crop';

import { FaPlus } from 'react-icons/fa6';
import { FaMinus } from 'react-icons/fa';
import { MdOutlineRotate90DegreesCcw } from 'react-icons/md';

import getCroppedImg from '@/app/lib/imageCrop';
import toast from 'react-hot-toast';

type ImageUpdateModalProps = {
    imageModalRef: RefObject<ModalDialgRef>;
    cancelImageUpdate: () => void;
    image: string | null;
    fallbackImage: string;
    setImage: Dispatch<SetStateAction<string | null>>;
};

const ImageUpdateModal: React.FC<ImageUpdateModalProps> = ({
    imageModalRef,
    cancelImageUpdate,
    image,
    fallbackImage,
    setImage,
}) => {
    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1.8);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(
        null
    );
    const [rotation, setRotation] = useState<number>(0);
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
        try {
            const croppedImageBase64 = await getCroppedImg(
                image!,
                croppedAreaPixels!,
                rotation
            );
            if (croppedImageBase64) {
                setImage(croppedImageBase64);
            }
        } catch (error: any) {
            toast.error('Something went wrong', { position: 'bottom-center' });
            console.error('Error saving cropped image:', error);
        } finally {
            setLoading(false);
            cancelImageUpdate();
        }
    }, [croppedAreaPixels, rotation]);

    return (
        <ModalWrapper
            ref={imageModalRef}
            clickOutsideToClose
            clickOutsideToCloseFunction={cancelImageUpdate}
            animation={false}
        >
            <div className="flex flex-col items-center w-[95%] midPhones:max-w-[450px] bg-secondary rounded-md">
                <div className="w-full text-2xl md:text-3xl py-5 px-4">
                    Drag the image to adjust
                </div>
                <div className="w-full relative h-dvh max-h-[350px]">
                    <Cropper
                        style={{
                            containerStyle: {
                                position: 'absolute',
                                top: '0',
                                width: '100%',
                                height: '100%',
                                overflow: 'hidden',
                                backgroundColor: '#030712',
                            },
                        }}
                        aspect={1}
                        crop={crop}
                        zoom={zoom}
                        image={image || fallbackImage}
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
                        >
                            <FaPlus />
                        </button>
                        <button
                            type="button"
                            className="py-4 px-3"
                            onClick={decreaseZoom}
                        >
                            <FaMinus />
                        </button>
                    </div>
                </div>
                <div className="flex w-full justify-between px-4 py-5 bg-secondary text-2xl rounded-b-md shadow-[0px_5px_20px_0px_#00000024]">
                    <button
                        type="button"
                        className="px-4 select-none"
                        onClick={cancelImageUpdate}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        className="text-4xl select-none"
                        onClick={rotateImage}
                        disabled={loading}
                    >
                        <MdOutlineRotate90DegreesCcw />
                    </button>
                    <button
                        type="button"
                        className="px-4 select-none"
                        onClick={saveCroppedImage}
                        disabled={loading}
                    >
                        Done
                    </button>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ImageUpdateModal;
