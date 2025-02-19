import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


// Configuration
cloudinary.config({
    cloud_name: 'dtylevdry',
    api_key: '925568288832167',
    api_secret: process.env.API_SERECT // Click 'View API Keys' above to copy your API secret
});


const upload = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }

        //upload on cloudnary
        const responce = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        //File has been uploded successfully
        console.log("File has been uploaded")
        console.log(responce, responce.url);
        return responce
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locallly saved temporary file as the upload operation got failed
        return null;
    }
}

export { upload }


