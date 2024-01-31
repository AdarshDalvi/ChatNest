import clsx from 'clsx';
import { MdSend } from 'react-icons/md';

const InputSubmitButton = ({}) => (
    <button
        type="submit"
        className={clsx(
            'bg-primary py-3.5 midPhones:py-3.5 pl-3.5 midPhones:pl-4 pr-3 midPhones:pr-3.5 rounded-full text-white self-end '
        )}
    >
        <MdSend className="text-2xl midPhones:text-4xl" />
    </button>
);

export default InputSubmitButton;
