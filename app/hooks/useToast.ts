import { ToastPosition } from 'react-hot-toast';
import useMobileView from './useMobileView';

const useToast = (): ToastPosition => {
    const { mobileView } = useMobileView();

    const toastPosition: ToastPosition = mobileView
        ? 'bottom-center'
        : 'bottom-left';
    return toastPosition;
};

export default useToast;
