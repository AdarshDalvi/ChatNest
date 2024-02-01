import { useRef } from 'react';
import { ModalDialgRef } from '../(home)/components/Modal/Modal';

export default function useModalDialog() {
    const modalDialogRef = useRef<ModalDialgRef>(null);
    const openDialog = () => modalDialogRef.current!.open();
    const closeDialog = () => modalDialogRef.current!.close();

    return { modalDialogRef, openDialog, closeDialog };
}
