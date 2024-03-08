import ImageViewModal from '@/app/(newhome)/components/ImageComponents/Modals/ImageViewModal';
import useModalDialog from '@/app/hooks/useModalDialog';
import Image from 'next/image';
import toast from 'react-hot-toast';

export type FallbackImage = '/user.png' | '/group.png';
type ViewOnlyImageProps = {
    imageSrc: string | null;
    fallbackImage: FallbackImage;
    isGroup?: true;
};
const ViewOnlyImage: React.FC<ViewOnlyImageProps> = ({
    imageSrc,
    fallbackImage,
    isGroup,
}) => {
    const img = imageSrc || fallbackImage;

    const handleImageClick = () => {
        toast.dismiss();
        if (img === '/user.png' || img === '/group.png') {
            if (isGroup) {
                toast(`No group icon to display`, {
                    position: 'bottom-center',
                });
            } else {
                toast(`No profile picture to display`, {
                    position: 'bottom-center',
                });
            }
        } else {
            openDialog();
        }
    };

    const { modalDialogRef, openDialog, closeDialog } = useModalDialog();
    return (
        <>
            <ImageViewModal
                image={img}
                imageModalRef={modalDialogRef}
                closeModal={closeDialog}
            />
            <div
                className="w-[40%] select-none relative rounded-full max-w-[200px] mt-4 bg-gray-300 cursor-pointer"
                onClick={handleImageClick}
            >
                <Image
                    alt="icon"
                    src={img}
                    width={200}
                    height={200}
                    quality={85}
                    className="w-full h-full rounded-full object-cover aspect-square"
                />
            </div>
        </>
    );
};

export default ViewOnlyImage;
