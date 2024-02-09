import clsx from 'clsx';

interface InfoWrapperProps {
    children: React.ReactNode;
    className?: string;
}

const InfoWrapper: React.FC<InfoWrapperProps> = ({ children, className }) => {
    return (
        <div
            className={clsx(
                'flex-1 flex flex-col overflow-y-auto bg-secondary items-center py-12',
                className
            )}
        >
            {children}
        </div>
    );
};

export default InfoWrapper;
