import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Router } from 'express';
import { BookController } from './controller/book.controller';

dotenv.config();

export class App {
  public app: Application;
  private router: Router;
  private PORT: number = 3000;
  private MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/biblio-api';
  private bookController!: BookController;

  constructor() {
    this.app = express();
    this.router = Router();
    this.config();
    this.bookController = new BookController();
    this.connectDatabase();
    this.routes();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private connectDatabase(): void {
    mongoose.connect(this.MONGODB_URI)
      .then(() => console.log('Connected to MongoDB'))
      .catch((err) => console.error('Error connecting to MongoDB:', err));
  }

  private routes(): void {
    this.router.get('/books', this.bookController.getBooks.bind(this.bookController));
    this.app.use('/api', this.router);
  }

  public listen(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on http://localhost:${this.PORT}`);
    });
  }
}

// Para iniciar el servidor:
const server = new App();
server.listen();