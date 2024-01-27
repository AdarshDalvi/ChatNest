interface ListWrapperProps {
    children: React.ReactNode;
}
const ListWrapper: React.FC<ListWrapperProps> = ({ children }) => {
    return (
        <div
            id="list-wrapper"
            className="flex flex-col w-full h-listHeight py-4 gap-6"
        >
            {children}
        </div>
    );
};

export default ListWrapper;
