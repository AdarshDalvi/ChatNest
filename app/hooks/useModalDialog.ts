import { useRef } from 'react';
import { ModalDialgRef } from '../(newhome)/components/WrapperComponents/ModalWrapper';

export default function useModalDialog() {
    const modalDialogRef = useRef<ModalDialgRef>(null);
    const openDialog = () => modalDialogRef.current!.openModal();
    const closeDialog = () => modalDialogRef.current!.closeModal();

    return { modalDialogRef, openDialog, closeDialog };
}
