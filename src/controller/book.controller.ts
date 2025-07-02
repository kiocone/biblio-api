import { Request, Response } from 'express';
import { BookDto } from '../dtos/book.dto';

export class BookController {
  private booksDTO: BookDto;

  constructor() {
    this.booksDTO = new BookDto();
  }

  async getBooks(req: Request, res: Response): Promise<void> {
    console.log('Fetching books...');
    try {
      const books = await this.booksDTO.getBooks();
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching books', error });
    }
  };
}