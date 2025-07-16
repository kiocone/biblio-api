import mongoose from "mongoose";

export const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now, expires: '8h' }
});

export const Token = mongoose.model('Token', tokenSchema);
