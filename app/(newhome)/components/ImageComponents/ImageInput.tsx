import { CSSProperties, useRef } from 'react';

type ImageInputProps = {
    afterChangeFunction: (file: File | null) => void;
    children: React.ReactNode;
    buttonClassNames?: string;
    buttonStyle?: CSSProperties;
};

const ImageInput = ({
    afterChangeFunction,
    children,
    buttonClassNames,
    buttonStyle,
}: ImageInputProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const triggerInputChange = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };

    return (
        <>
            <input
                ref={inputRef}
                type="file"
                accept="image/png, image/jpeg, image/jpg, image/webp"
                multiple={false}
                className="hidden"
                onChange={(event) => {
                    const file = event.target.files?.[0] || null;
                    event.target.value = '';
                    afterChangeFunction(file);
                }}
            />
            <button
                type="button"
                onClick={triggerInputChange}
                className={buttonClassNames}
                style={buttonStyle}
            >
                {children}
            </button>
        </>
    );
};

export default ImageInput;
