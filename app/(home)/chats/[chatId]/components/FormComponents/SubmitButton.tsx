import clsx from 'clsx';
import { MdSend } from 'react-icons/md';

const InputSubmitButton = ({}) => (
    <button
        type="submit"
        className={clsx(
            'bg-primary py-4 pl-4 pr-3.5 rounded-full text-white self-end '
        )}
    >
        <MdSend className="text-4xl" />
    </button>
);

export default InputSubmitButton;
