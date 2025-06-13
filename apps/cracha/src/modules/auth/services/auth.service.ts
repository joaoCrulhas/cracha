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
    const { password, ...rest } = user;
    if (await this.encryptService.compare(pass, password)) {
      throw new UnauthorizedException();
    }

    console.log(rest);

    const accessToken = await this.jwtService.signAsync(rest);
    return {
      accessToken,
    };
  }
}
