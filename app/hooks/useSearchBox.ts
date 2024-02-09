import { ChangeEvent, useState } from 'react';

const useSearchBox = () => {
    const [searchText, setSearchText] = useState('');

    const updateSearchText = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchText((prevValue) => event.target.value);
    };

    const clearSearchText = () => {
        setSearchText('');
    };

    return {
        searchText,
        updateSearchText,
        clearSearchText,
    };
};

export { useSearchBox };
