// /src/routes/book.router.ts
import { Router } from 'express';
import { BookController } from '../controller/book.controller';

const bookController = new BookController();

const bookRouter: Router = Router();
bookRouter.use('/books', bookController.router);

export default bookRouter;