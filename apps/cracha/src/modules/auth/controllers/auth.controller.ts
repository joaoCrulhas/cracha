import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { Public } from '../guards/public.route';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  async signIn(
    @Body() { email, password }: { email: string; password: string }
  ) {
    return await this.authService.signIn(email, password);
  }
}
