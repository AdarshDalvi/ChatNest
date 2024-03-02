import { Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type NoClickOutSideToCloseModalProps = {
    children: React.ReactNode;
    clickOutSideToClose?: never;
};

type ClickOutsideToCloseModalProps = {
    children: React.ReactNode;
    clickOutsideToClose: true;
    clickOutsideToCloseFunction: () => void;
};

type ModalProps =
    | NoClickOutSideToCloseModalProps
    | ClickOutsideToCloseModalProps;

export interface ModalDialgRef {
    openModal: () => void;
    closeModal: () => void;
}

const ModalWrapper = (
    { children, ...props }: ModalProps,
    ref: Ref<ModalDialgRef>
) => {
    const modalDialogRef = useRef<HTMLDialogElement>(null);
    const { clickOutsideToCloseFunction, clickOutsideToClose } =
        props as ClickOutsideToCloseModalProps;

    useImperativeHandle(ref, () => {
        return {
            openModal: () => modalDialogRef.current?.showModal(),
            closeModal: () => modalDialogRef.current?.close(),
        };
    });

    useEffect(() => {
        if (modalDialogRef.current && clickOutsideToClose) {
            const dialogElement = modalDialogRef.current;
            const closeDialog = (event: MouseEvent) => {
                if (event.target === dialogElement) {
                    dialogElement.close();
                    clickOutsideToCloseFunction();
                }
            };

            dialogElement.addEventListener('click', closeDialog);

            return () => {
                dialogElement.removeEventListener('click', closeDialog);
            };
        }
    }, []);

    return (
        <dialog
            id="modal-wrapper"
            ref={modalDialogRef}
            className="backdrop:bg-black/60 bg-transparent outline-none text-white"
        >
            {children}
        </dialog>
    );
};

export default forwardRef(ModalWrapper);
