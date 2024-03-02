import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ModalDialgRef } from '../(newhome)/components/WrapperComponents/ModalWrapper';

const useImageUpdate = () => {
    const [editedImage, setEditedImage] = useState<string | null>(null);
    const imageModalRef = useRef<ModalDialgRef>(null);

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
                if (imageModalRef.current) {
                    imageModalRef.current.openModal();
                }
            };
            image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const cancelUpdate = () => {
        setEditedImage(null);
        if (imageModalRef.current) {
            imageModalRef.current.closeModal();
        }
    };

    return {
        editedImage,
        handleImageChange,
        cancelUpdate,
        imageModalRef,
    };
};

export default useImageUpdate;
