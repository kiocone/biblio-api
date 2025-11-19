import { UserDto } from '../dtos/user.dto';
import { User } from '../schemas/user.schema';
import { IUserLogin } from '../types/user-login.interface';
import { TokenService } from './token.service';

export class UserService {
  private userDto: UserDto;
  private tokenService: TokenService;

  constructor() {
    this.userDto = new UserDto();
    this.tokenService = new TokenService();
  }

  async loginUser(userCredentials: IUserLogin): Promise<any> {
    const user = await User.findOne(
      { 
        userName: userCredentials.userName,
        flatPassword: userCredentials.password
      }
    );
    if (!user) {
      return null;
    }

    const authUser = await this.userDto.fromDocument(user);
    const token = await this.tokenService.createToken(authUser);
    return { authUser, token };
  }
}