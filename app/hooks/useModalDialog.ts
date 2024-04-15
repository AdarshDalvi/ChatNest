import { RefObject, useRef } from 'react';
import { ModalDialgRef } from '../(newhome)/components/WrapperComponents/ModalWrapper';

type ModalDialgRefReturnType = [
    RefObject<ModalDialgRef>,
    () => void,
    () => void
];

export default function useModalDialog() {
    const modalDialogRef = useRef<ModalDialgRef>(null);
    const openDialog = () => modalDialogRef.current!.openModal();
    const closeDialog = () => modalDialogRef.current!.closeModal();

    const useModalReturn: ModalDialgRefReturnType = [
        modalDialogRef,
        openDialog,
        closeDialog,
    ];

    return useModalReturn;
}
