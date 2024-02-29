export type WrapperProps = {
    children: React.ReactNode;
};
const PageWrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <aside
            className="
            bg-secondary
            min-w-[250px]
            w-full
            md:w-[45%] md:max-w-[480px]
            flex
            flex-col
            md:border-borderColor md:border-r"
        >
            {children}
        </aside>
    );
};

export default PageWrapper;
