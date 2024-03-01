import { WrapperProps } from '../../components/WrapperComponents/PageWrapper';

const NewConversationStepsWrapper: React.FC<WrapperProps> = ({ children }) => {
    return (
        <div
            className="flex-1 w-full bg-secondary py-4 flex flex-col overflow-y-auto gap-4 items-center relative"
            style={{ scrollbarGutter: 'stable' }}
        >
            {children}
        </div>
    );
};

export default NewConversationStepsWrapper;
