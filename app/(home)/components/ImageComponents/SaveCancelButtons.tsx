type SaveCancelButtonsProps = {
    cancelUpdate: () => void;
    saveUpdate: () => void;
};

const SaveCancelButtons: React.FC<SaveCancelButtonsProps> = ({
    cancelUpdate,
    saveUpdate,
}) => {
    return (
        <div className="flex w-full justify-center mt-6 gap-4 text-2xl">
            <button type="button" className="px-6 py-2" onClick={cancelUpdate}>
                Cancel
            </button>
            <button type="button" className="px-6 py-2" onClick={saveUpdate}>
                Save
            </button>
        </div>
    );
};

export default SaveCancelButtons;
