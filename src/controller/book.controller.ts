import { Request, Response, Router } from 'express';
import { BookService } from '../services/book.service';
import { AuthMiddleware } from '../middleware/auth.middleware';

export class BookController {
  private bookService: BookService;
  public router: Router;

  constructor() {
    this.bookService = new BookService();
    this.router = Router();

    this.router.get('/', async (req: Request, res: Response) => {
      console.log('Fetching books...');
      try {
        const books = await this.bookService.getBooks();
        res.json(books);
      } catch (error) {
        res.status(500).json({ message: 'Error fetching books', error });
      }
    });

    this.router.post('/', AuthMiddleware, async (req: Request, res: Response) => {
      console.log('Adding a new book...');
      try {
        const bookData = req.body;
        const newBook = await this.bookService.addBook(bookData);
        res.status(201).json(newBook);
      } catch (error) {
        res.status(500).json({ message: 'Error adding book', error });
      }
    });

    this.router.post('/bulk', AuthMiddleware, async (req: Request, res: Response) => {
      try {
        const csvData: string = req.body;
        const createdBooks = await this.bookService.bulkCreateBooks(csvData);
        console.log(`${createdBooks.length} books created successfully`);
        res.status(201).json({ booksCreated: createdBooks.length });
      } catch (error) {
        res.status(500).json({ message: 'Error bulk creating books', error });
      }
    });

  }
}