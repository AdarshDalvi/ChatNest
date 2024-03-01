import { useState } from 'react';

export const useNewgroup = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState<0 | 1>(0);

    function navigateTo(page: 0 | 1) {
        setCurrentStepIndex(page);
    }

    return {
        currentStepIndex,
        navigateTo,
    };
};
