const openUserGallery = (handleImageChange: (file: File | null) => void) => {
    const input = document.createElement('input');
    input.multiple = false;
    input.accept = 'image/png, image/jpeg, image/jpg, image/webp';
    input.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0] || null;
        handleImageChange(file);
    };
    // Simulate a click on the input element to open the file dialog
    input.click();
};

export default openUserGallery;
