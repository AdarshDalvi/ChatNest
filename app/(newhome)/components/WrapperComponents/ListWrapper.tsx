import { WrapperProps } from './PageWrapper';

interface ListWrapperProps extends WrapperProps {
    height?: string | number;
}

const ListWrapper: React.FC<ListWrapperProps> = ({ children, height }) => {
    return (
        <div
            className="flex flex-col gap-6 py-4 overflow-y-auto"
            style={{ height: height }}
        >
            {children}
        </div>
    );
};

export default ListWrapper;
