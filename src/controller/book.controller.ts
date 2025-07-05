import { Request, Response, Router } from 'express';
import { BookDto } from '../dtos/book.dto';

export class BookController {
  private booksDTO: BookDto;
  public router: Router;

  constructor() {
    this.booksDTO = new BookDto();
    this.router = Router();

    this.router.get('/', async (req: Request, res: Response) => {
      console.log('Fetching books...');
      try {
        const books = await this.booksDTO.getBooks();
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
      }
    });

    this.router.post('/', async (req: Request, res: Response) => {
      console.log('Adding a new book...');
      try {
        const bookData = req.body;
        //const newBook = await this.booksDTO.addBook(bookData);
        res.status(201).json(bookData);
      } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
      }
    });

  }
}