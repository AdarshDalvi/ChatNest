import { Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

type NoClickOutSideToCloseModalProps = {
    children: React.ReactNode;
    animation?: boolean;
    clickOutSideToClose?: never;
};

type ClickOutsideToCloseModalProps = {
    children: React.ReactNode;
    animation?: boolean;
    clickOutsideToClose: boolean;
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
    { children, animation = true, ...props }: ModalProps,
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

    const wrapperDivRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dialogElement = modalDialogRef.current;
        const wrapperDiv = wrapperDivRef.current;

        if (dialogElement) {
            const handleBackToCloseModal = (event: PopStateEvent) => {
                event.preventDefault();
                dialogElement.close();
                if (clickOutsideToCloseFunction) {
                    clickOutsideToCloseFunction();
                }
            };

            const closeByClickingOutside = (event: MouseEvent) => {
                if (wrapperDiv && event.target === wrapperDiv) {
                    dialogElement.close();
                    if (clickOutsideToCloseFunction) {
                        clickOutsideToCloseFunction();
                    }
                }
            };

            window.addEventListener('popstate', handleBackToCloseModal);
            if (clickOutsideToClose) {
                dialogElement.addEventListener('click', closeByClickingOutside);
            }

            return () => {
                window.removeEventListener('popstate', handleBackToCloseModal);
                if (clickOutsideToClose) {
                    dialogElement.removeEventListener(
                        'click',
                        closeByClickingOutside
                    );
                }
            };
        }
    }, []);

    return (
        <dialog
            id={animation ? 'modal-wrapper' : ''}
            ref={modalDialogRef}
            className="backdrop:bg-black/60 bg-transparent outline-none text-white"
        >
            <div
                ref={wrapperDivRef}
                className="flex flex-col h-full w-full items-center justify-center relative"
            >
                {children}
            </div>
        </dialog>
    );
};

export default forwardRef(ModalWrapper);
