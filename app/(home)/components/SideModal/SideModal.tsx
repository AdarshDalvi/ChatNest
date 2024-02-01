import { IconType } from 'react-icons';
import './SideModal.scss';
import clsx from 'clsx';

type ModalOrigin = 'origin-right' | 'origin-left';

interface SideModalProps {
    modalHeading: string;
    modalOrigin: ModalOrigin;
    showSideModal: boolean;
    setShowSideModal: () => void;
    icon: IconType;
    children: React.ReactNode;
}

const SideModal: React.FC<SideModalProps> = ({
    modalHeading,
    showSideModal,
    modalOrigin,
    setShowSideModal,
    icon: Icon,
    children,
}) => {
    return (
        <aside
            id="side-modal"
            className={clsx(
                `
                min-w-[250px]
                text-white
                fixed
                min-h-screen
                w-full
                md:absolute
                bg-red-200
                flex
                flex-col
                scale-x-0
                transition-transform
                ease-in
                z-50`,
                modalOrigin,
                showSideModal && 'scale-x-100'
            )}
        >
            <header className="flex w-full items-center px-6 midPhones:px-8 gap-8 py-8 bg-primary">
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
