import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

/*
We are protecting endpoints by requiring a valid JWT be present on the request. Passport can help us here too.
It provides the passport-jwt strategy for securing RESTful endpoints with JSON Web Tokens.
 */

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret', // huge mistake
    });
  }

  async validate(payload: any) {
    return { ...payload.user };
  }
}
