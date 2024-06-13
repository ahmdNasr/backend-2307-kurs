import cloudinary from "cloudinary";

export const uploadImage = async (byteArrayBuffer) => {

    const uploadResult = await new Promise((resolve) => {
        cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
            return resolve(uploadResult);
        }).end(byteArrayBuffer);
    });
    
    return uploadResult;
};
