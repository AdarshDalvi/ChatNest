const capitalizeString = (value: string): string => {
    const updatedString = value.charAt(0).toUpperCase() + value.slice(1);
    return updatedString;
};

export default capitalizeString;
