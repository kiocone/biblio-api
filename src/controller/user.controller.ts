import { Request, Response, Router } from 'express';
import { UserDto } from '../dtos/user.dto';
import { IUserLogin } from '../types/user-login.interface';
import { UserService } from '../services/user.service';

export class UserController {
  private userDTO: UserDto;
  public router: Router;

  constructor( 
    private userService: UserService = new UserService()
  ) {
    this.userDTO = new UserDto();
    this.router = Router();

    this.router.post('/login', async (req: Request, res: Response): Promise<any> => {
      const userLoginData: IUserLogin = req.body;
      try {
        const user = await this.userService.loginUser(userLoginData);
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
        return res.status(200).json(user);
      } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
      }
    });
  }
}