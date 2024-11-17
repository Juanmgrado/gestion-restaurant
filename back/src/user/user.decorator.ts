import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserData = createParamDecorator(
  (data: keyof any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    // Si 'data' es específico (e.g., 'uuid'), devolver solo esa propiedad.
    return data ? user?.[data] : user;
  },
);