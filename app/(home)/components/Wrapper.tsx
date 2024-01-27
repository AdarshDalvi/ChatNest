interface WrapperProps {
    children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <aside
            className="
            w-full 
            h-listHeight 
            mt-[93.5px] 
            md:w-[45%]
            md:max-w-[480px] 
            bg-secondary  
            md:border-borderColor
            md:border-r"
        >
            {children}
        </aside>
    );
};

export default Wrapper;
