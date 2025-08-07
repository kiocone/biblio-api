import { Request, Response, Router, json } from 'express';
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
        const pageSize = parseInt(req.query.pageSize as string) || 10;
        const pageIndex = parseInt(req.query.pageIndex as string) * pageSize || 0;
        const books = await this.bookService.getBooks(pageSize, pageIndex);
        console.log(`Fetched ${books.length} books`);
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

    this.router.post('/bulk', AuthMiddleware, async (req: Request, res: Response): Promise<any> => {
      const payloadSizeBytes = JSON.stringify(req.body).length;
      const payloadSizeMB = (payloadSizeBytes / (1024 * 1024)).toFixed(2);
      console.log(`Bulk create payload size: ${payloadSizeMB} MB`);
      if (!req.body.length) {
        return res.status(400).json({ message: 'No book data provided' });
      }
      try {
        const jsonData: any = req.body;
        const createdBooks = await this.bookService.bulkCreateBooks(jsonData);
        console.log(`${createdBooks.length} books created successfully`);
        res.status(201).json({ booksCreated: createdBooks.length });
      } catch (error) {
        res.status(500).json({ message: 'Error bulk creating books', error });
      }
    });

    this.router.post('/deduplicate', AuthMiddleware, async (req: Request, res: Response) => {
      console.log('Deduplicating books...');
      try {
        const booksData = await this.bookService.deduplicateBooks();
        res.status(200).json(booksData);
      } catch (error) {
        res.status(500).json({ message: 'Error deduplicating books', error });
      }
    });
  }
}