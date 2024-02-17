import axios from 'axios';

const createSecureUrl = async (
    base64String: string
): Promise<string | null> => {
    try {
        const formData = new FormData();
        formData.append('file', base64String);
        formData.append('upload_preset', 'image_message_upload');
        const res = await axios.post(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return res.data.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        return null;
    }
};

export default createSecureUrl;
