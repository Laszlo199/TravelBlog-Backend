import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtGuard } from './guards/jwt.guards';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: 'secret', // LOL
        signOptions: { expiresIn: '3600s' }, // We can use the token 3600 sec ,after this time the token not valid anymore
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtGuard, JwtStrategy],
})
export class AuthModule {}
