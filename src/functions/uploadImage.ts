import { v2 as cloudinary } from "cloudinary";
import configs from "../config";

const uploadImg = async (
  file: Express.Multer.File | undefined
) /* : Promise<string> */ => {
  cloudinary.config({
    cloud_name: configs.cloudinary.cloudName,
    api_key: configs.cloudinary.apiKey,
    api_secret: configs.cloudinary.apiSecret,
  });

  const resp = await cloudinary.uploader.upload(`../temp/${file?.filename}`);

  console.log(resp.url);
  return resp.url;
};

export default uploadImg;
