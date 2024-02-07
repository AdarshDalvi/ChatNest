'use client';

import { InputHTMLAttributes, useEffect, useRef } from 'react';
import { FieldValues, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface MultilineInputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    register: UseFormRegister<FieldValues>;
    placeHolder: string;
    validationSchema?: RegisterOptions<FieldValues, string> | undefined;
    maxHeight?: number;
    maxLength?: number;
    shouldReset?: boolean;
    className?: string | undefined;
}

const MultilineInput: React.FC<MultilineInputProps> = ({
    id,
    register,
    placeHolder,
    maxLength,
    validationSchema = {},
    maxHeight,
    className,
    shouldReset,
    ...rest
}) => {
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { ref, ...registerMethod } = register(id, validationSchema);

    useEffect(() => {
        function autoSize() {
            const currentField = textAreaRef.current;
            if (currentField) {
                currentField.style.height = 'auto'; // Reset the height to auto
                currentField.style.height =
                    Math.min(currentField.scrollHeight, maxHeight ?? 100) +
                    'px'; // Set max height to 100px if no maxHeight is provided
                currentField.style.overflowY =
                    currentField.scrollHeight > 100 ? 'scroll' : 'hidden'; // Show scrollbar if content exceeds max height
            }
        }

        const handleDrop = (event: DragEvent) => {
            // Prevent default behavior to avoid dropping content into the div
            event.preventDefault();
        };

        const handleDragOver = (event: DragEvent) => {
            // Prevent default behavior to avoid dragging content over the div
            event.preventDefault();
        };

        const currentField = textAreaRef.current;

        if (currentField) {
            // Set initial rows
            currentField.rows = 1;

            // Add event listeners for input and change events
            currentField.addEventListener('input', autoSize);
            currentField.addEventListener('change', autoSize);
            currentField.addEventListener('drop', handleDrop);
            currentField.addEventListener('dragover', handleDragOver);

            // Cleanup function
            return () => {
                currentField.removeEventListener('input', autoSize);
                currentField.removeEventListener('change', autoSize);
                currentField.removeEventListener('drop', handleDrop);
                currentField.removeEventListener('dragover', handleDragOver);
            };
        }
    }, [maxHeight]);

    useEffect(() => {
        if (shouldReset && textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
        }
    }, [shouldReset, registerMethod]);

    return (
        <textarea
            id={id}
            {...registerMethod}
            ref={(e) => {
                ref(e);
                textAreaRef.current = e;
            }}
            rows={1}
            {...rest}
            maxLength={maxLength}
            placeholder={placeHolder}
            className={`resize-none outline-none overflow-y-hidden ${className}`}
        />
    );
};

export default MultilineInput;
