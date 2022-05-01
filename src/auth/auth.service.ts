import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { RegisterDto } from '../user/dto/registerDto';
import { UserDetails } from '../user/user.datails.interface';
import { LoginDto } from '../user/dto/loginDto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // just a basic has+salt the password method.
  private async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  // We check the userNames and if we already have the same then we don't allow the user to register.
  // Here we use the hashPassword method if the given email does not exist then we hash the password end create a user.
  async register(user: Readonly<RegisterDto>): Promise<UserDetails | any> {
    const { userName, password } = user;

    const existingUser = await this.userService.findByUserName(userName);

    if (existingUser)
      throw new HttpException(
        'An account with that email already exists!',
        HttpStatus.CONFLICT,
      );

    const hashedPassword = await this.hashPassword(password);

    return await this.userService.create(userName, hashedPassword);
  }
  // We have to check the hashed password and the new password, so we just compare them with the bcrypt helps
  private async doesPasswordMatch(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
  // we need this method in the login method
  /*
     1. we search by userName. if we didn`t find any user then lol
     2. we check the passwords match.  if no then no.
     3. we return the user important without the password!
   */
  private async validateUser(
    userName: string,
    password: string,
  ): Promise<UserDetails | null> {
    const user = await this.userService.findByUserName(userName);
    const doesUserExist = !!user;

    if (!doesUserExist) return null;

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) return null;

    return this.userService._getUserDetails(user);
  }
  // We return the token if the user valid !
  async login(existingUser: LoginDto): Promise<{ token: string }> {
    const { userName, password } = existingUser;
    const user = await this.validateUser(userName, password);

    if (!user)
      throw new HttpException('Credentials invalid!', HttpStatus.UNAUTHORIZED);

    const jwt = await this.jwtService.signAsync({ user });
    //maybe delete
    // Im not sure we need this with the token
    //const userInformation = await this.userService.findById(user.id);

    return { token: jwt };
  }
  // maybe I can use in the frontend...
  async verifyJwt(jwt: string): Promise<{ exp: number }> {
    try {
      const { exp } = await this.jwtService.verifyAsync(jwt);
      return { exp };
    } catch (error) {
      throw new HttpException('Invalid JWT', HttpStatus.UNAUTHORIZED);
    }
  }
}
