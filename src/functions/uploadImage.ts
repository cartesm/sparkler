import { v2 as cloudinary } from "cloudinary";
import path from "path";
import configs from "../config";

const uploadImg = async (file: Express.Multer.File) /* : Promise<string> */ => {
  cloudinary.config({
    cloud_name: configs.cloudinary.cloudName,
    api_key: configs.cloudinary.apiKey,
    api_secret: configs.cloudinary.apiSecret,
  });

  const resp = await cloudinary.uploader.upload(
    path.join("src", `temp/${file.filename}`)
  );

  console.log(resp.url);
  return resp.url;
};

export default uploadImg;
