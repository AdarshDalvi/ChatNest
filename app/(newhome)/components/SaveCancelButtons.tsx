type SaveCancelButtonsProps = {
    cancelUpdate: () => void;
    saveUpdate: () => void;
};

const SaveCancelButtons: React.FC<SaveCancelButtonsProps> = ({
    cancelUpdate,
    saveUpdate,
}) => {
    return (
        <div className="flex w-full justify-center items-center mt-8 gap-8 text-xl md:text-2xl">
            <button
                type="button"
                className="px-6 py-2 hover:text-gray-200"
                onClick={cancelUpdate}
            >
                Cancel
            </button>
            <button
                type="button"
                className="px-7 py-2 rounded-md bg-primary transition-colors hover:bg-opacity-70 hover:text-gray-200"
                onClick={saveUpdate}
            >
                Save image
            </button>
        </div>
    );
};

export default SaveCancelButtons;
