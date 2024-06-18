import { AuthPersistance, authPersistance } from "../../persistance/Auth.persistance";
import { User, UserProperties } from "./User";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { AuthenticationError, Reason } from "../errors/authentication.error";
config();


export class AuthService {
  private authPersistance: AuthPersistance;

  constructor(authPersistance: AuthPersistance) {
    this.authPersistance = authPersistance;
  }

  // public login(email: string, password: string): boolean {
  //   return this.authPersistance.login(email, password);
  // }

  public async signup(userDTO: Omit<UserProperties, 'id'>): Promise<{ user: User; token: string}> {
    const hashedPassword = bcrypt.hashSync(userDTO.password, 10);
    const newUser = { ...userDTO, password: hashedPassword };

    const user = await this.authPersistance.addUser(newUser);

    const token = jwt.sign({ id: user.id }, process.env.JWT as string);
    return { user, token: token };
  }

  public async login(userCredential: Pick<UserProperties, 'email' | 'password'>): Promise<{ user: User; token: string}> {
    const user = await this.authPersistance.getUserByEmail(userCredential.email);
    if (!user) {
      throw new AuthenticationError(Reason.WRONG_CRENDENTIALS)
    }
    const isPasswordCorrect = bcrypt.compareSync(userCredential.password, user.password);
    if (!isPasswordCorrect) {
      throw new AuthenticationError(Reason.WRONG_CRENDENTIALS)
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT as string);
    return { user, token: token };
  
  }

  public async getUser(id: number): Promise<User | null> {
    return this.authPersistance.getUserById(id);
  }
}

export const authService = new AuthService(authPersistance);