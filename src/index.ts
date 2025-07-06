import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Router } from 'express';
import bookRouter from './controller/index';

dotenv.config();

export class App {
  public app: Application;
  private router: Router;
  private PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
  private MONGODB_URI: string = process.env.MONGODB_URI || 'mongodb://localhost:27017/biblio-api';

  constructor() {
    this.connectDatabase();
    this.app = express();
    this.config();
    this.router = Router();
    this.routes();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private async connectDatabase(): Promise<void> {
    try {
      await mongoose.connect(this.MONGODB_URI);
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  private routes(): void {
    this.router.use('/', bookRouter);
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