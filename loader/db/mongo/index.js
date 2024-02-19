import mongoose from "mongoose";
import { privateKey } from '../../../config/privateKey.js'
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(privateKey.DB_STRING_DEV, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connection is estabilished`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }

export { connectDB };