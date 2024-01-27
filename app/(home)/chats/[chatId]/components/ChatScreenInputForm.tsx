'use client';

import clsx from 'clsx';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ChatScreenInput from './ChatScreenInput';

function ChatScreenInputForm() {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const { setValue, handleSubmit, control } = useForm();

    const handleEmojiModal = () => {
        setShowEmojiPicker((prevShowEmojiPicker) => !prevShowEmojiPicker);
    };
    const handleTextInputSend = (data: any) => {
        console.log(data);
    };
    return (
        <form
            onSubmit={handleSubmit(handleTextInputSend)}
            className={clsx(
                `
                w-full 
                flex 
                pb-4 
                px-2 
                midPhones:px-3 
                items-center 
                gap-1.5 
                midPhones:gap-2
                z-10
                text-white 
                relative`
            )}
        >
            <ChatScreenInput
                id="chat-input-box"
                showEmojiPicker={showEmojiPicker}
                handleEmojiModal={handleEmojiModal}
                // register={register}
                setValue={setValue}
                control={control}
                // watchForm={watch}
            />
        </form>
    );
}

export default ChatScreenInputForm;
