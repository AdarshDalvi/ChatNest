'use client';

import EmojiPicker, { Theme } from 'emoji-picker-react';
import { FaImage } from 'react-icons/fa6';
import { MdSend } from 'react-icons/md';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { FaRegKeyboard } from 'react-icons/fa6';
import clsx from 'clsx';
import {
    Control,
    FieldValues,
    UseFormSetValue,
    useWatch,
} from 'react-hook-form';
import { FormEvent } from 'react';

interface ChatScreenInputProps {
    id: string;
    showEmojiPicker: boolean;
    handleEmojiModal: () => void;
    setValue: UseFormSetValue<FieldValues>;
    control: Control<FieldValues>;
}

const ChatScreenInput: React.FC<ChatScreenInputProps> = ({
    id,
    showEmojiPicker,
    handleEmojiModal,
    control,
    setValue,
}) => {
    const inputText = useWatch({
        control,
        name: id,
    });

    const handleEmojiInput = () => {};
    return (
        <>
            {showEmojiPicker && (
                <div
                    id="emoji-picker"
                    className={clsx(
                        `absolute 
                        w-full 
                        h-[270px] 
                        midPhones:h-[300px]
                        px-2 
                        midPhones:px-3 
                        left-0 
                        bottom-4 
                        z-40`
                    )}
                >
                    <EmojiPicker
                        className={clsx(`picker`)}
                        searchDisabled
                        lazyLoadEmojis
                        onEmojiClick={handleEmojiInput}
                        skinTonesDisabled
                        theme={Theme.DARK}
                        previewConfig={{
                            showPreview: false,
                        }}
                        style={{
                            height: '100%',
                            width: '100%',
                            backgroundColor: '#1B262C',
                        }}
                    />
                </div>
            )}
            <div
                className={clsx(
                    `
                  flex-1 
                  flex
                  items-center
                  px-3
                  midPhones:px-5
                  py-2.5
                  midPhones:py-3
                  relative
                  rounded-3xl
                  midPhones:rounded-[2rem]
                  text-xl
                  midPhones:text-2xl
                  bg-[#3c535e]`,
                    showEmojiPicker &&
                        `translate-y-[-274px] midPhones:translate-y-[-305px]`
                )}
            >
                {showEmojiPicker ? (
                    <FaRegKeyboard
                        onClick={handleEmojiModal}
                        className="
                            self-end
                            text-placeHolderColor 
                            text-3xl
                            midPhones:text-[2.5rem] 
                            cursor-pointer"
                    />
                ) : (
                    <MdOutlineEmojiEmotions
                        onClick={handleEmojiModal}
                        className="
                            self-end
                            text-placeHolderColor 
                            text-3xl
                            midPhones:text-[2.5rem] 
                            cursor-pointer"
                    />
                )}
                {!inputText && (
                    <div className="absolute left-[33px] midPhones:left-[45px] pointer-events-none text-placeHolderColor  truncate">
                        Type a message
                    </div>
                )}
                <div
                    id={id}
                    contentEditable
                    className="
                        flex-1
                        focus:outline-none
                        overflow-y-auto
                        max-h-40
                        ml-2.5
                        mr-1.5
                        pr-1
                        "
                    style={{
                        overflowWrap: 'anywhere',
                        scrollbarGutter: 'stable',
                    }}
                    onInput={(e: FormEvent<HTMLDivElement>) =>
                        setValue(
                            id,
                            (e.currentTarget as HTMLDivElement).innerText
                        )
                    }
                >
                    {/* Editable Text */}
                </div>
                <FaImage
                    className="
                        self-end
                        mb-0.5
                        midPhones:mb-1 
                        text-2xl
                        midPhones:text-3xl 
                        text-placeHolderColor"
                />
            </div>

            <button
                type="submit"
                className={clsx(
                    'bg-primary py-3.5 midPhones:py-3.5 pl-3.5 midPhones:pl-4 pr-3 midPhones:pr-3.5 rounded-full text-white self-end ',
                    showEmojiPicker &&
                        `translate-y-[-274px] midPhones:translate-y-[-305px]`
                )}
            >
                <MdSend className="text-2xl midPhones:text-4xl" />
            </button>
        </>
    );
};

export default ChatScreenInput;
