'use client';

import ChatScreenInput from './FormComponents/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';
import { useState } from 'react';
import useModalDialog from '@/app/hooks/useModalDialog';
import Modal from '@/app/(home)/components/Modal/Modal';
import ImageInputModal from '@/app/(home)/components/Modal/ImageInputModal';

function Form() {
    const { chatId } = useConversation();
    const { handleSubmit, register, reset } = useForm<FieldValues>();

    const [imageInput, setImageInput] = useState<string | null>(null);
    const { openDialog, modalDialogRef, closeDialog } = useModalDialog();

    const handleTextInputSend: SubmitHandler<FieldValues> = (data) => {
        reset();
        axios.post('/api/messages', {
            ...data,
            chatId,
        });
    };

    const cancelImageInput = () => {
        setImageInput((prevInput) => null);
    };

    const handleImageChange = (file: File | null) => {
        console.log(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageInput(reader.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImageInput(null);
        }
    };

    const handleImageSend = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            chatId,
        });
    };

    return (
        <>
            {imageInput !== null && (
                <ImageInputModal
                    imageSrc={imageInput}
                    cancelImageSend={cancelImageInput}
                    register={register}
                />
            )}
            <form
                onSubmit={handleSubmit(handleTextInputSend)}
                className={`
                    w-full
                    pb-3
                    px-2
                    flex
                    flex-col
                    gap-2
                    relative
                `}
            >
                <ChatScreenInput
                    id="message"
                    register={register}
                    handleImageChange={handleImageChange}
                    handleImageSend={handleImageSend}
                />
            </form>
        </>
    );
}

export default Form;
