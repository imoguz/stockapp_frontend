import axios from "axios";

const uploadToCloudinary = async (selectedImage) => {
  const cloudinaryURL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const image = new FormData();
  image.append("file", selectedImage);
  image.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  image.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
  image.append("folder", "stockapp/image");

  try {
    const { data } = await axios.post(cloudinaryURL, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return data.public_id;
  } catch (error) {
    return null;
  }
};

export default uploadToCloudinary;
