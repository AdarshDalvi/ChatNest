'use client';

import { FaImage } from 'react-icons/fa6';
import { useEffect, useRef, useState } from 'react';

import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';

import {
    useWatch,
    Control,
    FieldValues,
    UseFormSetValue,
} from 'react-hook-form';

import InputSubmitButton from './SubmitButton';

import { CldUploadButton } from 'next-cloudinary';

interface ChatScreenInputProps {
    id: string;
    control: Control<FieldValues>;
    setValue: UseFormSetValue<FieldValues>;
    handleImageSend: (result: any) => void;
}

const ChatScreenInput: React.FC<ChatScreenInputProps> = ({
    id,
    control,
    setValue,
    handleImageSend,
}) => {
    const message = useWatch({
        control,
        name: id,
        defaultValue: '',
    });

    const contentEditabeleRef = useRef<HTMLElement | null>(null);

    const handleChange = (event: ContentEditableEvent) => {
        const sanitizeConfig = {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
                a: ['href'],
            },
        };
        setValue(id, sanitizeHtml(event.target.value, sanitizeConfig));
    };

    useEffect(() => {
        const contentEditableDiv = contentEditabeleRef.current;

        if (contentEditableDiv) {
            contentEditableDiv.focus();
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
                    px-5
                    py-4
                    relative
                    rounded-[2.2rem]
                    text-2xl"
                >
                    <ContentEditable
                        id={id}
                        innerRef={contentEditabeleRef}
                        aria-placeholder="Type a message"
                        html={message}
                        onChange={handleChange}
                        autoFocus
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
                            // scrollbarGutter: 'stable',
                        }}
                    />
                    <CldUploadButton
                        className="
                           self-end
                           mb-0.5
                           midPhones:mb-1
                           text-3xl
                           text-placeHolderColor"
                        options={{
                            maxFiles: 1,
                            clientAllowedFormats: ['jpeg', 'jpg', 'png'],
                        }}
                        onUpload={handleImageSend}
                        uploadPreset="iuakprob"
                    >
                        <FaImage />
                    </CldUploadButton>
                </div>
                <InputSubmitButton />
            </main>
        </>
    );
};

export default ChatScreenInput;
