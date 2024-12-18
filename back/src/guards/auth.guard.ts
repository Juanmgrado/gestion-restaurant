import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IPayload } from "src/auth/auth.service";

@Injectable()
export class Authguard implements CanActivate{
  constructor(
    private readonly jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) throw new UnauthorizedException('Se requiere el token');

    try {
      const secret = process.env.JWT_SECRET;
      const payload: IPayload = this.jwtService.verify(token, { secret });

      request.user = payload;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Acceso no autorizado');
    }
  }
}
