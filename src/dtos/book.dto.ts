import { Book } from "../schemas/book.schema";
import { IBook } from "../types/books.interface";

export class BookDto {
  
  async getBooks(): Promise<IBook[]> {
    const books = await Book.find();
    const response = books.map(book => {
      return {
        id: book.id,
        coverImageUrl: book.coverImageUrl,
        title: book.title,
        author: book.author,
        publishedYear: book.publishedYear,
        isbn: book.isbn,
        editorial: book.editorial,
        language: book.language,
        description: book.description,
        genre: book.genre,
        availableCopies: book.availableCopies,
        takenBy: book.takenBy,
      };
      });
    return response as IBook[];
  }

}
