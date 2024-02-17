import { useState } from 'react';
import toast from 'react-hot-toast';

const useImageUpdate = () => {
    const [editedImage, setEditedImage] = useState<string | null>(null);

    const handleImageChange = async (file: File | null) => {
        if (!file) {
            toast.error('No image selected!');
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            const image = new Image();
            image.onload = () => {
                setEditedImage(image.src);
            };
            image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const cancelUpdate = () => {
        setEditedImage(null);
    };

    return {
        editedImage,
        handleImageChange,
        cancelUpdate,
    };
};

export default useImageUpdate;
