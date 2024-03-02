import { WrapperProps } from '../WrapperComponents/PageWrapper';

interface DrawerChildrenWrapper extends WrapperProps {
    handleSubmit?: () => void;
}

const DrawerChildrenWrapper: React.FC<DrawerChildrenWrapper> = ({
    children,
    handleSubmit,
}) => {
    if (handleSubmit) {
        return (
            <form
                onSubmit={handleSubmit}
                className="flex-1 w-full bg-secondary py-4 flex flex-col overflow-y-auto gap-4 items-center relative"
                style={{ scrollbarGutter: 'stable' }}
            >
                {children}
            </form>
        );
    }

    return (
        <div
            className="flex-1 w-full bg-secondary py-4 flex flex-col overflow-y-auto gap-4 items-center relative"
            style={{ scrollbarGutter: 'stable' }}
        >
            {children}
        </div>
    );
};

export default DrawerChildrenWrapper;
