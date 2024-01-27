const messageTime = (messageTime: Date) => {
    const lastCreatedAt = new Date(messageTime);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastCreatedAt.toDateString() === today.toDateString()) {
        return lastCreatedAt.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    } else if (lastCreatedAt.toDateString() === yesterday.toDateString()) {
        return 'Yesterday';
    } else if (lastCreatedAt > yesterday) {
        return lastCreatedAt.toLocaleDateString('en-US', {
            weekday: 'long',
        });
    } else if (
        lastCreatedAt >
        new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
    ) {
        return lastCreatedAt.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    } else {
        return lastCreatedAt.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }
};

export default messageTime;
