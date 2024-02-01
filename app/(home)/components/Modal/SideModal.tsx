import { IconType } from 'react-icons';
import clsx from 'clsx';

type ModalOrigin = 'origin-right' | 'origin-left';

interface SideModalProps {
    modalHeading: string;
    modalOrigin: ModalOrigin;
    showSideModal: boolean;
    setShowSideModal: () => void;
    icon: IconType;
    isOpen?: boolean;
    children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({
    modalHeading,
    showSideModal,
    modalOrigin,
    setShowSideModal,
    icon: Icon,
    isOpen,
    children,
}) => {
    return (
        <aside
            id="side-modal"
            className={clsx(
                modalOrigin === 'origin-left'
                    ? `absolute
                w-full    
                md:w-[45%]
                md:max-w-[480px]
                border-r
                border-r-borderColor `
                    : `
                fixed
                w-full
                md:absolute
                `,
                `flex
                min-w-[250px]
                h-screen
                text-white
                flex-col
                scale-x-0
                transition-transform
                ease-in
                z-40`,
                modalOrigin,
                showSideModal && 'scale-x-100',
                isOpen && 'max-md:hidden'
            )}
        >
            <header className="flex w-full items-center px-6 midPhones:px-8 gap-8 py-[1.86rem] bg-primary">
                <Icon
                    className="text-3xl midPhones:text-4xl  font-medium cursor-pointer"
                    onClick={setShowSideModal}
                />
                <h3 className="text-2xl midPhones:text-3xl">{modalHeading}</h3>
            </header>
            <div className="flex-1 flex flex-col bg-secondary overflow-y-auto items-center py-12">
                {children}
            </div>
        </aside>
    );
};

export default SideModal;
