import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  fullname: { type: String, required: true },
  email: { type: String, required: true },
  flatPassword: { type: String, required: true }
});

export const User = mongoose.model('User', userSchema);
