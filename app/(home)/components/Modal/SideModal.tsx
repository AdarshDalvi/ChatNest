import { IconType } from 'react-icons';
import clsx from 'clsx';
import './Modal.scss';

type ModalOrigin = 'origin-right' | 'origin-left';

interface SideModalProps {
    modalHeading: string;
    modalOrigin: ModalOrigin;
    showSideModal: boolean;
    setShowSideModal: () => void;
    icon: IconType;
    iconLeft?: boolean;
    isOpen?: boolean;
    children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({
    modalHeading,
    showSideModal,
    modalOrigin,
    setShowSideModal,
    icon: Icon,
    iconLeft,
    isOpen,
    children,
}) => {
    if (!showSideModal) {
        return null;
    }

    return (
        <aside
            id={`side-modal-${modalOrigin}`}
            className={clsx(
                modalOrigin === 'origin-left'
                    ? `absolute
                w-full    
                md:w-[45%]
                md:max-w-[480px]
                md:border-r 
                md:border-r-borderColor`
                    : `
                fixed
                w-full
                md:absolute
                `,
                `flex
                min-w-[250px]
                h-dvh
                max-h-dvh
                text-white
                flex-col
                z-40`,
                isOpen && 'max-md:hidden'
            )}
        >
            <header className="flex w-full items-center px-6 midPhones:px-8 gap-8 py-[1.86rem] bg-primary">
                <Icon
                    className={clsx(
                        'text-3xl midPhones:text-4xl  font-medium cursor-pointer',
                        iconLeft && 'order-3 justify-self-end ml-auto '
                    )}
                    onClick={setShowSideModal}
                />
                <h3 className="text-2xl midPhones:text-[1.7rem]">
                    {modalHeading}
                </h3>
            </header>
            {children}
        </aside>
    );
};

export default SideModal;
