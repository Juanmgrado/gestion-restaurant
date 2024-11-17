import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IPayload } from 'src/auth/auth.service';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig()
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, 
    });
  }

  async validate(payload: IPayload) {
    
    return { 
      uuid: payload.uuid, 
      username: payload.username, 
      email: payload.email, 
      rol: payload.rol  
    }; 
  }
}