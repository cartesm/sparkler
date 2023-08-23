import "dotenv/config";
import express from "./app";
import configs from "./config";
import { connectDB } from "./db";

connectDB();

express.listen(configs.port, () => {
  console.log(`server on port ${configs.port}`);
});
