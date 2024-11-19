import { SetMetadata } from '@nestjs/common';
import { IRol } from 'src/entities/user.entity';

export const Roles = (...roles: IRol[]) => SetMetadata('roles', roles);