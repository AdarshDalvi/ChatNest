'use client';

import { EmojiClickData } from 'emoji-picker-react';

import { FaImage } from 'react-icons/fa6';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { FaRegKeyboard } from 'react-icons/fa6';

import { useEffect, useRef, useState } from 'react';

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

import {
    useWatch,
    Control,
    FieldValues,
    UseFormSetValue,
    UseFormGetValues,
} from 'react-hook-form';

import CustomEmojiPicker from './CustomEmojiPicker';
import InputSubmitButton from './SubmitButton';

import { CldUploadButton, CldUploadWidgetPropsOptions } from 'next-cloudinary';

interface ChatScreenInputProps {
    id: string;
    control: Control<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    handleImageSend: (result: any) => void;
}

const ChatScreenInput: React.FC<ChatScreenInputProps> = ({
    id,
    control,
    setValue,
    getValues,
    handleImageSend,
}) => {
    const message = useWatch({
        control,
        name: id,
        defaultValue: '',
    });

    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const contentEditabeleRef = useRef<HTMLElement | null>(null);

    const handleEmojiInput = (emojiData: EmojiClickData) => {
        let prevValue = getValues(id);
        if (!prevValue) {
            prevValue = '';
        }
        if (contentEditabeleRef.current) {
            contentEditabeleRef.current.focus();
        }
        const sanitizedEmoji = sanitizeHtml(emojiData.emoji, {
            allowedTags: [], // Specify the allowed tags based on your requirements
            allowedAttributes: {}, // Specify the allowed attributes based on your requirements
        });
        setValue(id, prevValue + sanitizedEmoji);
    };

    const handleChange = (event: ContentEditableEvent) => {
        const sanitizeConfig = {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
                a: ['href'],
            },
        };
        setValue(id, sanitizeHtml(event.target.value, sanitizeConfig));
    };

    const handleEmojiPopup = () => {
        setShowEmojiPicker((prevValue) => !prevValue);
    };

    useEffect(() => {
        const contentEditableDiv = contentEditabeleRef.current;

        if (contentEditableDiv) {
            const handleDrop = (event: DragEvent) => {
                // Prevent default behavior to avoid dropping content into the div
                event.preventDefault();
            };

            const handleDragOver = (event: DragEvent) => {
                // Prevent default behavior to avoid dragging content over the div
                event.preventDefault();
            };

            contentEditableDiv.addEventListener('drop', handleDrop);
            contentEditableDiv.addEventListener('dragover', handleDragOver);

            return () => {
                contentEditableDiv.removeEventListener('drop', handleDrop);
                contentEditableDiv.removeEventListener(
                    'dragover',
                    handleDragOver
                );
            };
        }
    }, [contentEditabeleRef]);

    return (
        <>
            <main
                className={`
                    flex
                    z-10
                    items-center
                    gap-1.5
                    midPhones:gap-2
                    text-white
                    `}
            >
                <div
                    className="
                    flex-1
                    flex
                    items-center
                    bg-[#3c535e]
                    px-3
                    midPhones:px-5
                    py-2.5
                    midPhones:py-3
                    relative
                    rounded-3xl
                    midPhones:rounded-[2rem]
                    text-xl
                    midPhones:text-2xl"
                >
                    {showEmojiPicker ? (
                        <FaRegKeyboard
                            onClick={handleEmojiPopup}
                            className="
                                self-end
                                text-placeHolderColor
                                text-3xl
                                midPhones:text-[2.5rem]
                                cursor-pointer"
                        />
                    ) : (
                        <MdOutlineEmojiEmotions
                            onClick={handleEmojiPopup}
                            className="
                                self-end
                                text-placeHolderColor
                                text-3xl
                                midPhones:text-[2.5rem]
                                cursor-pointer"
                        />
                    )}
                    <ContentEditable
                        id={id}
                        innerRef={contentEditabeleRef}
                        aria-placeholder="Type a message"
                        onChange={handleChange}
                        html={message}
                        className="
                            flex-1
                            ml-2.5
                            outline-none
                            max-h-40
                            overflow-y-auto
                            mr-1.5
                            pr-1
                            "
                        style={{
                            overflowWrap: 'anywhere',
                            scrollbarGutter: 'stable',
                        }}
                    />
                    <CldUploadButton
                        options={{
                            maxFiles: 1,
                            clientAllowedFormats: ['jpeg', 'jpg', 'png'],
                        }}
                        onUpload={handleImageSend}
                        uploadPreset="iuakprob"
                    >
                        <FaImage
                            className="
                            cursor-pointer
                            self-end
                            mb-0.5
                            midPhones:mb-1
                            text-2xl
                            midPhones:text-3xl
                            text-placeHolderColor"
                        />
                    </CldUploadButton>
                </div>
                <InputSubmitButton />
            </main>
            {showEmojiPicker && (
                <CustomEmojiPicker handleEmojiInput={handleEmojiInput} />
            )}
        </>
    );
};

export default ChatScreenInput;

/* <CldUploadButton
        options={{
            maxFiles: 1,
            clientAllowedFormats: ['jpeg', 'jpg', 'png', 'svg'],
        }}
        onUpload={handleImageSend}
        uploadPreset="iuakprob"
    > */
/* </CldUploadButton> */
