interface PageWrapperProps {
    children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
    return (
        <aside
            className="
                text-white
                h-listHeightSmall
                midPhones:h-listHeight
                w-full
                mt-listMarginSmall
                midPhones:mt-listMargin
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

export default PageWrapper;
