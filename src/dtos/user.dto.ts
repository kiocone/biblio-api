import { User } from "../schemas/user.schema";
import { IUserLoggedIn } from "../types/user-logedin.interface";
import { IUser } from "../types/user.interface";

export class UserDto {

  id!: string;
  userName!: string;
  fullname!: string;
  email!: string;

  async getUser(): Promise<IUser[]> {
    const users = await User.find();
    const response = users.map(user => {
      return {
        id: user.id,
        userName: user.userName,
        fullname: user.fullname,
        email: user.email,
        flatPassword: user.flatPassword,
      };
    });
    return response as IUser[];
  }


  async fromDocument(userDoc: any): Promise<IUserLoggedIn> {
    const dto = new UserDto();
    dto.id = userDoc._id?.toString?.();
    dto.userName = userDoc.userName;
    dto.fullname = userDoc.fullname;
    dto.email = userDoc.email;
    return dto as IUserLoggedIn;
  }

  loginUser(userDoc: any): any {
    return userDoc
  }

  
}