import { RefObject } from 'react';
import ModalWrapper, {
    ModalDialgRef,
} from '../../WrapperComponents/ModalWrapper';
import Image from 'next/image';
import { MdClear } from 'react-icons/md';

type ImageViewModalProps = {
    image: string;
    imageModalRef: RefObject<ModalDialgRef>;
    closeModal: () => void;
};

const ImageViewModal: React.FC<ImageViewModalProps> = ({
    image,
    imageModalRef,
    closeModal,
}) => {
    return (
        <ModalWrapper ref={imageModalRef} clickOutsideToClose>
            <button
                type="button"
                onClick={closeModal}
                className="absolute right-[6%] md:right-[8%] top-[3%] text-4xl md:text-5xl"
            >
                <MdClear />
            </button>
            <Image
                src={image}
                alt="Profile Icon"
                width={500}
                height={700}
                quality={100}
                priority
            />
        </ModalWrapper>
    );
};

export default ImageViewModal;
