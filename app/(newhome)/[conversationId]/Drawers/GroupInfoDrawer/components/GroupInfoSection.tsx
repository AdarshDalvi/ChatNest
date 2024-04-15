import EditInfoInput from '@/app/components/inputs/EditInfoInput';
import { Conversation, User } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import {
    UseFormRegister,
    FieldValues,
    FieldErrors,
    UseFormTrigger,
    UseFormGetValues,
    SubmitHandler,
    UseFormWatch,
} from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa6';
import { MdOutlineModeEditOutline } from 'react-icons/md';

type GroupInfoSectionProps = {
    isCurrentUserAdmin: boolean;
    conversation: Conversation & {
        members: User[];
    };
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    trigger: UseFormTrigger<FieldValues>;
    getValues: UseFormGetValues<FieldValues>;
    updateGroup: SubmitHandler<FieldValues>;
    watch: UseFormWatch<FieldValues>;
};

const GroupInfoSection: React.FC<GroupInfoSectionProps> = ({
    isCurrentUserAdmin,
    conversation,
    register,
    errors,
    trigger,
    getValues,
    updateGroup,
    watch,
}) => {
    const [editname, setEditname] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateGroupName = async () => {
        const isValid = await trigger('groupName', { shouldFocus: true });
        if (isValid) {
            setEditname(false);
            updateGroupInfo('groupName');
        }
    };

    const updateGroupInfo = async (key: 'groupName' | 'groupDescription') => {
        const updatedFieldValue = getValues(key);
        if (conversation[key] !== updatedFieldValue) {
            setLoading(true);
            const updatedField =
                key === 'groupName' ? 'Group name' : 'Group description';
            try {
                const data = getValues();
                await updateGroup(data);
                toast.success(`${updatedField} updated!`, {
                    position: 'bottom-center',
                });
            } catch (error: any) {
                toast.error('Something went wrong! Please try again later.', {
                    position: 'bottom-center',
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const groupName = watch('groupName');
    return (
        <>
            {!editname ? (
                <div className="flex justify-center w-full text-3xl midPhones:text-[2rem] mt-2">
                    <div className="relative flex items-center">
                        <p>{groupName}</p>
                        {isCurrentUserAdmin && (
                            <button
                                className="absolute -right-12 bottom-1"
                                onClick={() => setEditname(true)}
                            >
                                <MdOutlineModeEditOutline />
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <div className="w-[70%] relative mt-4">
                        <input
                            {...register('groupName', {
                                required: `Group name can't be empty!`,
                            })}
                            placeholder="Enter group name"
                            spellCheck={false}
                            className={clsx(
                                'w-full outline-none bg-secondary text-2xl midPhones:text-[1.7rem] pb-2.5 border-b-2 border-b-gray-400 focus:border-cyan-500',
                                errors &&
                                    errors['groupName'] &&
                                    'focus:border-red-500'
                            )}
                            maxLength={30}
                        />
                        <button
                            className="absolute bottom-3.5 midPhones:bottom-2.5  right-0 text-3xl midPhones:text-4xl  "
                            onClick={validateGroupName}
                        >
                            <FaCheck />
                        </button>
                    </div>
                    {errors && errors['groupName']?.message && (
                        <p className="text-red-500 text-lg text-start w-[70%]">
                            {errors['groupName'].message.toString()}
                        </p>
                    )}
                </>
            )}
            <div className="w-full mt-8 px-8">
                <EditInfoInput
                    label="Group description (Optional)"
                    register={register}
                    errors={errors}
                    disabled={loading}
                    id="groupDescription"
                    validationSchema={{}}
                    placeHolder="Enter group description"
                    saveButton
                    trigger={trigger}
                    saveFunction={() => updateGroupInfo('groupDescription')}
                />
            </div>
        </>
    );
};

export default GroupInfoSection;
