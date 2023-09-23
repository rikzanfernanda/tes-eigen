import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Service } from 'typedi';
import { SECRET_KEY } from '@config';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { UserModel } from '@models/users.model';

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { _id: user._id };
  const expiresIn: number = 60 * 60;

  return { expiresIn, token: sign(dataStoredInToken, SECRET_KEY, { expiresIn }) };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email }).exec();
    if (findUser) throw new HttpException(404, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await UserModel.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: User): Promise<{ findUser: User; tokenData: TokenData }> {
    const findUser: User = await UserModel.findOne({ email: userData.email }).exec();
    if (!findUser) throw new HttpException(404, `Email or Password is wrong`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(404, 'Email or Password is wrong');

    const tokenData = createToken(findUser);
    console.log(findUser.name);

    return { findUser, tokenData };
  }

  public async logout(userData: User): Promise<User> {
    const findUser: User = await UserModel.findOne({ email: userData.email, password: userData.password });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    return findUser;
  }
}
