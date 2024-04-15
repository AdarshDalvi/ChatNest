const NoResultsFound = ({ noResultText }: { noResultText: string }) => {
    return (
        <div className="flex w-full h-full items-center justify-center text-xl">
            {noResultText}
        </div>
    );
};

export default NoResultsFound;
