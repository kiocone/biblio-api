import mongoose from "mongoose";

export const bookSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  coverImageUrl: { type: String, required: false },
  title: { type: String, required: true },
  author: { type: String, required: false },
  publishedYear: { type: String, required: false },
  isbn: { type: String, required: false },
  editorial: { type: String, required: false },
  language: { type: String, required: false },
  description: { type: String, required: false },
  genre: { type: String, required: false },
  availableCopies: { type: Number, required: true },
  takenBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
});

export const Book = mongoose.model('Book', bookSchema);
