import { Ref, forwardRef, useImperativeHandle, useRef } from 'react';

interface ModalProps {
    children: React.ReactNode;
}

export interface ModalDialgRef {
    open: () => void;
    close: () => void;
}

const Modal = ({ children }: ModalProps, ref: Ref<ModalDialgRef>) => {
    const modalDialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, () => {
        return {
            open: () => modalDialogRef.current?.showModal(),
            close: () => modalDialogRef.current?.close(),
        };
    });

    return (
        <dialog
            ref={modalDialogRef}
            className="backdrop:bg-black/60 bg-transparent outline-none"
        >
            {children}
        </dialog>
    );
};

export default forwardRef(Modal);
