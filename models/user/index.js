import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    name: {type: String, require: true}, 
    email: {type: String, require: true},
    age: {type: Number, require: true},
    role: {type: String, require: true},
    password: {type: String, require: true},
  });
  export const User = mongoose.model('User', userSchema);