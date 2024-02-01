const stopEventPropagation = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
};

export default stopEventPropagation;
