import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from '../user/dto/registerDto';
import { User } from '../mongoDB/user.schema';
import { LoginDto } from '../user/dto/loginDto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() user: RegisterDto): Promise<User> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: LoginDto): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }

  @Post('verify-jwt')
  @HttpCode(HttpStatus.OK)
  verifyJwt(@Body() payload: { jwt: string }) {
    return this.authService.verifyJwt(payload.jwt);
  }
}
