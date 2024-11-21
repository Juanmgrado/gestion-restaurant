import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/dtos/user.dto';
import { LoginDto } from 'src/dtos/singin.dto';

@ApiTags('auth') 
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario registrado exitosamente.' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o error en el registro.' })
  async signup(@Body()newUser :CreateUserDto ) {
  
    return this.authService.signup(newUser);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesión con un usuario existente' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso.', type: String })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas.' })
  login(@Body() loginDto: LoginDto) {
    return this.authService.signin(loginDto);
  }

  @Post('refresh')
    async refresh(@Body('refreshToken') refreshToken: string) {
        return await this.authService.refreshToken(refreshToken);
    }
}
