'use client';

import { FaImage } from 'react-icons/fa6';
import { FieldValues, UseFormRegister } from 'react-hook-form';

import InputSubmitButton from './SubmitButton';

import { CldUploadButton } from 'next-cloudinary';
import MultilineInput from '@/app/components/inputs/MultilineInput';

interface ChatScreenInputProps {
    id: string;
    handleImageChange: (file: File | null) => void;
    register: UseFormRegister<FieldValues>;
    handleImageSend: (result: any) => void;
}

const ChatScreenInput: React.FC<ChatScreenInputProps> = ({
    id,
    register,
    handleImageChange,
    handleImageSend,
}) => {
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
                    <MultilineInput
                        id={id}
                        validationSchema={{ required: true }}
                        placeHolder="Type a message"
                        register={register}
                        maxHeight={100}
                        shouldReset
                        style={{ scrollbarGutter: 'stable' }}
                        className="
                            bg-inherit
                            text-inherit
                            flex-1
                            mr-1.5
                            ml-2.5
                            pr-1"
                    />
                    <div
                        className="
                           self-end
                           mb-0.5
                           midPhones:mb-1
                           text-3xl
                           text-placeHolderColor"
                    >
                        <input
                            id="image-btn"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(event) => {
                                const file = event.target.files
                                    ? event.target.files[0]
                                    : null;
                                handleImageChange(file);
                            }}
                        />
                        <label htmlFor="image-btn" className="cursor-pointer">
                            <FaImage />
                        </label>
                    </div>
                </div>
                <InputSubmitButton />
            </main>
        </>
    );
};

export default ChatScreenInput;

// useEffect(() => {
//     const contentEditableDiv = contentEditabeleRef.current;

//     if (contentEditableDiv) {
//         contentEditableDiv.focus();
//         const handleDrop = (event: DragEvent) => {
//             // Prevent default behavior to avoid dropping content into the div
//             event.preventDefault();
//         };

//         const handleDragOver = (event: DragEvent) => {
//             // Prevent default behavior to avoid dragging content over the div
//             event.preventDefault();
//         };

//         contentEditableDiv.addEventListener('drop', handleDrop);
//         contentEditableDiv.addEventListener('dragover', handleDragOver);

//         return () => {
//             contentEditableDiv.removeEventListener('drop', handleDrop);
//             contentEditableDiv.removeEventListener(
//                 'dragover',
//                 handleDragOver
//             );
//         };
//     }
// }, [contentEditabeleRef]);

// const contentEditabeleRef = useRef<HTMLElement | null>(null);

// const handleChange = (event: ContentEditableEvent) => {
//     const sanitizeConfig = {
//         allowedTags: ['b', 'i', 'em', 'strong', 'a'],
//         allowedAttributes: {
//             a: ['href'],
//         },
//     };
//     setValue(id, sanitizeHtml(event.target.value, sanitizeConfig));
// };

/* <ContentEditable
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
        }}
    /> */
