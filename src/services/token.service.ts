import { Token } from '../schemas/token.schema';
import { IUserLoggedIn } from '../types/user-logedin.interface';
import jwt from 'jsonwebtoken';

export class TokenService {
  private tokenModel: typeof Token;

  constructor() {
    this.tokenModel = Token;
  }

  async createToken(user: IUserLoggedIn): Promise<string> {
    const existingToken = await this.tokenModel.findOne({ userId: user.id });
    if (existingToken) {
      await existingToken.deleteOne();
    }

    const payload = {
      user,
      timestamp: Date.now(),
    };

    const secret = process.env.JWT_SECRET || (() => { throw new Error('JWT_SECRET is not defined'); })();
    const tokenString = jwt.sign(payload, secret);

    const token = new this.tokenModel({ token: tokenString, userId: user.id });
    await token.save();
    return token.token;
  }

  async validateToken(token: string): Promise<boolean> {
    const foundToken = await Token.findOne({ token });
    return !!foundToken;
  }

  async getTokenByUserId(userId: string): Promise<string | null> {
    const token = await Token.findOne({ userId });
    return token ? token.token : null;
  }
}
