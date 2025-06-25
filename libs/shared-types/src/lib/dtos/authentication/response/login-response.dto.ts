import { UserDto } from '../../user';

export class LoginResponseDto {
  accessToken: string;
  user: UserDto;
  constructor(accessToken: string, user: UserDto) {
    this.accessToken = accessToken;
    this.user = user;
  }
}
