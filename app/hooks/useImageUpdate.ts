import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { ModalDialgRef } from '../(newhome)/components/WrapperComponents/ModalWrapper';

const useImageUpdate = () => {
    const [inputImage, setInputImage] = useState<string | null>(null);
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
                setInputImage(image.src);
                if (imageModalRef.current) {
                    imageModalRef.current.openModal();
                }
            };
            image.src = reader.result as string;
        };
        reader.readAsDataURL(file);
    };

    const cancelUpdate = () => {
        setInputImage(null);
        if (imageModalRef.current) {
            imageModalRef.current.closeModal();
        }
    };

    return {
        inputImage,
        handleImageChange,
        cancelUpdate,
        imageModalRef,
    };
};

export default useImageUpdate;
