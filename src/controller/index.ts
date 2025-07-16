// /src/routes/book.router.ts
import { Router } from 'express';
import { BookController } from '../controller/book.controller';
import { UserController } from './user.controller';

const bookController = new BookController();
const userController = new UserController();

const controllersRouter: Router = Router();
controllersRouter.use('/books', bookController.router);
controllersRouter.use('/users', userController.router);

export default controllersRouter;