import { IconType } from 'react-icons';
import { WrapperProps } from '../WrapperComponents/PageWrapper';
import './Drawer.scss';
import clsx from 'clsx';

type DrawerOrigin = 'origin-right' | 'origin-left';

interface DrawerProps extends WrapperProps {
    drawerHeading: string;
    drawerOrigin: DrawerOrigin;
    showDrawer: boolean;
    closeDrawer: () => void;
    icon: IconType;
    iconRight?: boolean;
    subHeading?: string;
    disabled: boolean;
}

const Drawer: React.FC<DrawerProps> = ({
    children,
    drawerOrigin,
    drawerHeading,
    subHeading,
    showDrawer,
    closeDrawer,
    icon: Icon,
    iconRight,
    disabled,
}) => {
    if (!showDrawer) {
        return null;
    }
    return (
        <aside
            id={`side-drawer-${drawerOrigin}`}
            className={clsx(
                'z-20 absolute w-full flex flex-col h-dvh min-w-[250px]',
                drawerOrigin === 'origin-left' &&
                    'md:w-[45%] md:max-w-[480px] md:border-r md:border-r-borderColor'
            )}
        >
            <header className="flex w-full items-center px-6 midPhones:px-8 gap-8 py-[1.86rem] bg-primary">
                <button
                    disabled={disabled}
                    type="button"
                    className={clsx(
                        'text-3xl midPhones:text-4xl  font-medium',
                        iconRight && 'order-3 justify-self-end ml-auto ',
                        disabled && 'cursor-not-allowed'
                    )}
                    onClick={closeDrawer}
                >
                    <Icon />
                </button>
                <div className="flex flex-col gap-1">
                    <h3 className="text-2xl midPhones:text-[1.8rem]">
                        {drawerHeading}
                    </h3>
                    {subHeading && (
                        <h6 className="text-xl text-gray-100">{subHeading}</h6>
                    )}
                </div>
            </header>
            {children}
        </aside>
    );
};

export default Drawer;
