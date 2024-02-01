import { FiAlertTriangle } from 'react-icons/fi';

interface ConfirmationDialogProps {
    modalHeading: string;
    modalMessage: string;
    confirmAction: () => void;
    closeModal: () => void;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    modalHeading,
    modalMessage,
    confirmAction,
    closeModal,
}) => {
    return (
        <div className="flex flex-col bg-cardHoverColor text-white px-8 py-8 max-w-[400px] rounded-md">
            <div className="flex gap-6">
                <FiAlertTriangle className="text-red-500 text-4xl" />
                <div className="flex flex-col gap-2 mt-1">
                    <p className="text-2xl font-semibold">{modalHeading}</p>
                    <p className="text-gray-200 text-base midPhones:text-xl">
                        {modalMessage}
                    </p>
                </div>
            </div>
            <div className="self-end mt-4">
                <button
                    className="px-8 py-2  font-medium midPhones:text-lg hover:opacity-85"
                    onClick={closeModal}
                >
                    Cancel
                </button>
                <button
                    className="px-8 py-2 font-medium midPhones:text-lg bg-red-500 hover:opacity-85"
                    onClick={confirmAction}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
