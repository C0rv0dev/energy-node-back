import bcrypt from 'bcrypt';
import User from '../models/User';
import jwt from 'jsonwebtoken';

import AuthServiceInterface from "../interfaces/services/AuthServiceInterface";
import { UserRegisterInterface } from '../interfaces/models/UserModelInterface';
import config from '../config/config';
import getTokenExpirationDate from '../utils/getTokenExpirationDate';

class AuthService implements AuthServiceInterface {
  async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('Invalid password');
    }

    // create token
    return this.createToken(user);
  }

  logout(req: any, res: any) {
    res.clearCookie('Authorization');
    res.status(200).json({ message: 'Logged out' });
  }

  async register(user: UserRegisterInterface) {
    const hashPass = bcrypt.hashSync(user.password, 10);
    user.password = hashPass;
    await User.create(user);
  }

  private createToken(user: any) {
    const expirationDate = getTokenExpirationDate();
    return jwt.sign({ sub: user._id, exp: expirationDate }, config.jwt_secret);
  }
}

export default new AuthService();
