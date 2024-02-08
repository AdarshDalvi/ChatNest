'use client';

import ChatScreenInput from './FormComponents/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';
import { useState } from 'react';
import ImageInputModal from '@/app/(home)/components/Modal/ImageInputModal';
import { Image as ImageInterface } from '@prisma/client';
import toast from 'react-hot-toast';

function Form() {
    const { chatId } = useConversation();

    const toastStyle = { color: 'white', backgroundColor: 'black' };
    const {
        handleSubmit: handleSubmitText,
        register: registerText,
        reset: resetText,
    } = useForm<FieldValues>();

    const {
        handleSubmit: handleSubmitImage,
        register: registerImage,
        reset: resetImageCaption,
    } = useForm<FieldValues>({ defaultValues: { caption: '' } });

    const [image, setImage] = useState<ImageInterface | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleTextInputSend: SubmitHandler<FieldValues> = (data) => {
        resetText();
        axios.post('/api/messages', { ...data, chatId });
    };

    const handleImageChange = async (file: File | null) => {
        if (!file) {
            toast.error('Something went wrong!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const image = new Image();
            image.onload = () => {
                setImage({
                    src: reader.result as string,
                    caption: null,
                    width: image.width,
                    height: image.height,
                });
                setImageFile(file);
            };
            image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const createSecureUrl = async () => {
        try {
            const formData = new FormData();
            formData.append('file', imageFile!);
            formData.append('upload_preset', 'image_message_upload');
            const res = await axios.post(
                `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData
            );
            return res.data.secure_url;
        } catch (error: any) {
            return null;
        }
    };

    const handleImageSend: SubmitHandler<FieldValues> = async (data: any) => {
        resetImageCaption();
        setLoading(true);
        const loadingToast = toast.loading('Sending image...', {
            position: 'bottom-center',
            style: toastStyle,
        });

        try {
            const secureUrl = await createSecureUrl();
            if (secureUrl !== null) {
                const res = await axios.post(`/api/messages`, {
                    image: { ...image, src: secureUrl, caption: data.caption },
                    chatId,
                });
                toast.dismiss(loadingToast);
                toast.success('Image sent!');
                setImage(null);
                setImageFile(null);
            } else {
                throw new Error('Unable to upload image');
            }
        } catch (error) {
            toast.dismiss(loadingToast);
            toast.error('Something went wrong!', {
                position: 'bottom-center',
                style: toastStyle,
            });
        } finally {
            setLoading(false);
        }
    };

    const cancelImageInput = () => {
        setImage(null);
        setImageFile(null);
    };

    return (
        <>
            {image && (
                <ImageInputModal
                    image={image}
                    cancelImageSend={cancelImageInput}
                    register={registerImage}
                    sendImageMessage={handleSubmitImage(handleImageSend)}
                    loading={loading}
                />
            )}
            <form
                onSubmit={handleSubmitText(handleTextInputSend)}
                className="w-full pb-3 px-2 flex flex-col gap-2 relative"
            >
                <ChatScreenInput
                    id="message"
                    register={registerText}
                    handleImageChange={handleImageChange}
                />
            </form>
        </>
    );
}

export default Form;
