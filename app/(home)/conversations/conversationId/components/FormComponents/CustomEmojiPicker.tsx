import EmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react';

interface CustomEmojiPickerProps {
    handleEmojiInput: (emojiData: EmojiClickData) => void;
}

const CustomEmojiPicker: React.FC<CustomEmojiPickerProps> = ({
    handleEmojiInput,
}) => (
    <div
        id="emoji-picker"
        className={`
            relative
            w-full 
            h-[270px] 
            midPhones:h-[300px]
            z-40`}
    >
        <EmojiPicker
            className={`picker`}
            searchDisabled
            lazyLoadEmojis
            onEmojiClick={(emojiData: EmojiClickData) =>
                handleEmojiInput(emojiData)
            }
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
);

export default CustomEmojiPicker;
