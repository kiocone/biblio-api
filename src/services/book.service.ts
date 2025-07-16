import { BookDto } from '../dtos/book.dto';
import { Book } from '../schemas/book.schema';
import { IBook } from '../types/books.interface';

export class BookService {
  private bookDto: BookDto;

  constructor() {
    this.bookDto = new BookDto();
  }

  async getBooks(): Promise<any> {
    const books = await Book.find();
    return this.bookDto.fromDocument(books);
  }

  async addBook(bookData: IBook): Promise<any> {
    if (!bookData.title || !bookData.author) {
      throw new Error('Title and author are required');
    }
    const newBook = new Book(bookData);
    await newBook.save();
    return this.bookDto.fromDocument([newBook]);
  }

  async bulkCreateBooks(booksData: any): Promise<any> {
    const parsedBooks: IBook[] = [];
    const lines = booksData.trim().split('\n');
    const headers = lines[0].split('\t');

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split('\t');
      const book: any = {};
      headers.forEach((header: string, idx: number) => {
        book[header.trim()] = values[idx]?.trim();
      });
      parsedBooks.push(book as IBook);
    }
    booksData = parsedBooks;
    if (!Array.isArray(booksData) || booksData.length === 0) {
      throw new Error('Invalid book data');
    }

    const createdBooks = [];
    for (const bookData of booksData) {
      const newBook = new Book(bookData);
      await newBook.save();
      // const newBook = bookData;
      createdBooks.push(newBook);
    }
    return this.bookDto.fromDocument(createdBooks);
  }

}