import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../guards';
import { LoginRequestDto, LoginResponseDto } from '@cracha/shared-types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(
    @Body() { username, password }: LoginRequestDto
  ): Promise<LoginResponseDto> {
    return await this.authService.signIn(username, password);
  }
}
