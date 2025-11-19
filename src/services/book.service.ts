import { BookDto } from '../dtos/book.dto';
import { Book } from '../schemas/book.schema';
import { IBook } from '../types/books.interface';

export class BookService {
  private bookDto: BookDto;

  constructor() {
    this.bookDto = new BookDto();
  }

  async getBooks(pageSize: number, pageIndex: number, search?: string | null): Promise<any> {
    let books = [];
    if (search) {
      books = await Book.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
          { genre: { $regex: search, $options: 'i' } },
          { publishedYear: { $regex: search, $options: 'i' } }
        ]
      }).skip(pageIndex).limit(pageSize);
      return this.bookDto.fromDocument(books);
    }
    books = await Book.find().skip(pageIndex).limit(pageSize);
    return this.bookDto.fromDocument(books);
  }

  async getBookById(id: string): Promise<any> {
    const book = await Book.findById(id);
    console.log('Book found - Service:', book);
    if (!book) {
      return null;
    }
    return this.bookDto.fromDocument([book]);
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
    if (!Array.isArray(booksData) || booksData.length === 0) {
      throw new Error('Invalid book data');
    }

    const createdBooks = [];
    for (const bookData of booksData) {
      const newBook = new Book(bookData);
      await newBook.save();
      createdBooks.push(newBook);
    }
    return this.bookDto.fromDocument(createdBooks);
  }

  async deduplicateBooks(): Promise<any> {
    const books = await Book.find();
    const uniqueBooks = new Map<string, any>();
    const duplicatedBooks = new Map<string, any>();

    for (const book of books) {
      const key = book.title + book.author + book.publishedYear;
      if (!uniqueBooks.has(key)) {
        uniqueBooks.set(key, book);
      } else {
        duplicatedBooks.set(key, book);
      }
    }

    if (duplicatedBooks.size > 0) {
      const idsToDelete = Array.from(duplicatedBooks.values()).map((book: any) => book._id);
      await Book.deleteMany({ _id: { $in: idsToDelete } });
    }

    return this.bookDto.fromDocument(Array.from(duplicatedBooks.values()));
  }
}