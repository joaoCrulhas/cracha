import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService
  ) {}

  async signIn(email: string, pass: string): Promise<{ accessToken: string }> {
    const user = await this.usersService.find({ email });
    if (await this.encryptService.compare(pass, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
}
