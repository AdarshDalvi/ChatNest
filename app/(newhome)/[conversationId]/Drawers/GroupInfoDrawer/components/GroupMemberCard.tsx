import Avatar from '@/app/(newhome)/components/Avatar';
import OptionsMenu, { Option } from '@/app/(newhome)/components/OptionsMenu';
import useOptionsMenu from '@/app/hooks/useOptionsMenu';
import { User } from '@prisma/client';
import clsx from 'clsx';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

type GroupMemberCardProps = {
    user: User;
    isMemberAdmin: boolean;
    isCurrentUser: boolean;
    isCurrentUserAdmin: boolean;
    isMemberGroupOwner: boolean;
    isCurrentUserGroupOwner: boolean;
    optionList: Option[];
};
const GroupMemberCard: React.FC<GroupMemberCardProps> = ({
    user,
    isMemberAdmin,
    isCurrentUser,
    isCurrentUserAdmin,
    isCurrentUserGroupOwner,
    optionList,
    isMemberGroupOwner,
}) => {
    const { ref, toggleOptionsMenu, showOptionsMenu, closeOptionsMenu } =
        useOptionsMenu();

    const [cardHover, setCardHover] = useState(false);

    const mouseOverEvent = () => {
        setCardHover(true);
    };

    const mouseLeaveEvent = () => {
        if (!showOptionsMenu) setCardHover(false);
    };

    const showArrow =
        (showOptionsMenu || !isCurrentUser) && // If the card is not of the current user
        (isCurrentUserGroupOwner || // Group owner can see arrow on all cards except his own
            (isCurrentUserAdmin && !isMemberAdmin)); // Group admin can see arrow on all cards except his own and group owners
    return (
        <button
            id="group-member-card"
            className="w-full flex gap-6 hover:bg-cardHoverColor px-4"
            onMouseOver={mouseOverEvent}
            onMouseLeave={mouseLeaveEvent}
        >
            <div className="py-5">
                <Avatar avatarImg={user} size="HEADER" status={false} />
            </div>
            <div className="min-w-0 flex-1 flex flex-col self-stretch justify-center items-start text-xl midPhones:text-2xl gap-1.5">
                <div className="flex w-full justify-between items-center">
                    <p>{user.name}</p>
                    {isMemberAdmin === true && (
                        <p className="text-base bg-cardFocusColor text-cyan-400 px-3 py-1 rounded-sm ">
                            Group {isMemberGroupOwner ? 'Owner' : 'Admin'}
                        </p>
                    )}
                </div>
                <div className="flex w-full items-center justify-between">
                    {user.about ? (
                        <p className="text-placeHolderColor text-lg midPhones:text-xl text-start flex-1 truncate">
                            {user.about}
                        </p>
                    ) : (
                        <>&nbsp;</>
                    )}

                    {showArrow && (
                        <>
                            <div
                                ref={ref}
                                id="arrow-down"
                                className={clsx(
                                    'text-gray-400 text-3xl midPhones:text-4xl relative cursor-pointer opacity-0 transition-all ease-in-out duration-150',
                                    cardHover && 'opacity-100'
                                )}
                                style={{
                                    transform: !cardHover
                                        ? 'translateX(30%)'
                                        : 'translateX(0)',
                                }}
                                onClick={toggleOptionsMenu}
                            >
                                <OptionsMenu
                                    optionsList={optionList}
                                    showOptionsMenu={showOptionsMenu}
                                    textPosition="text-start"
                                    className="top-[130%] right-3 origin-top-right min-w-[180px]"
                                />
                                <IoIosArrowDown />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </button>
    );
};

export default GroupMemberCard;
