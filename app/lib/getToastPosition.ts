import { ToastPosition } from 'react-hot-toast';
import useMobileView from '../hooks/useMobileView';

const getToastPosition = (): ToastPosition => {
    const { mobileView } = useMobileView();

    const toastPosition: ToastPosition = mobileView
        ? 'bottom-center'
        : 'bottom-left';
    return toastPosition;
};

export default getToastPosition;
