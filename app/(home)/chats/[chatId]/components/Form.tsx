'use client';

import ChatScreenInput from './FormComponents/Input';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import useConversation from '@/app/hooks/useConversation';

function Form() {
    const { chatId } = useConversation();
    const { control, setValue, handleSubmit, getValues } =
        useForm<FieldValues>();

    const handleTextInputSend: SubmitHandler<FieldValues> = (data) => {
        setValue('message', '');
        axios.post('/api/messages', {
            ...data,
            chatId,
        });
    };

    const handleImageSend = (result: any) => {
        axios.post('/api/messages', {
            image: result?.info?.secure_url,
            chatId,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(handleTextInputSend)}
            className={`
                w-full
                pb-4
                px-2
                flex
                flex-col
                gap-2
                relative
            `}
        >
            <ChatScreenInput
                id="message"
                control={control}
                setValue={setValue}
                getValues={getValues}
                handleImageSend={handleImageSend}
            />
        </form>
    );
}

export default Form;
