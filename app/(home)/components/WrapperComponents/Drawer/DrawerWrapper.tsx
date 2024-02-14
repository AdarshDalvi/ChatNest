import { IconType } from 'react-icons';
import clsx from 'clsx';
import './DrawerWrapper.scss';
import useConversation from '@/app/hooks/useConversation';

type DrawerOrigin = 'origin-right' | 'origin-left';

interface DrawerWrapperProps {
    drawerHeading: string;
    drawerOrigin: DrawerOrigin;
    showDrawer: boolean;
    closeDrawer: () => void;
    icon: IconType;
    iconRight?: boolean;
    children: React.ReactNode;
}

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
    drawerHeading,
    showDrawer,
    drawerOrigin,
    closeDrawer,
    icon: Icon,
    iconRight,
    children,
}) => {
    const { isOpen } = useConversation();
    if (!showDrawer) {
        return null;
    }

    return (
        <aside
            id={`side-drawer-${drawerOrigin}`}
            className={clsx(
                drawerOrigin === 'origin-left'
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
                        iconRight && 'order-3 justify-self-end ml-auto '
                    )}
                    onClick={closeDrawer}
                />
                <h3 className="text-2xl midPhones:text-[1.7rem]">
                    {drawerHeading}
                </h3>
            </header>
            {children}
        </aside>
    );
};

export default DrawerWrapper;
