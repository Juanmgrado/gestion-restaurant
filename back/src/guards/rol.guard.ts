import { 
    CanActivate, 
    ExecutionContext, 
    ForbiddenException, 
    Injectable 
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Observable } from 'rxjs';
  import { IRol } from 'src/entities/user.entity'; 
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(
      private readonly reflector: Reflector
    ){}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
  
      const requiredRoles = this.reflector.getAllAndOverride<IRol[]>('roles', [
        context.getHandler(),
        context.getClass()
      ])
  
      const request = context.switchToHttp().getRequest();
  
      const user = request.user;
  
      const hasRol = () => requiredRoles.some(rol => user?.roles?.includes(rol));
  
      const valid = hasRol();
  
      if( !valid ) throw new ForbiddenException('no tienes permiso a esta ruta')
        
      return true;
    }
  }
  