interface ListWrapperProps {
    children: React.ReactNode;
}
const ListWrapper: React.FC<ListWrapperProps> = ({ children }) => {
    return (
        <div
            className="
                h-full 
                w-full
                flex 
                flex-col 
                py-4 
                gap-6"
        >
            {children}
        </div>
    );
};

export default ListWrapper;
