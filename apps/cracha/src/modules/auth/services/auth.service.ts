import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from '../../system/encrypt/services/encrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly encryptService: EncryptService
  ) {}

  async signIn(
    username: string,
    pass: string
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.find({
      username,
      hasDashboardAccess: true,
    });
    const { password, ...rest } = user;
    const match = await this.encryptService.compare(pass, password);
    if (!match) {
      throw new UnauthorizedException();
    }
    return {
      accessToken: await this.jwtService.signAsync(rest),
    };
  }
}
